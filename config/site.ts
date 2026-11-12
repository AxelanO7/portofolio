import { GL_BO, gl, phone, type Img } from "./media";
import { EXPERIENCE } from "./work";

export const SITE_URL = "https://portfolio.axelano.space";
export const EMAIL = "jeremia123.jm@gmail.com";
export const WHATSAPP = "https://wa.me/6282246034453";
export const WHATSAPP_LABEL = "+62 822 4603 4453";

export type SurfaceKind = "browser" | "fan" | "phones" | "laptop" | "phone";

export interface Surface {
  id: string;
  name: string;
  status: "live" | "build" | "internal";
  statusLabel: string;
  text: string;
  kind: SurfaceKind;
  url?: string;
  img?: Img;
  imgs?: Img[];
}

/** The six surfaces of Guestlist Ticket, each with a real capture. */
export const SURFACES: Surface[] = [
  { id: "web", name: "Web marketplace", status: "live", statusLabel: "live", text: "Nightlife, events and experiences, rebuilt and rebranded.", kind: "browser", url: "guestlistticket.com", img: gl("web") },
  { id: "mobile", name: "Mobile app", status: "build", statusLabel: "in build", text: "Dark redesign, new Home and Discover, per-guest QR tickets.", kind: "fan", imgs: [phone("gl-nightlife"), phone("gl-home"), phone("gl-ticket")] },
  { id: "partner", name: "Partner app", status: "build", statusLabel: "in build", text: "Offline-first QR check-in and a booking list for venues and promoters.", kind: "phones", imgs: [phone("pm-scan"), phone("pm-booking")] },
  { id: "bo", name: "Back office", status: "internal", statusLabel: "internal", text: "About 65 admin screens for bookings, partners, imports and analytics.", kind: "laptop", img: GL_BO },
  { id: "link", name: "Link hub", status: "live", statusLabel: "live", text: "Link-in-bio in English and Indonesian with campaign tags.", kind: "phone", img: phone("gl-link") },
  { id: "lp", name: "Landing page", status: "live", statusLabel: "live", text: "“Your night out, sorted.” with floating phones and store badges.", kind: "browser", url: "landing.guestlistticket.com", img: gl("landing") },
];

export const CITIES = [
  {
    id: "bali", name: "Bali", co: "8.65°S 115.22°E", state: "Live in production", tone: "b", glow: "rgba(79,224,189,.5)",
    rows: [
      { k: "Site visits tracked", v: "110,000+", n: 110000, s: "+" },
      { k: "Booking requests in a month", v: "1,000+", n: 1000, s: "+" },
      { k: "Partner businesses", v: "110+", n: 110, s: "+" },
    ],
  },
  {
    id: "us", name: "United States", co: "4 cities", state: "Live · venue pages", tone: "v", glow: "rgba(255,123,92,.5)",
    note: "Venue pages for now: no packages or booking yet.",
    rows: [
      { k: "Las Vegas", v: "7", n: 7, s: "" },
      { k: "Miami", v: "4", n: 4, s: "" },
      { k: "Los Angeles", v: "3", n: 3, s: "" },
      { k: "New York", v: "2", n: 2, s: "" },
    ],
  },
  {
    id: "any", name: "Any city", co: "multi-city by design", state: "City and country pickers built", tone: "n", glow: "rgba(90,120,210,.45)",
    note: "Region filters in the back office, multi-currency checkout and SEO groundwork for a new market are in place.",
    rows: [],
  },
] as const;

export const PIPELINE = [
  { t: "Find and cite", x: "An agent pulls venues and events from partner pages and keeps the source for every field." },
  { t: "Check", x: "Duplicates, hours and formats are checked against the source." },
  { t: "A person approves", x: "Nothing goes live until someone says yes to each field." },
  { t: "Price locally", x: "USD pricing and multi-currency checkout, with the city picker." },
  { t: "Go live", x: "Las Vegas, Miami, Los Angeles and New York went live in November 2026 as venue pages." },
];

export type DiffKind = "a" | "r" | "m";
export interface Diff {
  file: string;
  meta: string;
  lines: [DiffKind, string][];
  foot: string;
}

export const DIFFS: Diff[] = [
  {
    file: "seo/sitemap.xml",
    meta: "328 → 70 → 159",
    lines: [
      ["m", "// before: client-rendered homepage"],
      ["r", "urls: 328   // mostly redirects"],
      ["a", "urls: 70    // real pages only"],
      ["a", "urls: 159   // + four US cities"],
      ["a", "homepage: server-rendered"],
      ["a", "domain: moved, zero downtime"],
    ],
    foot: "<b>Result</b> · search engines only see real pages, and the list grows as venues and cities go live.",
  },
  {
    file: "agents/registry.ts",
    meta: "+ 6 agents in daily use",
    lines: [
      ["m", "// each agent has a named human owner"],
      ["a", "error-alert        live"],
      ["a", "it-automation      internal"],
      ["a", "ops-briefing       internal"],
      ["a", "agent-board        internal   // a person approves every field"],
      ["a", "social-analytics   internal"],
      ["a", "claude-code-setup  internal"],
      ["m", "cs-agent           testing    // not answering guests yet"],
    ],
    foot: "<b>Result</b> · 6 agents in daily use, 5 more in build, beta or planning. The support agent is in testing.",
  },
  {
    file: "cities/us.ts",
    meta: "+ 16 venue pages · 4 cities",
    lines: [
      ["m", "// one platform, a city at a time"],
      ["r", "research: weeks of manual venue lookup"],
      ["a", "import: daily pipeline, sources cited"],
      ["a", "review: a person approves every field"],
      ["a", "live: Las Vegas 7 · Miami 4"],
      ["a", "live: Los Angeles 3 · New York 2"],
    ],
    foot: "<b>Result</b> · 16 venue pages live in four US cities since November 2026.",
  },
];

/** Tools shown on the orbit tile and the logo band (all have a mark in the sprite). */
export const ORBIT_TOOLS = ["Go", "TypeScript", "Flutter", "Next.js", "PostgreSQL", "Docker", "Claude Code", "n8n", "Redis", "Cloudflare", "Vercel", "Astro"];
export const BAND_TOOLS = ["Go", "TypeScript", "Flutter", "Next.js", "React", "PostgreSQL", "Redis", "Docker", "Cloudflare", "Vercel", "Claude Code", "n8n", "Astro", "Tailwind", "Firebase", "Python", "Laravel", "Prometheus", "Grafana", "Git"];

export const TIMELINE = EXPERIENCE.map((e) => ({ d: e.date, t: e.title, x: e.text }));

/** Illustrative lines for the agent log and the feed. Labelled "sample" on the page. */
export const LOG_LINES: [string, "a" | "ok" | "w", string][] = [
  ["error-alert", "a", "POST /bookings returned 500, alert sent, help code H-4F2A"],
  ["agent-board", "ok", "18 fields proposed, waiting for a person"],
  ["agent-board", "w", "venue hours differ from the source, needs a person"],
  ["ops-briefing", "ok", "daily briefing posted, 11 commits grouped into 4 tickets"],
  ["it-automation", "ok", "opened a pull request for the sitemap redirect fix"],
  ["social-analytics", "ok", "weekly Instagram, Facebook and TikTok summary written"],
  ["error-alert", "a", "payment webhook timeout, retried, resolved in 2 minutes"],
  ["agent-board", "ok", "approved by a person, 18 fields went live"],
  ["agent-board", "w", "duplicate event detected, skipped"],
];

export const FEED_LINES: [string, string, string][] = [
  ["#4fe0bd", "Error alert", "help code sent"],
  ["#2dd4e8", "Agent Board", "18 fields proposed"],
  ["#e9c27d", "Ops briefing", "daily brief posted"],
  ["#7cebf7", "IT automation", "pull request opened"],
  ["#4fe0bd", "Social analytics", "weekly summary written"],
  ["#e9c27d", "Agent Board", "approved by a person"],
];
