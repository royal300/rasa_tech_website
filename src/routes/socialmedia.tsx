import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Camera,
  Check,
  ExternalLink,
  Facebook,
  Film,
  Globe2,
  Instagram,
  Layers,
  Menu,
  MessageCircle,
  Share2,
  Sparkles,
  TrendingUp,
  Tv,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";

const logoUrl = "/logo.png";

export const Route = createFileRoute("/socialmedia")({
  component: SocialMediaPage,
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
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255, 122, 0, 0.07), transparent 80%)`,
      }}
      aria-hidden="true"
    />
  );
}

function MagneticButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setTransform(`translate3d(${x * 0.25}px, ${y * 0.25}px, 0px)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate3d(0px, 0px, 0px)");
  };

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform === "translate3d(0px, 0px, 0px)" ? "transform 0.5s ease" : "none" }}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------
// Data Structures
// ----------------------------------------------------------------------

interface SocialService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: any;
  badge: string;
  hasSoftwareBadges?: boolean;
}

const socialServices: SocialService[] = [
  {
    id: "content-cinematography",
    number: "01",
    title: "Content Creation & Cinematography",
    subtitle: "High-End Video & Photo Production",
    description: "Cinematic filming, professional color grading, and high-impact visual storytelling designed to capture instant attention on social media feeds.",
    features: ["4K Cinematic Filming", "Professional Editing", "High-Converting Visuals", "Brand Storytelling"],
    icon: Film,
    badge: "Creative Studio",
    hasSoftwareBadges: true,
  },
  {
    id: "social-management",
    number: "02",
    title: "Social Media Management",
    subtitle: "Full-Funnel Channel Growth",
    description: "End-to-end management of Facebook, Instagram, and LinkedIn. From content calendars to active community engagement and growth analytics.",
    features: ["Consistent Posting Schedule", "Audience Engagement", "Analytics & Insights", "Community Growth"],
    icon: Share2,
    badge: "Full-Service",
  },
  {
    id: "reels-shortform",
    number: "03",
    title: "Reels & Short-Form Video Growth",
    subtitle: "Viral Content & Trending Audio",
    description: "Engaging short-form videos tailored for Instagram Reels and TikTok with high-hook pacing, trending audio, and bold captions.",
    features: ["Trending Audio Hooks", "Fast-Paced Editing", "Viral Content Strategy", "Cross-Platform Sharing"],
    icon: Video,
    badge: "High Reach",
  },
  {
    id: "branding-design",
    number: "04",
    title: "Visual Branding & Graphic Design",
    subtitle: "Aesthetic Feed & Carousel Design",
    description: "Pixel-perfect social posts, interactive carousel graphics, and custom visual templates that elevate your brand authority.",
    features: ["Custom Feed Layouts", "Carousel Slides", "High-Impact Ads Creative", "Brand Guidelines"],
    icon: Camera,
    badge: "Visual Excellence",
  },
  {
    id: "paid-meta-ads",
    number: "05",
    title: "Paid Meta & Instagram Ad Campaigns",
    subtitle: "Targeted Audience & Lead Acquisition",
    description: "Data-driven Facebook and Instagram ad campaigns optimized for high ROAS, customer lead acquisition, and retargeting.",
    features: ["Targeted Retargeting", "Ad Creative A/B Testing", "Conversion Tracking", "High ROAS Strategy"],
    icon: TrendingUp,
    badge: "Performance Marketing",
  },
  {
    id: "influencer-campaigns",
    number: "06",
    title: "Creator & Influencer Marketing",
    subtitle: "Authentic Brand Partnerships",
    description: "Strategic partnerships with relevant digital creators to build authentic trust, reach new local audiences, and boost brand prestige.",
    features: ["Creator Outreach", "Campaign Management", "Content Rights", "ROI Reporting"],
    icon: Tv,
    badge: "Brand Reach",
  },
];

interface SocialClientProject {
  id: string;
  name: string;
  category: string;
  description: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tags: string[];
}

const socialProjects: SocialClientProject[] = [
  {
    id: "happy-valley",
    name: "Happy Valley Park",
    category: "Resort & Amusement Park",
    description: "Social media management, viral reel production, and event campaigns boosting visitor engagement and bookings.",
    facebookUrl: "https://www.facebook.com/happyvalleyparkbira/",
    instagramUrl: "https://www.instagram.com/happyvalleypark",
    tags: ["Reel Production", "Social Management", "Event Campaigns"],
  },
  {
    id: "gupta-interior",
    name: "Gupta Interior",
    category: "Interior & Architecture Design",
    description: "Luxury interior design visual portfolio, high-definition transformation videos, and aesthetic Instagram feed curation.",
    facebookUrl: "https://www.facebook.com/guptainteriorofficial/",
    instagramUrl: "https://www.instagram.com/guptainterior_",
    tags: ["Aesthetic Branding", "Interior Showcases", "Reels Growth"],
  },
  {
    id: "parama-jewellery",
    name: "Parama Jewellery Museum",
    category: "Luxury Retail & Jewellery",
    description: "Exquisite hallmarked gold and diamond jewelry branding, product cinematography, and targeted social media marketing.",
    facebookUrl: "https://www.facebook.com/hallmarked.jewellery/",
    instagramUrl: "https://www.instagram.com/parama_jewellery_museum",
    tags: ["Luxury Content", "Jewelry Showcase", "Audience Growth"],
  },
  {
    id: "jimmy-collection",
    name: "Jimmy Collection",
    category: "Fashion & Retail",
    description: "Trendy fashion retail social management, seasonal style highlights, and customer engagement campaigns.",
    facebookUrl: "https://www.facebook.com/JimmysCollectionbarasat/",
    tags: ["Fashion Campaigns", "Facebook Growth", "Customer Reach"],
  },
];

// ----------------------------------------------------------------------
// Moving Photoshop & Premiere Pro Software Badges Component
// ----------------------------------------------------------------------

function SoftwareShowcaseBadges() {
  return (
    <div className="software-showcase-bar">
      <div className="software-badge badge-ps" title="Adobe Photoshop">
        <span className="software-glow" />
        <span className="software-code">Ps</span>
        <div className="software-info">
          <b>PHOTOSHOP</b>
          <small>Visual Editing</small>
        </div>
      </div>
      <div className="software-badge badge-pr" title="Adobe Premiere Pro">
        <span className="software-glow" />
        <span className="software-code">Pr</span>
        <div className="software-info">
          <b>PREMIERE PRO</b>
          <small>Cinematic Cut</small>
        </div>
      </div>
      <div className="software-badge badge-ae" title="Adobe After Effects">
        <span className="software-glow" />
        <span className="software-code">Ae</span>
        <div className="software-info">
          <b>AFTER EFFECTS</b>
          <small>Motion Graphics</small>
        </div>
      </div>
      <div className="software-badge badge-ai" title="Adobe Illustrator">
        <span className="software-glow" />
        <span className="software-code">Ai</span>
        <div className="software-info">
          <b>ILLUSTRATOR</b>
          <small>Vector Art</small>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Social Media Page Component
// ----------------------------------------------------------------------

function SocialMediaPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const cursor = document.querySelector(".custom-cursor") as HTMLElement | null;
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="rasa-site socialmedia-page-container">
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
          <Link to="/webdev" onClick={closeMenu}>Web Dev</Link>
          <Link to="/socialmedia" className="text-orange-500 font-semibold" onClick={closeMenu}>Social Media</Link>
          <a href="/#pricing" onClick={closeMenu}>Pricing</a>
          <Link to="/team" onClick={closeMenu}>Our Team</Link>
          <a href="/#contact" onClick={closeMenu}>Contact</a>
          <div className="mobile-only-cta">
            <MagneticButton className="w-full">
              <Button asChild className="w-full h-12 text-sm font-semibold border-orange bg-orange text-black hover:bg-orange-hot">
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

      <main>
        {/* Social Media Hero Section */}
        <section className="socialmedia-hero">
          <div className="socialmedia-hero-inner">
            <div className="socialmedia-hero-badge">
              <Sparkles size={16} />
              <span>CONTENT CREATION &amp; SOCIAL MEDIA MARKETING</span>
            </div>
            <h1 className="socialmedia-hero-heading">
              CINEMATOGRAPHY, CONTENT &amp;
              <br />
              <span className="gradient-text-orange-white">SOCIAL MEDIA GROWTH.</span>
            </h1>
            <p className="socialmedia-hero-subtext">
              We produce cinematic videos, professional visual content, and execute data-driven social media management strategies that capture instant attention, grow loyal audiences, and drive real business revenue.
            </p>

            <div className="socialmedia-hero-actions">
              <MagneticButton>
                <a href="#projects" className="webdev-hero-primary-btn">
                  OUR CLIENT PROJECTS <ArrowUpRight size={16} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="/#contact" className="webdev-hero-secondary-btn">
                  START A CAMPAIGN
                </a>
              </MagneticButton>
            </div>

            {/* Software Showcase Floating Bar */}
            <SoftwareShowcaseBadges />
          </div>
        </section>

        {/* Social Media Services Section */}
        <section className="webdev-services-section">
          <div className="webdev-section-head">
            <p className="webdev-eyebrow">WHAT WE DO</p>
            <h2>OUR SOCIAL MEDIA &amp; CONTENT SERVICES</h2>
            <p className="webdev-section-subtitle">
              High-converting visual content, cinematic editing, and full social channel management.
            </p>
          </div>

          <div className="webdev-services-grid">
            {socialServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="webdev-service-card social-service-card">
                  <div className="webdev-card-head">
                    <span className="webdev-card-num">{service.number}</span>
                    <div className="webdev-icon-wrapper">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <span className="webdev-card-badge">{service.badge}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p className="webdev-card-subtitle">{service.subtitle}</p>
                  <p className="webdev-card-desc">{service.description}</p>
                  
                  {service.hasSoftwareBadges && (
                    <div className="card-software-mini-row">
                      <span className="mini-badge mini-ps">Ps Photoshop</span>
                      <span className="mini-badge mini-pr">Pr Premiere</span>
                      <span className="mini-badge mini-ae">Ae After Effects</span>
                    </div>
                  )}

                  <ul className="webdev-card-features">
                    {service.features.map((feat) => (
                      <li key={feat}>
                        <Check size={14} className="text-orange" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Client Projects Section */}
        <section id="projects" className="webdev-projects-section">
          <div className="webdev-section-head">
            <p className="webdev-eyebrow">PROVEN RESULTS</p>
            <h2>OUR SOCIAL MEDIA PROJECTS</h2>
            <p className="webdev-section-subtitle">
              Client social media channels managed and grown by RASA Tech.
            </p>
          </div>

          <div className="webdev-projects-grid">
            {socialProjects.map((project) => (
              <div key={project.id} className="webdev-project-card social-project-card">
                <div className="project-card-top">
                  <span className="project-category-tag">{project.category}</span>
                </div>

                <div className="project-card-body">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="social-client-links-footer">
                  {project.facebookUrl && (
                    <a
                      href={project.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn btn-facebook"
                    >
                      <Facebook size={16} />
                      <span>FACEBOOK</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.instagramUrl && (
                    <a
                      href={project.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn btn-instagram"
                    >
                      <Instagram size={16} />
                      <span>INSTAGRAM</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="webdev-cta">
          <div className="final-signal" />
          <div className="webdev-cta-inner">
            <p className="eyebrow">READY TO GROW YOUR SOCIAL MEDIA?</p>
            <h2>LET'S CREATE HIGH-IMPACT CONTENT FOR YOUR BRAND.</h2>
            <p>
              Connect with our content creation and social strategy team to elevate your brand presence today.
            </p>
            <div className="final-cta-action">
              <MagneticButton>
                <a href="/#contact" className="start-conversation-btn">
                  START YOUR SOCIAL CAMPAIGN <ArrowUpRight size={16} />
                </a>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
              <Link to="/webdev">Web Development</Link>
              <Link to="/socialmedia">Social Media</Link>
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
