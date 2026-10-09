"use client";

import { useEffect, useRef, useState } from "react";
import { ARSENAL, TOOL_COUNT } from "@/config/arsenal";
import { useI18n } from "@/lib/i18n";

/**
 * One map of the whole build. Inner rings: products, AI agents and platform services
 * (labelled). Outer rings: every tool in the arsenal, one dot per tool, grouped in an
 * arc per stack and coloured by stack. Plain canvas 2D with a hand-rolled perspective
 * projection (no WebGL, no scroll-linked motion). The loop is time-based and stops
 * when off screen, hidden or reduced-motion.
 */

type Group = "product" | "agent" | "platform" | "tool";

interface Node {
  group: Group;
  stack: number; // arsenal index for tools, -1 otherwise
  name: string;
  info: string;
  r: number;
  a0: number; // base angle
  spd: number;
  col: string;
  size: number;
  y: number;
  alt: boolean; // label below the dot instead of above, to spread dense arcs
}

const CORE: { group: Group; r: number; spd: number; col: string; size: number; items: [string, string][] }[] = [
  {
    group: "product", r: 1.0, spd: 0.22, col: "#22d3ee", size: 8,
    items: [
      ["Web", "Guestlist Ticket web · live"],
      ["Mobile", "Consumer app, iOS and Android · in build"],
      ["Partner app", "Offline QR check-in for venues · in build"],
      ["Link hub", "Link-in-bio with campaign tags · live"],
      ["Back office", "About 65 admin screens · internal"],
    ],
  },
  {
    group: "agent", r: 1.55, spd: -0.15, col: "#f472b6", size: 6.5,
    items: [
      ["Event data agent", "Finds and inserts event data"],
      ["Testing agent", "Runs regression checks"],
      ["Alert agent", "Watches errors and pings the team"],
      ["Automation", "Scheduled jobs and imports"],
      ["Support agent", "Answers guests on WhatsApp · in build"],
    ],
  },
  {
    group: "platform", r: 2.05, spd: 0.09, col: "#8aa0b2", size: 5.5,
    items: [
      ["API gateway", "One entry point for every client"],
      ["Database", "PostgreSQL, restore-tested backups"],
      ["CI/CD", "Build and deploy pipeline"],
      ["Observability", "Logs, metrics and alerts"],
      ["LLM gateway", "One place for model keys and limits"],
    ],
  },
];

const TOOL_RINGS = [2.75, 3.3, 3.85];
const TOOL_SPD = 0.035;
const RING_RADII = [1.0, 1.55, 2.05, ...TOOL_RINGS];
const MAX_R = TOOL_RINGS[TOOL_RINGS.length - 1];
const HINT = "Center: the Guestlist platform. Inner rings are what I built, outer rings are the tools. Tap a dot.";

const NODES: Node[] = [];
CORE.forEach((rg, ri) =>
  rg.items.forEach((it, i) =>
    NODES.push({
      group: rg.group, stack: -1, name: it[0], info: it[1], r: rg.r, spd: rg.spd, col: rg.col, size: rg.size,
      a0: (i / rg.items.length) * Math.PI * 2 + ri * 0.6, y: Math.sin(i * 2.1 + ri) * 0.15, alt: false,
    })
  )
);
(() => {
  let k = 0;
  ARSENAL.forEach((s, si) => {
    const arc = (Math.PI * 2 * s.tools.length) / TOOL_COUNT;
    const start = (Math.PI * 2 * k) / TOOL_COUNT;
    s.tools.forEach((tool, j) => {
      const ring = j % TOOL_RINGS.length;
      NODES.push({
        group: "tool", stack: si, name: tool, info: `${s.name} · one of ${s.tools.length}`, r: TOOL_RINGS[ring], spd: TOOL_SPD,
        col: s.color, size: 3.4, a0: start + arc * ((j + 0.5) / s.tools.length), y: Math.sin(k * 1.9 + j) * 0.2, alt: j % 2 === 1,
      });
    });
    k += s.tools.length;
  });
})();

interface Proj { nd: Node; X: number; Y: number; z: number; sc: number; d: number }

export default function SystemMap() {
  const { t } = useI18n();
  const ref = useRef<HTMLCanvasElement>(null);
  const [readout, setReadout] = useState<{ name?: string; info: string }>({ info: HINT });
  const [focus, setFocus] = useState<number | null>(null);
  const selRef = useRef<Node | null>(null);
  const focusRef = useRef<number | null>(null);
  const kickRef = useRef<() => void>(() => {});
  focusRef.current = focus;

  useEffect(() => {
    kickRef.current();
  }, [focus]);

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
    let lastT = 0;
    let proj: Proj[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiltBase = 1.0;

    const size = () => {
      const r = cv.getBoundingClientRect();
      W = Math.max(240, r.width);
      H = Math.round(W * 0.86);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      lastT = t;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const S = Math.min(W / 9.4, H / 9.8);
      const phi = tiltBase + py * 0.12;
      const f = 9;
      const fo = focusRef.current;

      RING_RADII.forEach((r, ri) => {
        ctx.beginPath();
        for (let a = 0; a <= 72; a++) {
          const th = (a / 72) * Math.PI * 2;
          const x = r * Math.cos(th);
          const z = r * Math.sin(th);
          const sc = f / (f + z * Math.cos(phi));
          const X = cx + (x + px * 0.2) * sc * S;
          const Y = cy - z * Math.sin(phi) * sc * S;
          if (a) ctx.lineTo(X, Y);
          else ctx.moveTo(X, Y);
        }
        ctx.strokeStyle = ri < 3 ? "rgba(138,160,178,.22)" : "rgba(138,160,178,.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      proj = NODES.map((nd) => {
        const th = nd.a0 + t * nd.spd + px * 0.25;
        const x = nd.r * Math.cos(th);
        const z = nd.r * Math.sin(th);
        const yy = nd.y * Math.cos(phi) - z * Math.sin(phi);
        const zz = nd.y * Math.sin(phi) + z * Math.cos(phi);
        const sc = f / (f + zz);
        return { nd, X: cx + x * sc * S, Y: cy + yy * sc * S, z: zz, sc, d: 1 - (zz + nd.r) / (2 * nd.r) };
      }).sort((a, b) => b.z - a.z);

      proj.forEach((p) => {
        if (p.nd.group !== "product") return;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.X, p.Y);
        ctx.strokeStyle = `rgba(34,211,238,${0.1 + 0.2 * p.d})`;
        ctx.stroke();
      });

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      g.addColorStop(0, "rgba(246,193,119,.95)");
      g.addColorStop(0.35, "rgba(246,193,119,.5)");
      g.addColorStop(1, "rgba(246,193,119,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#f6c177";
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, 7);
      ctx.fill();

      const sel = selRef.current;
      const labelFont = `500 ${W < 460 ? 9.5 : 12}px "JetBrains Mono", ui-monospace, monospace`;
      proj.forEach((p) => {
        const nd = p.nd;
        const isTool = nd.group === "tool";
        const inFocus = fo !== null && nd.stack === fo;
        const on = sel === nd;
        let dim = 0.35 + 0.65 * p.d;
        if (fo !== null) dim *= isTool ? (inFocus ? 1 : 0.12) : 0.4;
        const r = nd.size * p.sc * (W < 460 ? (isTool ? 0.85 : 0.8) : 1) * (inFocus ? 1.35 : 1);
        ctx.globalAlpha = dim;
        if (!isTool || inFocus || on) {
          const gg = ctx.createRadialGradient(p.X, p.Y, 0, p.X, p.Y, r * 2.6);
          gg.addColorStop(0, nd.col);
          gg.addColorStop(0.4, `${nd.col}66`);
          gg.addColorStop(1, `${nd.col}00`);
          ctx.fillStyle = gg;
          ctx.beginPath();
          ctx.arc(p.X, p.Y, r * 2.6, 0, 7);
          ctx.fill();
        }
        ctx.fillStyle = nd.col;
        ctx.beginPath();
        ctx.arc(p.X, p.Y, r, 0, 7);
        ctx.fill();
        if (on) {
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.X, p.Y, r + 5, 0, 7);
          ctx.stroke();
          ctx.lineWidth = 1;
        }
        if ((nd.group === "product" && fo === null) || inFocus || on) {
          ctx.globalAlpha = Math.max(0.4, 0.3 + 0.7 * p.d);
          ctx.fillStyle = "#e9f1f6";
          ctx.font = labelFont;
          ctx.textAlign = "center";
          ctx.fillText(nd.name, p.X, nd.alt ? p.Y + r + 14 : p.Y - r - 7);
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
      if (reduced) {
        if (visible) draw(lastT);
        return;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    kickRef.current = kick;

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
        const d = Math.hypot(p.X - mx, p.Y - my) - (p.nd.group === "tool" ? 0 : 6);
        if (d < bd) {
          bd = d;
          best = p;
        }
      });
      const hit = best as Proj | null;
      if (hit && bd < 20) {
        selRef.current = hit.nd;
        setReadout({ name: hit.nd.name, info: hit.nd.info });
      } else {
        selRef.current = null;
        setReadout({ info: HINT });
      }
      kick();
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

  const pick = (k: number | null) => {
    selRef.current = null;
    setFocus(k);
    setReadout(k === null ? { info: HINT } : { name: ARSENAL[k].name, info: ARSENAL[k].tools.join(" · ") });
  };

  return (
    <figure className="m-0 min-w-0">
      <canvas
        ref={ref}
        className="block w-full cursor-pointer"
        style={{ touchAction: "pan-y" }}
        role="img"
        aria-label={`A rotating 3D map: products, AI agents and platform services on the inner rings, ${TOOL_COUNT} tools on the outer rings grouped by stack.`}
      />
      <figcaption className="min-h-[3.2rem] px-1 font-mono text-[12px] leading-snug text-mist" aria-live="polite">
        {readout.name ? <b className="font-medium text-cy">{readout.name}</b> : null}
        {readout.name ? " · " : ""}
        {readout.info}
      </figcaption>
      <div className="legend mt-3 pb-1" role="group" aria-label="Isolate a stack">
        <button type="button" className="chip" aria-pressed={focus === null} onClick={() => pick(null)}>
          {t("stack_all")} · {TOOL_COUNT}
        </button>
        {ARSENAL.map((s, k) => (
          <button key={s.name} type="button" className="chip" aria-pressed={focus === k} onClick={() => pick(focus === k ? null : k)}>
            <i style={{ background: s.color }} />
            {s.name} · {s.tools.length}
          </button>
        ))}
      </div>
    </figure>
  );
}
