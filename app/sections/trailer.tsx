"use client";

import { useEffect, useRef } from "react";
import { PhoneFrame } from "@/components/ui";
import { phone } from "@/config/media";
import { EV } from "@/lib/events";
import { v } from "@/lib/css";

const NAMES = ["Hello", "Marketplaces", "Proof", "Agents", "Cities", "Say hello"];

/**
 * Six chapters on a timer, like a story: tap right to skip, left to go back, press and hold to pause.
 * Time based (CSS keyframes plus one timeout), nothing follows scroll. It only plays while on screen.
 */
export default function TrailerSection() {
  const reel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = reel.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chs = Array.from(root.querySelectorAll<HTMLElement>(".ch"));
    const segs = Array.from(root.querySelectorAll<HTMLElement>(".segs i"));
    const nm = root.querySelector<HTMLElement>("[data-nm]")!;
    const cn = root.querySelector<HTMLElement>("[data-cn]")!;
    const pp = root.querySelector<HTMLButtonElement>("[data-pp]")!;
    const tl = root.querySelector<HTMLButtonElement>("[data-tl]")!;
    const tr = root.querySelector<HTMLButtonElement>("[data-tr]")!;
    const replay = root.querySelector<HTMLButtonElement>("[data-replay]")!;
    let cur = -1, timer = 0, playing = true, started = false, autoPaused = false, startedAt = 0, remaining = 0, visible = false;

    const counters = (ch: HTMLElement) => {
      ch.querySelectorAll<HTMLElement>("[data-to]").forEach((el) => {
        const to = +(el.dataset.to || 0);
        const suf = el.dataset.suf || "";
        const t0 = performance.now() + 500;
        const f = (t: number) => {
          const p = Math.max(0, Math.min(1, (t - t0) / 1700));
          const k = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(to * k).toLocaleString("en-US") + (p > 0 ? suf : "");
          if (p < 1 && ch.classList.contains("on")) requestAnimationFrame(f);
          else if (p >= 1) el.textContent = to.toLocaleString("en-US") + suf;
        };
        requestAnimationFrame(f);
      });
    };

    const schedule = (ms: number) => {
      startedAt = performance.now();
      remaining = ms;
      clearTimeout(timer);
      timer = window.setTimeout(() => go(cur + 1), ms);
    };

    const go = (i0: number, restart?: boolean) => {
      const i = Math.max(0, Math.min(chs.length - 1, i0));
      clearTimeout(timer);
      chs.forEach((c, k) => {
        const on = k === i;
        if (on && (k !== cur || restart)) {
          c.classList.remove("on");
          void c.offsetWidth;
        }
        c.classList.toggle("on", on);
      });
      segs.forEach((s, k) => {
        s.classList.remove("on");
        s.classList.toggle("done", k < i);
        if (k === i) {
          void s.offsetWidth;
          const ms = +(chs[i].dataset.ms || 0);
          s.style.setProperty("--ms", `${ms}ms`);
          s.classList.add(ms > 0 ? "on" : "done");
        }
      });
      cur = i;
      nm.textContent = chs[i].dataset.name || "";
      cn.textContent = `${String(i + 1).padStart(2, "0")} / ${String(chs.length).padStart(2, "0")}`;
      if (chs[i].querySelector("[data-to]")) counters(chs[i]);
      const ms2 = +(chs[i].dataset.ms || 0);
      if (ms2 > 0 && playing && started && !reduce) schedule(ms2);
    };

    const pause = () => {
      if (!playing) return;
      playing = false;
      root.classList.add("hold");
      pp.textContent = "▶";
      pp.setAttribute("aria-label", "Play");
      clearTimeout(timer);
      remaining = Math.max(0, remaining - (performance.now() - startedAt));
    };
    const play = () => {
      if (playing) return;
      playing = true;
      root.classList.remove("hold");
      pp.textContent = "❚❚";
      pp.setAttribute("aria-label", "Pause");
      if (+(chs[cur].dataset.ms || 0) > 0 && !reduce) {
        startedAt = performance.now();
        timer = window.setTimeout(() => go(cur + 1), remaining || 1);
      }
    };

    const onNext = () => go(cur + 1);
    const onPrev = () => go(cur - 1);
    const onPP = (e: Event) => {
      e.stopPropagation();
      playing ? pause() : play();
    };
    const onReplay = (e?: Event) => {
      e?.stopPropagation();
      started = true;
      playing = true;
      root.classList.remove("hold");
      pp.textContent = "❚❚";
      go(0, true);
    };
    tr.addEventListener("click", onNext);
    tl.addEventListener("click", onPrev);
    pp.addEventListener("click", onPP);
    replay.addEventListener("click", onReplay);

    /* press and hold pauses; a hold longer than 220 ms does not count as a tap */
    let downAt = 0, held = false, hto = 0;
    const cleanups: Array<() => void> = [];
    [tl, tr].forEach((el) => {
      const down = () => {
        downAt = performance.now();
        held = false;
        hto = window.setTimeout(() => {
          held = true;
          pause();
        }, 220);
      };
      const up = () => {
        clearTimeout(hto);
        if (held) {
          held = false;
          play();
        }
      };
      const swallow = (e: Event) => {
        if (performance.now() - downAt > 230) e.stopImmediatePropagation();
      };
      el.addEventListener("pointerdown", down);
      ["pointerup", "pointerleave", "pointercancel"].forEach((n) => el.addEventListener(n, up));
      el.addEventListener("click", swallow, true);
      cleanups.push(() => {
        el.removeEventListener("pointerdown", down);
        ["pointerup", "pointerleave", "pointercancel"].forEach((n) => el.removeEventListener(n, up));
        el.removeEventListener("click", swallow, true);
      });
    });

    const onKey = (e: KeyboardEvent) => {
      if (!visible) return;
      if (e.key === "ArrowRight") go(cur + 1);
      else if (e.key === "ArrowLeft") go(cur - 1);
    };
    window.addEventListener("keydown", onKey);
    const onReel = () => onReplay();
    window.addEventListener(EV.reel, onReel);

    go(0);
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (es) => {
            const vis = es[0].isIntersecting;
            visible = vis;
            if (vis && !started) {
              started = true;
              go(0, true);
            } else if (!vis && playing && started) {
              pause();
              autoPaused = true;
            } else if (vis && autoPaused) {
              autoPaused = false;
              play();
            }
          },
          { threshold: 0.35 }
        )
      : null;
    io?.observe(root);

    return () => {
      clearTimeout(timer);
      clearTimeout(hto);
      io?.disconnect();
      tr.removeEventListener("click", onNext);
      tl.removeEventListener("click", onPrev);
      pp.removeEventListener("click", onPP);
      replay.removeEventListener("click", onReplay);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EV.reel, onReel);
      cleanups.forEach((f) => f());
    };
  }, []);

  const rise = [
    { img: phone("gl-nightlife", true), r: "-6deg", y: "0", i: 0 },
    { img: phone("gl-home", true), r: "0deg", y: "-6%", i: 1 },
    { img: phone("gl-ticket", true), r: "6deg", y: "0", i: 2 },
  ];

  return (
    <section className="sec" id="trailer" data-pausable>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">The 26-second version</span>
            <h2 className="t">Watch first. Read after.</h2>
          </div>
          <p>Six chapters on a timer. Tap right to skip, left to go back, press and hold to pause.</p>
        </div>
        <div className="rl" ref={reel} role="group" aria-roledescription="carousel" aria-label="Trailer, six chapters">
          <div className="segs">
            {NAMES.map((n) => (
              <i key={n} />
            ))}
          </div>

          <div className="ch c1 on" data-ms="4200" data-name="Hello">
            <div className="ring" />
            <div className="ring b" />
            <div className="h">
              <span className="ml"><span style={v({ "--i": 0 })}>Hi, I’m</span></span>
              <span className="ml"><span style={v({ "--i": 1 })}>Jeremia</span></span>
              <span className="ml"><span className="o" style={v({ "--i": 2 })}>Axelano.</span></span>
            </div>
            <p className="sub fade" style={v({ "--d": "1.1s" })}>CTO · Bali · UTC+8</p>
          </div>

          <div className="ch c2" data-ms="5200" data-name="Marketplaces">
            <div className="h">
              <span className="ml"><span style={v({ "--i": 0 })}>I build</span></span>
              <span className="ml"><span style={v({ "--i": 1 })}>marketplaces.</span></span>
            </div>
            <div className="tags fade" style={v({ "--d": ".9s" })}>
              <span>Web</span><span>iOS</span><span>Android</span><span>Back office</span>
            </div>
            <div className="phones">
              {rise.map((p) => (
                <PhoneFrame key={p.i} img={p.img} style={v({ "--r": p.r, "--y": p.y, "--i": p.i })} />
              ))}
            </div>
          </div>

          <div className="ch c3" data-ms="5200" data-name="Proof">
            <div className="sticker">live in<br />Bali · 2026<br />★</div>
            <div className="h">
              <span className="ml"><span style={v({ "--i": 0 })}>Real traffic.</span></span>
              <span className="ml"><span style={v({ "--i": 1 })}>Real bookings.</span></span>
            </div>
            <div className="nums fade" style={v({ "--d": ".6s" })}>
              <div><b data-to="30000" data-suf="+">30,000+</b><span>visitors tracked</span></div>
              <div><b data-to="700" data-suf="+">700+</b><span>booking requests a month</span></div>
              <div><b data-to="110" data-suf="+">110+</b><span>partner businesses</span></div>
            </div>
          </div>

          <div className="ch c4" data-ms="6000" data-name="Agents">
            <div className="grid">
              <div className="h">
                <span className="ml"><span style={v({ "--i": 0 })}>…and the</span></span>
                <span className="ml"><span style={v({ "--i": 1 })}>agents that</span></span>
                <span className="ml"><span style={v({ "--i": 2 })}>run them.</span></span>
              </div>
              <div className="term fade" style={v({ "--d": ".4s" })}>
                <p style={v({ "--i": 0 })}><span className="d">09:14</span> <span className="g">[agent-board]</span> 18 fields proposed</p>
                <p style={v({ "--i": 1 })}><span className="d">09:14</span> <span className="y">[review]</span> a person approves</p>
                <p style={v({ "--i": 2 })}><span className="d">09:15</span> <span className="g">[event-import]</span> 42 events staged</p>
                <p style={v({ "--i": 3 })}><span className="d">09:17</span> <span className="o">[error-alert]</span> help code H-4F2A sent</p>
                <p style={v({ "--i": 4 })}><span className="d">09:20</span> <span className="g">[ops-briefing]</span> daily brief posted</p>
                <p style={v({ "--i": 5 })}><span className="d">09:21</span> <span className="g">[social]</span> weekly summary written</p>
              </div>
            </div>
          </div>

          <div className="ch c5" data-ms="5400" data-name="Cities">
            <div className="h">
              <span className="ml"><span style={v({ "--i": 0 })}>One platform.</span></span>
              <span className="ml"><span style={v({ "--i": 1 })}>A city at a time.</span></span>
            </div>
            <svg viewBox="0 0 760 250" role="img" aria-label="Arc from Bali to Las Vegas, then a dashed line to the next city">
              <path className="arc" pathLength={1} d="M600 190 C 480 20, 250 20, 130 150" />
              <path d="M130 150 C 100 180, 70 200, 30 205" fill="none" stroke="#e9c27d" strokeWidth="2" strokeDasharray="4 6" opacity=".7" />
              <circle className="pin" cx="600" cy="190" r="7" />
              <circle className="ring2" cx="600" cy="190" r="12" />
              <circle className="pin" cx="130" cy="150" r="7" />
              <circle className="ring2" cx="130" cy="150" r="12" style={{ animationDelay: ".8s" }} />
              <circle cx="30" cy="205" r="6" fill="none" stroke="#e9c27d" strokeWidth="2" />
              <text x="600" y="222" textAnchor="middle">Bali</text>
              <text className="s" x="600" y="242" textAnchor="middle">live</text>
              <text x="130" y="122" textAnchor="middle">Las Vegas</text>
              <text className="s" x="130" y="104" textAnchor="middle">Oct 2026</text>
              <text className="s" x="30" y="232">next</text>
            </svg>
          </div>

          <div className="ch c6" data-ms="0" data-name="Say hello">
            <div className="h">
              <span className="ml"><span style={v({ "--i": 0 })}>Let’s build</span></span>
              <span className="ml"><span style={v({ "--i": 1 })}>the next one.</span></span>
            </div>
            <div className="cta fade" style={v({ "--d": ".8s" })}>
              <a className="b2" href="#contact">Start a conversation →</a>
              <button className="b2 o" type="button" data-replay>↺ Replay</button>
            </div>
            <p className="sub fade" style={v({ "--d": "1.1s" })}>Product · Advisory · Part-time CTO</p>
          </div>

          <button className="tap l" type="button" data-tl aria-label="Previous chapter" />
          <button className="tap r" type="button" data-tr aria-label="Next chapter" />
          <div className="ctl">
            <span data-nm>Hello</span>
            <span className="sp" data-cn>01 / 06</span>
            <button type="button" data-pp aria-label="Pause">❚❚</button>
          </div>
        </div>
        <div className="rl-hint">
          <span>Tap right to skip · left to go back · press and hold to pause</span>
          <span>← → keys work too</span>
        </div>
      </div>
    </section>
  );
}
