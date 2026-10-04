"use client";

import { useState } from "react";
import BuildGraph from "@/components/three/BuildGraphClient";
import GalaxyPlaceholder from "@/components/three/GalaxyPlaceholder";
import { ARSENAL, TOOL_COUNT } from "@/config/arsenal";
import { AGENTS, WEB3 } from "@/config/work";
import { useI18n } from "@/lib/i18n";

const PLATFORMS = 7;

export default function HeroSection() {
  const { t } = useI18n();
  const [focus, setFocus] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  const proof = [
    { value: TOOL_COUNT, label: t("proof_tools") },
    { value: AGENTS.length, label: t("proof_agents") },
    { value: WEB3.length, label: t("proof_web3") },
    { value: PLATFORMS, label: t("proof_platforms") },
  ];

  return (
    <section id="top" className="pb-16 pt-8 text-center md:pb-24 md:pt-12">
      <div className="wrap">
        <p className="eyebrow">{t("hero_eyebrow")}</p>

        <div className="stage mt-4">
          <div className="hud">
            <i />
            build-graph · {TOOL_COUNT} tools · {ARSENAL.length} stacks
          </div>
          <GalaxyPlaceholder ready={ready} />
          <BuildGraph focus={focus} onReady={() => setReady(true)} />
        </div>

        <div className="legend mt-5" role="group" aria-label="Isolate a stack">
          <button type="button" className="chip" aria-pressed={focus === null} onClick={() => setFocus(null)}>
            {t("hero_all")} · {TOOL_COUNT}
          </button>
          {ARSENAL.map((s, k) => (
            <button
              key={s.name}
              type="button"
              className="chip"
              aria-pressed={focus === k}
              onClick={() => setFocus(focus === k ? null : k)}
            >
              <i style={{ background: s.color }} />
              {s.name} · {s.tools.length}
            </button>
          ))}
        </div>

        <h1 className="mt-10 font-display text-[clamp(40px,11.5vw,92px)] font-bold leading-[0.98] tracking-[-0.04em]">
          {TOOL_COUNT} tools. <span className="text-cy">One builder.</span>
        </h1>
        <p className="lead mx-auto">{t("hero_sub")}</p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="#work" className="btn-cta">
            {t("hero_cta_work")}
          </a>
          <a href="/resume.pdf" download className="btn-ghost">
            {t("hero_cta_cv")}
          </a>
        </div>

        <div className="term mx-auto mt-10 max-w-[680px]">
          <div className="term-head">
            <i />
            <i />
            <i />
            <span>whoami.sh</span>
          </div>
          <div className="term-body">
            <div><span className="p">$</span> <span className="v">whoami</span></div>
            <div>Jeremia Axelano · CTO, full-stack, AI agents</div>
            <div><span className="p">$</span> <span className="v">agents --list</span></div>
            <div><span className="g">{AGENTS.length}</span> running · alerts · testing · data · ops · lerka</div>
            <div><span className="p">$</span> <span className="v">ls products</span></div>
            <div>Guestlist Ticket · <span className="g">{WEB3.length}</span> Web3 sites · Lerka · Weda</div>
            <div><span className="p">$</span> <span className="v">stack --count</span></div>
            <div><span className="g">{TOOL_COUNT}</span> tools across {ARSENAL.length} stacks<span className="cursor" /></div>
          </div>
        </div>

        <dl className="mx-auto mt-10 grid max-w-[760px] grid-cols-2 border-t border-white/[0.09] text-left md:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label} className="pr-3 pt-4">
              <dt className="font-display text-[clamp(22px,6vw,30px)] font-semibold leading-none tabular-nums">{p.value}</dt>
              <dd className="mt-1 text-[12.5px] text-mist">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
