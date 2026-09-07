"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/**
 * Scroll to an element/selector through Lenis (not native scrollIntoView) —
 * mixing native smooth-scroll with Lenis's RAF-driven scrollTop makes the
 * two fight each other and the page stutters/sticks. Falls back to a plain
 * jump if Lenis hasn't mounted yet (e.g. reduced-motion, where we skip it).
 */
export function scrollToTarget(target: string | HTMLElement) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.1 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ block: "start" });
}

/**
 * Global smooth-scroll. Lenis still drives the real `window.scrollY` + fires
 * native scroll events each frame, so existing scroll listeners (e.g. the
 * hero's 3D scroll-progress tracking) keep working unmodified.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
