/* Regenerates the icon set from the numbers in mark.mjs:
     app/icon.svg, app/favicon.ico (16, 32, 48), app/apple-icon.png,
     public/logo.svg, public/icon-192.png, public/icon-512.png, public/icon-maskable-512.png
   usage: node scripts/brand/build-icons.mjs        (sharp is already a dependency) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { C, tileInner, svgWrap, iconSvg } from './mark.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const put = (rel, data) => fs.writeFileSync(path.join(root, rel), data);
const png = (svg) => sharp(Buffer.from(svg), { density: 72 }).png({ compressionLevel: 9 }).toBuffer();

const logo = svgWrap(tileInner(), 64, ' role="img" aria-label="Jeremia Axelano"') + '\n';
put('app/icon.svg', logo);
put('public/logo.svg', logo);
put('app/apple-icon.png', await png(iconSvg({ canvas: 180, plate: 128, bg: C.bg })));
put('public/icon-192.png', await png(iconSvg({ canvas: 192, plate: 176 })));
put('public/icon-512.png', await png(iconSvg({ canvas: 512, plate: 470 })));
// maskable: keep the tile inside the central 80% circle (drawn at 56% on a solid background)
put('public/icon-maskable-512.png', await png(iconSvg({ canvas: 512, plate: 288, bg: C.bg })));

const sizes = [16, 32, 48];
const entries = await Promise.all(sizes.map(async (size) => ({ size, buf: await png(iconSvg({ canvas: size, plate: size })) })));
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
console.log('icons written to app/ and public/');
