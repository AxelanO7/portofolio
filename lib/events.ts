/** Tiny event bus so separate client components can talk without shared state. */
export const EV = {
  palette: "ax:palette",
  reel: "ax:reel",
  term: "ax:term",
  builds: "ax:builds",
  copy: "ax:copy",
} as const;

export function emit(name: string, detail?: unknown) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}
