/* Real-world loading numbers on a phone profile: iPhone 14, 1.6 Mbps down, 150 ms RTT, CPU 4x slower.
   Prints FCP, LCP, CLS and transferred KB per run and the median.
   usage: node scripts/qa/throttle.mjs <url> [runs=5] */
import { chromium, devices } from 'playwright';

const url = process.argv[2] || 'http://localhost:3100/?nointro';
const runs = +(process.argv[3] || 5);
const browser = await chromium.launch();
const res = [];
for (let i = 0; i < runs; i++) {
  const ctx = await browser.newContext({ ...devices['iPhone 14'] });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  let bytes = 0;
  cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength || 0; });
  await page.addInitScript(() => {
    window.__m = { fcp: 0, lcp: 0, cls: 0 };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__m.fcp = e.startTime; }).observe({ type: 'paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  const m = await page.evaluate(() => window.__m);
  res.push({ fcp: Math.round(m.fcp), lcp: Math.round(m.lcp), cls: +m.cls.toFixed(3), kb: Math.round(bytes / 1024) });
  await ctx.close();
}
res.sort((a, b) => a.lcp - b.lcp);
console.log(url);
res.forEach((r) => console.log('  ', JSON.stringify(r)));
const med = (k) => res.map((r) => r[k]).sort((a, b) => a - b)[Math.floor(res.length / 2)];
console.log('  median  fcp', med('fcp'), 'lcp', med('lcp'), 'kb', med('kb'));
await browser.close();
