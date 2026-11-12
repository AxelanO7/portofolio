/**
 * The prompt mark draws itself, the name settles in, a cyan curtain lifts (about 1.65 s, no fake progress). Home page only, once per session.
 * Plain markup: the timeline is CSS (styles/fx.css) and the head script in app/layout.tsx switches it on, marks the session and handles the skip
 * (tap, click or any key), so the curtain never waits for hydration. The hero is already painted underneath.
 */
export default function Intro() {
  return (
    <div className="ld" id="ld" aria-hidden="true">
      <div className="ld-c" />
      <div className="ld-in">
        <svg viewBox="0 0 64 64">
          <rect className="tile" width="64" height="64" rx="15" />
          <path pathLength={1} d="M20 20.5L34 32L20 43.5" />
          <path pathLength={1} className="cur" d="M39 46H50" />
        </svg>
        <div className="ld-t">Jeremia Axelano</div>
        <div className="ld-s">CTO · Bali</div>
      </div>
    </div>
  );
}
