# Login Page — Video Background

Halaman landing dengan **video background HD**, tema abu-abu, navbar transparan,
**form login glassmorphism**, dan animasi halus di setiap interaksi.
HTML + CSS + JavaScript murni (tanpa framework, tanpa build step) sehingga langsung jalan di Vercel.

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
    └── video/
        ├── background.mp4       <-- VIDEO KAMU (dipakai semua browser umum)
        └── background.webm      <-- cadangan untuk browser tanpa codec H.264
```

## Mengganti video

Timpa file `assets/video/background.mp4` dengan video baru, lalu commit & push.
**Namanya harus tetap `background.mp4`** — halaman mencari path itu.
Kalau videonya diganti, hapus juga `background.webm` (atau buat ulang versinya), supaya
browser tanpa codec H.264 tidak memutar video lama.
Kalau filenya tidak ada, halaman tetap tampil memakai gradien abu-abu sebagai cadangan.

## Isi halaman

| Bagian | Keterangan |
|--------|------------|
| Hero | Video full screen + kartu login yang tampil saat halaman dibuka |
| About | Teks + panel statistik dengan angka berjalan |
| Services | Tiga kartu layanan |
| Contact | Panel info kontak + tombol yang membuka form login |

## Animasi yang aktif

- **Smooth scroll** dengan inersia (scroll mouse terasa meluncur, bukan patah-patah);
  di perangkat sentuh dipakai inersia bawaan sistem
- **Scroll halus antar bagian** saat menu Home/About/Services/Contact diklik
- **Scroll reveal**: setiap elemen meluncur masuk saat masuk layar, dengan jeda bergiliran
- **Modal login**: meluncur naik + isi kartu muncul bergiliran; menutup dengan halus
  lewat tombol X, klik area luar, tombol Esc, atau saat halaman mulai di-scroll
- **Navbar**: menyusut dan memakai latar blur setelah di-scroll, underline menu bergeser,
  menu mobile membuka dengan efek tirai
- **Mikro-interaksi**: hover tombol (isi warna naik dari bawah), kartu terangkat,
  ikon berputar, garis bawah input tumbuh dari kiri, pesan error bergetar,
  tombol kembali ke atas, dan progress bar scroll di paling atas
- Semua animasi otomatis dimatikan bila pengunjung mengaktifkan
  *reduce motion* di sistem operasinya

## Deploy ke Vercel

1. Import repo ini di [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Other** (static site) — Build Command & Output Directory dibiarkan kosong.
3. Pastikan **Production Branch** di Settings → Git sesuai dengan branch yang dipakai.
4. Deploy.

## Kalau videonya tidak tampil

Buka `<alamat-situs>/cek-video.html`. Halaman itu memeriksa satu per satu:
file ada atau tidak di server, tipe kontennya benar atau tidak, formatnya didukung browser
atau tidak, dan videonya benar-benar berjalan atau tidak — lengkap dengan titik hijau/merah.

## Catatan

- Video diputar `autoplay muted loop playsinline` agar jalan otomatis di semua browser termasuk iOS.
- Validasi form masih di sisi klien. Sambungkan ke backend kamu di `assets/js/main.js`
  pada bagian bertanda `>>> Sambungkan ke API/backend kamu di sini <<<`.
