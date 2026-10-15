import Link from "next/link";
import { PHOTO } from "@/config/media";
import { CASES } from "@/config/cases";
import { AGENTS } from "@/config/work";
import { StatusPill } from "@/components/ui";
import { v } from "@/lib/css";

const SHORT_AGENTS = ["Error alert", "IT automation", "Ops briefing", "Agent Board", "Social analytics", "Claude Code setup"];

const CARD: Record<string, { big: string; tone: string; label: string; approach: string }> = {
  seo: { big: "328→70", tone: "s1", label: "Search", approach: "Moved the homepage to server rendering, rebuilt the sitemap, cleaned up page titles and added attribution tracking for ads." },
  agents: { big: String(AGENTS.filter((a) => a.status === "live" || a.status === "internal").length), tone: "s2", label: "Agents", approach: "Each agent has a named human owner. A person approves every field before it goes live." },
  city: { big: "1,700+", tone: "s3", label: "Expansion", approach: "A daily import pipeline that finds, checks and cites data, then asks a person to approve." },
};

function Viz({ id }: { id: string }) {
  if (id === "seo")
    return (
      <div className="viz rv">
        <div className="cs-bars">
          <div>328<i style={{ ["--h" as string]: "200px" }} /><span>before</span></div>
          <div className="hot">70<i style={{ ["--h" as string]: "43px" }} /><span>after</span></div>
        </div>
      </div>
    );
  if (id === "agents")
    return (
      <div className="viz">
        <div className="cs-chips">
          {SHORT_AGENTS.map((a, i) => <span key={a} style={v({ "--i": i })}>{a}</span>)}
        </div>
      </div>
    );
  return (
    <div className="viz">
      <div className="cs-collage">
        {[PHOTO.ironFairies, PHOTO.finns, PHOTO.tropical].map((p) => <img key={p.src} src={p.src} width={p.w} height={p.h} alt="" loading="lazy" decoding="async" />)}
      </div>
    </div>
  );
}

/** Three jobs, each with the number that moved. The files stack with CSS sticky (no scroll-linked script). */
export default function CasesSection() {
  return (
    <section className="sec" id="cases" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">Case studies</span>
            <h2 className="t">Three jobs, the number that moved.</h2>
          </div>
          <p>Problem, approach, result. Scroll and the files stack. Each one has a full write-up.</p>
        </div>
        <div className="cs-wrap">
          {CASES.map((c, i) => {
            const k = CARD[c.id];
            return (
              <article className={`cs ${k.tone}`} style={v({ "--i": i })} key={c.id}>
                <div>
                  <div className="no">
                    <span>File 0{i + 1} · {k.label}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <div className="big">{k.big}</div>
                  <h3>{c.title}</h3>
                  <dl>
                    <div><dt>Problem</dt><dd>{c.problem}</dd></div>
                    <div><dt>Approach</dt><dd>{k.approach}</dd></div>
                    <div><dt>Result</dt><dd>{c.result}</dd></div>
                  </dl>
                  <Link className="more" href={`/cases/${c.id}`}>Read the full case →</Link>
                </div>
                <Viz id={c.id} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
