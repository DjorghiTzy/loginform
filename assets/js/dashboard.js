/* =========================================================
   Logo — dashboard.js
   Semua isi halaman ini data contoh yang disimpan di browser.
   ========================================================= */
(function () {
  "use strict";

  if (!window.Auth) { window.location.replace("index.html"); return; }
  var sesi = Auth.wajibMasuk("index.html");
  if (!sesi) return;

  /* ===================================================
     0. PENYIMPANAN DATA PER AKUN
     =================================================== */
  var KUNCI = "logo_data_" + sesi.email.toLowerCase();

  function bacaData(cadangan) {
    try {
      var t = localStorage.getItem(KUNCI);
      if (t) return JSON.parse(t);
    } catch (e) {}
    return cadangan;
  }

  function tulisData() {
    try { localStorage.setItem(KUNCI, JSON.stringify(data)); } catch (e) {}
  }

  var BENIH = {
    proyek: [
      { id: 1, nama: "Rasa Nusantara",  klien: "Rasa Nusantara",   kategori: "Web",      tenggat: "2026-10-04", progres: 82, status: "Berjalan" },
      { id: 2, nama: "Langit Senja",    klien: "Kopi Langit Senja",kategori: "Merek",    tenggat: "2026-09-28", progres: 95, status: "Ditinjau" },
      { id: 3, nama: "Nadi Fit v2",     klien: "Nadi Fit",         kategori: "Aplikasi", tenggat: "2026-11-15", progres: 46, status: "Berjalan" },
      { id: 4, nama: "Pasar Awan",      klien: "Pasar Awan",       kategori: "Web",      tenggat: "2026-09-22", progres: 100, status: "Selesai" },
      { id: 5, nama: "Bimasakti Fleet", klien: "Bimasakti Logistik", kategori: "Aplikasi", tenggat: "2026-12-02", progres: 24, status: "Berjalan" },
      { id: 6, nama: "Titik Temu",      klien: "Titik Temu Space", kategori: "Merek",    tenggat: "2026-10-19", progres: 61, status: "Berjalan" },
      { id: 7, nama: "Audit SEO Embun", klien: "Embun Skincare",   kategori: "SEO",      tenggat: "2026-09-20", progres: 100, status: "Selesai" },
      { id: 8, nama: "Dwipa Katalog",   klien: "Dwipa Furnitur",   kategori: "Web",      tenggat: "2026-10-30", progres: 38, status: "Ditinjau" }
    ],
    klien: [
      { nama: "Andini Prameswari", usaha: "Rasa Nusantara",    email: "andini@rasanusantara.id", telp: "+62 811 2000 111", proyek: 3, nilai: 74 },
      { nama: "Bayu Saputra",      usaha: "Nadi Fit",          email: "bayu@nadifit.app",        telp: "+62 812 3300 221", proyek: 2, nilai: 128 },
      { nama: "Clara Wijaya",      usaha: "Pasar Awan",        email: "clara@pasarawan.co",      telp: "+62 813 4400 335", proyek: 4, nilai: 96 },
      { nama: "Denis Harto",       usaha: "Bimasakti Logistik",email: "denis@bimasakti.id",      telp: "+62 815 7700 448", proyek: 1, nilai: 180 },
      { nama: "Erina Lestari",     usaha: "Kopi Langit Senja", email: "erina@langitsenja.coffee",telp: "+62 817 8800 552", proyek: 2, nilai: 45 },
      { nama: "Fajar Ramadhan",    usaha: "Dwipa Furnitur",    email: "fajar@dwipa.co.id",       telp: "+62 819 9900 667", proyek: 2, nilai: 63 }
    ],
    tagihan: [
      { no: "INV-2026-041", klien: "Rasa Nusantara",    terbit: "2026-09-01", tempo: "2026-09-15", nilai: 24500000, status: "Lunas" },
      { no: "INV-2026-042", klien: "Nadi Fit",          terbit: "2026-09-04", tempo: "2026-09-18", nilai: 47000000, status: "Lunas" },
      { no: "INV-2026-043", klien: "Bimasakti Logistik",terbit: "2026-09-08", tempo: "2026-09-22", nilai: 61000000, status: "Menunggu" },
      { no: "INV-2026-044", klien: "Kopi Langit Senja", terbit: "2026-08-20", tempo: "2026-09-03", nilai: 12500000, status: "Terlambat" },
      { no: "INV-2026-045", klien: "Pasar Awan",        terbit: "2026-09-12", tempo: "2026-09-26", nilai: 33000000, status: "Menunggu" },
      { no: "INV-2026-046", klien: "Dwipa Furnitur",    terbit: "2026-09-15", tempo: "2026-09-29", nilai: 18750000, status: "Menunggu" },
      { no: "INV-2026-040", klien: "Embun Skincare",    terbit: "2026-08-12", tempo: "2026-08-26", nilai: 9500000,  status: "Lunas" }
    ],
    tugas: [
      { teks: "Kirim revisi halaman menu Rasa Nusantara", selesai: true },
      { teks: "Rapat mingguan tim desain 14.00", selesai: false },
      { teks: "Siapkan penawaran untuk Dwipa Furnitur", selesai: false },
      { teks: "Cek laporan performa Pasar Awan", selesai: false }
    ],
    preferensi: { emailNotif: true, ringkasMingguan: true, modeFokus: false },
    notifDibaca: false
  };

  var data = bacaData(null);
  if (!data) { data = JSON.parse(JSON.stringify(BENIH)); tulisData(); }
  ["proyek", "klien", "tagihan", "tugas", "preferensi"].forEach(function (k) {
    if (!data[k]) { data[k] = JSON.parse(JSON.stringify(BENIH[k])); }
  });

  var PENDAPATAN = [
    { bulan: "Okt", nilai: 48 }, { bulan: "Nov", nilai: 52 }, { bulan: "Des", nilai: 61 },
    { bulan: "Jan", nilai: 45 }, { bulan: "Feb", nilai: 57 }, { bulan: "Mar", nilai: 66 },
    { bulan: "Apr", nilai: 63 }, { bulan: "Mei", nilai: 71 }, { bulan: "Jun", nilai: 69 },
    { bulan: "Jul", nilai: 78 }, { bulan: "Agu", nilai: 74 }, { bulan: "Sep", nilai: 84 }
  ];

  var KATEGORI = [
    { nama: "Web", jumlah: 20 }, { nama: "Aplikasi", jumlah: 13 },
    { nama: "Merek", jumlah: 9 }, { nama: "SEO", jumlah: 6 }
  ];

  var AKTIVITAS = [
    { siapa: "Clara Wijaya", teks: "menyetujui desain akhir halaman katalog Pasar Awan.", kapan: "12 menit lalu" },
    { siapa: "Rizky Aditya", teks: "mengunggah revisi ikon untuk Nadi Fit v2.", kapan: "1 jam lalu" },
    { siapa: "Bayu Saputra", teks: "menambahkan komentar di papan proyek Nadi Fit.", kapan: "3 jam lalu" },
    { siapa: "Sistem", teks: "tagihan INV-2026-042 ditandai lunas.", kapan: "kemarin, 16.40" },
    { siapa: "Erina Lestari", teks: "meminta penambahan satu halaman untuk Langit Senja.", kapan: "kemarin, 09.12" }
  ];

  var NOTIF = [
    { judul: "Tagihan INV-2026-044 lewat jatuh tempo", waktu: "Hari ini, 08.10" },
    { judul: "Langit Senja menunggu peninjauan akhir", waktu: "Kemarin, 17.25" },
    { judul: "Nadi Fit v2 masuk tahap pengujian", waktu: "2 hari lalu" },
    { judul: "Paket Profesional diperpanjang otomatis", waktu: "5 hari lalu" }
  ];

  /* ===================================================
     1. ALAT BANTU
     =================================================== */
  var $  = function (s, induk) { return (induk || document).querySelector(s); };
  var $$ = function (s, induk) { return Array.prototype.slice.call((induk || document).querySelectorAll(s)); };

  function rupiah(n) { return "Rp " + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function juta(n) { return "Rp " + (n / 1000000).toFixed(1).replace(".", ",") + " jt"; }

  function tanggal(iso) {
    var bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.getDate() + " " + bulan[d.getMonth()] + " " + d.getFullYear();
  }

  function toast(pesan, jenis) {
    var wadah = $("#toasts");
    if (!wadah) return;
    var el = document.createElement("div");
    el.className = "toast" + (jenis ? " " + jenis : "");
    el.innerHTML = '<i></i><span></span>';
    el.querySelector("span").textContent = pesan;
    wadah.appendChild(el);
    window.setTimeout(function () {
      el.classList.add("pergi");
      window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
    }, 3200);
  }

  function angkaBerjalan(el, akhir, format) {
    var mulai = null, lama = 1100;
    function langkah(t) {
      if (mulai === null) mulai = t;
      var p = Math.min(1, (t - mulai) / lama);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = format(akhir * e);
      if (p < 1) window.requestAnimationFrame(langkah);
    }
    window.requestAnimationFrame(langkah);
  }

  /* ===================================================
     2. IDENTITAS PENGGUNA
     =================================================== */
  function pasangIdentitas() {
    var s = Auth.sesi();
    $("#avaUser").textContent = Auth.inisial(s.nama);
    $("#namaUser").textContent = s.nama;
    $("#namaUser2").textContent = s.nama;
    $("#peranUser").textContent = s.peran;
    $("#emailUser").textContent = s.email;
    $("#subJudul").textContent = "Halo " + s.nama.split(" ")[0] + ", ini ringkasan studio hari ini";
    $("#setNama").value = s.nama;
    $("#setEmail").value = s.email;
  }
  pasangIdentitas();

  /* ===================================================
     3. PINDAH PANEL
     =================================================== */
  var JUDUL = {
    ringkasan: ["Ringkasan", "Angka penting studio dalam satu layar"],
    proyek:    ["Proyek", "Kelola pekerjaan yang sedang berjalan"],
    klien:     ["Klien", "Daftar klien aktif beserta nilai kerja samanya"],
    tagihan:   ["Tagihan", "Status pembayaran tiap invoice"],
    pengaturan:["Pengaturan", "Atur profil dan preferensi akun"]
  };

  function keHalaman(nama) {
    $$(".panel").forEach(function (p) { p.classList.toggle("is-on", p.getAttribute("data-panel") === nama); });
    $$(".side-link").forEach(function (b) { b.classList.toggle("is-on", b.getAttribute("data-go") === nama); });
    var j = JUDUL[nama] || ["Dashboard", ""];
    $("#judulHalaman").textContent = j[0];
    $("#subJudul").textContent = j[1];
    tutupSemuaDrop();
    tutupSidebar();
    if (nama === "ringkasan") gambarGrafik();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("click", function (e) {
    var tombol = e.target.closest ? e.target.closest("[data-go]") : null;
    if (tombol) keHalaman(tombol.getAttribute("data-go"));
  });

  /* sidebar di layar kecil */
  var side = $("#side"), veil = $("#sideVeil");
  function bukaSidebar() { side.classList.add("is-on"); veil.classList.add("is-on"); }
  function tutupSidebar() { side.classList.remove("is-on"); veil.classList.remove("is-on"); }
  $("#burger").addEventListener("click", function () {
    side.classList.contains("is-on") ? tutupSidebar() : bukaSidebar();
  });
  veil.addEventListener("click", tutupSidebar);

  /* ===================================================
     4. DROPDOWN (notifikasi & pengguna)
     =================================================== */
  function tutupSemuaDrop() {
    $("#panelNotif").hidden = true;
    $("#panelUser").hidden = true;
  }

  function aturDrop(tombol, panel) {
    tombol.addEventListener("click", function (e) {
      e.stopPropagation();
      var terbuka = !panel.hidden;
      tutupSemuaDrop();
      panel.hidden = terbuka;
    });
    panel.addEventListener("click", function (e) { e.stopPropagation(); });
  }
  aturDrop($("#tombolNotif"), $("#panelNotif"));
  aturDrop($("#tombolUser"), $("#panelUser"));
  document.addEventListener("click", tutupSemuaDrop);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { tutupSemuaDrop(); tutupModal(); }
  });

  function gambarNotif() {
    var ul = $("#daftarNotif");
    ul.innerHTML = "";
    NOTIF.forEach(function (n, i) {
      var li = document.createElement("li");
      if (!data.notifDibaca && i < 2) li.className = "baru";
      li.innerHTML = "<b></b><span></span>";
      li.querySelector("b").textContent = n.judul;
      li.querySelector("span").textContent = n.waktu;
      ul.appendChild(li);
    });
    $("#titikNotif").hidden = !!data.notifDibaca;
  }
  gambarNotif();

  $("#bacaSemua").addEventListener("click", function () {
    data.notifDibaca = true; tulisData(); gambarNotif();
    toast("Semua notifikasi ditandai dibaca", "info");
  });

  /* ===================================================
     5. KARTU STATISTIK + SPARKLINE
     =================================================== */
  function sparkline(nilai) {
    var w = 108, h = 38, maks = Math.max.apply(null, nilai), min = Math.min.apply(null, nilai);
    var titik = nilai.map(function (v, i) {
      var x = (i / (nilai.length - 1)) * w;
      var y = h - ((v - min) / Math.max(1, maks - min)) * (h - 6) - 3;
      return x.toFixed(1) + "," + y.toFixed(1);
    });
    return '<svg class="spark" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' +
           '<polyline points="' + titik.join(" ") + '" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function gambarStat() {
    var aktif = data.proyek.filter(function (p) { return p.status !== "Selesai"; }).length;
    var selesai = data.proyek.filter(function (p) { return p.status === "Selesai"; }).length;
    var rasio = data.proyek.length ? Math.round((selesai / data.proyek.length) * 100) : 0;

    var kartu = [
      { label: "Pendapatan bulan ini", nilai: 84200000, format: juta, delta: "+13,4%", arah: "naik", spark: [45,57,66,63,71,69,78,74,84] },
      { label: "Proyek aktif", nilai: aktif, format: function (v) { return String(Math.round(v)); }, delta: "+2 minggu ini", arah: "naik", spark: [4,5,5,6,7,6,7,8,aktif] },
      { label: "Klien aktif", nilai: data.klien.length, format: function (v) { return String(Math.round(v)); }, delta: "+1 bulan ini", arah: "naik", spark: [3,3,4,4,5,5,6,6,data.klien.length] },
      { label: "Proyek rampung", nilai: rasio, format: function (v) { return Math.round(v) + "%"; }, delta: "-3% vs bulan lalu", arah: "turun", spark: [70,72,68,74,73,76,72,70,rasio] }
    ];

    var wadah = $("#kartuStat");
    wadah.innerHTML = "";
    kartu.forEach(function (k) {
      var el = document.createElement("article");
      el.className = "box stat-card";
      el.innerHTML = '<span class="label"></span><div class="nilai">0</div>' +
                     '<span class="delta ' + k.arah + '"></span>' + sparkline(k.spark);
      el.querySelector(".label").textContent = k.label;
      el.querySelector(".delta").textContent = k.delta;
      wadah.appendChild(el);
      angkaBerjalan(el.querySelector(".nilai"), k.nilai, k.format);
    });
  }

  /* ===================================================
     6. GRAFIK PENDAPATAN (satu deret, SVG)
     =================================================== */
  var sudahGambar = false;

  function gambarGrafik() {
    var wadah = $("#areaGrafik");
    if (!wadah || sudahGambar) return;
    sudahGambar = true;

    var W = 640, H = 240, kiri = 42, kanan = 34, atas = 18, bawah = 28;
    var lebar = W - kiri - kanan, tinggi = H - atas - bawah;
    var maks = 100;

    function x(i) { return kiri + (i / (PENDAPATAN.length - 1)) * lebar; }
    function y(v) { return atas + tinggi - (v / maks) * tinggi; }

    var garis = PENDAPATAN.map(function (d, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(d.nilai).toFixed(1); }).join(" ");
    var area = garis + " L" + x(PENDAPATAN.length - 1).toFixed(1) + " " + (atas + tinggi) + " L" + kiri + " " + (atas + tinggi) + " Z";

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik pendapatan 12 bulan terakhir">' +
      '<defs><linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#ffffff" stop-opacity=".30"/>' +
      '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>';

    [0, 25, 50, 75, 100].forEach(function (v) {
      svg += '<line class="grid-line" x1="' + kiri + '" y1="' + y(v) + '" x2="' + (W - kanan) + '" y2="' + y(v) + '"/>' +
             '<text class="axis-teks" x="' + (kiri - 10) + '" y="' + (y(v) + 3.5) + '" text-anchor="end">' + v + '</text>';
    });

    PENDAPATAN.forEach(function (d, i) {
      svg += '<text class="axis-teks" x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + d.bulan + '</text>';
    });

    svg += '<path class="isi-data" d="' + area + '" opacity="0"/>' +
           '<path class="garis-data" d="' + garis + '"/>' +
           '<line class="crosshair" y1="' + atas + '" y2="' + (atas + tinggi) + '"/>';

    PENDAPATAN.forEach(function (d, i) {
      svg += '<circle class="titik-data" data-i="' + i + '" cx="' + x(i) + '" cy="' + y(d.nilai) + '" r="5"/>';
    });

    var akhir = PENDAPATAN[PENDAPATAN.length - 1];
    svg += '<circle cx="' + x(PENDAPATAN.length - 1) + '" cy="' + y(akhir.nilai) + '" r="4" fill="#fff"/>' +
           '<text class="label-akhir" x="' + (x(PENDAPATAN.length - 1) + 8) + '" y="' + (y(akhir.nilai) - 8) + '">' + akhir.nilai + ' jt</text>' +
           '<rect id="tangkap" x="' + kiri + '" y="' + atas + '" width="' + lebar + '" height="' + tinggi + '" fill="transparent"/>' +
           '</svg><div class="tip" id="tipGrafik"></div>';

    wadah.innerHTML = svg;

    /* animasi garis */
    var path = wadah.querySelector(".garis-data");
    var panjang = path.getTotalLength();
    path.style.strokeDasharray = panjang;
    path.style.strokeDashoffset = panjang;
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)";
    path.style.strokeDashoffset = "0";
    var isi = wadah.querySelector(".isi-data");
    isi.style.transition = "opacity 1.2s ease .5s";
    isi.setAttribute("opacity", "1");

    /* hover: crosshair + titik + tooltip */
    var svgEl = wadah.querySelector("svg");
    var tip = $("#tipGrafik");
    var cross = wadah.querySelector(".crosshair");
    var titik = $$(".titik-data", wadah);

    function posisi(e) {
      var kotak = svgEl.getBoundingClientRect();
      var skala = W / kotak.width;
      var px = (e.clientX - kotak.left) * skala;
      var i = Math.round(((px - kiri) / lebar) * (PENDAPATAN.length - 1));
      i = Math.max(0, Math.min(PENDAPATAN.length - 1, i));

      cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i));
      cross.classList.add("is-on");
      titik.forEach(function (t, n) { t.classList.toggle("is-on", n === i); });

      var d = PENDAPATAN[i];
      tip.innerHTML = "<b>Rp " + d.nilai + " juta</b><span>" + d.bulan + " · pendapatan bulanan</span>";
      tip.style.left = (x(i) / skala) + "px";
      tip.style.top = (y(d.nilai) / skala) + "px";
      tip.classList.add("is-on");
    }

    svgEl.addEventListener("mousemove", posisi);
    svgEl.addEventListener("mouseleave", function () {
      cross.classList.remove("is-on");
      tip.classList.remove("is-on");
      titik.forEach(function (t) { t.classList.remove("is-on"); });
    });

    /* tabel setara */
    var tabel = '<table><thead><tr><th>Bulan</th><th>Pendapatan</th></tr></thead><tbody>';
    PENDAPATAN.forEach(function (d) { tabel += "<tr><td>" + d.bulan + "</td><td>Rp " + d.nilai + " juta</td></tr>"; });
    $("#areaTabel").innerHTML = tabel + "</tbody></table>";
  }

  $$(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      var mode = b.getAttribute("data-tampil");
      $$(".seg button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      $("#areaGrafik").hidden = mode !== "grafik";
      $("#areaTabel").hidden = mode !== "tabel";
    });
  });

  /* ===================================================
     7. BAR KATEGORI (satu warna, terang sesuai besaran)
     =================================================== */
  function gambarBar() {
    var total = KATEGORI.reduce(function (a, b) { return a + b.jumlah; }, 0);
    var maks = Math.max.apply(null, KATEGORI.map(function (k) { return k.jumlah; }));
    var wadah = $("#barKategori");
    wadah.innerHTML = "";

    KATEGORI.forEach(function (k, i) {
      var persen = Math.round((k.jumlah / total) * 100);
      var el = document.createElement("div");
      el.className = "bar-baris";
      el.innerHTML = '<div class="bar-atas"><span></span><span></span></div>' +
                     '<div class="bar-jalur"><i class="bar-isi"></i></div>';
      el.querySelectorAll(".bar-atas span")[0].textContent = k.nama;
      el.querySelectorAll(".bar-atas span")[1].textContent = k.jumlah + " proyek · " + persen + "%";
      var isi = el.querySelector(".bar-isi");
      isi.style.background = "rgba(255,255,255," + (0.95 - i * 0.16).toFixed(2) + ")";
      wadah.appendChild(el);
      window.setTimeout(function () { isi.style.width = ((k.jumlah / maks) * 100) + "%"; }, 120 + i * 110);
    });
  }

  /* ===================================================
     8. AKTIVITAS & TUGAS
     =================================================== */
  function gambarAktivitas() {
    var ul = $("#feedAktivitas");
    ul.innerHTML = "";
    AKTIVITAS.forEach(function (a) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="ava"></span><div><p><b></b> <span class="isi"></span></p><span class="kapan"></span></div>';
      li.querySelector(".ava").textContent = Auth.inisial(a.siapa);
      li.querySelector("b").textContent = a.siapa;
      li.querySelector(".isi").textContent = a.teks;
      li.querySelector(".kapan").textContent = a.kapan;
      ul.appendChild(li);
    });
  }

  function gambarTugas() {
    var ul = $("#daftarTugas");
    ul.innerHTML = "";
    data.tugas.forEach(function (t, i) {
      var li = document.createElement("li");
      if (t.selesai) li.className = "selesai";
      li.innerHTML = '<input type="checkbox"' + (t.selesai ? " checked" : "") + ' aria-label="Tandai selesai">' +
                     '<span class="teks"></span><button class="buang" aria-label="Hapus tugas">&times;</button>';
      li.querySelector(".teks").textContent = t.teks;
      li.querySelector("input").addEventListener("change", function () {
        data.tugas[i].selesai = this.checked; tulisData(); gambarTugas();
      });
      li.querySelector(".buang").addEventListener("click", function () {
        data.tugas.splice(i, 1); tulisData(); gambarTugas(); toast("Tugas dihapus", "info");
      });
      ul.appendChild(li);
    });
    var selesai = data.tugas.filter(function (t) { return t.selesai; }).length;
    $("#ringkasTugas").textContent = selesai + " dari " + data.tugas.length + " selesai";
  }

  $("#formTugas").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("#tugasBaru");
    var teks = input.value.trim();
    if (!teks) return;
    data.tugas.push({ teks: teks, selesai: false });
    tulisData(); gambarTugas();
    input.value = "";
    toast("Tugas ditambahkan");
  });

  /* ===================================================
     9. TABEL PROYEK
     =================================================== */
  var saring = { status: "semua", cari: "", urut: "tenggat", naik: true };

  function kelasStatus(s) {
    if (s === "Selesai") return "selesai";
    if (s === "Ditinjau") return "tinjau";
    if (s === "Terlambat") return "telat";
    return "jalan";
  }

  function gambarProyek() {
    var tbody = $("#isiProyek");
    var baris = data.proyek.filter(function (p) {
      var cocokStatus = saring.status === "semua" || p.status === saring.status;
      var q = saring.cari.toLowerCase();
      var cocokCari = !q || (p.nama + " " + p.klien + " " + p.kategori).toLowerCase().indexOf(q) !== -1;
      return cocokStatus && cocokCari;
    });

    baris.sort(function (a, b) {
      var k = saring.urut, x = a[k], y = b[k];
      if (typeof x === "string") { x = x.toLowerCase(); y = String(y).toLowerCase(); }
      if (x < y) return saring.naik ? -1 : 1;
      if (x > y) return saring.naik ? 1 : -1;
      return 0;
    });

    tbody.innerHTML = "";
    baris.forEach(function (p, i) {
      var tr = document.createElement("tr");
      tr.className = "masuk";
      tr.style.animationDelay = (i * 0.04) + "s";
      tr.innerHTML =
        '<td><span class="nama-proyek"></span><span class="kecil"></span></td>' +
        '<td class="kl"></td><td class="kt"></td><td class="tg"></td>' +
        '<td><div class="progres"><div class="jalur"><i class="isi"></i></div><em></em></div></td>' +
        '<td><span class="lencana ' + kelasStatus(p.status) + '"><i></i><span class="st"></span></span></td>' +
        '<td style="text-align:right"><button class="aksi-baris" title="Hapus proyek">Hapus</button></td>';

      tr.querySelector(".nama-proyek").textContent = p.nama;
      tr.querySelector(".kecil").textContent = "#" + p.id;
      tr.querySelector(".kl").textContent = p.klien;
      tr.querySelector(".kt").textContent = p.kategori;
      tr.querySelector(".tg").textContent = tanggal(p.tenggat);
      tr.querySelector(".progres em").textContent = p.progres + "%";
      tr.querySelector(".st").textContent = p.status;

      var isi = tr.querySelector(".progres .isi");
      window.setTimeout(function () { isi.style.width = p.progres + "%"; }, 60 + i * 40);

      tr.querySelector(".aksi-baris").addEventListener("click", function () {
        var idx = data.proyek.indexOf(p);
        if (idx > -1) {
          data.proyek.splice(idx, 1);
          tulisData(); gambarProyek(); gambarStat();
          toast("Proyek “" + p.nama + "” dihapus", "bahaya");
        }
      });

      tbody.appendChild(tr);
    });

    $("#kosongProyek").hidden = baris.length > 0;
    $("#jumlahProyek").textContent = data.proyek.length;
  }

  $$("#chipStatus .chip").forEach(function (c) {
    c.addEventListener("click", function () {
      $$("#chipStatus .chip").forEach(function (x) { x.classList.toggle("is-on", x === c); });
      saring.status = c.getAttribute("data-status");
      gambarProyek();
    });
  });

  $("#cariProyek").addEventListener("input", function () { saring.cari = this.value; gambarProyek(); });

  $("#cariGlobal").addEventListener("input", function () {
    saring.cari = this.value;
    $("#cariProyek").value = this.value;
    if (this.value) keHalaman("proyek");
    gambarProyek();
  });

  $$("#tabelProyek thead th[data-urut]").forEach(function (th) {
    th.addEventListener("click", function () {
      var kolom = th.getAttribute("data-urut");
      saring.naik = saring.urut === kolom ? !saring.naik : true;
      saring.urut = kolom;
      $$("#tabelProyek thead th").forEach(function (x) { x.classList.remove("urut", "naik"); });
      th.classList.add("urut");
      if (saring.naik) th.classList.add("naik");
      gambarProyek();
    });
  });

  /* tambah proyek */
  var modal = $("#modalProyek");
  function bukaModal() {
    modal.hidden = false;
    $("#pTenggat").value = new Date(Date.now() + 1209600000).toISOString().slice(0, 10);
    window.setTimeout(function () { $("#pNama").focus(); }, 150);
  }
  function tutupModal() { if (modal) modal.hidden = true; }

  $("#bukaTambah").addEventListener("click", bukaModal);
  $("#tutupTambah").addEventListener("click", tutupModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) tutupModal(); });

  $("#formProyek").addEventListener("submit", function (e) {
    e.preventDefault();
    var nama = $("#pNama").value.trim(), klien = $("#pKlien").value.trim();
    var pesan = $("#msgProyek");
    if (nama.length < 3) { pesan.className = "set-msg err"; pesan.textContent = "Nama proyek minimal 3 huruf."; return; }
    if (!klien) { pesan.className = "set-msg err"; pesan.textContent = "Nama klien belum diisi."; return; }

    var progres = Math.max(0, Math.min(100, parseInt($("#pProgres").value, 10) || 0));
    var id = data.proyek.reduce(function (m, p) { return Math.max(m, p.id); }, 0) + 1;

    data.proyek.unshift({
      id: id, nama: nama, klien: klien,
      kategori: $("#pKategori").value,
      tenggat: $("#pTenggat").value,
      progres: progres,
      status: $("#pStatus").value
    });
    tulisData();
    pesan.textContent = "";
    this.reset();
    tutupModal();
    gambarProyek();
    gambarStat();
    toast("Proyek “" + nama + "” ditambahkan");
  });

  /* ===================================================
     10. KLIEN
     =================================================== */
  function gambarKlien() {
    var wadah = $("#gridKlien");
    wadah.innerHTML = "";
    data.klien.forEach(function (k, i) {
      var el = document.createElement("article");
      el.className = "box klien-kartu";
      el.style.animation = "naik .5s cubic-bezier(.16,1,.3,1) both";
      el.style.animationDelay = (i * 0.06) + "s";
      el.innerHTML =
        '<div class="klien-atas"><span class="ava"></span><div><b></b><span></span></div></div>' +
        '<div class="klien-baris"><span>Email</span><span class="em"></span></div>' +
        '<div class="klien-baris"><span>Telepon</span><span class="tl"></span></div>' +
        '<div class="klien-baris"><span>Proyek</span><span class="pr"></span></div>' +
        '<div class="klien-baris"><span>Nilai kerja sama</span><span class="nl"></span></div>';
      el.querySelector(".ava").textContent = Auth.inisial(k.nama);
      el.querySelector("b").textContent = k.nama;
      el.querySelector(".klien-atas span:last-child").textContent = k.usaha;
      el.querySelector(".em").textContent = k.email;
      el.querySelector(".tl").textContent = k.telp;
      el.querySelector(".pr").textContent = k.proyek + " proyek";
      el.querySelector(".nl").textContent = "Rp " + k.nilai + " juta";
      wadah.appendChild(el);
    });
  }

  /* ===================================================
     11. TAGIHAN
     =================================================== */
  function gambarTagihan() {
    var total = { Lunas: 0, Menunggu: 0, Terlambat: 0 };
    data.tagihan.forEach(function (t) { total[t.status] = (total[t.status] || 0) + t.nilai; });

    var kartu = $("#kartuTagihan");
    kartu.innerHTML = "";
    [["Sudah dibayar", total.Lunas, "naik"], ["Menunggu pembayaran", total.Menunggu, "naik"], ["Lewat jatuh tempo", total.Terlambat, "turun"]]
      .forEach(function (k) {
        var el = document.createElement("article");
        el.className = "box stat-card";
        el.innerHTML = '<span class="label"></span><div class="nilai">0</div>';
        el.querySelector(".label").textContent = k[0];
        kartu.appendChild(el);
        angkaBerjalan(el.querySelector(".nilai"), k[1], juta);
      });

    var tbody = $("#isiTagihan");
    tbody.innerHTML = "";
    data.tagihan.forEach(function (t, i) {
      var tr = document.createElement("tr");
      tr.className = "masuk";
      tr.style.animationDelay = (i * 0.04) + "s";
      tr.innerHTML = '<td class="no"></td><td class="kl"></td><td class="tr1"></td><td class="tr2"></td><td class="nl"></td>' +
        '<td><span class="lencana ' + (t.status === "Lunas" ? "selesai" : t.status === "Menunggu" ? "tinjau" : "telat") + '"><i></i><span class="st"></span></span></td>' +
        '<td style="text-align:right"></td>';
      tr.querySelector(".no").textContent = t.no;
      tr.querySelector(".kl").textContent = t.klien;
      tr.querySelector(".tr1").textContent = tanggal(t.terbit);
      tr.querySelector(".tr2").textContent = tanggal(t.tempo);
      tr.querySelector(".nl").textContent = rupiah(t.nilai);
      tr.querySelector(".st").textContent = t.status;

      if (t.status !== "Lunas") {
        var b = document.createElement("button");
        b.className = "aksi-baris lunasi";
        b.textContent = "Tandai lunas";
        b.addEventListener("click", function () {
          t.status = "Lunas"; tulisData(); gambarTagihan();
          toast("Tagihan " + t.no + " ditandai lunas");
        });
        tr.lastElementChild.appendChild(b);
      }
      tbody.appendChild(tr);
    });
  }

  /* ===================================================
     12. PENGATURAN
     =================================================== */
  var SWITCH = [
    { kunci: "emailNotif", judul: "Notifikasi email", ket: "Kirim email saat ada komentar baru" },
    { kunci: "ringkasMingguan", judul: "Ringkasan mingguan", ket: "Rekap performa tiap Senin pagi" },
    { kunci: "modeFokus", judul: "Mode fokus", ket: "Sembunyikan notifikasi saat jam kerja" }
  ];

  function gambarSwitch() {
    var ul = $("#daftarSwitch");
    ul.innerHTML = "";
    SWITCH.forEach(function (s) {
      var li = document.createElement("li");
      li.innerHTML = '<div><b></b><span></span></div><button class="sw" role="switch"><i></i></button>';
      li.querySelector("b").textContent = s.judul;
      li.querySelector("span").textContent = s.ket;
      var sw = li.querySelector(".sw");
      var nyala = !!data.preferensi[s.kunci];
      sw.classList.toggle("is-on", nyala);
      sw.setAttribute("aria-checked", nyala ? "true" : "false");
      sw.setAttribute("aria-label", s.judul);
      sw.addEventListener("click", function () {
        data.preferensi[s.kunci] = !data.preferensi[s.kunci];
        tulisData();
        sw.classList.toggle("is-on", data.preferensi[s.kunci]);
        sw.setAttribute("aria-checked", data.preferensi[s.kunci] ? "true" : "false");
        toast(s.judul + (data.preferensi[s.kunci] ? " dinyalakan" : " dimatikan"), "info");
      });
      ul.appendChild(li);
    });
  }

  $("#formProfil").addEventListener("submit", function (e) {
    e.preventDefault();
    var pesan = $("#msgProfil");
    var nama = $("#setNama").value.trim();
    var sandi = $("#setSandi").value;

    if (nama.length < 3) { pesan.className = "set-msg err"; pesan.textContent = "Nama minimal 3 huruf."; return; }
    if (sandi && sandi.length < 4) { pesan.className = "set-msg err"; pesan.textContent = "Password baru minimal 4 karakter."; return; }

    var hasil = Auth.perbarui({ nama: nama, sandi: sandi || undefined });
    if (!hasil.ok) { pesan.className = "set-msg err"; pesan.textContent = hasil.pesan; return; }

    pesan.className = "set-msg ok";
    pesan.textContent = "Perubahan tersimpan.";
    $("#setSandi").value = "";
    pasangIdentitas();
    toast("Profil diperbarui");
  });

  /* ===================================================
     13. KELUAR
     =================================================== */
  function keluar() {
    Auth.keluar();
    toast("Sampai jumpa!", "info");
    window.setTimeout(function () { window.location.href = "index.html"; }, 500);
  }
  $("#keluarSide").addEventListener("click", keluar);
  $("#keluarMenu").addEventListener("click", keluar);
  $("#keluarSet").addEventListener("click", keluar);

  /* ===================================================
     14. VIDEO LATAR
     =================================================== */
  var video = $("#bgVideo");
  if (video) {
    video.muted = true; video.defaultMuted = true; video.playsInline = true;
    function tandai() { if (!video.paused) video.classList.add("is-playing"); }
    ["playing", "play", "timeupdate", "canplay"].forEach(function (ev) { video.addEventListener(ev, tandai); });
    var coba = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
    coba();
    ["pointerdown", "keydown", "wheel"].forEach(function (ev) { window.addEventListener(ev, coba, { passive: true }); });
  }

  /* ===================================================
     15. JALAN
     =================================================== */
  gambarStat();
  gambarGrafik();
  gambarBar();
  gambarAktivitas();
  gambarTugas();
  gambarProyek();
  gambarKlien();
  gambarTagihan();
  gambarSwitch();

  window.setTimeout(function () {
    toast("Data di dashboard ini contoh dan tersimpan di browsermu", "info");
  }, 900);
})();
