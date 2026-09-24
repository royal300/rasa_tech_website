import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Code2,
  Cpu,
  ExternalLink,
  Gauge,
  Globe2,
  Layers,
  Layout,
  Menu,
  Monitor,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";

const logoUrl = "/logo.png";

export const Route = createFileRoute("/webdev")({
  component: WebDevPage,
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

interface WebDevService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: any;
  badge: string;
}

const webDevServices: WebDevService[] = [
  {
    id: "static",
    number: "01",
    title: "Static & Landing Websites",
    subtitle: "Fast, SEO-Optimized Landing Pages",
    description: "Ultra-fast static websites and high-converting landing pages engineered for maximum SEO visibility, fast page loads, and seamless user conversion.",
    features: ["100/100 Core Web Vitals", "Instant Page Load Speeds", "SEO & Meta Structured"],
    icon: Globe2,
    badge: "High Conversion",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-Commerce Solutions",
    subtitle: "High-Converting Online Stores",
    description: "Robust e-commerce platforms with secure payment gateways, intuitive product filtering, inventory management, and smooth shopping experiences.",
    features: ["Payment Gateway Setup", "Fast Checkout Flow", "Product & Inventory CMS"],
    icon: ShoppingBag,
    badge: "Scalable Sales",
  },
  {
    id: "accurate",
    number: "03",
    title: "Fast, Accurate & Professional Websites",
    subtitle: "Precision Engineering & Modern UI",
    description: "Custom-built professional business websites delivered with high accuracy, responsive design systems, pixel-perfect alignment, and zero bloat.",
    features: ["Pixel-Perfect Design", "Responsive Layouts", "Zero Bloat Code"],
    icon: Zap,
    badge: "High Accuracy",
  },
  {
    id: "custom-apps",
    number: "04",
    title: "Custom Web Applications",
    subtitle: "Scalable Full-Stack Solutions",
    description: "Dynamic full-stack web applications featuring customized business workflows, API integrations, real-time dashboards, and secure backend systems.",
    features: ["Modern React & Node Stack", "RESTful & GraphQL APIs", "Secure User Auth"],
    icon: Layers,
    badge: "Enterprise Ready",
  },
  {
    id: "responsive",
    number: "05",
    title: "Responsive & Mobile-First Design",
    subtitle: "Flawless Multi-Device Experience",
    description: "Fluid, screen-adaptive web design ensuring flawless visuals, micro-interactions, and smooth navigation across mobile phones, tablets, and desktops.",
    features: ["Touch-Optimized UI", "Adaptive Breakpoints", "Micro-Animations"],
    icon: Smartphone,
    badge: "Cross-Platform",
  },
  {
    id: "optimization",
    number: "06",
    title: "Maintenance & Speed Optimization",
    subtitle: "24/7 Security & Performance Support",
    description: "Continuous speed tuning, SSL security audits, domain/hosting management, and 24/7 technical maintenance to keep your site performing at its peak.",
    features: ["24/7 Uptime Monitoring", "SSL & Security Audits", "Continuous Speed Optimization"],
    icon: ShieldCheck,
    badge: "24/7 Support",
  },
];

interface ProjectCardData {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  displayUrl: string;
  tags: string[];
  gradient: string;
}

const clientProjects: ProjectCardData[] = [
  {
    id: "happy-valley",
    name: "Happy Valley Park",
    category: "Resort & Amusement Park",
    description: "Interactive resort & water park platform engineered for seamless user booking, attraction exploration, and visitor engagement.",
    url: "https://www.gohappyvalley.com",
    displayUrl: "www.gohappyvalley.com",
    tags: ["Custom Web", "Resort Portal", "SEO Optimized"],
    gradient: "linear-gradient(135deg, rgba(255, 122, 0, 0.15) 0%, rgba(20, 15, 10, 0.9) 100%)",
  },
  {
    id: "ande-industries",
    name: "Ande Industries",
    category: "Industrial & Manufacturing",
    description: "High-impact corporate website showcasing industrial manufacturing capabilities, heavy equipment solutions, and client inquiry flows.",
    url: "https://andeitpl.com/",
    displayUrl: "andeitpl.com",
    tags: ["Corporate Web", "Industrial UX", "Lead Generation"],
    gradient: "linear-gradient(135deg, rgba(255, 122, 0, 0.2) 0%, rgba(15, 12, 10, 0.95) 100%)",
  },
  {
    id: "saha-marble",
    name: "Saha Marble and Tiles",
    category: "Building & Architecture",
    description: "Elegant product showcase catalog displaying premium marble collections, tile designs, and direct architectural consultation forms.",
    url: "http://sahamarbleandtiles.com",
    displayUrl: "sahamarbleandtiles.com",
    tags: ["Product Showcase", "Tile Catalog", "Fast Load"],
    gradient: "linear-gradient(135deg, rgba(255, 170, 0, 0.15) 0%, rgba(18, 14, 10, 0.9) 100%)",
  },
  {
    id: "gupta-interior",
    name: "Gupta Interior",
    category: "Interior & Architecture Design",
    description: "Sleek portfolio platform presenting luxury residential and commercial interior design transformations with high-res galleries.",
    url: "https://www.guptainterior.com/",
    displayUrl: "www.guptainterior.com",
    tags: ["Interior Portfolio", "Visual Showcase", "Modern UI"],
    gradient: "linear-gradient(135deg, rgba(255, 122, 0, 0.18) 0%, rgba(12, 10, 8, 0.95) 100%)",
  },
  {
    id: "buco-elevators",
    name: "Buco Elevators",
    category: "Engineering & Machinery",
    description: "Professional industrial website for elevator manufacturing, maintenance services, technical specifications, and client support.",
    url: "https://bucoelevators.in/",
    displayUrl: "bucoelevators.in",
    tags: ["Engineering Web", "Client Support", "Responsive UI"],
    gradient: "linear-gradient(135deg, rgba(255, 122, 0, 0.15) 0%, rgba(15, 12, 10, 0.9) 100%)",
  },
  {
    id: "advocate-raju",
    name: "Advocate Raju Kumar Sha",
    category: "Legal & Professional Services",
    description: "Authoritative legal counsel portal detailing practice areas, legal consultation scheduling, and client case inquiry management.",
    url: "https://rajkumarsha.com/",
    displayUrl: "rajkumarsha.com",
    tags: ["Legal Portal", "Consultation Setup", "Clean Design"],
    gradient: "linear-gradient(135deg, rgba(255, 140, 0, 0.15) 0%, rgba(14, 11, 9, 0.95) 100%)",
  },
  {
    id: "swarup-jewellers",
    name: "Swarup Jewellers",
    category: "Luxury Retail & E-Commerce",
    description: "Exquisite online jewelry catalog showcasing handcrafted gold and diamond collections with instant store inquiry access.",
    url: "https://swarupjewellers.com/",
    displayUrl: "swarupjewellers.com",
    tags: ["Luxury Retail", "Jewelry Catalog", "High Conversion"],
    gradient: "linear-gradient(135deg, rgba(255, 180, 0, 0.18) 0%, rgba(16, 12, 8, 0.95) 100%)",
  },
];

// ----------------------------------------------------------------------
// Main WebDev Page Component
// ----------------------------------------------------------------------

function WebDevPage() {
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
    <div className="rasa-site webdev-page-container">
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
          <Link to="/webdev" className="text-orange-500 font-semibold" onClick={closeMenu}>Web Dev</Link>
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
        {/* Web Development Hero Section */}
        <section className="webdev-hero">
          <div className="webdev-hero-inner">
            <div className="webdev-hero-badge">
              <Sparkles size={16} />
              <span>HIGH-PERFORMANCE WEB ENGINEERING</span>
            </div>
            <h1 className="webdev-hero-heading">
              ACCURATE, FAST &amp; SCALABLE
              <br />
              <span className="gradient-text-orange-white">WEB DEVELOPMENT SOLUTIONS.</span>
            </h1>
            <p className="webdev-hero-subtext">
              We design and engineer lightning-fast static websites, robust e-commerce platforms, and custom web applications that captivate users, boost search rankings, and accelerate business growth.
            </p>
            <div className="webdev-hero-actions">
              <MagneticButton>
                <a href="#projects" className="webdev-hero-primary-btn">
                  EXPLORE OUR PROJECTS <ArrowUpRight size={16} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="/#contact" className="webdev-hero-secondary-btn">
                  REQUEST A QUOTE
                </a>
              </MagneticButton>
            </div>

            {/* 3D Web Development Visual */}
            <div className="webdev-visual-hero-graphic">
              <div className="graphic-frame-container">
                <img
                  src="/web_dev.png"
                  alt="RASA Tech Web Development"
                  className="webdev-hero-main-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Web Development Services Section */}
        <section className="webdev-services-section">
          <div className="webdev-section-head">
            <p className="webdev-eyebrow">WHAT WE BUILD</p>
            <h2>OUR WEB DEVELOPMENT SERVICES</h2>
            <p className="webdev-section-subtitle">
              Tailored web solutions engineered for speed, accuracy, and high conversion.
            </p>
          </div>

          <div className="webdev-services-grid">
            {webDevServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="webdev-service-card">
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

        {/* Our Projects Section */}
        <section id="projects" className="webdev-projects-section">
          <div className="webdev-section-head">
            <p className="webdev-eyebrow">PROVEN PORTFOLIO</p>
            <h2>OUR FEATURED WEB PROJECTS</h2>
            <p className="webdev-section-subtitle">
              Explore real-world client websites designed, developed, and deployed by RASA Tech.
            </p>
          </div>

          <div className="webdev-projects-grid">
            {clientProjects.map((project) => (
              <div
                key={project.id}
                className="webdev-project-card"
                style={{ background: project.gradient }}
              >
                <div className="project-card-top">
                  <span className="project-category-tag">{project.category}</span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-visit-icon-btn"
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalLink size={18} />
                  </a>
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

                <div className="project-card-footer">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-visit-btn"
                  >
                    <span>VISIT WEBSITE</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <span className="project-link-display">{project.displayUrl}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="webdev-cta">
          <div className="final-signal" />
          <div className="webdev-cta-inner">
            <p className="eyebrow">READY TO BUILD YOUR WEBSITE?</p>
            <h2>LET'S ENGINEER YOUR DIGITAL PRESENCE.</h2>
            <p>
              Connect with our web engineering team today to build a fast, accurate, and high-converting website for your business.
            </p>
            <div className="final-cta-action">
              <MagneticButton>
                <a href="/#contact" className="start-conversation-btn">
                  START YOUR WEB PROJECT <ArrowUpRight size={16} />
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
