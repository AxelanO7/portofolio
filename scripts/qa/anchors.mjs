/* Every nav link must land its section just under the sticky header (about 76 px from the top), also after a smooth scroll.
   usage: node scripts/qa/anchors.mjs <url> [id,id,...]   (default ids are read from the desktop nav) */
import { chromium, devices } from 'playwright';

const url = process.argv[2] || 'http://localhost:3100/?nointro';
const browser = await chromium.launch();
for (const [name, opts] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['iphone', { ...devices['iPhone 14'] }]]) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const ids = process.argv[3] ? process.argv[3].split(',') : await page.evaluate(() => [...document.querySelectorAll('.np a[data-id]')].map((a) => a.dataset.id));
  const rows = [];
  for (const id of ids) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(300);
    await page.evaluate((i) => document.getElementById(i).scrollIntoView({ behavior: 'smooth' }), id);
    await page.waitForTimeout(2200);
    rows.push(`${id}:${await page.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id)}`);
  }
  console.log(name.padEnd(8), 'top offset after the jump (want about 76):', rows.join('  '));
  await ctx.close();
}
await browser.close();
