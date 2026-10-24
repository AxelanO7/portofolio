import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES, ENGAGEMENTS } from "@/config/cases";
import { EMAIL, SITE_URL } from "@/config/site";
import { StatusPill } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const c = CASES.find((x) => x.id === params.id);
  if (!c) return {};
  const url = `${SITE_URL}/cases/${c.id}`;
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${c.title} · Jeremia Axelano`,
      description: c.summary,
      url,
      siteName: "Jeremia Axelano",
      type: "article",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: c.title }],
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.summary, images: ["/og-image.jpg"] },
  };
}

export default function CasePage({ params }: { params: { id: string } }) {
  const i = CASES.findIndex((x) => x.id === params.id);
  if (i < 0) notFound();
  const c = CASES[i];
  const next = CASES[(i + 1) % CASES.length];

  const blocks = [
    ["Problem", c.problem],
    ["Constraints", c.constraints],
    ["Approach", c.approach],
  ] as const;

  return (
    <article className="cp">
      <div className="wrap">
        <Link href="/#cases" className="back">← All case studies</Link>
        <div style={{ marginTop: 26 }}>
          <StatusPill status={c.status} />
        </div>
        <h1>{c.title}</h1>
        <p className="lead">{c.summary}</p>
        <dl>
          {blocks.map(([k, val]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{val}</dd>
            </div>
          ))}
          <div>
            <dt>Outcome</dt>
            <dd>
              <ul className="out">
                {c.outcome.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Still open</dt>
            <dd>{c.next}</dd>
          </div>
        </dl>
        <div className="acts">
          <a className="btn pri" href={`mailto:${EMAIL}?subject=Intro%20call`}>Book an intro call</a>
          <Link className="btn" href={`/cases/${next.id}`}>Next: {next.title} →</Link>
        </div>
        <p className="cap" style={{ marginTop: 28 }}>{ENGAGEMENTS.map((e) => e.title).join(" · ")}</p>
      </div>
    </article>
  );
}
