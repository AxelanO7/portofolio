"use client";

import { m as motion } from "framer-motion";
import { Bot, Layers, Mic, Sparkles } from "lucide-react";

const BLOCKS = [
  {
    tag: "What it is",
    body: "Lerka is New Directions Success's AI R&D initiative — I lead the technical build. It's compare-first, not chat-first: one query fans out to 2–4 models in parallel and comes back as a single synthesized answer, instead of betting on whichever model you happened to open. Currently in closed beta.",
  },
  {
    tag: "How it works",
    body: "Go API gateway, Python/FastAPI backend orchestrating OpenRouter models alongside self-hosted Ollama, Next.js frontend, Supabase for auth & credits, real-time streaming — a system, not a wrapper around one API.",
  },
  {
    tag: "Compare, don't guess",
    body: "The R&D problem: no single model is right every time. Lerka runs the same prompt across several and surfaces where they agree and disagree — the hard part was making that fast and cheap enough to actually price as a product.",
  },
];

const MODELS = [
  { label: "DeepSeek", sub: "reasoning" },
  { label: "Gemini", sub: "multimodal" },
  { label: "Claude", sub: "synthesis" },
];

function CompareOrbit() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* ambient */}
      <div className="absolute h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      {/* center core = Lerka's compare engine */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass relative z-10 flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-2xl border-accent/30"
      >
        <Bot className="h-7 w-7 text-accent" />
        <span className="font-tech text-[10px] font-bold uppercase tracking-widest text-white">
          Lerka
        </span>
      </motion.div>

      {/* orbiting model chips — the compare-first fan-out */}
      {MODELS.map((m, i) => {
        const angle = (i / MODELS.length) * 360;
        return (
          <motion.div
            key={m.label}
            className="absolute"
            style={{
              transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
          >
            <div className="animate-float-soft glass flex items-center gap-2 rounded-xl border-white/10 px-3 py-2" style={{ animationDelay: `${i * 0.7}s` }}>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <div className="leading-tight">
                <p className="text-xs font-semibold text-white">{m.label}</p>
                <p className="font-tech text-[9px] uppercase tracking-wider text-white/40">
                  {m.sub}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* connecting rings */}
      <div className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-white/10" />
    </div>
  );
}

export default function FlagshipLerka() {
  return (
    <section className="relative w-full overflow-hidden bg-ink-elev py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-tech text-xs uppercase tracking-[0.28em] text-accent/80">
              Selected Work · Flagship 02
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.06] px-2.5 py-0.5 font-tech text-[10px] uppercase tracking-widest text-accent/90">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Closed beta
            </span>
          </div>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            Lerka — <span className="text-accent">compare-first AI</span> R&D at New Directions Success.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-7">
              {BLOCKS.map((b) => (
                <div key={b.tag} className="border-l-2 border-white/10 pl-5">
                  <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-accent/80">
                    {b.tag}
                  </p>
                  <p className="mt-2 text-base font-light leading-relaxed text-white/70">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Go", "Python", "FastAPI", "Next.js", "Supabase", "OpenRouter", "Ollama", "Whisper", "TTS"].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-tech text-[11px] text-white/65"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-white/50">
              <span className="flex items-center gap-1.5 text-xs">
                <Layers className="h-3.5 w-3.5 text-accent" /> Multi-model compare
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> Closed-beta R&D
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <Mic className="h-3.5 w-3.5 text-accent" /> Voice pipeline
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.015] lg:h-[460px]"
          >
            <CompareOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
