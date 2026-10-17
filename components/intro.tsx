"use client";

import { useEffect, useRef } from "react";

/** The prompt mark draws itself, the name settles in, a cyan curtain lifts (about 1.6 s, no fake progress). Home page only, once per session (see the head script). Tap, click or any key skips it. */
export default function Intro() {
  const ld = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ld.current;
    if (!el || !root.classList.contains("ld-on")) return;
    try {
      sessionStorage.setItem("ax-seen", "1");
    } catch {
      /* storage blocked */
    }
    let timer = 0;
    let done = false;
    const finish = (fast: boolean) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      el.classList.add(fast ? "out" : "go");
      timer = window.setTimeout(() => {
        el.classList.add("gone");
        root.classList.remove("ld-on");
      }, fast ? 280 : 750);
    };
    timer = window.setTimeout(() => finish(false), 900);
    const skip = () => finish(true);
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <div className="ld" id="ld" ref={ld} aria-hidden="true">
      <div className="ld-c" />
      <div className="ld-in">
        <svg viewBox="0 0 64 64">
          <rect className="tile" width="64" height="64" rx="15" />
          <path pathLength={1} d="M20 20.5L34 32L20 43.5" />
          <path pathLength={1} className="cur" d="M39 46H50" />
        </svg>
        <div className="ld-t">Jeremia Axelano</div>
        <div className="ld-s">CTO · Bali</div>
      </div>
    </div>
  );
}
