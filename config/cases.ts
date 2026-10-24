import type { Status } from "./work";

export interface Case {
  id: string;
  title: string;
  /** one-sentence summary used on the card and in page metadata */
  summary: string;
  problem: string;
  constraints: string;
  approach: string;
  /** short result shown on the card */
  result: string;
  /** full list on the case page */
  outcome: string[];
  /** honest note on what is not done or not measured yet */
  next: string;
  status: Status;
}

/**
 * Headline numbers, Bali production only. Rounded down to a "+" floor from the prod
 * database on 2026-10-11 (111 partner businesses, 727 booking records in Sep 2026,
 * most of them hand-offs to the partner's checkout). Visitors are site visits, re-read
 * from the admin General Visitors totals on 2026-10-24: 100,292 visits, 34,806 unique.
 * Never label them "unique visitors". Re-check against the database before raising any number.
 */
export const PROOF = {
  visitors: "100,000+",
  bookings: "700+",
  partners: "110+",
};

export const CASES: Case[] = [
  {
    id: "seo",
    title: "Search traffic, rebuilt",
    summary: "How a nightlife marketplace cleaned up what search engines see: server rendering, a clean sitemap and a domain move without downtime.",
    problem: "The homepage rendered on the client, and the sitemap listed 186 redirect URLs next to the real pages.",
    constraints: "A live marketplace with real bookings, so no downtime. The brand and the domain were changing at the same time, and the team was small.",
    approach: "Moved the homepage to server rendering in early October, rebuilt the sitemap so it lists only real pages, cleaned up page titles and descriptions for venues, and added attribution tracking for ads. The domain move came with a Google Change of Address.",
    result: "Sitemap 328 → 70 URLs, so search engines only see real pages.",
    outcome: [
      "Sitemap 328 → 70 URLs, redirect entries removed.",
      "Brand moved to a new domain with zero downtime, and Google accepted the Change of Address.",
      "Ad attribution tracking in place, so bookings can be tied back to a campaign.",
    ],
    next: "Performance numbers will be added once they are re-measured on the current release.",
    status: "live",
  },
  {
    id: "agents",
    title: "Agents that run the company",
    summary: "AI agents for data entry, support, alerts and analysis in a small company, each with a human owner and a human decision before anything customer-facing changes.",
    problem: "Event data entry, testing and alerting took manual hours every week.",
    constraints: "Agents touch live customer data, so a wrong venue field is a public mistake. Every run has a cost limit, and a small team cannot babysit a bot.",
    approach: "Each agent gets a named human owner. Agent Board reads venue pages and proposes each field with its source, and a person decides every field before it goes live. A WhatsApp customer-support agent answers from trained replies with an AI fallback, steps in only when nobody replies in time, and hands refunds and complaints to a person. Error alerts turn every failed request into a plain-language message with a help code.",
    result: "6 agents in daily use, 5 more in build, beta or planning.",
    outcome: [
      "6 agents in daily use, covering alerts, IT automation, ops briefings, data import and social analytics.",
      "Agent Board live in production since October 2026.",
      "Customer-support agent built and deployed, in testing, not yet answering real guests.",
    ],
    next: "Turning on the support agent in a small, supervised pilot, then widening it once the answers hold up.",
    status: "live",
  },
  {
    id: "city",
    title: "A new city, from a spreadsheet",
    summary: "Opening Las Vegas as a second market: a daily import pipeline with human approval, USD pricing and a platform that is multi-city by design.",
    problem: "Opening a new market meant weeks of manual venue research.",
    constraints: "Event data comes from third parties in different formats and currencies, nothing may go live without approval, and the launch date is fixed.",
    approach: "A daily import pipeline that finds, checks and cites venue and event data, then asks a person to approve before anything goes live. USD pricing and multi-currency checkout, a city and country picker, region filters in the back office and SEO groundwork for the new market.",
    result: "1,700+ events and 45+ venues staged in dev. Production launch in October 2026.",
    outcome: [
      "1,700+ events and 45+ venues imported and staged ahead of launch.",
      "USD pricing and multi-currency checkout built.",
      "The same platform can add more cities and countries without a rebuild.",
    ],
    next: "Production launch in October 2026. Numbers for the new market will follow once it is live.",
    status: "build",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  date: string;
  relation: string;
  /** verbatim from the LinkedIn recommendation, trimmed only with an ellipsis */
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "abdullah",
    name: "Abdullah Al-Karim Amrullah",
    role: "Laravel | Java Spring Boot | AWS Cloud",
    date: "14 Feb 2025",
    relation: "Same team at Jobseeker",
    quote:
      "I highly recommend Axel as a Flutter Engineer. I worked with him at Jobseeker Company and was consistently impressed by his skills. He builds great, user-friendly apps, writes clean code, and is a fantastic problem-solver. Axel's also a great team player and always eager to learn. He'd be a valuable asset to any team.",
  },
  {
    id: "rifai",
    name: "RN Rifa'i",
    role: "Sr. AI Devops Engineer at Volare Group | Rust Backend Engineer",
    date: "12 Feb 2025",
    relation: "Worked with him from another team",
    quote:
      "During my time working with Axel. when I find a bug or problem on the server related to him. Axel will quickly fix it, according to the order of tasks and priorities which are prioritized. Axel sometimes provides input on new technologies in flutter which will later be reviewed by the company whether it is worth it or not. I recommend him because he is experienced as a flutter engineer.",
  },
];

export const ENGAGEMENTS = [
  { title: "Build a product", text: "A scoped project, web or mobile, shipped end to end." },
  { title: "Advisory", text: "Architecture and hiring review for a team that already ships." },
  { title: "CTO as a service", text: "An ongoing technical lead, part time." },
];

/** Web3 sites shown first; the rest sit in the archive. */
export const WEB3_SELECTED = [
  "w-cat-the-builder-coin",
  "w-fight-coin",
  "w-genz-terminal",
  "w-golden-knight-coin",
  "w-hardhat-cat-coin",
  "w-lp-utan",
];
