import type { CSSProperties, ReactNode } from "react";
import type { Img } from "@/config/media";
import { STATUS_LABEL, type Status } from "@/config/work";

/**
 * Brand mark: a terminal prompt (chevron + cursor) on a cyan rounded tile. Solid fills and no ids, so it can appear more than once.
 * The same numbers live in scripts/brand/mark.mjs, which also builds the favicon and app icons (node scripts/brand/build-icons.mjs).
 */
export function Mark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Jeremia Axelano">
      <rect width="64" height="64" rx="15" fill="#2dd4e8" />
      <g fill="none" stroke="#031018" strokeWidth="7.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20.5L34 32L20 43.5" />
        <path d="M39 46H50" />
      </g>
    </svg>
  );
}

/** Tool or brand mark from the shared sprite (Simple Icons, CC0). */
export function Logo({ id }: { id: string }) {
  return (
    <svg className="logo-i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <use href={`/logos/sprite.svg#${id}`} />
    </svg>
  );
}

export function StatusPill({ status, label }: { status: Status | "build" | "internal"; label?: string }) {
  return <span className={`pill ${status}`}>{label ?? STATUS_LABEL[status as Status]}</span>;
}

/** Phone: the screen takes the screenshot's own aspect ratio, so the whole screen is always visible. */
export function PhoneFrame({ img, width, sd, priority, low, alt = "", className = "", style: extra }: { img: Img; width?: number; sd?: number; priority?: boolean; low?: boolean; alt?: string; className?: string; style?: CSSProperties }) {
  const style = { ...(width ? { "--w": `${width}px` } : {}), ...(sd ? { "--sd": `${sd}s` } : {}), ...extra } as CSSProperties;
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="scr">
        <div className="sb">
          <span>9:41</span>
          <i />
        </div>
        <img src={img.src} width={img.w} height={img.h} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={low ? "low" : undefined} />
      </div>
    </div>
  );
}

/** Browser: 16:10 captures shown whole. */
export function BrowserFrame({ img, url, alt = "", priority, className = "" }: { img: Img; url: string; alt?: string; priority?: boolean; className?: string }) {
  return (
    <div className={`bw ${className}`}>
      <b>
        <i />
        <i />
        <i />
        <span>{url}</span>
      </b>
      <img src={img.src} width={img.w} height={img.h} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

/** Seamless loop: the set is rendered twice and the track moves by half its width. Pure CSS. */
export function Marquee({ items, speed = 40, reverse, gap = 24, vertical, className = "" }: { items: ReactNode[]; speed?: number; reverse?: boolean; gap?: number; vertical?: boolean; className?: string }) {
  const set = (clone: boolean) =>
    items.map((n, i) => (
      <div key={`${clone ? "c" : "o"}${i}`} className="mq-i" aria-hidden={clone || undefined}>
        {n}
      </div>
    ));
  return (
    <div className={`${vertical ? "mq-y" : "mq"} ${className}`} data-dir={reverse ? "rev" : undefined} data-pausable style={{ "--dur": `${speed}s`, "--g": `${gap}px` } as CSSProperties}>
      <div className="mq-track">
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}

/**
 * Letters whose weight rises and falls in a wave (Outfit Variable has a real weight axis).
 * It re-lays the text every frame, so keep it to one short word. Off on phones and with reduced motion.
 */
export function WeightWave({ text }: { text: string }) {
  return (
    <span className="vw" aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden="true" style={{ ["--i" as string]: i }}>
          {c}
        </span>
      ))}
    </span>
  );
}
