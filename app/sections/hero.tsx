"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { m as motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import ConstellationClient from "@/components/three/ConstellationClient";
import { useI18n } from "@/lib/i18n";
import { scrollToTarget } from "@/components/smooth-scroll";

const TIMELINE = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
] as const;

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HeroSection() {
  const scrollRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useI18n();

  // Map hero scroll → 0..1 progress for the 3D scene (subtle "open up" on scroll).
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const h = el.offsetHeight || window.innerHeight;
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-ink"
    >
      {/* 3D constellation — full-bleed on mobile, right half on desktop */}
      <div className="absolute inset-0 z-0 md:left-1/2">
        <ConstellationClient scrollRef={scrollRef} />
      </div>

      {/* Legibility: fade behind the text block on mobile (graph stays visible as ambient bg); soft fade at the divider on desktop */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60 md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] hidden w-56 -translate-x-1/2 bg-gradient-to-r from-ink via-ink/60 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-ink to-transparent" />

      {/* Foreground grid: text left, graph occupies the right cell */}
      <div className="pointer-events-none relative z-10 mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-8 px-6 py-24 md:grid-cols-2">
        <div className="flex flex-col justify-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="pointer-events-auto mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t("hero_badge")}
        </motion.div>

        {/* Identity: real photo grounds the headline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-5 flex items-center gap-4"
        >
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-white/15 sm:h-20 sm:w-20">
            <Image src="/a.png" alt="Jeremia Axelano" fill className="object-cover" sizes="80px" priority />
          </div>
          <div>
            <h1 className="text-4xl font-bold leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("hero_title_1")} <span className="text-accent">{t("hero_title_2")}</span>
            </h1>
            <p className="mt-2 font-tech text-xs uppercase tracking-[0.2em] text-white/50 sm:text-sm">
              {t("hero_role")}
            </p>
          </div>
        </motion.div>

        {/* Subline — the two-act story, compressed */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 max-w-xl text-base font-light leading-relaxed text-white/70 md:text-lg"
        >
          {t("hero_sub_1")}{" "}
          <span className="font-medium text-white">{t("hero_sub_2")}</span>{" "}
          {t("hero_sub_3")}{" "}
          <span className="font-medium text-white">{t("hero_sub_4")}</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#work");
            }}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,117,0.35)] active:scale-[0.98]"
          >
            {t("hero_cta_work")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.06]"
          >
            <Download className="h-4 w-4" />
            {t("hero_cta_cv")}
          </a>
          <div className="ml-1 flex items-center gap-1">
            <a
              href="https://github.com/AxelanO7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-lg p-2.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jeremia-axelano/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg p-2.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {/* Concrete career timeline — real dates, real numbers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pointer-events-auto mt-12 border-t border-white/8 pt-5"
        >
          <div className="flex gap-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TIMELINE.map((item) => (
              <div key={item.key} className="flex min-w-[128px] flex-shrink-0 flex-col gap-1">
                <span className="font-tech text-[10px] uppercase tracking-widest text-accent/80">
                  {t(`timeline_${item.key}_date`)}
                </span>
                <span className="text-xs font-semibold text-white">
                  {t(`timeline_${item.key}_title`)}
                </span>
                <span className="text-[11px] text-white/45">
                  {t(`timeline_${item.key}_metric`)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        </div>

        {/* Right cell reserved for the constellation on desktop */}
        <div aria-hidden />
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="font-tech text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-accent/70" />
      </div>
    </section>
  );
}
