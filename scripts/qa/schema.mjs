/* Checks the JSON-LD of pages against the schema.org vocabulary itself (downloaded on each run, 1.5 MB): every @type exists, every
   property is defined for that type or one of its supertypes, and every object value has a type the property accepts. A plain https
   string is accepted for item, image, url, sameAs and mainEntityOfPage, as in Google's own examples. seo.mjs covers Google's required
   properties; this catches typos and properties used on the wrong type.
   usage: node scripts/qa/schema.mjs <url> [<url> ...]      e.g. node scripts/qa/schema.mjs http://localhost:3000/ http://localhost:3000/cases/seo */
const vocab = (await (await fetch("https://schema.org/version/latest/schemaorg-current-https.jsonld")).json())["@graph"];
const id = (x) => (typeof x === "string" ? x : x?.["@id"] || "").replace(/^schema:/, "").replace(/^https?:\/\/schema\.org\//, "");
const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const classes = new Map(), props = new Map();
for (const n of vocab) {
  const t = arr(n["@type"]);
  const name = id(n["@id"]);
  if (t.includes("rdfs:Class")) classes.set(name, { sup: arr(n["rdfs:subClassOf"]).map(id) });
  if (t.includes("rdf:Property")) props.set(name, { dom: arr(n["schema:domainIncludes"]).map(id), ran: arr(n["schema:rangeIncludes"]).map(id) });
}
const supers = (c, seen = new Set()) => { if (seen.has(c)) return seen; seen.add(c); (classes.get(c)?.sup || []).forEach((s) => supers(s, seen)); return seen; };
const DATATYPES = { string: ["Text", "URL", "Date", "DateTime", "Time", "Number", "Integer", "Boolean", "CssSelectorType", "XPathType", "PronounceableText"], number: ["Number", "Integer", "Float"], boolean: ["Boolean"] };

let errors = 0, nodes = 0;
function visit(v, path, parentType) {
  if (Array.isArray(v)) return v.forEach((x, i) => visit(x, `${path}[${i}]`, parentType));
  if (!v || typeof v !== "object") return;
  const types = arr(v["@type"]);
  for (const t of types) if (!classes.has(t)) { console.log(`  ERR  ${path}: unknown type ${t}`); errors++; }
  if (types.length) nodes++;
  const all = new Set(types.flatMap((t) => [...supers(t)]));
  for (const [k, val] of Object.entries(v)) {
    if (k === "@graph") { visit(val, `${path}.@graph`); continue; }
    if (k.startsWith("@")) continue;
    const p = props.get(k);
    if (!p) { console.log(`  ERR  ${path}.${k}: not a schema.org property`); errors++; continue; }
    if (types.length && !p.dom.some((d) => all.has(d))) { console.log(`  ERR  ${path}.${k}: not defined for ${types.join("/")} (domain ${p.dom.join(", ")})`); errors++; }
    for (const x of arr(val)) {
      const kind = typeof x;
      if (kind === "object") {
        const xt = arr(x["@type"]);
        if (xt.length) {
          const ok = xt.some((t) => [...supers(t)].some((s) => p.ran.includes(s)));
          if (!ok) { console.log(`  ERR  ${path}.${k}: ${xt.join("/")} is not an accepted value type (range ${p.ran.join(", ")})`); errors++; }
        } else if (!x["@id"]) { console.log(`  ERR  ${path}.${k}: object without @type or @id`); errors++; }
      } else if (!p.ran.some((r) => DATATYPES[kind]?.includes(r) || r === "Text" || r === "URL") && !(kind === "string" && /^https:\/\//.test(x) && ["item", "image", "mainEntityOfPage", "url", "sameAs"].includes(k))) {
        console.log(`  ERR  ${path}.${k}: a ${kind} where ${p.ran.join(", ")} is expected`); errors++;
      }
    }
    visit(val, `${path}.${k}`, types[0]);
  }
}
for (const url of process.argv.slice(2)) {
  const html = await (await fetch(url)).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  console.log(url, blocks.length, "block(s)");
  const before = errors;
  blocks.forEach((b, i) => visit(b, `ld${i}`));
  console.log(errors === before ? "  ok: every type and property is in the schema.org vocabulary and used on a type that allows it" : "  FAIL");
}
console.log(`${nodes} typed nodes checked, ${errors} error(s)`);
process.exit(errors ? 1 : 0);
