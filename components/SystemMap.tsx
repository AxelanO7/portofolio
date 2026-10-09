"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Orbit map of one platform: products on the inner ring, agents in the middle,
 * infrastructure outside, Web3 launch pages as small amber dots. Plain canvas 2D
 * with a hand-rolled perspective projection (no WebGL, no scroll-linked motion).
 * The loop is time-based and stops when off screen, hidden or reduced-motion.
 */

interface Ring {
  r: number;
  spd: number;
  col: string;
  size: number;
  label?: boolean;
  items: [string, string][];
}

const RINGS: Ring[] = [
  {
    r: 1.0, spd: 0.22, col: "#22d3ee", size: 8, label: true,
    items: [
      ["Web", "Guestlist Ticket web · live"],
      ["Mobile", "Consumer app, iOS and Android · in build"],
      ["Partner app", "Offline QR check-in for venues · in build"],
      ["Link hub", "Link-in-bio with campaign tags · live"],
      ["Back office", "About 65 admin screens · internal"],
    ],
  },
  {
    r: 1.6, spd: -0.15, col: "#f472b6", size: 6.5,
    items: [
      ["Event data agent", "Finds and inserts event data"],
      ["Testing agent", "Runs regression checks"],
      ["Alert agent", "Watches errors and pings the team"],
      ["Automation", "Scheduled jobs and imports"],
      ["Support agent", "Answers guests on WhatsApp · in build"],
    ],
  },
  {
    r: 2.2, spd: 0.09, col: "#8aa0b2", size: 5.5,
    items: [
      ["API gateway", "One entry point for every client"],
      ["Database", "PostgreSQL, restore-tested backups"],
      ["CI/CD", "Build and deploy pipeline"],
      ["Observability", "Logs, metrics and alerts"],
      ["LLM gateway", "One place for model keys and limits"],
    ],
  },
];
const WEB3_RING = { r: 2.75, spd: -0.06, col: "#f6c177", size: 3.2 };
const RING_RADII = [1.0, 1.6, 2.2, 2.75];
const HINT = "Center: the Guestlist platform. Tap a dot to see what it is.";

interface Node {
  ring: number;
  i: number;
  n: number;
  name: string;
  info: string;
  r: number;
  spd: number;
  col: string;
  size: number;
  label: boolean;
  y: number;
}

const NODES: Node[] = [];
RINGS.forEach((rg, ri) =>
  rg.items.forEach((it, i) =>
    NODES.push({
      ring: ri, i, n: rg.items.length, name: it[0], info: it[1], r: rg.r, spd: rg.spd, col: rg.col,
      size: rg.size, label: !!rg.label, y: Math.sin(i * 2.1 + ri) * 0.18,
    })
  )
);
for (let k = 0; k < 9; k++)
  NODES.push({
    ring: 3, i: k, n: 9, name: "Web3 launch pages", info: "44 token sites, 22 live", r: WEB3_RING.r, spd: WEB3_RING.spd,
    col: WEB3_RING.col, size: WEB3_RING.size, label: false, y: Math.sin(k * 1.7) * 0.5,
  });

interface Proj { nd: Node; X: number; Y: number; z: number; sc: number; d: number }

export default function SystemMap() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [readout, setReadout] = useState<{ name?: string; info: string }>({ info: HINT });
  const selRef = useRef<Node | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let px = 0;
    let py = 0;
    let visible = true;
    let raf = 0;
    let proj: Proj[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiltBase = 1.0;

    const size = () => {
      const r = cv.getBoundingClientRect();
      W = Math.max(240, r.width);
      H = Math.round(W * (W < 460 ? 0.92 : 0.8));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const S = Math.min(W, H * 1.15) / (W < 460 ? 6.6 : 7.6);
      const phi = tiltBase + py * 0.12;
      const f = 6;

      RING_RADII.forEach((r, ri) => {
        ctx.beginPath();
        for (let a = 0; a <= 64; a++) {
          const th = (a / 64) * Math.PI * 2;
          const x = r * Math.cos(th);
          const z = r * Math.sin(th);
          const sc = f / (f + z * Math.cos(phi));
          const X = cx + (x + px * 0.2) * sc * S;
          const Y = cy - z * Math.sin(phi) * sc * S;
          if (a) ctx.lineTo(X, Y);
          else ctx.moveTo(X, Y);
        }
        ctx.strokeStyle = ri === 3 ? "rgba(246,193,119,.12)" : "rgba(138,160,178,.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      proj = NODES.map((nd) => {
        const th = (nd.i / nd.n) * Math.PI * 2 + t * nd.spd + nd.ring * 0.6 + px * 0.25;
        const x = nd.r * Math.cos(th);
        const z = nd.r * Math.sin(th);
        const yy = nd.y * Math.cos(phi) - z * Math.sin(phi);
        const zz = nd.y * Math.sin(phi) + z * Math.cos(phi);
        const sc = f / (f + zz);
        return { nd, X: cx + x * sc * S, Y: cy + yy * sc * S, z: zz, sc, d: 1 - (zz + nd.r) / (2 * nd.r) };
      }).sort((a, b) => b.z - a.z);

      proj.forEach((p) => {
        if (p.nd.ring !== 0) return;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.X, p.Y);
        ctx.strokeStyle = `rgba(34,211,238,${0.1 + 0.2 * p.d})`;
        ctx.stroke();
      });

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 34);
      g.addColorStop(0, "rgba(246,193,119,.95)");
      g.addColorStop(0.35, "rgba(246,193,119,.5)");
      g.addColorStop(1, "rgba(246,193,119,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#f6c177";
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, 7);
      ctx.fill();

      const sel = selRef.current;
      proj.forEach((p) => {
        const nd = p.nd;
        const r = nd.size * p.sc * (W < 460 ? 0.8 : 1);
        const gg = ctx.createRadialGradient(p.X, p.Y, 0, p.X, p.Y, r * 2.6);
        gg.addColorStop(0, nd.col);
        gg.addColorStop(0.4, `${nd.col}66`);
        gg.addColorStop(1, `${nd.col}00`);
        ctx.globalAlpha = 0.35 + 0.65 * p.d;
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(p.X, p.Y, r * 2.6, 0, 7);
        ctx.fill();
        ctx.fillStyle = nd.col;
        ctx.beginPath();
        ctx.arc(p.X, p.Y, r, 0, 7);
        ctx.fill();
        const on = sel !== null && sel.name === nd.name && sel.i === nd.i;
        if (on) {
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.X, p.Y, r + 5, 0, 7);
          ctx.stroke();
          ctx.lineWidth = 1;
        }
        if (nd.label || on) {
          ctx.globalAlpha = Math.max(0.35, 0.3 + 0.7 * p.d);
          ctx.fillStyle = "#e9f1f6";
          ctx.font = `500 ${W < 460 ? 11 : 12}px "JetBrains Mono", ui-monospace, monospace`;
          ctx.textAlign = "center";
          ctx.fillText(nd.name, p.X, p.Y - r - 8);
        }
        ctx.globalAlpha = 1;
      });
    };

    const loop = (ms: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(ms / 1000);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible) kick();
    });
    io.observe(cv);
    const ro = new ResizeObserver(() => {
      size();
      kick();
    });
    ro.observe(cv);
    const onVis = () => kick();
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = cv.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
    };
    const onClick = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      let best: Proj | null = null;
      let bd = 1e9;
      proj.forEach((p) => {
        const d = Math.hypot(p.X - mx, p.Y - my);
        if (d < bd) {
          bd = d;
          best = p;
        }
      });
      const hit = best as Proj | null;
      if (hit && bd < 30) {
        selRef.current = hit.nd;
        setReadout({ name: hit.nd.name, info: hit.nd.info });
      } else {
        selRef.current = null;
        setReadout({ info: HINT });
      }
      kick();
      if (reduced) draw(performance.now() / 1000);
    };
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("click", onClick);

    size();
    if (reduced) draw(0);
    else kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <figure className="m-0">
      <canvas
        ref={ref}
        className="block w-full cursor-pointer"
        style={{ touchAction: "pan-y" }}
        role="img"
        aria-label="A rotating 3D map of one platform: products on the inner ring, AI agents in the middle ring, infrastructure on the outer ring."
      />
      <figcaption className="min-h-[2.5rem] px-1 font-mono text-[12px] text-mist" aria-live="polite">
        {readout.name ? <b className="font-medium text-cy">{readout.name}</b> : null}
        {readout.name ? " · " : ""}
        {readout.info}
      </figcaption>
    </figure>
  );
}
