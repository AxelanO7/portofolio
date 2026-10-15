"use client";

import { useEffect, useRef } from "react";
import { TESTIMONIALS } from "@/config/cases";
import { TIMELINE } from "@/config/site";
import { useI18n } from "@/lib/i18n";
import { v } from "@/lib/css";

const cv = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (x1 + x2) / 2;
  return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
};
const YS = [30, 85, 140];

/** About: bio, a timeline that lights up in turn, a small request beam and two recommendations quoted word for word. */
export default function AboutSection() {
  const { t } = useI18n();
  const tl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tl.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const light = () => items.forEach((it, k) => window.setTimeout(() => it.classList.add("on"), 300 + k * 520));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((i) => i.classList.add("on"));
      return;
    }
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        io.disconnect();
        light();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec" id="about" data-pausable style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="ab">
          <div>
            <span className="eyebrow">{t("about_eyebrow")}</span>
            <h2 className="t" style={{ marginTop: 14 }}>{t("about_title")}</h2>
            <p className="lead">{t("about_bio")}</p>
            <p className="small">{t("about_principles")}</p>
            <p className="small">{t("about_base")}</p>
            <div className="abeam">
              <svg viewBox="0 0 330 170" role="img" aria-label="Web, mobile and partner app connect to an API, which writes to Postgres">
                {YS.map((y, i) => (
                  <g key={y}>
                    <path className="base" d={cv(80, y, 150, 85)} />
                    <path className="lt" pathLength={100} style={{ animationDelay: `-${i * 0.7}s` }} d={cv(80, y, 150, 85)} />
                  </g>
                ))}
                <path className="base" d="M200 85 H240" />
                <path className="lt" pathLength={100} d="M200 85 H240" />
                {["Web", "Mobile", "Partner"].map((n, i) => (
                  <g key={n}>
                    <rect className="nd" x="6" y={YS[i] - 14} width="74" height="28" rx="8" />
                    <text x="43" y={YS[i] + 4} textAnchor="middle">{n}</text>
                  </g>
                ))}
                <rect className="nd" x="150" y="55" width="50" height="60" rx="10" style={{ stroke: "#2dd4e8" }} />
                <text x="175" y="89" textAnchor="middle">API</text>
                <rect className="nd" x="240" y="62" width="82" height="46" rx="10" />
                <text x="281" y="89" textAnchor="middle">Postgres</text>
              </svg>
              <div className="cap">A tap, three hops, a booking.</div>
            </div>
          </div>
          <div>
            <div className="tlg" ref={tl}>
              {TIMELINE.map((e) => (
                <div key={e.t}>
                  <span className="yr">{e.d}</span>
                  <b>{e.t}</b>
                  <p>{e.x}</p>
                </div>
              ))}
            </div>
            <div className="tls">
              {TIMELINE.map((e) => (
                <div key={e.t}>
                  <b>{e.d.split(" ").pop()}</b>
                  <span>{e.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="qts rv">
          <i />
          <i />
          {TESTIMONIALS.map((q) => (
            <figure className="qt" key={q.id}>
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                <b>{q.name}</b>
                <span>{q.role}</span>
                <small>{q.relation} · {q.date}</small>
              </figcaption>
            </figure>
          ))}
          <p className="qts-note" style={v({})}>Quoted word for word from recommendations on LinkedIn.</p>
        </div>
      </div>
    </section>
  );
}
