"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GLYPHS = "!<>-_\\/[]{}=+*^?#";
const fmt = (v: number) => Math.round(v).toLocaleString("en-US");

/**
 * Page-wide behaviour that needs no markup of its own: reveal on view (once), count-up numbers,
 * pausing animation for sections that are off screen, pointer spotlight and tilt on desktop, and
 * the decode effect on small labels. Everything is time based or one-shot, nothing follows scroll.
 */
export default function FxRoot() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __axReady?: boolean }).__axReady = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const hasIO = "IntersectionObserver" in window;
    const off: Array<() => void> = [];
    const all = <T extends HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));

    /* reveal once */
    const rio = hasIO && !reduce
      ? new IntersectionObserver(
          (es) => es.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("in");
              rio?.unobserve(e.target);
            }
          }),
          { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
        )
      : null;
    all(".rv").forEach((el) => (rio ? rio.observe(el) : el.classList.add("in")));
    off.push(() => rio?.disconnect());

    /* count up once. The server markup already holds the final number. */
    const cio = hasIO && !reduce
      ? new IntersectionObserver(
          (es) => es.forEach((e) => {
            if (!e.isIntersecting) return;
            cio?.unobserve(e.target);
            const el = e.target as HTMLElement;
            const to = parseFloat(el.dataset.count || "0");
            const suf = el.dataset.suffix || "";
            const t0 = performance.now();
            const step = (t: number) => {
              const p = Math.min(1, (t - t0) / 1500);
              el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))) + suf;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }),
          { threshold: 0.4 }
        )
      : null;
    all("[data-count]").forEach((el) => {
      if (!cio) return;
      el.textContent = "0" + (el.dataset.suffix || "");
      cio.observe(el);
    });
    off.push(() => cio?.disconnect());

    /* pause looping animation while a section is off screen */
    const vio = hasIO
      ? new IntersectionObserver((es) => es.forEach((e) => e.target.setAttribute("data-vis", e.isIntersecting ? "1" : "0")), { rootMargin: "120px" })
      : null;
    all("[data-pausable]").forEach((el) => vio?.observe(el));
    off.push(() => vio?.disconnect());

    /* desktop pointer effects */
    if (fine) {
      all("[data-spot]").forEach((el) => {
        const mv = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        el.addEventListener("pointermove", mv);
        off.push(() => el.removeEventListener("pointermove", mv));
      });
      all("[data-tilt]").forEach((el) => {
        let raf = 0;
        const mv = (e: PointerEvent) => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            el.style.setProperty("--ry", x.toFixed(3));
            el.style.setProperty("--rx", y.toFixed(3));
            el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
            el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
          });
        };
        const lv = () => {
          el.style.setProperty("--ry", "0");
          el.style.setProperty("--rx", "0");
        };
        el.addEventListener("pointermove", mv);
        el.addEventListener("pointerleave", lv);
        off.push(() => {
          el.removeEventListener("pointermove", mv);
          el.removeEventListener("pointerleave", lv);
        });
      });
    }

    /* decode effect on small labels, once, when they come into view */
    if (hasIO && !reduce) {
      const sio = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (!e.isIntersecting) return;
          sio.unobserve(e.target);
          const el = e.target as HTMLElement;
          const text = el.textContent || "";
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / 900);
            const k = Math.floor(p * text.length);
            let out = "";
            for (let i = 0; i < text.length; i++) out += i < k || text[i] === " " ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            el.textContent = p < 1 ? out : text;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }),
        { threshold: 0.8 }
      );
      all(".eyebrow, .dec").forEach((el) => sio.observe(el));
      off.push(() => sio.disconnect());
    }

    return () => off.forEach((f) => f());
  }, [pathname]);

  return null;
}
