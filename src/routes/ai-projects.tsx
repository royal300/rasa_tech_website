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
import { parseVideoUrl } from "@/lib/video-utils";
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
      { title: "AI Projects — RASA Tech | AI Video Productions" },
      {
        name: "description",
        content:
          "Browse client-wise AI video projects, commercials, and digital creations crafted by RASA Tech.",
      },
      { property: "og:title", content: "AI Projects — RASA Tech" },
      {
        property: "og:description",
        content: "Client-wise AI video productions and creative showcases.",
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
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255, 122, 0, 0.06), transparent 80%)`,
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
            <Video size={28} className="text-orange mb-2" />
            <a
              href={embedInfo.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-video-open-btn"
            >
              <Play size={13} /> Watch
            </a>
          </div>
        )}
      </div>

      <div className="ai-video-info">
        {video.remarks && video.remarks.trim() ? (
          <p className="ai-video-remarks-text" title={video.remarks}>
            {video.remarks}
          </p>
        ) : (
          <p className="ai-video-remarks-text text-muted">AI Video Production</p>
        )}

        <div className="ai-video-footer-centered">
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-watch-label-btn"
            title="Open original video source"
          >
            <Play size={11} />
            <span>WATCH</span>
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth custom cursor tracking & hover states
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    let tracking = false;

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (cursor) cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const moveCursor = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!tracking) {
        tracking = true;
        ringX = targetX;
        ringY = targetY;
        if (reduceMotion && cursor) cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        else raf = requestAnimationFrame(tick);
      } else if (reduceMotion && cursor) {
        cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        "a, button, input, textarea, select, .ai-video-card, .ai-watch-label-btn, .ai-search-icon-btn, .nav-dropdown-trigger, .brand-mark"
      );
      if (target) {
        cursor?.classList.add("cursor-hover");
      } else {
        cursor?.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
      duration: 1.2,
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
    }
  };

  useEffect(() => {
    if (!loaderData?.initialData || loaderData.initialData.length === 0) {
      loadData();
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(searchQuery);
    }, 280);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Focus search input when toggled open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setProjectsDropdownOpen(false);
  };

  // Filter clients and videos by search query
  const filteredClients = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return clientsWithVideos
      .map((client) => {
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
  }, [clientsWithVideos, searchQuery]);

  const filteredVideosCount = useMemo(() => {
    return filteredClients.reduce((acc, c) => acc + (c.videos ? c.videos.length : 0), 0);
  }, [filteredClients]);

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
              <Link to="/socialmedia" hash="projects" onClick={closeMenu} className="nav-dropdown-link">
                <span>Social Media Projects</span>
              </Link>
              <Link to="/webdev" hash="projects" onClick={closeMenu} className="nav-dropdown-link">
                <span>Web Projects</span>
              </Link>
              <Link to="/ai-projects" onClick={closeMenu} className="nav-dropdown-link active">
                <Sparkles size={14} className="text-orange" />
                <span>AI Projects</span>
              </Link>
            </div>
          </div>

          <a href="/#pricing" onClick={closeMenu}>Pricing</a>
          <Link to="/team" onClick={closeMenu}>Our Team</Link>
          <a href="/#contact" onClick={closeMenu}>Contact</a>

          {/* Mobile sublinks */}
          <div className="mobile-nav-sublinks">
            <span className="mobile-nav-heading">OUR PORTFOLIO</span>
            <Link to="/socialmedia" hash="projects" onClick={closeMenu} className="mobile-sublink">
              Social Media Projects
            </Link>
            <Link to="/webdev" hash="projects" onClick={closeMenu} className="mobile-sublink">
              Web Development Projects
            </Link>
            <Link to="/ai-projects" onClick={closeMenu} className="mobile-sublink active text-orange">
              AI Projects
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
        {/* Minimalist Hero Section */}
        <section className="ai-minimal-hero">
          <div className="ai-minimal-hero-container">
            <div className="ai-minimal-title-row">
              <div className="ai-hero-title-center">
                <h1 className="ai-gradient-title">AI Videography Project</h1>
              </div>

              {/* Minimal Search Toggle Icon */}
              <div className="ai-search-minimal-wrap">
                {!searchOpen && !searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="ai-search-icon-btn"
                    title="Search AI projects by remarks or client"
                    aria-label="Open search"
                  >
                    <Search size={18} />
                  </button>
                ) : (
                  <div className="ai-search-revealed-bar">
                    <Search size={15} className="ai-search-inner-icon" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search remarks, notes, or client..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ai-search-revealed-input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchOpen(false);
                      }}
                      className="ai-search-close-btn"
                      title="Close search"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Active search query feedback */}
            {searchQuery && (
              <div className="ai-search-active-pill">
                <span>
                  Filtering by: <strong>"{searchQuery}"</strong> ({filteredVideosCount} results)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchOpen(false);
                  }}
                  className="ai-clear-filter-btn"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Client-wise Video Listings (4-col Desktop / 2-col Mobile) */}
        <section className="ai-listings-section">
          <div className="ai-listings-container">
            {filteredClients.length > 0 ? (
              filteredClients.map((clientGroup, idx) => (
                <div key={clientGroup.clientId} className="ai-client-block">
                  {/* Clean, Prominent Client Header */}
                  <div className="ai-client-header">
                    <div className="ai-client-title-row">
                      <span className="ai-client-prefix">{String(idx + 1).padStart(2, "0")}</span>
                      <h2 className="ai-client-name-title">{clientGroup.clientName}</h2>
                      <span className="ai-client-count-pill">
                        {clientGroup.videos.length} {clientGroup.videos.length === 1 ? "video" : "videos"}
                      </span>
                    </div>
                    <div className="ai-client-line" />
                  </div>

                  {/* 4-col desktop, 2-col mobile Grid */}
                  <div className="ai-videos-grid">
                    {clientGroup.videos.map((vid) => (
                      <VideoPlayerCard key={vid.id} video={vid} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="ai-empty-state">
                <Film size={36} className="text-orange mb-3" />
                <h3>No AI Projects Found</h3>
                <p>
                  {searchQuery
                    ? "No video projects matched your search criteria."
                    : "No AI video projects uploaded yet."}
                </p>
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                    className="ai-cta-button"
                  >
                    Reset Filters
                  </button>
                ) : (
                  <Link to="/admin" className="ai-cta-button">
                    Upload from Admin
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Minimalist Bottom CTA */}
        <section className="ai-minimal-cta-wrap">
          <div className="ai-minimal-cta">
            <h3>Custom AI Video Production For Your Brand</h3>
            <p>From social reels to cinematic commercials engineered for engagement.</p>
            <a
              href="https://wa.me/918617201731?text=Hi%20RASA%20Tech,%20I%20am%20interested%20in%20custom%20AI%20video%20production%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="ai-cta-btn"
            >
              START PROJECT <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </main>

      {/* Footer - consistent with home page */}
      <div className="footer-separator-line" />
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link className="brand-mark" to="/">
              <img src={logoUrl} alt="RASA Tech" />
            </Link>
            <p className="footer-tagline">Grow Your Business</p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">QUICK MENU</h4>
            <div className="footer-links-vertical">
              <Link to="/">Home</Link>
              <a href="/#about">About</a>
              <a href="/#services">Services</a>
              <Link to="/socialmedia" hash="projects">Projects</Link>
              <Link to="/ai-projects" className="text-orange">AI Projects</Link>
              <a href="/#pricing">Pricing</a>
              <Link to="/team">Our Team</Link>
            </div>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-title">CONTACT</h4>
            <div className="footer-contact-vertical">
              <a href="mailto:support@rasatech.in" className="footer-contact-item">
                <span>Email: support@rasatech.in</span>
                <ArrowUpRight size={13} className="footer-arrow-icon" />
              </a>
              <a href="tel:8617201731" className="footer-contact-item">
                <span className="footer-phone-text">Contact Us: 8617201731 / 9332312300</span>
                <ArrowUpRight size={13} className="footer-arrow-icon" />
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
              <a href="/#contact">
                LINKEDIN <ArrowUpRight size={13} />
              </a>
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
