import { createFileRoute } from "@tanstack/react-router";
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
  visual: "browser" | "social" | "search" | "server" | "phone" | "messages";
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
    name: "Server Hosting",
    description: "Reliable hosting infrastructure designed for speed, stability, security and dependable digital performance.",
    capabilities: ["Managed Hosting", "Server Monitoring", "Performance & Security"],
    icon: Server,
    visual: "server",
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

const clientIcons = {
  microsoft: (
    <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
      <path d="M0 0h11v11H0z" fill="#f25022"/>
      <path d="M12 0h11v11H12z" fill="#7fba00"/>
      <path d="M0 12h11v11H0z" fill="#00a4ef"/>
      <path d="M12 12h11v11H12z" fill="#ffb900"/>
    </svg>
  ),
  storyblok: (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#00B3B0"/>
      <path d="M10 9h8a5 5 0 0 1 0 10H10V9zm0 10h9a5 5 0 0 1 0 10H10V19z" fill="#000" opacity="0.2"/>
      <path d="M9 8h8a5 5 0 0 1 0 8H9V8zm0 8h9a5 5 0 0 1 0 8H9V16z" fill="#FFFFFF"/>
    </svg>
  ),
  shutterstock: (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#EE2B2E"/>
      <path d="M9 14V9h5v3h-2v2H9zm14 4v5h-5v-3h2v-2h3z" fill="#FFFFFF"/>
    </svg>
  ),
  cursor: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#A0AEC0"/>
      <path d="M2 17l10 5V12L2 7v10z" fill="#718096"/>
      <path d="M22 17l-10 5V12l10-5v10z" fill="#CBD5E0"/>
    </svg>
  ),
  hubspot: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="#FF7A59"/>
      <circle cx="18" cy="7" r="2.5" fill="#FF7A59"/>
      <circle cx="6" cy="17" r="2.5" fill="#FF7A59"/>
      <path d="M12 8V4.5M14.5 9.5l3.5-2M9.5 14.5l-3.5 2.5" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  n8n: (
    <svg width="24" height="18" viewBox="0 0 32 24" fill="none">
      <circle cx="6" cy="12" r="4" fill="#FF6584"/>
      <circle cx="16" cy="6" r="3.5" fill="#FF6584"/>
      <circle cx="16" cy="18" r="3.5" fill="#FF6584"/>
      <circle cx="26" cy="12" r="4" fill="#FF6584"/>
      <path d="M9.5 10.5l3.5-3m-3.5 6l3.5 3m6-6l3.5-3m-3.5 6l3.5 3" stroke="#FF6584" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  google: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  ),
  wordpress: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#21759B"/>
      <path d="M2.5 12a9.5 9.5 0 0 0 14.5 8.1L8.5 7.2l-6 13C2.2 18.2 2 15.2 2 12zM12 2.5c2.3 0 4.4.8 6.1 2.2l-4.1 11.8L10 8.5 7.1 17 4.2 8.7A9.5 9.5 0 0 1 12 2.5zM17.5 7.5l4 11.5A9.5 9.5 0 0 0 21.5 12c0-1.8-.5-3.5-1.4-5z" fill="#FFFFFF"/>
    </svg>
  ),
  uniform: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#2563EB"/>
      <path d="M2 7v10l10 5V12L2 7z" fill="#1D4ED8"/>
      <path d="M22 7v10l-10 5V12l10-5z" fill="#EF4444"/>
    </svg>
  ),
  shopify: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M16 6.5s-1.5-1.5-3.5-1.5-3.5 1.5-3.5 1.5L7 7v14l10 1V7l-1-.5z" fill="#95BF47"/>
      <path d="M12 5c-1.5 0-2.5 1-2.5 1.5L9 7h6l-.5-.5S13.5 5 12 5z" fill="#5E8E3E"/>
      <path d="M12.5 10.5c-1 0-1.5.5-1.5 1s.5.8 1.2 1c1.2.3 2 .8 2 2.2 0 1.5-1.3 2.3-2.7 2.3-1.5 0-2.5-.7-2.5-.7l.3-1.3s.8.5 1.8.5c.7 0 1.2-.3 1.2-.8 0-.4-.4-.7-1.1-.9-1.3-.4-2.1-1-2.1-2.2 0-1.4 1.2-2.3 2.6-2.3 1.2 0 2.2.5 2.2.5l-.4 1.2s-.7-.5-1.4-.5z" fill="#FFFFFF"/>
    </svg>
  ),
  figma: (
    <svg width="16" height="20" viewBox="0 0 24 36" fill="none">
      <path d="M6 36c3.3 0 6-2.7 6-6v-6H6c-3.3 0-6 2.7-6 6s2.7 6 6 6z" fill="#0ACF83"/>
      <path d="M0 18c0-3.3 2.7-6 6-6h6v12H6c-3.3 0-6-2.7-6-6z" fill="#A259FF"/>
      <path d="M0 6c0-3.3 2.7-6 6-6h6v12H6C2.7 12 0 9.3 0 6z" fill="#F24E1E"/>
      <path d="M12 0h6c3.3 0 6 2.7 6 6s-2.7 6-6 6h-6V0z" fill="#FF7262"/>
      <path d="M24 18c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6z" fill="#1ABCFE"/>
    </svg>
  ),
  slack: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 15a2.5 2.5 0 1 1 0-5H8.5V15H6zM6 8.5a2.5 2.5 0 1 1 5 0V11H6V8.5z" fill="#E01E5A"/>
      <path d="M15 6a2.5 2.5 0 1 1 5 0V8.5H15V6zM8.5 6a2.5 2.5 0 1 1 0-5H11V6H8.5z" fill="#36C5F0"/>
      <path d="M18 9a2.5 2.5 0 1 1 0 5H15.5V9H18zM18 15.5a2.5 2.5 0 1 1-5 0V13H18v2.5z" fill="#2EB67D"/>
      <path d="M9 18a2.5 2.5 0 1 1-5 0V15.5H9V18zM15.5 18a2.5 2.5 0 1 1 0 5H13V18h2.5z" fill="#ECB22E"/>
    </svg>
  ),
  stripe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M13.9 8.6c0-.9-.7-1.4-1.9-1.4-1.7 0-3.9.7-5.5 1.6L5 5c1.9-.9 4.4-1.5 7-1.5 4.5 0 7.4 2.3 7.4 6 0 5.6-7.7 5.9-7.7 8.5 0 1 .9 1.4 2.2 1.4 2 0 4.5-.9 6.2-1.9l1.6 3.9c-2.1 1.2-5 1.9-7.8 1.9-4.8 0-7.8-2.4-7.8-6.1.1-6 7.7-6.2 7.7-8.6z" fill="#635BFF"/>
    </svg>
  ),
  vercel: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 1L24 22H0L12 1z" fill="#FFFFFF"/>
    </svg>
  ),
  notion: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#111111" stroke="#444" strokeWidth="1"/>
      <path d="M6 6.5l3.5.5v11l-3.5-.5V6.5zm3.5.5L16 17.5V6.5l2.5.5v11L15 17.5 8.5 7v.0z" fill="#FFFFFF"/>
    </svg>
  ),
  aws: (
    <svg width="22" height="20" viewBox="0 0 28 20" fill="none">
      <path d="M6 7c0-1.5 1-2.5 3-2.5 1.8 0 2.8.7 3.2 1.5V3.8C11.5 3.3 10 3 8.5 3 4.5 3 2 5.2 2 8.5c0 5 7 4 7 6.5 0 .8-.8 1.2-2 1.2-1.5 0-3-.6-4-1.5l-1.5 2c1.4 1.3 3.5 2 5.5 2 4.2 0 6.5-2 6.5-5.5 0-5.2-7.5-4.2-7.5-6.7z" fill="#FF9900"/>
      <path d="M3 17.5c6 3 13 3 20-2" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M21 13.5l3 2-1 3.5" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  meta: (
    <svg width="22" height="18" viewBox="0 0 28 20" fill="none">
      <path d="M20.5 4C18 4 16 5.8 14 8.5 12 5.8 10 4 7.5 4 3.4 4 1 7.2 1 11.2c0 4.2 2.7 6.8 6.5 6.8 2.8 0 5-1.8 6.5-4.2 1.5 2.4 3.7 4.2 6.5 4.2 3.8 0 6.5-2.6 6.5-6.8C27 7.2 24.6 4 20.5 4zm-13 11c-2.3 0-3.8-1.6-3.8-3.8 0-2.3 1.5-4.2 3.8-4.2 1.6 0 3.2 1.4 4.7 3.8-1.5 2.5-3.1 4.2-4.7 4.2zm13 0c-1.6 0-3.2-1.7-4.7-4.2 1.5-2.4 3.1-3.8 4.7-3.8 2.3 0 3.8 1.9 3.8 4.2 0 2.2-1.5 3.8-3.8 3.8z" fill="#0081FB"/>
    </svg>
  ),
  openai: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.27 9.8a5.98 5.98 0 0 0-.52-4.93 6.04 6.04 0 0 0-6.47-2.82 6.02 6.02 0 0 0-4.66-2.07 6.06 6.06 0 0 0-5.78 4.18 6.01 6.01 0 0 0-4.04 2.9 6.04 6.04 0 0 0 .75 7.03 5.98 5.98 0 0 0 .52 4.93 6.04 6.04 0 0 0 6.47 2.82 6.06 6.06 0 0 0 4.66 2.07 6.05 6.05 0 0 0 5.78-4.18 6.01 6.01 0 0 0 4.04-2.9 6.04 6.04 0 0 0-.75-7.03z" stroke="#10A37F" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#FFFFFF"/>
    </svg>
  ),
};

const clientRow1 = [
  { name: "Microsoft", icon: clientIcons.microsoft },
  { name: "Storyblok", icon: clientIcons.storyblok },
  { name: "Shutterstock", icon: clientIcons.shutterstock },
  { name: "Cursor", icon: clientIcons.cursor },
  { name: "Shopify", icon: clientIcons.shopify },
  { name: "Figma", icon: clientIcons.figma },
  { name: "Slack", icon: clientIcons.slack },
  { name: "Stripe", icon: clientIcons.stripe },
  { name: "Vercel", icon: clientIcons.vercel },
  { name: "Notion", icon: clientIcons.notion },
];

const clientRow2 = [
  { name: "Hubspot", icon: clientIcons.hubspot },
  { name: "n8n", icon: clientIcons.n8n },
  { name: "Google", icon: clientIcons.google },
  { name: "WordPress", icon: clientIcons.wordpress },
  { name: "Uniform", icon: clientIcons.uniform },
  { name: "AWS", icon: clientIcons.aws },
  { name: "Meta", icon: clientIcons.meta },
  { name: "OpenAI", icon: clientIcons.openai },
  { name: "GitHub", icon: clientIcons.github },
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
        <div className="revolving-icon icon-pos-right" title="Instagram">
          <div className="revolving-icon-inner">
            <img src="/icons/instagram1.webp" alt="Instagram" width="18" height="18" />
          </div>
        </div>
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
      <SystemNode label="Server Hosting" position="node-server" icon={Server} />
      <SystemNode label="App Development" position="node-app" icon={Smartphone} />
      <SystemNode label="WhatsApp Automation" position="node-whatsapp" icon={MessageCircle} />
    </div>
  );
}

function AboutSystem() {
  return (
    <div className="about-laptop-container" aria-label="RASA Tech Growth Analytics Dashboard">
      <div className="laptop-screen-frame">
        <div className="laptop-camera-dot" />
        <div className="laptop-display">
          <div className="dashboard-header">
            <div className="dashboard-title">
              <span className="live-dot" /> RASA TECH / GROWTH ANALYTICS
            </div>
            <div className="dashboard-badge">+148.5% GROWTH</div>
          </div>

          <div className="dashboard-grid">
            <div className="dash-card">
              <small>MONTHLY VISITS</small>
              <strong>128.4K</strong>
              <span className="dash-trend">+34%</span>
            </div>
            <div className="dash-card">
              <small>CONVERSIONS</small>
              <strong>14,820</strong>
              <span className="dash-trend">+52%</span>
            </div>
          </div>

          <div className="dashboard-chart-area">
            <div className="chart-label">PERFORMANCE ACCELERATION</div>
            <div className="chart-bars">
              <div className="bar bar-1" style={{ height: "35%" }} />
              <div className="bar bar-2" style={{ height: "55%" }} />
              <div className="bar bar-3" style={{ height: "45%" }} />
              <div className="bar bar-4" style={{ height: "75%" }} />
              <div className="bar bar-5" style={{ height: "90%" }} />
              <div className="bar bar-6" style={{ height: "100%" }} />
            </div>
            <svg className="chart-growth-line" viewBox="0 0 300 80" preserveAspectRatio="none">
              <path
                d="M 10,65 Q 60,50 110,40 T 210,20 T 290,8"
                fill="none"
                stroke="#ff7a00"
                strokeWidth="3"
                className="path-growth-animated"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="laptop-keyboard-base">
        <div className="laptop-notch" />
      </div>
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
  const [pricingCategory, setPricingCategory] = useState<"web" | "social">("web");
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
      <div id="scroll-progress" className="scroll-progress-bar" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true"><span /></div>
      <div className="site-network" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <a className="brand-mark" href="#home" onClick={closeMenu}><img src={logoUrl} alt="RASA Tech" /></a>
        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {[["Home", "home"], ["About", "about"], ["Services", "services"], ["Process", "process"], ["Why Us", "why"], ["Clients", "clients"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
          ))}
          <div className="mobile-only-cta">
            <Button asChild className="w-full h-12 text-sm font-semibold border-orange bg-orange text-black hover:bg-orange-hot">
              <a href="#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a>
            </Button>
          </div>
        </nav>
        <Button asChild className="header-cta"><a href="#contact" onClick={closeMenu}>LET'S TALK <ArrowUpRight size={16} /></a></Button>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <main>
        <section id="home" className="hero-section page-section" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
          <div className="hero-grid" />
          <div className="hero-copy reveal"><p className="eyebrow"><span className="eyebrow-pulse" />RASA TECH <span>/</span> DIGITAL SYSTEMS</p><TypewriterHeading /><p className="hero-description">RASA Tech builds websites, digital experiences, marketing systems and technology that help ambitious businesses grow.</p><div className="hero-actions"><Button asChild><a href="#contact">START A PROJECT <ArrowUpRight size={17} /></a></Button><a className="outline-action" href="#services">EXPLORE SERVICES <ArrowDown size={16} /></a></div></div>
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
                {[...clientRow1, ...clientRow1, ...clientRow1, ...clientRow1].map((client, idx) => (
                  <div key={`r1-${idx}`} className="client-card">
                    <span className="client-logo-icon">{client.icon}</span>
                    <span className="client-name">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 Autoplay Marquee - Moving Right */}
            <div className="clients-carousel-row">
              <div className="clients-marquee-track-reverse">
                {[...clientRow2, ...clientRow2, ...clientRow2, ...clientRow2].map((client, idx) => (
                  <div key={`r2-${idx}`} className="client-card">
                    <span className="client-logo-icon">{client.icon}</span>
                    <span className="client-name">{client.name}</span>
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
                className={`pricing-toggle-btn ${pricingCategory === "web" ? "active" : ""}`}
                onClick={() => setPricingCategory("web")}
              >
                WEB DEVELOPMENT
              </button>
              <button
                type="button"
                className={`pricing-toggle-btn ${pricingCategory === "social" ? "active" : ""}`}
                onClick={() => setPricingCategory("social")}
              >
                SOCIAL MEDIA MARKETING
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {pricingCategory === "web" ? (
              <>
                <PricingPlan
                  number="01"
                  name="STARTER"
                  price="15,000"
                  description="For businesses establishing a modern, high-performance web presence."
                >
                  <li>1-5 Custom Responsive Pages</li>
                  <li>Mobile-First Responsive Layout</li>
                  <li>Basic SEO & Speed Optimization</li>
                  <li>Contact Form & WhatsApp Integration</li>
                </PricingPlan>
                <PricingPlan
                  number="02"
                  name="GROWTH"
                  price="35,000"
                  description="For businesses ready for dynamic web apps and maximum conversion."
                >
                  <li>Custom Web App / Dynamic Pages</li>
                  <li>Advanced Interactive Animations</li>
                  <li>Full Technical & Local SEO</li>
                  <li>Server & Domain Infrastructure</li>
                </PricingPlan>
                <PricingPlan
                  number="03"
                  name="SCALE"
                  price="CUSTOM"
                  description="Complete digital ecosystem built for ambitious brands and enterprise scope."
                >
                  <li>Custom Platform / Portal</li>
                  <li>Dedicated Server Architecture</li>
                  <li>Automated Workflows & CRM</li>
                  <li>Priority Ongoing Support</li>
                </PricingPlan>
              </>
            ) : (
              <>
                <PricingPlan
                  number="01"
                  name="STARTER"
                  price="12,000 / mo"
                  description="Consistent social presence designed to build brand awareness."
                >
                  <li>8-10 High-Quality Posts / Reels</li>
                  <li>Content Strategy & Captions</li>
                  <li>Hashtag & Audience Targeting</li>
                  <li>Monthly Performance Report</li>
                </PricingPlan>
                <PricingPlan
                  number="02"
                  name="GROWTH"
                  price="25,000 / mo"
                  description="Aggressive content & paid campaigns for rapid customer acquisition."
                >
                  <li>15-18 Posts & Reels</li>
                  <li>Paid Ad Campaign Management</li>
                  <li>Custom Graphics & Video Editing</li>
                  <li>Lead Capture & WhatsApp Flows</li>
                </PricingPlan>
                <PricingPlan
                  number="03"
                  name="SCALE"
                  price="CUSTOM"
                  description="360 digital marketing & growth partner strategy."
                >
                  <li>Full Omnichannel Strategy</li>
                  <li>High-Production Video Content</li>
                  <li>Dedicated Growth Team</li>
                  <li>Weekly ROI Optimization</li>
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

        <section id="contact" className="contact-section page-section content-section"><div className="section-grid contact-grid"><div className="section-intro reveal"><SectionLabel number="07">CONTACT</SectionLabel><h2>HAVE  AN  IDEA?<br /><span>LET'S  BUILD  IT.</span></h2><p>Tell us what you're building, what you're trying to improve, or where you want to grow.</p><div className="contact-details"><a href="mailto:hello@rasatech.com">hello@rasatech.com <ArrowUpRight size={14} /></a><a href="tel:+918617201731">+91 86172 01731 <ArrowUpRight size={14} /></a><span>INDIA</span><a href="https://wa.me/918617201731" target="_blank" rel="noopener noreferrer">WHATSAPP <ArrowUpRight size={14} /></a></div></div><div className="contact-form-wrap reveal">{submitted ? <div className="form-success"><div><Check /></div><h3>MESSAGE RECEIVED.</h3><p>We'll be in touch at the email you shared.</p><button onClick={() => setSubmitted(false)}>SEND ANOTHER <ArrowUpRight size={14} /></button></div> : <form onSubmit={handleSubmit}><div className="form-row"><label>NAME<input required name="name" placeholder="Your name" /></label><label>EMAIL<input required type="email" name="email" placeholder="you@company.com" /></label></div><div className="form-row"><label>PHONE<input name="phone" placeholder="+91 XXXXX XXXXX" /></label><label>COMPANY<input name="company" placeholder="Company name" /></label></div><label>SERVICE<div className="select-wrap"><select name="service" defaultValue=""><option value="" disabled>Select a service</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={16} /></div></label><label>MESSAGE<textarea required name="message" placeholder="Tell us about your next move..." rows={4} /></label><Button type="submit">START A CONVERSATION <ArrowUpRight size={16} /></Button></form>}</div></div></section>

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
                {[
                  ["Home", "home"],
                  ["About", "about"],
                  ["Services", "services"],
                  ["Process", "process"],
                  ["Why Us", "why"],
                  ["Clients", "clients"],
                  ["Pricing", "pricing"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-social-col">
              <h4 className="footer-col-title">CONNECT</h4>
              <div className="footer-social">
                <a href="https://wa.me/918617201731" target="_blank" rel="noopener noreferrer">
                  WHATSAPP <ArrowUpRight size={13} />
                </a>
                <a href="#contact">
                  INSTAGRAM <ArrowUpRight size={13} />
                </a>
                <a href="#contact">
                  LINKEDIN <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>DIGITAL MARKETING <b>•</b> WEB DEVELOPMENT <b>•</b> WHATSAPP AUTOMATION</span>
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

