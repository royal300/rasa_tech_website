import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  Twitter,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";

const logoUrl = "/logo.png";
const dummyUserImg = "/dummy-user.jpg";

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

type TeamMember = {
  id: string;
  name: string;
  role: string;
  badge: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
};

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ashok Kumar Das",
    role: "CEO & Founder",
    badge: "Leadership",
    bio: "Driving strategic vision, market positioning, and agency expansion across high-impact digital sectors.",
    image: "/teams/ashok.jpg",
    linkedin: "https://linkedin.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "2",
    name: "Disha Das",
    role: "Co-Founder & Manager",
    badge: "Management",
    bio: "Overseeing operations, team management, client relations, and brand growth initiatives.",
    image: "/teams/disha.jpg",
    linkedin: "https://linkedin.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "3",
    name: "Riju Karmakar",
    role: "Co-Founder & Operational Head",
    badge: "Operations",
    bio: "Optimizing client campaign execution, project roadmaps, and cross-functional team workflows.",
    image: "/teams/riju.jpg",
    linkedin: "https://linkedin.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "4",
    name: "Amit Karmakar",
    role: "Co-Founder & Developer",
    badge: "Technology",
    bio: "Architecting cloud systems, web performance engines, and automated business integrations.",
    image: "/teams/amit.jpg",
    linkedin: "https://linkedin.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "5",
    name: "Sandipan Sarkar",
    role: "Co-Founder & Editor",
    badge: "Editorial",
    bio: "Spearheading multi-channel video editing, visual storytelling, and high-impact digital creative content.",
    image: "/teams/sandipan.jpg",
    linkedin: "https://linkedin.com",
    email: "mailto:support@rasatech.in",
  },
];

function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn-wrap ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition: position.x === 0 && position.y === 0 
          ? "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" 
          : "transform 0.12s ease-out",
      }}
    >
      {children}
    </div>
  );
}

function MouseSpotlight() {
  const [spotlightPos, setSpotlightPos] = useState({ opacity: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setSpotlightPos({ opacity: 1 });
      document.documentElement.style.setProperty("--spotlight-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--spotlight-y", `${e.clientY}px`);
    };

    const handleMouseLeave = () => {
      setSpotlightPos({ opacity: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="mouse-spotlight-layer"
      style={{ opacity: spotlightPos.opacity }}
      aria-hidden="true"
    />
  );
}

function TeamCard({ member, className = "" }: { member: TeamMember; className?: string }) {
  const [cardMouse, setCardMouse] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const xPct = (px / rect.width) * 100;
    const yPct = (py / rect.height) * 100;
    const rotateX = -((py - rect.height / 2) / (rect.height / 2)) * 8;
    const rotateY = ((px - rect.width / 2) / (rect.width / 2)) * 8;
    setCardMouse({ x: xPct, y: yPct, rotateX, rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setCardMouse({ x: 50, y: 50, rotateX: 0, rotateY: 0, isHovered: false });
  };

  return (
    <div
      className={`team-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: cardMouse.isHovered
          ? `perspective(1000px) rotateX(${cardMouse.rotateX}deg) rotateY(${cardMouse.rotateY}deg) translateY(-6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: cardMouse.isHovered ? "transform 0.1s cubic-bezier(0.1, 1, 0.1, 1)" : "transform 0.5s ease",
      }}
    >
      <div
        className="service-spotlight"
        style={{
          opacity: cardMouse.isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${cardMouse.x}% ${cardMouse.y}%, rgba(255, 122, 0, 0.22), transparent 70%)`,
        }}
      />
      <div className="team-card-img-wrapper">
        <img src={member.image} alt={member.name} />
        <div className="team-card-img-overlay" />
      </div>
      <div className="team-card-body">
        <span className="team-role-badge">{member.badge}</span>
        <h3>{member.name}</h3>
        <div className="team-card-title">{member.role}</div>
        <p className="team-card-bio">{member.bio}</p>
        <div className="team-card-socials">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          )}
          {member.email && (
            <a href={member.email} aria-label="Email">
              <Mail size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function FounderQuoteCard() {
  const [cardMouse, setCardMouse] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const xPct = (px / rect.width) * 100;
    const yPct = (py / rect.height) * 100;
    const rotateX = -((py - rect.height / 2) / (rect.height / 2)) * 6;
    const rotateY = ((px - rect.width / 2) / (rect.width / 2)) * 6;
    setCardMouse({ x: xPct, y: yPct, rotateX, rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setCardMouse({ x: 50, y: 50, rotateX: 0, rotateY: 0, isHovered: false });
  };

  return (
    <div
      className="founder-quote-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: cardMouse.isHovered
          ? `perspective(1000px) rotateX(${cardMouse.rotateX}deg) rotateY(${cardMouse.rotateY}deg) translateY(-6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: cardMouse.isHovered ? "transform 0.1s cubic-bezier(0.1, 1, 0.1, 1)" : "transform 0.5s ease",
      }}
    >
      <div
        className="service-spotlight"
        style={{
          opacity: cardMouse.isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${cardMouse.x}% ${cardMouse.y}%, rgba(255, 122, 0, 0.22), transparent 70%)`,
        }}
      />
      <div className="founder-quote-watermark" aria-hidden="true">“</div>
      <div className="founder-quote-inner">
        <div className="founder-quote-top">
          <div className="founder-quote-badge">
            <Sparkles size={11} className="quote-badge-icon" />
            <span>MISSION & VISION</span>
          </div>
          <div className="quote-mark" aria-hidden="true">“</div>
          <blockquote className="founder-quote-content">
            Our mission is not just to build digital presence, but to engineer scalable digital advantage. We combine relentless technology with bold creative execution to empower ambitious brands to dominate their space.
          </blockquote>
        </div>
        <div className="founder-quote-author">
          <div className="founder-quote-line" />
          <div className="founder-quote-meta">
            <span className="founder-name">Ashok Kumar Das</span>
            <span className="founder-title">Founder & CEO, RASA Tech</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPage() {
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

  const founder = teamMembers[0];
  const restMembers = teamMembers.slice(1);

  return (
    <div className="rasa-site">
      <MouseSpotlight />
      <div className="custom-cursor" aria-hidden="true"><span /></div>
      <div className="site-network" aria-hidden="true"><span /><span /><span /><span /><span /></div>

      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <Link className="brand-mark" to="/" onClick={closeMenu}>
          <img src={logoUrl} alt="RASA Tech" />
        </Link>
        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <a href="/#about" onClick={closeMenu}>About</a>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <a href="/#pricing" onClick={closeMenu}>Pricing</a>
          <Link to="/team" className="text-orange-500 font-semibold" onClick={closeMenu}>Our Team</Link>
          <a href="/#contact" onClick={closeMenu}>Contact</a>
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
            <a href="/#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a>
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
        {/* Team Hero Section */}
        <section className="team-hero">
          <div className="team-hero-inner">
            <h1 className="team-hero-heading">
              MEET THE MINDS BEHIND
              <br />
              <span className="gradient-text-orange-white">RASA TECH.</span>
            </h1>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="team-container">
            {/* Row 1: Ashok Kumar Das first with motivational quote beside him */}
            <div className="team-founder-spotlight">
              <div className="founder-card-col">
                <TeamCard member={founder} className="founder-spotlight-card" />
              </div>
              <div className="founder-quote-col">
                <FounderQuoteCard />
              </div>
            </div>

            {/* Next Row: Rest 4 Members in a single line on desktop */}
            <div className="team-members-row">
              <div className="team-members-grid">
                {restMembers.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="final-cta">
          <div className="final-signal" />
          <div className="final-cta-inner">
            <p className="eyebrow">READY TO WORK WITH US?</p>
            <h2>LET'S BUILD SOMETHING GREAT.</h2>
            <p>Connect with our team today and let's supercharge your digital growth.</p>
            <div className="final-cta-action">
              <MagneticButton>
                <a href="/#contact" className="start-conversation-btn">
                  START A CONVERSATION <ArrowUpRight size={16} />
                </a>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

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
