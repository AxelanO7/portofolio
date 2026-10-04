import { EXPERIENCE } from "@/config/work";
import { SectionHead } from "@/components/status";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Experience" title="From freelance to CTO" />
        <ol className="mt-8 border-l border-white/[0.09]">
          {EXPERIENCE.map((e) => (
            <li key={e.date} className="relative pb-8 pl-6 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-cy" />
              <p className="font-mono text-[11px] uppercase tracking-widest text-cy">{e.date}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{e.title}</h3>
              <p className="mt-1 max-w-[60ch] text-sm text-mist">{e.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
