import { BUILDS } from "@/config/builds";
import { ARSENAL, TOOL_COUNT } from "@/config/arsenal";
import { CASES, PROOF } from "@/config/cases";
import { SITE_URL } from "@/config/site";
import { AGENTS, AGENTS_DAILY, WEB3 } from "@/config/work";
import { caseUrl, inWords } from "@/lib/seo";

export const dynamic = "force-static";

const up = (s: string) => s[0].toUpperCase() + s.slice(1);

/**
 * /llms.txt (llmstxt.org): a short Markdown summary for language models. It is written from the same config as the page,
 * so the counts and the case summaries cannot drift. Facts that are on the site only; no contact details.
 */
export function GET() {
  const upcoming = AGENTS.filter((a) => a.status === "build" || a.status === "beta" || a.status === "planned").length;
  const body = `# Jeremia Axelano

> Co-founder, CTO and full-stack engineer in Bali (UTC+8). Co-founder and CTO at Guestlist Ticket, a nightlife and experiences marketplace: live in Bali, with venue pages in Las Vegas, Miami, Los Angeles and New York. Jeremia builds marketplaces on web and mobile, the AI agents that run them, and Web3 launch sites.

Status is shown as it is on the site: live, in build, internal or concept. Numbers are rounded down. In production: ${PROOF.visitors} site visits, ${PROOF.bookings} booking requests in a month and ${PROOF.partners} partner businesses. ${up(inWords(AGENTS_DAILY))} AI agents are in daily use and ${inWords(upcoming)} more are in build, beta or planning. The portfolio lists ${BUILDS.length} builds, ${WEB3.length} of them Web3 sites, and ${TOOL_COUNT} tools across ${ARSENAL.length} stacks.

## Start here

- [Portfolio](${SITE_URL}/): one page with the platform, the system map, the case studies, the agents, every build, the tech arsenal and how to get in touch
- [Link hub](https://link.axelano.space): Jeremia's links on one short page

## Case studies

${CASES.map((c) => `- [${c.title}](${caseUrl(c)}): ${c.summary}`).join("\n")}

## Background

- Education: Bachelor of Information Technology (Information Data Management), Indonesian Institute of Business and Technology (INSTIKI), Bali, August 2019 to February 2023, GPA 3.62 of 4.00
- Honors: Internal Debate Competition winner, INSTIKI, February 2023
- Leadership: President of the INSTIKI Student Executive Board (114 members, more than 40 programs, 2021 to 2022); Vice Chairman of the Christian Student Union (180 members)
- Languages: Indonesian (native), English (professional working proficiency)

## Optional

- [LinkedIn](https://www.linkedin.com/in/jeremia-axelano/)
- [GitHub](https://github.com/AxelanO7)
- [Guestlist Ticket](https://guestlistticket.com): the marketplace Jeremia leads technology for
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
