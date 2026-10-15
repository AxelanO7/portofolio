const SURFACES = ["Web", "Mobile app", "Partner app", "Link hub", "Landing", "Back office"];
const AGENTS = ["Error alert", "IT automation", "Ops briefing", "Agent Board", "Social analytics", "Claude Code setup"];

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (x1 + x2) / 2;
  return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
};
const yS = (i: number) => 70 + i * 68;
const gy = (i: number) => 150 + i * 34;

function Node({ x, y, w, h, label, gw }: { x: number; y: number; w: number; h: number; label: string; gw?: boolean }) {
  return (
    <>
      <rect className={`nd${gw ? " gw" : ""}`} x={x} y={y - h / 2} width={w} height={h} rx={10} />
      <text x={x + 14} y={y + 4.5}>{label}</text>
    </>
  );
}

/** Request path as a diagram: six surfaces, one gateway, six Go services, one database, six agents. Light travels the wires. */
export default function SystemSection() {
  const base: JSX.Element[] = [];
  const light: JSX.Element[] = [];
  const wire = (key: string, d: string, delay: number, dashed?: boolean, gold?: boolean) => {
    base.push(<path key={`b${key}`} className={`base${dashed ? " d" : ""}`} d={d} />);
    light.push(<path key={`l${key}`} className={`lt${gold ? " b" : ""}`} pathLength={100} style={{ ["--d" as string]: `-${delay.toFixed(2)}s` }} d={d} />);
  };
  SURFACES.forEach((_, i) => wire(`s${i}`, curve(236, yS(i), 372, gy(i)), i * 0.55));
  [0, 1, 2].forEach((j) => {
    const y2 = 150 + j * 100 + 30;
    wire(`g${j}`, curve(490, gy(j * 2 + 1), 586, y2), 1 + j * 0.8);
    wire(`d${j}`, curve(776, y2, 842, 170 + j * 60), 2 + j * 0.7);
  });
  AGENTS.forEach((_, k) => wire(`a${k}`, curve(1000, yS(k), 942, 160 + k * 30), k * 0.6, true, true));

  return (
    <section className="sec" id="system" data-pausable style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">Systems I run at Guestlist Ticket</span>
            <h2 className="t">How a booking moves, from a tap to the door.</h2>
          </div>
          <p>Six surfaces, one gateway, six Go services, one self-hosted database. Light travels the wires. Agent output goes back to a person before anything customer-facing changes.</p>
        </div>
        <div className="ar rv">
          <div className="ar-hd">
            <span className="lab">Live system map · request path</span>
            <div className="ar-lg">
              <span><i />request</span>
              <span><i className="d" />agent output, a person approves</span>
            </div>
          </div>
          <svg className="ar-svg" viewBox="0 0 1200 470" role="img" aria-label="Six surfaces connect to one API gateway, then six Go services and one database. Six agents send output back for a person to approve.">
            <text className="col" x="40" y="26">SURFACES</text>
            <text className="col" x="372" y="26">GATEWAY</text>
            <text className="col" x="580" y="26">6 GO SERVICES</text>
            <text className="col" x="838" y="26">DATA</text>
            <text className="col" x="1000" y="26">6 AGENTS</text>
            {base}
            {light}
            <g data-k="0">{SURFACES.map((s, i) => <Node key={s} x={40} y={yS(i)} w={196} h={44} label={s} />)}</g>
            <g data-k="1">
              <rect className="nd gw" x="372" y="62" width="118" height="346" rx="14" />
              <text x="431" y="236" textAnchor="middle">API</text>
              <text x="431" y="254" textAnchor="middle">gateway</text>
            </g>
            <g data-k="2">
              {[0, 1, 2, 3, 4, 5].map((n) => {
                const cx = 586 + (n % 2) * 98;
                const cy = 150 + Math.floor(n / 2) * 100;
                return (
                  <g key={n}>
                    <rect className="nd" x={cx} y={cy} width="88" height="60" rx="10" />
                    <text className="sub" x={cx + 44} y={cy + 34} textAnchor="middle">Go</text>
                  </g>
                );
              })}
            </g>
            <g data-k="3">
              <rect className="nd" x="842" y="150" width="100" height="150" rx="16" />
              <ellipse cx="892" cy="176" rx="34" ry="9" fill="none" stroke="#2a4a5e" strokeWidth="1.4" />
              <path d="M858 176v54a34 9 0 0 0 68 0v-54" fill="none" stroke="#2a4a5e" strokeWidth="1.4" />
              <text x="892" y="262" textAnchor="middle">Postgres</text>
              <text className="sub" x="892" y="278" textAnchor="middle">self-hosted</text>
            </g>
            <g data-k="4">
              {AGENTS.map((a, i) => (
                <g key={a}>
                  <Node x={1000} y={yS(i)} w={190} h={44} label={a} />
                  <circle cx="1172" cy={yS(i)} r="4" fill="#4fe0bd" />
                </g>
              ))}
            </g>
            <text className="sub" x="1000" y="452">● each agent has a human owner</text>
          </svg>
          <div className="ar-m">
            <div className="dm">
              <div className="st"><span className="lab">Surfaces</span><div className="row">{SURFACES.map((s) => <span key={s}>{s}</span>)}</div></div>
              <div className="vb" />
              <div className="st gw"><b style={{ font: "600 14px var(--mono)" }}>API gateway</b></div>
              <div className="vb" style={{ ["--d" as string]: ".5s" }} />
              <div className="st"><span className="lab">6 Go services</span><div className="sq">{[0, 1, 2, 3, 4, 5].map((n) => <i key={n} />)}</div></div>
              <div className="vb" style={{ ["--d" as string]: "1s" }} />
              <div className="st"><b style={{ font: "600 14px var(--mono)" }}>PostgreSQL</b><div className="lab" style={{ marginTop: 6, letterSpacing: ".04em" }}>self-hosted · 2 off-site backups</div></div>
              <div className="vb up" style={{ ["--d" as string]: ".3s" }} />
              <div className="st"><span className="lab">6 agents · a person approves</span><div className="row">{AGENTS.map((a) => <span key={a}>{a}</span>)}</div></div>
            </div>
          </div>
          <div className="ar-note">
            <span><b>Gateway + 6</b> Go services in production</span>
            <span><b>Self-hosted</b> Postgres, 2 off-site backups</span>
            <span><b>Nothing</b> customer-facing changes without a person</span>
          </div>
        </div>
      </div>
    </section>
  );
}
