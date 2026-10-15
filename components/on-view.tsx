"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Adds a class once, the first time the element is at least half visible (rings, charts). */
export default function OnView({ className = "", add = "go", threshold = 0.5, children }: { className?: string; add?: string; threshold?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add(add);
      return;
    }
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        el.classList.add(add);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [add, threshold]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
