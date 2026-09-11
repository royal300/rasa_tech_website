import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Linkedin,
  Mail,
  Menu,
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
  twitter?: string;
  email?: string;
};

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ashok Kumar Das",
    role: "CEO & Founder",
    badge: "Leadership",
    bio: "Driving strategic vision, market positioning, and agency expansion across high-impact digital sectors.",
    image: dummyUserImg,
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "2",
    name: "Amit Karmakar",
    role: "Co-Founder & CTO",
    badge: "Technology",
    bio: "Architecting cloud systems, web performance engines, and automated business integrations.",
    image: dummyUserImg,
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "3",
    name: "Riju Karmakar",
    role: "Strategic Operations Director",
    badge: "Operations",
    bio: "Optimizing client campaign execution, project roadmaps, and cross-functional team workflows.",
    image: dummyUserImg,
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "4",
    name: "Sandipan Sarkar",
    role: "Head of Digital Marketing",
    badge: "Marketing",
    bio: "Spearheading multi-channel growth, performance marketing, and targeted ROI-driven campaigns.",
    image: dummyUserImg,
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:support@rasatech.in",
  },
  {
    id: "5",
    name: "Disha Das",
    role: "Lead UI/UX & Brand Strategist",
    badge: "Design",
    bio: "Crafting intuitive digital product experiences, high-converting interfaces, and sleek design systems.",
    image: dummyUserImg,
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:support@rasatech.in",
  },
];

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

  return (
    <div className="rasa-site">
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
            <Button asChild className="w-full h-12 text-sm font-semibold border-orange bg-orange text-black hover:bg-orange-hot">
              <a href="/#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a>
            </Button>
          </div>
        </nav>
        <Button asChild className="header-cta">
          <a href="/#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a>
        </Button>
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

        {/* 4 Column x 2 Row Team Grid */}
        <section className="team-section">
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
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
                        <Linkedin size={15} />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Twitter size={15} />
                      </a>
                    )}
                    {member.email && (
                      <a href={member.email} aria-label="Email">
                        <Mail size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
              <a href="/#contact" className="start-conversation-btn">
                START A CONVERSATION <ArrowUpRight size={16} />
              </a>
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
              <a href="/#contact">INSTAGRAM <ArrowUpRight size={13} /></a>
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
