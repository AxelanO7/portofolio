"use client";

import { useEffect, useRef } from "react";
import { BrowserFrame, PhoneFrame, StatusPill } from "@/components/ui";
import { SURFACES, type Surface } from "@/config/site";
import { STILL_EV, isStill } from "@/lib/motion";

function Slide({ s }: { s: Surface }) {
  switch (s.kind) {
    case "fan":
      return (
        <div className="sg-fan" tabIndex={0} role="button" aria-pressed="false" aria-label={`${s.name}: spread or gather the screens`} data-fan>
          {s.imgs!.map((img, i) => (
            <PhoneFrame key={i} img={img} sd={0.6 + i * 1.4} alt={`${s.name} screen ${i + 1}`} />
          ))}
        </div>
      );
    case "phones":
      return (
        <div className="sg-row">
          {s.imgs!.map((img, i) => (
            <PhoneFrame key={i} img={img} width={196} sd={0.6 + i * 1.4} alt={`${s.name} screen ${i + 1}`} />
          ))}
        </div>
      );
    case "laptop":
      return (
        <div className="lap">
          <div className="lid">
            <img src={s.img!.src} width={s.img!.w} height={s.img!.h} alt={`${s.name} screenshot`} loading="lazy" decoding="async" />
          </div>
          <div className="base" />
        </div>
      );
    case "phone":
      return (
        <div className="sg-flt">
          <PhoneFrame img={s.img!} width={230} sd={0.6} alt={`${s.name} screen`} />
        </div>
      );
    default:
      return <BrowserFrame img={s.img!} url={s.url!} alt={`${s.name} screenshot`} />;
  }
}

/** Six surfaces of one platform. Cycles on a timer, pauses on hover or focus and while off screen; tap a tab to pick. */
export default function PlatformSection() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const tabs = Array.from(root.querySelectorAll<HTMLElement>(".sg-tab"));
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".sg-slide"));
    const MS = 5500;
    /* picked: once the visitor chooses a tab the rotation stops for good (it also stops with reduced motion or the page switch) */
    let cur = 0, timer = 0, visible = false, picked = false;
    const go = (i: number) => {
      cur = i;
      tabs.forEach((t, k) => {
        t.setAttribute("aria-selected", String(k === i));
        t.tabIndex = k === i ? 0 : -1;
        t.style.setProperty("--ms", picked ? "0ms" : `${MS}ms`);
      });
      slides.forEach((s, k) => {
        s.classList.toggle("on", k === i);
        s.toggleAttribute("inert", k !== i);
      });
      clearTimeout(timer);
      if (!picked && visible && !isStill()) timer = window.setTimeout(() => { if (!root.classList.contains("hold")) go((cur + 1) % tabs.length); }, MS);
    };
    const pick = (i: number) => {
      picked = true;
      go(i);
    };
    const clicks = tabs.map((t, i) => {
      const f = () => pick(i);
      const key = (e: KeyboardEvent) => {
        const n = tabs.length;
        const to = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
        if (to < 0) return;
        e.preventDefault();
        pick(to);
        tabs[to].focus();
      };
      t.addEventListener("click", f);
      t.addEventListener("keydown", key);
      return () => {
        t.removeEventListener("click", f);
        t.removeEventListener("keydown", key);
      };
    });
    const hold = () => { root.classList.add("hold"); clearTimeout(timer); };
    const release = () => { root.classList.remove("hold"); go(cur); };
    ["mouseenter", "focusin"].forEach((e) => root.addEventListener(e, hold));
    ["mouseleave", "focusout"].forEach((e) => root.addEventListener(e, release));
    const fan = root.querySelector<HTMLElement>("[data-fan]");
    const toggleFan = () => fan?.setAttribute("aria-pressed", String(fan.classList.toggle("on")));
    const fanKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      toggleFan();
    };
    fan?.addEventListener("click", toggleFan);
    fan?.addEventListener("keydown", fanKey);
    const onStill = () => go(cur);
    window.addEventListener(STILL_EV, onStill);
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((es) => {
          visible = es[0].isIntersecting;
          if (visible) go(cur);
          else clearTimeout(timer);
        }, { threshold: 0.2 })
      : null;
    io?.observe(root);
    go(0);
    return () => {
      clearTimeout(timer);
      io?.disconnect();
      clicks.forEach((f) => f());
      ["mouseenter", "focusin"].forEach((e) => root.removeEventListener(e, hold));
      ["mouseleave", "focusout"].forEach((e) => root.removeEventListener(e, release));
      fan?.removeEventListener("click", toggleFan);
      fan?.removeEventListener("keydown", fanKey);
      window.removeEventListener(STILL_EV, onStill);
    };
  }, []);

  return (
    <section lang="en" className="sec" id="platform" data-pausable style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">One platform, six surfaces</span>
            <h2 className="t">Everything a night out touches.</h2>
          </div>
          <p>Consumer web and app, the partner app at the door, a link hub, the landing page and the back office that keeps it running. I build and ship all of it.</p>
        </div>
        <div className="sg" ref={stage}>
          <div className="sg-tabs" role="tablist" aria-label="Surfaces of the platform">
            {SURFACES.map((s, i) => (
              <button key={s.id} type="button" role="tab" className="sg-tab" id={`sg-tab-${s.id}`} aria-controls={`sg-panel-${s.id}`} aria-selected={i === 0} tabIndex={i === 0 ? 0 : -1}>
                <h3>
                  {s.name} <StatusPill status={s.status} label={s.statusLabel} />
                </h3>
                <p>{s.text}</p>
                <span className="bar" />
              </button>
            ))}
          </div>
          <div className="sg-view" data-cur="Browse">
            {SURFACES.map((s, i) => (
              <div key={s.id} className={`sg-slide${i === 0 ? " on" : ""}`} id={`sg-panel-${s.id}`} role="tabpanel" aria-labelledby={`sg-tab-${s.id}`}>
                <Slide s={s} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
