import type { Status } from "./work";

export interface Case {
  id: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  status: Status;
}

/** Headline numbers. Draft figures from the NDS state, confirm before treating as final. */
export const PROOF = {
  events: "1,500+",
  venues: "45+",
  lighthouse: "61 → 95",
};

export const CASES: Case[] = [
  {
    id: "seo",
    title: "Search traffic, rebuilt",
    problem: "The homepage rendered on the client, and the sitemap listed 186 redirect URLs next to the real pages.",
    approach: "Server-rendered the homepage, rebuilt the sitemap and added attribution tracking for ads.",
    result: "Lighthouse 61 → 95 on mobile. Sitemap 328 → 74 URLs.",
    status: "live",
  },
  {
    id: "agents",
    title: "Agents that run the company",
    problem: "Event data entry, testing and alerting took manual hours every week.",
    approach: "Agents for data insert, testing, alerts and analysis, each with a human owner who reviews the output.",
    result: "11 agents in daily use.",
    status: "live",
  },
  {
    id: "city",
    title: "A new city, from a spreadsheet",
    problem: "Opening a new market meant weeks of manual venue research.",
    approach: "A pipeline that finds, checks and cites venue data, then asks a person to approve before anything goes live.",
    result: "Running in dev. Production launch pending.",
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
