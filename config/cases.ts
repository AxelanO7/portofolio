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
  /** ISO 8601 with offset: when the case page first went online (git 201d647). Feeds Article.datePublished and og:article. */
  published: string;
  /** ISO 8601 with offset: last change to the case text (git 201d647). Bump it whenever the text changes. Feeds dateModified and the sitemap. */
  updated: string;
}

/**
 * Headline numbers, rounded down to a "+" floor from the prod database on 2026-11-12:
 * 117,706 site visits (41,833 unique), 112 partner businesses, and 1,133 booking records
 * in Oct 2026 (895 hand-offs to the partner's checkout, 238 direct). November runs at about
 * 700 a month so far, so the label says "in a month", never "every month".
 * Visitors are site visits. Never label them "unique visitors".
 * Re-check against the database before raising any number.
 */
export const PROOF = {
  visitors: "110,000+",
  bookings: "1,000+",
  partners: "110+",
};

export const CASES: Case[] = [
  {
    id: "seo",
    title: "Search traffic, rebuilt",
    summary: "How a nightlife marketplace cleaned up what search engines see: server rendering, a clean sitemap and a domain move without downtime.",
    problem: "The homepage rendered on the client, and the sitemap listed 328 URLs when only 70 were real pages: 186 of the rest were redirects.",
    constraints: "A live marketplace with real bookings, so no downtime. The brand and the domain were changing at the same time, and the team was small.",
    approach: "Moved the homepage to server rendering in early October, rebuilt the sitemap so it lists only real pages, cleaned up page titles and descriptions for venues, and added attribution tracking for ads. The domain move came with a Google Change of Address. Since then every new venue page goes into the sitemap when it goes live.",
    result: "Sitemap 328 → 70 real pages, then 159 as venues and cities were added.",
    outcome: [
      "Sitemap 328 → 70 URLs with redirect entries removed, then 159 real pages by November 2026, including four US cities.",
      "Venue pages carry structured data (venue, FAQ, breadcrumbs) from the day they go live.",
      "Brand moved to a new domain with zero downtime, and Google accepted the Change of Address.",
      "Ad attribution tracking in place, so bookings can be tied back to a campaign.",
    ],
    next: "Performance numbers will be added once they are re-measured on the current release.",
    status: "live",
    published: "2026-10-11T17:39:12+08:00",
    updated: "2026-11-13T05:00:00+08:00",
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
    published: "2026-10-11T17:39:12+08:00",
    updated: "2026-10-11T17:39:12+08:00",
  },
  {
    id: "city",
    title: "New cities, from a spreadsheet",
    summary: "Taking a nightlife marketplace from Bali to four US cities: a daily import pipeline with human approval, USD pricing and a multi-city platform.",
    problem: "Opening a new market meant weeks of manual venue research.",
    constraints: "Event data comes from third parties in different formats and currencies, nothing may go live without approval, and a venue that has not confirmed a partnership gets a plain listing page, not promises about entry or guest lists.",
    approach: "A daily import pipeline that finds, checks and cites venue and event data, then asks a person to approve before anything goes live. USD pricing and multi-currency checkout, a city and country picker, region filters in the back office and SEO groundwork for each new market. In November 2026 the first US venues went live as listing pages with a link to the official site.",
    result: "16 venue pages live in Las Vegas, Miami, Los Angeles and New York since November 2026.",
    outcome: [
      "16 venue pages live: Las Vegas 7, Miami 4, Los Angeles 3, New York 2.",
      "Each page carries structured data (venue, FAQ, breadcrumbs) and sits in the sitemap.",
      "USD pricing and multi-currency checkout built.",
      "The same platform can add more cities and countries without a rebuild.",
    ],
    next: "The US pages are listings for now: no packages, events or booking yet. Traffic numbers for the new market will follow once there is enough to measure.",
    status: "live",
    published: "2026-10-11T17:39:12+08:00",
    updated: "2026-11-13T05:00:00+08:00",
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
  { title: "Technical partner", text: "An ongoing technical lead for your team, part time." },
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
