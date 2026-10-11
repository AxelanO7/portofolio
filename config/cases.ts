import type { Status } from "./work";

export interface Case {
  id: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  status: Status;
}

/**
 * Headline numbers, Bali production only. Rounded down to a "+" floor from the prod
 * database on 2026-10-11 (30,207 unique visitors tracked, 111 partner businesses,
 * 727 booking records in Sep 2026, most of them hand-offs to the partner's checkout).
 * Re-check against the database before raising any number.
 */
export const PROOF = {
  visitors: "30,000+",
  bookings: "700+",
  partners: "110+",
};

export const CASES: Case[] = [
  {
    id: "seo",
    title: "Search traffic, rebuilt",
    problem: "The homepage rendered on the client, and the sitemap listed 186 redirect URLs next to the real pages.",
    approach: "Server-rendered the homepage, rebuilt the sitemap and added attribution tracking for ads.",
    result: "Sitemap 328 → 70 URLs, so search engines only see real pages.",
    status: "live",
  },
  {
    id: "agents",
    title: "Agents that run the company",
    problem: "Event data entry, testing and alerting took manual hours every week.",
    approach: "Agents for data insert, testing, alerts and analysis, each with a human owner who reviews the output.",
    result: "6 agents in daily use, 4 more in build, beta or planning.",
    status: "live",
  },
  {
    id: "city",
    title: "A new city, from a spreadsheet",
    problem: "Opening a new market meant weeks of manual venue research.",
    approach: "A pipeline that finds, checks and cites venue data, then asks a person to approve before anything goes live.",
    result: "1,700+ events and 45+ venues staged in dev. Production launch in October 2026.",
    status: "build",
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
