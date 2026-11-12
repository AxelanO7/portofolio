/**
 * Motion preference. Moving content stops when the system asks for reduced motion (prefers-reduced-motion)
 * or when the visitor flips the page's own "Pause motion" switch (class .still on <html>, remembered in localStorage).
 * Components read isStill() each time they would start or continue something, so the switch works while the page is open.
 */
const KEY = "ax-still";
export const STILL_EV = "ax:still";

let mq: MediaQueryList | null = null;

/** The system setting alone. */
export function reducedOS(): boolean {
  if (typeof window === "undefined") return false;
  mq = mq || window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
}

/** True when nothing should move on its own: system setting or the page switch. */
export function isStill(): boolean {
  if (typeof document === "undefined") return false;
  return reducedOS() || document.documentElement.classList.contains("still");
}

/** The page switch only (what the toggle button shows). */
export function switchedOff(): boolean {
  return typeof document !== "undefined" && document.documentElement.classList.contains("still");
}

export function setStill(on: boolean) {
  document.documentElement.classList.toggle("still", on);
  try {
    if (on) window.localStorage.setItem(KEY, "1");
    else window.localStorage.removeItem(KEY);
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new CustomEvent(STILL_EV, { detail: on }));
}

/** Apply the remembered choice (call early on the client, before components read isStill()). */
export function restoreStill() {
  try {
    if (window.localStorage.getItem(KEY) === "1") document.documentElement.classList.add("still");
  } catch {
    /* storage blocked */
  }
}
