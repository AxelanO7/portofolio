"use client";

import { m as motion } from "framer-motion";
import { Apple, Users } from "lucide-react";

const BLOCKS = [
  {
    tag: "Role",
    body: "Mobile Engineering Lead at BTW Edutech, then Senior Mobile Engineer at Jobseeker — leading teams and shipping across iOS, Android, Web and Desktop from one codebase philosophy.",
  },
  {
    tag: "Approach",
    body: "Structured state management (BLoC, GetX, Provider) for maintainability at scale, mentoring engineers, and keeping delivery reliable as the team and codebase grew.",
  },
  {
    tag: "Outcome",
    body: "Multiple production apps shipped to the Play Store, a full edutech platform across four platforms, and a mobile practice other engineers could build on after I moved on.",
  },
];

const PLATFORMS = ["iOS", "Android", "Web", "Desktop"];

function DeviceStack() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-6">
      {/* platform chips — static row, never overlaps the devices below */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {PLATFORMS.map((p, i) => (
          <span
            key={p}
            className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 font-tech text-[10px] font-semibold uppercase tracking-wider text-white/70"
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            {p}
          </span>
        ))}
      </motion.div>

      {/* devices — normal flow, generous gap, no absolute overlap possible */}
      <div className="relative flex items-center justify-center gap-6">
        {/* back device (web/desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -16, rotate: -6 }}
          whileInView={{ opacity: 1, x: 0, rotate: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass hidden h-40 w-56 rounded-2xl border-white/10 p-3 sm:block"
        >
          <div className="h-2 w-10 rounded-full bg-white/10" />
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-full rounded bg-white/8" />
            <div className="h-2 w-4/5 rounded bg-white/8" />
            <div className="h-14 w-full rounded-lg bg-accent/10" />
          </div>
        </motion.div>

        {/* front device (phone) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass relative z-10 h-64 w-36 rounded-[1.6rem] border-white/15 p-2.5 shadow-2xl"
        >
          <div className="mx-auto h-1.5 w-10 rounded-full bg-white/20" />
          <div className="mt-3 space-y-2 px-1">
            <div className="h-16 w-full rounded-xl bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/15" />
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="h-12 rounded-lg bg-white/8" />
              <div className="h-12 rounded-lg bg-white/8" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FlagshipMobile() {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-tech text-xs uppercase tracking-[0.28em] text-white/50">
            Selected Work · Flagship 03
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            Leading mobile teams,{" "}
            <span className="underline decoration-2 underline-offset-4">shipping across every platform</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-1 h-[380px] w-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.015] lg:h-[460px]"
          >
            <DeviceStack />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2"
          >
            <div className="space-y-7">
              {BLOCKS.map((b) => (
                <div key={b.tag} className="border-l-2 border-white/10 pl-5">
                  <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {b.tag}
                  </p>
                  <p className="mt-2 text-base font-light leading-relaxed text-white/70">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Flutter", "React Native", "BLoC", "GetX", "Provider", "Firebase"].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-tech text-[11px] text-white/65"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-white/50">
              <span className="flex items-center gap-1.5 text-xs">
                <Apple className="h-3.5 w-3.5 text-white/60" /> 4 platforms, one codebase philosophy
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <Users className="h-3.5 w-3.5 text-white/60" /> Led & mentored engineers
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
