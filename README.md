# Login Page — Video Background

Halaman landing satu layar dengan **video background HD**, navbar transparan, dan **form login glassmorphism**.
Dibuat dengan HTML + CSS + JavaScript murni (tanpa framework, tanpa build step) sehingga langsung jalan di Vercel.

## Struktur

```
.
├── index.html
├── vercel.json
└── assets
    ├── css/style.css
    ├── js/main.js
    ├── img/poster.svg      (gambar cadangan saat video belum termuat)
    ├── img/favicon.svg
    └── video/              <-- TARUH VIDEO KAMU DI SINI
```

## Cara menaruh video

Salin video kamu ke `assets/video/` dan beri nama:

| File | Status |
|------|--------|
| `assets/video/background.mp4` | wajib |
| `assets/video/background.webm` | opsional (lebih ringan) |

Lalu commit & push. Tidak perlu mengubah kode sama sekali — path-nya sudah ditulis di `index.html`.

Kalau videonya belum ada, halaman **tetap tampil normal** memakai gradien langit malam sebagai cadangan
(jadi tidak akan pernah muncul layar kosong/error di Vercel).

## Deploy ke Vercel

1. Import repo ini di [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Other** (static site) — biarkan Build Command & Output Directory kosong.
3. Deploy. Selesai.

## Catatan

- Video diputar `autoplay muted loop playsinline` agar bisa jalan otomatis di semua browser termasuk iOS.
- Ukuran video sebaiknya < 25 MB. Kalau videonya besar (> 100 MB), GitHub akan menolak push —
  gunakan video yang sudah dikompres, atau host videonya di CDN lalu ganti `src` pada tag `<source>`.
- Validasi form saat ini masih di sisi klien saja. Sambungkan ke backend kamu di
  `assets/js/main.js` pada bagian bertanda `>>> Sambungkan ke API/backend kamu di sini <<<`.
