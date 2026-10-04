import { MOBILE } from "@/config/work";
import { SectionHead, StatusTag } from "@/components/status";

export default function MobileSection() {
  const withShot = MOBILE.filter((m) => m.imgM);
  const rest = MOBILE.filter((m) => !m.imgM);
  return (
    <section id="mobile" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Mobile apps"
          title="Shipped on iOS and Android"
          lead="Native and cross-platform apps, from job-matching on Google Play to a school payroll app."
        />
        <div className="rail mt-8">
          {withShot.map((m) => {
            const body = (
              <>
                <div className="aspect-square overflow-hidden rounded-xl bg-black">
                  <img src={`/work/${m.imgM}.webp`} alt={`${m.name} screenshot`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold">{m.name}</h3>
                  <StatusTag status={m.status} label={m.label} />
                </div>
                <p className="mt-1 text-xs text-mist">{m.text}</p>
                {m.label && <p className="mt-2 font-mono text-[11px] text-cy">{m.label} ↗</p>}
              </>
            );
            return m.url ? (
              <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer" className="card w-[min(250px,72%)] flex-none p-3">
                {body}
              </a>
            ) : (
              <article key={m.id} className="card w-[min(250px,72%)] flex-none p-3">
                {body}
              </article>
            );
          })}
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((m) => (
            <li key={m.id} className="rounded-xl border border-white/[0.09] p-4">
              <p className="font-display text-sm font-semibold">{m.name}</p>
              <p className="mt-1 text-xs text-mist">{m.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
