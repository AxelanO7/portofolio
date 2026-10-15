"use client";

import { useEffect, useRef } from "react";

/** A dot that swells into a labelled circle over elements with data-cur="Label". Desktop pointers only. */
export default function CursorLabel() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cl = dot.current;
    const lab = label.current;
    if (!fine || reduce || !cl || !lab) return;
    let x = 0, y = 0, tx = 0, ty = 0, active = false, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      cl.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = active ? requestAnimationFrame(tick) : 0;
    };
    const stop = () => {
      active = false;
      cl.classList.remove("on", "big");
    };
    const move = (e: PointerEvent) => {
      const z = (e.target as HTMLElement | null)?.closest?.("[data-cur]") as HTMLElement | null;
      if (z) {
        tx = e.clientX;
        ty = e.clientY;
        if (!active) {
          x = tx;
          y = ty;
          active = true;
          cl.classList.add("on");
        }
        lab.textContent = z.dataset.cur || "";
        cl.classList.add("big");
        if (!raf) raf = requestAnimationFrame(tick);
      } else if (active) stop();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", stop);
    window.addEventListener("scroll", stop, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", stop);
      window.removeEventListener("scroll", stop);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cl" ref={dot} aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
