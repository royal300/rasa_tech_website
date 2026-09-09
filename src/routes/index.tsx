import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Globe2,
  Menu,
  MessageCircle,
  Search,
  Server,
  Share2,
  Smartphone,
  X,
} from "lucide-react";
import Lenis from "lenis";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const logoUrl = "/logo.png";

type Service = {
  number: string;
  name: string;
  description: string;
  capabilities: string[];
  icon: typeof Code2;
  visual: "browser" | "social" | "search" | "server" | "phone" | "messages";
};

const services: Service[] = [
  {
    number: "01",
    name: "WEB DEVELOPMENT",
    description: "Fast, accessible and high-performance websites and web applications built around your business goals.",
    capabilities: ["Custom Websites", "Web Applications", "Performance Optimization"],
    icon: Code2,
    visual: "browser",
  },
  {
    number: "02",
    name: "SOCIAL MEDIA MARKETING",
    description: "Content-driven social strategies designed to build attention, engagement and consistent brand presence.",
    capabilities: ["Content Strategy", "Social Management", "Audience Growth"],
    icon: Share2,
    visual: "social",
  },
  {
    number: "03",
    name: "SEO & GMB",
    description: "Search optimization and Google Business Profile strategies designed to improve visibility and bring the right customers to your business.",
    capabilities: ["Technical SEO", "Local SEO", "Google Business Profile"],
    icon: Search,
    visual: "search",
  },
  {
    number: "04",
    name: "SERVER HOSTING",
    description: "Reliable hosting infrastructure designed for speed, stability, security and dependable digital performance.",
    capabilities: ["Managed Hosting", "Server Monitoring", "Performance & Security"],
    icon: Server,
    visual: "server",
  },
  {
    number: "05",
    name: "APP DEVELOPMENT",
    description: "Modern mobile applications designed around real user experiences, business needs and scalable technology.",
    capabilities: ["Mobile Apps", "UI / UX", "Scalable Architecture"],
    icon: Smartphone,
    visual: "phone",
  },
  {
    number: "06",
    name: "WHATSAPP ANIMATION",
    description: "Interactive WhatsApp-focused animated experiences that make business communication more engaging and memorable.",
    capabilities: ["Animated Messages", "Interactive Flows", "Communication Visuals"],
    icon: MessageCircle,
    visual: "messages",
  },
];

const serviceOptions = [...services.map((service) => service.name), "OTHER"];

function SignalLine({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`signal-line ${className}`} />;
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function SystemNode({ label, position, icon: Icon }: { label: string; position: string; icon: typeof Code2 }) {
  return (
    <div className={`system-node ${position}`}>
      <div className="system-node-dot"><Icon size={15} strokeWidth={1.5} /></div>
      <span>{label}</span>
    </div>
  );
}

function HeroSystem() {
  return (
    <div className="hero-system" aria-label="RASA Tech digital system visualization">
      <div className="system-orbit system-orbit-one" />
      <div className="system-orbit system-orbit-two" />
      <div className="system-connector connector-one" />
      <div className="system-connector connector-two" />
      <div className="system-connector connector-three" />
      <div className="system-connector connector-four" />
      <div className="system-connector connector-five" />
      <div className="system-signal signal-one" />
      <div className="system-signal signal-two" />
      <div className="system-signal signal-three" />
      <div className="system-signal signal-four" />
      <div className="system-core">
        <span className="core-kicker">SYSTEM / 001</span>
        <span className="core-name">RASA</span>
        <span className="core-name core-name-accent">TECH</span>
        <span className="core-status"><span /> ONLINE / ACTIVE</span>
      </div>
      <SystemNode label="WEB DEVELOPMENT" position="node-web" icon={Globe2} />
      <SystemNode label="SOCIAL MEDIA" position="node-social" icon={Share2} />
      <SystemNode label="SEO & GMB" position="node-seo" icon={Search} />
      <SystemNode label="SERVER HOSTING" position="node-server" icon={Server} />
      <SystemNode label="APP DEVELOPMENT" position="node-app" icon={Smartphone} />
      <SystemNode label="WHATSAPP ANIMATION" position="node-whatsapp" icon={MessageCircle} />
    </div>
  );
}

function AboutSystem() {
  return (
    <div className="about-system" aria-label="RASA Tech approach from idea to growth">
      <div className="about-grid-lines" />
      <div className="about-track"><span /></div>
      {[
        ["IDEA", "01"],
        ["DESIGN", "02"],
        ["TECHNOLOGY", "03"],
        ["MARKETING", "04"],
        ["GROWTH", "05"],
      ].map(([label, number]) => (
        <div className="about-stage reveal stagger-item" key={label}>
          <span className="about-stage-number">{number}</span>
          <span className="about-stage-dot" />
          <strong>{label}</strong>
        </div>
      ))}
      <div className="about-microcopy"><span>BUILD</span><span>LAUNCH</span><span>OPTIMIZE</span><span>GROW</span></div>
    </div>
  );
}

function ServiceVisual({ type }: { type: Service["visual"] }) {
  if (type === "browser") return <div className="visual-browser"><div className="visual-topbar"><i /><i /><i /><span>rasa.tech / system</span></div><div className="browser-body"><div className="code-lines"><i /><i /><i /><i /><i /></div><div className="ui-blocks"><span /><span /><span /><span /></div><div className="browser-signal" /></div></div>;
  if (type === "social") return <div className="visual-social"><div className="social-panel social-panel-main"><span className="visual-avatar" /><b>content / 02</b><i /><i /><i /></div><div className="social-panel social-panel-small"><span>↑ 84.2%</span><small>audience signal</small></div><div className="social-panel social-panel-dot"><MessageCircle size={14} /></div><div className="social-line" /></div>;
  if (type === "search") return <div className="visual-search"><div className="search-box"><Search size={13} /><span>your business</span><b>⌕</b></div><div className="search-result"><span>01</span><div><b>RASA TECH</b><small>Digital systems built to grow</small></div><em>↑</em></div><div className="search-result muted"><span>02</span><div><b>LOCAL RESULT</b><small>Visibility / 74%</small></div><em>↑</em></div><div className="search-graph"><i /><i /><i /><i /><i /><i /></div></div>;
  if (type === "server") return <div className="visual-server"><div className="server-stack"><span /><span /><span /></div><div className="server-status"><b><i /> ALL SYSTEMS</b><small>99.98% uptime</small></div><div className="server-node server-node-a" /><div className="server-node server-node-b" /><div className="server-link" /></div>;
  if (type === "phone") return <div className="visual-phone"><div className="phone-frame"><div className="phone-notch" /><div className="phone-screen"><span className="phone-greeting">HELLO, WORLD<span>.</span></span><div className="phone-card"><small>ACTIVITY</small><b>+ 24.08%</b><i /></div><div className="phone-nav"><span /><span /><span /></div></div></div><div className="phone-signal" /></div>;
  return <div className="visual-messages"><div className="message-bubble bubble-left">Hi, let's build <span>↗</span></div><div className="message-bubble bubble-right">Something great.</div><div className="message-typing"><i /><i /><i /></div><div className="message-pulse" /></div>;
}

function ServiceModule({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className={`service-module service-${service.number} reveal stagger-item`}>
      <div className="service-head"><span className="service-number">{service.number}</span><Icon size={18} strokeWidth={1.5} /><span className="service-arrow"><ArrowUpRight size={18} /></span></div>
      <div className="service-copy"><h3>{service.name}</h3><p>{service.description}</p><ul>{service.capabilities.map((capability) => <li key={capability}><Check size={13} />{capability}</li>)}</ul></div>
      <ServiceVisual type={service.visual} />
      <SignalLine />
    </article>
  );
}

function PricingPlan({ number, name, description, popular, children }: { number: string; name: string; description: string; popular?: boolean; children: ReactNode }) {
  return <article className={`pricing-plan reveal stagger-item ${popular ? "pricing-plan-featured" : ""}`}><div className="plan-top"><span>{number}</span>{popular && <b>MOST POPULAR</b>}</div><h3>{name}</h3><p>{description}</p><div className="plan-price">{name === "CUSTOM" ? "LET'S DISCUSS" : "₹ XX,XXX"}</div><div className="plan-rule" /><span className="plan-includes">INCLUDES</span><ul>{children}</ul><a className="text-link" href="#contact">START A CONVERSATION <ArrowUpRight size={15} /></a></article>;
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RASA Tech — Digital Marketing & Technology" },
      { name: "description", content: "RASA Tech builds high-performance websites, digital experiences, marketing systems and technology that help businesses grow." },
      { property: "og:title", content: "RASA Tech — Digital Marketing & Technology" },
      { property: "og:description", content: "RASA Tech builds digital systems built to grow." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3) });
    let lenisRaf = 0;
    const lenisLoop = (time: number) => { lenis.raf(time); lenisRaf = requestAnimationFrame(lenisLoop); };
    lenisRaf = requestAnimationFrame(lenisLoop);
    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href");
      if (!id || id === "#") return;
      const section = document.querySelector<HTMLElement>(id);
      if (!section) return;
      event.preventDefault();
      lenis.scrollTo(section, { offset: -70, duration: 1.2 });
    };
    document.addEventListener("click", handleAnchorClick);
    return () => { document.removeEventListener("click", handleAnchorClick); cancelAnimationFrame(lenisRaf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
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
    window.addEventListener("mousemove", moveCursor);
    const interactive = document.querySelectorAll("a, button, .service-module");
    interactive.forEach((element) => { element.addEventListener("mouseenter", () => cursor?.classList.add("cursor-hover")); element.addEventListener("mouseleave", () => cursor?.classList.remove("cursor-hover")); });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", moveCursor); cancelAnimationFrame(raf); revealObserver.disconnect(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <div className="rasa-site">
      <div className="custom-cursor" aria-hidden="true"><span /></div>
      <div className="site-network" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <a className="brand-mark" href="#home" onClick={closeMenu}><img src={logoUrl} alt="RASA Tech" /></a>
        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {[["Home", "home"], ["About", "about"], ["Services", "services"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        </nav>
        <Button asChild className="header-cta"><a href="#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a></Button>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <main>
        <section id="home" className="hero-section page-section">
          <div className="hero-grid" />
          <div className="hero-copy reveal"><p className="eyebrow"><span className="eyebrow-pulse" />RASA TECH <span>/</span> DIGITAL SYSTEMS</p><h1>Marketing That<br /><span>Moves Business.</span></h1><p className="hero-description">RASA Tech builds websites, digital experiences, marketing systems and technology that help ambitious businesses grow.</p><div className="hero-actions"><Button asChild><a href="#contact">START A PROJECT <ArrowUpRight size={17} /></a></Button><a className="outline-action" href="#services">EXPLORE SERVICES <ArrowDown size={16} /></a></div></div>
          <div className="hero-visual reveal"><HeroSystem /></div>
          <div className="hero-scroll-line" aria-hidden="true" />
        </section>

        <div className="capability-strip"><div className="marquee-track">{[...Array(2)].flatMap((_, group) => services.map((service) => <span key={`${group}-${service.name}`}>{service.name} <b>•</b></span>))}</div></div>

        <section id="about" className="about-section page-section content-section">
          <div className="section-grid"><div className="section-intro reveal"><SectionLabel number="01">ABOUT RASA TECH</SectionLabel><h2>WE TURN DIGITAL PRESENCE<br /><span>INTO DIGITAL ADVANTAGE.</span></h2><p>RASA Tech combines technology, design and digital marketing to create digital systems that are built to perform — not simply look good.</p><a className="text-link" href="#contact">BUILD WITH US <ArrowUpRight size={15} /></a></div><div className="about-visual reveal"><AboutSystem /></div></div>
        </section>

        <section id="services" className="services-section page-section content-section"><div className="section-heading reveal"><SectionLabel number="02">SERVICES</SectionLabel><div><h2>DIGITAL SYSTEMS<br /><span>BUILT TO PERFORM.</span></h2><p>Six focused capabilities. One connected system designed around where you want to go next.</p></div></div><div className="services-grid">{services.map((service) => <ServiceModule service={service} key={service.number} />)}</div></section>

        <section id="process" className="process-section page-section content-section"><div className="section-heading reveal"><SectionLabel number="03">PROCESS</SectionLabel><div><h2>FROM IDEA<br /><span>TO IMPACT.</span></h2></div></div><div className="process-track">{[["01", "DISCOVER", "Understand the business, audience and objective."], ["02", "STRATEGIZE", "Define the digital direction and growth system."], ["03", "BUILD", "Design and develop the required digital experience."], ["04", "GROW", "Launch, optimize and continuously improve."]].map(([number, title, copy]) => <div className="process-stage reveal stagger-item" key={number}><div className="process-node"><span>{number}</span></div><h3>{title}</h3><p>{copy}</p></div>)}</div></section>

        <section id="why" className="why-section page-section content-section"><div className="section-grid why-grid"><div className="section-intro reveal"><SectionLabel number="04">WHY RASA TECH</SectionLabel><h2>NOT JUST ANOTHER<br /><span>DIGITAL AGENCY.</span></h2><p className="why-lead">We connect the thinking, making and momentum it takes to turn digital into an advantage.</p></div><div className="statement-list">{["STRATEGY BEFORE EXECUTION.", "DESIGN THAT COMMUNICATES.", "DEVELOPMENT THAT PERFORMS.", "MARKETING BUILT AROUND GROWTH.", "TECHNOLOGY THAT SCALES."].map((statement, index) => <div className="statement reveal stagger-item" key={statement}><span>0{index + 1}</span><strong>{statement}</strong><ArrowUpRight size={17} /></div>)}</div></div></section>

        <section id="pricing" className="pricing-section page-section content-section"><div className="section-heading reveal"><SectionLabel number="05">PRICING</SectionLabel><div><h2>CHOOSE THE RIGHT<br /><span>LEVEL OF GROWTH.</span></h2><p>Clear starting points for different stages of your next digital system.</p></div></div><div className="pricing-grid"><PricingPlan number="01" name="STARTER" description="For businesses establishing their digital foundation."><li>Web Development</li><li>SEO & GMB</li><li>Social Media Marketing</li></PricingPlan><PricingPlan number="02" name="GROWTH" description="For businesses ready to expand their digital presence." popular><li>Web Development</li><li>Social Media Marketing</li><li>SEO & GMB</li><li>App Development</li></PricingPlan><PricingPlan number="03" name="CUSTOM" description="For businesses requiring a tailored digital system."><li>All six capabilities</li><li>Tailored system design</li><li>Ongoing direction</li></PricingPlan></div></section>

        <section id="contact" className="contact-section page-section content-section"><div className="section-grid contact-grid"><div className="section-intro reveal"><SectionLabel number="06">CONTACT</SectionLabel><h2>HAVE AN IDEA?<br /><span>LET'S BUILD IT.</span></h2><p>Tell us what you're building, what you're trying to improve, or where you want to grow.</p><div className="contact-details"><a href="mailto:hello@rasatech.com">hello@rasatech.com <ArrowUpRight size={14} /></a><span>+91 XXXXX XXXXX</span><span>INDIA</span><span>WHATSAPP <ArrowUpRight size={14} /></span></div></div><div className="contact-form-wrap reveal">{submitted ? <div className="form-success"><div><Check /></div><h3>MESSAGE RECEIVED.</h3><p>We'll be in touch at the email you shared.</p><button onClick={() => setSubmitted(false)}>SEND ANOTHER <ArrowUpRight size={14} /></button></div> : <form onSubmit={handleSubmit}><div className="form-row"><label>NAME<input required name="name" placeholder="Your name" /></label><label>EMAIL<input required type="email" name="email" placeholder="you@company.com" /></label></div><div className="form-row"><label>PHONE<input name="phone" placeholder="+91 XXXXX XXXXX" /></label><label>COMPANY<input name="company" placeholder="Company name" /></label></div><label>SERVICE<div className="select-wrap"><select name="service" defaultValue=""><option value="" disabled>Select a service</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={16} /></div></label><label>MESSAGE<textarea required name="message" placeholder="Tell us about your next move..." rows={4} /></label><Button type="submit">START A CONVERSATION <ArrowUpRight size={16} /></Button></form>}</div></div></section>

        <section className="final-cta page-section"><SignalLine className="final-signal" /><div className="final-cta-inner reveal"><p className="eyebrow"><span className="eyebrow-pulse" />THE NEXT SYSTEM STARTS HERE</p><h2>READY TO BUILD<br /><span>WHAT'S NEXT?</span></h2><p>Let's turn your next digital idea into something built to perform.</p><Button asChild><a href="#contact">START A CONVERSATION <ArrowUpRight size={17} /></a></Button></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="brand-mark" href="#home"><img src={logoUrl} alt="RASA Tech" /></a><div className="footer-links">{[["Home", "home"], ["About", "about"], ["Services", "services"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-social"><a href="#contact">LINKEDIN <ArrowUpRight size={14} /></a><a href="#contact">INSTAGRAM <ArrowUpRight size={14} /></a><a href="#contact">WHATSAPP <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>DIGITAL MARKETING <b>•</b> WEB DEVELOPMENT <b>•</b> TECHNOLOGY</span><span>© 2026 RASA TECH. ALL RIGHTS RESERVED.</span></div></footer>
      <div className="scroll-top"><Activity size={13} /> SIGNAL / ACTIVE</div>
    </div>
  );
}
