"use client";

import SystemMap from "@/components/SystemMap";
import { PROOF } from "@/config/cases";
import { AGENTS } from "@/config/work";
import { useI18n } from "@/lib/i18n";

export default function HeroSection() {
  const { t } = useI18n();

  const proof = [
    { value: PROOF.events, label: t("proof_events") },
    { value: PROOF.venues, label: t("proof_venues") },
    { value: PROOF.lighthouse, label: t("proof_lighthouse") },
    { value: String(AGENTS.length), label: t("proof_agents") },
  ];

  return (
    <section id="top" className="pb-12 pt-8 md:pb-16 md:pt-14">
      <div className="wrap">
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] md:gap-4">
          <div>
            <p className="eyebrow">{t("hero_eyebrow")}</p>
            <h1 className="mt-3.5 font-display text-[clamp(36px,9.5vw,60px)] font-bold leading-[1.04] tracking-[-0.03em]">
              {t("hero_title_a")} <span className="text-gold">{t("hero_title_b")}</span> {t("hero_title_c")}
            </h1>
            <p className="lead">{t("hero_sub")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#cases" className="btn-cta">
                {t("hero_cta_work")}
              </a>
              <a href="#contact" className="btn-ghost">
                {t("hero_cta_call")}
              </a>
            </div>
          </div>
          <SystemMap />
        </div>

        <dl className="mt-10 grid grid-cols-2 border-y border-white/[0.09] md:grid-cols-4">
          {proof.map((p, k) => (
            <div
              key={p.label}
              className={`px-3.5 py-4 ${k % 2 === 0 ? "border-r border-white/[0.09]" : ""} ${k < 2 ? "border-b border-white/[0.09] md:border-b-0" : ""} ${k < 3 ? "md:border-r md:border-white/[0.09]" : "md:border-r-0"}`}
            >
              <dt className="whitespace-nowrap font-display text-[clamp(20px,5.4vw,28px)] font-bold leading-none tabular-nums">{p.value}</dt>
              <dd className="mt-1.5 text-[12.5px] text-mist">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
