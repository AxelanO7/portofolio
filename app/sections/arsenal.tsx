import { ARSENAL, TOOL_COUNT } from "@/config/arsenal";
import { INFRA } from "@/config/work";
import { SectionHead } from "@/components/status";

export default function ArsenalSection() {
  return (
    <section id="arsenal" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Tech arsenal"
          title={`${TOOL_COUNT} tools, used for real`}
          lead="The only place the stack is listed. Every tool here runs in a production system, a shipped site or an actual repository."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARSENAL.map((s) => (
            <div key={s.name}>
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: s.color }}>
                {s.name}
              </h3>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {s.tools.map((t) => (
                  <li key={t} className="rounded-md border border-white/[0.09] px-2.5 py-1 text-[12.5px] font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-16 font-display text-2xl font-semibold tracking-tight">The part users never see</h3>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {INFRA.map((i) => (
            <div key={i.name} className="card p-4">
              <p className="whitespace-nowrap font-display text-[clamp(20px,5.4vw,30px)] font-semibold leading-none text-cy">{i.value}</p>
              <p className="mt-1 text-xs text-mist">{i.label}</p>
              <p className="mt-3 text-[13px] font-medium">{i.name}</p>
              <p className="mt-1 text-xs text-mist">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
