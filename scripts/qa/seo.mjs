/* Search and sharing checks against a running build: titles, descriptions, canonicals, Open Graph and Twitter tags,
   JSON-LD (valid JSON, required and recommended properties by schema type, @id links, no phone or e-mail), sitemap,
   robots, llms.txt, manifest and the 404 status. Exit code 1 when something fails.
   usage: node scripts/qa/seo.mjs [baseUrl]      default http://localhost:3000   (start it with: npm run build && npm start)
   The pages carry the production address in their tags, so "expected" values come from the sitemap, not from baseUrl. */
import { argv, exit } from 'node:process';

const BASE = (argv[2] || 'http://localhost:3000').replace(/\/$/, '');
let fails = 0, warns = 0;
const ok = (m) => console.log('  ok    ' + m);
const fail = (m) => { fails++; console.log('  FAIL  ' + m); };
const warn = (m) => { warns++; console.log('  warn  ' + m); };
const check = (cond, pass, bad, soft) => (cond ? ok(pass) : soft ? warn(bad) : fail(bad));

const get = (path, init) => fetch(path.startsWith('http') ? path : BASE + path, { redirect: 'manual', ...init });
const text = async (path) => { const r = await get(path); return { r, body: await r.text() }; };
const dec = (s) => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const attrs = (s) => Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], dec(m[2])]));

function parse(html) {
  const metas = [...html.matchAll(/<meta\s+([^>]*?)\/?>/g)].map((m) => attrs(m[1]));
  const links = [...html.matchAll(/<link\s+([^>]*?)\/?>/g)].map((m) => attrs(m[1]));
  const meta = (k) => metas.filter((m) => m.name === k || m.property === k).map((m) => m.content);
  const title = /<title>([\s\S]*?)<\/title>/.exec(html);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => dec(m[1].replace(/<[^>]+>/g, '')).trim());
  return { meta, title: title ? dec(title[1]) : '', canonical: links.filter((l) => l.rel === 'canonical').map((l) => l.href), ld, h1 };
}

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;
const asArr = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);
const types = (n) => asArr(n['@type']);
const isAbs = (u) => typeof u === 'string' && /^https:\/\/[^\s/]+(\/\S*)?$/.test(u);

/** every node of a JSON-LD document, with the ids it defines and the ids it only points at */
function walk(doc) {
  const nodes = [], defined = new Set(), refs = new Set();
  const visit = (v) => {
    if (Array.isArray(v)) return v.forEach(visit);
    if (!v || typeof v !== 'object') return;
    const keys = Object.keys(v).filter((k) => k !== '@context');
    if (v['@type']) nodes.push(v);
    if (v['@id']) (keys.length === 1 ? refs : defined).add(v['@id']);
    keys.forEach((k) => visit(v[k]));
  };
  visit(doc);
  return { nodes, defined, refs };
}

const PII = /(\+?\d[\d\s().-]{8,}\d)|[\w.+-]+@[\w-]+\.[\w.-]+|mailto:|tel:|wa\.me/i;
const PII_KEYS = ['telephone', 'email', 'faxNumber', 'contactPoint'];

function checkLd(label, blocks, page) {
  check(blocks.length >= 1, `${label}: ${blocks.length} JSON-LD block(s)`, `${label}: no JSON-LD`);
  const all = { defined: new Set(), refs: new Set() };
  for (const raw of blocks) {
    let doc;
    try { doc = JSON.parse(raw); } catch (e) { fail(`${label}: JSON-LD is not valid JSON (${e.message})`); continue; }
    check(doc['@context'] === 'https://schema.org', `${label}: @context is https://schema.org`, `${label}: @context is ${doc['@context']}`);
    const { nodes, defined, refs } = walk(doc);
    defined.forEach((d) => all.defined.add(d)); refs.forEach((r) => all.refs.add(r));
    const by = (t) => nodes.filter((n) => types(n).includes(t));

    for (const n of nodes) {
      for (const k of PII_KEYS) if (k in n) fail(`${label}: ${types(n)} has ${k}`);
      for (const [k, v] of Object.entries(n)) {
        if (typeof v === 'string' && !['@id', 'datePublished', 'dateModified', 'description'].includes(k) && PII.test(v)) fail(`${label}: ${k} looks like a phone number or e-mail: ${v}`);
        if (typeof v === 'string' && /^(url|item|contentUrl|image|sameAs|@id)$/.test(k) && /^https?:/.test(v) && !isAbs(v)) fail(`${label}: ${k} is not a clean https URL: ${v}`);
      }
    }
    for (const n of nodes) for (const k of ['datePublished', 'dateModified', 'dateCreated']) if (k in n) check(ISO.test(n[k]), `${label}: ${k} is ISO 8601 with a time zone (${n[k]})`, `${label}: ${k} is not ISO 8601 with time zone: ${n[k]}`);

    for (const n of by('WebSite').filter((w) => Object.keys(w).length > 5)) {
      check(n.name && isAbs(n.url), `${label}: WebSite has name and an absolute url`, `${label}: WebSite needs name and url`);
      check(n.inLanguage, `${label}: WebSite.inLanguage = ${n.inLanguage}`, `${label}: WebSite.inLanguage missing`, true);
      check(n.publisher, `${label}: WebSite.publisher set`, `${label}: WebSite.publisher missing`, true);
    }
    for (const n of by('ProfilePage')) {
      const me = asArr(n.mainEntity)[0];
      check(me && types(me).includes('Person') && me.name, `${label}: ProfilePage.mainEntity is a Person with a name`, `${label}: ProfilePage.mainEntity must be a Person with a name`);
      check(n.dateModified, `${label}: ProfilePage.dateModified set`, `${label}: ProfilePage.dateModified missing`, true);
      if (page) check(n.url === page.expect + '/' || n.url === page.expect, `${label}: ProfilePage.url matches the page`, `${label}: ProfilePage.url ${n.url} does not match ${page.expect}`);
    }
    for (const n of by('Person').filter((p) => Object.keys(p).length > 5)) {
      for (const k of ['name', 'url', 'image', 'jobTitle', 'sameAs', 'description']) check(n[k], `${label}: Person.${k} present`, `${label}: Person.${k} missing`, k !== 'name');
      check(asArr(n.sameAs).every(isAbs), `${label}: Person.sameAs are absolute https URLs`, `${label}: Person.sameAs has a bad URL`);
      const img = asArr(n.image)[0];
      check(img && isAbs(typeof img === 'string' ? img : img.url), `${label}: Person.image is an absolute URL`, `${label}: Person.image is not an absolute URL`);
    }
    for (const n of by('Article')) {
      check(n.headline && n.headline.length <= 110, `${label}: Article.headline (${(n.headline || '').length} chars)`, `${label}: Article.headline missing or over 110 chars`);
      const a = asArr(n.author)[0];
      check(a && types(a).includes('Person') && a.name && isAbs(a.url), `${label}: Article.author is a Person with name and url`, `${label}: Article.author needs @type Person, name and url`);
      for (const k of ['datePublished', 'dateModified', 'image', 'description', 'mainEntityOfPage']) check(n[k], `${label}: Article.${k} present`, `${label}: Article.${k} missing`);
      if (n.datePublished && n.dateModified) check(Date.parse(n.dateModified) >= Date.parse(n.datePublished), `${label}: dateModified is not before datePublished`, `${label}: dateModified is before datePublished`);
      if (page) {
        check(n.url === page.expect, `${label}: Article.url = canonical`, `${label}: Article.url ${n.url} != ${page.expect}`);
        check(n.description === page.description, `${label}: Article.description = meta description`, `${label}: Article.description differs from the meta description`);
        check(page.h1.includes(n.headline), `${label}: Article.headline is the page h1`, `${label}: Article.headline "${n.headline}" is not the h1 (${page.h1})`);
      }
    }
    for (const n of by('BreadcrumbList')) {
      const items = asArr(n.itemListElement);
      check(items.length >= 2, `${label}: BreadcrumbList has ${items.length} items`, `${label}: BreadcrumbList needs at least 2 items`);
      check(items.every((it, i) => it.position === i + 1 && it.name && isAbs(it.item)), `${label}: breadcrumb positions run 1..n, each with name and item`, `${label}: breadcrumb items need position, name and item`);
      if (page && items.length) check(items[items.length - 1].item === page.expect, `${label}: last breadcrumb is this page`, `${label}: last breadcrumb is not this page`);
    }
  }
  return all;
}

const siteWide = { defined: new Set(), refs: new Set() };
const seen = { titles: new Map(), descriptions: new Map() };

async function imageOk(url, label) {
  const u = new URL(url);
  const r = await get(u.pathname + u.search);
  if (!(r.status === 200 && /^image\//.test(r.headers.get('content-type') || ''))) return fail(`${label}: image ${u.pathname} -> ${r.status} ${r.headers.get('content-type')}`);
  const buf = Buffer.from(await r.arrayBuffer());
  let dims = '';
  try { const sharp = (await import('sharp')).default; const m = await sharp(buf).metadata(); dims = `${m.width}x${m.height}`; check(dims === '1200x630', `${label}: image ${u.pathname} is ${dims}, ${Math.round(buf.length / 1024)} KB`, `${label}: image is ${dims}, expected 1200x630`); }
  catch { ok(`${label}: image ${u.pathname} ${Math.round(buf.length / 1024)} KB (sharp not found, size not checked)`); }
}

async function checkPage(loc) {
  const url = new URL(loc);
  const path = url.pathname;
  const label = path === '/' ? 'home' : path;
  console.log(`\n${label}`);
  const { r, body } = await text(path);
  check(r.status === 200 && /text\/html/.test(r.headers.get('content-type') || ''), `status 200, html`, `status ${r.status} ${r.headers.get('content-type')}`);
  const p = parse(body);
  const expect = loc.replace(/\/$/, '');
  const description = p.meta('description')[0] || '';

  check(p.title && p.title.length <= 65, `title "${p.title}" (${p.title.length})`, `title missing or over 65 chars: "${p.title}"`);
  check(!seen.titles.has(p.title), 'title is unique', `title also used by ${seen.titles.get(p.title)}`);
  seen.titles.set(p.title, label);
  check(description.length >= 120 && description.length <= 160, `description ${description.length} chars`, `description is ${description.length} chars (want 120-160)`);
  check(!seen.descriptions.has(description), 'description is unique', `description also used by ${seen.descriptions.get(description)}`);
  seen.descriptions.set(description, label);
  check(p.canonical.length === 1 && p.canonical[0].replace(/\/$/, '') === expect, `canonical ${p.canonical[0]}`, `canonical is ${JSON.stringify(p.canonical)}, expected ${expect}`);
  check(p.h1.length === 1, `one h1: "${p.h1[0]}"`, `${p.h1.length} h1 elements`);
  const robots = p.meta('robots').concat(p.meta('googlebot')).join(' ');
  check(!/noindex|nofollow/.test(robots), `robots: ${robots || '(default)'}`, `robots blocks this page: ${robots}`);

  const og = (k) => p.meta('og:' + k);
  for (const k of ['title', 'description', 'url', 'image', 'image:alt', 'image:width', 'image:height', 'type', 'site_name', 'locale']) check(og(k).length === 1, `og:${k} = ${og(k)[0]}`, `og:${k} count ${og(k).length}`, k === 'locale');
  check((og('url')[0] || '').replace(/\/$/, '') === expect, 'og:url = canonical', `og:url ${og('url')[0]} != ${expect}`);
  check(isAbs(og('image')[0]), 'og:image is absolute https', `og:image is not absolute: ${og('image')[0]}`);
  check(og('title')[0] === p.title, 'og:title = <title>', `og:title "${og('title')[0]}" != <title>`, true);
  const tw = (k) => p.meta('twitter:' + k);
  for (const k of ['card', 'title', 'description', 'image', 'image:alt']) check(tw(k).length === 1, `twitter:${k} set`, `twitter:${k} count ${tw(k).length}`);
  check(tw('card')[0] === 'summary_large_image', 'twitter:card = summary_large_image', `twitter:card ${tw('card')[0]}`);
  check(tw('image')[0] === og('image')[0], 'twitter:image = og:image', 'twitter:image differs from og:image', true);
  if (og('image')[0]) await imageOk(og('image')[0], label);
  if (path !== '/') {
    check(og('type')[0] === 'article', 'og:type article', `og:type ${og('type')[0]}`);
    check(p.meta('article:published_time').length === 1 && p.meta('article:modified_time').length === 1, 'article:published_time and modified_time set', 'article times missing');
  }

  const ld = checkLd(label, p.ld, { expect, description, h1: p.h1 });
  ld.defined.forEach((d) => siteWide.defined.add(d));
  ld.refs.forEach((x) => siteWide.refs.add(x));
  const local = new Set([...ld.defined]);
  for (const x of ld.refs) check(local.has(x) || x.startsWith(expect.split('/').slice(0, 3).join('/') + '/#'), `@id reference ${x} resolves`, `@id reference ${x} has no definition`, !local.has(x));
}

(async () => {
  console.log(`checking ${BASE}`);
  const sm = await text('/sitemap.xml');
  console.log('\nsitemap.xml');
  check(sm.r.status === 200 && /xml/.test(sm.r.headers.get('content-type') || ''), 'status 200, xml', `status ${sm.r.status} ${sm.r.headers.get('content-type')}`);
  const entries = [...sm.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({ loc: /<loc>(.*?)<\/loc>/.exec(m[1])?.[1], lastmod: /<lastmod>(.*?)<\/lastmod>/.exec(m[1])?.[1] }));
  check(entries.length >= 2, `${entries.length} urls`, 'sitemap lists fewer than 2 urls');
  check(new Set(entries.map((e) => e.loc)).size === entries.length, 'no duplicate urls', 'duplicate urls in sitemap');
  for (const e of entries) {
    check(isAbs(e.loc), `${e.loc}`, `${e.loc} is not an absolute https URL`);
    check(e.lastmod && !Number.isNaN(Date.parse(e.lastmod)) && Date.parse(e.lastmod) <= Date.now() + 60000, `  lastmod ${e.lastmod}`, `  lastmod ${e.lastmod} is missing, invalid or in the future`);
  }

  for (const e of entries) await checkPage(e.loc);

  console.log('\nrobots.txt');
  const rb = await text('/robots.txt');
  check(rb.r.status === 200, 'status 200', `status ${rb.r.status}`);
  check(/^Sitemap:\s*\S+\/sitemap\.xml\s*$/m.test(rb.body), 'Sitemap line present', 'no Sitemap line');
  check(!/^Disallow:\s*\/\s*$/m.test(rb.body), 'the site is not disallowed', 'robots.txt disallows everything');

  console.log('\nllms.txt');
  const ll = await text('/llms.txt');
  check(ll.r.status === 200 && /text\/plain/.test(ll.r.headers.get('content-type') || ''), 'status 200, text/plain', `status ${ll.r.status} ${ll.r.headers.get('content-type')}`);
  check(/^# \S/.test(ll.body) && /^> \S/m.test(ll.body), 'H1 and blockquote summary present', 'llms.txt needs an H1 and a blockquote');
  const links = [...ll.body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
  check(links.length > 0, `${links.length} links`, 'llms.txt has no links');
  const siteHost = entries[0] && new URL(entries[0].loc).host;
  for (const l of links.filter((x) => new URL(x).host === siteHost)) {
    const u = new URL(l); const r = await get(u.pathname + u.search);
    check(r.status === 200, `  ${u.pathname} -> 200`, `  ${l} -> ${r.status}`);
  }
  check(!PII.test(ll.body.replace(/https?:\/\/\S+/g, '')), 'no phone number or e-mail', 'llms.txt contains a phone number or e-mail');

  console.log('\nmanifest');
  const mf = await text('/manifest.webmanifest');
  try {
    const j = JSON.parse(mf.body);
    check(j.name && j.short_name && j.start_url && j.icons?.length >= 2, `manifest: ${j.name}, ${j.icons.length} icons`, 'manifest needs name, short_name, start_url and icons');
    for (const i of j.icons) { const r = await get(i.src); check(r.status === 200, `  ${i.src} -> 200`, `  ${i.src} -> ${r.status}`); }
  } catch { fail('manifest is not JSON'); }

  console.log('\n404');
  for (const p of ['/definitely-not-a-page', '/cases/definitely-not-a-case', '/cases']) {
    const { r, body } = await text(p);
    check(r.status === 404, `${p} -> 404`, `${p} -> ${r.status}`);
    const pp = parse(body);
    check(/noindex/.test(pp.meta('robots').join(' ')), '  noindex', '  no noindex');
    check(pp.h1.length === 1, `  h1 "${pp.h1[0]}"`, `  ${pp.h1.length} h1`);
    check(!pp.ld.length, '  no JSON-LD', '  JSON-LD on a 404');
    if (p === '/definitely-not-a-page') check(/Back to the home page/.test(body), '  link back home', '  no link back home');
  }

  console.log('\n@id graph');
  for (const x of siteWide.refs) check(siteWide.defined.has(x), `${x} defined somewhere on the site`, `${x} is referenced but never defined`);

  console.log(`\n${fails ? 'FAIL' : 'PASS'}: ${fails} failure(s), ${warns} warning(s)`);
  exit(fails ? 1 : 0);
})();
