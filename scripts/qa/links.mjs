/* Link audit: every external URL in config, app, components, lib and the README, fetched like a browser (GET, 15 s timeout,
   redirects followed one hop at a time). Reports dead links (4xx/5xx, DNS or TLS failures, timeouts), parked or for-sale
   domains, deleted Vercel deployments, redirects to another host or path, and where each URL is used.
   usage: node scripts/qa/links.mjs [--out <dir>] [--timeout 15000] [--concurrency 8] [--docs]
   Writes <dir>/links.json and <dir>/links.md (default: current directory). Needs no packages. Node 24 reads config/work.ts directly. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const flag = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const OUT = path.resolve(flag('--out', '.'));
const TIMEOUT = +flag('--timeout', 15000);
const CONC = +flag('--concurrency', 8);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

/* ---------- 1. collect ---------- */
const uses = new Map(); // url -> Set of places
const add = (url, where) => {
  url = url.replace(/[.,;:)\]}'"`>]+$/, '');
  if (!/^https?:\/\/[^/\s]+\.[a-z]{2,}/i.test(url)) return;
  if (/\/\/(www\.)?(schema\.org|w3\.org|example\.com|localhost)/i.test(url) || /\$\{/.test(url)) return;
  if (!uses.has(url)) uses.set(url, new Set());
  uses.get(url).add(where);
};

const walk = (dir, exts, skip = []) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return skip.includes(e.name) ? [] : walk(p, exts, skip);
    return exts.some((x) => e.name.endsWith(x)) ? [p] : [];
  });

const files = [
  ...['config', 'app', 'components', 'lib'].flatMap((d) => walk(path.join(root, d), ['.ts', '.tsx'], ['node_modules'])),
  path.join(root, 'README.md'),
  ...(args.includes('--docs') ? walk(path.join(root, 'docs'), ['.md']) : []),
];
for (const f of files) {
  fs.readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/https?:\/\/[^\s"'`<>\\]+/g)) add(m[0], `${path.relative(root, f)}:${i + 1}`);
  });
}

// work.ts builds Web3 URLs from a bare domain (https://${domain}), so read the data itself
const work = await import(pathToFileURL(path.join(root, 'config/work.ts')).href);
for (const key of ['AGENTS', 'MOBILE', 'CLIENTS', 'SYSTEMS', 'WEB3']) for (const it of work[key]) if (it.url) add(it.url, `config/work.ts ${key} ${it.id} "${it.name}" (${it.status})`);

/* ---------- 2. probe ---------- */
const PARKED = [
  /domain (name )?(is|may be|might be) (for sale|available)/, /buy this domain/, /this domain (is )?(parked|for sale|available)/, /parked (free|domain|by|at)/,
  /sedo\.com/, /hugedomains/, /afternic/, /dan\.com\/buy/, /domain (has )?expired/, /renew (this|your) domain/, /sponsored listings/, /domainmarket/,
  /godaddy\.com\/(forsale|domains)/, /namecheap.*(parking|parked)/, /this webpage is parked/, /domain registered at/,
];

async function readText(res, limit = 120000) {
  const reader = res.body?.getReader();
  if (!reader) return '';
  const dec = new TextDecoder();
  let s = '';
  while (s.length < limit) {
    const { done, value } = await reader.read();
    if (done) break;
    s += dec.decode(value, { stream: true });
  }
  reader.cancel().catch(() => {});
  return s;
}

const errName = (e) => (e?.name === 'TimeoutError' ? 'timeout' : e?.cause?.code || e?.cause?.message || e?.message || String(e));

async function once(url) {
  const chain = [];
  let cur = url;
  for (let hop = 0; hop < 8; hop++) {
    let res;
    try {
      res = await fetch(cur, { redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT), headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*;q=0.8', 'accept-language': 'en-US,en;q=0.9' } });
    } catch (e) {
      return { chain, error: errName(e) };
    }
    chain.push({ url: cur, status: res.status });
    const loc = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && loc) {
      res.body?.cancel().catch(() => {});
      cur = new URL(loc, cur).href;
      continue;
    }
    const body = await readText(res).catch(() => '');
    return { chain, final: { url: cur, status: res.status, server: res.headers.get('server') || '', vercelError: res.headers.get('x-vercel-error') || '', type: res.headers.get('content-type') || '', body } };
  }
  return { chain, error: 'too many redirects' };
}

async function probe(url) {
  let r = await once(url);
  if (r.error || r.final.status >= 500) r = await once(url); // one retry for flaky hosts
  const out = { url, hops: r.chain.map((c) => `${c.status}`).join('>'), flags: [] };
  if (r.error) return { ...out, status: 0, error: r.error, flags: ['unreachable'] };
  const f = r.final;
  const b = f.body.toLowerCase();
  out.status = f.status;
  out.finalUrl = f.url;
  out.title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(f.body)?.[1] || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  out.description = (/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i.exec(f.body)?.[1] || '').slice(0, 140);
  const host = (u) => new URL(u).host.replace(/^www\./, '');
  const norm = (u) => new URL(u).pathname.replace(/\/$/, '') + new URL(u).search;
  if (r.chain.length > 1) {
    const first = r.chain[0].status;
    const perm = first === 301 || first === 308;
    if (host(url) !== host(f.url)) out.flags.push(`redirect to ${host(f.url)} (${perm ? 'permanent' : 'temporary'})`);
    else if (norm(url) !== norm(f.url)) out.flags.push(`redirect to ${norm(f.url) || '/'} (${perm ? 'permanent' : 'temporary'})`);
  }
  if (f.status >= 400) out.flags.push(f.status === 999 || (f.status === 403 && /cloudflare|akamai/i.test(f.server)) || f.status === 429 ? `blocked for scripts (${f.status})` : `dead (${f.status})`);
  if (/deployment_not_found|the deployment could not be found/i.test(f.vercelError + b)) out.flags.push('Vercel: deployment not found');
  if (/error code: 10(16|01)|dns points to prohibited ip|error 1016/i.test(b)) out.flags.push('Cloudflare: origin or DNS error');
  if (PARKED.some((re) => re.test(b))) out.flags.push('parked or for sale?');
  if (f.status < 400 && f.body.length < 400 && !/redirect|location\.href|http-equiv/i.test(f.body)) out.flags.push('almost empty page');
  if (f.status < 400 && /<title[^>]*>[^<]*(404|not found|page not found)/i.test(f.body)) out.flags.push('soft 404 (title)');
  return out;
}

const urls = [...uses.keys()].sort();
console.log(`${urls.length} unique URLs from ${files.length} files and config/work.ts`);
const results = [];
let next = 0, done = 0;
await Promise.all(Array.from({ length: CONC }, async () => {
  while (next < urls.length) {
    const u = urls[next++];
    const r = await probe(u);
    results.push({ ...r, usedIn: [...uses.get(u)] });
    if (++done % 20 === 0) console.log(`  ${done}/${urls.length}`);
  }
}));
results.sort((a, b) => a.url.localeCompare(b.url));

/* ---------- 3. report ---------- */
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'links.json'), JSON.stringify(results, null, 2));
const bad = results.filter((r) => r.flags.length);
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|');
const where = (r) => r.usedIn.slice(0, 2).map((w) => w.replace(/^config\/work\.ts /, '')).join('; ') + (r.usedIn.length > 2 ? ` (+${r.usedIn.length - 2})` : '');
const md = [
  `# Link audit (${new Date().toISOString().slice(0, 10)})`,
  '',
  `${results.length} URLs, ${results.filter((r) => r.status >= 200 && r.status < 300 && !r.flags.length).length} clean, ${bad.length} to look at.`,
  '',
  '## To look at',
  '',
  '| URL | status | final URL | flags | used in |',
  '|---|---|---|---|---|',
  ...bad.map((r) => `| ${cell(r.url)} | ${r.status || cell(r.error)} | ${cell(r.finalUrl && r.finalUrl !== r.url ? r.finalUrl : '')} | ${cell(r.flags.join('; '))} | ${cell(where(r))} |`),
  '',
  '## All',
  '',
  '| URL | status | hops | final URL | title | used in |',
  '|---|---|---|---|---|---|',
  ...results.map((r) => `| ${cell(r.url)} | ${r.status || cell(r.error)} | ${r.hops} | ${cell(r.finalUrl && r.finalUrl !== r.url ? r.finalUrl : '')} | ${cell(r.title)} | ${cell(where(r))} |`),
];
fs.writeFileSync(path.join(OUT, 'links.md'), md.join('\n') + '\n');
console.log(`done: ${results.length} URLs, ${bad.length} flagged. Wrote ${path.join(OUT, 'links.md')}`);
for (const r of bad) console.log(`  ${r.status || r.error}  ${r.url}  ${r.flags.join('; ')}`);
