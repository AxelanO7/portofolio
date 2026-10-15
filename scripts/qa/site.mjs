/* Console errors, failed requests, third-party requests and sideways overflow, on desktop, an iPhone 14 profile and WebKit.
   usage: node scripts/qa/site.mjs <url> [--mode d|m|w|all] [--shots <dir>]
   setup: npm i --no-save playwright && npx playwright install chromium webkit */
import { chromium, webkit, devices } from 'playwright';

const args = process.argv.slice(2);
const flag = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const url = args.find((a) => /^https?:/.test(a)) || 'http://localhost:3100/';
const mode = flag('--mode', 'all');
const shots = flag('--shots', '');
const host = new URL(url).host;

async function run(name, engine, opts) {
  const browser = await engine.launch();
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(() => { try { sessionStorage.setItem('ax-seen', '1'); } catch (e) { /* storage blocked */ } }); // skip the intro
  const page = await ctx.newPage();
  const errs = [], bad = [], external = new Set();
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errs.push('PAGEERR ' + e.message.slice(0, 220)));
  page.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url().slice(0, 100)); });
  page.on('request', (r) => {
    try {
      const h = new URL(r.url()).host;
      if (h && h !== host && !/^(data|blob):/.test(r.url())) external.add(h);
    } catch (e) { /* not a url */ }
  });
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(1500);
  // walk the page once so lazy blocks mount and reveal-on-view fires
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = opts.viewport ? opts.viewport.height : 844;
  for (let y = 0; y < H; y += Math.floor(vh * 0.7)) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(220); }
  await page.waitForTimeout(800);
  await page.evaluate(() => scrollTo(0, 0));
  if (shots) await page.screenshot({ path: `${shots}/${name}-full.png`, fullPage: true });
  const m = await page.evaluate(() => {
    const cw = document.documentElement.clientWidth;
    return {
      scrollWidth: document.documentElement.scrollWidth, clientWidth: cw, height: document.documentElement.scrollHeight,
      // elements that stick out past the viewport and are not clipped by an overflow container below <body> (those would be cut off or scrollable)
      wide: [...document.querySelectorAll('body *')]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          if (r.right <= cw + 2 || r.width === 0 || getComputedStyle(e).position === 'fixed') return false;
          for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) {
            const o = getComputedStyle(p).overflowX;
            if (o !== 'visible' && p.getBoundingClientRect().right <= cw + 2) return false;
          }
          return true;
        })
        .slice(0, 6).map((e) => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 30)),
      fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/"/g, '')).filter((v, i, a) => a.indexOf(v) === i),
    };
  });
  const pass = !errs.length && !bad.length && m.scrollWidth <= m.clientWidth && !m.wide.length && !external.size;
  console.log(pass ? 'PASS' : 'CHECK', name, JSON.stringify({ ...m, errs, bad: [...new Set(bad)].slice(0, 8), external: [...external] }));
  await browser.close();
}

if (mode === 'all' || mode === 'd') await run('desktop', chromium, { viewport: { width: 1440, height: 900 } });
if (mode === 'all' || mode === 'm') await run('iphone', chromium, { ...devices['iPhone 14'] });
if (mode === 'all' || mode === 'w') await run('webkit', webkit, { ...devices['iPhone 14'] });
