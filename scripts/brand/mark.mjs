// Single source of truth for the JA mark (2026-10-16 redesign).
// A cyan plate with two cut corners, a heavy JA in dark ink, and a coral "live" dot sitting in the top-right cut.
// Everything is generated from the numbers in this file: SVG files, React components, intro paths, PNG icons, favicon, OG patch.

export const C = { cy: '#2dd4e8', gold: '#e9c27d', ink: '#031018', coral: '#ff7b5c', bg: '#050f16', bg1: '#0a1c28' };

const f = (n) => +n.toFixed(2);
const SQ2 = Math.SQRT2;

/** The letters, built from three round-capped strokes. cx/cy is the centre of the glyph's own bounding box. */
export const G = { top: 10.5, base: 54.6, ax: 35, half: 13, jx: 15.5, jend: 6.2, barY: 40.5, w: 8.5, barW: 6.8, cx: 27.1, cy: 32.55 };

/** Plate: 64x64, top-right and bottom-left corners cut by CUT, every corner softened by R (stroke trick, so the outer shape is exact). */
export const PLATE = { cut: 16, r: 3.2 };
/** Where the glyph sits inside the plate, and the live dot (centre and radius) in the top-right cut. */
export const PLACE = { k: 0.8, x: 32, y: 32.8 };
export const DOT = { x: 60.2, y: 3.8, r: 3.1 };

export function glyphPaths() {
  const { top, base, ax, half, jx, jend, barY, w } = G;
  const t = (barY - top) / (base - top);
  const inset = w * 0.55; // keeps the crossbar's round caps hidden inside the legs
  return {
    j: `M${jx} ${top}V${f(base - 15)}C${jx} ${f(base - 6)} ${f(jx - 3.5)} ${f(base - 2.4)} ${jend} ${f(base - 2.6)}`,
    a: `M${ax - half} ${base}L${ax} ${top}L${ax + half} ${base}`,
    bar: `M${f(ax - half * t + inset)} ${barY}H${f(ax + half * t - inset)}`,
  };
}

export function platePoints({ cut, r } = PLATE) {
  const p = [
    [r, r],
    [64 - cut - r * SQ2 + r, r],
    [64 - r, cut + r * (SQ2 - 1)],
    [64 - r, 64 - r],
    [cut + r * SQ2 - r, 64 - r],
    [r, 64 - cut - r * (SQ2 - 1)],
  ];
  return p.map(([x, y]) => `${f(x)},${f(y)}`).join(' ');
}

const glyphTransform = () => `translate(${PLACE.x} ${PLACE.y}) scale(${PLACE.k}) translate(${-G.cx} ${-G.cy})`;

/** SVG body (no <svg> wrapper) of the primary mark on a 64x64 grid. */
export function tileInner() {
  const g = glyphPaths();
  return (
    `<polygon points="${platePoints()}" fill="${C.cy}" stroke="${C.cy}" stroke-width="${PLATE.r * 2}" stroke-linejoin="round"/>` +
    `<g transform="${glyphTransform()}" fill="none" stroke="${C.ink}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${G.w}">` +
    `<path d="${g.j}"/><path d="${g.a}"/><path d="${g.bar}" stroke-width="${G.barW}"/></g>` +
    `<circle cx="${DOT.x}" cy="${DOT.y}" r="${DOT.r}" fill="${C.coral}"/>`
  );
}

/** Dark alternate (outlined plate, two-tone letters) for places where a solid cyan block would be too loud. */
export function darkInner() {
  const g = glyphPaths();
  const r = 2.6;
  const pts = platePoints({ cut: PLATE.cut, r });
  return (
    `<polygon points="${pts}" fill="${C.bg1}" stroke="${C.cy}" stroke-width="${r * 2}" stroke-linejoin="round" paint-order="stroke"/>` +
    `<polygon points="${pts}" fill="${C.bg1}"/>` +
    `<g transform="${glyphTransform()}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="${G.w}">` +
    `<path d="${g.j}" stroke="${C.cy}"/><path d="${g.a}" stroke="${C.gold}"/><path d="${g.bar}" stroke="${C.gold}" stroke-width="${G.barW}"/></g>` +
    `<circle cx="${DOT.x}" cy="${DOT.y}" r="${DOT.r}" fill="${C.coral}"/>`
  );
}

export const svgWrap = (inner, size = 64, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}"${extra}>${inner}</svg>`;

/** The mark placed on a square canvas: `plate` px wide, centred, optional solid background. */
export function iconSvg({ canvas, plate, bg = null }) {
  const s = plate / 64;
  const off = (canvas - plate) / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas} ${canvas}" width="${canvas}" height="${canvas}">` +
    (bg ? `<rect width="${canvas}" height="${canvas}" fill="${bg}"/>` : '') +
    `<g transform="translate(${f(off)} ${f(off)}) scale(${f(s)})">${tileInner()}</g></svg>`
  );
}

/** Intro: the bare letters drawn on the dark overlay (150x110 box), then the dot pops. Same glyph, scaled. */
export function introGeometry({ k = 1.45, cx = 75, cy = 55 } = {}) {
  const { top, base, ax, half, jx, jend, barY, w } = G;
  const X = (x) => f((x - G.cx) * k + cx);
  const Y = (y) => f((y - G.cy) * k + cy);
  const t = (barY - top) / (base - top);
  const inset = w * 0.55;
  return {
    j: `M${X(jx)} ${Y(top)}V${Y(base - 15)}C${X(jx)} ${Y(base - 6)} ${X(jx - 3.5)} ${Y(base - 2.4)} ${X(jend)} ${Y(base - 2.6)}`,
    a: `M${X(ax - half)} ${Y(base)}L${X(ax)} ${Y(top)}L${X(ax + half)} ${Y(base)}`,
    bar: `M${X(ax - half * t + inset)} ${Y(barY)}H${X(ax + half * t - inset)}`,
    dot: { x: f(X(ax) + 27), y: f(Y(top) - 6), r: f((DOT.r / PLACE.k) * k) },
    stroke: f(w * k),
    barStroke: f(G.barW * k),
  };
}
