"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import LazyMount from "@/components/lazy-mount";
import { Marquee, StatusPill } from "@/components/ui";
import { BUILDS, KIND_COUNT, KIND_LABEL, SHOTS, type Build, type BuildKind } from "@/config/builds";
import { EV } from "@/lib/events";

const LIM = 12;
const FILTERS: ("all" | BuildKind)[] = ["all", "guestlist", "mobile", "client", "system", "web3"];
const TILE: Record<string, [string, string]> = { mobile: ["#0d4f5f", "#07121a"], system: ["#3d3420", "#07121a"], client: ["#103a4a", "#07121a"], guestlist: ["#0f6074", "#07121a"], web3: ["#103a4a", "#07121a"] };

const Hl = ({ text, q }: { text: string; q: string }): ReactNode => {
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
};

function Media({ b }: { b: Build }) {
  const m = b.media;
  if (m.t === "shot")
    return (
      <div className="bd-media">
        <img className="cover" src={m.img.src} width={m.img.w} height={m.img.h} alt={`${b.name} screenshot`} loading="lazy" decoding="async" />
      </div>
    );
  if (m.t === "posters")
    return (
      <div className="bd-media posters">
        {m.imgs.map((img) => <img key={img.src} src={img.src} width={img.w} height={img.h} alt="" loading="lazy" decoding="async" />)}
      </div>
    );
  const [t1, t2] = TILE[b.kind];
  return (
    <div className="bd-media tile" style={{ ["--t1" as string]: t1, ["--t2" as string]: t2 }}>
      <b>{m.initials}</b>
      <i>{m.hint}</i>
    </div>
  );
}

function Card({ b, i, q }: { b: Build; i: number; q: string }) {
  const body = (
    <>
      <Media b={b} />
      <div className="bd-body">
        <div className="bd-top">
          <h3><Hl text={b.name} q={q} /></h3>
          <StatusPill status={b.status} />
        </div>
        <p>{b.text}</p>
        <span className="bd-meta">{b.ticker ? `${b.ticker} · ` : ""}{b.label ?? KIND_LABEL[b.kind]}</span>
      </div>
    </>
  );
  const style = { animationDelay: `${Math.min(i, 12) * 0.03}s` };
  return b.url ? (
    <a className="bd-card" href={b.url} target="_blank" rel="noopener noreferrer" data-cur="Open" style={style}>{body}</a>
  ) : (
    <div className="bd-card" style={style}>{body}</div>
  );
}

const Thumb = ({ b }: { b: (typeof SHOTS)[number] }) => (
  <img className="bd-th" src={b.media.img.src} width={b.media.img.w} height={b.media.img.h} alt="" loading="lazy" decoding="async" />
);

/** Everything built for other people. Two moving rows, then a searchable grid with a real capture or a plain tile for each. */
export default function BuildsSection() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | BuildKind>("all");
  const [all, setAll] = useState(false);

  useEffect(() => {
    const on = (e: Event) => {
      setQ(String((e as CustomEvent<{ q?: string }>).detail?.q || "").toLowerCase());
      setKind("all");
      setAll(false);
      document.getElementById("work")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    window.addEventListener(EV.builds, on);
    return () => window.removeEventListener(EV.builds, on);
  }, []);

  const rowA = useMemo(() => SHOTS.filter((b) => b.kind === "guestlist" || b.kind === "client"), []);
  const rowB = useMemo(() => SHOTS.filter((b) => b.kind === "web3").slice(0, 24), []);
  const found = useMemo(() => {
    const s = q.trim().toLowerCase();
    return BUILDS.filter((b) => (kind === "all" || b.kind === kind) && (!s || `${b.name} ${b.text} ${b.ticker ?? ""} ${b.label ?? ""}`.toLowerCase().includes(s)));
  }, [q, kind]);
  const shown = all ? found : found.slice(0, LIM);
  const needle = q.trim().toLowerCase();

  return (
    <section className="sec" id="work" data-pausable style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">Client sites, systems, apps and Web3 launches</span>
            <h2 className="t">Shipped for other people, too.</h2>
          </div>
          <p>{BUILDS.length} builds, each with a real capture or a plain tile. Let the rows run, or search them.</p>
        </div>
      </div>
      <LazyMount className="bd-rows" style={{ minHeight: 232 }}>
        <Marquee speed={60} gap={12} items={rowA.map((b) => <Thumb key={b.id} b={b} />)} />
        <Marquee speed={70} gap={12} reverse items={rowB.map((b) => <Thumb key={b.id} b={b} />)} />
      </LazyMount>
      <div className="wrap">
        <div className="bd-bar">
          <span>⌕</span>
          <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setAll(false); }} placeholder={`Search ${BUILDS.length} builds`} autoComplete="off" aria-label="Search builds" />
          <span>{found.length} result{found.length === 1 ? "" : "s"}</span>
        </div>
        <div className="bd-fl">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={kind === f} onClick={() => { setKind(f); setAll(false); }}>
              {f === "all" ? "All" : KIND_LABEL[f]}
              <small>{f === "all" ? BUILDS.length : KIND_COUNT[f]}</small>
            </button>
          ))}
        </div>
        <div className="bd-grid">
          {shown.length ? shown.map((b, i) => <Card key={b.id} b={b} i={i} q={needle} />) : <p className="bd-empty">No match. Try “cat”, “gold” or “erp”.</p>}
        </div>
        {!all && found.length > LIM && (
          <button type="button" className="btn bd-more" onClick={() => setAll(true)}>
            Show {found.length - LIM} more
          </button>
        )}
      </div>
    </section>
  );
}
