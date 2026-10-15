/* Real touch swipes (Chrome DevTools Protocol) over the interactive areas: the page must scroll when a finger starts on them.
   window.scrollTo cannot find scroll traps; a touch gesture can.
   usage: node scripts/qa/swipe.mjs <url> [selector,selector,...] */
import { chromium, devices } from 'playwright';

const url = process.argv[2] || 'http://localhost:3100/';
const SELS = (process.argv[3] || '.tm-body,.rl,.at-globe,.sg-view,.sg-tabs,.tls,.ag-log,.bd-fl,.wl-box,.sg-fan,.ct-card,.bn-orbit,.bd-grid,.ar-m,.pipe').split(',');
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 14'] });
await ctx.addInitScript(() => { try { sessionStorage.setItem('ax-seen', '1'); } catch (e) { /* storage blocked */ } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' }); // smooth scrolling would confuse the before/after reading
const cdp = await ctx.newCDPSession(page);
let stuck = 0;
for (const sel of SELS) {
  const found = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: scrollY + r.top + r.height / 2 - innerHeight / 2, behavior: 'instant' });
    return true;
  }, sel);
  if (!found) { console.log(sel.padEnd(12), 'not present at this width'); continue; }
  await page.waitForTimeout(500);
  const pt = await page.evaluate((s) => {
    const r = document.querySelector(s).getBoundingClientRect();
    return { x: Math.min(370, Math.max(20, r.left + r.width / 2)), y: Math.min(740, Math.max(140, r.top + r.height / 2)) };
  }, sel);
  const y0 = await page.evaluate(() => scrollY);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: pt.x, y: pt.y }] });
  for (let i = 1; i <= 10; i++) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: pt.x, y: pt.y - i * 24 }] });
    await page.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(600);
  const y1 = await page.evaluate(() => scrollY);
  const ok = y1 > y0 + 50;
  if (!ok) stuck++;
  console.log(sel.padEnd(12), y0, '->', y1, ok ? 'OK' : 'STUCK');
}
console.log('stuck count:', stuck);
await browser.close();
process.exit(stuck ? 1 : 0);
