import { CLIENTS, MOBILE, SYSTEMS, WEB3, type Item, type Status } from "./work";
import { GL_BO, gl, phone, poster, shot, type Img } from "./media";

export type BuildKind = "guestlist" | "mobile" | "client" | "system" | "web3";

export type BuildMedia =
  | { t: "shot"; img: Img }
  /** tall images side by side, each shown whole (phones, store graphics) */
  | { t: "posters"; imgs: Img[] }
  /** no real screenshot: a plain tile instead of a fake mockup */
  | { t: "tile"; initials: string; hint: string };

export interface Build {
  id: string;
  name: string;
  text: string;
  status: Status;
  kind: BuildKind;
  label?: string;
  url?: string;
  ticker?: string;
  media: BuildMedia;
}

export const KIND_LABEL: Record<BuildKind, string> = {
  guestlist: "Guestlist",
  mobile: "Mobile apps",
  client: "Clients",
  system: "Systems",
  web3: "Web3",
};

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const fromItem = (i: Item, kind: BuildKind, hint: string): Build => ({
  id: i.id,
  name: i.name,
  text: i.text,
  status: i.status,
  kind,
  label: i.label,
  url: i.url,
  ticker: i.ticker,
  media: i.img && i.img.startsWith("s-") ? { t: "shot", img: shot(i.img.replace(/-d$/, "")) } : { t: "tile", initials: initials(i.name), hint },
});

const GUESTLIST: Build[] = [
  { id: "g-web", name: "Guestlist Ticket Web", text: "Entertainment-first marketplace for nightlife, events and experiences, rebuilt and rebranded.", status: "live", kind: "guestlist", label: "guestlistticket.com", url: "https://guestlistticket.com", media: { t: "shot", img: gl("web") } },
  { id: "g-mobile", name: "Guestlist Ticket Mobile", text: "Consumer app with a dark redesign, new Home and Discover, and per-guest QR tickets.", status: "build", kind: "guestlist", media: { t: "posters", imgs: [phone("gl-home", true), phone("gl-ticket", true)] } },
  { id: "g-partner", name: "Partner App", text: "Offline-first QR check-in and a booking list for venues and promoters.", status: "build", kind: "guestlist", media: { t: "posters", imgs: [phone("pm-scan", true), phone("pm-booking", true)] } },
  { id: "g-link", name: "Link Hub", text: "Link-in-bio hub in English and Indonesian with dynamic campaign tags.", status: "live", kind: "guestlist", label: "link.guestlistticket.com", url: "https://link.guestlistticket.com", media: { t: "posters", imgs: [phone("gl-link", true)] } },
  { id: "g-landing", name: "Landing Page", text: "“Your night out, sorted.” with floating phones, a Tonight in Bali rail and store badges.", status: "live", kind: "guestlist", label: "landing.guestlistticket.com", url: "https://landing.guestlistticket.com", media: { t: "shot", img: gl("landing") } },
  { id: "g-bo", name: "Back Office", text: "About 65 admin screens for bookings, partners, affiliates, imports, analytics and error history.", status: "internal", kind: "guestlist", media: { t: "shot", img: GL_BO } },
];

const MOBILE_POSTERS: Record<string, Img[]> = {
  js1: [poster("js-app-1"), poster("js-app-2"), poster("js-app-3")],
  js2: [poster("js-partners-1"), poster("js-partners-2"), poster("js-partners-3")],
};

const MOBILE_BUILDS: Build[] = MOBILE.map((i) => {
  const b = fromItem(i, "mobile", "mobile app");
  const posters = MOBILE_POSTERS[i.id];
  return posters ? { ...b, media: { t: "posters", imgs: posters } } : { ...b, media: { t: "tile", initials: initials(i.name), hint: "mobile app" } };
});

export const BUILDS: Build[] = [
  ...GUESTLIST,
  ...MOBILE_BUILDS,
  ...CLIENTS.map((i) => fromItem(i, "client", "client site")),
  ...SYSTEMS.map((i) => ({ ...fromItem(i, "system", "full-stack system"), media: { t: "tile", initials: initials(i.name), hint: "full-stack system" } as BuildMedia })),
  ...WEB3.map((i) => fromItem(i, "web3", "web3 launch page")),
];

export const KIND_COUNT = BUILDS.reduce<Record<string, number>>((acc, b) => {
  acc[b.kind] = (acc[b.kind] || 0) + 1;
  return acc;
}, {});

/** Items with a real 16:10 capture, used for the moving rows and the wall. */
export const SHOTS = BUILDS.filter((b): b is Build & { media: { t: "shot"; img: Img } } => b.media.t === "shot");
