import { CASES } from "@/config/cases";
import { SectionHead, StatusTag } from "@/components/status";

export default function CasesSection() {
  return (
    <section id="cases" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Case studies" title="What changed after I got involved" />
        <div className="mt-8 grid gap-3.5 lg:grid-cols-3">
          {CASES.map((c) => (
            <article key={c.id} className="card flex flex-col gap-3 p-5">
              <StatusTag status={c.status} />
              <h3 className="font-display text-xl font-semibold leading-tight tracking-tight">{c.title}</h3>
              <dl className="flex flex-col gap-3">
                {(
                  [
                    ["Problem", c.problem],
                    ["Approach", c.approach],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-cy">{k}</dt>
                    <dd className="mt-1 text-[14px] leading-snug text-mist">{v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-cy">Result</dt>
                  <dd className="mt-1 text-[14.5px] font-semibold leading-snug">{c.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
