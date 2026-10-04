import { ARSENAL } from "@/config/arsenal";

/**
 * Static galaxy drawn from the same arsenal data. It renders on the server, so the
 * stage is never empty while three.js downloads, then fades out once WebGL is ready.
 */
export default function GalaxyPlaceholder({ ready }: { ready: boolean }) {
  const dots: { x: number; y: number; c: string; r: number }[] = [];
  ARSENAL.forEach((a, k) => {
    a.tools.forEach((_, j) => {
      const rr = 1.3 + j * 0.3;
      const ang = k * ((2 * Math.PI) / ARSENAL.length) + rr * 0.5;
      dots.push({ x: +(rr * Math.cos(ang) * 17).toFixed(1), y: +(rr * Math.sin(ang) * 17 * 0.72).toFixed(1), c: a.color, r: 1.7 + (j % 3) * 0.25 });
    });
  });
  return (
    <svg aria-hidden className="ph3d" data-ready={ready} viewBox="-100 -82 200 164" preserveAspectRatio="xMidYMid meet">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.85} />
      ))}
      <circle cx="0" cy="0" r="4.2" fill="#f4c97a" />
    </svg>
  );
}
