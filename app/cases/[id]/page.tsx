import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES } from "@/config/cases";
import { StatusTag } from "@/components/status";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const c = CASES.find((x) => x.id === params.id);
  if (!c) return {};
  const url = `https://portfolio.axelano.space/cases/${c.id}`;
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
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: c.title }],
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.summary, images: ["/og-image.png"] },
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
    <article className="section border-t-0">
      <div className="wrap max-w-[860px]">
        <Link href="/#cases" className="font-mono text-xs uppercase tracking-[0.14em] text-mist hover:text-white">
          ← All case studies
        </Link>
        <div className="mt-6">
          <StatusTag status={c.status} />
        </div>
        <h1 className="mt-2 font-display text-[clamp(30px,7vw,48px)] font-bold leading-[1.06] tracking-[-0.02em]">{c.title}</h1>
        <p className="lead">{c.summary}</p>

        <dl className="mt-10 flex flex-col gap-8">
          {blocks.map(([k, v]) => (
            <div key={k} className="border-t border-white/[0.09] pt-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-cy">{k}</dt>
              <dd className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-mist">{v}</dd>
            </div>
          ))}
          <div className="border-t border-white/[0.09] pt-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-cy">Outcome</dt>
            <dd>
              <ul className="mt-2 flex max-w-[66ch] flex-col gap-2.5 text-[16px] leading-relaxed">
                {c.outcome.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="border-t border-white/[0.09] pt-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-cy">Still open</dt>
            <dd className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-mist">{c.next}</dd>
          </div>
        </dl>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href="mailto:jeremia123.jm@gmail.com?subject=Intro%20call" className="btn-cta">
            Book an intro call
          </a>
          <Link href={`/cases/${next.id}`} className="btn-ghost">
            Next: {next.title} →
          </Link>
        </div>
      </div>
    </article>
  );
}
