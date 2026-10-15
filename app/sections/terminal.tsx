"use client";

import { useEffect, useRef } from "react";
import { ARSENAL } from "@/config/arsenal";
import { CASES } from "@/config/cases";
import { DIFFS } from "@/config/site";
import { AGENTS } from "@/config/work";
import { EV, emit } from "@/lib/events";
import { v } from "@/lib/css";

const SUGGEST = ["help", "whoami", "agents", "cat cases/search", "stack", "reel"];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** A terminal that answers a few commands, plus the three jobs as diffs. */
export default function TerminalSection() {
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tb = body.current;
    if (!tb) return;
    tb.innerHTML = "";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hist: string[] = [];
    let hi = 0;
    const tin = document.createElement("div");
    tin.className = "tin";
    tin.innerHTML = '<span class="pr">axel@bali ~ %</span><input autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input">';
    tb.appendChild(tin);
    const ti = tin.querySelector("input") as HTMLInputElement;
    const out = (html: string, cls = "") => {
      const p = document.createElement("p");
      p.className = cls;
      p.innerHTML = html;
      tb.insertBefore(p, tin);
      tb.scrollTop = tb.scrollHeight;
    };
    const pad = (s: string, n: number) => (s + " ".repeat(n)).slice(0, n);
    const CMD: Record<string, () => string> = {
      help: () => ['help  commands', 'whoami  who is this', 'ls  list folders', 'cat cases/search  also agents, city', 'agents  the agents and their status', 'stack  tool counts', 'web3  launch pages', 'open fight  find a build', 'reel  replay the trailer', 'globe  jump to the cities', 'clear'].map((l) => `<span class="hi">${l.split("  ")[0]}</span>  ${l.split("  ")[1] ?? ""}`).join("\n"),
      whoami: () => "Jeremia Axelano · CTO at Guestlist Ticket\nBali, UTC+8. Builds marketplace platforms and AI agents.\nWeb, iOS, Android, back office. Live in Bali, Las Vegas Oct 2026.",
      ls: () => "cases/   systems/   builds/   contact.sh",
      agents: () => AGENTS.map((a) => `${pad(a.name, 30)}<span class="dm">${a.status}</span>`).join("\n"),
      stack: () => ARSENAL.map((s) => `${pad(s.name, 22)}${s.tools.length}`).join("\n"),
      web3: () => 'every launch page has its own look.\ntry: <span class="hi">open golden</span>',
    };
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    const run = (raw: string) => {
      const line = raw.trim();
      if (!line) return;
      out(`<span class="pr">axel@bali ~ %</span> ${esc(line)}`);
      const a = line.split(/\s+/);
      const c = a[0].toLowerCase();
      if (c === "clear") {
        tb.querySelectorAll("p").forEach((p) => p.remove());
        return;
      }
      if (c === "cat") {
        const k = (a[1] || "").replace("cases/", "").replace(".md", "");
        const m = CASES.find((x) => x.id === k);
        if (m) out(`<span class="hi">${esc(m.title)}</span>\nProblem   ${esc(m.problem)}\nApproach  ${esc(m.approach)}\nResult    ${esc(m.result)}`);
        else out(`cat: ${esc(a[1] || "")}: no such file`, "er");
        return;
      }
      if (c === "open") {
        const q = (a[1] || "").toLowerCase();
        out(`searching builds for “${esc(q)}”`, "dm");
        emit(EV.builds, { q });
        return;
      }
      if (c === "reel") {
        out("rolling the trailer…", "dm");
        scrollTo("trailer");
        window.setTimeout(() => emit(EV.reel), 500);
        return;
      }
      if (c === "globe") {
        out("jumping to the cities…", "dm");
        scrollTo("atlas");
        return;
      }
      if (CMD[c]) out(CMD[c]());
      else out(`command not found: ${esc(c)}. type <span class="hi">help</span>`, "er");
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        hist.push(ti.value);
        hi = hist.length;
        run(ti.value);
        ti.value = "";
      } else if (e.key === "ArrowUp" && hist.length) {
        hi = Math.max(0, hi - 1);
        ti.value = hist[hi] || "";
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        hi = Math.min(hist.length, hi + 1);
        ti.value = hist[hi] || "";
      }
    };
    ti.addEventListener("keydown", onKey);
    const onCmd = (e: Event) => run(String((e as CustomEvent<string>).detail || ""));
    window.addEventListener(EV.term, onCmd);

    /* a short demo the first time the terminal is on screen */
    const timers: number[] = [];
    const demo = () => {
      const cmds = ["whoami", "ls"];
      let i = 0;
      const next = () => {
        if (i >= cmds.length) return;
        const c = cmds[i++];
        let k = 0;
        const type = () => {
          ti.value = c.slice(0, ++k);
          if (k < c.length) timers.push(window.setTimeout(type, 70));
          else timers.push(window.setTimeout(() => { ti.value = ""; run(c); timers.push(window.setTimeout(next, 500)); }, 280));
        };
        type();
      };
      next();
    };
    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      run("whoami");
      run("ls");
    } else {
      io = new IntersectionObserver((es) => {
        if (es[0].isIntersecting) {
          io?.disconnect();
          demo();
        }
      }, { threshold: 0.5 });
      io.observe(tb);
    }
    return () => {
      io?.disconnect();
      timers.forEach(clearTimeout);
      ti.removeEventListener("keydown", onKey);
      window.removeEventListener(EV.term, onCmd);
      tb.innerHTML = "";
    };
  }, []);

  return (
    <section className="sec" id="terminal" data-pausable style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">Ask the terminal</span>
            <h2 className="t">Type a command. Or read the diffs.</h2>
          </div>
          <p>The terminal answers to help, whoami, agents, stack and cat cases/search. The diffs show what each job changed.</p>
        </div>
        <div className="tmg">
          <div>
            <div className="tm">
              <header><span className="on">TERMINAL</span><span>PROBLEMS 0</span><span>OUTPUT</span></header>
              <div className="tm-body" ref={body} />
            </div>
            <div className="tm-sugg">
              {SUGGEST.map((c) => <button key={c} type="button" onClick={() => emit(EV.term, c)}>{c}</button>)}
            </div>
          </div>
          <div className="dfs">
            {DIFFS.map((d) => (
              <article className="df rv" key={d.file}>
                <header><b>{d.file}</b><span>{d.meta}</span></header>
                {d.lines.map(([k, text], i) => (
                  <div className={`ln ${k}`} key={i} style={v({ "--i": i })}>
                    <i>{10 + i}</i>
                    <em>{k === "a" ? "+" : k === "r" ? "−" : " "}</em>
                    <span>{text}</span>
                  </div>
                ))}
                <footer dangerouslySetInnerHTML={{ __html: d.foot }} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
