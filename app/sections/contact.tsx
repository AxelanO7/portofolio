"use client";

import { useEffect, useRef } from "react";
import { BRAND } from "@/config/logos";
import { EMAIL, WHATSAPP, WHATSAPP_LABEL } from "@/config/site";
import { ENGAGEMENTS } from "@/config/cases";
import { useI18n } from "@/lib/i18n";
import { EV } from "@/lib/events";
import { v } from "@/lib/css";

const LINKS = [
  { icon: BRAND.mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: BRAND.whatsapp, label: "WhatsApp", value: WHATSAPP_LABEL, href: WHATSAPP },
  { icon: BRAND.linkedin, label: "LinkedIn", value: "/in/jeremia-axelano", href: "https://linkedin.com/in/jeremia-axelano" },
  { icon: BRAND.github, label: "GitHub", value: "@AxelanO7", href: "https://github.com/AxelanO7" },
];

/** Contact: ripple dots and a soft disc behind the heading, a curtain reveal, a copy button and the three ways to start. */
export default function ContactSection() {
  const { t } = useI18n();
  const sec = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const hw = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLButtonElement>(null);
  const toast = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = sec.current, canvas = cv.current, d = disc.current, head = hw.current, btn = copy.current, tst = toast.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx || !d || !head || !btn || !tst) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, run = false, raf = 0;
    let rip: { x: number; y: number; t: number }[] = [];
    const size = () => {
      const r = root.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    };
    size();
    window.addEventListener("resize", size);
    const add = (x: number, y: number) => rip.push({ x, y, t: performance.now() });
    const down = (e: PointerEvent) => { const r = root.getBoundingClientRect(); add(e.clientX - r.left, e.clientY - r.top); };
    const mv = (e: PointerEvent) => { if (Math.random() < 0.025) { const r = root.getBoundingClientRect(); add(e.clientX - r.left, e.clientY - r.top); } };
    root.addEventListener("pointerdown", down);
    if (fine) root.addEventListener("pointermove", mv);
    const tick = window.setInterval(() => { if (run) add(W / 2, H * 0.42); }, 2800);

    let dtx = 0, dty = 0, dcx = 0, dcy = 0, had = false;
    const dt0 = performance.now();
    const dm = (e: PointerEvent) => { const r = root.getBoundingClientRect(); dtx = e.clientX - r.left; dty = e.clientY - r.top; had = true; };
    if (fine) root.addEventListener("pointermove", dm);

    const frame = (now: number) => {
      if (run && !reduce) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        rip = rip.filter((r) => now - r.t < 4200);
        for (let gx = 10; gx < W; gx += 18) {
          for (let gy = 10; gy < H; gy += 18) {
            let a = 0.16, sz = 1.1;
            for (const r of rip) {
              const age = (now - r.t) * 0.12;
              const dd = Math.hypot(gx - r.x, gy - r.y);
              const w = Math.exp(-Math.pow(dd - age, 2) / 700) * Math.max(0, 1 - age / 500);
              a += w * 0.8;
              sz += w * 1.6;
            }
            ctx.fillStyle = `rgba(79,224,189,${Math.min(1, a)})`;
            ctx.beginPath();
            ctx.arc(gx, gy, sz, 0, 7);
            ctx.fill();
          }
        }
        const w = d.offsetWidth;
        if (!had) {
          const s = (now - dt0) / 1000;
          dtx = W * (0.5 + 0.3 * Math.sin(s * 0.4));
          dty = H * (0.4 + 0.2 * Math.sin(s * 0.31 + 1));
        }
        dcx += (dtx - dcx) * 0.08;
        dcy += (dty - dcy) * 0.08;
        d.style.transform = `translate3d(${dcx - w / 2}px,${dcy - w / 2}px,0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((es) => { run = es[0].isIntersecting; if (run) { size(); add(W / 2, H * 0.42); } })
      : null;
    if (io) io.observe(root); else run = true;
    const hio = "IntersectionObserver" in window
      ? new IntersectionObserver((es) => { if (es[0].isIntersecting) { head.classList.add("go"); hio?.disconnect(); } }, { threshold: 0.5 })
      : null;
    if (hio) hio.observe(head); else head.classList.add("go");

    const doCopy = () => {
      const done = () => { tst.classList.add("on"); window.setTimeout(() => tst.classList.remove("on"), 1600); };
      try { navigator.clipboard.writeText(EMAIL).then(done, done); } catch { done(); }
    };
    btn.addEventListener("click", doCopy);
    window.addEventListener(EV.copy, doCopy);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(tick);
      io?.disconnect();
      hio?.disconnect();
      window.removeEventListener("resize", size);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", mv);
      root.removeEventListener("pointermove", dm);
      btn.removeEventListener("click", doCopy);
      window.removeEventListener(EV.copy, doCopy);
    };
  }, []);

  return (
    <section className="sec ct" id="contact" data-pausable ref={sec}>
      <canvas className="ct-dots" ref={cv} aria-hidden="true" />
      <div className="ct-disc" ref={disc} aria-hidden="true" />
      <div className="wrap">
        <span className="eyebrow">{t("contact_eyebrow")}</span>
        <div className="ct-hw" ref={hw} style={{ marginTop: 18 }}>
          <h2 className="ct-h o" aria-hidden="true">Let’s build<br />the next one.</h2>
          <h2 className="ct-h f">Let’s build<br />the next one.</h2>
        </div>
        <div className="ct-card">
          <div>
            <p className="lead">{t("contact_desc")}</p>
            <div className="ct-act">
              <a className="btn pri beam" href={`mailto:${EMAIL}?subject=Intro%20call`} style={v({ "--r": "99px" })}>{t("contact_call")} →</a>
              <button type="button" className="cpb" ref={copy}>{EMAIL} <i>⧉</i></button>
              <span className="toast" ref={toast} role="status">Copied</span>
            </div>
            <div className="ct-act" style={{ marginTop: 14 }}>
              <a className="btn sm" href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t("contact_whatsapp")}</a>
              <a className="btn sm" href="/resume.pdf" target="_blank" rel="noopener noreferrer">{t("contact_cv")}</a>
            </div>
          </div>
          <div className="eng">
            {ENGAGEMENTS.map((e, i) => (
              <div className="rv" style={v({ "--d": `${i * 0.1}s` })} key={e.title}>
                <article data-tilt data-spot>
                  <b>{e.title}</b>
                  <span>{e.text}</span>
                </article>
              </div>
            ))}
          </div>
        </div>
        <ul className="links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <small><svg viewBox="0 0 24 24" aria-hidden="true"><use href={`/logos/sprite.svg#${l.icon}`} /></svg>{l.label}</small>
                <span>{l.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
