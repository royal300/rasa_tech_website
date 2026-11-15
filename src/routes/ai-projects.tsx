import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  ExternalLink,
  Film,
  Menu,
  MessageSquare,
  Play,
  Search,
  Sparkles,
  Video,
  X,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo, type ReactNode } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { parseVideoUrl, type VideoEmbedData } from "@/lib/video-utils";
import type { ClientWithVideos } from "@/lib/db.server";

const logoUrl = "/logo.png";

export const Route = createFileRoute("/ai-projects")({
  loader: async () => {
    try {
      const { getAiProjectsFn } = await import("@/lib/server-fns");
      const data = await getAiProjectsFn();
      return { initialData: data || [] };
    } catch (err) {
      console.error("Failed to load AI projects in loader:", err);
      return { initialData: [] };
    }
  },
  component: AiProjectsPage,
  head: () => ({
    meta: [
      { title: "AI Video Projects — RASA Tech | AI-Powered Video Productions" },
      {
        name: "description",
        content:
          "Browse client-wise AI video projects, cinematic commercials, and viral digital creatives crafted by RASA Tech.",
      },
      { property: "og:title", content: "AI Video Projects — RASA Tech" },
      {
        property: "og:description",
        content:
          "High-impact AI video creations, cinematic advertising, and digital productions made for ambitious clients.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/ai-projects" },
    ],
  }),
});

function MouseSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="mouse-spotlight"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255, 122, 0, 0.08), transparent 80%)`,
      }}
    />
  );
}

function MagneticButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    setOffset({ x: distanceX * 0.15, y: distanceY * 0.15 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
}

function VideoPlayerCard({
  video,
}: {
  video: { id: number; videoUrl: string; remarks: string; createdAt: string };
}) {
  const embedInfo = useMemo(() => parseVideoUrl(video.videoUrl), [video.videoUrl]);
  const [playDirect, setPlayDirect] = useState(false);

  return (
    <div className="ai-video-card">
      <div className="ai-video-media-wrap">
        {embedInfo.type === "youtube" || embedInfo.type === "drive" || embedInfo.type === "vimeo" ? (
          <iframe
            src={embedInfo.embedUrl}
            title={video.remarks || "AI Video"}
            className="ai-video-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : embedInfo.type === "video" ? (
          <video
            src={embedInfo.embedUrl}
            controls
            preload="metadata"
            className="ai-video-direct-player"
          />
        ) : (
          <div className="ai-video-generic-preview">
            <Video size={44} className="text-orange mb-3" />
            <a
              href={embedInfo.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-video-open-btn"
            >
              <Play size={16} /> Play External Video
            </a>
          </div>
        )}
      </div>

      <div className="ai-video-info">
        <div className="ai-video-remarks-box">
          <div className="ai-video-remarks-header">
            <MessageSquare size={13} className="text-orange" />
            <span>REMARKS & CONCEPT</span>
          </div>
          <p className="ai-video-remarks-text">
            {video.remarks && video.remarks.trim() ? video.remarks : "Custom AI Video Production & Creative Concept"}
          </p>
        </div>

        <div className="ai-video-footer">
          <span className="ai-video-tag">
            <Sparkles size={11} /> AI PRODUCTION
          </span>
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-video-link-action"
            title="Open video in new tab"
          >
            <span>WATCH SOURCE</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

function AiProjectsPage() {
  const loaderData = Route.useLoaderData();
  const [clientsWithVideos, setClientsWithVideos] = useState<ClientWithVideos[]>(
    loaderData?.initialData || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>("ALL");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
  }, [menuOpen]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Fetch or refresh data from server
  const loadData = async (search?: string) => {
    try {
      setLoading(true);
      const url = search ? `/api/ai-projects?search=${encodeURIComponent(search)}` : "/api/ai-projects";
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setClientsWithVideos(json.data);
        }
      }
    } catch (e) {
      console.error("Failed to fetch ai projects:", e);
    } finally {
      setLoading(false);
    }
  };

  // If initial loader data was empty, try fetching client-side on mount
  useEffect(() => {
    if (!loaderData?.initialData || loaderData.initialData.length === 0) {
      loadData();
    }
  }, []);

  // Debounced real-time search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(searchQuery);
    }, 280);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const closeMenu = () => {
    setMenuOpen(false);
    setProjectsDropdownOpen(false);
  };

  // Filter clients and videos based on search & client pill selection
  const filteredClients = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return clientsWithVideos
      .map((client) => {
        // Filter by selected client pill
        if (selectedClientFilter !== "ALL" && client.clientName !== selectedClientFilter) {
          return null;
        }

        // Filter videos inside client by search query
        const matchingVideos = client.videos.filter((v) => {
          if (!q) return true;
          return (
            (v.remarks && v.remarks.toLowerCase().includes(q)) ||
            client.clientName.toLowerCase().includes(q) ||
            v.videoUrl.toLowerCase().includes(q)
          );
        });

        if (matchingVideos.length === 0) return null;

        return {
          ...client,
          videos: matchingVideos,
        };
      })
      .filter(Boolean) as ClientWithVideos[];
  }, [clientsWithVideos, searchQuery, selectedClientFilter]);

  const totalVideosCount = useMemo(() => {
    return clientsWithVideos.reduce((acc, c) => acc + (c.videos ? c.videos.length : 0), 0);
  }, [clientsWithVideos]);

  const filteredVideosCount = useMemo(() => {
    return filteredClients.reduce((acc, c) => acc + (c.videos ? c.videos.length : 0), 0);
  }, [filteredClients]);

  const clientPills = useMemo(() => {
    return Array.from(new Set(clientsWithVideos.map((c) => c.clientName))).sort();
  }, [clientsWithVideos]);

  return (
    <div className="rasa-site ai-projects-page-container">
      <MouseSpotlight />
      <div className="custom-cursor" aria-hidden="true"><span /></div>
      <div className="site-network" aria-hidden="true"><span /><span /><span /><span /><span /></div>

      {/* Header */}
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <Link className="brand-mark" to="/" onClick={closeMenu}>
          <img src={logoUrl} alt="RASA Tech" />
        </Link>

        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <a href="/#about" onClick={closeMenu}>About</a>
          <a href="/#services" onClick={closeMenu}>Services</a>

          {/* Projects Dropdown Menu */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => setProjectsDropdownOpen(true)}
            onMouseLeave={() => setProjectsDropdownOpen(false)}
          >
            <button
              type="button"
              className="nav-dropdown-trigger text-orange active font-semibold"
              onClick={() => setProjectsDropdownOpen((prev) => !prev)}
            >
              Projects <ChevronDown size={14} className={`dropdown-chevron ${projectsDropdownOpen ? "open" : ""}`} />
            </button>
            <div className={`nav-dropdown-menu ${projectsDropdownOpen ? "show" : ""}`}>
              <Link to="/ai-projects" onClick={closeMenu} className="nav-dropdown-link active">
                <Sparkles size={14} className="text-orange" />
                <span>AI Projects</span>
                <span className="nav-badge-pill">ACTIVE</span>
              </Link>
              <Link to="/socialmedia" hash="projects" onClick={closeMenu} className="nav-dropdown-link">
                <span>Social Media Projects</span>
              </Link>
              <Link to="/webdev" hash="projects" onClick={closeMenu} className="nav-dropdown-link">
                <span>Web Projects</span>
              </Link>
            </div>
          </div>

          <a href="/#pricing" onClick={closeMenu}>Pricing</a>
          <Link to="/team" onClick={closeMenu}>Our Team</Link>
          <a href="/#contact" onClick={closeMenu}>Contact</a>

          {/* Mobile sublinks */}
          <div className="mobile-nav-sublinks">
            <span className="mobile-nav-heading">OUR PORTFOLIO</span>
            <Link to="/ai-projects" onClick={closeMenu} className="mobile-sublink active text-orange">
              ✨ AI Projects
            </Link>
            <Link to="/socialmedia" hash="projects" onClick={closeMenu} className="mobile-sublink">
              Social Media Projects
            </Link>
            <Link to="/webdev" hash="projects" onClick={closeMenu} className="mobile-sublink">
              Web Development Projects
            </Link>
          </div>

          <div className="mobile-only-cta">
            <MagneticButton className="w-full">
              <Button asChild className="w-full h-12 text-sm font-bold border-none bg-orange text-white hover:bg-orange-hot shadow-lg">
                <a href="/#contact" onClick={closeMenu}>GET STARTED <ArrowUpRight size={16} /></a>
              </Button>
            </MagneticButton>
          </div>
        </nav>

        <MagneticButton>
          <Button asChild className="header-cta">
            <a href="/#contact" onClick={closeMenu}>GET STARTED <ArrowUpRight size={16} /></a>
          </Button>
        </MagneticButton>

        <Button
          variant="ghost"
          size="icon"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Main Content */}
      <main className="ai-projects-main">
        {/* Hero Section */}
        <section className="ai-hero-section">
          <div className="ai-hero-grid" />
          <div className="ai-hero-container">
            <div className="ai-hero-badge">
              <span className="ai-badge-pulse" />
              <span>RASA INNOVATION / AI PROJECTS</span>
            </div>

            <h1 className="ai-hero-title">
              CLIENT AI VIDEO <span>PORTFOLIO &amp; SHOWCASE.</span>
            </h1>

            <p className="ai-hero-description">
              Explore hyper-realistic AI video commercials, social reels, viral concept videos, and visual storytelling
              crafted client-wise for industry leaders.
            </p>

            {/* Quick Metrics */}
            <div className="ai-metrics-row">
              <div className="ai-metric-item">
                <span className="ai-metric-num">{clientsWithVideos.length}</span>
                <span className="ai-metric-label">CLIENT PARTNERS</span>
              </div>
              <div className="ai-metric-divider" />
              <div className="ai-metric-item">
                <span className="ai-metric-num">{totalVideosCount}</span>
                <span className="ai-metric-label">AI VIDEO PRODUCTIONS</span>
              </div>
              <div className="ai-metric-divider" />
              <div className="ai-metric-item">
                <span className="ai-metric-num">100%</span>
                <span className="ai-metric-label">NEXT-GEN AI GENERATED</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="ai-toolbar-section">
          <div className="ai-toolbar-container">
            {/* Search Input Bar */}
            <div className="ai-search-box-wrapper">
              <Search size={18} className="ai-search-icon" />
              <input
                type="text"
                placeholder="Search AI videos by remarks, concept notes, or client name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ai-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="ai-search-clear-btn"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Client Filter Pills */}
            <div className="ai-pills-row">
              <button
                type="button"
                className={`ai-pill-btn ${selectedClientFilter === "ALL" ? "active" : ""}`}
                onClick={() => setSelectedClientFilter("ALL")}
              >
                All Clients ({totalVideosCount})
              </button>
              {clientPills.map((name) => {
                const count = clientsWithVideos.find((c) => c.clientName === name)?.videos.length || 0;
                return (
                  <button
                    key={name}
                    type="button"
                    className={`ai-pill-btn ${selectedClientFilter === name ? "active" : ""}`}
                    onClick={() => setSelectedClientFilter(name)}
                  >
                    {name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Result Stats */}
            <div className="ai-results-info">
              <span>
                Showing <strong>{filteredVideosCount}</strong> video{filteredVideosCount === 1 ? "" : "s"} across{" "}
                <strong>{filteredClients.length}</strong> client{filteredClients.length === 1 ? "" : "s"}
                {searchQuery ? ` matching "${searchQuery}"` : ""}
              </span>
              {(searchQuery || selectedClientFilter !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedClientFilter("ALL");
                  }}
                  className="ai-reset-filters-btn"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Client-wise Video Listings */}
        <section className="ai-listings-section">
          <div className="ai-listings-container">
            {filteredClients.length > 0 ? (
              filteredClients.map((clientGroup, idx) => (
                <div key={clientGroup.clientId} className="ai-client-block">
                  {/* Client Header */}
                  <div className="ai-client-header">
                    <div className="ai-client-number">
                      {String(idx + 1).padStart(2, "0")} / CLIENT
                    </div>
                    <div className="ai-client-title-row">
                      <h2 className="ai-client-name-title">{clientGroup.clientName}</h2>
                      <span className="ai-client-badge">
                        {clientGroup.videos.length} {clientGroup.videos.length === 1 ? "Video" : "Videos"}
                      </span>
                    </div>
                    <div className="ai-client-line" />
                  </div>

                  {/* Video Grid */}
                  <div className="ai-videos-grid">
                    {clientGroup.videos.map((vid) => (
                      <VideoPlayerCard key={vid.id} video={vid} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="ai-empty-state">
                <Film size={54} className="text-orange mb-3" />
                <h3>No AI Videos Found</h3>
                <p>
                  {searchQuery || selectedClientFilter !== "ALL"
                    ? "No video projects match your search keywords. Try adjusting your search query or reset the filters."
                    : "No AI video projects have been uploaded yet."}
                </p>
                {(searchQuery || selectedClientFilter !== "ALL") ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedClientFilter("ALL");
                    }}
                    className="ai-cta-button"
                  >
                    Clear Search Filters
                  </button>
                ) : (
                  <Link to="/admin" className="ai-cta-button">
                    Go to Admin Panel to Add Videos
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Project Call to Action Banner */}
        <section className="ai-cta-banner-section">
          <div className="ai-cta-banner-card">
            <div className="ai-cta-content">
              <span className="ai-cta-badge">EXPERIENCE THE FUTURE</span>
              <h2>Ready to Elevate Your Brand With AI Video Production?</h2>
              <p>
                From cinematic concept commercials to viral social media reels, we engineer AI visuals that dominate
                feeds and convert audiences.
              </p>
              <div className="ai-cta-actions">
                <a
                  href="https://wa.me/918617201731?text=Hi%20RASA%20Tech,%20I%20am%20interested%20in%20custom%20AI%20video%20production%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ai-cta-primary-btn"
                >
                  START AI VIDEO PROJECT <ArrowUpRight size={16} />
                </a>
                <Link to="/admin" className="ai-cta-secondary-btn">
                  ADMIN PORTAL <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link className="footer-brand" to="/">
              <img src={logoUrl} alt="RASA Tech" />
            </Link>
            <p className="footer-tagline">Grow Your Business With Intelligent Systems</p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">QUICK MENU</h4>
            <div className="footer-links-vertical">
              <Link to="/">Home</Link>
              <a href="/#about">About</a>
              <a href="/#services">Services</a>
              <Link to="/ai-projects" className="text-orange font-medium">AI Projects</Link>
              <Link to="/socialmedia" hash="projects">Social Media Projects</Link>
              <Link to="/webdev" hash="projects">Web Projects</Link>
              <a href="/#pricing">Pricing</a>
              <Link to="/team">Our Team</Link>
            </div>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-title">CONTACT</h4>
            <div className="footer-contact-vertical">
              <a href="mailto:support@rasatech.in">
                Email: support@rasatech.in <ArrowUpRight size={13} />
              </a>
              <a href="tel:8617201731">
                Contact Us: 8617201731 / 9332312300 <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="footer-social-col">
            <h4 className="footer-col-title">CONNECT</h4>
            <div className="footer-social">
              <a href="https://wa.me/918617201731" target="_blank" rel="noopener noreferrer">
                WHATSAPP <ArrowUpRight size={13} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61594128368179" target="_blank" rel="noopener noreferrer">
                FACEBOOK <ArrowUpRight size={13} />
              </a>
              <a href="https://www.instagram.com/rasatech.in/" target="_blank" rel="noopener noreferrer">
                INSTAGRAM <ArrowUpRight size={13} />
              </a>
              <a href="/#contact">LINKEDIN <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 RASA TECH. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        type="button"
        className={`back-to-top-btn ${scrolled ? "visible" : ""}`}
        aria-label="Scroll to top"
        onClick={() => lenisRef.current?.scrollTo(0, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
