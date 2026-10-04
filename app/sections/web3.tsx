"use client";

import { useState } from "react";
import { WEB3 } from "@/config/work";
import { StatusTag } from "@/components/status";

type F = "all" | "live" | "astro" | "concept";

const FILTERS: { key: F; label: string; count: number }[] = [
  { key: "all", label: "All", count: WEB3.length },
  { key: "live", label: "Live", count: WEB3.filter((w) => w.status === "live").length },
  { key: "astro", label: "Astro", count: WEB3.filter((w) => w.fw === "astro").length },
  { key: "concept", label: "Design concepts", count: WEB3.filter((w) => w.status === "concept").length },
];

export default function Web3Section() {
  const [f, setF] = useState<F>("all");
  const list = WEB3.filter((w) => f === "all" || (f === "live" && w.status === "live") || (f === "astro" && w.fw === "astro") || (f === "concept" && w.status === "concept"));
  const live = FILTERS[1].count;

  return (
    <section id="web3" className="section">
      <div className="wrap">
        <p className="eyebrow">Web3</p>
        <h2 className="h2">
          {WEB3.length} token sites, {live} live
        </h2>
        <p className="lead">Every launch page I shipped, from one-page hero experiments to dashboards with wallet connect and live on-chain stats.</p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter Web3 sites">
          {FILTERS.map((x) => (
            <button key={x.key} type="button" className="chip" aria-pressed={f === x.key} onClick={() => setF(x.key)}>
              {x.label} · {x.count}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((w) => (
            <li key={w.id} className="card flex flex-col gap-0.5 p-2.5">
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
          ))}
        </ul>
      </div>
    </section>
  );
}
