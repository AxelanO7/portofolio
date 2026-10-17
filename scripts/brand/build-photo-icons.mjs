/* Photo mark (2026-10-18): the face, cropped square, cut to the same two-corner plate as the old JA tile, plus the coral live dot.
   Writes public/me.webp (nav/footer image) and app/icon.png, app/favicon.ico, app/apple-icon.png, public/icon-*.png (old icon.svg/logo.svg removed).
   usage: node scripts/brand/build-photo-icons.mjs   (source photo: scripts/brand/me-src.webp, 288x288) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { C, platePoints, DOT } from './mark.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const put = (rel, data) => fs.writeFileSync(path.join(root, rel), data);
const src = path.join(here, 'me-src.webp');

// square crop around the face (source is 288 px)
const CROP = { left: 58, top: 40, width: 176, height: 176 };
const face = (px) => sharp(src).extract(CROP).resize(px, px, { kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).toBuffer();

/** plate geometry shared by the PNG compositor and the SVG file */
const geo = ({ canvas, plate }) => {
  const s = plate / 64, off = (canvas - plate) / 2;
  return { s, off, pts: platePoints({ cut: 16, r: 3.2 }), ring: Math.max(1, plate * 0.045) };
};
const plateSvg = (g, inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="CANVAS" height="CANVAS" viewBox="0 0 CANVAS CANVAS">${inner}</svg>`;
const polyAttrs = (g) => `points="${g.pts}" transform="translate(${g.off} ${g.off}) scale(${g.s})" stroke-linejoin="round"`;

/** PNG: photo masked to the plate, cyan ring, coral dot in the top-right cut */
async function icon({ canvas, plate, bg = null, dot = true }) {
  const g = geo({ canvas, plate });
  const wrap = (inner) => plateSvg(g, inner).replaceAll('CANVAS', canvas);
  const mask = Buffer.from(wrap(`<polygon ${polyAttrs(g)} fill="#fff" stroke="#fff" stroke-width="1.6"/>`));
  const photo = await sharp(await face(plate)).extend({ top: Math.round(g.off), left: Math.round(g.off), bottom: canvas - plate - Math.round(g.off), right: canvas - plate - Math.round(g.off), background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().png().toBuffer();
  const masked = await sharp(photo).composite([{ input: await sharp(mask).png().toBuffer(), blend: 'dest-in' }]).png().toBuffer();
  const ring = wrap(`<polygon ${polyAttrs(g)} fill="${C.cy}" stroke="${C.cy}" stroke-width="6.4"/>`);
  const cx = g.off + DOT.x * g.s, cy = g.off + DOT.y * g.s, r = DOT.r * g.s;
  const dotSvg = wrap(dot ? `<circle cx="${cx}" cy="${cy}" r="${r * 1.3}" fill="${bg || C.bg}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.coral}"/>` : '');
  const layers = [];
  if (bg) layers.push({ input: await sharp({ create: { width: canvas, height: canvas, channels: 4, background: bg } }).png().toBuffer() });
  // ring first (outer stroke), then the masked photo covers its inner half, leaving a clean cyan edge
  layers.push({ input: await sharp(Buffer.from(ring)).png().toBuffer() }, { input: masked }, { input: await sharp(Buffer.from(dotSvg)).png().toBuffer() });
  return sharp({ create: { width: canvas, height: canvas, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(layers).png({ compressionLevel: 9 }).toBuffer();
}

const png = async (b) => b;

put('public/me.webp', await sharp(src).extract(CROP).resize(160, 160, { kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).webp({ quality: 88 }).toBuffer());
fs.rmSync(path.join(root, 'app/icon.svg'), { force: true });
fs.rmSync(path.join(root, 'public/logo.svg'), { force: true });
put('app/icon.png', await icon({ canvas: 192, plate: 176 }));
put('app/apple-icon.png', await png(await icon({ canvas: 180, plate: 140, bg: C.bg })));
put('public/icon-192.png', await png(await icon({ canvas: 192, plate: 176 })));
put('public/icon-512.png', await png(await icon({ canvas: 512, plate: 470 })));
put('public/icon-maskable-512.png', await png(await icon({ canvas: 512, plate: 300, bg: C.bg })));

const sizes = [16, 32, 48];
const entries = await Promise.all(sizes.map(async (size) => ({ size, buf: await png(await icon({ canvas: size, plate: size, dot: size >= 32 })) })));
const head = Buffer.alloc(6);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(entries.length, 4);
let offset = 6 + 16 * entries.length;
const dir = entries.map(({ size, buf }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0); e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
put('app/favicon.ico', Buffer.concat([head, ...dir, ...entries.map((e) => e.buf)]));
console.log('photo icons written');
