"use client";

import { m as motion } from "framer-motion";
import { ArrowUpRight, Move3d } from "lucide-react";
import ArchitectureClient from "@/components/three/ArchitectureClient";

const BLOCKS = [
  {
    tag: "Problem",
    body: "Bring tourism, nightlife & premium services into one booking platform — four verticals (nightlife, rentals, experiences, wellness) live in Bali, now expanding into Las Vegas, with a roadmap to go global from there.",
  },
  {
    tag: "Architecture",
    body: "A Go API gateway fronting 6 domain microservices (Identity, Payments, Partnerships, Catalog, Bookings, Talent) on clean architecture — PostgreSQL, MongoDB & Redis, with DOKU payments and Firebase push.",
  },
  {
    tag: "Ecosystem, not one product",
    body: "90+ partner venues across nightclubs, beach clubs, villas, tours and spas — plus a promoter & affiliate network with referral links, commission tracking and automated payouts built into the platform.",
  },
  {
    tag: "My role — CTO",
    body: "Own strategy, architecture and delivery end-to-end — five client surfaces on one coherent backend. I also lead the engineering team (CI/CD, code-review culture, documentation system for a distributed team) and own the technical side of growth — the SEO/AEO architecture behind a global expansion roadmap, multi-language rollout, and partner-integration decisions.",
  },
];

const STATS = [
  { n: "4", l: "Service categories" },
  { n: "90+", l: "Partner venues" },
  { n: "Bali → Vegas → world", l: "Expansion roadmap" },
];

const TECH = ["Go", "Gin", "Next.js", "React Native", "PostgreSQL", "MongoDB", "Redis", "Docker", "DOKU", "Firebase"];

const LINKS = [
  { label: "guestlist.id", href: "https://guestlist.id" },
  { label: "admin.guestlist.id", href: "https://admin.guestlist.id" },
];

export default function FlagshipGuestlist() {
  return (
    <section id="work" className="relative w-full overflow-hidden bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-tech text-xs uppercase tracking-[0.28em] text-accent/80">
            Selected Work · Flagship 01
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            Guestlist — a marketplace ecosystem,{" "}
            <span className="underline decoration-2 underline-offset-4">end to end</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: case study */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
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

            <div className="mt-8 flex flex-wrap gap-6 border-y border-white/8 py-5">
              {STATS.map((s) => (
                <div key={s.l}>
                  <div className="whitespace-nowrap text-xl font-bold text-white sm:text-2xl">{s.n}</div>
                  <div className="mt-0.5 font-tech text-[10px] uppercase tracking-widest text-white/45">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-tech text-[11px] text-white/65"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/[0.06]"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D architecture explorer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-1 h-[420px] w-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.015] lg:order-2 lg:h-[560px]"
          >
            <div className="absolute inset-0">
              <ArchitectureClient />
            </div>
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 font-tech text-[10px] uppercase tracking-widest text-white/55 backdrop-blur-sm">
              <Move3d className="h-3.5 w-3.5 text-accent" />
              Interactive · drag to orbit
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
