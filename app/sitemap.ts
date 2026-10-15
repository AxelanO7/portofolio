import type { MetadataRoute } from "next";
import { CASES } from "@/config/cases";

const SITE = "https://portfolio.axelano.space";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    ...CASES.map((c) => ({ url: `${SITE}/cases/${c.id}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
