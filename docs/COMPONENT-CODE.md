# Kode referensi komponen

Kode HTML, CSS, dan JS untuk 56 komponen di `COMPONENT-CATALOG.md`. Semuanya vanilla (tanpa framework), jadi bisa dipindah ke React, Vue, Astro, atau HTML biasa. Di situs asli komponen yang sama ditulis sebagai TypeScript React; file produksinya disebut di bagian "Susunan halaman" pada katalog.

## Cara memakai

1. Salin blok HTML ke halamanmu, di dalam wadah ber-`position: relative` dan bertinggi tetap (di lab: `.stage`, 236 px).
2. Salin CSS. Bagian `:root` di awal hanya berisi token lab yang dipakai komponen itu (font, warna teks redup); ganti dengan tokenmu.
3. Kalau ada JS, salin juga. Fungsi `init(s)` menerima elemen pembungkus komponen. Pembantu kecil (`$`, `$$`, `onView`, `reduce`, `fine`) sudah disertakan di atas kode bila dipakai.
4. Komponen yang memakai `data-marquee`, `data-spot`, `data-tilt`, `data-count` butuh fungsi kit yang sudah disertakan di blok JS-nya. Panggil fungsinya sekali setelah markup ada.
5. Ganti gambar contoh (`app/*.webp`, `wall/*.webp`, `img/*.webp`) dengan milikmu.

```css
/* Wadah demo yang dipakai lab. Taruh komponen di dalam wadah ber-posisi seperti ini. */
.stage { position: relative; height: 236px; overflow: hidden; display: grid; place-items: center; }
.stage.dark { background: #0a0c10; }
.stage.light { background: #eceef1; color: #111; }
.stage.ink { background: #05070a; }
.stage.warm { background: #1a1411; }
```

Tiap komponen sudah mengikuti aturan di katalog bagian 3: tidak ada gerak yang mengikuti scroll dan tidak ada blur berat. Animasi berulang akan berhenti sendiri bila kamu menambahkan `data-pausable` pada section dan memasang pengamat yang mengisi `data-vis` (lihat `components/fx-root.tsx`).

## Latar hero

### `bg-aurora`: Aurora drift

Three radial layers drift on transform. Looks like a blur, costs like a div. Tema demo: `ink`.

**HTML**

```html
<div class="x-aur">
  <i></i>
  <i></i>
  <i></i>
  <h4 class="st">Aurora drift</h4>
</div>
```

**CSS**

```css
.x-aur {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #07090f;
}
.x-aur i {
  position: absolute;
  width: 72%;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: x-aur 13s ease-in-out infinite alternate;
}
.x-aur i:nth-child(1) {
  background: radial-gradient(circle, rgba(122, 240, 200, 0.55), transparent 65%);
  left: -14%;
  top: -40%;
}
.x-aur i:nth-child(2) {
  background: radial-gradient(circle, rgba(184, 164, 255, 0.55), transparent 65%);
  right: -18%;
  top: -10%;
  animation-delay: -4s;
}
.x-aur i:nth-child(3) {
  background: radial-gradient(circle, rgba(255, 179, 138, 0.45), transparent 65%);
  left: 18%;
  bottom: -60%;
  animation-delay: -8s;
}
.x-aur h4 {
  position: relative;
}
@keyframes x-aur {
  to {
    transform: translate(12%, 10%) scale(1.2);
  }
}
```

**JS:** tidak perlu.

### `bg-grid`: Perspective grid floor

A tilted plane scrolls its own background. Strong for Web3 and tech tones. Tema demo: `ink`.

**HTML**

```html
<div class="x-gf">
  <div class="sn"></div>
  <div class="pl"></div>
  <h4 class="st">Grid floor</h4>
</div>
```

**CSS**

```css
.x-gf {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(#0b0a24, #2c1052 70%);
}
.x-gf .pl {
  position: absolute;
  left: -60%;
  right: -60%;
  bottom: -25%;
  height: 75%;
  background-image:
    linear-gradient(rgba(255, 110, 200, 0.55) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 110, 200, 0.55) 1px, transparent 1px);
  background-size: 46px 46px;
  transform: perspective(280px) rotateX(62deg);
  transform-origin: 50% 100%;
  animation: x-gf 1.8s linear infinite;
}
.x-gf .sn {
  position: absolute;
  left: 50%;
  bottom: 34%;
  width: 120px;
  height: 120px;
  margin-left: -60px;
  border-radius: 50%;
  background: linear-gradient(#ffd86b, #ff5fa2);
}
.x-gf h4 {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-shadow: 0 2px 20px #000;
}
@keyframes x-gf {
  to {
    background-position: 0 46px;
  }
}
```

**JS:** tidak perlu.

### `bg-meteors`: Meteors

Fourteen thin streaks fall on a staggered loop. Quiet enough to sit behind copy. Tema demo: `ink`.

**HTML**

```html
<div class="x-met">
  <div class="w"></div>
  <h4 class="st">Meteors</h4>
</div>
```

**CSS**

```css
.x-met {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #06080d;
}
.x-met .w {
  position: absolute;
  inset: -20%;
  transform: rotate(22deg);
}
.x-met i {
  position: absolute;
  top: -30%;
  left: var(--x);
  width: 2px;
  height: 90px;
  background: linear-gradient(#fff, transparent);
  border-radius: 2px;
  opacity: 0;
  animation: x-met var(--d) linear infinite;
  animation-delay: var(--l);
}
.x-met h4 {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
@keyframes x-met {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  100% {
    transform: translateY(520px);
    opacity: 0;
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  var w = $('.w', s),
    h = '';
  for (var i = 0; i < 14; i++)
    h +=
      '<i style="--x:' +
      (Math.random() * 100).toFixed(0) +
      '%;--d:' +
      (2.6 + Math.random() * 2.4).toFixed(1) +
      's;--l:-' +
      (Math.random() * 5).toFixed(1) +
      's"></i>';
  w.innerHTML = h;
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `bg-dots`: Dot field with ripples

Grid of dots, a ripple leaves the centre every few seconds. Tap or click to add your own. Tema demo: `ink`.

**HTML**

```html
<canvas class="x-dots"></canvas>
<h4 class="st" style="position: relative; pointer-events: none">Dot ripples</h4>
```

**CSS**

```css
.x-dots {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

function init(s) {
  var cv = $('canvas', s),
    ctx = cv.getContext('2d'),
    dpr = Math.min(2, devicePixelRatio || 1),
    W,
    H,
    rip = [],
    run = true;
  function size() {
    var r = cv.getBoundingClientRect();
    W = r.width;
    H = r.height;
    cv.width = W * dpr;
    cv.height = H * dpr;
  }
  size();
  window.addEventListener('resize', size);
  function add(x, y) {
    rip.push({ x: x, y: y, t: performance.now() });
  }
  cv.addEventListener('pointerdown', function (e) {
    var r = cv.getBoundingClientRect();
    add(e.clientX - r.left, e.clientY - r.top);
  });
  if (fine)
    cv.addEventListener('pointermove', function (e) {
      if (Math.random() < 0.03) {
        var r = cv.getBoundingClientRect();
        add(e.clientX - r.left, e.clientY - r.top);
      }
    });
  add(W / 2, H / 2);
  setInterval(function () {
    if (run) add(W / 2, H / 2);
  }, 2800);
  if ('IntersectionObserver' in window)
    new IntersectionObserver(function (es) {
      run = es[0].isIntersecting;
    }).observe(cv);
  (function f(now) {
    if (run) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      rip = rip.filter(function (r) {
        return now - r.t < 4200;
      });
      for (var x = 10; x < W; x += 16)
        for (var y = 10; y < H; y += 16) {
          var a = 0.3,
            sz = 1.2;
          rip.forEach(function (r) {
            var age = (now - r.t) * 0.12,
              d = Math.hypot(x - r.x, y - r.y),
              w = Math.exp(-Math.pow(d - age, 2) / 700) * Math.max(0, 1 - age / 500);
            a += w * 0.85;
            sz += w * 1.7;
          });
          ctx.fillStyle = 'rgba(122,240,200,' + Math.min(1, a) + ')';
          ctx.beginPath();
          ctx.arc(x, y, sz, 0, 7);
          ctx.fill();
        }
    }
    requestAnimationFrame(f);
  })(performance.now());
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `bg-rays`: Light rays

Two conic layers sway at different speeds. Reads as stage lighting for nightlife work. Tema demo: `ink`.

**HTML**

```html
<div class="x-rays">
  <i></i>
  <i></i>
  <h4 class="st">Stage lights</h4>
</div>
```

**CSS**

```css
.x-rays {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #07090e;
}
.x-rays i {
  position: absolute;
  left: 50%;
  top: -30%;
  width: 200%;
  height: 160%;
  margin-left: -100%;
  transform-origin: 50% 0;
  background: conic-gradient(
    from 160deg at 50% 0,
    transparent 0 6%,
    rgba(255, 226, 160, 0.4) 9%,
    transparent 13%,
    transparent 26%,
    rgba(160, 200, 255, 0.32) 29%,
    transparent 33%,
    transparent 52%,
    rgba(255, 200, 230, 0.3) 55%,
    transparent 59%
  );
  animation: x-sway 9s ease-in-out infinite alternate;
}
.x-rays i:nth-child(2) {
  animation-duration: 13s;
  animation-direction: alternate-reverse;
  opacity: 0.7;
}
.x-rays h4 {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
@keyframes x-sway {
  from {
    transform: rotate(-7deg);
  }
  to {
    transform: rotate(7deg);
  }
}
```

**JS:** tidak perlu.

## Efek headline

### `tx-shine`: Gradient sheen

Background-clip text with a moving gradient. The classic, and it still works. Tema demo: `dark`.

**HTML**

```html
<h4 class="st x-shine">
  Ship it.
  <br />
  Scale it.
</h4>
```

**CSS**

```css
.x-shine {
  background: linear-gradient(100deg, #7af0c8 15%, #fff 35%, #b8a4ff 55%, #7af0c8 80%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: x-shine 5s linear infinite;
}
@keyframes x-shine {
  to {
    background-position: -250% 0;
  }
}
```

**JS:** tidak perlu.

### `tx-rotate`: Word rotator

One headline, four nouns. Good for positioning without a paragraph. Tema demo: `dark`.

**HTML**

```html
<h4 class="st" style="text-align: left">
  I build
  <br />
  <span class="x-wr">
    <div>
      <b>marketplaces</b>
      <b>AI agents</b>
      <b>platforms</b>
      <b>new cities</b>
      <b>marketplaces</b>
    </div>
  </span>
</h4>
```

**CSS**

```css
:root {
  --acc: #7af0c8;
}
.x-wr {
  display: inline-grid;
  height: 1.18em;
  overflow: hidden;
  vertical-align: bottom;
  text-align: left;
}
.x-wr > div {
  animation: x-wrs 9s cubic-bezier(0.7, 0, 0.2, 1) infinite;
}
.x-wr b {
  display: block;
  height: 1.18em;
  color: var(--acc);
  font-weight: 800;
}
@keyframes x-wrs {
  0%,
  20% {
    transform: translateY(0);
  }
  25%,
  45% {
    transform: translateY(-1.18em);
  }
  50%,
  70% {
    transform: translateY(-2.36em);
  }
  75%,
  95% {
    transform: translateY(-3.54em);
  }
  100% {
    transform: translateY(-4.72em);
  }
}
```

**JS:** tidak perlu.

### `tx-scramble`: Decode on hover

Letters resolve from noise. Runs on load and on tap or hover. Fits terminal and Web3 tones. Tema demo: `dark`.

**HTML**

```html
<div class="x-scr" data-t="Hello, I am Jeremia"></div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
}
.x-scr {
  font: 700 clamp(26px, 3vw, 38px) / 1.1 var(--mono);
  letter-spacing: -0.02em;
  cursor: pointer;
  text-align: center;
  color: #d8ffe9;
}
.x-scr span.s {
  color: #4a7a63;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-scr', s),
    G = '!<>-_\\/[]{}=+*^?#',
    busy = false;
  function sc() {
    if (busy) return;
    busy = true;
    var t = el.dataset.t,
      n = t.length,
      t0 = performance.now();
    (function f(now) {
      var p = Math.min(1, (now - t0) / 900),
        k = Math.floor(p * n),
        o = '';
      for (var i = 0; i < n; i++)
        o +=
          i < k || t[i] === ' '
            ? t[i]
            : '<span class="s">' + G[Math.floor(Math.random() * G.length)] + '</span>';
      el.innerHTML = o;
      if (p < 1) requestAnimationFrame(f);
      else busy = false;
    })(t0);
  }
  el.addEventListener('pointerenter', sc);
  el.addEventListener('click', sc);
  onView(s, sc, 0.6);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `tx-split`: Line mask reveal

Each line slides up out of a mask. Use once per section, not on every heading. Tema demo: `dark`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-sp">
  <span><i style="--i: 0">Build.</i></span>
  <span><i style="--i: 1">Scale.</i></span>
  <span><i style="--i: 2">Automate.</i></span>
</div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-sp {
  display: grid;
  gap: 2px;
  font: 800 clamp(28px, 3.4vw, 44px) / 1.02 var(--sans);
  letter-spacing: -0.045em;
}
.x-sp > span {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
}
.x-sp > span > i {
  display: block;
  font-style: normal;
  transform: translateY(110%);
}
.x-sp.go > span > i {
  animation: x-up 0.9s cubic-bezier(0.2, 0.8, 0.15, 1) forwards;
  animation-delay: calc(var(--i) * 0.12s);
}
@keyframes x-up {
  to {
    transform: none;
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-sp', s);
  function go() {
    el.classList.remove('go');
    void el.offsetWidth;
    el.classList.add('go');
  }
  onView(s, go, 0.5);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `tx-variable`: Variable-weight wave

A weight wave runs through the letters. It re-lays text each frame, so keep it to one short word. Tema demo: `dark`.

**HTML**

```html
<div class="x-vw"></div>
```

**CSS**

```css
:root {
  --acc: #7af0c8;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-vw {
  font: 300 clamp(30px, 3.6vw, 48px) / 1 var(--sans);
  letter-spacing: -0.03em;
  display: flex;
  justify-content: center;
}
.x-vw span {
  display: inline-block;
  animation: x-vw 2.6s ease-in-out infinite;
  animation-delay: calc(var(--i) * 90ms);
}
@keyframes x-vw {
  0%,
  100% {
    font-variation-settings: 'wght' 300;
  }
  50% {
    font-variation-settings: 'wght' 850;
    color: var(--acc);
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  $('.x-vw', s).innerHTML = 'Marketplace'
    .split('')
    .map(function (c, i) {
      return '<span style="--i:' + i + '">' + c + '</span>';
    })
    .join('');
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

## Tombol

### `btn-beam`: Border beam

A conic gradient orbits the border. @property needs Safari 16.4 or newer, else a plain line. Tema demo: `dark`.

**HTML**

```html
<a class="xb beam" href="#" style="--r: 99px; --bc: #7af0c8" onclick="return false">
  Book an intro call →
</a>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.xb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 24px;
  border-radius: 99px;
  font: 600 15px/1 var(--sans);
  text-decoration: none;
  color: #fff;
  background: #14181f;
  border: 0;
  position: relative;
}
/* dari kit.css */
@property --ang {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.beam {
  position: relative;
  isolation: isolate;
}
.beam::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(
    from var(--ang),
    transparent 0 62%,
    var(--bc, #22d3ee) 82%,
    transparent 100%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box exclude,
    linear-gradient(#000 0 0);
  animation: ang 3.4s linear infinite;
  pointer-events: none;
  z-index: -1;
}
@keyframes ang {
  to {
    --ang: 360deg;
  }
}
```

**JS:** tidak perlu.

### `btn-shimmer`: Shimmer sweep

A highlight crosses the button every three seconds. Draws the eye to the one primary action. Tema demo: `dark`.

**HTML**

```html
<a class="xb x-sh" href="#" onclick="return false">See case studies</a>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.xb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 24px;
  border-radius: 99px;
  font: 600 15px/1 var(--sans);
  text-decoration: none;
  color: #fff;
  background: #14181f;
  border: 0;
  position: relative;
}
.x-sh {
  background: #7af0c8;
  color: #06241b;
  overflow: hidden;
  position: relative;
}
.x-sh::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 30%,
    rgba(255, 255, 255, 0.7) 50%,
    transparent 70%
  );
  transform: translateX(-130%);
  animation: x-shm 3s ease-in-out infinite;
}
@keyframes x-shm {
  0%,
  40% {
    transform: translateX(-130%);
  }
  80%,
  100% {
    transform: translateX(130%);
  }
}
```

**JS:** tidak perlu.

### `btn-magnetic`: Magnetic pull

The button leans toward the cursor. Desktop only, nothing happens on touch. Tema demo: `dark`.

**HTML**

```html
<a class="xb x-mg" data-mag href="#" onclick="return false">Start a conversation</a>
<span class="hint">move the pointer near it</span>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.xb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 24px;
  border-radius: 99px;
  font: 600 15px/1 var(--sans);
  text-decoration: none;
  color: #fff;
  background: #14181f;
  border: 0;
  position: relative;
}
.x-mg {
  background: #fff;
  color: #0d0f13;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
  padding: 0 30px;
  height: 58px;
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* pointer effects, desktop only */
function pointer(root) {
  if (!fine) return;
  $$('[data-spot]', root).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });
  $$('[data-tilt]', root).forEach(function (el) {
    var raf = 0;
    el.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = el.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', x.toFixed(3));
        el.style.setProperty('--rx', y.toFixed(3));
        el.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--ry', 0);
      el.style.setProperty('--rx', 0);
    });
  });
  $$('[data-mag]', root).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(),
        x = e.clientX - (r.left + r.width / 2),
        y = e.clientY - (r.top + r.height / 2);
      el.style.transform =
        'translate(' + (x * 0.22).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)';
    });
    el.addEventListener('pointerleave', function () {
      el.style.transform = '';
    });
  });
}

pointer(document);
```

### `btn-arrow`: Arrow chip

The arrow tilts and slides on hover. Clean on light layouts. Tema demo: `light`.

**HTML**

```html
<a class="xb x-ar" href="#" onclick="return false">
  Let’s talk
  <i>→</i>
</a>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.xb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 24px;
  border-radius: 99px;
  font: 600 15px/1 var(--sans);
  text-decoration: none;
  color: #fff;
  background: #14181f;
  border: 0;
  position: relative;
}
.x-ar {
  background: #eceef1;
  color: #0d0f13;
  padding: 0 8px 0 24px;
  gap: 14px;
  transition: padding 0.3s;
}
.x-ar i {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #0d0f13;
  color: #fff;
  display: grid;
  place-items: center;
  font-style: normal;
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-ar:hover i {
  transform: translateX(4px) rotate(-45deg);
}
```

**JS:** tidak perlu.

### `btn-pulse`: Pulse ring

Two rings expand and fade. Use for a single store or download button. Tema demo: `dark`.

**HTML**

```html
<a class="xb x-pl" href="#" onclick="return false">Get the app</a>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.xb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 24px;
  border-radius: 99px;
  font: 600 15px/1 var(--sans);
  text-decoration: none;
  color: #fff;
  background: #14181f;
  border: 0;
  position: relative;
}
.x-pl {
  background: #ff5a3c;
  color: #fff;
}
.x-pl::before,
.x-pl::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid #ff5a3c;
  animation: x-pl 2.4s ease-out infinite;
}
.x-pl::after {
  animation-delay: 1.2s;
}
@keyframes x-pl {
  from {
    transform: scale(1);
    opacity: 0.8;
  }
  to {
    transform: scale(1.35, 1.6);
    opacity: 0;
  }
}
```

**JS:** tidak perlu.

### `btn-swap`: Label swap

The label rolls up and a second one takes its place. Tap shows the second label on touch. Tema demo: `dark`.

**HTML**

```html
<a class="xb x-sw" href="#" onclick="return false">
  <div>
    <span>
      <b>Hover me</b>
      <b>Let’s go →</b>
    </span>
  </div>
</a>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.xb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 24px;
  border-radius: 99px;
  font: 600 15px/1 var(--sans);
  text-decoration: none;
  color: #fff;
  background: #14181f;
  border: 0;
  position: relative;
}
.x-sw {
  background: #0d0f13;
  border: 1.5px solid #fff;
  overflow: hidden;
  height: 50px;
}
.x-sw span {
  display: block;
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-sw b {
  display: block;
  font-weight: 600;
}
.x-sw > div {
  height: 1.1em;
  overflow: hidden;
}
@media (hover: none) {
  .x-sw span {
    transform: translateY(-50%);
  }
}
.x-sw:hover span {
  transform: translateY(-50%);
}
```

**JS:** tidak perlu.

## Kartu

### `card-spot`: Cursor spotlight

A soft light and a lit border follow the cursor. The bento tiles in design direction H (in the review hub) use it. Tema demo: `dark`.

**HTML**

```html
<div class="xc x-spot" data-spot>
  <small>Case study</small>
  <b>Search traffic, rebuilt</b>
  <p>328 → 70 sitemap URLs. Hover for the light.</p>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
.xc {
  position: relative;
  width: min(260px, 82%);
  border-radius: 18px;
  padding: 20px;
  background: #171b22;
  border: 1px solid #2a303a;
  overflow: hidden;
  color: #eceef2;
}
.xc small {
  font: 400 11px var(--mono);
  color: var(--mut);
}
.xc b {
  display: block;
  font: 700 22px/1.1 var(--sans);
  letter-spacing: -0.03em;
  margin: 8px 0 6px;
}
.xc p {
  font-size: 13px;
  color: #a9b0bc;
}
.x-spot::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    200px circle at var(--mx, 50%) var(--my, 50%),
    rgba(255, 255, 255, 0.16),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
}
.x-spot:hover::before {
  opacity: 1;
}
.x-spot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(
    160px circle at var(--mx, 50%) var(--my, 50%),
    rgba(122, 240, 200, 0.9),
    transparent 70%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box exclude,
    linear-gradient(#000 0 0);
  opacity: 0;
  transition: opacity 0.3s;
}
.x-spot:hover::after {
  opacity: 1;
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* pointer effects, desktop only */
function pointer(root) {
  if (!fine) return;
  $$('[data-spot]', root).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });
  $$('[data-tilt]', root).forEach(function (el) {
    var raf = 0;
    el.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = el.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', x.toFixed(3));
        el.style.setProperty('--rx', y.toFixed(3));
        el.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--ry', 0);
      el.style.setProperty('--rx', 0);
    });
  });
  $$('[data-mag]', root).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(),
        x = e.clientX - (r.left + r.width / 2),
        y = e.clientY - (r.top + r.height / 2);
      el.style.transform =
        'translate(' + (x * 0.22).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)';
    });
    el.addEventListener('pointerleave', function () {
      el.style.transform = '';
    });
  });
}

pointer(document);
```

### `card-tilt`: 3D tilt and glare

The card leans toward the pointer with a moving highlight. Skipped on touch. Tema demo: `dark`.

**HTML**

```html
<div class="xc x-tilt" data-tilt>
  <small>Back office</small>
  <b>About 65 admin screens</b>
  <p>Bookings, partners, imports and analytics.</p>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
.xc {
  position: relative;
  width: min(260px, 82%);
  border-radius: 18px;
  padding: 20px;
  background: #171b22;
  border: 1px solid #2a303a;
  overflow: hidden;
  color: #eceef2;
}
.xc small {
  font: 400 11px var(--mono);
  color: var(--mut);
}
.xc b {
  display: block;
  font: 700 22px/1.1 var(--sans);
  letter-spacing: -0.03em;
  margin: 8px 0 6px;
}
.xc p {
  font-size: 13px;
  color: #a9b0bc;
}
.x-tilt {
  --rx: 0;
  --ry: 0;
  transform: perspective(800px) rotateX(calc(var(--rx) * -12deg)) rotateY(calc(var(--ry) * 14deg));
  transition: transform 0.2s ease-out;
  transform-style: flat;
}
.x-tilt::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--gx, 50%) var(--gy, 0%),
    rgba(255, 255, 255, 0.26),
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.3s;
}
.x-tilt:hover::after {
  opacity: 1;
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* pointer effects, desktop only */
function pointer(root) {
  if (!fine) return;
  $$('[data-spot]', root).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });
  $$('[data-tilt]', root).forEach(function (el) {
    var raf = 0;
    el.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = el.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', x.toFixed(3));
        el.style.setProperty('--rx', y.toFixed(3));
        el.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--ry', 0);
      el.style.setProperty('--rx', 0);
    });
  });
  $$('[data-mag]', root).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(),
        x = e.clientX - (r.left + r.width / 2),
        y = e.clientY - (r.top + r.height / 2);
      el.style.transform =
        'translate(' + (x * 0.22).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)';
    });
    el.addEventListener('pointerleave', function () {
      el.style.transform = '';
    });
  });
}

pointer(document);
```

### `card-neon`: Moving gradient border

A gradient border that slides slowly, with a faint glow. No pseudo-element masks needed. Tema demo: `dark`.

**HTML**

```html
<div class="xc x-neon">
  <small>Agents</small>
  <b>6 in daily use</b>
  <p>Each one has a named human owner.</p>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
.xc {
  position: relative;
  width: min(260px, 82%);
  border-radius: 18px;
  padding: 20px;
  background: #171b22;
  border: 1px solid #2a303a;
  overflow: hidden;
  color: #eceef2;
}
.xc small {
  font: 400 11px var(--mono);
  color: var(--mut);
}
.xc b {
  display: block;
  font: 700 22px/1.1 var(--sans);
  letter-spacing: -0.03em;
  margin: 8px 0 6px;
}
.xc p {
  font-size: 13px;
  color: #a9b0bc;
}
.x-neon {
  background:
    linear-gradient(#12151b, #12151b) padding-box,
    linear-gradient(120deg, #7af0c8, #b8a4ff, #ffb38a, #7af0c8) border-box;
  background-size:
    auto,
    300% 100%;
  border: 1.5px solid transparent;
  animation: x-neon 6s linear infinite;
  box-shadow: 0 0 34px -10px rgba(122, 240, 200, 0.55);
}
@keyframes x-neon {
  to {
    background-position:
      0 0,
      -300% 0;
  }
}
```

**JS:** tidak perlu.

### `card-flip`: Flip card

Stat on the front, detail on the back. Tap toggles it on touch. Tema demo: `dark`.

**HTML**

```html
<div class="x-flip" tabindex="0">
  <div>
    <div class="f">
      <small>Agents</small>
      <span class="big">6</span>
      <small>tap to flip</small>
    </div>
    <div class="k">
      <b>6 agents in daily use</b>
      <span>4 more in build, beta or planning.</span>
    </div>
  </div>
</div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-flip {
  width: min(240px, 80%);
  height: 170px;
  perspective: 900px;
  cursor: pointer;
}
.x-flip > div {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
  transform-style: preserve-3d;
}
.x-flip:hover > div,
.x-flip.on > div {
  transform: rotateY(180deg);
}
.x-flip .f,
.x-flip .k {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  padding: 20px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.x-flip .f {
  background: linear-gradient(150deg, #1d2a3a, #101820);
  border: 1px solid #2a3a4c;
}
.x-flip .k {
  background: #7af0c8;
  color: #06241b;
  transform: rotateY(180deg);
}
.x-flip .big {
  font: 800 44px/1 var(--sans);
  letter-spacing: -0.05em;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  var f = $('.x-flip', s);
  f.addEventListener('click', function () {
    f.classList.toggle('on');
  });
  f.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') f.classList.toggle('on');
  });
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `card-reveal`: Image card, caption rises

The screenshot zooms and the caption slides up. The classic project tile. Tema demo: `dark`.

**HTML**

```html
<div class="x-rv">
  <img src="wall/s-weda.webp" alt="" />
  <div class="cp">
    <b>Weda Bali Top Tours</b>
    <span>Tours · booking · fast-boat</span>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-rv {
  position: relative;
  width: min(280px, 86%);
  aspect-ratio: 16/10;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #2a303a;
  cursor: pointer;
}
.x-rv img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-rv:hover img {
  transform: scale(1.1);
}
.x-rv .cp {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 34px 14px 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  transform: translateY(55%);
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-rv:hover .cp {
  transform: none;
}
.x-rv .cp b {
  font: 700 15px var(--sans);
  display: block;
}
.x-rv .cp span {
  font: 400 12px var(--mono);
  color: #c7ccd6;
}
@media (hover: none) {
  .x-rv .cp {
    transform: none;
  }
}
```

**JS:** tidak perlu.

### `card-glass`: Glass without blur

Gradient fill plus an inner highlight sells the glass. No backdrop-filter, which WebKit repaints on scroll. Tema demo: `ink`.

**HTML**

```html
<div class="x-gl">
  <i></i>
  <i></i>
  <div class="g">
    <b>Glass, no blur</b>
    <p>Translucent gradient, inner highlight, soft shadow.</p>
  </div>
</div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-gl {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #0b0d12;
}
.x-gl i {
  position: absolute;
  border-radius: 50%;
  animation: x-aur 10s ease-in-out infinite alternate;
}
.x-gl i:nth-child(1) {
  width: 210px;
  height: 210px;
  background: radial-gradient(circle, rgba(255, 122, 89, 0.95), rgba(255, 122, 89, 0) 68%);
  left: 14%;
  top: -6%;
}
.x-gl i:nth-child(2) {
  width: 190px;
  height: 190px;
  background: radial-gradient(circle, rgba(106, 76, 255, 0.95), rgba(106, 76, 255, 0) 68%);
  right: 8%;
  bottom: -8%;
  animation-delay: -3s;
}
.x-gl .g {
  position: relative;
  width: min(250px, 82%);
  padding: 20px;
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.05));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    0 24px 40px -20px rgba(0, 0, 0, 0.6);
}
.x-gl .g b {
  font: 700 20px var(--sans);
  display: block;
  letter-spacing: -0.02em;
}
.x-gl .g p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 6px;
}
@keyframes x-aur {
  to {
    transform: translate(12%, 10%) scale(1.2);
  }
}
```

**JS:** tidak perlu.

### `card-ticket`: Ticket stub

Notched edges from a radial mask, a dashed tear line and a code block. Ties the portfolio to a ticketing product. Tema demo: `warm`.

**HTML**

```html
<div class="x-tk">
  <div class="a">
    <small>ADMIT ONE</small>
    <b>Jeremia Axelano</b>
    <span>CTO · Bali · UTC+8</span>
  </div>
  <div class="q"><i></i></div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-tk {
  position: relative;
  width: min(300px, 90%);
  display: grid;
  grid-template-columns: 1fr 84px;
  background: #ffd23f;
  color: #17120a;
  border-radius: 14px;
  -webkit-mask:
    radial-gradient(circle 10px at 0 50%, transparent 98%, #000) left/51% 100% no-repeat,
    radial-gradient(circle 10px at 100% 50%, transparent 98%, #000) right/51% 100% no-repeat;
  mask:
    radial-gradient(circle 10px at 0 50%, transparent 98%, #000) left/51% 100% no-repeat,
    radial-gradient(circle 10px at 100% 50%, transparent 98%, #000) right/51% 100% no-repeat;
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-tk:hover {
  transform: rotate(-2.5deg) translateY(-4px);
}
.x-tk .a {
  padding: 16px 18px;
  border-right: 2px dashed rgba(23, 18, 10, 0.45);
}
.x-tk .a small {
  font: 700 10px var(--mono);
  letter-spacing: 0.14em;
}
.x-tk .a b {
  display: block;
  font: 800 22px/1.05 var(--sans);
  letter-spacing: -0.04em;
  margin: 6px 0 4px;
}
.x-tk .a span {
  font: 500 11px var(--mono);
}
.x-tk .q {
  display: grid;
  place-items: center;
  padding: 12px;
}
.x-tk .q i {
  width: 56px;
  height: 56px;
  background: repeating-conic-gradient(#17120a 0 25%, transparent 0 50%) 0 0/14px 14px;
  border: 3px solid #17120a;
  display: block;
}
```

**JS:** tidak perlu.

## Perangkat dan frame

### `dev-phone`: Floating phone

Bezel, island and a sheen that crosses every seven seconds. Screens are the real app. Tema demo: `dark`.

**HTML**

```html
<div class="x-df">
  <div class="phone" style="--w: 130px; --sd: 1s">
    <div class="scr">
      <div class="sb">
        <span>9:41</span>
        <i></i>
      </div>
      <img src="app/home.webp" alt="" loading="lazy" decoding="async" />
    </div>
  </div>
</div>
```

**CSS**

```css
.x-df {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: radial-gradient(60% 60% at 50% 55%, rgba(46, 230, 255, 0.18), transparent 70%);
}
.x-df .phone {
  --w: 130px;
  animation: x-fl 6s ease-in-out infinite;
}
@keyframes x-fl {
  50% {
    transform: translateY(-12px);
  }
}
/* dari kit.css */
.phone {
  --w: 260px;
  width: var(--w);
  aspect-ratio: 100/201;
  border-radius: calc(var(--w) * 0.16);
  padding: calc(var(--w) * 0.03);
  background: linear-gradient(145deg, #1b1f25, #07090c);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    0 0 0 1px #000,
    0 40px 70px -28px rgba(0, 0, 0, 0.7);
  position: relative;
  flex: none;
}
.phone .scr {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: calc(var(--w) * 0.13);
  overflow: hidden;
  background: #06141c;
  display: flex;
  flex-direction: column;
}
.phone .sb {
  height: calc(var(--w) * 0.09);
  flex: none;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 calc(var(--w) * 0.07) calc(var(--w) * 0.012);
  font:
    600 calc(var(--w) * 0.04) / 1 ui-sans-serif,
    system-ui,
    sans-serif;
  color: #fff;
  background: #06141c;
}
.phone .sb i {
  display: block;
  width: calc(var(--w) * 0.1);
  height: calc(var(--w) * 0.04);
  border-radius: 2px;
  background: linear-gradient(90deg, #fff 0 55%, rgba(255, 255, 255, 0.35) 55%);
  opacity: 0.85;
}
.phone .scr img {
  flex: 1;
  min-height: 0;
  width: 100%;
  object-fit: cover;
  object-position: top;
}
.phone::before {
  content: '';
  position: absolute;
  top: calc(var(--w) * 0.05);
  left: 50%;
  width: calc(var(--w) * 0.28);
  height: calc(var(--w) * 0.075);
  transform: translateX(-50%);
  background: #000;
  border-radius: 99px;
  z-index: 3;
}
.phone .scr::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 35%,
    rgba(255, 255, 255, 0.16) 48%,
    transparent 60%
  );
  transform: translateX(-120%);
  animation: sheen 7s ease-in-out infinite;
  animation-delay: var(--sd, 1s);
  pointer-events: none;
}
@keyframes sheen {
  0%,
  60% {
    transform: translateX(-120%);
  }
  85%,
  100% {
    transform: translateX(120%);
  }
}
```

**JS:** tidak perlu.

### `dev-fan`: Phone fan

Three screens stacked, spreading on hover or tap. Tema demo: `dark`.

**HTML**

```html
<div class="x-fan" tabindex="0">
  <div class="phone" style="--w: 112px; --sd: 1s">
    <div class="scr">
      <div class="sb">
        <span>9:41</span>
        <i></i>
      </div>
      <img src="app/nightlife.webp" alt="" loading="lazy" decoding="async" />
    </div>
  </div>
  <div class="phone" style="--w: 112px; --sd: 2s">
    <div class="scr">
      <div class="sb">
        <span>9:41</span>
        <i></i>
      </div>
      <img src="app/home.webp" alt="" loading="lazy" decoding="async" />
    </div>
  </div>
  <div class="phone" style="--w: 112px; --sd: 3s">
    <div class="scr">
      <div class="sb">
        <span>9:41</span>
        <i></i>
      </div>
      <img src="app/ticket.webp" alt="" loading="lazy" decoding="async" />
    </div>
  </div>
</div>
```

**CSS**

```css
.x-fan {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.x-fan .phone {
  --w: 112px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -110px 0 0 -56px;
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-fan .phone:nth-child(1) {
  transform: rotate(-10deg) translateX(-26px);
}
.x-fan .phone:nth-child(2) {
  transform: translateY(-6px);
  z-index: 2;
}
.x-fan .phone:nth-child(3) {
  transform: rotate(10deg) translateX(26px);
}
.x-fan:hover .phone:nth-child(1),
.x-fan.on .phone:nth-child(1) {
  transform: rotate(-14deg) translateX(-92px);
}
.x-fan:hover .phone:nth-child(3),
.x-fan.on .phone:nth-child(3) {
  transform: rotate(14deg) translateX(92px);
}
@media (hover: none) {
  .x-fan .phone:nth-child(1) {
    transform: rotate(-14deg) translateX(-92px);
  }
  .x-fan .phone:nth-child(3) {
    transform: rotate(14deg) translateX(92px);
  }
}
/* dari kit.css */
.phone {
  --w: 260px;
  width: var(--w);
  aspect-ratio: 100/201;
  border-radius: calc(var(--w) * 0.16);
  padding: calc(var(--w) * 0.03);
  background: linear-gradient(145deg, #1b1f25, #07090c);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    0 0 0 1px #000,
    0 40px 70px -28px rgba(0, 0, 0, 0.7);
  position: relative;
  flex: none;
}
.phone .scr {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: calc(var(--w) * 0.13);
  overflow: hidden;
  background: #06141c;
  display: flex;
  flex-direction: column;
}
.phone .sb {
  height: calc(var(--w) * 0.09);
  flex: none;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 calc(var(--w) * 0.07) calc(var(--w) * 0.012);
  font:
    600 calc(var(--w) * 0.04) / 1 ui-sans-serif,
    system-ui,
    sans-serif;
  color: #fff;
  background: #06141c;
}
.phone .sb i {
  display: block;
  width: calc(var(--w) * 0.1);
  height: calc(var(--w) * 0.04);
  border-radius: 2px;
  background: linear-gradient(90deg, #fff 0 55%, rgba(255, 255, 255, 0.35) 55%);
  opacity: 0.85;
}
.phone .scr img {
  flex: 1;
  min-height: 0;
  width: 100%;
  object-fit: cover;
  object-position: top;
}
.phone::before {
  content: '';
  position: absolute;
  top: calc(var(--w) * 0.05);
  left: 50%;
  width: calc(var(--w) * 0.28);
  height: calc(var(--w) * 0.075);
  transform: translateX(-50%);
  background: #000;
  border-radius: 99px;
  z-index: 3;
}
.phone .scr::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 35%,
    rgba(255, 255, 255, 0.16) 48%,
    transparent 60%
  );
  transform: translateX(-120%);
  animation: sheen 7s ease-in-out infinite;
  animation-delay: var(--sd, 1s);
  pointer-events: none;
}
@keyframes sheen {
  0%,
  60% {
    transform: translateX(-120%);
  }
  85%,
  100% {
    transform: translateX(120%);
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  var f = $('.x-fan', s);
  f.addEventListener('click', function () {
    f.classList.toggle('on');
  });
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `dev-browser`: Browser that scrolls itself

The capture pans up and back inside the frame. Shows a full page without a video. Tema demo: `dark`.

**HTML**

```html
<div class="x-bw">
  <b>
    <i></i>
    <i></i>
    <i></i>
  </b>
  <div><img src="img/glw-d.webp" alt="" /></div>
</div>
```

**CSS**

```css
.x-bw {
  width: min(300px, 88%);
  height: 176px;
  border-radius: 12px;
  overflow: hidden;
  background: #0d1218;
  box-shadow:
    0 20px 40px -20px #000,
    inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
}
.x-bw > b {
  display: flex;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.05);
  flex: none;
}
.x-bw > b i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3a4650;
  display: block;
}
.x-bw > div {
  flex: 1;
  overflow: hidden;
  position: relative;
}
.x-bw img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  animation: x-pan 14s ease-in-out infinite alternate;
}
@keyframes x-pan {
  to {
    transform: translateY(-34%);
  }
}
```

**JS:** tidak perlu.

### `dev-laptop`: Laptop, slow sway

A CSS laptop that rocks a few degrees. Good for back-office and dashboard shots. Tema demo: `dark`.

**HTML**

```html
<div class="x-lap">
  <div class="lid"><img src="img/gl-bo.webp" alt="" /></div>
  <div class="base"></div>
</div>
```

**CSS**

```css
.x-lap {
  width: min(300px, 88%);
  perspective: 900px;
}
.x-lap .lid {
  aspect-ratio: 16/10.4;
  border-radius: 12px 12px 4px 4px;
  background: #0b0c0f;
  padding: 7px 7px 9px;
  box-shadow: inset 0 0 0 1.5px #3a3f48;
  transform-origin: 50% 100%;
  animation: x-lap 9s ease-in-out infinite alternate;
}
.x-lap .lid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 5px;
  display: block;
}
.x-lap .base {
  height: 11px;
  margin: 0 -5%;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(#cfd3da, #8f959f);
  position: relative;
}
.x-lap .base::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 18%;
  height: 4px;
  margin-left: -9%;
  border-radius: 0 0 6px 6px;
  background: #6c727c;
}
@keyframes x-lap {
  from {
    transform: rotateX(-8deg) rotateY(-14deg);
  }
  to {
    transform: rotateX(2deg) rotateY(12deg);
  }
}
```

**JS:** tidak perlu.

## Marquee dan ticker

### `mq-chips`: Tool chip loop

One row of tools, pauses on hover. Seamless because the set is cloned once. Tema demo: `dark`.

**HTML**

```html
<div class="mqs">
  <div data-marquee data-speed="34" style="--g: 10px">
    <span class="xchip">Go</span>
    <span class="xchip">TypeScript</span>
    <span class="xchip">Flutter</span>
    <span class="xchip">Next.js</span>
    <span class="xchip">PostgreSQL</span>
    <!-- … 11 chip lagi dengan pola yang sama -->
  </div>
  <div data-marquee data-dir="rev" data-speed="40" style="--g: 10px">
    <span class="xchip">Three.js</span>
    <span class="xchip">Astro</span>
    <span class="xchip">Vercel</span>
    <span class="xchip">Gin</span>
    <span class="xchip">Cloudflare</span>
    <!-- … 11 chip lagi dengan pola yang sama -->
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
}
.mqs {
  width: 100%;
  display: grid;
  gap: 12px;
}
.xchip {
  font: 500 13px/1 var(--mono);
  padding: 11px 15px;
  border-radius: 99px;
  border: 1px solid #2a303a;
  background: #14181f;
  color: #dfe3ea;
  white-space: nowrap;
}
/* dari kit.css */
.mq {
  overflow: hidden;
  display: flex;
}
.mq-track {
  display: flex;
  flex: none;
  width: max-content;
  animation: mq var(--dur, 40s) linear infinite;
}
.mq-track > * {
  flex: none;
  margin-right: var(--g, 24px);
}
.mq[data-dir='rev'] .mq-track {
  animation-direction: reverse;
}
.mq:hover .mq-track {
  animation-play-state: var(--hov, running);
}
.mq-y {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mq-y .mq-track {
  flex-direction: column;
  width: auto;
  height: max-content;
  animation-name: mqy;
}
.mq-y .mq-track > * {
  margin-right: 0;
  margin-bottom: var(--g, 24px);
}
[data-vis='0'] .mq-track,
[data-vis='0'].mq-track,
[data-vis='0'] [data-anim] {
  animation-play-state: paused !important;
}
@keyframes mq {
  to {
    transform: translateX(-50%);
  }
}
@keyframes mqy {
  to {
    transform: translateY(-50%);
  }
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* marquee: clone children so translateX(-50%) loops with no seam */
function marquees(root) {
  $$('[data-marquee]', root).forEach(function (m) {
    if (m.__m) return;
    m.__m = 1;
    var kids = Array.prototype.slice.call(m.children);
    var tr = document.createElement('div');
    tr.className = 'mq-track';
    kids.forEach(function (k) {
      tr.appendChild(k);
    });
    kids.forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      tr.appendChild(c);
    });
    m.appendChild(tr);
    m.classList.add(m.dataset.marquee === 'y' ? 'mq-y' : 'mq');
    if (m.dataset.speed) m.style.setProperty('--dur', m.dataset.speed + 's');
  });
}

marquees(document);
```

### `mq-two`: Two-way screenshot rows

Two rows move opposite ways. Used in design direction A (in the review hub) for client and Web3 work. Tema demo: `dark`.

**HTML**

```html
<div class="mqs">
  <div data-marquee data-speed="46" style="--g: 10px">
    <img class="xthumb" src="wall/s-fight-coin.webp" alt="" />
    <img class="xthumb" src="wall/s-golden-knight-coin.webp" alt="" />
    <img class="xthumb" src="wall/s-hardhat-cat-coin.webp" alt="" />
    <img class="xthumb" src="wall/s-cat-the-builder-coin.webp" alt="" />
    <!-- … 4 gambar lagi dengan pola yang sama -->
  </div>
  <div data-marquee data-dir="rev" data-speed="52" style="--g: 10px">
    <img class="xthumb" src="wall/s-nebula-cat-coin.webp" alt="" />
    <img class="xthumb" src="wall/s-sting-coin.webp" alt="" />
    <img class="xthumb" src="wall/s-caturn.webp" alt="" />
    <img class="xthumb" src="wall/s-bob-coin.webp" alt="" />
    <!-- … 4 gambar lagi dengan pola yang sama -->
  </div>
</div>
```

**CSS**

```css
.mqs {
  width: 100%;
  display: grid;
  gap: 12px;
}
.xthumb {
  width: 130px;
  height: 82px;
  object-fit: cover;
  object-position: top;
  border-radius: 9px;
  border: 1px solid #2a303a;
  display: block;
}
/* dari kit.css */
.mq {
  overflow: hidden;
  display: flex;
}
.mq-track {
  display: flex;
  flex: none;
  width: max-content;
  animation: mq var(--dur, 40s) linear infinite;
}
.mq-track > * {
  flex: none;
  margin-right: var(--g, 24px);
}
.mq[data-dir='rev'] .mq-track {
  animation-direction: reverse;
}
.mq:hover .mq-track {
  animation-play-state: var(--hov, running);
}
.mq-y {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mq-y .mq-track {
  flex-direction: column;
  width: auto;
  height: max-content;
  animation-name: mqy;
}
.mq-y .mq-track > * {
  margin-right: 0;
  margin-bottom: var(--g, 24px);
}
[data-vis='0'] .mq-track,
[data-vis='0'].mq-track,
[data-vis='0'] [data-anim] {
  animation-play-state: paused !important;
}
@keyframes mq {
  to {
    transform: translateX(-50%);
  }
}
@keyframes mqy {
  to {
    transform: translateY(-50%);
  }
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* marquee: clone children so translateX(-50%) loops with no seam */
function marquees(root) {
  $$('[data-marquee]', root).forEach(function (m) {
    if (m.__m) return;
    m.__m = 1;
    var kids = Array.prototype.slice.call(m.children);
    var tr = document.createElement('div');
    tr.className = 'mq-track';
    kids.forEach(function (k) {
      tr.appendChild(k);
    });
    kids.forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      tr.appendChild(c);
    });
    m.appendChild(tr);
    m.classList.add(m.dataset.marquee === 'y' ? 'mq-y' : 'mq');
    if (m.dataset.speed) m.style.setProperty('--dur', m.dataset.speed + 's');
  });
}

marquees(document);
```

### `mq-wall`: Vertical wall

Three columns scroll in alternate directions. design direction D (in the review hub) tilts the same idea in 3D. Tema demo: `dark`.

**HTML**

```html
<div class="x-wallv">
  <div data-marquee="y" data-speed="24" style="--g: 10px">
    <img src="wall/s-fight-coin.webp" alt="" />
    <img src="wall/s-golden-knight-coin.webp" alt="" />
    <img src="wall/s-hardhat-cat-coin.webp" alt="" />
    <img src="wall/s-cat-the-builder-coin.webp" alt="" />
    <img src="wall/s-genz-terminal.webp" alt="" />
    <img src="wall/s-lp-utan.webp" alt="" />
  </div>
  <div data-marquee="y" data-speed="29" data-dir="rev" style="--g: 10px">
    <img src="wall/s-thefour-coin.webp" alt="" />
    <img src="wall/s-sun-coin.webp" alt="" />
    <img src="wall/s-nebula-cat-coin.webp" alt="" />
    <img src="wall/s-sting-coin.webp" alt="" />
    <img src="wall/s-caturn.webp" alt="" />
    <img src="wall/s-bob-coin.webp" alt="" />
  </div>
  <div data-marquee="y" data-speed="34" style="--g: 10px">
    <img src="wall/s-vela-coin.webp" alt="" />
    <img src="wall/s-crusade-coin.webp" alt="" />
    <img src="wall/s-step-coin.webp" alt="" />
    <img src="wall/s-mfga-coin.webp" alt="" />
    <img src="wall/s-dragon-coin.webp" alt="" />
    <img src="wall/s-chip-coin.webp" alt="" />
  </div>
</div>
```

**CSS**

```css
.x-wallv {
  display: flex;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 0 12px;
}
.x-wallv > div {
  flex: 1;
  min-width: 0;
  height: 100%;
}
.x-wallv img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
  display: block;
  border: 1px solid #2a303a;
}
/* dari kit.css */
.mq {
  overflow: hidden;
  display: flex;
}
.mq-track {
  display: flex;
  flex: none;
  width: max-content;
  animation: mq var(--dur, 40s) linear infinite;
}
.mq-track > * {
  flex: none;
  margin-right: var(--g, 24px);
}
.mq[data-dir='rev'] .mq-track {
  animation-direction: reverse;
}
.mq:hover .mq-track {
  animation-play-state: var(--hov, running);
}
.mq-y {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mq-y .mq-track {
  flex-direction: column;
  width: auto;
  height: max-content;
  animation-name: mqy;
}
.mq-y .mq-track > * {
  margin-right: 0;
  margin-bottom: var(--g, 24px);
}
[data-vis='0'] .mq-track,
[data-vis='0'].mq-track,
[data-vis='0'] [data-anim] {
  animation-play-state: paused !important;
}
@keyframes mq {
  to {
    transform: translateX(-50%);
  }
}
@keyframes mqy {
  to {
    transform: translateY(-50%);
  }
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* marquee: clone children so translateX(-50%) loops with no seam */
function marquees(root) {
  $$('[data-marquee]', root).forEach(function (m) {
    if (m.__m) return;
    m.__m = 1;
    var kids = Array.prototype.slice.call(m.children);
    var tr = document.createElement('div');
    tr.className = 'mq-track';
    kids.forEach(function (k) {
      tr.appendChild(k);
    });
    kids.forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      tr.appendChild(c);
    });
    m.appendChild(tr);
    m.classList.add(m.dataset.marquee === 'y' ? 'mq-y' : 'mq');
    if (m.dataset.speed) m.style.setProperty('--dur', m.dataset.speed + 's');
  });
}

marquees(document);
```

### `mq-tape`: Ticker tape

A tilted tape of facts. The numbers are the content, so it never reads as decoration. Tema demo: `warm`.

**HTML**

```html
<div class="x-tape" data-marquee data-speed="30">
  <span>100,000+ VISITS</span>
  <span>700+ BOOKINGS A MONTH</span>
  <span>110+ PARTNERS</span>
  <span>6 AGENTS ON DUTY</span>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
}
.x-tape {
  width: 100%;
  background: #fff;
  color: #0d0f13;
  padding: 16px 0;
  transform: rotate(-2deg);
  scale: 1.06;
}
.x-tape span {
  font: 500 14px/1 var(--mono);
  letter-spacing: 0.08em;
  white-space: nowrap;
}
.x-tape span::after {
  content: '●';
  margin: 0 22px;
  color: #ff5a3c;
}
/* dari kit.css */
.mq {
  overflow: hidden;
  display: flex;
}
.mq-track {
  display: flex;
  flex: none;
  width: max-content;
  animation: mq var(--dur, 40s) linear infinite;
}
.mq-track > * {
  flex: none;
  margin-right: var(--g, 24px);
}
.mq[data-dir='rev'] .mq-track {
  animation-direction: reverse;
}
.mq:hover .mq-track {
  animation-play-state: var(--hov, running);
}
.mq-y {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mq-y .mq-track {
  flex-direction: column;
  width: auto;
  height: max-content;
  animation-name: mqy;
}
.mq-y .mq-track > * {
  margin-right: 0;
  margin-bottom: var(--g, 24px);
}
[data-vis='0'] .mq-track,
[data-vis='0'].mq-track,
[data-vis='0'] [data-anim] {
  animation-play-state: paused !important;
}
@keyframes mq {
  to {
    transform: translateX(-50%);
  }
}
@keyframes mqy {
  to {
    transform: translateY(-50%);
  }
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* marquee: clone children so translateX(-50%) loops with no seam */
function marquees(root) {
  $$('[data-marquee]', root).forEach(function (m) {
    if (m.__m) return;
    m.__m = 1;
    var kids = Array.prototype.slice.call(m.children);
    var tr = document.createElement('div');
    tr.className = 'mq-track';
    kids.forEach(function (k) {
      tr.appendChild(k);
    });
    kids.forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      tr.appendChild(c);
    });
    m.appendChild(tr);
    m.classList.add(m.dataset.marquee === 'y' ? 'mq-y' : 'mq');
    if (m.dataset.speed) m.style.setProperty('--dur', m.dataset.speed + 's');
  });
}

marquees(document);
```

## Angka

### `st-count`: Count-up trio

Numbers count up once when they enter the view. They show the final value if script or motion is off. Tema demo: `dark`.

**HTML**

```html
<div class="x-st">
  <div>
    <b data-count="100000" data-suffix="+"></b>
    <span>site visits tracked</span>
  </div>
  <div>
    <b data-count="700" data-suffix="+"></b>
    <span>bookings a month</span>
  </div>
  <div>
    <b data-count="110" data-suffix="+"></b>
    <span>partners</span>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-st {
  display: flex;
  gap: 26px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 16px;
}
.x-st b {
  display: block;
  font: 800 clamp(30px, 3.6vw, 46px) / 1 var(--sans);
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
}
.x-st span {
  font: 400 11px var(--mono);
  color: var(--mut);
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;

/* count up once: <b data-count="100000" data-suffix="+"> */
function fmt(v, d) {
  return v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}
var cio = hasIO
  ? new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            cio.unobserve(e.target);
            run(e.target);
          }
        });
      },
      { threshold: 0.4 },
    )
  : null;
function run(el) {
  var to = parseFloat(el.dataset.count),
    d = +(el.dataset.dec || 0),
    suf = el.dataset.suffix || '',
    pre = el.dataset.prefix || '';
  if (reduce) {
    el.textContent = pre + fmt(to, d) + suf;
    return;
  }
  var t0 = performance.now(),
    dur = +(el.dataset.dur || 1500);
  (function f(t) {
    var p = Math.min(1, (t - t0) / dur),
      k = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + fmt(to * k, d) + suf;
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}
function counters(root) {
  $$('[data-count]', root).forEach(function (el) {
    if (el.__c) return;
    el.__c = 1;
    var to = parseFloat(el.dataset.count),
      d = +(el.dataset.dec || 0);
    el.textContent =
      (el.dataset.prefix || '') + fmt(to, d) + (el.dataset.suffix || ''); /* resting value first */
    if (cio && !reduce) {
      el.textContent = (el.dataset.prefix || '') + fmt(0, d) + (el.dataset.suffix || '');
      cio.observe(el);
    }
  });
}

counters(document);
```

### `st-odo`: Odometer

Digits roll to their value. Heavier than a count-up, so use it for one number. Tema demo: `dark`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-od" aria-label="100,000+"></div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-od {
  display: flex;
  align-items: center;
  font: 800 54px/1 var(--sans);
  letter-spacing: -0.04em;
  height: 1em;
  overflow: hidden;
}
.x-od .d {
  height: 1em;
  overflow: hidden;
  display: block;
  width: 0.62em;
}
.x-od .d > div {
  transition: transform 1.6s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: calc(var(--i) * 0.1s);
}
.x-od .d b {
  display: block;
  height: 1em;
  line-height: 1;
  text-align: center;
  font-weight: inherit;
}
.x-od .c {
  width: auto;
  padding: 0 0.03em;
  text-align: center;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-od', s),
    v = '100,000+',
    h = '';
  v.split('').forEach(function (ch, i) {
    if (/\d/.test(ch)) {
      h +=
        '<span class="d"><div style="--i:' +
        i +
        ';--n:' +
        ch +
        '">' +
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          .map(function (n) {
            return '<b>' + n + '</b>';
          })
          .join('') +
        '</div></span>';
    } else h += '<span class="c">' + ch + '</span>';
  });
  el.innerHTML = h;
  function go() {
    $$('.d>div', el).forEach(function (d) {
      d.style.transform = 'translateY(0)';
    });
    void el.offsetWidth;
    $$('.d>div', el).forEach(function (d) {
      d.style.transform = 'translateY(calc(var(--n)*-1em))';
    });
  }
  onView(s, go, 0.5);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `st-rings`: Progress rings

Rings fill with @property on view. Each ring is a real ratio from the portfolio data. Tema demo: `dark`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-rg" id="rg">
  <div>
    <div class="r" style="--c: #7af0c8; --v: 0.6"><b>6/10</b></div>
    <small>agents in daily use</small>
  </div>
  <div>
    <div class="r" style="--c: #b8a4ff; --v: 0.5"><b>22/44</b></div>
    <small>Web3 pages live</small>
  </div>
  <div>
    <div class="r" style="--c: #ffb38a; --v: 0.5"><b>3/6</b></div>
    <small>surfaces live</small>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
@property --p {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}
.x-rg {
  display: flex;
  gap: 22px;
  justify-content: center;
  flex-wrap: wrap;
}
.x-rg .r {
  --p: 0;
  width: 78px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(var(--c) calc(var(--p) * 360deg), #262a31 0);
  display: grid;
  place-items: center;
  position: relative;
  transition: --p 1.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-rg .r::after {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: #0a0c10;
}
.x-rg .r b {
  position: relative;
  z-index: 1;
  font: 700 14px var(--sans);
}
.x-rg.go .r {
  --p: var(--v);
}
.x-rg small {
  display: block;
  text-align: center;
  font: 400 10px var(--mono);
  color: var(--mut);
  margin-top: 8px;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-rg', s);
  function go() {
    el.classList.remove('go');
    void el.offsetWidth;
    el.classList.add('go');
  }
  onView(s, go, 0.5);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `st-spark`: Sparkline that draws

The line draws, the area fades in, the last point pulses. Data here is illustrative. Tema demo: `dark`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-sk">
  <svg viewBox="0 0 300 110">
    <defs>
      <linearGradient id="skg" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#7af0c8" stop-opacity=".35" />
        <stop offset="1" stop-color="#7af0c8" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path
      class="a"
      d="M0 90 L30 80 L60 84 L90 62 L120 66 L150 48 L180 54 L210 34 L240 38 L270 20 L300 10 L300 110 L0 110Z"
    />
    <path
      class="l"
      pathLength="1"
      d="M0 90 L30 80 L60 84 L90 62 L120 66 L150 48 L180 54 L210 34 L240 38 L270 20 L300 10"
    />
    <circle cx="300" cy="10" r="4" />
    <circle class="pp" cx="300" cy="10" r="8" />
  </svg>
  <span
    class="hint"
    style="left: 0; bottom: -18px; position: relative; display: block; margin-top: 6px"
  >
    illustrative data
  </span>
</div>
```

**CSS**

```css
.x-sk {
  width: min(300px, 90%);
}
.x-sk svg {
  width: 100%;
  overflow: visible;
}
.x-sk path.l {
  fill: none;
  stroke: #7af0c8;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.x-sk path.a {
  fill: url(#skg);
  opacity: 0;
}
.x-sk.go path.l {
  animation: x-dash 2s ease-out forwards;
}
.x-sk.go path.a {
  animation: x-fade 1s 1.4s forwards;
}
.x-sk circle {
  fill: #7af0c8;
  opacity: 0;
}
.x-sk.go circle {
  animation: x-fade 0.3s 1.9s forwards;
}
.x-sk .pp {
  fill: none;
  stroke: #7af0c8;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
}
.x-sk.go .pp {
  animation: x-pg 1.8s 2s ease-out infinite;
}
@keyframes x-dash {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes x-fade {
  to {
    opacity: 1;
  }
}
@keyframes x-pg {
  from {
    transform: scale(0.4);
    opacity: 0.9;
  }
  to {
    transform: scale(2.6);
    opacity: 0;
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-sk', s);
  function go() {
    el.classList.remove('go');
    void el.offsetWidth;
    el.classList.add('go');
  }
  onView(s, go, 0.5);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

## Timeline

### `tl-glow`: Glow line timeline

Each entry lights up in turn and draws the line to the next. State changes, not scroll-scrubbing. Tema demo: `dark`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-tl">
  <div>
    <b>2025 · CTO</b>
    <span>Guestlist Ticket across web, mobile, back office and…</span>
  </div>
  <div>
    <b>2024 · Senior Mobile Engineer</b>
    <span>Matching platforms for job seekers and employers.…</span>
  </div>
  <div>
    <b>2022 · Mobile Engineering Lead</b>
    <span>iOS, Android, web and desktop. Led and mentored the …</span>
  </div>
  <div>
    <b>2021 · President</b>
    <span>Led 114 members and more than 40 programs.…</span>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-tl {
  width: min(320px, 90%);
  position: relative;
  padding-left: 26px;
  display: grid;
  gap: 18px;
}
.x-tl > div {
  position: relative;
}
.x-tl > div::before {
  content: '';
  position: absolute;
  left: -19px;
  top: 6px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2a303a;
  transition: all 0.5s;
}
.x-tl > div::after {
  content: '';
  position: absolute;
  left: -15px;
  top: 16px;
  bottom: -24px;
  width: 1.5px;
  background: linear-gradient(#7af0c8, rgba(122, 240, 200, 0.1));
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s;
}
.x-tl > div:last-child::after {
  display: none;
}
.x-tl > div.on::before {
  background: #7af0c8;
  box-shadow: 0 0 0 4px rgba(122, 240, 200, 0.2);
}
.x-tl > div.on::after {
  transform: none;
}
.x-tl b {
  font: 600 14px var(--sans);
  display: block;
}
.x-tl span {
  font: 400 11.5px var(--mono);
  color: var(--mut);
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var items = $$('.x-tl>div', s);
  function go() {
    items.forEach(function (i) {
      i.classList.remove('on');
    });
    items.forEach(function (i, k) {
      setTimeout(
        function () {
          i.classList.add('on');
        },
        350 + k * 520,
      );
    });
  }
  onView(s, go, 0.5);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `tl-snap`: Snap-scroll chips

Native scroll-snap, no JS. Swipe sideways. The browser handles momentum on iPhone. Tema demo: `dark`.

**HTML**

```html
<div class="x-hs">
  <div>
    <b>2025</b>
    <span>CTO, New Directions Success</span>
  </div>
  <div>
    <b>2024</b>
    <span>Senior Mobile Engineer, Jobseeker</span>
  </div>
  <div>
    <b>2022</b>
    <span>Mobile Engineering Lead, BTW Edutech</span>
  </div>
  <div>
    <b>2021</b>
    <span>President, student executive board</span>
  </div>
  <div>
    <b>2019</b>
    <span>Freelance Full-Stack</span>
  </div>
</div>
```

**CSS**

```css
:root {
  --acc: #7af0c8;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-hs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: 100%;
  padding: 0 16px;
  scrollbar-width: none;
}
.x-hs > div {
  flex: 0 0 150px;
  scroll-snap-align: start;
  padding: 14px;
  border-radius: 14px;
  background: #14181f;
  border: 1px solid #2a303a;
}
.x-hs b {
  display: block;
  font: 800 26px/1 var(--sans);
  letter-spacing: -0.04em;
  color: var(--acc);
}
.x-hs span {
  font-size: 12px;
  color: #c7ccd6;
  display: block;
  margin-top: 8px;
  line-height: 1.35;
}
```

**JS:** tidak perlu.

### `tl-steps`: Pipeline with travelling light

A pulse runs along the steps of a process. Used for the new-city pipeline in design direction C (in the review hub). Tema demo: `dark`.

**HTML**

```html
<div class="x-stp">
  <div>
    <i>1</i>
    <span>Find</span>
  </div>
  <div>
    <i>2</i>
    <span>Check</span>
  </div>
  <div>
    <i>3</i>
    <span>Approve</span>
  </div>
  <div>
    <i>4</i>
    <span>Price</span>
  </div>
  <div>
    <i>5</i>
    <span>Live</span>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
}
.x-stp {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: min(320px, 90%);
  padding-top: 6px;
}
.x-stp::before {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  top: 18px;
  height: 2px;
  background: #2a303a;
}
.x-stp::after {
  content: '';
  position: absolute;
  left: 12px;
  top: 16px;
  width: 46px;
  height: 6px;
  border-radius: 6px;
  background: linear-gradient(90deg, transparent, #ffb36b, #fff);
  animation: x-run 3.6s ease-in-out infinite;
}
.x-stp div {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 54px;
}
.x-stp i {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #0a0c10;
  border: 2px solid #ffb36b;
  display: grid;
  place-items: center;
  margin: 0 auto 8px;
  font: 600 11px var(--mono);
  font-style: normal;
  color: #ffb36b;
}
.x-stp span {
  font: 400 10px/1.2 var(--mono);
  color: #a9b0bc;
  display: block;
}
@keyframes x-run {
  from {
    left: 12px;
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  to {
    left: calc(100% - 58px);
    opacity: 0;
  }
}
```

**JS:** tidak perlu.

## Pemisah dan reveal

### `dv-diag`: Diagonal seam with text

A clipped colour block and a tilted marquee on the seam. Replaces a plain horizontal rule. Tema demo: `dark`.

**HTML**

```html
<div class="x-dd">
  <div class="a"></div>
  <span class="t1">Before</span>
  <span class="t2">After</span>
  <div class="b" data-marquee data-speed="18">
    <span>BUILD · SCALE · AUTOMATE · SHIP ·</span>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-dd {
  position: absolute;
  inset: 0;
  background: #0d0f13;
}
.x-dd .a {
  position: absolute;
  inset: 0;
  background: #7af0c8;
  clip-path: polygon(0 0, 100% 0, 100% 40%, 0 70%);
}
.x-dd .b {
  position: absolute;
  left: -5%;
  right: -5%;
  top: 50%;
  margin-top: -20px;
  height: 40px;
  display: flex;
  align-items: center;
  background: #0d0f13;
  color: #fff;
  transform: rotate(-8.5deg);
  overflow: hidden;
}
.x-dd .b span {
  font: 700 13px var(--mono);
  letter-spacing: 0.12em;
  white-space: nowrap;
  padding-right: 30px;
}
.x-dd .t1 {
  position: absolute;
  left: 18px;
  top: 14px;
  font: 800 22px var(--sans);
  color: #06241b;
  letter-spacing: -0.04em;
}
.x-dd .t2 {
  position: absolute;
  right: 18px;
  bottom: 14px;
  font: 800 22px var(--sans);
  letter-spacing: -0.04em;
}
/* dari kit.css */
.mq {
  overflow: hidden;
  display: flex;
}
.mq-track {
  display: flex;
  flex: none;
  width: max-content;
  animation: mq var(--dur, 40s) linear infinite;
}
.mq-track > * {
  flex: none;
  margin-right: var(--g, 24px);
}
.mq[data-dir='rev'] .mq-track {
  animation-direction: reverse;
}
.mq:hover .mq-track {
  animation-play-state: var(--hov, running);
}
.mq-y {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mq-y .mq-track {
  flex-direction: column;
  width: auto;
  height: max-content;
  animation-name: mqy;
}
.mq-y .mq-track > * {
  margin-right: 0;
  margin-bottom: var(--g, 24px);
}
[data-vis='0'] .mq-track,
[data-vis='0'].mq-track,
[data-vis='0'] [data-anim] {
  animation-play-state: paused !important;
}
@keyframes mq {
  to {
    transform: translateX(-50%);
  }
}
@keyframes mqy {
  to {
    transform: translateY(-50%);
  }
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* marquee: clone children so translateX(-50%) loops with no seam */
function marquees(root) {
  $$('[data-marquee]', root).forEach(function (m) {
    if (m.__m) return;
    m.__m = 1;
    var kids = Array.prototype.slice.call(m.children);
    var tr = document.createElement('div');
    tr.className = 'mq-track';
    kids.forEach(function (k) {
      tr.appendChild(k);
    });
    kids.forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      tr.appendChild(c);
    });
    m.appendChild(tr);
    m.classList.add(m.dataset.marquee === 'y' ? 'mq-y' : 'mq');
    if (m.dataset.speed) m.style.setProperty('--dur', m.dataset.speed + 's');
  });
}

marquees(document);
```

### `dv-curtain`: Curtain wipe

A clip-path wipe reveals the next block. Good for before and after, or a section hand-off. Tema demo: `dark`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-cu">
  <h4 class="st">Before</h4>
  <div class="p"><h4 class="st">After</h4></div>
</div>
```

**CSS**

```css
.x-cu {
  position: absolute;
  inset: 0;
  background: #0a0c10;
  display: grid;
  place-items: center;
}
.x-cu .p {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, #ff5a3c, #ffb36b);
  clip-path: inset(0 100% 0 0);
  display: grid;
  place-items: center;
  color: #2a0d05;
}
.x-cu.go .p {
  animation: x-cu 1.1s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}
@keyframes x-cu {
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-cu', s);
  function go() {
    el.classList.remove('go');
    void el.offsetWidth;
    el.classList.add('go');
  }
  onView(s, go, 0.5);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `dv-cross`: Crossing ribbons

Two ribbons cross at a slight angle. design direction E (in the review hub) uses it between index and case studies. Tema demo: `light`.

**HTML**

```html
<div class="x-cr">
  <div class="rib a" data-marquee data-speed="26"><span>Build · Scale · Automate ·</span></div>
  <div class="rib b" data-marquee data-dir="rev" data-speed="30">
    <span>Marketplaces / Mobile / Agents /</span>
  </div>
</div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-cr {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.x-cr .rib {
  position: absolute;
  left: -6%;
  right: -6%;
  top: 50%;
  height: 46px;
  margin-top: -23px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.x-cr .rib span {
  font: 800 22px var(--sans);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  white-space: nowrap;
  padding-right: 20px;
}
.x-cr .a {
  background: #0d0f13;
  color: #fff;
  transform: rotate(-5deg);
}
.x-cr .b {
  background: #2a3cff;
  color: #fff;
  transform: rotate(4deg);
}
/* dari kit.css */
.mq {
  overflow: hidden;
  display: flex;
}
.mq-track {
  display: flex;
  flex: none;
  width: max-content;
  animation: mq var(--dur, 40s) linear infinite;
}
.mq-track > * {
  flex: none;
  margin-right: var(--g, 24px);
}
.mq[data-dir='rev'] .mq-track {
  animation-direction: reverse;
}
.mq:hover .mq-track {
  animation-play-state: var(--hov, running);
}
.mq-y {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mq-y .mq-track {
  flex-direction: column;
  width: auto;
  height: max-content;
  animation-name: mqy;
}
.mq-y .mq-track > * {
  margin-right: 0;
  margin-bottom: var(--g, 24px);
}
[data-vis='0'] .mq-track,
[data-vis='0'].mq-track,
[data-vis='0'] [data-anim] {
  animation-play-state: paused !important;
}
@keyframes mq {
  to {
    transform: translateX(-50%);
  }
}
@keyframes mqy {
  to {
    transform: translateY(-50%);
  }
}
```

**JS**

```javascript
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* marquee: clone children so translateX(-50%) loops with no seam */
function marquees(root) {
  $$('[data-marquee]', root).forEach(function (m) {
    if (m.__m) return;
    m.__m = 1;
    var kids = Array.prototype.slice.call(m.children);
    var tr = document.createElement('div');
    tr.className = 'mq-track';
    kids.forEach(function (k) {
      tr.appendChild(k);
    });
    kids.forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      tr.appendChild(c);
    });
    m.appendChild(tr);
    m.classList.add(m.dataset.marquee === 'y' ? 'mq-y' : 'mq');
    if (m.dataset.speed) m.style.setProperty('--dur', m.dataset.speed + 's');
  });
}

marquees(document);
```

## Navigasi

### `nav-pill`: Sliding pill nav

The white pill glides to the active item. Autoplays until you click. Tema demo: `dark`.

**HTML**

```html
<div class="x-np">
  <span class="ind"></span>
  <a href="#" class="on">Work</a>
  <a href="#">Cases</a>
  <a href="#">Agents</a>
  <a href="#">Contact</a>
</div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-np {
  position: relative;
  display: flex;
  gap: 2px;
  padding: 5px;
  border-radius: 99px;
  background: #14181f;
  border: 1px solid #2a303a;
}
.x-np a {
  position: relative;
  z-index: 1;
  padding: 10px 16px;
  border-radius: 99px;
  font: 500 13.5px/1 var(--sans);
  text-decoration: none;
  color: #a9b0bc;
  transition: color 0.3s;
}
.x-np a.on {
  color: #0d0f13;
}
.x-np .ind {
  position: absolute;
  z-index: 0;
  top: 5px;
  bottom: 5px;
  left: 0;
  width: 60px;
  border-radius: 99px;
  background: #fff;
  transition:
    transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
    width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function init(s) {
  var np = $('.x-np', s),
    ind = $('.ind', np),
    as = $$('a', np),
    cur = 0,
    user = false;
  function pos(i) {
    cur = i;
    as.forEach(function (a, k) {
      a.classList.toggle('on', k === i);
    });
    var a = as[i];
    ind.style.width = a.offsetWidth + 'px';
    ind.style.transform = 'translateX(' + (a.offsetLeft - 5) + 'px)';
  }
  as.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      user = true;
      pos(i);
    });
  });
  setTimeout(function () {
    pos(0);
  }, 60);
  window.addEventListener('load', function () {
    pos(cur);
  });
  if (!reduce)
    setInterval(function () {
      if (!user) pos((cur + 1) % as.length);
    }, 2400);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `nav-palette`: Command palette

Type to filter, arrows and Enter work. design direction F (in the review hub) opens it with Cmd or Ctrl K. Tema demo: `dark`.

**HTML**

```html
<div class="x-pa">
  <input placeholder="Go to…" aria-label="Palette" />
  <ul></ul>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
}
.x-pa {
  width: min(300px, 90%);
  background: #14181f;
  border: 1px solid #2a303a;
  border-radius: 14px;
  overflow: hidden;
}
.x-pa input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid #2a303a;
  background: transparent;
  color: #fff;
  font: 400 14px var(--mono);
  padding: 13px 14px;
  outline: 0;
}
.x-pa ul {
  list-style: none;
  margin: 0;
  padding: 5px;
}
.x-pa li {
  padding: 9px 10px;
  border-radius: 8px;
  font-size: 13.5px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.x-pa li small {
  font: 400 10.5px var(--mono);
  color: var(--mut);
}
.x-pa li.on {
  background: #232a36;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  var inp = $('input', s),
    ul = $('ul', s),
    items = [
      'Case studies',
      'Agents',
      'Selected builds',
      'Web3 launch pages',
      'Contact',
      'Toggle theme',
    ],
    sel = 0;
  function r() {
    var q = inp.value.toLowerCase(),
      f = items.filter(function (i) {
        return i.toLowerCase().indexOf(q) > -1;
      });
    sel = Math.min(sel, Math.max(0, f.length - 1));
    ul.innerHTML = f
      .map(function (i, k) {
        return '<li class="' + (k === sel ? 'on' : '') + '">' + i + '<small>go</small></li>';
      })
      .join('');
  }
  inp.addEventListener('input', function () {
    sel = 0;
    r();
  });
  inp.addEventListener('keydown', function (e) {
    var n = ul.children.length;
    if (e.key === 'ArrowDown') {
      sel = (sel + 1) % n;
      r();
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      sel = (sel - 1 + n) % n;
      r();
      e.preventDefault();
    }
  });
  r();
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `nav-overlay`: Menu overlay

A circular clip-path opens from the button and links stagger in. No backdrop blur, safe on iOS. Tema demo: `dark`.

**HTML**

```html
<div class="x-ov">
  <div class="bar">
    <b>Axelano</b>
    <button class="h" type="button" aria-label="Menu">
      <i></i>
      <i></i>
    </button>
  </div>
  <div class="m">
    <a href="#" style="--i: 0">Case studies</a>
    <a href="#" style="--i: 1">Agents</a>
    <a href="#" style="--i: 2">Builds</a>
    <a href="#" style="--i: 3">Contact</a>
  </div>
</div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-ov {
  position: absolute;
  inset: 0;
  background: #0a0c10;
}
.x-ov .bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  position: relative;
  z-index: 3;
}
.x-ov .bar b {
  font: 800 16px var(--sans);
}
.x-ov button.h {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #3a404c;
  background: #14181f;
  position: relative;
}
.x-ov button.h i {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 2px;
  background: #fff;
  transition:
    transform 0.4s,
    top 0.4s;
  border-radius: 2px;
}
.x-ov button.h i:nth-child(1) {
  top: 16px;
}
.x-ov button.h i:nth-child(2) {
  top: 24px;
}
.x-ov.open button.h i:nth-child(1) {
  top: 20px;
  transform: rotate(45deg);
}
.x-ov.open button.h i:nth-child(2) {
  top: 20px;
  transform: rotate(-45deg);
}
.x-ov .m {
  position: absolute;
  inset: 0;
  background: #7af0c8;
  color: #06241b;
  padding: 70px 20px 20px;
  display: grid;
  align-content: start;
  gap: 4px;
  clip-path: circle(0 at calc(100% - 37px) 35px);
  transition: clip-path 0.7s cubic-bezier(0.7, 0, 0.2, 1);
  z-index: 2;
}
.x-ov.open .m {
  clip-path: circle(150% at calc(100% - 37px) 35px);
}
.x-ov .m a {
  font: 800 26px/1.15 var(--sans);
  letter-spacing: -0.04em;
  text-decoration: none;
  color: inherit;
  opacity: 0;
  transform: translateY(18px);
  transition: all 0.5s;
}
.x-ov.open .m a {
  opacity: 1;
  transform: none;
  transition-delay: calc(var(--i) * 0.07s + 0.3s);
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function init(s) {
  var ov = $('.x-ov', s);
  $('button', ov).addEventListener('click', function () {
    ov.classList.toggle('open');
  });
  $$('.m a', ov).forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      ov.classList.remove('open');
    });
  });
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

## Kursor dan pointer

### `cur-disc`: Spotlight disc

A yellow disc eases toward the pointer behind the text. On touch it drifts on its own. Tema demo: `light`.

**HTML**

```html
<div class="x-cd">
  <div class="disc"></div>
  <h4 class="st">Behind the type</h4>
</div>
```

**CSS**

```css
.x-cd {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #eceef1;
  color: #111;
  display: grid;
  place-items: center;
}
.x-cd .disc {
  position: absolute;
  left: 0;
  top: 0;
  width: 120px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffe94a;
  will-change: transform;
}
.x-cd h4 {
  position: relative;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

function init(s) {
  var box = $('.x-cd', s),
    d = $('.disc', s),
    tx = 0,
    ty = 0,
    cx = 0,
    cy = 0,
    had = false,
    run = true,
    t0 = performance.now();
  if (fine)
    box.addEventListener('pointermove', function (e) {
      var r = box.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      had = true;
    });
  if ('IntersectionObserver' in window)
    new IntersectionObserver(function (es) {
      run = es[0].isIntersecting;
    }).observe(box);
  (function f(now) {
    if (run) {
      var r = box.getBoundingClientRect();
      if (!had) {
        var t = (now - t0) / 1000;
        tx = r.width * (0.5 + 0.3 * Math.sin(t * 0.5));
        ty = r.height * (0.5 + 0.25 * Math.sin(t * 0.37 + 1));
      }
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      d.style.transform = 'translate3d(' + (cx - 60) + 'px,' + (cy - 60) + 'px,0)';
    }
    requestAnimationFrame(f);
  })(t0);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `cur-label`: Cursor with a label

A dot follows the pointer and swells into a labelled circle over interactive zones. Desktop only. Tema demo: `ink`.

**HTML**

```html
<div class="x-cl">
  <div data-l="View">Projects</div>
  <div data-l="Drag">Gallery</div>
  <div data-l="Open">Contact</div>
  <div class="cur"><span></span></div>
</div>
<span class="hint">hover the three zones</span>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
}
.x-cl {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  cursor: none;
  background: #0a0c10;
}
.x-cl > div {
  display: grid;
  place-items: center;
  border-right: 1px solid #1c2129;
  font: 600 13px var(--mono);
  color: #a9b0bc;
}
.x-cl > div:last-child {
  border: 0;
}
.x-cl .cur {
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  background: #fff;
  display: grid;
  place-items: center;
  pointer-events: none;
  transition:
    width 0.25s,
    height 0.25s,
    margin 0.25s,
    background 0.25s;
  will-change: transform;
  mix-blend-mode: normal;
  z-index: 5;
}
.x-cl .cur span {
  font: 700 10px var(--mono);
  color: #0d0f13;
  opacity: 0;
  transition: opacity 0.2s;
  text-transform: uppercase;
}
.x-cl .cur.big {
  width: 74px;
  height: 74px;
  margin: -37px 0 0 -37px;
  background: #7af0c8;
}
.x-cl .cur.big span {
  opacity: 1;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

function init(s) {
  var box = $('.x-cl', s),
    cur = $('.cur', s),
    lab = $('span', cur),
    x = 0,
    y = 0,
    tx = 0,
    ty = 0,
    run = true;
  if (!fine) {
    cur.style.display = 'none';
    box.style.cursor = 'auto';
    return;
  }
  box.addEventListener('pointermove', function (e) {
    var r = box.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
    var z = e.target.closest('[data-l]');
    if (z) {
      lab.textContent = z.dataset.l;
      cur.classList.add('big');
    } else cur.classList.remove('big');
  });
  box.addEventListener('pointerleave', function () {
    cur.classList.remove('big');
  });
  if ('IntersectionObserver' in window)
    new IntersectionObserver(function (es) {
      run = es[0].isIntersecting;
    }).observe(box);
  (function f() {
    if (run) {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      cur.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    }
    requestAnimationFrame(f);
  })();
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

## Widget hidup

### `w-globe`: Dotted globe

About 2,900 dots on canvas 2D. Swings between Bali and Las Vegas, drag to turn. Tema demo: `dark`.

> Titik daratan datang dari `AX_DOTS` (site/geo.js, di repo asli: lib/geo-dots.ts). Satu baris = [lintang, [bujur x 10, ...]].

**HTML**

```html
<canvas class="x-gb"></canvas>
```

**CSS**

```css
.x-gb {
  width: 100%;
  height: 100%;
  display: block;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* compact dotted globe used by option H and the component lab. Canvas 2D, time based, pauses off screen. */
window.AXGlobe = function (cv, o) {
  o = o || {};
  var ctx = cv.getContext('2d'),
    D = Math.PI / 180,
    dpr = Math.min(2, window.devicePixelRatio || 1);
  var dots = [];
  AX_DOTS.forEach(function (r) {
    var lat = r[0] * D;
    r[1].forEach(function (l) {
      var lon = (l / 10) * D;
      dots.push([Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)]);
    });
  });
  function vec(lon, lat) {
    lon *= D;
    lat *= D;
    return [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
  }
  var C = o.cities || [
      { n: 'Bali', lon: 115.2, lat: -8.65 },
      { n: 'Las Vegas', lon: -115.14, lat: 36.17 },
    ],
    col = o.color || '188,210,255',
    acc = o.accent || '255,138,90';
  var va = vec(C[0].lon, C[0].lat),
    vb = vec(C[1].lon, C[1].lat),
    om = Math.acos(va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]);
  function arc(t, h) {
    var a = Math.sin((1 - t) * om) / Math.sin(om),
      b = Math.sin(t * om) / Math.sin(om),
      r = 1 + h * Math.sin(Math.PI * t);
    return [(a * va[0] + b * vb[0]) * r, (a * va[1] + b * vb[1]) * r, (a * va[2] + b * vb[2]) * r];
  }
  function rot(v, l, p) {
    var cl = Math.cos(l),
      sl = Math.sin(l),
      X = v[0] * cl - v[2] * sl,
      Z = v[0] * sl + v[2] * cl,
      cp = Math.cos(p),
      sp = Math.sin(p);
    return [X, v[1] * cp - Z * sp, v[1] * sp + Z * cp];
  }
  function ease(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
  var W = 0,
    H = 0,
    R = 0;
  function size() {
    var r = cv.getBoundingClientRect();
    W = r.width || 200;
    H = r.height || 200;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    R = Math.min(W, H) * (o.r || 0.42);
  }
  size();
  window.addEventListener('resize', size);
  var p0 = (o.tilt || 20) * D,
    t0 = performance.now(),
    running = true,
    l0 = C[0].lon * D,
    CYC = o.cycle || 14000,
    manual = false,
    drag = null,
    idle = 0;
  function target(ms) {
    var t = (ms % CYC) / CYC,
      a = C[0].lon * D,
      b = (C[1].lon + 360) * D;
    if (t < 0.2) return a;
    if (t < 0.5) return a + (b - a) * ease((t - 0.2) / 0.3);
    if (t < 0.7) return b;
    return b + (a - b) * ease((t - 0.7) / 0.3);
  }
  function frame(now) {
    var ms = now - t0;
    if (!manual && !reduce) l0 = o.spin ? ms * 0.00006 : target(ms);
    else if (manual && now - idle > 3500) {
      manual = false;
    }
    var cx = W / 2,
      cy = H / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var g = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.25);
    g.addColorStop(0, 'rgba(' + col + ',.2)');
    g.addColorStop(1, 'rgba(' + col + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.25, 0, 7);
    ctx.fill();
    if (o.fill) {
      ctx.fillStyle = o.fill;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 7);
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(' + col + ',.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 7);
    ctx.stroke();
    var sz = Math.max(1.4, R / 150),
      b0 = [],
      b1 = [],
      b2 = [];
    for (var i = 0; i < dots.length; i++) {
      var p = rot(dots[i], l0, p0);
      if (p[2] <= 0) continue;
      var q = p[2] > 0.6 ? b2 : p[2] > 0.3 ? b1 : b0;
      q.push(cx + p[0] * R, cy - p[1] * R);
    }
    [
      [b0, 0.3],
      [b1, 0.6],
      [b2, 1],
    ].forEach(function (x) {
      ctx.fillStyle = 'rgba(' + col + ',' + x[1] + ')';
      for (var j = 0; j < x[0].length; j += 2)
        ctx.fillRect(x[0][j] - sz / 2, x[0][j + 1] - sz / 2, sz, sz);
    });
    var lit = (ms % 3200) / 3200;
    for (var s = 0; s < 56; s++) {
      var t1 = s / 56,
        t2 = (s + 1) / 56,
        q1 = rot(arc(t1, 0.2), l0, p0),
        q2 = rot(arc(t2, 0.2), l0, p0);
      if (
        !(
          (q1[2] > 0.02 || q1[0] * q1[0] + q1[1] * q1[1] > 1.02) &&
          (q2[2] > 0.02 || q2[0] * q2[0] + q2[1] * q2[1] > 1.02)
        )
      )
        continue;
      var near = Math.max(0, 1 - Math.abs(t2 - lit) * 7);
      ctx.strokeStyle = 'rgba(' + acc + ',' + (0.4 + near * 0.6) + ')';
      ctx.lineWidth = 1.2 + near * 2;
      ctx.beginPath();
      ctx.moveTo(cx + q1[0] * R, cy - q1[1] * R);
      ctx.lineTo(cx + q2[0] * R, cy - q2[1] * R);
      ctx.stroke();
    }
    C.forEach(function (c, ci) {
      var q = rot(vec(c.lon, c.lat), l0, p0);
      if (q[2] < 0.05) return;
      var x = cx + q[0] * R,
        y = cy - q[1] * R,
        ph = ((ms + ci * 800) % 2000) / 2000;
      ctx.strokeStyle = 'rgba(' + acc + ',' + (1 - ph) * 0.8 + ')';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(x, y, 3 + ph * 13, 0, 7);
      ctx.stroke();
      ctx.fillStyle = 'rgb(' + acc + ')';
      ctx.beginPath();
      ctx.arc(x, y, 3.4, 0, 7);
      ctx.fill();
      if (o.labels) {
        var fs = Math.max(10, R / 14);
        ctx.font = '500 ' + fs + 'px ui-monospace,monospace';
        ctx.fillStyle = '#fff';
        ctx.fillText(c.n, x + 8, y - 8);
      }
    });
  }
  var raf = 0;
  function loop(now) {
    if (running) frame(now);
    raf = requestAnimationFrame(loop);
  }
  if (reduce) frame(performance.now());
  else raf = requestAnimationFrame(loop);
  if ('IntersectionObserver' in window)
    new IntersectionObserver(function (es) {
      running = es[0].isIntersecting && !document.hidden;
    }).observe(cv);
  if (o.drag) {
    cv.style.touchAction = 'pan-y';
    cv.addEventListener('pointerdown', function (e) {
      drag = { x: e.clientX, l: l0 };
      manual = true;
      try {
        cv.setPointerCapture(e.pointerId);
      } catch (_) {}
    });
    cv.addEventListener('pointermove', function (e) {
      if (!drag) return;
      l0 = drag.l - (e.clientX - drag.x) * 0.008;
      idle = performance.now();
    });
    ['pointerup', 'pointercancel'].forEach(function (n) {
      cv.addEventListener(n, function () {
        drag = null;
        idle = performance.now();
      });
    });
  }
  return {
    stop: function () {
      running = false;
    },
    start: function () {
      running = true;
    },
  };
};

function init(s) {
  AXGlobe($('canvas', s), {
    labels: true,
    drag: true,
    r: 0.38,
    color: '142,197,255',
    accent: '255,138,90',
  });
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `w-orbit`: Tool orbit

Chips ride two counter-rotating rings and stay upright. Replaces a flat skills grid. Tema demo: `dark`.

**HTML**

```html
<div class="x-or">
  <div class="ctr">
    82
    <small>tools, 10 stacks</small>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-or {
  position: relative;
  width: 100%;
  height: 100%;
}
.x-or .ctr {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font: 800 22px var(--sans);
  letter-spacing: -0.04em;
  text-align: center;
}
.x-or .ctr small {
  display: block;
  font: 400 10px var(--mono);
  color: var(--mut);
}
.x-or .ringo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  animation: x-spin var(--d) linear infinite;
}
.x-or .ringo.r {
  animation-direction: reverse;
}
.x-or .pos {
  position: absolute;
  left: 0;
  top: 0;
  transform: rotate(var(--a)) translateX(var(--r));
}
.x-or .oc {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%) rotate(calc(var(--a) * -1));
  white-space: nowrap;
  font: 500 10.5px/1 var(--mono);
  padding: 6px 8px;
  border-radius: 99px;
  background: #171b22;
  border: 1px solid #2a303a;
  animation: x-spinr var(--d) linear infinite;
}
.x-or .ringo.r .oc {
  animation-direction: reverse;
}
.x-or .ol {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px dashed #2d323b;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
@keyframes x-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes x-spinr {
  to {
    transform: translate(-50%, -50%) rotate(calc(var(--a) * -1 - 360deg));
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const tools = [
  'Go',
  'TypeScript',
  'Flutter',
  'Next.js',
  'PostgreSQL',
  'Docker',
  'Claude Code',
  'MCP',
  'n8n',
  'Redis',
  'Playwright',
  'Cloudflare',
  'Gin',
  'Vercel',
  'Astro',
  'Three.js',
];

function init(s) {
  var el = $('.x-or', s);
  function ring(list, r, dur, rev) {
    var h =
      '<div class="ol" style="width:' +
      r * 2 +
      'px;height:' +
      r * 2 +
      'px"></div><div class="ringo' +
      (rev ? ' r' : '') +
      '" style="--d:' +
      dur +
      's">';
    list.forEach(function (t, i) {
      var a = (360 / list.length) * i;
      h +=
        '<div class="pos" style="--a:' +
        a +
        'deg;--r:' +
        r +
        'px"><span class="oc" style="--a:' +
        a +
        'deg;--d:' +
        dur +
        's">' +
        t +
        '</span></div>';
    });
    return h + '</div>';
  }
  el.insertAdjacentHTML(
    'beforeend',
    ring(tools.slice(0, 4), 52, 30) + ring(tools.slice(4, 11), 92, 50, true),
  );
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `w-clock`: Two clocks, day or night

Real local time for Bali and Las Vegas, with a sun or moon from the actual hour. Tema demo: `dark`.

**HTML**

```html
<div class="x-ck">
  <div class="tm" id="ckb">
    <div class="s"></div>
    <div>
      <b>--:--</b>
      <span>Bali · UTC+8</span>
    </div>
  </div>
  <div class="tm" id="ckl">
    <div class="s"></div>
    <div>
      <b>--:--</b>
      <span>Las Vegas · PT</span>
    </div>
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --mut: #8b919c;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-ck {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 12px;
}
.x-ck .tm {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 15px;
  border-radius: 14px;
  background: #14181f;
  border: 1px solid #2a303a;
  min-width: 150px;
}
.x-ck .s {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffe3a8, #ffb36b 55%, #ff7a59);
  flex: none;
}
.x-ck .tm.n .s {
  background: radial-gradient(circle at 65% 35%, #fff, #cfd8ff 35%, #7381c9);
}
.x-ck b {
  display: block;
  font: 700 21px/1 var(--sans);
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}
.x-ck span {
  font: 400 10.5px var(--mono);
  color: var(--mut);
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  function tk() {
    [
      ['#ckb', 'Asia/Makassar'],
      ['#ckl', 'America/Los_Angeles'],
    ].forEach(function (z) {
      var el = $(z[0], s),
        t = new Date().toLocaleTimeString('en-GB', {
          timeZone: z[1],
          hour: '2-digit',
          minute: '2-digit',
        }),
        h = +t.slice(0, 2);
      $('b', el).textContent = t;
      el.classList.toggle('n', h < 6 || h >= 19);
    });
  }
  tk();
  setInterval(tk, 15000);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `w-feed`: Agent activity feed

A new line drops in every couple of seconds. Sample feed, not live data. Tema demo: `dark`.

**HTML**

```html
<div class="x-fd"></div>
```

**CSS**

```css
.x-fd {
  width: min(320px, 92%);
  display: grid;
  gap: 7px;
  overflow: hidden;
  height: 200px;
  align-content: start;
}
.x-fd .fi {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 11px;
  background: #171b22;
  font-size: 13px;
  animation: x-fin 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.x-fd .fi i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex: none;
}
.x-fd .fi b {
  font-weight: 600;
}
.x-fd .fi em {
  font-style: normal;
  color: #a9b0bc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@keyframes x-fin {
  from {
    opacity: 0;
    transform: translateY(-14px);
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function init(s) {
  var F = [
      ['#7af0c8', 'Error alert', 'help code sent'],
      ['#b8a4ff', 'Event import', '42 events staged'],
      ['#ffb38a', 'Agent Board', '18 fields proposed'],
      ['#8ec5ff', 'Ops briefing', 'daily brief posted'],
      ['#7af0c8', 'IT automation', 'pull request opened'],
      ['#b8a4ff', 'Social analytics', 'weekly summary written'],
    ],
    el = $('.x-fd', s),
    n = 0,
    run = true;
  function add() {
    var f = F[n++ % F.length],
      d = document.createElement('div');
    d.className = 'fi';
    d.innerHTML = '<i style="background:' + f[0] + '"></i><b>' + f[1] + '</b><em>' + f[2] + '</em>';
    el.insertBefore(d, el.firstChild);
    while (el.children.length > 5) el.removeChild(el.lastChild);
  }
  for (var i = 0; i < 5; i++) add();
  if ('IntersectionObserver' in window)
    new IntersectionObserver(function (es) {
      run = es[0].isIntersecting;
    }).observe(el);
  if (!reduce)
    setInterval(function () {
      if (run) add();
    }, 2200);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `w-beam`: System beam

Light travels the wires between nodes. design direction B (in the review hub) scales this into a full architecture diagram. Tema demo: `dark`.

**HTML**

```html
<div class="x-ab">
  <svg viewBox="0 0 330 170"><g id="ab"></g></svg>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
}
.x-ab {
  width: min(330px, 94%);
}
.x-ab svg {
  width: 100%;
}
.x-ab .base {
  fill: none;
  stroke: #2a303a;
  stroke-width: 1.5;
}
.x-ab .lt {
  fill: none;
  stroke: #ff5a3c;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-dasharray: 7 93;
  animation: x-flow 2.8s linear infinite;
}
.x-ab .nd {
  fill: #12151b;
  stroke: #2f3641;
  stroke-width: 1.5;
}
.x-ab text {
  font: 500 11px var(--mono);
  fill: #eceef2;
}
@keyframes x-flow {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -100;
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  var g = $('#ab', s),
    h = '',
    ys = [30, 85, 140];
  function cv(x1, y1, x2, y2) {
    var m = (x1 + x2) / 2;
    return 'M' + x1 + ' ' + y1 + ' C' + m + ' ' + y1 + ' ' + m + ' ' + y2 + ' ' + x2 + ' ' + y2;
  }
  ys.forEach(function (y, i) {
    h +=
      '<path class="base" d="' +
      cv(80, y, 150, 85) +
      '"/><path class="lt" pathLength="100" style="animation-delay:-' +
      i * 0.7 +
      's" d="' +
      cv(80, y, 150, 85) +
      '"/>';
  });
  h += '<path class="base" d="M200 85 H240"/><path class="lt" pathLength="100" d="M200 85 H240"/>';
  ['Web', 'Mobile', 'Partner'].forEach(function (t, i) {
    h +=
      '<rect class="nd" x="6" y="' +
      (ys[i] - 14) +
      '" width="74" height="28" rx="8"/><text x="43" y="' +
      (ys[i] + 4) +
      '" text-anchor="middle">' +
      t +
      '</text>';
  });
  h +=
    '<rect class="nd" x="150" y="55" width="50" height="60" rx="10" style="stroke:#ff5a3c"/><text x="175" y="89" text-anchor="middle">API</text><rect class="nd" x="240" y="62" width="82" height="46" rx="10"/><text x="281" y="89" text-anchor="middle">Postgres</text>';
  g.innerHTML = h;
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

## Intro dan loader

### `ld-counter`: Counter and curtain

000 to 100, then a colour curtain lifts. Keep it under three seconds and skip it on return visits. Tema demo: `ink`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-lc">
  <div class="c"></div>
  <div class="n">000</div>
  <div class="after">Welcome.</div>
</div>
```

**CSS**

```css
:root {
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-lc {
  position: absolute;
  inset: 0;
  background: #0a0c10;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.x-lc .n {
  font: 800 78px/1 var(--sans);
  letter-spacing: -0.06em;
  font-variant-numeric: tabular-nums;
  position: relative;
  z-index: 2;
  color: #fff;
}
.x-lc .c {
  position: absolute;
  inset: 0;
  background: #7af0c8;
  transform: translateY(0);
  z-index: 1;
}
.x-lc.go .c {
  animation: x-lift 0.9s cubic-bezier(0.7, 0, 0.2, 1) 2.1s forwards;
}
.x-lc.go .n {
  animation: x-fadeo 0.5s 2s forwards;
}
.x-lc .after {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font: 800 28px var(--sans);
  letter-spacing: -0.04em;
  opacity: 0;
  z-index: 0;
}
.x-lc.go .after {
  animation: x-fade 0.6s 2.6s forwards;
}
@keyframes x-fade {
  to {
    opacity: 1;
  }
}
@keyframes x-lift {
  to {
    transform: translateY(-101%);
  }
}
@keyframes x-fadeo {
  to {
    opacity: 0;
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-lc', s),
    n = $('.n', s);
  function go() {
    el.classList.remove('go');
    n.textContent = '000';
    void el.offsetWidth;
    el.classList.add('go');
    var t0 = performance.now();
    (function f(t) {
      var p = Math.min(1, (t - t0) / 1900),
        k = Math.round(100 * (1 - Math.pow(1 - p, 3)));
      n.textContent = String(k).padStart(3, '0');
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  onView(s, go, 0.6);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `ld-draw`: Monogram that draws

Stroke-dashoffset draws the letters one after the other. Works for a logo or a signature. Tema demo: `dark`.

> Tombol "replay" hanya ada di lab dan sudah dibuang dari kode ini.

**HTML**

```html
<div class="x-ld">
  <svg viewBox="0 0 150 110">
    <path pathLength="1" d="M46 12 V66 Q46 92 20 88" />
    <path pathLength="1" d="M72 92 L98 12 L124 92 M81 64 H115" />
  </svg>
</div>
```

**CSS**

```css
.x-ld svg {
  width: 150px;
  height: 110px;
  overflow: visible;
}
.x-ld path {
  fill: none;
  stroke: #7af0c8;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.x-ld.go path {
  animation: x-dash 1.8s cubic-bezier(0.6, 0, 0.2, 1) forwards;
}
.x-ld.go path:nth-child(2) {
  animation-delay: 0.4s;
  stroke: #b8a4ff;
}
@keyframes x-dash {
  to {
    stroke-dashoffset: 0;
  }
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);
function onView(el, fn, threshold = 0.5) {
  if (!('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(
    (entries, o) => {
      if (entries[0].isIntersecting) {
        o.disconnect();
        fn();
      }
    },
    { threshold },
  ).observe(el);
}

function init(s) {
  var el = $('.x-ld', s);
  function go() {
    el.classList.remove('go');
    void el.offsetWidth;
    el.classList.add('go');
  }
  onView(s, go, 0.6);
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

## Penutup

### `ft-giant`: Giant link, underline sweep

One enormous serif phrase as the whole call to action. The underline sweeps in on hover. Tema demo: `light`.

**HTML**

```html
<a class="x-gt" href="#" onclick="return false">Say hello →</a>
```

**CSS**

```css
.x-gt {
  font:
    italic 400 clamp(54px, 7vw, 92px) / 0.9 'Instrument Serif',
    Georgia,
    serif;
  letter-spacing: -0.03em;
  color: #111;
  text-decoration: none;
  background: linear-gradient(#2a3cff, #2a3cff) 0 100%/0 0.06em no-repeat;
  transition:
    background-size 0.6s cubic-bezier(0.2, 0.7, 0.2, 1),
    color 0.3s;
  display: inline-block;
}
.x-gt:hover {
  background-size: 100% 0.06em;
  color: #2a3cff;
}
```

**JS:** tidak perlu.

### `ft-copy`: Copy to clipboard

Email as selectable text with a copy button and a toast. Placeholder address shown here. Tema demo: `dark`.

**HTML**

```html
<div class="x-cp">
  <button type="button" id="cpb">
    name@domain.com
    <i>⧉</i>
  </button>
  <span class="toast" id="cpt">Copied</span>
</div>
```

**CSS**

```css
:root {
  --acc: #7af0c8;
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-cp {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.x-cp button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font: 500 14px var(--mono);
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px dashed #4a515d;
  background: #14181f;
  color: #fff;
}
.x-cp button i {
  font-style: normal;
  color: var(--acc);
  transition: transform 0.3s;
}
.x-cp .toast {
  font: 600 12px var(--sans);
  padding: 8px 12px;
  border-radius: 99px;
  background: #7af0c8;
  color: #06241b;
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.3s;
}
.x-cp .toast.on {
  opacity: 1;
  transform: none;
}
```

**JS**

```javascript
const $ = (s, r = document) => r.querySelector(s);

function init(s) {
  var b = $('#cpb', s),
    t = $('#cpt', s);
  b.addEventListener('click', function () {
    var done = function () {
      t.classList.add('on');
      setTimeout(function () {
        t.classList.remove('on');
      }, 1600);
    };
    try {
      navigator.clipboard.writeText('name@domain.com').then(done, done);
    } catch (e) {
      done();
    }
  });
}

init(document.querySelector('.stage')); // elemen pembungkus komponen
```

### `ft-ticket`: Tear-off ticket CTA

The stub tears away on hover. The brand tie-in is the whole point. Tema demo: `warm`.

**HTML**

```html
<div class="x-tt">
  <div class="a">
    <small>ADMIT ONE</small>
    <b>Let’s build the next one.</b>
  </div>
  <div class="tear">
    Start
    <br />
    now →
  </div>
</div>
```

**CSS**

```css
:root {
  --mono: 'Sometype Mono', ui-monospace, monospace;
  --sans: 'Figtree', system-ui, sans-serif;
}
.x-tt {
  display: grid;
  grid-template-columns: 1fr auto;
  background: #ff5a3c;
  color: #16090a;
  border-radius: 16px;
  width: min(320px, 92%);
  position: relative;
  overflow: hidden;
}
.x-tt .a {
  padding: 18px 20px;
}
.x-tt .a small {
  font: 700 10px var(--mono);
  letter-spacing: 0.14em;
}
.x-tt .a b {
  display: block;
  font: 800 24px/1.05 var(--sans);
  letter-spacing: -0.045em;
  margin-top: 6px;
}
.x-tt .tear {
  width: 84px;
  border-left: 2px dashed rgba(22, 9, 10, 0.5);
  display: grid;
  place-items: center;
  background: #16090a;
  color: #fff;
  font: 700 12px var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transform-origin: 0 50%;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.x-tt:hover .tear {
  transform: rotate(7deg) translate(4px, 5px);
}
```

**JS:** tidak perlu.
