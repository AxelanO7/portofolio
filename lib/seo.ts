import type { Metadata } from "next";
import type { Case } from "@/config/cases";
import { SITE_URL } from "@/config/site";
import { AGENTS_DAILY, WEB3 } from "@/config/work";

/**
 * Everything the page head needs, in one place: the home title and descriptions, the share image and the
 * metadata builders. app/layout.tsx and app/cases/[id]/page.tsx only pick from here, so a number is edited once.
 * JSON-LD lives in lib/jsonld.ts and reads the same constants.
 */

export const SITE_NAME = "Jeremia Axelano";

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
/** Small counts are written as words, like the rest of the site ("six AI agents"). */
export const inWords = (n: number) => WORDS[n] ?? String(n);

export const HOME_TITLE = `${SITE_NAME} · Co-Founder & CTO, marketplaces, AI agents`;
/** 120-160 characters: longer ones are cut in search results. Counts come from config, so they stay true. */
export const HOME_DESCRIPTION = `${SITE_NAME}, co-founder and CTO of Guestlist Ticket in Bali. A nightlife marketplace on web and mobile, ${inWords(AGENTS_DAILY)} AI agents in daily use, ${WEB3.length} Web3 sites.`;
/** Shorter and plainer, for link previews. */
const SHARE_DESCRIPTION = `A nightlife marketplace on web and mobile, a fleet of AI agents and ${WEB3.length} Web3 sites. One builder across the whole stack.`;

/** When this build ran. Static pages are rendered at build time, so this is the "last updated" of the home page. */
export const BUILT_AT = new Date();

/** Home share image (public/og-image.jpg, 1200x630). ?v= makes social networks fetch a fresh copy after a change. */
export const OG_IMAGE = {
  url: "/og-image.jpg?v=2",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Jeremia Axelano, Co-Founder and CTO at Guestlist Ticket. I build marketplaces, and the agents that run them. Bali, UTC+8.",
};

/** Case share images (public/og/<id>.jpg, 1200x630), drawn by scripts/og/cases.mjs. */
export const caseImage = (c: Case) => ({
  url: `/og/${c.id}.jpg?v=2`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: `Case study: ${c.title}. ${c.result} By ${SITE_NAME}.`,
});

export const caseUrl = (c: Case) => `${SITE_URL}/cases/${c.id}`;

const ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s · ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: SITE_URL },
  robots: ROBOTS,
  openGraph: {
    title: HOME_TITLE,
    description: SHARE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SHARE_DESCRIPTION,
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
};

/** Title, description, canonical and share card for one case page. The title gets the site suffix from the layout template. */
export function caseMetadata(c: Case): Metadata {
  const url = caseUrl(c);
  const title = `${c.title} · ${SITE_NAME}`;
  const image = caseImage(c);
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: c.summary,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "article",
      publishedTime: c.published,
      modifiedTime: c.updated,
      authors: [SITE_URL],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: c.summary, images: [{ url: image.url, alt: image.alt }] },
  };
}
