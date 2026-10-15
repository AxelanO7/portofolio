"use client";

import { useEffect, useRef } from "react";

type Vec = [number, number, number];
const D = Math.PI / 180;
const BALI = { n: "Bali", s: "live", lon: 115.2, lat: -8.65 };
const VEGAS = { n: "Las Vegas", s: "Oct 2026", lon: -115.14, lat: 36.17 };
const CYCLE = 16000;

const vec = (lon: number, lat: number): Vec => {
  const a = lon * D, b = lat * D;
  return [Math.cos(b) * Math.sin(a), Math.sin(b), Math.cos(b) * Math.cos(a)];
};
const rot = (p: Vec, l: number, t: number): Vec => {
  const cl = Math.cos(l), sl = Math.sin(l);
  const X = p[0] * cl - p[2] * sl, Z = p[0] * sl + p[2] * cl;
  const cp = Math.cos(t), sp = Math.sin(t);
  return [X, p[1] * cp - Z * sp, p[1] * sp + Z * cp];
};
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Direction of the sun for the current UTC time, so the night side is real. */
function sun(): Vec {
  const d = new Date();
  const doy = (Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5;
  const dec = -23.44 * Math.cos((2 * Math.PI * (doy + 10)) / 365);
  const h = d.getUTCHours() + d.getUTCMinutes() / 60;
  return vec(-(h - 12) * 15, dec);
}

/**
 * Dotted globe on a 2D canvas (no WebGL). It swings between Bali and Las Vegas along a lit arc, shades the
 * night side from the real sun, and can be turned by dragging. Time based, paused off screen.
 */
export default function Globe() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    const holder = box.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !holder || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alive = true;
    let running = false;
    let raf = 0;
    const off: Array<() => void> = [];

    import("@/lib/geo-dots").then(({ GEO_ROWS }) => {
      if (!alive) return;
      const dots: Vec[] = [];
      GEO_ROWS.forEach(([lat, lons]) => lons.forEach((l) => dots.push(vec(l / 10, lat))));
      const vb = vec(BALI.lon, BALI.lat), vv = vec(VEGAS.lon, VEGAS.lat);
      const om = Math.acos(vb[0] * vv[0] + vb[1] * vv[1] + vb[2] * vv[2]);
      const arc = (t: number, h: number): Vec => {
        const a = Math.sin((1 - t) * om) / Math.sin(om), b = Math.sin(t * om) / Math.sin(om), r = 1 + h * Math.sin(Math.PI * t);
        return [(a * vb[0] + b * vv[0]) * r, (a * vb[1] + b * vv[1]) * r, (a * vb[2] + b * vv[2]) * r];
      };
      const SUN = sun();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      let W = 0, H = 0, R = 0;
      const size = () => {
        const r = canvas.getBoundingClientRect();
        W = r.width || 300;
        H = r.height || 300;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        R = Math.min(W, H) * 0.4;
      };
      size();
      window.addEventListener("resize", size);
      off.push(() => window.removeEventListener("resize", size));

      const tilt = 20 * D;
      let l0 = BALI.lon * D;
      let t0 = performance.now();
      let manual = false, idle = 0, drag: { x: number; l: number } | null = null;
      const target = (ms: number) => {
        const t = (ms % CYCLE) / CYCLE, a = BALI.lon * D, b = (VEGAS.lon + 360) * D;
        if (t < 0.22) return a;
        if (t < 0.5) return a + (b - a) * ease((t - 0.22) / 0.28);
        if (t < 0.72) return b;
        return b + (a - b) * ease((t - 0.72) / 0.28);
      };

      const frame = (now: number) => {
        const ms = now - t0;
        if (!manual && !reduce) l0 = target(ms);
        else if (manual && now - idle > 4500) {
          manual = false;
          t0 = now - (l0 / D > 180 ? CYCLE * 0.5 : 0);
        }
        const cx = W / 2, cy = H / 2;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        const g = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.32);
        g.addColorStop(0, "rgba(70,170,210,.26)");
        g.addColorStop(1, "rgba(70,170,210,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.32, 0, 7);
        ctx.fill();
        const g2 = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
        g2.addColorStop(0, "#14405a");
        g2.addColorStop(1, "#061018");
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 7);
        ctx.fill();
        ctx.strokeStyle = "rgba(150,210,230,.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 7);
        ctx.stroke();
        /* graticule */
        ctx.strokeStyle = "rgba(150,210,230,.09)";
        for (let gl = 0; gl < 360; gl += 30) {
          ctx.beginPath();
          let pen = false;
          for (let ga = -90; ga <= 90; ga += 6) {
            const q = rot(vec(gl, ga), l0, tilt);
            if (q[2] <= 0) { pen = false; continue; }
            if (pen) ctx.lineTo(cx + q[0] * R, cy - q[1] * R); else ctx.moveTo(cx + q[0] * R, cy - q[1] * R);
            pen = true;
          }
          ctx.stroke();
        }
        for (let ga = -60; ga <= 60; ga += 30) {
          ctx.beginPath();
          let pen = false;
          for (let gl = 0; gl <= 360; gl += 6) {
            const q = rot(vec(gl, ga), l0, tilt);
            if (q[2] <= 0) { pen = false; continue; }
            if (pen) ctx.lineTo(cx + q[0] * R, cy - q[1] * R); else ctx.moveTo(cx + q[0] * R, cy - q[1] * R);
            pen = true;
          }
          ctx.stroke();
        }
        /* land dots, day and night side, three depth buckets each */
        const B: number[][] = [[], [], [], [], [], []];
        for (const d of dots) {
          const p = rot(d, l0, tilt);
          if (p[2] <= 0) continue;
          const day = d[0] * SUN[0] + d[1] * SUN[1] + d[2] * SUN[2];
          B[(day > 0.06 ? 0 : 3) + (p[2] > 0.6 ? 2 : p[2] > 0.3 ? 1 : 0)].push(cx + p[0] * R, cy - p[1] * R);
        }
        const AL = [0.4, 0.68, 1, 0.22, 0.4, 0.6];
        const sz = Math.max(1.7, R / 180);
        B.forEach((a, k) => {
          ctx.fillStyle = `rgba(165,222,238,${AL[k]})`;
          for (let j = 0; j < a.length; j += 2) ctx.fillRect(a[j] - sz / 2, a[j + 1] - sz / 2, sz, sz);
        });
        /* the arc with a travelling light */
        const lit = (ms % 3600) / 3600;
        for (let s = 0; s < 70; s++) {
          const t1 = s / 70, t2 = (s + 1) / 70;
          const q1 = rot(arc(t1, 0.2), l0, tilt), q2 = rot(arc(t2, 0.2), l0, tilt);
          const vis = (q1[2] > 0.02 || q1[0] * q1[0] + q1[1] * q1[1] > 1.02) && (q2[2] > 0.02 || q2[0] * q2[0] + q2[1] * q2[1] > 1.02);
          if (!vis) continue;
          const near = Math.max(0, 1 - Math.abs(t2 - lit) * 7);
          ctx.strokeStyle = `rgba(255,${120 + near * 110 | 0},${74 + near * 70 | 0},${0.38 + near * 0.62})`;
          ctx.lineWidth = 1.4 + near * 2.4;
          ctx.beginPath();
          ctx.moveTo(cx + q1[0] * R, cy - q1[1] * R);
          ctx.lineTo(cx + q2[0] * R, cy - q2[1] * R);
          ctx.stroke();
        }
        /* the two cities */
        [BALI, VEGAS].forEach((c, ci) => {
          const q = rot(vec(c.lon, c.lat), l0, tilt);
          if (q[2] < 0.05) return;
          const x = cx + q[0] * R, y = cy - q[1] * R, ph = ((ms + ci * 900) % 2200) / 2200;
          ctx.strokeStyle = `rgba(233,194,125,${(1 - ph) * 0.85})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 4 + ph * 18, 0, 7);
          ctx.stroke();
          ctx.fillStyle = "#e9c27d";
          ctx.beginPath();
          ctx.arc(x, y, 4.2, 0, 7);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, 7);
          ctx.fill();
          const fs = Math.max(11, R / 32);
          ctx.font = `500 ${fs}px "JetBrains Mono",monospace`;
          const txt = `${c.n} · ${c.s}`;
          const tw = ctx.measureText(txt).width, bx = x + 14, by = y - fs * 2.2;
          ctx.strokeStyle = "rgba(233,194,125,.6)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x + 3, y - 3);
          ctx.lineTo(bx, by + fs * 0.9);
          ctx.stroke();
          ctx.fillStyle = "rgba(5,15,22,.92)";
          ctx.fillRect(bx, by - fs * 0.5, tw + 16, fs * 1.9);
          ctx.strokeStyle = "rgba(233,194,125,.5)";
          ctx.strokeRect(bx + 0.5, by - fs * 0.5 + 0.5, tw + 15, fs * 1.9 - 1);
          ctx.fillStyle = "#fbe3b0";
          ctx.fillText(txt, bx + 8, by + fs * 0.82);
        });
      };

      const loop = (now: number) => {
        if (running) frame(now);
        raf = requestAnimationFrame(loop);
      };
      if (reduce) frame(performance.now());
      else raf = requestAnimationFrame(loop);

      const io = "IntersectionObserver" in window
        ? new IntersectionObserver((es) => {
            running = es[0].isIntersecting && !document.hidden;
            if (running && reduce) frame(performance.now());
          })
        : null;
      if (io) io.observe(holder); else running = true;
      off.push(() => io?.disconnect());
      const vis = () => { if (document.hidden) running = false; };
      document.addEventListener("visibilitychange", vis);
      off.push(() => document.removeEventListener("visibilitychange", vis));

      /* drag to turn (horizontal only, vertical swipes keep scrolling the page) */
      const down = (e: PointerEvent) => {
        drag = { x: e.clientX, l: l0 };
        manual = true;
        holder.style.cursor = "grabbing";
        try { holder.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
      };
      const move = (e: PointerEvent) => {
        if (!drag) return;
        l0 = drag.l - (e.clientX - drag.x) * 0.0075;
        idle = performance.now();
        if (reduce) frame(performance.now());
      };
      const up = () => {
        drag = null;
        idle = performance.now();
        holder.style.cursor = "grab";
      };
      holder.addEventListener("pointerdown", down);
      holder.addEventListener("pointermove", move);
      holder.addEventListener("pointerup", up);
      holder.addEventListener("pointercancel", up);
      off.push(() => {
        holder.removeEventListener("pointerdown", down);
        holder.removeEventListener("pointermove", move);
        holder.removeEventListener("pointerup", up);
        holder.removeEventListener("pointercancel", up);
      });
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      off.forEach((f) => f());
    };
  }, []);

  return (
    <div className="at-globe" ref={box} data-cur="Drag">
      <canvas ref={cv} aria-label="Dotted globe with an arc from Bali to Las Vegas" />
      <span className="hint">drag to turn the globe · night side from the real sun</span>
    </div>
  );
}
