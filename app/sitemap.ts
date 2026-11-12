import type { MetadataRoute } from "next";
import { CASES } from "@/config/cases";
import { SITE_URL } from "@/config/site";
import { BUILT_AT, caseUrl } from "@/lib/seo";

/**
 * The home page and the case pages, nothing else. Google reads lastmod only when it matches reality and ignores
 * changefreq and priority, so those are left out. A case page keeps the date of its last text change (config/cases.ts);
 * the home page is rebuilt with every release, so it carries the build date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: BUILT_AT },
    ...CASES.map((c) => ({ url: caseUrl(c), lastModified: c.updated })),
  ];
}
