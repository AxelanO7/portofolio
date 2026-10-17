import type { CSSProperties, ReactNode } from "react";
import type { Img } from "@/config/media";
import { STATUS_LABEL, type Status } from "@/config/work";

/**
 * Photo mark: the face on a cyan plate with two cut corners and a coral "live" dot in the top-right cut.
 * Plain CSS clip-path (see .mark in styles/top.css), so it can appear many times on a page. The favicon and app icons come from
 * the same photo: node scripts/brand/build-photo-icons.mjs.
 */
export function Mark({ size = 40 }: { size?: number }) {
  return (
    <span className="mark" style={{ width: size, height: size }}>
      <img src="/me.webp" alt="Jeremia Axelano" width={size} height={size} decoding="async" />
      <i aria-hidden="true" />
    </span>
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
