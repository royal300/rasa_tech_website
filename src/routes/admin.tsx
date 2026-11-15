import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  Film,
  KeyRound,
  Layers,
  Loader2,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  User,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { parseVideoUrl } from "@/lib/video-utils";

const logoUrl = "/logo.png";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Portal — RASA Tech AI Projects Management" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

interface ClientItem {
  id: number;
  name: string;
  created_at: string;
  video_count?: number;
}

interface VideoItem {
  id: number;
  client_id: number;
  client_name?: string;
  video_url: string;
  remarks: string | null;
  created_at: string;
}

function AdminPage() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Admin dashboard state
  const [activeTab, setActiveTab] = useState<"upload" | "videos" | "clients">("upload");
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Form state
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [remarksInput, setRemarksInput] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Add client modal / inline state
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [addClientLoading, setAddClientLoading] = useState(false);
  const [addClientError, setAddClientError] = useState("");

  // Manage videos search
  const [videoSearchTerm, setVideoSearchTerm] = useState("");

  // Check existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("rasa_admin_token");
    if (savedToken) {
      verifyToken(savedToken);
    } else {
      setAuthChecking(false);
    }
  }, []);

  const verifyToken = async (tok: string) => {
    try {
      setAuthChecking(true);
      const res = await fetch("/api/admin/verify", {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.ok) {
        setToken(tok);
        loadDashboardData(tok);
      } else {
        localStorage.removeItem("rasa_admin_token");
        setToken(null);
      }
    } catch {
      localStorage.removeItem("rasa_admin_token");
      setToken(null);
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError("Please enter both username and password.");
      return;
    }

    try {
      setLoginLoading(true);
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem("rasa_admin_token", data.token);
        setToken(data.token);
        loadDashboardData(data.token);
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      fetch("/api/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(console.error);
    }
    localStorage.removeItem("rasa_admin_token");
    setToken(null);
    setUsernameInput("");
    setPasswordInput("");
  };

  const loadDashboardData = async (tok: string = token || "") => {
    if (!tok) return;
    try {
      setDataLoading(true);
      // Fetch clients
      const clientsRes = await fetch("/api/clients");
      if (clientsRes.ok) {
        const cData = await clientsRes.json();
        if (cData.success && Array.isArray(cData.clients)) {
          setClients(cData.clients);
          if (!selectedClientId && cData.clients.length > 0) {
            setSelectedClientId(String(cData.clients[0].id));
          }
        }
      }

      // Fetch all videos for management
      const videosRes = await fetch("/api/admin/videos", {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (videosRes.ok) {
        const vData = await videosRes.json();
        if (vData.success && Array.isArray(vData.videos)) {
          setVideos(vData.videos);
        }
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setDataLoading(false);
    }
  };

  // Add new client action
  const handleAddClient = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newClientName.trim()) {
      setAddClientError("Please enter client name");
      return;
    }
    try {
      setAddClientLoading(true);
      setAddClientError("");
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newClientName.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.client) {
        setClients((prev) => [...prev, data.client].sort((a, b) => a.name.localeCompare(b.name)));
        setSelectedClientId(String(data.client.id));
        setNewClientName("");
        setShowAddClientModal(false);
        setSubmitSuccess(`Client "${data.client.name}" added successfully!`);
        setTimeout(() => setSubmitSuccess(""), 4000);
      } else {
        setAddClientError(data.error || "Failed to add client");
      }
    } catch (err: any) {
      setAddClientError(err.message || "Failed to add client");
    } finally {
      setAddClientLoading(false);
    }
  };

  // Delete client action
  const handleDeleteClient = async (clientId: number, clientName: string) => {
    if (!window.confirm(`Are you sure you want to delete client "${clientName}" and all associated videos?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setClients((prev) => prev.filter((c) => c.id !== clientId));
        setVideos((prev) => prev.filter((v) => v.client_id !== clientId));
        if (selectedClientId === String(clientId)) {
          setSelectedClientId("");
        }
      } else {
        alert("Failed to delete client");
      }
    } catch {
      alert("Error deleting client");
    }
  };

  // Add video action
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!selectedClientId) {
      setSubmitError("Please select a client or add a new one.");
      return;
    }
    if (!videoUrlInput.trim()) {
      setSubmitError("Please enter a valid video link.");
      return;
    }

    try {
      setSubmitLoading(true);
      const res = await fetch("/api/ai-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientId: Number(selectedClientId),
          videoUrl: videoUrlInput.trim(),
          remarks: remarksInput.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess("AI Video added successfully!");
        setVideoUrlInput("");
        setRemarksInput("");
        loadDashboardData(token || "");
        setTimeout(() => setSubmitSuccess(""), 5000);
      } else {
        setSubmitError(data.error || "Failed to add AI video");
      }
    } catch (err: any) {
      setSubmitError(err.message || "Failed to add video");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Delete video action
  const handleDeleteVideo = async (videoId: number) => {
    if (!window.confirm("Are you sure you want to delete this AI video?")) {
      return;
    }
    try {
      const res = await fetch(`/api/ai-videos/${videoId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== videoId));
      } else {
        alert("Failed to delete video");
      }
    } catch {
      alert("Error deleting video");
    }
  };

  // Preview embed of current URL in input
  const videoPreview = useMemo(() => {
    if (!videoUrlInput.trim()) return null;
    return parseVideoUrl(videoUrlInput);
  }, [videoUrlInput]);

  // Filtered videos for the management tab
  const filteredVideos = useMemo(() => {
    const q = videoSearchTerm.toLowerCase().trim();
    if (!q) return videos;
    return videos.filter(
      (v) =>
        (v.client_name && v.client_name.toLowerCase().includes(q)) ||
        (v.remarks && v.remarks.toLowerCase().includes(q)) ||
        v.video_url.toLowerCase().includes(q)
    );
  }, [videos, videoSearchTerm]);

  // Loading state
  if (authChecking) {
    return (
      <div className="admin-loading-screen">
        <Loader2 size={36} className="text-orange animate-spin mb-4" />
        <p>Connecting to RASA Tech Admin...</p>
      </div>
    );
  }

  // Login View
  if (!token) {
    return (
      <div className="admin-auth-container">
        <div className="admin-auth-card">
          <div className="admin-auth-header">
            <Link to="/" className="admin-brand">
              <img src={logoUrl} alt="RASA Tech" />
            </Link>
            <div className="admin-auth-badge">
              <Lock size={12} className="text-orange" />
              <span>ADMIN PORTAL</span>
            </div>
            <h1>Secure Sign In</h1>
            <p>Sign in to manage AI video projects and client portfolios.</p>
          </div>

          {loginError && <div className="admin-alert-error">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-auth-form">
            <div className="admin-input-group">
              <label>Admin Username</label>
              <div className="admin-input-wrapper">
                <User size={16} className="admin-field-icon" />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Password</label>
              <div className="admin-input-wrapper">
                <KeyRound size={16} className="admin-field-icon" />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loginLoading} className="admin-submit-btn">
              {loginLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" /> Authenticating...
                </>
              ) : (
                <>
                  SIGN IN TO ADMIN <ArrowUpRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="admin-auth-footer">
            <Link to="/" className="admin-back-link">
              <ArrowLeft size={14} /> Back to RASA Tech Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="admin-dashboard-container">
      {/* Admin Topbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <Link to="/" className="admin-topbar-brand">
            <img src={logoUrl} alt="RASA Tech" />
          </Link>
          <span className="admin-badge-portal">AI ADMIN DASHBOARD</span>
          <span className="admin-badge-db">● DB: rasatech</span>
        </div>

        <div className="admin-topbar-right">
          <Link to="/ai-projects" target="_blank" className="admin-view-site-btn">
            <span>View Live AI Projects</span>
            <ExternalLink size={14} />
          </Link>
          <button type="button" onClick={handleLogout} className="admin-logout-btn" title="Sign out">
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="admin-content-wrap">
        {/* Navigation Tabs */}
        <div className="admin-tabs-bar">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "upload" ? "active" : ""}`}
            onClick={() => setActiveTab("upload")}
          >
            <Video size={16} />
            <span>Upload AI Video</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            <Film size={16} />
            <span>Manage Videos ({videos.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "clients" ? "active" : ""}`}
            onClick={() => setActiveTab("clients")}
          >
            <Layers size={16} />
            <span>Manage Clients ({clients.length})</span>
          </button>

          <button
            type="button"
            onClick={() => loadDashboardData(token)}
            className="admin-refresh-btn"
            title="Refresh database records"
          >
            <RefreshCw size={14} className={dataLoading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {/* TAB 1: UPLOAD AI VIDEO (CLIENT WISE) */}
        {activeTab === "upload" && (
          <div className="admin-card-section">
            <div className="admin-section-header">
              <h2>Upload Client AI Video</h2>
              <p>Select a client, enter the video link (YouTube, Drive, Vimeo, MP4), and add concept remarks.</p>
            </div>

            {submitSuccess && (
              <div className="admin-alert-success">
                <Check size={16} />
                <span>{submitSuccess}</span>
              </div>
            )}

            {submitError && <div className="admin-alert-error">{submitError}</div>}

            <form onSubmit={handleAddVideo} className="admin-form-grid">
              {/* Client Selection Row */}
              <div className="admin-form-field">
                <div className="admin-field-label-row">
                  <label>Client Name</label>
                  <button
                    type="button"
                    onClick={() => setShowAddClientModal(true)}
                    className="admin-add-client-trigger"
                  >
                    <Plus size={14} /> Add New Client
                  </button>
                </div>

                <div className="admin-select-row">
                  <select
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    required
                    className="admin-select"
                  >
                    <option value="" disabled>
                      {clients.length === 0 ? "No clients found — click '+ Add New Client'" : "— Select Client —"}
                    </option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Video URL Text Area */}
              <div className="admin-form-field">
                <label>Video Link (URL)</label>
                <textarea
                  rows={2}
                  placeholder="Paste YouTube, Vimeo, Google Drive, or direct MP4 video link here..."
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  required
                  className="admin-textarea"
                />
                <span className="admin-help-text">
                  Supports YouTube standard/shorts, Google Drive preview links, Vimeo, and direct .mp4/.webm videos.
                </span>
              </div>

              {/* Video Preview Box (if URL entered) */}
              {videoPreview && (
                <div className="admin-preview-container">
                  <div className="admin-preview-label">
                    <Sparkles size={13} className="text-orange" />
                    <span>Live Video Link Preview ({videoPreview.type.toUpperCase()})</span>
                  </div>

                  <div className="admin-preview-player-wrap">
                    {videoPreview.type === "youtube" || videoPreview.type === "drive" || videoPreview.type === "vimeo" ? (
                      <iframe
                        src={videoPreview.embedUrl}
                        title="Preview"
                        className="admin-preview-iframe"
                        allowFullScreen
                      />
                    ) : videoPreview.type === "video" ? (
                      <video src={videoPreview.embedUrl} controls className="admin-preview-video" />
                    ) : (
                      <div className="admin-preview-fallback">
                        <Video size={36} className="text-orange mb-2" />
                        <a href={videoPreview.originalUrl} target="_blank" rel="noopener noreferrer">
                          Test External Link <ArrowUpRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Remarks Section */}
              <div className="admin-form-field">
                <label>Remarks &amp; Concept Description</label>
                <textarea
                  rows={4}
                  placeholder="Enter remarks, campaign strategy, AI visual style, tools used (Runway, Midjourney, Kling, Sora), client requirements, etc."
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                  className="admin-textarea"
                />
                <span className="admin-help-text">
                  This text will be prominently displayed with the video on the client showcase page and is searchable.
                </span>
              </div>

              {/* Submit Button */}
              <div className="admin-form-actions">
                <button type="submit" disabled={submitLoading} className="admin-primary-btn">
                  {submitLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" /> Saving Video to Database...
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> ADD AI VIDEO
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MANAGE VIDEOS */}
        {activeTab === "videos" && (
          <div className="admin-card-section">
            <div className="admin-section-header-row">
              <div>
                <h2>Manage Uploaded AI Videos</h2>
                <p>View, search, and manage all videos uploaded across clients.</p>
              </div>
              <div className="admin-table-search">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search by client or remark..."
                  value={videoSearchTerm}
                  onChange={(e) => setVideoSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filteredVideos.length > 0 ? (
              <div className="admin-videos-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Preview / Link</th>
                      <th>Remarks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVideos.map((v) => (
                      <tr key={v.id}>
                        <td>#{v.id}</td>
                        <td>
                          <span className="admin-table-client-badge">{v.client_name || `Client #${v.client_id}`}</span>
                        </td>
                        <td>
                          <a
                            href={v.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-table-video-link"
                            title={v.video_url}
                          >
                            <span>Open Video</span>
                            <ArrowUpRight size={13} />
                          </a>
                        </td>
                        <td className="admin-table-remarks-cell">
                          <p>{v.remarks || "—"}</p>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(v.id)}
                            className="admin-btn-delete"
                            title="Delete Video"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty-table">
                <Film size={40} className="text-orange mb-2" />
                <p>No videos found matching your filter.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MANAGE CLIENTS */}
        {activeTab === "clients" && (
          <div className="admin-card-section">
            <div className="admin-section-header">
              <h2>Manage Client Portfolio</h2>
              <p>Add new clients or delete existing ones. Clients appear in the video upload dropdown.</p>
            </div>

            <div className="admin-add-client-inline-card">
              <h3>Add New Client</h3>
              <form onSubmit={handleAddClient} className="admin-inline-form">
                <input
                  type="text"
                  placeholder="Enter client or brand name (e.g., Royal 300, A Banik Jewellers)"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="admin-input-text"
                  required
                />
                <button type="submit" disabled={addClientLoading} className="admin-primary-btn">
                  {addClientLoading ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                  <span>Save Client</span>
                </button>
              </form>
              {addClientError && <div className="admin-alert-error mt-3">{addClientError}</div>}
            </div>

            <div className="admin-clients-grid">
              {clients.map((c) => {
                const count = videos.filter((v) => v.client_id === c.id).length;
                return (
                  <div key={c.id} className="admin-client-card">
                    <div className="admin-client-card-info">
                      <span className="admin-client-id">#{c.id}</span>
                      <h4>{c.name}</h4>
                      <span className="admin-client-count">
                        {count} {count === 1 ? "video" : "videos"} uploaded
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteClient(c.id, c.name)}
                      className="admin-client-delete-btn"
                      title="Delete Client"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Quick Add Client Modal */}
      {showAddClientModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>Add New Client</h3>
              <button
                type="button"
                onClick={() => setShowAddClientModal(false)}
                className="admin-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="admin-modal-body">
              <label>Client / Brand Name</label>
              <input
                type="text"
                placeholder="e.g. A Banik Jewellers, Saha Traders, Royal 300"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                autoFocus
                className="admin-input-text w-full mb-3"
                required
              />

              {addClientError && <div className="admin-alert-error mb-3">{addClientError}</div>}

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={addClientLoading} className="admin-primary-btn">
                  {addClientLoading ? "Saving..." : "Add Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
