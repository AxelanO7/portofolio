"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Renders its children only once the placeholder is near the viewport. Meant for decorative or duplicated
 * blocks (marquee rows, the wall of screens) so they add nothing to the first style, layout and paint.
 * Give the wrapper a fixed size in CSS (or minHeight) so nothing shifts when the content arrives.
 */
export default function LazyMount({ children, className, style, margin = "700px 0px" }: { children: ReactNode; className?: string; style?: CSSProperties; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || on) return;
    if (!("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [on, margin]);

  return (
    <div ref={ref} className={className} style={style}>
      {on ? children : null}
    </div>
  );
}
