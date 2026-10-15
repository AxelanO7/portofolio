import { TESTIMONIALS } from "@/config/cases";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section">
      <div className="wrap">
        <p className="eyebrow">Testimonials</p>
        <h2 className="h2">What colleagues say</h2>
        <p className="lead">Quoted word for word from recommendations on LinkedIn.</p>
        <ul className="mt-8 grid gap-3.5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <li key={t.id} className="card flex flex-col p-5">
              <figure className="flex h-full flex-col">
                <blockquote className="text-[15px] leading-relaxed">
                  <span aria-hidden className="mr-1 font-display text-3xl leading-none text-gold">“</span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto border-t border-white/[0.09] pt-4 text-sm">
                  <p className="font-display text-base font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-mist">{t.role}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                    {t.relation} · {t.date}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
