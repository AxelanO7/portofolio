"use client";

import { useEffect, useRef } from "react";

/** Monogram draws, 000 to 100 counts, a cyan curtain lifts (about 2 s). Home page only, once per session (see the head script). Tap, click or any key skips it. */
export default function Intro() {
  const ld = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ld.current;
    const n = num.current;
    if (!el || !n || !root.classList.contains("ld-on")) return;
    try {
      sessionStorage.setItem("ax-seen", "1");
    } catch {
      /* storage blocked */
    }
    let raf = 0;
    let timer = 0;
    let done = false;
    const finish = (fast: boolean) => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      el.classList.add(fast ? "out" : "go");
      timer = window.setTimeout(() => {
        el.classList.add("gone");
        root.classList.remove("ld-on");
      }, fast ? 280 : 950);
    };
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      n.textContent = String(Math.round(100 * (1 - Math.pow(1 - p, 3)))).padStart(3, "0");
      if (p < 1) raf = requestAnimationFrame(step);
      else finish(false);
    };
    raf = requestAnimationFrame(step);
    const skip = () => finish(true);
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <div className="ld" id="ld" ref={ld} aria-hidden="true">
      <div className="ld-c" />
      <div className="ld-in">
        <svg viewBox="0 0 150 110">
          <path pathLength={1} d="M46 12 V66 Q46 92 20 88" />
          <path pathLength={1} d="M72 92 L98 12 L124 92 M81 64 H115" />
        </svg>
        <div className="ld-n" ref={num}>
          000
        </div>
      </div>
    </div>
  );
}
