import LazyMount from "@/components/lazy-mount";
import { Logo, Marquee } from "@/components/ui";
import { ARSENAL, TOOL_COUNT } from "@/config/arsenal";
import { LOGO } from "@/config/logos";
import { BAND_TOOLS } from "@/config/site";

const chip = (t: string) => (
  <span className="xchip" key={t}>
    {LOGO[t] && <Logo id={LOGO[t]} />}
    {t}
  </span>
);

/** The full arsenal: a logo band, then every tool grouped by stack. */
export default function ArsenalSection() {
  const a = BAND_TOOLS.slice(0, 10);
  const b = BAND_TOOLS.slice(10);
  return (
    <>
      <div className="stk-band" data-pausable>
        <div className="wrap">
          <span className="eyebrow">{TOOL_COUNT} tools across {ARSENAL.length} stacks</span>
        </div>
        <LazyMount className="stk-rows" style={{ minHeight: 86 }}>
          <Marquee speed={34} gap={10} items={a.map(chip)} />
          <Marquee speed={40} gap={10} reverse items={b.map(chip)} />
        </LazyMount>
      </div>
      <section className="sec" id="arsenal">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">Tech arsenal</span>
              <h2 className="t">What I build with.</h2>
            </div>
            <p>Only tools used in real repositories, production systems or past roles. A mark appears where the tool has one.</p>
          </div>
          <div className="arsenal">
            {ARSENAL.map((s) => (
              <article className="ars rv" key={s.name}>
                <header>
                  <h3><i style={{ ["--c" as string]: s.color }} />{s.name}</h3>
                  <span>{s.tools.length}</span>
                </header>
                <ul>{s.tools.map((t) => <li key={t}>{LOGO[t] && <Logo id={LOGO[t]} />}{t}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
