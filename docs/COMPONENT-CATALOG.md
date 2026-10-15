# Katalog portofolio: blok, komponen, dan efek

Referensi lengkap untuk portfolio.axelano.space (dibuat dari kode sumber branch `main`, 2026-10-16). Isinya 22 blok halaman, 56 komponen efek dalam 14 kategori, aturan yang membuatnya tetap mulus di iPhone, dan urutan membangunnya dari nol. Tujuannya satu: kamu bisa memilih bagian yang kamu suka lalu membuat portofolio sendiri tanpa menebak-nebak.

Dua file pendamping:

- `COMPONENT-CODE.md`: kode HTML, CSS, dan JS yang bisa disalin untuk tiap komponen.
- `catalog.html`: versi interaktif dengan demo hidup, tombol Pilih, dan penyusun prompt (dibagikan terpisah dari repo).

Nama komponen (misalnya `card-spot`) sama di ketiga file, jadi kamu bisa mencarinya di mana saja.

## Isi

- [1. Cara memakai katalog ini](#1-cara-memakai-katalog-ini)
- [2. Prompt siap pakai](#2-prompt-siap-pakai)
- [3. Aturan main](#3-aturan-main)
- [4. Gambaran besar](#4-gambaran-besar)
- [5. Palet dan font](#5-palet-dan-font)
- [6. Susunan halaman](#6-susunan-halaman)
- [7. Perpustakaan komponen](#7-perpustakaan-komponen)
- [8. Frame perangkat dan pipeline aset](#8-frame-perangkat-dan-pipeline-aset)
- [9. Lapisan data](#9-lapisan-data)
- [10. QA dan hasil terukur](#10-qa-dan-hasil-terukur)
- [11. Cara membangun](#11-cara-membangun)
- [12. Ganti sebelum publish](#12-ganti-sebelum-publish)
- [13. Kredit](#13-kredit)

## 1. Cara memakai katalog ini

1. **Lihat dulu hasil jadinya.** Buka portfolio.axelano.space di laptop dan di HP. Catat bagian yang kamu suka.
2. **Cari bagian itu di Susunan halaman.** 22 blok halaman, masing-masing menyebut efek apa yang dipakai dan file mana yang membuatnya.
3. **Lihat efeknya sendirian di Perpustakaan komponen.** Tiap komponen punya demo hidup, kode HTML, CSS, dan JS yang bisa disalin, dan catatan perilakunya di iPhone.
4. **Pilih dan salin daftarnya.** Tekan Pilih pada blok dan komponen. Bar di bawah layar menyusun daftar dan prompt untuk asisten AI.
5. **Bangun dengan urutan di bagian Cara membangun.** Mulai dari fondasi (token, reset, FxRoot), tambah section satu per satu, ganti semua konten, jalankan skrip QA.

## 2. Prompt siap pakai

Tempel ke asisten AI yang bekerja di repo kosongmu, lalu isi bagian dalam kurung siku. Kalau memakai `catalog.html`, tombol Salin prompt menyusun versi yang sudah terisi daftar pilihanmu.

```text
Bangun portofolio pribadi dengan Next.js 14 (App Router, TypeScript) dan CSS biasa, bergaya seperti portfolio.axelano.space. Semua gerak harus berupa keyframe CSS berbasis waktu atau reveal sekali jalan lewat IntersectionObserver. Jangan memakai animasi yang mengikuti scroll (useScroll, ScrollTrigger scrub, Lenis, parallax), jangan memakai filter: blur besar atau backdrop-filter di elemen fixed atau sticky, dan jangan memakai library animasi. Font di-host sendiri lewat @fontsource. Hormati prefers-reduced-motion. Semua konten diisi dari file config/*.ts.

Blok halaman yang saya mau: [id blok dari bagian 6, misalnya hero, trailer, live, atlas, contact]
Komponen efek yang saya mau: [id dari bagian 7, misalnya btn-beam, card-spot, w-globe, st-rings]
Kode referensi tiap komponen ada di COMPONENT-CODE.md (saya tempel di bawah).
Konten saya: [nama, peran, bio, proyek, kontak]
```

## 3. Aturan main

Sebelas aturan ini yang membuat situsnya mulus di iPhone. Kalau kamu menambah efek baru, cek dulu terhadap daftar ini.

1. **Tanpa gerak yang mengikuti scroll.** Tidak ada useScroll, ScrollTrigger scrub, Lenis, atau parallax. Ini sumber masalah "tidak jalan di iPhone". Gantinya: keyframe CSS berbasis waktu, reveal sekali jalan (IntersectionObserver menambah class sekali), CSS `position: sticky`, dan `scroll-snap` bawaan browser.
2. **Tanpa blur berat.** Tidak ada `filter: blur()` besar dan tidak ada `backdrop-filter` di elemen fixed atau sticky (WebKit mengecatnya ulang tiap scroll). Glow dibuat dari `radial-gradient` atau fill berlapis opacity rendah. Efek kaca = gradien + highlight dalam (`inset box-shadow`), bukan blur.
3. **Semua yang berulang berhenti saat di luar layar.** Setiap section memakai `data-pausable`; script memberi `data-vis="0"` saat keluar layar, dan CSS menjeda semua animasi di dalamnya. Canvas dan interval juga berhenti saat tab tersembunyi.
4. **Canvas hanya bila perlu, 2D saja.** Hanya dua canvas: globe titik dan grid ripple di kontak. DPR dibatasi 2. Tidak ada WebGL atau three.js (yang berat ada di versi lama dan dibuang).
5. **Gambar tidak pernah digambar lebih besar dari ukuran aslinya.** Tangkapan layar diambil 2x, frame mengikuti rasio aslinya (ponsel pakai rasio screenshot, browser 16:10), dan tidak ada gambar yang ditarik melebihi ukuran piksel aslinya x DPR. Item yang tidak punya tangkapan nyata diberi tile polos, bukan mockup palsu.
6. **Bagian atas halaman tidak menunggu JavaScript.** Animasi masuk hero memakai CSS murni (`.rise`). Class `.js` dipasang script kecil di `<head>` dan dilepas lagi setelah 5 detik bila hydration gagal, jadi konten tidak pernah tertahan tersembunyi.
7. **Reduced motion dihormati.** Dengan `prefers-reduced-motion` semua animasi langsung selesai, semua konten terlihat, intro dilewati, dan angka tampil dalam nilai akhir.
8. **Tidak ada jebakan scroll di layar sentuh.** Tidak ada `overscroll-behavior: contain` pada area gulir di dalam halaman. Canvas dan area yang bisa digeser memakai `touch-action: pan-y`. Efek pointer (spotlight, tilt, kursor) hanya aktif di `(hover: hover) and (pointer: fine)`.
9. **Font self-host, nol permintaan pihak ketiga.** Outfit Variable, Inter, JetBrains Mono lewat Fontsource (subset latin). Ikon merek dari sprite SVG sendiri (Simple Icons, CC0).
10. **Blok dekoratif dipasang saat mendekati layar.** `LazyMount` merender dinding layar, baris marquee Builds, dan pita stack hanya saat sudah dekat viewport. Saat dimuat di iPhone 14, halaman berisi ±1.900 elemen DOM.
11. **Yang sengaja TIDAK dipakai.** `content-visibility: auto` dengan perkiraan tinggi: diuji, lompatan anchor pertama meleset sampai 3.000 px, jadi dibuang. Menambah `overscroll-behavior: contain` di terminal: mengunci scroll halaman di iPhone, dibuang.

## 4. Gambaran besar

| Bagian | Isi |
| --- | --- |
| Next.js 14.2.35 | App Router, TypeScript. Versi 14.2.35 ke atas menutup advisory DoS CVE-2025-55184 dan CVE-2025-67779. |
| CSS biasa | Tujuh file di `styles/`, tanpa Tailwind. Seluruh gerak adalah keyframe CSS. |
| Font self-host | `@fontsource-variable/outfit`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (hanya subset latin). |
| Deploy | Vercel dari branch `main`, Node 24.x, tanpa lockfile (`.npmrc package-lock=false`). |
| Dependensi runtime | `next`, `react`, `react-dom`, tiga paket font, `sharp`. Tidak ada library animasi. |

Struktur repo:

```text
app/
  layout.tsx            metadata, script di <head>, Intro, FxRoot, Navbar, Footer, Palette, CursorLabel
  page.tsx              urutan 15 section
  providers.tsx         provider bahasa (EN/ID)
  error.tsx             halaman error
  robots.ts  sitemap.ts  manifest.ts  icon.svg  favicon.ico  apple-icon.png
  cases/[id]/page.tsx   halaman studi kasus (statis)
  sections/             satu file per section:
    hero  ribbon  trailer  platform  system  live  cases  atlas
    agents  wall  builds  terminal  about  arsenal  contact
components/
  ui.tsx                Mark, Logo, StatusPill, PhoneFrame, BrowserFrame, Marquee, WeightWave
  fx-root.tsx           reveal, count-up, jeda di luar layar, spotlight, tilt, decode teks
  intro.tsx  nav.tsx  palette.tsx  cursor-label.tsx  globe.tsx  footer.tsx
  lazy-mount.tsx        render saat mendekati layar
  on-view.tsx           tambah class sekali saat terlihat
config/                 semua isi ada di sini, bukan di JSX (lihat bagian Lapisan data)
lib/
  i18n.tsx  events.ts  css.ts  geo-dots.ts
styles/
  globals.css           impor font lalu keenam file di bawah
  base.css              token, reset, tombol, chip, grid
  fx.css                reveal, marquee, frame ponsel dan browser, beam, kursor, intro
  top.css               navbar, hero, pita, trailer, platform
  mid.css               peta sistem, tile hidup, case files, atlas
  deep.css              agents, dinding layar, builds, terminal
  end.css               about, arsenal, kontak, palette
public/
  work/{t,phone,gl,photo,poster}/   screenshot dan foto (WebP)
  logos/sprite.svg      62 logo alat dan merek
  og-image.png  icon-192.png  icon-512.png  icon-maskable-512.png  logo.svg  resume.pdf
```

Alur render: `app/layout.tsx` memasang script kecil di `<head>` (kelas `.js`, keputusan intro), lalu `Intro`, `FxRoot`, `Navbar`, `<main>` berisi lima belas section dari `app/page.tsx`, `Footer`, `Palette`, dan `CursorLabel`. Semua isi teks dan angka diambil dari `config/*.ts`, sehingga mengganti konten tidak menyentuh JSX.

## 5. Palet dan font

Satu warna antarmuka (cyan), satu warna penekanan (emas), satu warna untuk yang hidup atau panas (coral). Latar biru-hitam dengan sedikit hue, bukan hitam murni.

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `--bg` | `#050f16` | latar halaman |
| `--bg-1` | `#09151e` | permukaan kartu |
| `--bg-2` | `#0e1f2b` | permukaan terangkat |
| `--bg-3` | `#15303f` | chip, badge |
| `--line` | `rgba(150,200,225,.13)` | garis tipis |
| `--line-2` | `rgba(150,200,225,.26)` | garis tegas |
| `--fg` | `#e8f1f6` | teks utama |
| `--mut` | `#9bb1be` | teks sekunder |
| `--faint` | `#6d8797` | teks paling redup |
| `--cy` | `#2dd4e8` | warna antarmuka: tombol, link, fokus |
| `--cy-hi` | `#7cebf7` | cyan hover |
| `--gold` | `#e9c27d` | penekanan: kata sorot, angka |
| `--gold-hi` | `#fbe3b0` | highlight emas |
| `--coral` | `#ff7b5c` | HANYA untuk live/panas: denyut, langkah terakhir |
| `--mint` | `#4fe0bd` | status sehat |

| Font | Peran |
| --- | --- |
| `Outfit Variable` | judul. Berat 800, tracking rapat (-.03 sampai -.06em). Sumbu berat dipakai di efek tx-variable. |
| `Inter` | teks isi, 16px/1.6. |
| `JetBrains Mono` | label 11-12px kapital, tracking +.12 sampai +.16em, angka, kode. |

## 6. Susunan halaman

22 blok. Setiap blok menyebut efek apa yang dipakai (id sama dengan bagian 7) dan file mana yang membuatnya.

### Lapisan global

Dipasang sekali di layout atau dipakai semua section.

| No | Id | Blok | Tugas | Efek |
| --- | --- | --- | --- | --- |
| 1 | `intro` | Intro (preloader) | Kesan pertama 2 detik, sekali per sesi. | `ld-counter`, `ld-draw` |
| 2 | `nav` | Navbar | Navigasi desktop dan HP. | `nav-pill`, `nav-overlay` |
| 3 | `palette` | Command palette | Loncat ke bagian mana pun dengan keyboard. | `nav-palette` |
| 4 | `cursor` | Kursor berlabel | Petunjuk interaksi di desktop. | `cur-label` |
| 5 | `fxroot` | FxRoot (mesin efek global) | Satu komponen tanpa markup yang menghidupkan atribut di seluruh halaman. | `tx-scramble`, `card-spot`, `card-tilt`, `st-count` |
| 6 | `footer` | Footer | Penutup kecil. | - |

### Section halaman

Urutannya sama dengan `app/page.tsx`.

| No | Id | Blok | Tugas | Efek |
| --- | --- | --- | --- | --- |
| 7 | `hero` | Hero | Pernyataan utama + produk asli di depan mata. | `bg-rays`, `btn-beam`, `btn-pulse`, `dev-phone`, `tx-shine` |
| 8 | `ribbon` | Pita diagonal | Pemisah yang memuat angka. | `dv-diag` |
| 9 | `trailer` | Trailer 26 detik | Cerita lengkap tanpa membaca, seperti story. | `tx-split` |
| 10 | `platform` | Platform (panggung 6 permukaan) | Menunjukkan satu produk di enam permukaan. | `dev-fan`, `dev-laptop`, `dev-phone`, `dev-browser` |
| 11 | `system` | Peta sistem | Menunjukkan cara berpikir arsitektur. | `w-beam` |
| 12 | `live` | Tile hidup | Angka yang tetap bergerak. | `w-clock`, `st-odo`, `st-rings`, `w-orbit`, `w-feed`, `card-spot` |
| 13 | `cases` | Case files | Tiga studi kasus dengan visual yang bergerak. | - |
| 14 | `atlas` | Atlas (globe + kota + pipeline) | Cerita ekspansi: satu platform, kota demi kota. | `w-globe`, `card-tilt`, `card-spot`, `tl-steps`, `st-count` |
| 15 | `agents` | Agents | Menunjukkan agent AI dan status jujurnya. | `bg-meteors`, `w-feed` |
| 16 | `wall` | Dinding layar | Bukti lewat jumlah. | `mq-wall`, `tx-variable` |
| 17 | `builds` | Builds (baris, pencarian, kartu) | Semua karya, bisa dicari. | `mq-two`, `cur-label`, `card-reveal` |
| 18 | `terminal` | Terminal + diff | Cara berbeda membaca portofolio. | - |
| 19 | `about` | About | Siapa, dan jalur kariernya. | `tl-glow`, `tl-snap`, `w-beam`, `card-glass`, `bg-aurora` |
| 20 | `arsenal` | Arsenal | Semua alat yang dipakai. | `mq-chips` |
| 21 | `contact` | Kontak | Satu ajakan yang jelas. | `bg-dots`, `cur-disc`, `dv-curtain`, `card-neon`, `ft-copy`, `btn-beam`, `card-tilt` |

### Halaman lain

| No | Id | Blok | Tugas | Efek |
| --- | --- | --- | --- | --- |
| 22 | `cases-pages` | Halaman studi kasus | Tulisan lengkap per kasus (SEO). | - |

### Detail tiap blok

#### 1. Intro (preloader) (`intro`)

**Tugas:** Kesan pertama 2 detik, sekali per sesi.  
**Efek:** `ld-counter`, `ld-draw`  
**File:** `components/intro.tsx`, `styles/fx.css (.ld*)`, `app/layout.tsx (script head)`  
**Cara kerja:** Monogram digambar (stroke-dashoffset), angka 000 ke 100 selama 1,2 s (rAF, ease-out), tirai cyan naik lalu overlay dilepas. Muncul hanya di `/`, hanya kunjungan pertama sesi (`sessionStorage ax-seen`), dilewati bila reduced-motion atau `?nointro`.

**Catatan:** Tap, klik, atau tombol apa pun melewatinya. Failsafe CSS menyembunyikannya setelah 4,6 s bila JS tidak jalan. Selama intro, animasi reveal dijeda supaya hero tampil setelah tirai naik.

#### 2. Navbar (`nav`)

**Tugas:** Navigasi desktop dan HP.  
**Efek:** `nav-pill`, `nav-overlay`  
**File:** `components/nav.tsx`, `styles/top.css (.nv .np .ov .hb .lang .kb)`  
**Cara kerja:** Pil cyan meluncur ke link aktif (ukur `offsetLeft` dan `offsetWidth`, transisi transform dan width). Link aktif ditentukan IntersectionObserver (`rootMargin: -45% 0 -50%`). Di HP: tombol hamburger membuka overlay dengan `clip-path: circle()` yang membesar dan link yang muncul berurutan; halaman di belakangnya dikunci scroll-nya.

**Catatan:** Bar solid (tanpa backdrop blur). Tombol EN/ID mengganti bahasa (context + localStorage). Tombol Search membuka palette.

#### 3. Command palette (`palette`)

**Tugas:** Loncat ke bagian mana pun dengan keyboard.  
**Efek:** `nav-palette`  
**File:** `components/palette.tsx`, `styles/end.css (.pal .pbox)`, `lib/events.ts`  
**Cara kerja:** Cmd atau Ctrl + K. Ketik untuk menyaring, panah atas bawah, Enter, Esc. Aksi (putar ulang trailer, jalankan whoami, salin email, ulang intro) dikirim lewat custom event `window`.

**Catatan:** Di HP dibuka dari menu overlay (tombol Search).

#### 4. Kursor berlabel (`cursor`)

**Tugas:** Petunjuk interaksi di desktop.  
**Efek:** `cur-label`  
**File:** `components/cursor-label.tsx`, `styles/fx.css (.cl)`  
**Cara kerja:** Elemen bertanda `data-cur="Open"` memunculkan lingkaran yang mengikuti pointer dengan easing dan menampilkan label. rAF hanya berjalan selama kursor ada di zona itu.

**Catatan:** Hanya `(hover: hover) and (pointer: fine)`. Berhenti saat scroll.

#### 5. FxRoot (mesin efek global) (`fxroot`)

**Tugas:** Satu komponen tanpa markup yang menghidupkan atribut di seluruh halaman.  
**Efek:** `tx-scramble`, `card-spot`, `card-tilt`, `st-count`  
**File:** `components/fx-root.tsx`, `styles/fx.css`  
**Cara kerja:** `.rv` reveal sekali (IO), `[data-count]` hitung naik sekali, `[data-pausable]` memberi `data-vis`, `[data-spot]` spotlight yang mengikuti kursor, `[data-tilt]` miring 3D, `.eyebrow` dan `.dec` efek decode teks.

**Catatan:** Semua dipasang di satu `useEffect`. Dengan reduced-motion: reveal langsung tampil, angka langsung final, decode mati. Jeda di luar layar dan efek pointer tetap aktif.

#### 6. Footer (`footer`)

**Tugas:** Penutup kecil.  
**File:** `components/footer.tsx`  
**Cara kerja:** Hak cipta, monogram, dan tautan "replay intro".

#### 7. Hero (`hero`)

**Tugas:** Pernyataan utama + produk asli di depan mata.  
**Efek:** `bg-rays`, `btn-beam`, `btn-pulse`, `dev-phone`, `tx-shine`  
**File:** `app/sections/hero.tsx`, `styles/top.css (.hr*)`, `config/media.ts (heroPhone, PHOTO)`  
**Cara kerja:** Foto venue bergerak pelan (transform, 38 s), dua sinar cahaya konik yang mengayun, tiga ponsel melayang dengan kilau yang lewat tiap 7 s, empat kartu info kecil melayang (`.hr-float`), headline dengan kata sorot bergradien yang bergerak, tombol utama dengan border berputar, tombol kedua dengan dua cincin berdenyut.

**Catatan:** Foto latar pakai `srcSet` 900w dan 1600w dengan `sizes` sengaja dikecilkan (latar gelap, hemat byte). Ponsel tengah 640w, sisi 480w. Animasi masuk CSS murni.

#### 8. Pita diagonal (`ribbon`)

**Tugas:** Pemisah yang memuat angka.  
**Efek:** `dv-diag`  
**File:** `app/sections/ribbon.tsx`, `styles/top.css (.diag)`  
**Cara kerja:** Strip bergradien dimiringkan -1,6 derajat, isinya marquee fakta.

**Catatan:** Menggantikan garis pemisah biasa.

#### 9. Trailer 26 detik (`trailer`)

**Tugas:** Cerita lengkap tanpa membaca, seperti story.  
**Efek:** `tx-split`  
**File:** `app/sections/trailer.tsx`, `styles/top.css (.rl*)`  
**Cara kerja:** Enam bab (`.ch`) dengan warna sendiri-sendiri, bar progres di atas, zona tap (kiri 32% mundur, kanan 68% maju), tahan 220 ms untuk jeda, panah keyboard, angka naik di bab 3, tombol ulang. Hanya berputar saat minimal 35% terlihat dan otomatis jeda di luar layar.

**Catatan:** Murni keyframe CSS dan satu timeout. Teks masuk lewat mask per baris (`.ml`).

#### 10. Platform (panggung 6 permukaan) (`platform`)

**Tugas:** Menunjukkan satu produk di enam permukaan.  
**Efek:** `dev-fan`, `dev-laptop`, `dev-phone`, `dev-browser`  
**File:** `app/sections/platform.tsx`, `styles/top.css (.sg*)`, `config/site.ts (SURFACES)`  
**Cara kerja:** Tab di kiri, panggung di kanan. Berganti otomatis tiap 5,5 s dengan bar progres, jeda saat hover, fokus, atau di luar layar. Jenis slide: browser, kipas ponsel, dua ponsel, laptop, ponsel melayang.

**Catatan:** Frame mengikuti rasio gambar sehingga layar utuh dan tidak terpotong.

#### 11. Peta sistem (`system`)

**Tugas:** Menunjukkan cara berpikir arsitektur.  
**Efek:** `w-beam`  
**File:** `app/sections/system.tsx`, `styles/mid.css (.ar*)`  
**Cara kerja:** SVG dari array node dan kurva Bezier. "Cahaya" = path dengan `stroke-dasharray: 8 92` pada `pathLength=100` yang `stroke-dashoffset`-nya dianimasikan. Node berkedip bergiliran.

**Catatan:** Di bawah 860 px SVG disembunyikan dan diganti tumpukan vertikal (permukaan, gateway, 6 service Go, PostgreSQL, agent) dengan batang cahaya turun di antara tahap, karena SVG terlalu kecil dibaca di HP.

#### 12. Tile hidup (`live`)

**Tugas:** Angka yang tetap bergerak.  
**Efek:** `w-clock`, `st-odo`, `st-rings`, `w-orbit`, `w-feed`, `card-spot`  
**File:** `app/sections/live.tsx`, `styles/mid.css (.bn*)`, `components/on-view.tsx`  
**Cara kerja:** Jam Bali dan Las Vegas (`Intl timeZone`), odometer (kolom digit yang bergeser), loop 328 ke 70 dengan batang, orbit alat berupa badge logo di dua cincin berlawanan arah, cincin status (`@property --p` + conic-gradient), feed agent.

**Catatan:** Feed adalah contoh dan diberi label "sample". Rasio cincin dihitung dari config sehingga ikut berubah bila status berubah.

#### 13. Case files (`cases`)

**Tugas:** Tiga studi kasus dengan visual yang bergerak.  
**File:** `app/sections/cases.tsx`, `styles/mid.css (.cs*)`, `app/cases/[id]/page.tsx`  
**Cara kerja:** Kartu menumpuk dengan CSS `position: sticky` di layar lebar. Tiap kartu punya visual sendiri: batang yang tumbuh (`grow`), chip yang berkedip bergiliran (`blip`), atau kolase foto. Ada halaman penuh per studi kasus (statis, dengan metadata dan OG).

**Catatan:** Sticky dimatikan di HP: kartu tinggi akan menutupi separuh bawah kartu sebelumnya.

#### 14. Atlas (globe + kota + pipeline) (`atlas`)

**Tugas:** Cerita ekspansi: satu platform, kota demi kota.  
**Efek:** `w-globe`, `card-tilt`, `card-spot`, `tl-steps`, `st-count`  
**File:** `app/sections/atlas.tsx`, `components/globe.tsx`, `lib/geo-dots.ts`, `styles/mid.css (.at*)`  
**Cara kerja:** Globe canvas 2D: 2.901 titik daratan (Natural Earth 110m, jarak 2 derajat), proyeksi ortografis dengan matriks rotasi, sisi malam dari posisi matahari asli (UTC), busur lingkaran besar dengan cahaya berjalan, pin berdenyut, bisa diputar dengan drag. Siklus 16 s Bali ke Las Vegas dan kembali.

**Catatan:** Data titik (`lib/geo-dots.ts`, ±14 KB) di-import dinamis sehingga tidak masuk bundle awal. Canvas berhenti di luar layar dan saat tab tersembunyi.

#### 15. Agents (`agents`)

**Tugas:** Menunjukkan agent AI dan status jujurnya.  
**Efek:** `bg-meteors`, `w-feed`  
**File:** `app/sections/agents.tsx`, `styles/deep.css (.ags .ag*)`, `config/work.ts (AGENTS)`  
**Cara kerja:** Meteor di latar (16 garis, posisi tetap agar tidak beda antara server dan browser), log contoh di terminal yang menempel di desktop, daftar agent dikelompokkan menurut status (dipakai harian, sedang dibangun, terkirim).

**Catatan:** Baris log hanya bergeser masuk (transform), tidak memudar, supaya kontras teks stabil.

#### 16. Dinding layar (`wall`)

**Tugas:** Bukti lewat jumlah.  
**Efek:** `mq-wall`, `tx-variable`  
**File:** `app/sections/wall.tsx`, `styles/deep.css (.wl*)`, `components/lazy-mount.tsx`  
**Cara kerja:** Lima kolom marquee vertikal di bidang 3D miring (`perspective: 1700px`, `rotateX(50deg) rotateZ(-22deg)`), arah bergantian. Judul memakai gelombang berat huruf (sumbu wght Outfit Variable).

**Catatan:** Dipasang saat mendekati layar. Gelombang huruf mati di HP dan saat reduced-motion.

#### 17. Builds (baris, pencarian, kartu) (`builds`)

**Tugas:** Semua karya, bisa dicari.  
**Efek:** `mq-two`, `cur-label`, `card-reveal`  
**File:** `app/sections/builds.tsx`, `config/builds.ts`, `styles/deep.css (.bd*)`  
**Cara kerja:** Dua baris thumbnail berjalan berlawanan arah, kotak cari (substring dengan penanda `<mark>`), chip filter dengan jumlah, 12 kartu pertama lalu "Show more". Media kartu: tangkapan 16:10, poster ponsel utuh, atau tile polos berinisial.

**Catatan:** Event `ax:builds` dikirim terminal (`open golden`).

#### 18. Terminal + diff (`terminal`)

**Tugas:** Cara berbeda membaca portofolio.  
**File:** `app/sections/terminal.tsx`, `config/site.ts (DIFFS)`, `styles/deep.css (.tm .df)`  
**Cara kerja:** Terminal menjawab help, whoami, ls, cat cases/x, agents, stack, web3, open <kata>, reel, globe, clear, dengan riwayat panah. Mengetik demo otomatis saat pertama terlihat. Tiga studi kasus ditampilkan sebagai diff git dengan baris yang muncul berurutan.

**Catatan:** Area gulir terminal tidak memakai overscroll-behavior: contain supaya jari bisa menggeser halaman.

#### 19. About (`about`)

**Tugas:** Siapa, dan jalur kariernya.  
**Efek:** `tl-glow`, `tl-snap`, `w-beam`, `card-glass`, `bg-aurora`  
**File:** `app/sections/about.tsx`, `styles/end.css (.ab .tlg .tls .qts)`  
**Cara kerja:** Bio dua bahasa, SVG jalur request, timeline yang menyala satu per satu (IO sekali), di HP berubah jadi chip `scroll-snap` yang bisa digeser, dua testimoni dalam kartu kaca dengan blob warna di belakang.

**Catatan:** Kutipan testimoni apa adanya dari rekomendasi LinkedIn.

#### 20. Arsenal (`arsenal`)

**Tugas:** Semua alat yang dipakai.  
**Efek:** `mq-chips`  
**File:** `app/sections/arsenal.tsx`, `config/arsenal.ts`, `config/logos.ts`, `public/logos/sprite.svg`  
**Cara kerja:** Pita dua baris chip bermerek, lalu kartu per stack dengan logo di setiap alat.

**Catatan:** Logo dari satu sprite SVG (62 simbol). Alat tanpa logo tampil sebagai teks saja.

#### 21. Kontak (`contact`)

**Tugas:** Satu ajakan yang jelas.  
**Efek:** `bg-dots`, `cur-disc`, `dv-curtain`, `card-neon`, `ft-copy`, `btn-beam`, `card-tilt`  
**File:** `app/sections/contact.tsx`, `styles/end.css (.ct* .links .toast)`  
**Cara kerja:** Grid titik ripple (canvas), cakram emas lembut yang mengejar pointer (melayang sendiri di layar sentuh), judul outline yang diisi gradien lewat clip-path, kartu dengan border gradien bergerak, tombol salin email dengan toast, tiga kartu cara memulai, empat link dengan logo merek.

**Catatan:** Toast `position: fixed` ada di tengah bawah layar, jadi section ini tidak boleh memakai `content-visibility`/`contain`.

#### 22. Halaman studi kasus (`cases-pages`)

**Tugas:** Tulisan lengkap per kasus (SEO).  
**File:** `app/cases/[id]/page.tsx`, `config/cases.ts`, `app/sitemap.ts`  
**Cara kerja:** Tiga halaman statis (`generateStaticParams`) dengan masalah, kendala, pendekatan, hasil, dan "yang masih terbuka". Metadata dan OG per halaman.

**Catatan:** Bagian "Still open" sengaja jujur tentang yang belum selesai.

## 7. Perpustakaan komponen

56 komponen dalam 14 kategori. 43 sudah dipakai di situs, 13 menjadi cadangan yang siap dipasang. Setiap komponen sudah diuji aman untuk iPhone: tidak ada yang mengikuti scroll, tidak ada blur berat. 54 dari 56 berbeban rendah.

**Pemicu:** jalan sendiri (keyframe CSS atau waktu), sekali saat terlihat, hover, pointer (hanya desktop), tap atau klik, canvas berbasis waktu, JS ringan, CSS native, keyboard. **Beban:** rendah berarti hanya transform atau opacity; sedang berarti layout dihitung ulang atau ada canvas yang lebih besar.

### Peta singkat

| Kategori | Jumlah | Id komponen |
| --- | --- | --- |
| Latar hero | 5 | `bg-aurora`, `bg-grid`, `bg-meteors`, `bg-dots`, `bg-rays` |
| Efek headline | 5 | `tx-shine`, `tx-rotate`, `tx-scramble`, `tx-split`, `tx-variable` |
| Tombol | 6 | `btn-beam`, `btn-shimmer`, `btn-magnetic`, `btn-arrow`, `btn-pulse`, `btn-swap` |
| Kartu | 7 | `card-spot`, `card-tilt`, `card-neon`, `card-flip`, `card-reveal`, `card-glass`, `card-ticket` |
| Perangkat dan frame | 4 | `dev-phone`, `dev-fan`, `dev-browser`, `dev-laptop` |
| Marquee dan ticker | 4 | `mq-chips`, `mq-two`, `mq-wall`, `mq-tape` |
| Angka | 4 | `st-count`, `st-odo`, `st-rings`, `st-spark` |
| Timeline | 3 | `tl-glow`, `tl-snap`, `tl-steps` |
| Pemisah dan reveal | 3 | `dv-diag`, `dv-curtain`, `dv-cross` |
| Navigasi | 3 | `nav-pill`, `nav-palette`, `nav-overlay` |
| Kursor dan pointer | 2 | `cur-disc`, `cur-label` |
| Widget hidup | 5 | `w-globe`, `w-orbit`, `w-clock`, `w-feed`, `w-beam` |
| Intro dan loader | 2 | `ld-counter`, `ld-draw` |
| Penutup | 3 | `ft-giant`, `ft-copy`, `ft-ticket` |

### Tabel lengkap

| Id | Nama | Pemicu | Beban | Dipakai di situs |
| --- | --- | --- | --- | --- |
| `bg-aurora` | Aurora drift | jalan sendiri | rendah | ya |
| `bg-grid` | Perspective grid floor | jalan sendiri | rendah | cadangan |
| `bg-meteors` | Meteors | jalan sendiri | rendah | ya |
| `bg-dots` | Dot field with ripples | canvas berbasis waktu | rendah | ya |
| `bg-rays` | Light rays | jalan sendiri | rendah | ya |
| `tx-shine` | Gradient sheen | jalan sendiri | rendah | ya |
| `tx-rotate` | Word rotator | jalan sendiri | rendah | cadangan |
| `tx-scramble` | Decode on hover | JS ringan | rendah | ya |
| `tx-split` | Line mask reveal | sekali saat terlihat | rendah | ya |
| `tx-variable` | Variable-weight wave | jalan sendiri | sedang | ya |
| `btn-beam` | Border beam | jalan sendiri | rendah | ya |
| `btn-shimmer` | Shimmer sweep | jalan sendiri | rendah | cadangan |
| `btn-magnetic` | Magnetic pull | pointer (desktop) | rendah | cadangan |
| `btn-arrow` | Arrow chip | hover | rendah | cadangan |
| `btn-pulse` | Pulse ring | jalan sendiri | rendah | ya |
| `btn-swap` | Label swap | hover | rendah | cadangan |
| `card-spot` | Cursor spotlight | pointer (desktop) | rendah | ya |
| `card-tilt` | 3D tilt and glare | pointer (desktop) | rendah | ya |
| `card-neon` | Moving gradient border | jalan sendiri | rendah | ya |
| `card-flip` | Flip card | tap atau klik | rendah | cadangan |
| `card-reveal` | Image card, caption rises | hover | rendah | ya |
| `card-glass` | Glass without blur | jalan sendiri | rendah | ya |
| `card-ticket` | Ticket stub | hover | rendah | cadangan |
| `dev-phone` | Floating phone | jalan sendiri | rendah | ya |
| `dev-fan` | Phone fan | hover | rendah | ya |
| `dev-browser` | Browser that scrolls itself | jalan sendiri | rendah | ya |
| `dev-laptop` | Laptop, slow sway | jalan sendiri | rendah | ya |
| `mq-chips` | Tool chip loop | jalan sendiri | rendah | ya |
| `mq-two` | Two-way screenshot rows | jalan sendiri | rendah | ya |
| `mq-wall` | Vertical wall | jalan sendiri | rendah | ya |
| `mq-tape` | Ticker tape | jalan sendiri | rendah | cadangan |
| `st-count` | Count-up trio | sekali saat terlihat | rendah | ya |
| `st-odo` | Odometer | sekali saat terlihat | rendah | ya |
| `st-rings` | Progress rings | sekali saat terlihat | rendah | ya |
| `st-spark` | Sparkline that draws | sekali saat terlihat | rendah | cadangan |
| `tl-glow` | Glow line timeline | sekali saat terlihat | rendah | ya |
| `tl-snap` | Snap-scroll chips | CSS native | rendah | ya |
| `tl-steps` | Pipeline with travelling light | jalan sendiri | rendah | ya |
| `dv-diag` | Diagonal seam with text | jalan sendiri | rendah | ya |
| `dv-curtain` | Curtain wipe | sekali saat terlihat | rendah | ya |
| `dv-cross` | Crossing ribbons | jalan sendiri | rendah | cadangan |
| `nav-pill` | Sliding pill nav | tap atau klik | rendah | ya |
| `nav-palette` | Command palette | keyboard | rendah | ya |
| `nav-overlay` | Menu overlay | tap atau klik | rendah | ya |
| `cur-disc` | Spotlight disc | pointer (desktop) | rendah | ya |
| `cur-label` | Cursor with a label | pointer (desktop) | rendah | ya |
| `w-globe` | Dotted globe | canvas berbasis waktu | sedang | ya |
| `w-orbit` | Tool orbit | jalan sendiri | rendah | ya |
| `w-clock` | Two clocks, day or night | jalan sendiri | rendah | ya |
| `w-feed` | Agent activity feed | jalan sendiri | rendah | ya |
| `w-beam` | System beam | jalan sendiri | rendah | ya |
| `ld-counter` | Counter and curtain | sekali saat terlihat | rendah | ya |
| `ld-draw` | Monogram that draws | sekali saat terlihat | rendah | ya |
| `ft-giant` | Giant link, underline sweep | hover | rendah | cadangan |
| `ft-copy` | Copy to clipboard | tap atau klik | rendah | ya |
| `ft-ticket` | Tear-off ticket CTA | hover | rendah | cadangan |

### Detail per kategori

#### Latar hero

Suasana di belakang headline. Semuanya jalan dengan transform atau canvas, tidak ada `filter: blur`.

##### `bg-aurora`: Aurora drift

Three radial layers drift on transform. Looks like a blur, costs like a div.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Sebagian: blob warna di belakang testimoni (`.qts > i`). Blok: About.
- **Kode:** `COMPONENT-CODE.md`, bagian `bg-aurora`.

##### `bg-grid`: Perspective grid floor

A tilted plane scrolls its own background. Strong for Web3 and tech tones.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `bg-grid`.

##### `bg-meteors`: Meteors

Fourteen thin streaks fall on a staggered loop. Quiet enough to sit behind copy.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Agents (`.ag-met`). Blok: Agents.
- **Kode:** `COMPONENT-CODE.md`, bagian `bg-meteors`.

##### `bg-dots`: Dot field with ripples

Grid of dots, a ripple leaves the centre every few seconds. Tap or click to add your own.

- **Pemicu:** canvas berbasis waktu. **Beban:** rendah.
- **iPhone dan sentuh:** Canvas 2D berbasis waktu, resolusi dibatasi 2x, berhenti saat keluar layar. Tap atau klik menambah riak.
- **Di situs:** Kontak (`.ct-dots`). Blok: Kontak.
- **Kode:** `COMPONENT-CODE.md`, bagian `bg-dots`.

##### `bg-rays`: Light rays

Two conic layers sway at different speeds. Reads as stage lighting for nightlife work.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Hero (`.hr-rays`). Blok: Hero.
- **Kode:** `COMPONENT-CODE.md`, bagian `bg-rays`.

#### Efek headline

Teks yang bergerak, sekali jalan atau berulang.

##### `tx-shine`: Gradient sheen

Background-clip text with a moving gradient. The classic, and it still works.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Judul hero (`.shine`) dan judul Atlas (`.grad`). Blok: Hero.
- **Kode:** `COMPONENT-CODE.md`, bagian `tx-shine`.

##### `tx-rotate`: Word rotator

One headline, four nouns. Good for positioning without a paragraph.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `tx-rotate`.

##### `tx-scramble`: Decode on hover

Letters resolve from noise. Runs on load and on tap or hover. Fits terminal and Web3 tones.

- **Pemicu:** JS ringan. **Beban:** rendah.
- **iPhone dan sentuh:** JS ringan (requestAnimationFrame), jalan saat dimuat dan saat hover atau tap.
- **Di situs:** Semua label kecil (`.eyebrow`, `.dec`) lewat FxRoot. Blok: FxRoot (mesin efek global).
- **Kode:** `COMPONENT-CODE.md`, bagian `tx-scramble`.

##### `tx-split`: Line mask reveal

Each line slides up out of a mask. Use once per section, not on every heading.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** Teks trailer (`.ml`). Blok: Trailer 26 detik.
- **Kode:** `COMPONENT-CODE.md`, bagian `tx-split`.

##### `tx-variable`: Variable-weight wave

A weight wave runs through the letters. It re-lays text each frame, so keep it to one short word.

- **Pemicu:** jalan sendiri. **Beban:** sedang.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar. Menghitung ulang layout tiap frame, jadi pakai satu kata pendek saja. Di situs asli dimatikan di HP dan saat reduced-motion.
- **Di situs:** Judul dinding layar (`WeightWave`). Blok: Dinding layar.
- **Kode:** `COMPONENT-CODE.md`, bagian `tx-variable`.

#### Tombol

Aksi utama dengan sedikit kehidupan.

##### `btn-beam`: Border beam

A conic gradient orbits the border. @property needs Safari 16.4 or newer, else a plain line.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar. Memakai `@property`: butuh Safari 16.4 atau lebih baru. Di versi lama animasinya langsung ke keadaan akhir, tampilan tidak rusak.
- **Di situs:** Tombol utama hero dan kontak (`.beam`). Blok: Hero, Kontak.
- **Kode:** `COMPONENT-CODE.md`, bagian `btn-beam`.

##### `btn-shimmer`: Shimmer sweep

A highlight crosses the button every three seconds. Draws the eye to the one primary action.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `btn-shimmer`.

##### `btn-magnetic`: Magnetic pull

The button leans toward the cursor. Desktop only, nothing happens on touch.

- **Pemicu:** pointer (desktop). **Beban:** rendah.
- **iPhone dan sentuh:** Aktif hanya untuk pointer halus (desktop). Di layar sentuh komponen tampil normal tanpa efek pointer. Tombol tetap bisa di-tap; tarikan magnet hanya di desktop.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `btn-magnetic`.

##### `btn-arrow`: Arrow chip

The arrow tilts and slides on hover. Clean on light layouts.

- **Pemicu:** hover. **Beban:** rendah.
- **iPhone dan sentuh:** Efek muncul saat hover (desktop). Di layar sentuh tampilan awal tetap utuh dan terbaca.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `btn-arrow`.

##### `btn-pulse`: Pulse ring

Two rings expand and fade. Use for a single store or download button.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Tombol kedua hero (`.btn.pulse`). Blok: Hero.
- **Kode:** `COMPONENT-CODE.md`, bagian `btn-pulse`.

##### `btn-swap`: Label swap

The label rolls up and a second one takes its place. Tap shows the second label on touch.

- **Pemicu:** hover. **Beban:** rendah.
- **iPhone dan sentuh:** Efek muncul saat hover (desktop). Di layar sentuh tampilan awal tetap utuh dan terbaca. Perangkat tanpa hover langsung menampilkan label kedua.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `btn-swap`.

#### Kartu

Permukaan untuk proyek, angka, dan tiket.

##### `card-spot`: Cursor spotlight

A soft light and a lit border follow the cursor. The bento tiles in design direction H (in the review hub) use it.

- **Pemicu:** pointer (desktop). **Beban:** rendah.
- **iPhone dan sentuh:** Aktif hanya untuk pointer halus (desktop). Di layar sentuh komponen tampil normal tanpa efek pointer.
- **Di situs:** Tile hidup, kartu kota, kartu cara memulai (`data-spot`). Blok: FxRoot (mesin efek global), Tile hidup, Atlas (globe + kota + pipeline).
- **Kode:** `COMPONENT-CODE.md`, bagian `card-spot`.

##### `card-tilt`: 3D tilt and glare

The card leans toward the pointer with a moving highlight. Skipped on touch.

- **Pemicu:** pointer (desktop). **Beban:** rendah.
- **iPhone dan sentuh:** Aktif hanya untuk pointer halus (desktop). Di layar sentuh komponen tampil normal tanpa efek pointer. Dilewati di layar sentuh.
- **Di situs:** Kartu kota, kartu cara memulai (`data-tilt`). Blok: FxRoot (mesin efek global), Atlas (globe + kota + pipeline), Kontak.
- **Kode:** `COMPONENT-CODE.md`, bagian `card-tilt`.

##### `card-neon`: Moving gradient border

A gradient border that slides slowly, with a faint glow. No pseudo-element masks needed.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Kartu kontak (`.ct-card`). Blok: Kontak.
- **Kode:** `COMPONENT-CODE.md`, bagian `card-neon`.

##### `card-flip`: Flip card

Stat on the front, detail on the back. Tap toggles it on touch.

- **Pemicu:** tap atau klik. **Beban:** rendah.
- **iPhone dan sentuh:** Bisa di-tap atau diklik.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `card-flip`.

##### `card-reveal`: Image card, caption rises

The screenshot zooms and the caption slides up. The classic project tile.

- **Pemicu:** hover. **Beban:** rendah.
- **iPhone dan sentuh:** Efek muncul saat hover (desktop). Di layar sentuh tampilan awal tetap utuh dan terbaca. Perangkat tanpa hover langsung menampilkan caption.
- **Di situs:** Sebagian: zoom gambar di kartu Builds. Blok: Builds (baris, pencarian, kartu).
- **Kode:** `COMPONENT-CODE.md`, bagian `card-reveal`.

##### `card-glass`: Glass without blur

Gradient fill plus an inner highlight sells the glass. No backdrop-filter, which WebKit repaints on scroll.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar. Tanpa `backdrop-filter` karena WebKit mengecat ulangnya tiap scroll.
- **Di situs:** Testimoni (`.qt`). Blok: About.
- **Kode:** `COMPONENT-CODE.md`, bagian `card-glass`.

##### `card-ticket`: Ticket stub

Notched edges from a radial mask, a dashed tear line and a code block. Ties the portfolio to a ticketing product.

- **Pemicu:** hover. **Beban:** rendah.
- **iPhone dan sentuh:** Efek muncul saat hover (desktop). Di layar sentuh tampilan awal tetap utuh dan terbaca.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `card-ticket`.

#### Perangkat dan frame

Menampilkan produk asli dalam konteksnya.

##### `dev-phone`: Floating phone

Bezel, island and a sheen that crosses every seven seconds. Screens are the real app.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Hero dan panggung platform. Blok: Hero, Platform (panggung 6 permukaan).
- **Kode:** `COMPONENT-CODE.md`, bagian `dev-phone`.

##### `dev-fan`: Phone fan

Three screens stacked, spreading on hover or tap.

- **Pemicu:** hover. **Beban:** rendah.
- **iPhone dan sentuh:** Efek muncul saat hover (desktop). Di layar sentuh tampilan awal tetap utuh dan terbaca. Perangkat tanpa hover (`@media (hover: none)`) langsung menampilkan kipas terbuka.
- **Di situs:** Panggung platform (app mobile). Blok: Platform (panggung 6 permukaan).
- **Kode:** `COMPONENT-CODE.md`, bagian `dev-fan`.

##### `dev-browser`: Browser that scrolls itself

The capture pans up and back inside the frame. Shows a full page without a video.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Sebagian: `BrowserFrame` (statis, tangkapan utuh). Blok: Platform (panggung 6 permukaan).
- **Kode:** `COMPONENT-CODE.md`, bagian `dev-browser`.

##### `dev-laptop`: Laptop, slow sway

A CSS laptop that rocks a few degrees. Good for back-office and dashboard shots.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Panggung platform (back office). Blok: Platform (panggung 6 permukaan).
- **Kode:** `COMPONENT-CODE.md`, bagian `dev-laptop`.

#### Marquee dan ticker

Gerak konstan di tepi sebuah section.

##### `mq-chips`: Tool chip loop

One row of tools, pauses on hover. Seamless because the set is cloned once.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Pita arsenal. Blok: Arsenal.
- **Kode:** `COMPONENT-CODE.md`, bagian `mq-chips`.

##### `mq-two`: Two-way screenshot rows

Two rows move opposite ways. Used in design direction A (in the review hub) for client and Web3 work.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Baris Builds. Blok: Builds (baris, pencarian, kartu).
- **Kode:** `COMPONENT-CODE.md`, bagian `mq-two`.

##### `mq-wall`: Vertical wall

Three columns scroll in alternate directions. design direction D (in the review hub) tilts the same idea in 3D.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Dinding layar. Blok: Dinding layar.
- **Kode:** `COMPONENT-CODE.md`, bagian `mq-wall`.

##### `mq-tape`: Ticker tape

A tilted tape of facts. The numbers are the content, so it never reads as decoration.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `mq-tape`.

#### Angka

Counter dan grafik yang layak dipercaya.

##### `st-count`: Count-up trio

Numbers count up once when they enter the view. They show the final value if script or motion is off.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** Angka kartu kota (`data-count`). Blok: FxRoot (mesin efek global), Atlas (globe + kota + pipeline).
- **Kode:** `COMPONENT-CODE.md`, bagian `st-count`.

##### `st-odo`: Odometer

Digits roll to their value. Heavier than a count-up, so use it for one number.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** Tile hidup (odometer). Blok: Tile hidup.
- **Kode:** `COMPONENT-CODE.md`, bagian `st-odo`.

##### `st-rings`: Progress rings

Rings fill with @property on view. Each ring is a real ratio from the portfolio data.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll. Memakai `@property`: butuh Safari 16.4 atau lebih baru. Di versi lama animasinya langsung ke keadaan akhir, tampilan tidak rusak.
- **Di situs:** Tile hidup (cincin status). Blok: Tile hidup.
- **Kode:** `COMPONENT-CODE.md`, bagian `st-rings`.

##### `st-spark`: Sparkline that draws

The line draws, the area fades in, the last point pulses. Data here is illustrative.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** belum dipasang. kurva contoh tidak punya data nyata. Komponen siap dipakai bila ada ekspor bulanan asli
- **Kode:** `COMPONENT-CODE.md`, bagian `st-spark`.

#### Timeline

Karier dan proses, diceritakan berurutan.

##### `tl-glow`: Glow line timeline

Each entry lights up in turn and draws the line to the next. State changes, not scroll-scrubbing.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** Timeline About. Blok: About.
- **Kode:** `COMPONENT-CODE.md`, bagian `tl-glow`.

##### `tl-snap`: Snap-scroll chips

Native scroll-snap, no JS. Swipe sideways. The browser handles momentum on iPhone.

- **Pemicu:** CSS native. **Beban:** rendah.
- **iPhone dan sentuh:** CSS native tanpa JS. Momentum scroll dikerjakan browser. `scroll-snap` native, momentumnya diurus iPhone sendiri.
- **Di situs:** Timeline About di HP. Blok: About.
- **Kode:** `COMPONENT-CODE.md`, bagian `tl-snap`.

##### `tl-steps`: Pipeline with travelling light

A pulse runs along the steps of a process. Used for the new-city pipeline in design direction C (in the review hub).

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Pipeline Atlas. Blok: Atlas (globe + kota + pipeline).
- **Kode:** `COMPONENT-CODE.md`, bagian `tl-steps`.

#### Pemisah dan reveal

Perpindahan antar section.

##### `dv-diag`: Diagonal seam with text

A clipped colour block and a tilted marquee on the seam. Replaces a plain horizontal rule.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Pita diagonal. Blok: Pita diagonal.
- **Kode:** `COMPONENT-CODE.md`, bagian `dv-diag`.

##### `dv-curtain`: Curtain wipe

A clip-path wipe reveals the next block. Good for before and after, or a section hand-off.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** Judul kontak. Blok: Kontak.
- **Kode:** `COMPONENT-CODE.md`, bagian `dv-curtain`.

##### `dv-cross`: Crossing ribbons

Two ribbons cross at a slight angle. design direction E (in the review hub) uses it between index and case studies.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `dv-cross`.

#### Navigasi

Penunjuk arah yang terasa hidup.

##### `nav-pill`: Sliding pill nav

The white pill glides to the active item. Autoplays until you click.

- **Pemicu:** tap atau klik. **Beban:** rendah.
- **iPhone dan sentuh:** Bisa di-tap atau diklik.
- **Di situs:** Navbar. Blok: Navbar.
- **Kode:** `COMPONENT-CODE.md`, bagian `nav-pill`.

##### `nav-palette`: Command palette

Type to filter, arrows and Enter work. design direction F (in the review hub) opens it with Cmd or Ctrl K.

- **Pemicu:** keyboard. **Beban:** rendah.
- **iPhone dan sentuh:** Keyboard (Cmd atau Ctrl + K) dan klik.
- **Di situs:** Command palette. Blok: Command palette.
- **Kode:** `COMPONENT-CODE.md`, bagian `nav-palette`.

##### `nav-overlay`: Menu overlay

A circular clip-path opens from the button and links stagger in. No backdrop blur, safe on iOS.

- **Pemicu:** tap atau klik. **Beban:** rendah.
- **iPhone dan sentuh:** Bisa di-tap atau diklik. Tanpa backdrop blur. Di situs asli scroll halaman dikunci selama menu terbuka (`document.body.style.overflow = 'hidden'`).
- **Di situs:** Menu HP. Blok: Navbar.
- **Kode:** `COMPONENT-CODE.md`, bagian `nav-overlay`.

#### Kursor dan pointer

Sentuhan hover untuk desktop. Layar sentuh mendapat versi tenang.

##### `cur-disc`: Spotlight disc

A yellow disc eases toward the pointer behind the text. On touch it drifts on its own.

- **Pemicu:** pointer (desktop). **Beban:** rendah.
- **iPhone dan sentuh:** Aktif hanya untuk pointer halus (desktop). Di layar sentuh komponen tampil normal tanpa efek pointer. Di layar sentuh cakram melayang sendiri.
- **Di situs:** Kontak (`.ct-disc`). Blok: Kontak.
- **Kode:** `COMPONENT-CODE.md`, bagian `cur-disc`.

##### `cur-label`: Cursor with a label

A dot follows the pointer and swells into a labelled circle over interactive zones. Desktop only.

- **Pemicu:** pointer (desktop). **Beban:** rendah.
- **iPhone dan sentuh:** Aktif hanya untuk pointer halus (desktop). Di layar sentuh komponen tampil normal tanpa efek pointer.
- **Di situs:** Kursor berlabel. Blok: Kursor berlabel, Builds (baris, pencarian, kartu).
- **Kode:** `COMPONENT-CODE.md`, bagian `cur-label`.

#### Widget hidup

Hal kecil yang benar-benar bekerja: globe, jam, feed, beam sistem.

##### `w-globe`: Dotted globe

About 2,900 dots on canvas 2D. Swings between Bali and Las Vegas, drag to turn.

- **Pemicu:** canvas berbasis waktu. **Beban:** sedang.
- **iPhone dan sentuh:** Canvas 2D berbasis waktu, resolusi dibatasi 2x, berhenti saat keluar layar. Drag horizontal memutar globe; `touch-action: pan-y` membuat swipe vertikal tetap menggulir halaman.
- **Di situs:** Atlas. Blok: Atlas (globe + kota + pipeline).
- **Kode:** `COMPONENT-CODE.md`, bagian `w-globe`.

##### `w-orbit`: Tool orbit

Chips ride two counter-rotating rings and stay upright. Replaces a flat skills grid.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Tile hidup (orbit alat). Blok: Tile hidup.
- **Kode:** `COMPONENT-CODE.md`, bagian `w-orbit`.

##### `w-clock`: Two clocks, day or night

Real local time for Bali and Las Vegas, with a sun or moon from the actual hour.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Tile hidup (jam) dan link hub. Blok: Tile hidup.
- **Kode:** `COMPONENT-CODE.md`, bagian `w-clock`.

##### `w-feed`: Agent activity feed

A new line drops in every couple of seconds. Sample feed, not live data.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Tile hidup dan log Agents. Blok: Tile hidup, Agents.
- **Kode:** `COMPONENT-CODE.md`, bagian `w-feed`.

##### `w-beam`: System beam

Light travels the wires between nodes. design direction B (in the review hub) scales this into a full architecture diagram.

- **Pemicu:** jalan sendiri. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sendiri dan aman di layar sentuh. Berhenti saat keluar layar.
- **Di situs:** Peta sistem dan About. Blok: Peta sistem, About.
- **Kode:** `COMPONENT-CODE.md`, bagian `w-beam`.

#### Intro dan loader

Detik pertama kunjungan.

##### `ld-counter`: Counter and curtain

000 to 100, then a colour curtain lifts. Keep it under three seconds and skip it on return visits.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** Intro. Blok: Intro (preloader).
- **Kode:** `COMPONENT-CODE.md`, bagian `ld-counter`.

##### `ld-draw`: Monogram that draws

Stroke-dashoffset draws the letters one after the other. Works for a logo or a signature.

- **Pemicu:** sekali saat terlihat. **Beban:** rendah.
- **iPhone dan sentuh:** Jalan sekali saat terlihat. Tidak mengikuti scroll.
- **Di situs:** Intro. Blok: Intro (preloader).
- **Kode:** `COMPONENT-CODE.md`, bagian `ld-draw`.

#### Penutup

Blok kontak dan footer.

##### `ft-giant`: Giant link, underline sweep

One enormous serif phrase as the whole call to action. The underline sweeps in on hover.

- **Pemicu:** hover. **Beban:** rendah.
- **iPhone dan sentuh:** Efek muncul saat hover (desktop). Di layar sentuh tampilan awal tetap utuh dan terbaca.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `ft-giant`.

##### `ft-copy`: Copy to clipboard

Email as selectable text with a copy button and a toast. Placeholder address shown here.

- **Pemicu:** tap atau klik. **Beban:** rendah.
- **iPhone dan sentuh:** Bisa di-tap atau diklik. `navigator.clipboard.writeText` butuh HTTPS dan dipanggil dari tap; sediakan fallback bila ditolak.
- **Di situs:** Kontak (salin email). Blok: Kontak.
- **Kode:** `COMPONENT-CODE.md`, bagian `ft-copy`.

##### `ft-ticket`: Tear-off ticket CTA

The stub tears away on hover. The brand tie-in is the whole point.

- **Pemicu:** hover. **Beban:** rendah.
- **iPhone dan sentuh:** Efek muncul saat hover (desktop). Di layar sentuh tampilan awal tetap utuh dan terbaca.
- **Di situs:** belum dipakai. Cadangan yang sudah diuji di lab.
- **Kode:** `COMPONENT-CODE.md`, bagian `ft-ticket`.

## 8. Frame perangkat dan pipeline aset

### Frame dan pembantu

| Nama | File | Cara kerja |
| --- | --- | --- |
| `PhoneFrame` | `components/ui.tsx` | Layar ponsel dengan bezel, pulau, baris status sendiri, dan kilau 7 detik. Tingginya mengikuti rasio screenshot (`width` dan `height` di `<img>`), jadi seluruh layar terlihat. Prop `low` menurunkan prioritas unduh untuk ponsel sekunder; `priority` memuat langsung untuk yang di atas lipatan. |
| `BrowserFrame` | `components/ui.tsx` | Frame browser dengan tiga titik dan kolom URL. Screenshot ditangkap 1440x900 lalu disimpan 800x500 (16:10), jadi pas tanpa crop. |
| `Laptop (`.lap`)` | `styles/fx.css` | Tutup laptop dan base dari CSS, bergoyang pelan. Cocok untuk tampilan back office. |
| `Marquee` | `components/ui.tsx` | Set item dirender dua kali dan track bergeser -50%, jadi loop tanpa sambungan. Opsi `vertical`, `reverse`, `speed` (detik), `gap` (px). Murni CSS, berhenti di luar layar lewat `data-pausable`. |
| `WeightWave` | `components/ui.tsx` | Memecah teks menjadi huruf yang bobotnya naik turun lewat sumbu `wght` Outfit Variable. Satu kata pendek saja. |
| `LazyMount` | `components/lazy-mount.tsx` | Merender anaknya hanya saat penanda dekat viewport (margin 700px). Beri wadahnya tinggi tetap supaya tidak ada layout shift. |

### Pipeline aset

| Aset | Cara membuatnya |
| --- | --- |
| Screenshot situs | `scripts/capture-sites.mjs`: Playwright, viewport 1440x900, deviceScaleFactor 2, tunggu 4,5 detik, lalu `sharp` ke 800x500 WebP q80. Rasio 16:10 sama dengan frame browser, jadi tidak ada crop. |
| Layar app | Capture mentah 880x1736 dari harness web. Disimpan WebP q82; varian kecil 560 (kartu), 480 (ponsel sisi hero), 640 (ponsel tengah hero), 300 (link hub). |
| Poster app | Grafik toko Play Store (w1080) diperkecil ke 540x960 dan ditampilkan utuh berdampingan. |
| Foto | Foto hero 1600x1067 q62 dan 900x600 q58 (di bawah gradien gelap, kualitas rendah tidak terlihat). |
| Logo alat dan merek | Simple Icons (CC0) dari jsDelivr, satu file `sprite.svg` berisi `<symbol>` per logo, dipakai lewat `<use href="/logos/sprite.svg#go">`. |
| Titik globe | `world-atlas/land-110m.json` diraster ke 3600x1800, titik tiap 2 derajat, disimpan sebagai baris `[lat, [lon*10, ...]]` (2.901 titik, 13 KB). |
| Favicon, ikon, OG | Monogram SVG, dirender ke PNG lewat Playwright, dipalet dengan sharp. OG image dirender dari HTML 1200x630. |

Aturan gambar yang dipegang: tidak ada gambar yang digambar lebih besar dari ukuran aslinya dikali DPR. Frame ponsel memakai rasio screenshot, frame browser 16:10, sehingga tidak ada yang dipotong atau ditarik. Hero memakai `srcSet` dengan `sizes` yang sengaja diperkecil (latarnya di bawah gradien gelap), jadi ponsel mengunduh berkas 900 px.

## 9. Lapisan data

| File | Isi |
| --- | --- |
| `config/site.ts` | URL, email, WhatsApp, `SURFACES` (6 permukaan produk dengan screenshot), `CITIES` (Bali, Las Vegas, kota berikut), `PIPELINE` (5 langkah), `DIFFS` (3 diff di terminal), `ORBIT_TOOLS`, `BAND_TOOLS`, `TIMELINE`, `LOG_LINES`, `FEED_LINES`. |
| `config/work.ts` | Tipe `Item` dan `STATUS_LABEL`. Daftar `AGENTS`, `MOBILE`, `CLIENTS`, `SYSTEMS`, `WEB3`, `INFRA`, dan `EXPERIENCE` (sumber timeline). |
| `config/builds.ts` | Menyatukan semua karya menjadi `BUILDS` dengan jenis media (`shot`, `posters`, `tile`), serta `KIND_COUNT` dan `SHOTS` untuk baris marquee dan dinding. |
| `config/cases.ts` | `CASES` (3 studi kasus), `TESTIMONIALS`, `PROOF`, `ENGAGEMENTS`, `WEB3_SELECTED`. |
| `config/arsenal.ts` | `ARSENAL` (tumpukan teknologi beserta warnanya), `TOOL_COUNT`, `CROSS_LINKS`. |
| `config/logos.ts` | Peta nama alat ke id simbol di `sprite.svg` (`LOGO`) dan merek kontak (`BRAND`). |
| `config/media.ts` | Deskriptor gambar `{src, w, h}` dan pembantunya: `phone()`, `gl()`, `GL_BO`, `shot()`, `poster()`, `heroPhone()`, `PHOTO`. Lebar dan tinggi inilah yang membuat frame mengikuti rasio asli. |
| `lib/i18n.tsx` | Kamus EN/ID untuk navigasi, hero, about, dan kontak; pilihan bahasa disimpan di localStorage. Isi proyek sengaja tetap Inggris. |
| `lib/events.ts` | Bus event kecil (`ax:palette`, `ax:reel`, `ax:term`, `ax:builds`, `ax:copy`) supaya komponen terpisah bisa saling memanggil tanpa state bersama. |
| `lib/geo-dots.ts` | Baris titik daratan globe: `[lintang, [bujur x 10, ...]]`, 2.901 titik. |

## 10. QA dan hasil terukur

Skrip ada di `scripts/qa/` pada repo. Semuanya memakai Playwright (`npm i --no-save playwright && npx playwright install chromium webkit`).

| Yang dicek | Cara |
| --- | --- |
| Error konsol dan overflow | `scripts/qa/site.mjs <url>`: Chromium 1440, iPhone 14, WebKit. Harus 0 error, `scrollWidth == clientWidth`, 0 permintaan pihak ketiga. |
| Gambar buram | `scripts/qa/blur-audit.mjs <url>`: membandingkan ukuran asli gambar dengan ukuran tampil x DPR. Batas lulus: 0,9. Catatan: dinding layar di HP diskalakan 0,6 lewat transform sehingga ditandai tetapi sebenarnya tajam. |
| Swipe sentuhan | `scripts/qa/swipe.mjs`: CDP touch di atas 15 area interaktif, halaman harus ikut bergeser (0 stuck). |
| Kecepatan nyata | `scripts/qa/throttle.mjs <url>`: iPhone 14, jaringan 1,6 Mbps/150 ms, CPU 4x. Mengukur FCP, LCP, CLS, transfer. |
| Lompat anchor | `scripts/qa/anchors.mjs <url>`: lompat ke tiap section dari navbar, di desktop dan iPhone; posisinya harus ±76 px dari atas (tepat di bawah header). |

Hasil terakhir:

| Ukuran | Nilai |
| --- | --- |
| First Load JS halaman utama | 123 kB (laporan `next build`, 2026-10-16) |
| FCP / LCP di situs live (iPhone 14 emulasi, 1,6 Mbps, RTT 150 ms, CPU 4x, median 5 run) | 1,05 s / 1,62 s, CLS 0 |
| FCP / LCP dari build lokal (kondisi emulasi sama, tanpa jaringan nyata) | 0,85 s / 1,0 s |
| Transfer sampai selesai dimuat (kondisi yang sama) | 591 KB |
| Lighthouse mobile lokal | a11y 100, best practices 100, SEO 100. Performance 75-83: angka simulasi Lantern yang bergoyang antar run; ukuran nyata di atas lebih bisa dipercaya |
| Cek konsol | 0 error di Chromium, iPhone 14 emulasi, WebKit |

## 11. Cara membangun

1. Buat proyek: `npx create-next-app@14.2.35 portofolio --ts --app --eslint --no-tailwind --no-src-dir --import-alias "@/*"` (atau fork repo ini). Pakai Next 14.2.35 atau lebih baru; versi di bawahnya terkena advisory DoS (CVE-2025-55184 dan CVE-2025-67779).
2. Pasang font: `npm i @fontsource-variable/outfit @fontsource/inter @fontsource/jetbrains-mono`, lalu `@import` file latin-nya di `styles/globals.css`.
3. Salin fondasi: `styles/base.css` (token, reset, tombol, chip), `styles/fx.css` (reveal, marquee, frame, beam, kursor, intro), `components/ui.tsx`, `components/fx-root.tsx`, `components/lazy-mount.tsx`, `components/on-view.tsx`, `lib/events.ts`, `lib/css.ts`.
4. Pasang script head dan `FxRoot` di `app/layout.tsx` seperti di repo (class `.js`, intro, failsafe 5 detik).
5. Ganti token warna di `styles/base.css` (`:root`) dengan paletmu. Aturan: satu warna antarmuka, satu warna penekanan, satu warna "live".
6. Tambahkan section satu per satu dari daftar pilihanmu. Tiap section = satu file di `app/sections/` + satu file CSS (`top`, `mid`, `deep`, `end`). Isi datanya dari `config/*.ts`, jangan ditulis langsung di JSX.
7. Ganti SEMUA konten dan aset (daftar di bawah). Ambil screenshot sendiri dengan `scripts/capture-sites.mjs` (contoh daftar: `scripts/sites.example.json`).
8. Jalankan skrip QA di atas, lalu deploy ke Vercel (Node 24.x di `engines`, tidak perlu lockfile).

## 12. Ganti sebelum publish

Yang berikut milik Jeremia, Guestlist, atau kliennya. Jangan terbit dengan ini masih terpasang.

- [ ] Nama, foto, bio, email, nomor telepon, link sosial, CV (`public/resume.pdf`), dan monogram JA.
- [ ] Semua screenshot app dan situs (`public/work/*`): itu milik Guestlist dan klien Jeremia, bukan untuk dipakai ulang.
- [ ] Foto venue di hero dan kolase (`public/work/photo/*`): hak milik venue dan fotografer.
- [ ] Testimoni (`config/cases.ts`), nama klien, studi kasus, daftar agent, angka (`30,000+`, `700+`, `110+`), dan semua klaim lain. Angka publik harus nyata dan dibulatkan ke bawah dengan tanda "+".
- [ ] Teks yang menyebut Guestlist, Bali, Las Vegas, atau nama produk Jeremia di `lib/i18n.tsx`, `config/site.ts`, dan metadata `app/layout.tsx`.
- [ ] OG image, favicon, ikon PWA, domain di `config/site.ts`.

## 13. Kredit

| Sumber | Dipakai untuk | Lisensi |
| --- | --- | --- |
| Simple Icons | logo alat dan merek | CC0 |
| Fontsource (Outfit, Inter, JetBrains Mono) | font self-host | SIL OFL 1.1 |
| Natural Earth via world-atlas | daratan globe | domain publik / ISC |
| Next.js, React | kerangka | MIT |
| Playwright, sharp | capture dan optimasi gambar (dev) | Apache-2.0 |
