import clsx from "clsx";

/**
 * "JA" personal mark. Geometric monogram: an ascending peak (A) fused with a
 * descending hook (J), inside a rounded signal badge with a gradient hairline.
 * Used across nav, hero, footer, favicon, and the link-in-bio for a consistent
 * personal brand.
 */
export function Monogram({
  className,
  size = 40,
  glow = true,
}: {
  className?: string;
  size?: number;
  glow?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={clsx(className)}
      role="img"
      aria-label="Jeremia Axelano monogram"
    >
      <defs>
        <linearGradient id="ja-stroke" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a875" />
          <stop offset="1" stopColor="#8f7248" />
        </linearGradient>
        <linearGradient id="ja-glyph" x1="18" y1="16" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9a875" />
        </linearGradient>
        {glow && (
          <filter id="ja-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        )}
      </defs>

      {/* Badge */}
      <rect
        x="3"
        y="3"
        width="58"
        height="58"
        rx="16"
        stroke="url(#ja-stroke)"
        strokeWidth="1.5"
        fill="rgba(201,168,117,0.06)"
      />

      {/* Glyph: A peak + crossbar, J hook */}
      <g
        stroke="url(#ja-glyph)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={glow ? "url(#ja-blur)" : undefined}
      >
        {/* A */}
        <path d="M15 47 L26 18 L37 47" />
        <path d="M20 39 L32 39" />
        {/* J */}
        <path d="M47 18 L47 41 C47 47.5 42.5 50 37.5 48.5" />
      </g>
    </svg>
  );
}
