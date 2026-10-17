# Jeremia Axelano, portfolio

Source of [portfolio.axelano.space](https://portfolio.axelano.space): a one-page portfolio for a CTO who builds marketplaces and AI agents. It is built to stay smooth on an iPhone, so every effect is time based or runs once, and nothing follows the scroll position.

## Stack

- Next.js 14.2.35 (App Router) and TypeScript. 14.2.35 or newer closes the App Router DoS advisories CVE-2025-55184 and CVE-2025-67779.
- Plain CSS in `styles/`, no Tailwind and no animation library. All motion is CSS keyframes, a one-shot `IntersectionObserver`, or canvas 2D driven by time.
- Fonts are self-hosted with Fontsource (Outfit Variable, Inter, JetBrains Mono, latin subset). There are no third-party requests.
- Deployed on Vercel from `main`. Node 24.x, no lockfile (`.npmrc` sets `package-lock=false`).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Add `?nointro` to the URL to skip the intro. It plays once per browser session.

## Rules the code follows

1. No scroll-linked animation (`useScroll`, ScrollTrigger scrub, Lenis, parallax). Sticky positioning, `scroll-snap` and one-shot reveals instead.
2. No large `filter: blur()` and no `backdrop-filter` on fixed or sticky elements. WebKit repaints them on every scroll.
3. Everything that loops pauses while off screen (`data-pausable` plus `data-vis` from `components/fx-root.tsx`).
4. Images are never drawn larger than their own pixels times the device pixel ratio. Frames follow the screenshot's aspect ratio, so nothing is cropped or stretched.
5. The top of the page does not wait for JavaScript. The hero entrance is CSS only, and the `.js` class set in `<head>` is removed again after 5 s if hydration never finishes.
6. `prefers-reduced-motion` ends every animation immediately and skips the intro.

## Structure

```text
app/sections/     one file per section, in the order of app/page.tsx
app/cases/[id]/   full case-study pages
components/       ui.tsx (frames, marquee), fx-root.tsx (page-wide effects), intro, nav, palette, globe, ...
config/           all copy, numbers and image descriptors (site, work, builds, cases, arsenal, logos, media)
lib/              i18n (EN/ID), events, geo-dots (land dots for the globe)
styles/           base, fx, top, mid, deep, end
public/work/      screenshots and photos (WebP), public/logos/sprite.svg for tool and brand marks
scripts/          capture-sites.mjs, the QA scripts, and brand/ (draws the JA mark and builds the favicon and app icons)
docs/             component catalog and code reference
```

Content lives in `config/*.ts`, not in JSX. To change a number, a project or a status, edit the matching config file.

## Assets

Screenshots are captured at 1440x900 @2x and stored as 800x500 WebP (16:10), so the browser frame fits exactly:

```bash
npm i --no-save playwright && npx playwright install chromium
node scripts/capture-sites.mjs scripts/sites.example.json public/work/t
```

The brand mark is the face photo on a cyan plate with two cut corners and a coral dot. `components/ui.tsx` (`<Mark />`) and `styles/top.css` (`.mark`) draw it in the page. Run `node scripts/brand/build-photo-icons.mjs` (source photo `scripts/brand/me-src.webp`) to rewrite `public/me.webp`, `app/icon.png`, `app/favicon.ico`, `app/apple-icon.png` and the PNG icons in `public/`. The old JA monogram numbers stay in `scripts/brand/mark.mjs` (the intro still draws those letters).

## QA

The scripts use Playwright. They check console errors and sideways overflow (`site.mjs`), blurry images (`blur-audit.mjs`), real touch scrolling over every interactive area (`swipe.mjs`), loading time on a throttled iPhone profile (`throttle.mjs`) and anchor offsets (`anchors.mjs`).

```bash
npm i --no-save playwright && npx playwright install chromium webkit
npm run build && npm start &
node scripts/qa/site.mjs http://localhost:3000/
node scripts/qa/swipe.mjs http://localhost:3000/
node scripts/qa/throttle.mjs "http://localhost:3000/?nointro" 5
```

## Using this as a reference

`docs/COMPONENT-CATALOG.md` lists the 22 page blocks and 56 effect components (what each does, how it behaves on a phone, which file builds it, and the order to build it in). `docs/COMPONENT-CODE.md` has copy-paste HTML, CSS and JS for every component.

The code is MIT licensed (see `LICENSE`). The screenshots, venue photos, testimonials, CV and product names belong to their owners and are not covered by that license. Replace them before publishing your own site.
