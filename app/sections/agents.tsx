"use client";

import { useEffect, useRef, useState } from "react";
import { StatusPill } from "@/components/ui";
import { LOG_LINES } from "@/config/site";
import { AGENTS, type Item } from "@/config/work";
import { v } from "@/lib/css";

/** A simulated clock, so the server and the browser render the same first lines. */
const stamp = (n: number) => {
  const s = 9 * 3600 + 14 * 60 + n * 3;
  return [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].map((x) => String(x).padStart(2, "0")).join(":");
};
const line = (n: number) => ({ id: n, ts: stamp(n), l: LOG_LINES[n % LOG_LINES.length] });

/** Fixed positions so meteors render identically on the server and in the browser. */
const METEORS = Array.from({ length: 16 }, (_, i) => ({ x: (i * 37 + 11) % 100, d: 3 + ((i * 13) % 30) / 10, l: -(((i * 17) % 60) / 10) }));

function AgentRow({ a, dim }: { a: Item; dim?: boolean }) {
  return (
    <div className={`ag-i${dim ? " dim" : ""}`}>
      <b>{a.name}</b>
      <StatusPill status={a.status} />
      <p>{a.text}</p>
    </div>
  );
}

export default function AgentsSection() {
  const [lines, setLines] = useState(() => Array.from({ length: 13 }, (_, i) => line(i)));
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 13;
    const id = window.setInterval(() => {
      const sec = log.current?.closest(".sec");
      if (document.hidden || sec?.getAttribute("data-vis") === "0") return;
      n += 1;
      setLines((prev) => [...prev, line(n)].slice(-14));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const daily = AGENTS.filter((a) => a.status === "live" || a.status === "internal");
  const next = AGENTS.filter((a) => a.status === "build" || a.status === "beta" || a.status === "planned");
  const done = AGENTS.filter((a) => a.status === "delivered");

  return (
    <section className="sec ags" id="agents" data-pausable style={{ paddingTop: 20 }}>
      <div className="ag-met" aria-hidden="true">
        <div className="w">
          {METEORS.map((m, i) => <i key={i} style={v({ "--x": `${m.x}%`, "--d": `${m.d}s`, "--l": `${m.l}s` })} />)}
        </div>
      </div>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">AI agents</span>
            <h2 className="t">The agents are on call. A person owns each one.</h2>
          </div>
          <p>The feed is a sample. Real runs are logged the same way, with a help code and an owner. Status is shown as it is: live, in build, or still a plan.</p>
        </div>
        <div className="ag">
          <div className="ag-term rv">
            <header><i /><i /><i /><span>agents.log · sample feed</span></header>
            <div className="ag-log" ref={log}>
              {lines.map(({ id, ts, l }) => (
                <p key={id}>
                  <span className="ts">{ts}</span>  <span className={l[1]}>[{l[0]}]</span> {l[2]}
                </p>
              ))}
            </div>
          </div>
          <div className="ag-groups">
            <div>
              <h3><span>In daily use</span><span>{daily.length}</span></h3>
              <div className="ag-list">{daily.map((a) => <AgentRow key={a.id} a={a} />)}</div>
            </div>
            <div>
              <h3><span>In build, beta or planned</span><span>{next.length}</span></h3>
              <div className="ag-list">{next.map((a) => <AgentRow key={a.id} a={a} dim />)}</div>
            </div>
            {done.length > 0 && (
              <div>
                <h3><span>Delivered</span><span>{done.length}</span></h3>
                <div className="ag-list">{done.map((a) => <AgentRow key={a.id} a={a} dim />)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
