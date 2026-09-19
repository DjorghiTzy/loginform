# Folder Video

File yang dipakai halaman ini: **`background.mp4`** (harus persis nama itu, huruf kecil semua).

Kalau kamu mau ganti videonya, cukup timpa file `background.mp4` di folder ini —
tidak perlu mengubah kode sama sekali. Jangan pakai nama lain (misalnya `Video Keren.mp4`),
karena `index.html` mencari `assets/video/background.mp4`.

Saran biar lancar di Vercel:
- Format MP4 (codec H.264) + resolusi 1920x1080, durasi 10-30 detik supaya looping-nya halus
- Ukuran file sebaiknya di bawah 25 MB (batas file GitHub 100 MB)
- Audio boleh ada, tapi video diputar dalam keadaan muted

`background.webm` adalah versi cadangan (VP8, 1280x720) untuk browser yang tidak bisa
memutar H.264. Kalau `background.mp4` diganti, hapus atau buat ulang file webm ini
supaya tidak ada browser yang memutar video lama:

```
ffmpeg -i background.mp4 -vf "scale=1280:-2,fps=30" -c:v libvpx -b:v 1300k -an background.webm
```

Kalau kedua file hilang, halaman tetap normal dan otomatis memakai gradien abu-abu sebagai cadangan.
