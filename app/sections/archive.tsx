"use client";

import { useState } from "react";
import { m as motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, TAG_COLOR, type ProjectItem } from "@/config/projects";

function abbr(name: string): string {
  return name
    .split(/[\s—]+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function Card({ p }: { p: ProjectItem }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.015] transition-all hover:border-white/20"
    >
      <div className="relative h-32 flex-shrink-0 overflow-hidden bg-white/[0.02]">
        {p.image ? (
          <>
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover object-top grayscale-[65%] contrast-[1.05] sepia-[15%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-40" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-tech text-3xl font-black tracking-tighter text-white/8">
              {abbr(p.name)}
            </span>
          </div>
        )}
        <span
          className={`absolute left-2.5 top-2.5 rounded-full border px-2 py-0.5 font-tech text-[9px] font-bold ${TAG_COLOR[p.tag] ?? "border-white/10 bg-white/5 text-white/50"}`}
        >
          {p.tag}
        </span>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-2.5 top-2.5 rounded-lg border border-white/10 bg-ink/70 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          >
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
          </a>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="font-tech text-[9px] uppercase tracking-widest text-white/35">
          {p.role}
        </p>
        <h3 className="text-sm font-bold leading-snug text-white">{p.name}</h3>
        <p className="flex-1 text-xs font-light leading-relaxed text-white/50">
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {p.techStack.slice(0, 3).map((t) => (
            <span key={t} className="rounded border border-white/8 px-1.5 py-0.5 font-tech text-[9px] text-white/45">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ArchiveSection() {
  const [showWeb3, setShowWeb3] = useState(false);
  const archive = PROJECTS.filter((p) => p.tier === "archive");
  const web3 = PROJECTS.filter((p) => p.tier === "web3");

  return (
    <section className="relative w-full overflow-hidden bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-tech text-xs uppercase tracking-[0.28em] text-white/40">
            More Work
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            {archive.length}+ more shipped — client platforms, mobile apps &amp; tools.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {archive.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </motion.div>

        {/* Web3 group — kept separate so freelance volume shows without */}
        {/* diluting the engineering-leadership narrative above the fold. */}
        <div className="mt-16 border-t border-white/5 pt-10">
          <button
            onClick={() => setShowWeb3((v) => !v)}
            className="group flex w-full items-center justify-between gap-4 text-left"
          >
            <div>
              <span className="font-tech text-xs uppercase tracking-[0.28em] text-white/45">
                Freelance Volume
              </span>
              <h3 className="mt-2 text-xl font-bold text-white/80 md:text-2xl">
                {web3.length} Web3 landing pages — client work, shown compactly.
              </h3>
            </div>
            <span className="flex-shrink-0 rounded-xl border border-white/12 px-4 py-2 text-xs font-semibold text-white/60 transition-colors group-hover:border-white/25 group-hover:text-white">
              {showWeb3 ? "Hide" : "Show all"}
            </span>
          </button>

          {showWeb3 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6"
            >
              {web3.map((p) => (
                <motion.a
                  key={p.id}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/8 bg-white/[0.015] p-3 text-center transition-colors hover:border-white/30"
                >
                  <p className="truncate text-xs font-semibold text-white/70 group-hover:text-white">
                    {p.name}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
