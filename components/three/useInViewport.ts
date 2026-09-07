"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is on-screen. Used to pause WebGL render loops
 * (`frameloop="never"`) when a 3D scene scrolls out of view — without this,
 * every <Canvas> keeps rendering at 60fps forever, and two simultaneous
 * scenes fighting Lenis's RAF loop for the main thread is what causes janky
 * / "stuck" scrolling.
 */
export function useInViewport<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true); // default true: don't punish first paint

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
