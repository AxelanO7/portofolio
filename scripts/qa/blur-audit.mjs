/* Finds images drawn larger than their own pixels (the cause of "blurry" screenshots).
   For every <img>: natural width / (css width x device pixel ratio). Below 0.9 means the browser has to upscale it.
   usage: node scripts/qa/blur-audit.mjs <url> [d|m|both]
   Note: a block scaled down with transform (the wall of screens on phones) shows up here but is not blurry. */
import { chromium, devices } from 'playwright';

const url = process.argv[2] || 'http://localhost:3100/';
const mode = process.argv[3] || 'both';
const browser = await chromium.launch();

async function audit(name, opts) {
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(() => { try { sessionStorage.setItem('ax-seen', '1'); } catch (e) { /* storage blocked */ } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = opts.viewport ? opts.viewport.height : 844;
  for (let y = 0; y < H; y += Math.floor(vh * 0.6)) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(200); }
  await page.waitForTimeout(800);
  const rows = await page.evaluate(() => {
    const dpr = devicePixelRatio, out = [];
    document.querySelectorAll('img').forEach((i) => {
      if (i.closest('.hr-bg')) return; // the hero photo sits under a dark gradient on purpose
      if (!i.complete || !i.naturalWidth || i.offsetWidth < 2) return;
      out.push({ src: (i.currentSrc || i.src).split('/').slice(-2).join('/'), nat: `${i.naturalWidth}x${i.naturalHeight}`, css: `${Math.round(i.offsetWidth)}x${Math.round(i.offsetHeight)}`, ratio: +(i.naturalWidth / (i.offsetWidth * dpr)).toFixed(2) });
    });
    return out;
  });
  const seen = new Set();
  const bad = rows.filter((r) => r.ratio < 0.9).filter((r) => { const k = r.src + r.css; if (seen.has(k)) return false; seen.add(k); return true; });
  console.log(`== ${name}: ${rows.length} images, below 0.9 of needed pixels: ${bad.length}`);
  bad.sort((a, b) => a.ratio - b.ratio).slice(0, 40).forEach((r) => console.log(`  ${String(r.ratio).padEnd(5)} ${r.src.padEnd(38)} natural ${r.nat.padEnd(10)} shown ${r.css}`));
  await ctx.close();
}

if (mode === 'both' || mode === 'd') await audit('desktop 1440 @2x', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
if (mode === 'both' || mode === 'm') await audit('iPhone 14 @3x', { ...devices['iPhone 14'] });
await browser.close();
