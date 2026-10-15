import LazyMount from "@/components/lazy-mount";
import { BrowserFrame, Marquee, PhoneFrame, WeightWave } from "@/components/ui";
import { GL_BO, gl, phone, shot } from "@/config/media";
import { CLIENTS, MOBILE, WEB3 } from "@/config/work";

const site = (slug: string, url: string) => <BrowserFrame key={slug} img={shot(slug)} url={url} />;
const ph = (name: string) => <PhoneFrame key={name} img={phone(name, true)} width={250} />;

const COLS: { speed: number; rev?: boolean; items: JSX.Element[] }[] = [
  { speed: 70, items: ["gl-home", "gl-nightlife", "gl-ticket"].map(ph) },
  { speed: 58, rev: true, items: [<BrowserFrame key="web" img={gl("web")} url="guestlistticket.com" />, site("s-fight-coin", "fight-coin"), site("s-golden-knight-coin", "golden-knight"), site("s-weda", "wedabalitoptours.com"), site("s-hardhat-cat-coin", "gold-hat"), site("s-erp", "erp"), site("s-genz-terminal", "popo")] },
  { speed: 74, items: [<BrowserFrame key="bo" img={GL_BO} url="back office" />, <BrowserFrame key="lp" img={gl("landing")} url="landing.guestlistticket.com" />, site("s-thefour-coin", "thefour"), site("s-arista", "dyfashionstuff"), site("s-nebula-cat-coin", "nebula-cat"), site("s-lyani", "lyani"), site("s-sun-coin", "sun")] },
  { speed: 62, rev: true, items: ["gl-events", "gl-tickets", "gl-venue"].map(ph) },
  { speed: 54, items: [site("s-sting-coin", "saber"), site("s-cat-the-builder-coin", "ctb"), site("s-lp-utan", "utan"), site("s-crochet-catalog", "rianne"), site("s-caturn", "caturn"), site("s-marrintis-lp", "marrintis"), site("s-bob-coin", "bob")] },
];

/** Proof by volume: a tilted wall of real screens, five columns moving in alternate directions (CSS only). */
export default function WallSection() {
  return (
    <section className="sec wl" id="wall" data-pausable>
      <div className="wl-box" aria-hidden="true">
        <LazyMount className="wl-wall">
          {COLS.map((c, i) => (
            <Marquee key={i} vertical className="wl-col" speed={c.speed} reverse={c.rev} gap={18} items={c.items} />
          ))}
        </LazyMount>
      </div>
      <div className="wrap wl-in">
        <span className="eyebrow">Everything I have shipped</span>
        <h2 style={{ marginTop: 18 }}>
          All of it, <em><WeightWave text="shipped." /></em>
        </h2>
        <p className="lead">Marketplace platforms, mobile apps, back offices, AI agents and {WEB3.length} Web3 launch pages. Built and led end to end, from the first screen to the server that keeps it up.</p>
        <div className="wl-chips">
          <span>6 surfaces</span>
          <span>{CLIENTS.length} client builds</span>
          <span>{WEB3.length} Web3 pages</span>
          <span>{MOBILE.length} mobile apps</span>
        </div>
      </div>
    </section>
  );
}
