/* Draws the share image of every case page: public/og/<id>.jpg (1200x630), in the look of the site (same colours, Outfit, face tile).
   The words come from config/cases.ts and config/work.ts, so a card cannot say something the page does not. Node 24 reads those .ts files directly.
   usage:  node scripts/og/cases.mjs [id ...]
   setup:  npm i --no-save playwright && npx playwright install chromium   (sharp is already a dependency)
           or point PLAYWRIGHT=/path/to/playwright/index.mjs at a copy installed elsewhere.
   After a change, bump the ?v= in caseImage() (lib/seo.ts) so social networks fetch the new picture. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (rel) => fs.readFileSync(path.join(root, rel));
const b64 = (rel) => read(rel).toString('base64');
const load = (rel) => import(pathToFileURL(path.join(root, rel)).href);

const { chromium } = await import(process.env.PLAYWRIGHT ? pathToFileURL(process.env.PLAYWRIGHT).href : 'playwright');
const { CASES } = await load('config/cases.ts');
const { AGENTS_DAILY, STATUS_LABEL } = await load('config/work.ts');
const host = /SITE_URL = "https?:\/\/([^"]+)"/.exec(read('config/site.ts').toString())[1];

/** The one number on each card, with the words under it. Sizes are tuned per length. */
const CARD = {
  seo: { stat: '328<svg viewBox="0 0 64 40"><path d="M2 20h54M40 4l18 16-18 16"/></svg>70', size: 120, label: 'sitemap URLs', hl: 'rebuilt' },
  agents: { stat: String(AGENTS_DAILY), size: 200, label: 'agents in daily use', hl: 'run the company' },
  city: { stat: '1,700+', size: 120, label: 'events staged in dev', hl: 'from a spreadsheet' },
};

const font = (family, file, weight) =>
  `@font-face{font-family:"${family}";font-weight:${weight};src:url(data:font/woff2;base64,${b64(file)}) format("woff2")}`;

const FONTS = [
  font('Outfit', 'node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2', '100 900'),
  font('JetBrains Mono', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', 500),
  font('Inter', 'node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2', 500),
].join('');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// the site shows "328 → 70"; Outfit has no arrow glyph, so the sentence says "to" instead
const plain = (s) => esc(s.replace(/\s*→\s*/g, ' to '));

function page(c) {
  const k = CARD[c.id];
  const i = k.hl ? c.title.indexOf(k.hl) : -1;
  const title = i < 0 ? esc(c.title) : `${esc(c.title.slice(0, i))}<em>${esc(k.hl)}</em>${esc(c.title.slice(i + k.hl.length))}`;
  return `<!doctype html><meta charset="utf-8"><style>
${FONTS}
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;overflow:hidden;background:#050f16}
body{position:relative;color:#e8f1f6;font:500 22px/1.4 Inter,sans-serif;
  background:
    radial-gradient(760px 420px at 94% 4%,rgba(45,212,232,.17),transparent 62%),
    radial-gradient(640px 380px at 4% 100%,rgba(233,194,125,.10),transparent 64%),
    radial-gradient(rgba(150,200,225,.10) 1.2px,transparent 1.3px) 0 0/30px 30px,#050f16}
.hd{position:absolute;left:64px;right:64px;top:50px;display:flex;align-items:center;gap:20px}
.mark{width:68px;height:68px;padding:6px;border-radius:23%;background:#2dd4e8}
.mark img{display:block;width:100%;height:100%;border-radius:17%;object-fit:cover}
.nm{font:700 32px/1 Outfit;letter-spacing:-.02em}
.sp{flex:1}
.tag{font:500 17px/1 'JetBrains Mono';letter-spacing:.14em;text-transform:uppercase;padding:11px 16px;border-radius:99px;border:1px solid rgba(150,200,225,.28);color:#9bb1be;background:rgba(9,21,30,.8)}
.tag.live{color:#4fe0bd;border-color:rgba(79,224,189,.45)}
.tag.build{color:#e9c27d;border-color:rgba(233,194,125,.45)}
.mid{position:absolute;left:64px;right:64px;top:150px;bottom:112px;display:flex;align-items:center;justify-content:space-between;gap:44px}
.ti{flex:1;min-width:0}
h1{font:800 88px/1.02 Outfit;letter-spacing:-.038em;text-wrap:balance}
h1 em{font-style:normal;background:linear-gradient(100deg,#e9c27d 20%,#fbe3b0 48%,#d9a85c 82%);-webkit-background-clip:text;background-clip:text;color:transparent}
.re{margin-top:28px;max-width:600px;font:500 27px/1.38 Inter;color:#9bb1be}
.st{flex:none;width:384px;height:330px;padding:30px 30px;border-radius:26px;border:1px solid rgba(150,200,225,.28);background:rgba(9,21,30,.82);display:flex;flex-direction:column;justify-content:center;gap:16px}
.st b{display:flex;align-items:center;gap:10px;font:800 ${k.size}px/1 Outfit;letter-spacing:-.045em;white-space:nowrap;background:linear-gradient(100deg,#e9c27d 20%,#fbe3b0 48%,#d9a85c 82%);-webkit-background-clip:text;background-clip:text;color:transparent}
.st b svg{width:.5em;height:.32em;flex:none;fill:none;stroke:#e9c27d;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.st span{font:500 21px/1.25 'JetBrains Mono';letter-spacing:.1em;text-transform:uppercase;color:#2dd4e8}
.ft{position:absolute;left:64px;bottom:46px;display:flex;align-items:center;gap:14px;font:500 27px/1 'JetBrains Mono';color:#2dd4e8}
.ft i{width:12px;height:12px;border-radius:50%;background:#4fe0bd}
</style>
<div class="hd"><span class="mark"><img src="data:image/webp;base64,${b64('public/me.webp')}"></span><span class="nm">Jeremia Axelano</span><span class="sp"></span><span class="tag">Case study</span><span class="tag ${c.status}">${esc(STATUS_LABEL[c.status])}</span></div>
<div class="mid"><div class="ti"><h1>${title}</h1><p class="re">${plain(c.result)}</p></div>
<div class="st"><b>${k.stat}</b><span>${esc(k.label)}</span></div></div>
<div class="ft"><i></i>${esc(host)}/cases/${esc(c.id)}</div>`;
}

const only = process.argv.slice(2);
fs.mkdirSync(path.join(root, 'public/og'), { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const tab = await ctx.newPage();
for (const c of CASES.filter((x) => !only.length || only.includes(x.id))) {
  if (!CARD[c.id]) { console.log('skip', c.id, '(no card defined)'); continue; }
  await tab.setContent(page(c), { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  const ok = await tab.evaluate(() => document.fonts.check('800 40px Outfit') && document.fonts.check('500 20px "JetBrains Mono"'));
  if (!ok) throw new Error('fonts did not load for ' + c.id);
  await tab.evaluate(() => {
    const b = document.querySelector('.st b');
    let size = parseFloat(getComputedStyle(b).fontSize);
    while (b.scrollWidth > b.clientWidth && size > 40) b.style.fontSize = `${(size -= 2)}px`;
  });
  const png = await tab.screenshot({ type: 'png' });
  const out = path.join(root, 'public/og', `${c.id}.jpg`);
  const jpg = await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
  fs.writeFileSync(out, jpg);
  console.log('wrote', path.relative(root, out), Math.round(jpg.length / 1024) + ' KB');
}
await browser.close();
