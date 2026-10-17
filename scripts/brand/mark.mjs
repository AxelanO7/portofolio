// Single source of truth for the brand mark (2026-10-18): a terminal prompt (chevron + cursor) on a cyan rounded tile.
// The React <Mark /> in components/ui.tsx and the intro in components/intro.tsx carry the same numbers; change all together.
export const C = { cy: '#2dd4e8', ink: '#031018', bg: '#050f16' };
export const TILE = { rx: 15 };
export const CHEVRON = 'M20 20.5L34 32L20 43.5';
export const CURSOR = 'M39 46H50';
export const STROKE = 7.2;

export const tileInner = () =>
  `<rect width="64" height="64" rx="${TILE.rx}" fill="${C.cy}"/>` +
  `<g fill="none" stroke="${C.ink}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"><path d="${CHEVRON}"/><path d="${CURSOR}"/></g>`;

export const svgWrap = (inner, size = 64, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}"${extra}>${inner}</svg>`;

/** the tile on a square canvas: `plate` px wide, centred, optional solid background */
export function iconSvg({ canvas, plate, bg = null }) {
  const s = plate / 64, off = (canvas - plate) / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas} ${canvas}" width="${canvas}" height="${canvas}">` +
    (bg ? `<rect width="${canvas}" height="${canvas}" fill="${bg}"/>` : '') +
    `<g transform="translate(${off} ${off}) scale(${s})">${tileInner()}</g></svg>`
  );
}
