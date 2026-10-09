"use client";

import { useState } from "react";
import { WEB3, type Item } from "@/config/work";
import { WEB3_SELECTED } from "@/config/cases";
import { StatusTag } from "@/components/status";

type F = "all" | "live" | "astro" | "concept";

const SELECTED = WEB3_SELECTED.map((id) => WEB3.find((w) => w.id === id)).filter((w): w is Item => !!w);
const ARCHIVE = WEB3.filter((w) => !WEB3_SELECTED.includes(w.id));

const FILTERS: { key: F; label: string; count: number }[] = [
  { key: "all", label: "All", count: ARCHIVE.length },
  { key: "live", label: "Live", count: ARCHIVE.filter((w) => w.status === "live").length },
  { key: "astro", label: "Astro", count: ARCHIVE.filter((w) => w.fw === "astro").length },
  { key: "concept", label: "Design concepts", count: ARCHIVE.filter((w) => w.status === "concept").length },
];

function SiteCard({ w }: { w: Item }) {
  return (
    <li className="card flex flex-col gap-0.5 p-2.5">
      <a href={w.url} target="_blank" rel="noopener noreferrer" className="flex flex-1 flex-col gap-0.5">
        <div className="aspect-[9/16] max-h-[240px] overflow-hidden rounded-[10px] bg-black">
          <img src={`/work/${w.imgM}.webp`} alt={`${w.name} on mobile`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        </div>
        <h3 className="mt-2 font-display text-[14.5px] font-semibold leading-tight">{w.name}</h3>
        <p className="font-mono text-[11px] text-gold">{w.ticker}</p>
        <p className="text-xs leading-snug text-mist">{w.text}</p>
        <div className="mt-auto pt-2">
          <StatusTag status={w.status} label={w.label} />
        </div>
      </a>
    </li>
  );
}

export default function Web3Section() {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<F>("all");
  const list = ARCHIVE.filter((w) => f === "all" || (f === "live" && w.status === "live") || (f === "astro" && w.fw === "astro") || (f === "concept" && w.status === "concept"));

  return (
    <section id="web3" className="section">
      <div className="wrap">
        <p className="eyebrow">Web3</p>
        <h2 className="h2">Launch pages for token founders</h2>
        <p className="lead">
          {WEB3.length} sites built in days, not weeks, from one-page experiments to dashboards with wallet connect and live on-chain stats. Six picks first, the rest in the archive.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {SELECTED.map((w) => (
            <SiteCard key={w.id} w={w} />
          ))}
        </ul>

        <button type="button" className="btn-ghost mt-6" aria-expanded={open} aria-controls="web3-archive" onClick={() => setOpen((v) => !v)}>
          {open ? "Hide the archive" : `Show the archive · ${ARCHIVE.length} more`}
        </button>

        {open && (
          <div id="web3-archive" className="mt-6">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter archive">
              {FILTERS.map((x) => (
                <button key={x.key} type="button" className="chip" aria-pressed={f === x.key} onClick={() => setF(x.key)}>
                  {x.label} · {x.count}
                </button>
              ))}
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {list.map((w) => (
                <SiteCard key={w.id} w={w} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
