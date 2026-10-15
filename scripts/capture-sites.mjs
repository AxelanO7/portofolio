/* Capture live sites at 1440x900 @2x and save them as 16:10 WebP, so a browser frame never crops and nothing is upscaled.
   usage: node scripts/capture-sites.mjs <sites.json> <outDir> [concurrency=4]
   setup: npm i --no-save playwright && npx playwright install chromium   (sharp is already a dependency)
   sites.json: [{ "slug": "my-site", "url": "https://example.com", "wait": 4500, "width": 800, "q": 80 }]  (wait, width, q are optional) */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const [, , listFile, outDir, conc = '4'] = process.argv;
if (!listFile || !outDir) { console.error('usage: node scripts/capture-sites.mjs <sites.json> <outDir> [concurrency]'); process.exit(1); }
const sites = JSON.parse(fs.readFileSync(listFile, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const log = [];

async function one(s) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto(s.url, { waitUntil: 'load', timeout: 40000 });
      await page.waitForTimeout(s.wait || 4500); // let intros and fonts settle
      const png = await page.screenshot({ type: 'png' });
      const w = s.width || 800;
      await sharp(png).resize(w, Math.round((w * 900) / 1440), { kernel: 'lanczos3' }).webp({ quality: s.q || 80, effort: 6 }).toFile(path.join(outDir, s.slug + '.webp'));
      log.push({ slug: s.slug, ok: true });
      console.log('ok  ', s.slug);
      await ctx.close();
      return;
    } catch (e) {
      console.log('fail', s.slug, attempt, String(e.message).slice(0, 80));
      await ctx.close();
      if (attempt === 2) log.push({ slug: s.slug, ok: false, err: String(e.message).slice(0, 120) });
    }
  }
}

const queue = sites.slice();
await Promise.all(Array.from({ length: +conc }, async () => { while (queue.length) await one(queue.shift()); }));
fs.writeFileSync(path.join(outDir, '_log.json'), JSON.stringify(log, null, 1));
await browser.close();
console.log('done', log.filter((l) => l.ok).length, '/', log.length);
