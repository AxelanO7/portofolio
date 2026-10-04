/**
 * All portfolio content in one place. Cards show the work, never the tools:
 * the stack lives only in config/arsenal.ts. No repository names are shown.
 */

export type Status = "live" | "beta" | "build" | "internal" | "delivered" | "planned" | "concept";

export const STATUS_LABEL: Record<Status, string> = {
  live: "live",
  beta: "closed beta",
  build: "in build",
  internal: "internal",
  delivered: "delivered",
  planned: "planned",
  concept: "design concept",
};

export interface Item {
  id: string;
  name: string;
  text: string;
  status: Status;
  /** display label for the link (domain, store, etc.) */
  label?: string;
  url?: string;
  /** desktop screenshot in /public/work */
  img?: string;
  /** mobile screenshot in /public/work */
  imgM?: string;
  ticker?: string;
  /** web3 only: used for the Astro filter, never displayed as a chip */
  fw?: "astro" | "vite" | "next";
}

const I = (
  id: string,
  name: string,
  text: string,
  status: Status,
  extra: Partial<Item> = {}
): Item => ({ id, name, text, status, ...extra });

/* ------------------------------------------------------------------ */
/* Guestlist Ticket                                                    */
/* ------------------------------------------------------------------ */

export interface Tile {
  id: string;
  name: string;
  text: string;
  status: Status;
  size: "hero" | "phone" | "small";
  shot?: string;
  phones?: string[];
  /** auto-panning full-page capture instead of a cropped phone */
  pan?: boolean;
  url?: string;
}

export const GUESTLIST_TILES: Tile[] = [
  { id: "glw", name: "Guestlist Ticket Web", text: "Entertainment-first marketplace for nightlife, events and experiences, rebuilt and rebranded. Lighthouse 95 on mobile.", status: "live", size: "hero", shot: "glw-d", url: "https://guestlistticket.com" },
  { id: "glm", name: "Guestlist Ticket Mobile", text: "Consumer app with a dark redesign, new Home and Discover, and per-guest QR tickets.", status: "build", size: "phone", phones: ["glm-home", "glm-events"] },
  { id: "pm", name: "Partner App", text: "Offline-first QR check-in, excess-guest approval and a venue dashboard for venues and promoters.", status: "build", size: "phone", phones: ["pm-scan", "pm-home"] },
  { id: "lnk", name: "Link Hub", text: "Link-in-bio hub in English and Indonesian with dynamic campaign tags. Full page, scrolling on its own.", status: "live", size: "small", phones: ["lnk-full"], pan: true, url: "https://link.guestlistticket.com" },
  { id: "lp", name: "Landing Page", text: "\"Your night out, sorted.\" with 3D phones, a Tonight in Bali rail and store badges. Lighthouse 90+.", status: "live", size: "small", shot: "lp-d", url: "https://landing.guestlistticket.com" },
  { id: "bo", name: "Back Office", text: "About 65 admin screens for bookings, partners, affiliates, imports, analytics and error history.", status: "internal", size: "small", shot: "gl-bo" },
];

export const LAS_VEGAS = {
  name: "Las Vegas expansion",
  status: "build" as Status,
  text: "Vegas venues with USD pricing, a daily event import pipeline with human approval, and multi-currency checkout, on top of advanced SEO for a new market.",
  stats: [
    { value: "45+", label: "Vegas venues" },
    { value: "1,500+", label: "events imported" },
    { value: "USD", label: "multi-currency" },
  ],
};

/* ------------------------------------------------------------------ */
/* AI agents                                                           */
/* ------------------------------------------------------------------ */

export const AGENTS: Item[] = [
  I("ag1", "IT Automation Agent", "Telegram and WhatsApp bot grounded in the issue tracker and 11 repositories. Answers questions, sets reminders and opens pull requests.", "internal"),
  I("ag2", "Hermes Ops Agent", "Daily briefing, commits grouped into tickets, and the weekly tech report written automatically.", "internal"),
  I("ag3", "Error Alert Agents", "Every failed request becomes a plain-language alert with a help code and a paste-ready AI prompt.", "live", { label: "production" }),
  I("ag4", "Event and Listing Data Agent", "Pulls events from partner sites and a ticketing catalog into staging. A human approves before anything goes live.", "internal"),
  I("ag5", "Testing Agent", "End-to-end tests, hourly smoke checks and schema-drift alerts. Being rebuilt for staging.", "build"),
  I("ag6", "Social Analytics Agent", "A headless Claude Code job reads Instagram, Facebook and TikTok metrics through MCP and summarises them.", "internal"),
  I("ag7", "Pending-Conversion Analyst", "Explains why bookings stay unpaid and suggests fixes, with a weekly summary for the founder.", "build"),
  I("ag8", "Lerka", "Ask once, several models answer, a judge merges one reply. Includes a podcast companion with voice.", "beta"),
  I("ag9", "Claude Code Team Setup", "Persistent remote coding sessions, cost-aware model routing and a shared status dashboard.", "internal"),
  I("ag10", "AutoSDR and Bali AI Suite", "Outreach agent plus demand forecasting and trend scanners for Bali tourism.", "delivered", { label: "github.com/AxelanO7", url: "https://github.com/AxelanO7" }),
  I("ag11", "Agent Roadmap", "Customer-support agent, admin copilot and event-data v2, each with an owner and a cost case.", "planned"),
];

/* ------------------------------------------------------------------ */
/* Mobile apps                                                         */
/* ------------------------------------------------------------------ */

export const MOBILE: Item[] = [
  I("js1", "Jobseeker App", "Social-first job search with skill-based matching.", "live", { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.jobseeker.app", img: "js-app", imgM: "js-app" }),
  I("js2", "Jobseeker Partners", "Employer app to post jobs and manage applicants.", "live", { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.jobseeker.partners", img: "js-partners", imgM: "js-partners" }),
  I("btw1", "BTW Edutech Platform", "Learning and career-prep platform on iOS, Android, web and desktop. Led the mobile team.", "delivered", { img: "btwedutech", imgM: "btwedutech" }),
  I("btw2", "Smart BTW", "Job-prep simulator with realistic tryouts and performance analytics.", "delivered", { img: "smartbtw", imgM: "smartbtw" }),
  I("pay", "Teacher Payroll", "School attendance, leave and digital payroll app.", "delivered", { img: "payroll", imgM: "payroll" }),
  I("pdam", "PDAM Bangli", "Customer app for the regional water utility.", "delivered"),
  I("att", "Mobile Attendance", "Staff attendance app with a payroll calculator companion.", "delivered"),
  I("wimo", "Wimo", "Mobile app built for the jeep-project organisation.", "internal"),
  I("java", "Android Java Apps", "Seven native Android apps: BMI, hotel booking, ordering, campus, color learning, learning-style detector and a coffee shop.", "delivered"),
];

/* ------------------------------------------------------------------ */
/* Client sites and full-stack systems                                 */
/* ------------------------------------------------------------------ */

export const CLIENTS: Item[] = [
  I("wd", "Weda Bali Top Tours", "Tour site with booking, WhatsApp checkout, a bilingual back office and fast-boat tickets.", "live", { label: "wedabalitoptours.com", url: "https://wedabalitoptours.com", img: "s-weda-d", imgM: "s-weda-m" }),
  I("wl", "Weda Attraction Link", "Per-driver link pages with QR download and click tracking.", "live", { label: "packages.wedabalitoptours.com", url: "https://packages.wedabalitoptours.com" }),
  I("erp", "Interior Contractor ERP", "Six roles and 21 screens: leads, work orders, procurement and cashflow.", "live", { label: "erp.axelano.space", url: "https://erp.axelano.space", img: "s-erp-d", imgM: "s-erp-m" }),
  I("dy", "Dyfashionstuff", "Fashion ordering with storefront, admin and owner roles. Also built in a second stack.", "live", { label: "dyfashionstuff.axelano.space", url: "https://dyfashionstuff.axelano.space", img: "s-arista-d", imgM: "s-arista-m" }),
  I("pt", "PT. Mandala Amertha Kencana", "Bilingual company profile for a building-permit and architecture consultancy.", "live", { label: "lyani.axelano.space", url: "https://lyani.axelano.space", img: "s-lyani-d", imgM: "s-lyani-m" }),
  I("rn", "Rianne Collective", "Crochet shop with cart, WhatsApp checkout and an admin panel.", "live", { label: "crochet.axelano.space", url: "https://crochet.axelano.space", img: "s-crochet-catalog-d", imgM: "s-crochet-catalog-m" }),
  I("mr1", "Marrintis Studio", "Landing page for a creative studio.", "live", { label: "marrintis.axelano.space", url: "https://marrintis.axelano.space", img: "s-marrintis-lp-d", imgM: "s-marrintis-lp-m" }),
  I("mr2", "Marrintis Link", "Link-in-bio microsite for the same studio.", "live", { label: "link-marrintis.axelano.space", url: "https://link-marrintis.axelano.space", img: "s-marrintis-link-d", imgM: "s-marrintis-link-m" }),
  I("mel", "Nusafish", "Seafood marketplace site, plus a companion mobile app.", "live", { label: "nusafish.axelano.space", url: "https://nusafish.axelano.space", img: "s-tukang-ikan-d", imgM: "s-tukang-ikan-m" }),
  I("tax", "Pajakita", "Landing page for a tax consulting service.", "live", { label: "pajakita.axelano.space", url: "https://pajakita.axelano.space", img: "s-lp-tax-d", imgM: "s-lp-tax-m" }),
  I("bet", "Bali Eternal Tours", "Marketing landing page for a tour operator.", "live", { label: "bet.axelano.space", url: "https://bet.axelano.space", img: "s-lp-bet-d", imgM: "s-lp-bet-m" }),
  I("syn", "Smart Yield Nexus", "Tech blog with a terminal theme, RSS and sitemap.", "live", { label: "smartyieldnexus.com", url: "https://smartyieldnexus.com", img: "s-monolith-tech-d", imgM: "s-monolith-tech-m" }),
  I("ebp", "EBP AI CRM Dashboard", "CRM dashboard with AI-assisted outreach.", "delivered"),
  I("ksp", "KSP Putra Mandiri", "Data warehouse plan: dimensional design, ETL pipeline and a reporting dashboard.", "planned"),
];

export const SYSTEMS: Item[] = [
  I("villa", "Villa Manis FinTech", "Financial reporting and accounting for hospitality, with real-time analytics.", "delivered", { img: "sys-villa", imgM: "sys-villa" }),
  I("sujana", "Sujana Travel", "Tour booking with payments, itineraries and a customer portal.", "delivered", { img: "sys-sujana", imgM: "sys-sujana" }),
  I("bn", "BN Shop Inventory", "Real-time stock tracking, reorder alerts and an analytics dashboard.", "delivered", { img: "sys-bn", imgM: "sys-bn" }),
  I("vmuc", "VMUC FinTech", "Fintech platform with the backend built in three different stacks.", "delivered", { img: "sys-vmuc", imgM: "sys-vmuc" }),
  I("assy", "Assyarif", "Full-stack web system with a separate backend and frontend.", "delivered", { img: "sys-assyarif", imgM: "sys-assyarif" }),
  I("koi", "KOI Campus Platform", "Campus community platform with events and activity tracking.", "delivered", { img: "sys-koi", imgM: "sys-koi" }),
  I("siap", "Siapenku", "Village administration: population data, letters and public services.", "delivered", { img: "sys-siapenku", imgM: "sys-siapenku" }),
  I("siga", "Sigapura", "Web system built twice, in a framework and in plain PHP.", "delivered", { img: "sys-sigapura", imgM: "sys-sigapura" }),
  I("patient", "PatientDx", "Patient data web app with a separate backend and frontend.", "delivered"),
  I("yudha", "E-commerce Store", "Online store with a separate backend and frontend.", "delivered"),
  I("baling", "Balingkang", "Web system with a separate backend and frontend.", "delivered"),
  I("perpus", "Cortis Library", "Library management web app.", "delivered"),
  I("ums", "UMS", "Management system with a single-page frontend and a REST backend.", "delivered"),
  I("moni", "Monitrack", "Tracking web app, deployed on Vercel.", "delivered", { label: "monitrack-mu.vercel.app", url: "https://monitrack-mu.vercel.app" }),
];

/* ------------------------------------------------------------------ */
/* Web3 sites (every one)                                              */
/* ------------------------------------------------------------------ */

const W = (
  slug: string,
  name: string,
  ticker: string,
  domain: string,
  fw: "astro" | "vite" | "next",
  status: Status,
  text: string
): Item => ({
  id: `w-${slug}`,
  name,
  text,
  status,
  ticker,
  fw,
  label: domain,
  url: `https://${domain}`,
  img: `s-${slug}-d`,
  imgM: `s-${slug}-m`,
});

export const WEB3: Item[] = [
  W("strata-chain", "ORE Network", "$ORE", "orecosystem.dev", "vite", "live", "White and purple chain site, 3 pages, English and Traditional Chinese."),
  W("crusade-coin", "Crusader", "$CRUSADER", "thebrewcrusader.fun", "vite", "live", "Ivory-and-gold crusader with a price card refreshing every 5 seconds."),
  W("step-coin", "4Pay", "$4PAY", "use4pay.fun", "vite", "live", "Rewards dashboard, 7 pages, wallet connect, Chinese and English."),
  W("mfga-coin", "MFGA", "$MFGA", "mfga.fun", "vite", "live", "Mint-teal hand icon, live stats and an on-chain transaction feed."),
  W("sting-coin", "Saber", "$SABER", "itssaber.fun", "vite", "live", "Mecha HUD with a mission log and live transactions."),
  W("pecan-coin", "Corgi", "$CORGI", "corgibinance.fun", "vite", "live", "Memorial newspaper layout with a copy-contract flow."),
  W("thefour-coin", "THE FOUR", "$THEFOUR", "thefourmeme.fun", "vite", "live", "Chinese-language cyborg-hand HUD."),
  W("afengfancoin", "Captain 4", "$C4", "afengfancoin.vercel.app", "vite", "live", "Black-and-green HUD with live stats, in Chinese."),
  W("dragon-coin", "Dragon Radar", "$AFENG", "dragon.axelano.space", "vite", "live", "Scouter power counter and a Dragon Radar roadmap."),
  W("nebula-cat-coin", "Nebula Cat", "星系猫", "nebula.axelano.space", "vite", "live", "Galaxy kitten with constellation tokenomics, in Chinese."),
  W("lulu-coin", "Lulu", "$LULU", "lulu.axelano.space", "vite", "live", "Warm sunset capybara with live stats."),
  W("yellow-kid", "Yellow Kid", "$YELLOWKID", "yellowkid.axelano.space", "vite", "live", "Soft yellow-green charity theme."),
  W("comic-coin", "Hachiware", "$HACHIWARE", "comic.axelano.space", "vite", "live", "Comic-book storybook, in Japanese."),
  W("bennydog-coin", "Benny Dog", "$BENNY", "bennydog.axelano.space", "vite", "live", "Pet ID card with paw prints and a speech-bubble FAQ."),
  W("brainless-coin", "沒腦子 Brainless", "$MBZ", "brainless.axelano.space", "vite", "live", "Black-and-yellow, Traditional Chinese, live activity feed."),
  W("cat-the-builder-coin", "Cat The Builder", "$CTB", "catthebuilder.axelano.space", "vite", "live", "Construction-site theme with a ticker tape."),
  W("fight-coin", "Fight", "$FIGHT", "fight-coin.vercel.app", "vite", "live", "Minimal dark green with a fist mascot and live stats."),
  W("genz-terminal", "Popo Terminal", "$POPO", "genz.axelano.space", "vite", "live", "Hacker terminal with an agent activity log."),
  W("golden-knight-coin", "Golden Knight", "$GOLDENKNIGHT", "golden-knight-coin.vercel.app", "vite", "live", "Gothic heraldry, stained glass and wax-seal tokenomics."),
  W("hardhat-cat-coin", "Gold Hat Crew", "$BREWCAT", "hardhat-cat-coin.vercel.app", "vite", "live", "Blueprint gold-on-white with a hard-hat cat."),
  W("baby-puddle", "Baby Puddle", "$BABYPOODLE", "baby-puddle.axelano.space", "vite", "live", "Stray-dog rescue theme with a live charity balance."),
  W("lp-utan", "Utan", "$UTAN", "utan.axelano.space", "next", "live", "Orangutan conservation mission with live token stats."),
  W("little-academy", "Hare Academy", "$HARE", "little-academy.vercel.app", "astro", "concept", "Kids-learning look with a rabbit mascot and a donate-by-QR dialog."),
  W("amber-night", "Purr Club", "TBA", "amber-night.vercel.app", "astro", "concept", "Black and amber cat charity community."),
  W("academy-coin", "Academy Coin", "TBA", "academy.axelano.space", "vite", "concept", "Gold-black royal cat academy with a report card."),
  W("aurum-coin", "Aurum", "$AURUM", "aurum-coin.vercel.app", "vite", "concept", "Gold-and-white quality mark."),
  W("bob-coin", "Built On Brew", "$BOB", "bob-coin.vercel.app", "vite", "concept", "Charcoal and gold editorial with a brewing timeline."),
  W("caliber-coin", "Caliber", "$CAL", "caliber-coin.vercel.app", "vite", "concept", "Watch-catalogue look with a provenance ledger."),
  W("caturn", "Caturn", "$CATURN", "caturn-red.vercel.app", "vite", "concept", "Saturn-ring galaxy in navy and gold."),
  W("chip-coin", "Chip", "$CHIP", "chip-coin.vercel.app", "vite", "concept", "Ranger field journal in pine and rust."),
  W("ember-coin", "Ember", "$EMBER", "ember-coin.vercel.app", "vite", "concept", "Whitepaper style with an on-chain burn tracker."),
  W("guochao-coin", "Guochao", "$GUO", "guochao.axelano.space", "vite", "concept", "Lacquer red, imperial gold and jade."),
  W("memediary-coin", "MeMe Diary", "$DIARY", "memediary-coin.vercel.app", "vite", "concept", "Cream notebook diary."),
  W("miaoverse-coin", "MiaoVerse", "$MIAO", "miaoverse.axelano.space", "vite", "concept", "Pastel iridescent cat universe."),
  W("mingzy-coin", "Mingzy Coin", "$MINGZY", "mingzy-coin.axelano.space", "vite", "concept", "Pastel-blue neo-brutalist."),
  W("nutkin-coin", "Nutkin", "$NUTKIN", "nutkin-coin.vercel.app", "vite", "concept", "Dusk and lantern memorial."),
  W("pineapple-coin", "Pineapple", "$PINE", "pineapple-coin.vercel.app", "vite", "concept", "Tropical crate-label editorial."),
  W("robo-coin", "Robo Coin", "$ROBO", "robo-coin.vercel.app", "vite", "concept", "Chrome-and-gold android."),
  W("sun-coin", "Sun Coin", "$SUN", "sun-coin.vercel.app", "vite", "concept", "Solar aurora poster with ticket-stub tokenomics."),
  W("vaudeville-coin", "Vaudeville Reel", "$REEL", "vaudeville-coin.vercel.app", "vite", "concept", "1930s rubber-hose cartoon."),
  W("vela-coin", "Vela", "$VELA", "vela.axelano.space", "vite", "concept", "Dark editorial bento grid with no scroll parallax."),
  W("deployer", "Plinth Token Deployer", "tool", "mingzy-deployer.vercel.app", "vite", "concept", "Wallet-connect token launch UI with a live ledger feed."),
  W("four-trader-hero", "Four Trader Hero", "hero", "four-trader-hero.vercel.app", "vite", "concept", "Traditional Chinese hero experiment."),
  W("gundala-hero", "Gundala Hero", "hero", "gundala-hero.vercel.app", "vite", "concept", "Indonesian superhero hero with an animated bolt."),
];

/* ------------------------------------------------------------------ */
/* Platform and infra                                                  */
/* ------------------------------------------------------------------ */

export const INFRA = [
  { value: "7+1", label: "services", name: "Go Microservices", text: "A gateway plus seven services behind the marketplace." },
  { value: "650→150s", label: "build time", name: "Faster Deploys", text: "Back-office build cut by two thirds, backend builds only what changed." },
  { value: "2", label: "backup sites", name: "Self-hosted Data", text: "Moved off a hosted database, with off-site backups and a prod-mirror staging environment." },
  { value: "0", label: "downtime", name: "Domain and Email Move", text: "Brand moved to a new domain with Google Change of Address accepted." },
  { value: "61→95", label: "Lighthouse", name: "Performance", text: "Homepage rendering fix. Accessibility, SEO and agentic scores at 100." },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const EXPERIENCE = [
  { date: "Mar 2025", title: "CTO, New Directions Success", text: "Guestlist Ticket across web, mobile, back office and AI agents." },
  { date: "Sep 2024", title: "Senior Mobile Engineer, Jobseeker", text: "Matching platforms for job seekers and employers." },
  { date: "Aug 2022", title: "Mobile Engineering Lead, BTW Edutech", text: "iOS, Android, web and desktop. Led and mentored the team." },
  { date: "Aug 2021", title: "President, student executive board", text: "Led 114 members and more than 40 programs." },
  { date: "Dec 2019", title: "Freelance Full-Stack", text: "Client work across the whole stack, and the start of the Web3 launch sites." },
];
