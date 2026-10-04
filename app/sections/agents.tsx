import { AGENTS } from "@/config/work";
import { SectionHead, StatusTag } from "@/components/status";

export default function AgentsSection() {
  return (
    <section id="agents" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="AI agents"
          title="Agents that run the company"
          lead="Built and operated for NDS: reporting, alerts, testing, data entry and analysis. Each one has a human owner."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <article key={a.id} className="card flex flex-col gap-1.5 p-4">
              <StatusTag status={a.status} />
              <h3 className="font-display text-base font-semibold tracking-tight">
                {a.url ? (
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="hover:text-cy">
                    {a.name} ↗
                  </a>
                ) : (
                  a.name
                )}
              </h3>
              <p className="text-[13.5px] text-mist">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
