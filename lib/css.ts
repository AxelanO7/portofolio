import type { CSSProperties } from "react";

/** Inline style with custom properties, e.g. v({ "--d": ".1s" }). */
export const v = (o: Record<string, string | number>) => o as CSSProperties;
