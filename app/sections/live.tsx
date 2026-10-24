"use client";

import { useEffect, useRef, useState } from "react";
import OnView from "@/components/on-view";
import { Logo } from "@/components/ui";
import { LOGO } from "@/config/logos";
import { FEED_LINES, ORBIT_TOOLS, SURFACES } from "@/config/site";
import { AGENTS, WEB3 } from "@/config/work";
import { v } from "@/lib/css";

function Clock() {
  const [t, setT] = useState({ h: "--", m: "--", l: "--:--" });
  useEffect(() => {
    const tick = () => {
      try {
        const f = (z: string) => new Date().toLocaleTimeString("en-GB", { timeZone: z, hour: "2-digit", minute: "2-digit" });
        const b = f("Asia/Makassar");
        setT({ h: b.slice(0, 2), m: b.slice(3, 5), l: f("America/Los_Angeles") });
      } catch {
        /* no Intl timezone support */
      }
    };
    tick();
    const id = window.setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bn-t bn-clock" data-spot>
      <span className="bn-e">Local time</span>
      <div>
        <div className="big">
          <span>{t.h}</span>
          <i>:</i>
          <span>{t.m}</span>
        </div>
        <div className="sm">
          <b>Bali</b> · UTC+8<br />
          Las Vegas <b>{t.l}</b> · PT
        </div>
      </div>
    </div>
  );
}

const ODO = "100,000+";

/** Digits roll to their value once. The server markup already shows the final number. */
function Odometer() {
  const [go, setGo] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setGo(false);
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        io.disconnect();
        window.setTimeout(() => setGo(true), 60);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="od" ref={ref} role="img" aria-label={ODO}>
      {ODO.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span className="d" key={i} aria-hidden="true">
            <div style={{ ...v({ "--i": i, "--n": ch }), transform: go ? "translateY(calc(var(--n) * -1em))" : "translateY(0)" }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <b key={n}>{n}</b>)}
            </div>
          </span>
        ) : (
          <span className="c" key={i} aria-hidden="true">{ch}</span>
        )
      )}
    </div>
  );
}

const BEFORE = [100, 92, 96, 88, 100, 94, 90, 98, 86, 100, 92, 96, 90, 98, 94, 88];
const AFTER = [22, 18, 24, 16, 26, 20, 18, 28, 16, 24, 20, 18, 22, 26, 17, 21];

/** 328 to 70 sitemap URLs, looped while on screen. Final state in the server markup. */
function SitemapTile() {
  const num = useRef<HTMLSpanElement>(null);
  const bars = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const n = num.current;
    const b = bars.current;
    if (!n || !b) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(b.children) as HTMLElement[];
    let timer = 0, on = false;
    const paint = (before: boolean) =>
      els.forEach((e, k) => {
        e.style.setProperty("--h", `${(before ? BEFORE : AFTER)[k]}%`);
        e.style.background = before ? "#27414f" : "var(--cy)";
      });
    const morph = () => {
      const t0 = performance.now();
      paint(false);
      const f = (t: number) => {
        const p = Math.min(1, (t - t0) / 1700);
        n.textContent = String(Math.round(328 + (70 - 328) * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    };
    const cycle = () => {
      n.textContent = "328";
      paint(true);
      timer = window.setTimeout(() => {
        morph();
        timer = window.setTimeout(cycle, 5600);
      }, 1400);
    };
    n.textContent = "328";
    paint(true);
    const io = new IntersectionObserver((es) => {
      const vis = es[0].isIntersecting;
      if (vis && !on) {
        on = true;
        cycle();
      } else if (!vis && on) {
        on = false;
        clearTimeout(timer);
      }
    }, { threshold: 0.4 });
    io.observe(b);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);
  return (
    <div className="bn-t bn-sm" data-spot>
      <span className="bn-e">Search traffic, rebuilt</span>
      <div className="n">
        <span ref={num}>70</span>
        <small>sitemap URLs</small>
      </div>
      <div className="bn-bars" ref={bars}>
        {AFTER.map((h, i) => <i key={i} style={{ ["--h" as string]: `${h}%`, background: "var(--cy)" }} />)}
      </div>
    </div>
  );
}

function Orbit() {
  const ring = (list: string[], r: number, dur: number, rev?: boolean) => (
    <>
      <div className="ol" style={{ width: r * 2, height: r * 2 }} />
      <div className={`ringo${rev ? " r" : ""}`} style={v({ "--d": `${dur}s` })}>
        {list.map((tool, i) => {
          const a = (360 / list.length) * i;
          return (
            <div className="pos" key={tool} style={v({ "--a": `${a}deg`, "--r": `${r}px` })}>
              <span className="oc" title={tool} role="img" aria-label={tool} style={v({ "--a": `${a}deg`, "--d": `${dur}s` })}>
                {LOGO[tool] ? <Logo id={LOGO[tool]} /> : <b>{tool.slice(0, 2)}</b>}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
  return (
    <div className="bn-t bn-orb" data-spot>
      <div className="tx"><span className="bn-e">Tools of the trade</span></div>
      <div className="bn-orbit">
        <div className="ctr">82<small>tools, 10 stacks</small></div>
        {ring(ORBIT_TOOLS.slice(0, 4), 70, 34)}
        {ring(ORBIT_TOOLS.slice(4, 12), 118, 56, true)}
      </div>
    </div>
  );
}

function Feed() {
  const [items, setItems] = useState(() => FEED_LINES.slice(0, 4).map((f, i) => ({ id: i, f })));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 4;
    const id = window.setInterval(() => {
      const sec = ref.current?.closest(".sec");
      if (document.hidden || sec?.getAttribute("data-vis") === "0") return;
      n += 1;
      setItems((prev) => [{ id: n, f: FEED_LINES[n % FEED_LINES.length] }, ...prev].slice(0, 4));
    }, 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bn-t bn-fd" data-spot>
      <span className="bn-e">Agents on watch · sample</span>
      <div className="fd" ref={ref}>
        {items.map(({ id, f }) => (
          <div className="fi" key={id}>
            <i style={{ background: f[0] }} />
            <b>{f[1]}</b>
            <em>{f[2]}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Ratios come straight from the config, so they stay true when a status changes. */
const RINGS = [
  { n: AGENTS.filter((a) => a.status === "live" || a.status === "internal").length, of: AGENTS.length, label: "agents in daily use", color: "#2dd4e8" },
  { n: WEB3.filter((w) => w.status === "live").length, of: WEB3.length, label: "Web3 pages live", color: "#e9c27d" },
  { n: SURFACES.filter((x) => x.status === "live").length, of: SURFACES.length, label: "surfaces live", color: "#ff7b5c" },
];

export default function LiveSection() {
  return (
    <section className="sec" id="live" data-pausable style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">Live from the system</span>
            <h2 className="t">The numbers, still moving.</h2>
          </div>
          <p>Real local time, real counts, and the tools behind them. Hover a tile for the light. The agent feed is a sample.</p>
        </div>
        <div className="bn">
          <Clock />
          <div className="bn-t bn-vis" data-spot>
            <span className="bn-e">Live marketplace</span>
            <div>
              <Odometer />
              <div className="cap">site visits tracked in production</div>
              <div className="cap" style={{ marginTop: 14, color: "var(--fg)" }}>
                700+ booking requests a month<br />110+ partner businesses
              </div>
            </div>
          </div>
          <SitemapTile />
          <Orbit />
          <div className="bn-t bn-rg" data-spot>
            <span className="bn-e">Status board</span>
            <OnView className="rgs">
              {RINGS.map((r) => (
                <div key={r.label}>
                  <div className="r" style={v({ "--c": r.color, "--v": r.of ? r.n / r.of : 0 })}><b>{r.n}/{r.of}</b></div>
                  <small>{r.label}</small>
                </div>
              ))}
            </OnView>
          </div>
          <Feed />
        </div>
      </div>
    </section>
  );
}
