import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
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
  Users,
  X,
} from "lucide-react";
import Lenis from "lenis";
import { useEffect, useState, useRef, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const logoUrl = "/logo.png";

type Service = {
  number: string;
  name: string;
  description: string;
  capabilities: string[];
  icon: typeof Code2;
  visual: "browser" | "social" | "search" | "influencer" | "phone" | "messages";
};

const services: Service[] = [
  {
    number: "01",
    name: "Web Development",
    description: "Fast, accessible and high-performance websites and web applications built around your business goals.",
    capabilities: ["Custom Websites", "Web Applications", "Performance Optimization"],
    icon: Code2,
    visual: "browser",
  },
  {
    number: "02",
    name: "Social Media Marketing",
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
    name: "Influencer Marketing",
    description: "Strategic creator and influencer partnerships designed to amplify brand authority, drive viral engagement, and convert targeted audiences.",
    capabilities: ["Creator Partnerships", "Campaign Management", "Brand Reach & Growth"],
    icon: Users,
    visual: "influencer",
  },
  {
    number: "05",
    name: "App Development",
    description: "Modern mobile applications designed around real user experiences, business needs and scalable technology.",
    capabilities: ["Mobile Apps", "UI / UX", "Scalable Architecture"],
    icon: Smartphone,
    visual: "phone",
  },
  {
    number: "06",
    name: "WhatsApp Automation",
    description: "Automated WhatsApp communication flows, lead capture, and instant business messaging systems that drive sales.",
    capabilities: ["Automated Flow Setup", "Lead Generation", "Custom Business Messaging"],
    icon: MessageCircle,
    visual: "messages",
  },
];

const serviceOptions = [...services.map((service) => service.name), "OTHER"];

const clientRow1 = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
];

const clientRow2 = [
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
];

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

function TypewriterHeading() {
  const line1 = "MARKETING  THAT";
  const line2 = "MOVES  BUSINESS.";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [phase, setPhase] = useState<"typing1" | "typing2" | "pause" | "deleting">("typing1");

  useEffect(() => {
    let timer: any;
    if (phase === "typing1") {
      if (text1.length < line1.length) {
        timer = setTimeout(() => setText1(line1.substring(0, text1.length + 1)), 65);
      } else {
        setPhase("typing2");
      }
    } else if (phase === "typing2") {
      if (text2.length < line2.length) {
        timer = setTimeout(() => setText2(line2.substring(0, text2.length + 1)), 65);
      } else {
        setPhase("pause");
      }
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), 2600);
    } else if (phase === "deleting") {
      if (text2.length > 0) {
        timer = setTimeout(() => setText2(line2.substring(0, text2.length - 1)), 35);
      } else if (text1.length > 0) {
        timer = setTimeout(() => setText1(line1.substring(0, text1.length - 1)), 35);
      } else {
        setPhase("typing1");
      }
    }
    return () => clearTimeout(timer);
  }, [text1, text2, phase]);

  return (
    <h1 className="typewriter-h1">
      {text1}
      {phase === "typing1" && <span className="typewriter-cursor">|</span>}
      <br />
      <span>
        {text2}
        {(phase === "typing2" || phase === "pause" || phase === "deleting") && (
          <span className="typewriter-cursor">|</span>
        )}
      </span>
    </h1>
  );
}

function HeroSystem({ mouse = { x: 0, y: 0 } }: { mouse?: { x: number; y: number } }) {
  return (
    <div
      className="hero-system"
      aria-label="RASA Tech digital system visualization"
      style={{
        transform: `perspective(1000px) rotateY(${mouse.x * 12}deg) rotateX(${-mouse.y * 12}deg) translate3d(${mouse.x * 15}px, ${mouse.y * 15}px, 0)`,
        transition: mouse.x === 0 ? "transform 0.6s ease" : "transform 0.1s cubic-bezier(0.1, 1, 0.1, 1)",
      }}
    >
      {/* Orbit 1 with revolving Google, WhatsApp & Instagram1 icons + particle */}
      <div className="system-orbit system-orbit-one">
        <div className="revolving-icon icon-pos-top" title="Google">
          <div className="revolving-icon-inner">
            <img src="/icons/google.png" alt="Google" width="18" height="18" />
          </div>
        </div>
        <div className="revolving-icon icon-pos-bottom" title="WhatsApp">
          <div className="revolving-icon-inner">
            <img src="/icons/whastpp.png" alt="WhatsApp" width="18" height="18" />
          </div>
        </div>
        <a href="https://www.instagram.com/rasatech.in/" target="_blank" rel="noopener noreferrer" className="revolving-icon icon-pos-right" title="Instagram">
          <div className="revolving-icon-inner">
            <img src="/icons/instagram1.webp" alt="Instagram" width="18" height="18" />
          </div>
        </a>
      </div>

      {/* Orbit 2 with revolving Facebook & YouTube icons */}
      <div className="system-orbit system-orbit-two">
        <div className="revolving-icon icon-pos-top-left" title="Facebook">
          <div className="revolving-icon-inner">
            <img src="/icons/facebook.webp" alt="Facebook" width="18" height="18" />
          </div>
        </div>
        <div className="revolving-icon icon-pos-bottom-right" title="YouTube">
          <div className="revolving-icon-inner">
            <img src="/icons/youtube.png" alt="YouTube" width="18" height="18" />
          </div>
        </div>
      </div>

      <div className="system-connector connector-one" />
      <div className="system-connector connector-two" />
      <div className="system-connector connector-three" />
      <div className="system-connector connector-four" />
      <div className="system-connector connector-five" />

      {/* Glowing orange particles traveling between nodes */}
      <div className="system-signal signal-one" />
      <div className="system-signal signal-two" />
      <div className="system-signal signal-three" />
      <div className="system-signal signal-four" />

      {/* System Core containing ONLY RASA TECH */}
      <div className="system-core">
        <span className="core-name">RASA</span>
        <span className="core-name core-name-accent">TECH</span>
      </div>

      <SystemNode label="Web Development" position="node-web" icon={Globe2} />
      <SystemNode label="SOCIAL MEDIA" position="node-social" icon={Share2} />
      <SystemNode label="SEO & GMB" position="node-seo" icon={Search} />
      <SystemNode label="Influencer Marketing" position="node-server" icon={Users} />
      <SystemNode label="App Development" position="node-app" icon={Smartphone} />
      <SystemNode label="WhatsApp Automation" position="node-whatsapp" icon={MessageCircle} />
    </div>
  );
}

function AboutSystem() {
  return (
    <div className="about-laptop-container" aria-label="RASA Tech Showcase Video">
      <div className="laptop-screen-frame">
        <div className="laptop-camera-dot" />
        <div className="laptop-display video-display-wrap">
          <video
            src="/video_1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="laptop-video-player"
          />
        </div>
      </div>
      <div className="laptop-keyboard-base">
        <div className="laptop-notch" />
      </div>
    </div>
  );
}

function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
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

function WhatsAppChatPreview() {
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
    { sender: "bot", text: "👋 Hi! Welcome to RASA Tech. How can we supercharge your business today?", time: "10:30 AM" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const prompts = [
    { label: "⚡ Instant Quote", query: "Can I get an instant pricing quote?", reply: "🚀 Custom Web & Automation projects start at ₹9,999! Includes 24/7 lead sync & CRM integration." },
    { label: "📅 Book Demo", query: "I want to schedule a live demo.", reply: "📅 Great! Our team will connect with you on WhatsApp within 15 mins. Or call 8617201731!" },
    { label: "🤖 Auto Leads", query: "How does auto lead capture work?", reply: "🤖 Every Facebook & website inquiry instantly receives an automated WhatsApp follow-up with your catalog!" },
    { label: "💬 Live Support", query: "Can I talk with a human agent?", reply: "👨‍💻 Connecting you to our lead engineer now. Expect a direct response shortly!" },
  ];

  const handleChipClick = (prompt: typeof prompts[0]) => {
    if (isTyping) return;
    setActivePrompt(prompt.label);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [...prev, { sender: "user", text: prompt.query, time: timeStr }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: prompt.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="interactive-whatsapp-visual">
      <div className="whatsapp-header">
        <div className="whatsapp-avatar-wrap">
          <MessageCircle size={14} className="text-black" />
          <span className="online-indicator" />
        </div>
        <div className="whatsapp-title">
          <b>RASA TECH BOT</b>
          <small>● Online • Instant Automation Demo</small>
        </div>
      </div>
      <div className="whatsapp-chat-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`whatsapp-bubble ${msg.sender === "user" ? "bubble-user" : "bubble-bot"}`}>
            <p>{msg.text}</p>
            <span className="bubble-time">
              {msg.time} {msg.sender === "user" && <span className="check-marks">✓✓</span>}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="whatsapp-bubble bubble-bot typing-indicator">
            <span className="dot" /><span className="dot" /><span className="dot" />
          </div>
        )}
      </div>
      <div className="whatsapp-chips-bar">
        {prompts.map((p) => (
          <button
            key={p.label}
            className={`chat-chip ${activePrompt === p.label ? "active" : ""}`}
            onClick={() => handleChipClick(p)}
            disabled={isTyping}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ServiceVisual({ type }: { type: Service["visual"] }) {
  if (type === "browser") return <div className="visual-browser"><div className="visual-topbar"><i /><i /><i /><span>rasa.tech / system</span></div><div className="browser-body"><div className="code-lines"><i /><i /><i /><i /><i /></div><div className="ui-blocks"><span /><span /><span /><span /></div><div className="browser-signal" /></div></div>;
  if (type === "social") return <div className="visual-social"><div className="social-panel social-panel-main"><span className="visual-avatar" /><b>content / 02</b><i /><i /><i /></div><div className="social-panel social-panel-small"><span>↑ 84.2%</span><small>audience signal</small></div><div className="social-panel social-panel-dot"><MessageCircle size={14} /></div><div className="social-line" /></div>;
  if (type === "search") return <div className="visual-search"><div className="search-box"><Search size={13} /><span>your business</span><b>⌕</b></div><div className="search-result"><span>01</span><div><b>RASA TECH</b><small>Digital systems built to grow</small></div><em>↑</em></div><div className="search-result muted"><span>02</span><div><b>LOCAL RESULT</b><small>Visibility / 74%</small></div><em>↑</em></div><div className="search-graph"><i /><i /><i /><i /><i /><i /></div></div>;
  if (type === "influencer")
    return (
      <div className="visual-influencer">
        <div className="influencer-card">
          <div className="influencer-header">
            <span className="influencer-avatar">
              <Users size={12} />
            </span>
            <div className="influencer-info">
              <b>CREATOR NETWORK</b>
              <small>Verified Campaign</small>
            </div>
            <span className="influencer-badge">ACTIVE</span>
          </div>
          <div className="influencer-stats">
            <div>
              <small>TOTAL REACH</small>
              <b>1.2M+</b>
            </div>
            <div>
              <small>ENGAGEMENT</small>
              <b className="stat-highlight">8.4% ↑</b>
            </div>
          </div>
        </div>
        <div className="influencer-pulse-wrap">
          <span className="pulse-ring ring-1" />
          <span className="pulse-ring ring-2" />
          <div className="influencer-node">
            <Users size={12} />
          </div>
        </div>
      </div>
    );
  if (type === "phone") return <div className="visual-phone"><div className="phone-frame"><div className="phone-notch" /><div className="phone-screen"><span className="phone-greeting">HELLO, WORLD<span>.</span></span><div className="phone-card"><small>ACTIVITY</small><b>+ 24.08%</b><i /></div><div className="phone-nav"><span /><span /><span /></div></div></div><div className="phone-signal" /></div>;
  return <WhatsAppChatPreview />;
}

function ServiceModule({ service }: { service: Service }) {
  const Icon = service.icon;
  const isHighlighted = service.name === "SEO & GMB";
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
    <article
      className={`service-module service-${service.number} reveal stagger-item ${isHighlighted ? "service-highlighted" : ""}`}
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
      <div className="service-head"><span className="service-number">{service.number}</span><Icon size={18} strokeWidth={1.5} /><span className="service-arrow"><ArrowUpRight size={18} /></span></div>
      <div className="service-copy"><h3>{service.name}</h3><p>{service.description}</p><ul>{service.capabilities.map((capability) => <li key={capability}><Check size={13} />{capability}</li>)}</ul></div>
      <ServiceVisual type={service.visual} />
      <SignalLine />
    </article>
  );
}

function PricingPlan({ number, name, price, description, popular, children }: { number: string; name: string; price: string; description: string; popular?: boolean; children: ReactNode }) {
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
    <article
      className={`pricing-plan reveal stagger-item ${popular ? "pricing-plan-featured" : ""}`}
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
      <div className="plan-top"><span>{number}</span>{popular && <b>MOST POPULAR</b>}</div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="plan-price">{price}</div>
      <div className="plan-rule" />
      <span className="plan-includes">INCLUDES</span>
      <ul>{children}</ul>
      <MagneticButton>
        <a className="text-link" href="#contact">START A CONVERSATION <ArrowUpRight size={15} /></a>
      </MagneticButton>
    </article>
  );
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
  const [pricingCategory, setPricingCategory] = useState<"social" | "web">("social");
  const [activeWhyIndex, setActiveWhyIndex] = useState<number>(0);
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [processProgress, setProcessProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(1);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setHeroMouse({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMouse({ x: 0, y: 0 });
  };

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ultra-smooth Lenis configuration for both Desktop (computer) and Mobile (touch)
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.5,
      touchInertiaExponent: 1.75,
      autoRaf: true,
      anchors: true,
    });
    lenisRef.current = lenis;

    const progressBar = document.getElementById("scroll-progress");

    lenis.on("scroll", ({ scroll, progress }: { scroll: number; progress: number }) => {
      if (progressBar) {
        progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
      }
      setScrolled(scroll > 24);
    });

    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href");
      if (!id || id === "#") return;
      const section = document.querySelector<HTMLElement>(id);
      if (!section) return;
      event.preventDefault();
      setMenuOpen(false);
      lenis.scrollTo(section, { offset: -70, duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } }), { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const company = formData.get("company") || "";
    const service = formData.get("service") || "";
    const message = formData.get("message") || "";

    const text = `*New Inquiry from RASA Tech Website*%0A%0A` +
      `*Name:* ${encodeURIComponent(name.toString())}%0A` +
      `*Email:* ${encodeURIComponent(email.toString())}%0A` +
      `*Phone:* ${encodeURIComponent(phone.toString())}%0A` +
      `*Company:* ${encodeURIComponent(company.toString())}%0A` +
      `*Service Required:* ${encodeURIComponent(service.toString())}%0A` +
      `*Message:* ${encodeURIComponent(message.toString())}`;

    window.open(`https://wa.me/918617201731?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="rasa-site">
      <MouseSpotlight />
      <div id="scroll-progress" className="scroll-progress-bar" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true"><span /></div>
      <div className="site-network" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <a className="brand-mark" href="#home" onClick={closeMenu}><img src={logoUrl} alt="RASA Tech" /></a>
        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <Link to="/team" onClick={closeMenu}>Our Team</Link>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <div className="mobile-only-cta">
            <MagneticButton className="w-full">
              <Button asChild className="w-full h-12 text-sm font-semibold border-orange bg-orange text-black hover:bg-orange-hot">
                <a href="#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a>
              </Button>
            </MagneticButton>
          </div>
        </nav>
        <MagneticButton>
          <Button asChild className="header-cta"><a href="#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a></Button>
        </MagneticButton>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <main>
        <section id="home" className="hero-section page-section" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
          <div className="hero-grid" />
          <div className="hero-copy reveal"><p className="eyebrow"><span className="eyebrow-pulse" />RASA TECH <span>/</span> DIGITAL SYSTEMS</p><TypewriterHeading /><p className="hero-description">RASA Tech builds websites, digital experiences, marketing systems and technology that help ambitious businesses grow.</p><div className="hero-actions"><MagneticButton><Button asChild><a href="#contact">START A PROJECT <ArrowUpRight size={17} /></a></Button></MagneticButton><MagneticButton><a className="outline-action" href="#services">EXPLORE SERVICES <ArrowDown size={16} /></a></MagneticButton></div></div>
          <div className="hero-visual reveal"><HeroSystem mouse={heroMouse} /></div>
          <div className="hero-scroll-line" aria-hidden="true" />
        </section>

        <div className="capability-strip"><div className="marquee-track" style={{ animationDuration: `${Math.max(8, 32 / scrollSpeed)}s` }}>{[...Array(2)].flatMap((_, group) => services.map((service) => <span key={`${group}-${service.name}`}>{service.name} <b>•</b></span>))}</div></div>

        <section id="about" className="about-section page-section content-section">
          <div className="section-grid"><div className="section-intro reveal"><SectionLabel number="01">ABOUT RASA TECH</SectionLabel><h2>WE  TURN  DIGITAL  PRESENCE<br /><span>INTO  DIGITAL  ADVANTAGE.</span></h2><p>RASA Tech combines technology, design and digital marketing to create digital systems that are built to perform — not simply look good.</p><a className="text-link" href="#contact">BUILD WITH US <ArrowUpRight size={15} /></a></div><div className="about-visual reveal"><AboutSystem /></div></div>
        </section>

        <section id="services" className="services-section page-section content-section">
          <div className="section-heading reveal services-header-centered">
            <SectionLabel number="02">SERVICES</SectionLabel>
            <div>
              <h2 className="single-line-heading services-gradient-title">SERVICES  WE  PROVIDE</h2>
            </div>
          </div>
          <div className="services-grid">{services.map((service) => <ServiceModule service={service} key={service.number} />)}</div>
        </section>

        <section id="process" className="process-section page-section content-section">
          <div className="section-heading reveal">
            <SectionLabel number="03">PROCESS</SectionLabel>
            <div>
              <h2 className="single-line-heading">FROM  IDEA  <span>TO  IMPACT.</span></h2>
            </div>
          </div>

          <div className="process-track-wrapper reveal">
            <div className="process-track-line-wrapper">
              <div
                className="process-line-progress"
                style={{
                  width: `${Math.min(100, Math.max(0, processProgress * 100))}%`,
                }}
              />
              <div className="process-running-orange-visual" />
            </div>

            <div className="process-track">
              {[
                ["01", "DISCOVER", "Understand the business, audience and objective.", 0.10],
                ["02", "STRATEGIZE", "Define the digital direction and growth system.", 0.35],
                ["03", "BUILD", "Design and develop the required digital experience.", 0.65],
                ["04", "GROW", "Launch, optimize and continuously improve.", 0.90],
              ].map(([number, title, copy, threshold]) => {
                const isActive = processProgress >= (threshold as number);
                return (
                  <div className={`process-stage ${isActive ? "stage-active" : ""}`} key={number as string}>
                    <div className="process-node">{number}</div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why" className="why-section page-section content-section">
          <div className="section-grid why-grid">
            <div className="section-intro reveal">
              <SectionLabel number="04">WHY RASA TECH</SectionLabel>
              <h2>NOT  JUST  ANOTHER<br /><span>DIGITAL  AGENCY.</span></h2>
              <p className="why-lead">We connect the thinking, making and momentum it takes to turn digital into an advantage.</p>
            </div>
            <div className="statement-list-wrapper reveal">
              <div className="statement-list">
                <div
                  className="why-laser-beam"
                  style={{
                    transform: `translateY(${activeWhyIndex * 64}px)`,
                  }}
                />
                {[
                  "STRATEGY BEFORE EXECUTION.",
                  "DESIGN THAT COMMUNICATES.",
                  "DEVELOPMENT THAT PERFORMS.",
                  "MARKETING BUILT AROUND GROWTH.",
                  "TECHNOLOGY THAT SCALES.",
                ].map((statement, index) => (
                  <div
                    className={`statement stagger-item ${activeWhyIndex === index ? "statement-active" : ""}`}
                    key={statement}
                    onMouseEnter={() => setActiveWhyIndex(index)}
                  >
                    <span className="statement-num">0{index + 1}</span>
                    <strong className="statement-text">{statement}</strong>
                    <ArrowUpRight className="statement-arrow" size={19} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="clients" className="clients-section page-section content-section">
          <div className="section-heading reveal clients-header-centered">
            <SectionLabel number="05">TRUSTED CLIENTS</SectionLabel>
            <div>
              <h2 className="single-line-heading services-gradient-title">TRUSTED  BY  <span>LEADING  BRANDS.</span></h2>
              <p className="clients-lead">We collaborate with forward-thinking companies, fast-growing startups, and ambitious enterprises to build high-impact digital systems.</p>
            </div>
          </div>

          <div className="clients-carousel-wrapper reveal">
            <div className="clients-shade-left" aria-hidden="true" />
            <div className="clients-shade-right" aria-hidden="true" />

            {/* Row 1 Autoplay Marquee - Moving Left */}
            <div className="clients-carousel-row">
              <div className="clients-marquee-track">
                {[...clientRow1, ...clientRow1, ...clientRow1, ...clientRow1].map((file, idx) => (
                  <div key={`r1-${idx}`} className="client-card">
                    <img src={`/ALL%20LOGOS%201080X1080/${file}`} alt={`Client Logo ${file}`} className="client-logo-img" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 Autoplay Marquee - Moving Right */}
            <div className="clients-carousel-row">
              <div className="clients-marquee-track-reverse">
                {[...clientRow2, ...clientRow2, ...clientRow2, ...clientRow2].map((file, idx) => (
                  <div key={`r2-${idx}`} className="client-card">
                    <img src={`/ALL%20LOGOS%201080X1080/${file}`} alt={`Client Logo ${file}`} className="client-logo-img" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-section page-section content-section">
          <div className="section-heading reveal pricing-header-centered">
            <SectionLabel number="06">PRICING</SectionLabel>
            <div>
              <h2 className="single-line-heading services-gradient-title">CHOOSE  THE  RIGHT  <span>LEVEL  OF  GROWTH.</span></h2>
              <p>Clear starting points tailored to your business goals and current stage.</p>
            </div>
          </div>

          <div className="pricing-toggle-container reveal">
            <div className="pricing-toggle-wrap">
              <button
                type="button"
                className={`pricing-toggle-btn ${pricingCategory === "social" ? "active" : ""}`}
                onClick={() => setPricingCategory("social")}
              >
                SOCIAL MEDIA MARKETING
              </button>
              <button
                type="button"
                className={`pricing-toggle-btn ${pricingCategory === "web" ? "active" : ""}`}
                onClick={() => setPricingCategory("web")}
              >
                WEB DEVELOPMENT
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {pricingCategory === "social" ? (
              <>
                <PricingPlan
                  number="01"
                  name="BASIC"
                  price="₹ 14,499 / Month"
                  description="Essential Social Media Management"
                >
                  <li>Facebook & Instagram Management</li>
                  <li>4-5 Post / Week</li>
                  <li>3-4 Short Video / Week</li>
                  <li>2 Long Video / Month</li>
                  <li>Social Media Engagement</li>
                  <li>Content Creation & Strategy</li>
                  <li>Page SEO Optimization</li>
                  <li>Ad Campaign Setup & Monitoring</li>
                  <li>Ad Spent Budget Up to ₹10,000</li>
                  <li>Monthly Reporting</li>
                </PricingPlan>
                <PricingPlan
                  number="02"
                  name="STANDARD"
                  price="₹ 29,999 / Month"
                  popular={true}
                  description="Advanced Growth & Content Strategy"
                >
                  <li>Facebook, Instagram & YouTube Management</li>
                  <li>5-6 Post / Week</li>
                  <li>4-5 Short Video / Week</li>
                  <li>3 Long Video / Month</li>
                  <li>Dedicated Account Manager</li>
                  <li>Brand Strategy & Growth</li>
                  <li>Influencer Collaboration Setup</li>
                  <li>Ad Campaign Optimization</li>
                  <li>Ad Spent Budget Up to ₹25,000</li>
                  <li>Bi-Weekly Reporting & Analytics</li>
                </PricingPlan>
                <PricingPlan
                  number="03"
                  name="PREMIUM"
                  price="₹ 49,999 / Month"
                  description="Complete Digital Brand Dominance"
                >
                  <li>Full Multi-Channel Management</li>
                  <li>Daily Posts & Reels/Shorts</li>
                  <li>4 Long Format Videos / Month</li>
                  <li>Complete Content Production</li>
                  <li>High-Converting Ad Campaigns</li>
                  <li>Advanced Lead Generation System</li>
                  <li>Ad Spent Budget Up to ₹50,000</li>
                  <li>Weekly Performance & ROI Review</li>
                  <li>24/7 Dedicated Support</li>
                </PricingPlan>
              </>
            ) : (
              <>
                <PricingPlan
                  number="01"
                  name="BASIC"
                  price="₹ 29,999"
                  description="Simple Website with Good UI"
                >
                  <li>Custom Domain</li>
                  <li>Free Domain For 1 Year</li>
                  <li>Free SSL Certificate</li>
                  <li>Unlimited Bandwidth</li>
                  <li>10 GB Storage Space</li>
                  <li>24/7 Customer Care</li>
                </PricingPlan>
                <PricingPlan
                  number="02"
                  name="STANDARD"
                  price="₹ 69,999"
                  popular={true}
                  description="Creative Design, Dynamic Website"
                >
                  <li>Basic E-Commerce Website</li>
                  <li>Custom Domain For 1 Year</li>
                  <li>Free Hosting For 1 Year</li>
                  <li>Unlimited Bandwidth</li>
                  <li>50 GB Storage Space</li>
                  <li>250 Product Listing</li>
                  <li>Secure Online Payments</li>
                  <li>Customer Accounts</li>
                  <li>Customized Reports</li>
                  <li>24/7 Customer Care</li>
                </PricingPlan>
                <PricingPlan
                  number="03"
                  name="PREMIUM"
                  price="₹ 1,14,999"
                  description="Dynamic Ecommerce Website"
                >
                  <li>Advance E-Commerce Website</li>
                  <li>Android App With Playstore Publish</li>
                  <li>Secure Online Payments</li>
                  <li>Customer Accounts</li>
                  <li>Free Domain For 1 Year</li>
                  <li>Unlimited Bandwidth</li>
                  <li>Unlimited Storage Space</li>
                  <li>Customized Reports</li>
                  <li>Priority Customer Care</li>
                  <li>Unlimited Product Listing</li>
                  <li>Multiple Currencies</li>
                  <li>Sell On Social Channels</li>
                  <li>Product Review</li>
                  <li>24/7 Customer Care</li>
                  <li>Extra Charges For Additional Requirements</li>
                </PricingPlan>
              </>
            )}
          </div>

          <div className="pricing-custom-quote-wrap reveal">
            <a href="#contact" className="custom-quote-btn">
              NEED A CUSTOM QUOTE? GET IN TOUCH <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section id="contact" className="contact-section page-section content-section"><div className="section-grid contact-grid"><div className="section-intro reveal"><SectionLabel number="07">CONTACT</SectionLabel><h2>HAVE  AN  IDEA?<br /><span>LET'S  BUILD  IT.</span></h2><p>Tell us what you're building, what you're trying to improve, or where you want to grow.</p><div className="contact-details-wrap"><div className="contact-highlight-box"><a href="mailto:support@rasatech.in" className="contact-highlight-item"><span>Email :</span> <strong>support@rasatech.in</strong> <ArrowUpRight size={16} /></a><a href="tel:8617201731" className="contact-highlight-item"><span>Contact Us :</span> <strong>8617201731 / 9332312300</strong> <ArrowUpRight size={16} /></a></div></div></div><div className="contact-form-wrap reveal">{submitted ? <div className="form-success"><div><Check /></div><h3>MESSAGE RECEIVED.</h3><p>We'll be in touch at the email you shared.</p><button onClick={() => setSubmitted(false)}>SEND ANOTHER <ArrowUpRight size={14} /></button></div> : <form onSubmit={handleSubmit}><div className="form-row"><label>NAME<input required name="name" placeholder="Your name" /></label><label>EMAIL<input required type="email" name="email" placeholder="you@company.com" /></label></div><div className="form-row"><label>PHONE<input name="phone" placeholder="+91 XXXXX XXXXX" /></label><label>COMPANY<input name="company" placeholder="Company name" /></label></div><label>SERVICE<div className="select-wrap"><select name="service" defaultValue=""><option value="" disabled>Select a service</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={16} /></div></label><label>MESSAGE<textarea required name="message" placeholder="Tell us about your next move..." rows={4} /></label><Button type="submit">START A CONVERSATION <ArrowUpRight size={16} /></Button></form>}</div></div></section>

        <section className="final-cta page-section"><SignalLine className="final-signal" /><div className="final-cta-inner reveal"><p className="eyebrow"><span className="eyebrow-pulse" />THE NEXT SYSTEM STARTS HERE</p><h2>READY  TO  BUILD<br /><span>WHAT'S  NEXT?</span></h2><p>Let's turn your next digital idea into something built to perform.</p><Button asChild><a href="#contact">START A CONVERSATION <ArrowUpRight size={17} /></a></Button></div></section>
      </main>

      <div className="footer-separator-line" />
        <footer className="site-footer">
          <div className="footer-top">
            <div className="footer-brand-col">
              <a className="brand-mark" href="#home">
                <img src={logoUrl} alt="RASA Tech" />
              </a>
              <p className="footer-tagline">Grow Your Business</p>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">QUICK MENU</h4>
              <div className="footer-links-vertical">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#pricing">Pricing</a>
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
                <a href="#contact">
                  LINKEDIN <ArrowUpRight size={13} />
                </a>
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

