import Globe from "@/components/globe";
import { CITIES, PIPELINE } from "@/config/site";
import { v } from "@/lib/css";

/** Expansion as the story: one platform, a city at a time. */
export default function AtlasSection() {
  return (
    <section className="sec at" id="atlas" data-pausable style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">Built in Bali · opening cities</span>
            <h2 className="t">
              One platform. <span className="grad">A city at a time.</span>
            </h2>
          </div>
          <p>Opening a market used to mean weeks of manual venue research. Now it is an import pipeline, a person approving, and a price list in the local currency.</p>
        </div>
        <div className="at-grid">
          <Globe />
          <div className="at-cities">
            {CITIES.map((c, i) => (
              <div className="rv" style={v({ "--d": `${i * 0.1}s` })} key={c.id}>
                <article className={`at-c ${c.tone}`} data-tilt data-spot style={v({ "--c1": c.glow })}>
                  <div className="top">
                    <h3>{c.name}</h3>
                    <span className="co">{c.co}</span>
                  </div>
                  <span className="stt"><i />{c.state}</span>
                  {"note" in c && c.note && <p>{c.note}</p>}
                  {c.rows.length > 0 && (
                    <ul>
                      {c.rows.map((r) => (
                        <li key={r.k}>
                          {r.k}
                          {"n" in r ? <b data-count={r.n} data-suffix={r.s}>{r.v}</b> : <b>{r.v}</b>}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="pipe">
          {PIPELINE.map((p, i) => (
            <div className="ps rv" key={p.t} style={v({ "--d": `${i * 0.08}s` })}>
              <i>{i + 1}</i>
              <h3>{p.t}</h3>
              <p>{p.x}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
