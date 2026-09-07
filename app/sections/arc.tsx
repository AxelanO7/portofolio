"use client";

import { m as motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { scrollToTarget } from "@/components/smooth-scroll";

const ACT_I = [
  { k: "Go while leading mobile", d: "Wrote Golang backends & ran Linux servers while I was Mobile Engineering Lead — range beyond my title." },
  { k: "Mobile at scale", d: "Shipped Flutter/React-Native apps across iOS, Android & Web (BTW Edutech, Jobseeker) and led the team." },
  { k: "6+ years freelance, polyglot", d: "Full-stack delivery for real clients since 2019 across Java, PHP/Laravel, Vue, React, Go — whatever the stack needed, not one comfort zone." },
  { k: "Self-driven DevOps", d: "CI/CD, Docker, VPS & cloud early — infrastructure I chose to learn, not was told to." },
];

const ACT_II = [
  { k: "Leading AI R&D — Lerka", d: "Technical lead for New Directions Success's compare-first AI platform — one query, multiple models, one synthesized answer. Currently in closed beta." },
  { k: "Production automation agent", d: "Built and run a reporting & ops agent — workflow orchestration wired to real infrastructure, not a demo." },
  { k: "AI-run DevOps", d: "Agents handle reporting, monitoring & ops decisions — the Linux/DevOps foundation, now AI-native." },
  { k: "CTO @ Guestlist", d: "Lead architecture & delivery of a full marketplace ecosystem — mobile, web, backend, back-office — now expanding from Bali to Las Vegas." },
];

const BRIDGE = [
  "Golang → Go microservices",
  "Linux & DevOps → AI-run ops",
  "Flutter & React Native → Guestlist partner & user apps",
  "React, Vue & Next.js → AI product frontends",
  "Freelance polyglot range → multi-model orchestration",
  "Team & product leadership → directing Lerka R&D",
];

function ActCard({
  tag,
  era,
  title,
  tone,
  items,
  delay = 0,
}: {
  tag: string;
  era: string;
  title: string;
  tone: "neutral" | "accent";
  items: { k: string; d: string }[];
  delay?: number;
}) {
  const ring = tone === "neutral" ? "text-white/70" : "text-accent";
  const dot = tone === "neutral" ? "bg-white/60" : "bg-accent";
  const glow =
    tone === "neutral" ? "before:bg-white/[0.04]" : "before:bg-accent/10";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={`glass relative overflow-hidden rounded-3xl p-7 md:p-9 before:absolute before:-right-16 before:-top-16 before:h-48 before:w-48 before:rounded-full before:blur-3xl ${glow}`}
    >
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className={`font-tech text-[11px] uppercase tracking-[0.22em] ${ring}`}>
            {tag}
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-tech text-[11px] tracking-widest text-white/40">
            {era}
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-white md:text-3xl">
          {title}
        </h3>

        <ul className="mt-7 space-y-5">
          {items.map((it) => (
            <li key={it.k} className="flex gap-3.5">
              <span
                className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${dot}/15`}
              >
                <Check className={`h-3 w-3 ${ring}`} />
              </span>
              <div>
                <p className="font-semibold text-white">{it.k}</p>
                <p className="mt-0.5 text-sm font-light leading-relaxed text-white/55">
                  {it.d}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ArcSection() {
  const { t } = useI18n();
  return (
    <section
      id="arc"
      className="relative w-full overflow-hidden bg-ink py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-tech text-xs uppercase tracking-[0.28em] text-accent/80">
            {t("arc_eyebrow")}
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            {t("arc_title_1")} <span className="underline decoration-2 underline-offset-4">{t("arc_title_2")}</span>
            {t("arc_title_3")}{" "}
            <span className="text-accent">{t("arc_title_4")}</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-white/55">
            {t("arc_desc")}
          </p>
        </motion.div>

        {/* Diptych */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <ActCard
            tag="Act I — Foundation"
            era="2019 – 2024"
            title="Broad, self-driven engineering range."
            tone="neutral"
            items={ACT_I}
          />

          {/* Bridge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-row items-center justify-center gap-3 lg:flex-col"
          >
            <span className="hidden h-full w-px bg-gradient-to-b from-white/25 via-accent/40 to-accent/60 lg:block" />
            <div className="flex flex-col items-center gap-2 py-2">
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-white/40">
                {t("arc_bridge")}
              </span>
              {BRIDGE.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm"
                >
                  {b}
                </span>
              ))}
            </div>
            <span className="hidden h-full w-px bg-gradient-to-b from-white/25 via-accent/40 to-accent/60 lg:block" />
          </motion.div>

          <ActCard
            tag="Act II — AI-native"
            era="2024 – now"
            title="Leading AI R&D, hands-on."
            tone="accent"
            items={ACT_II}
            delay={0.1}
          />
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-white/5 pt-10 md:grid-cols-4"
        >
          {[
            { n: "6+", l: "Years building" },
            { n: "40+", l: "Products shipped" },
            { n: "10+", l: "Languages & stacks" },
            { n: "2", l: "AI systems led" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl font-bold text-white md:text-5xl">
                {s.n}
              </div>
              <div className="mt-2 font-tech text-[11px] uppercase tracking-widest text-white/45">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Handoff to work */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#work");
            }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            {t("arc_cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
