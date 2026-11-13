import type { Case } from "@/config/cases";
import { SITE_URL } from "@/config/site";
import { BUILT_AT, HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, caseImage, caseUrl } from "./seo";

/**
 * Structured data (schema.org JSON-LD), one self-contained @graph per page.
 *   home        WebSite + ProfilePage whose mainEntity is the Person (Google: Profile page, Site names)
 *   case pages  Article + BreadcrumbList (Google: Article, Breadcrumb), author = the same Person @id
 * Only facts that are written on the page go in. No phone number and no e-mail address, on purpose.
 */

type Json = Record<string, unknown>;

const HOME = `${SITE_URL}/`;
const abs = (path: string) => `${SITE_URL}${path}`;

/** Stable ids: the same Person node is named on the home page and on every case page. */
export const ID = {
  person: `${HOME}#person`,
  website: `${HOME}#website`,
  profile: `${HOME}#profile`,
} as const;

/** Short form used where the full Person is not the subject (an article's author). */
const PERSON_REF: Json = { "@type": "Person", "@id": ID.person, name: SITE_NAME, url: HOME };

const person = (): Json => ({
  "@type": "Person",
  "@id": ID.person,
  name: SITE_NAME,
  alternateName: "Axel",
  url: HOME,
  // the About photo (public/about.webp, 400x500: above the 50,000 pixels Google asks for)
  image: abs("/about.webp"),
  description: "Co-founder and CTO at Guestlist Ticket. Builds marketplaces and the AI agents that run them.",
  jobTitle: "Co-Founder and Chief Technology Officer",
  worksFor: { "@type": "Organization", name: "Guestlist Ticket", alternateName: "Guestlist", legalName: "PT New Directions Success", url: "https://guestlistticket.com" },
  address: { "@type": "PostalAddress", addressLocality: "Denpasar", addressRegion: "Bali", addressCountry: "ID" },
  knowsAbout: ["Marketplace platforms", "AI agents", "Mobile apps", "Cloud infrastructure", "Web3"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indonesian Institute of Business and Technology (INSTIKI)" },
  knowsLanguage: ["id", "en"],
  award: "Internal Debate Competition winner, INSTIKI, February 2023",
  sameAs: ["https://www.linkedin.com/in/jeremia-axelano/", "https://github.com/AxelanO7", "https://link.axelano.space"],
});

const website = (): Json => ({
  "@type": "WebSite",
  "@id": ID.website,
  url: HOME,
  name: SITE_NAME,
  alternateName: "Axelano",
  description: HOME_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": ID.person },
});

export function homeGraph(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      {
        "@type": "ProfilePage",
        "@id": ID.profile,
        url: HOME,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": ID.website },
        dateModified: BUILT_AT.toISOString(),
        mainEntity: person(),
      },
    ],
  };
}

export function caseGraph(c: Case): Json {
  const url = caseUrl(c);
  const img = caseImage(c);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: c.title,
        description: c.summary,
        image: abs(img.url),
        datePublished: c.published,
        dateModified: c.updated,
        inLanguage: "en",
        author: PERSON_REF,
        isPartOf: { "@type": "WebSite", "@id": ID.website, url: HOME, name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: HOME },
          { "@type": "ListItem", position: 2, name: c.title, item: url },
        ],
      },
    ],
  };
}

/** The text of a <script type="application/ld+json">. "<" is escaped so no string can close the tag (advice from the Next.js JSON-LD guide). */
export const ldString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
