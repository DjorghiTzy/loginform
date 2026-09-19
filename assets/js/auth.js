/* =========================================================
   Logo — auth.js
   Akun disimpan di browser (localStorage). Ini demo tanpa server:
   cukup untuk mencoba alur daftar → masuk → dashboard, TIDAK aman
   untuk data sungguhan.
   ========================================================= */
(function (global) {
  "use strict";

  var KUNCI_USER = "logo_users";
  var KUNCI_SESI = "logo_session";

  var AKUN_DEMO = {
    nama: "Wibu Kah",
    email: "wibukah@gmail.com",
    sandi: "1234",
    peran: "Administrator",
    bergabung: "2024-02-11"
  };

  /* ---------- penyimpanan yang tahan banting ---------- */
  var memori = {};

  function simpan(kunci, nilai) {
    var teks = JSON.stringify(nilai);
    memori[kunci] = teks;
    try { localStorage.setItem(kunci, teks); return; } catch (e) {}
    try { sessionStorage.setItem(kunci, teks); } catch (e) {}
  }

  function ambil(kunci, cadangan) {
    var teks = null;
    try { teks = localStorage.getItem(kunci); } catch (e) {}
    if (teks === null) { try { teks = sessionStorage.getItem(kunci); } catch (e) {} }
    if (teks === null && Object.prototype.hasOwnProperty.call(memori, kunci)) teks = memori[kunci];
    if (teks === null || teks === undefined) return cadangan;
    try { return JSON.parse(teks); } catch (e) { return cadangan; }
  }

  function hapus(kunci) {
    delete memori[kunci];
    try { localStorage.removeItem(kunci); } catch (e) {}
    try { sessionStorage.removeItem(kunci); } catch (e) {}
  }

  /* ---------- daftar pengguna ---------- */
  function daftarUser() {
    var list = ambil(KUNCI_USER, null);
    if (!list || !list.length) {
      list = [AKUN_DEMO];
      simpan(KUNCI_USER, list);
      return list;
    }
    var adaDemo = false;
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].email).toLowerCase() === AKUN_DEMO.email) { adaDemo = true; break; }
    }
    if (!adaDemo) { list.push(AKUN_DEMO); simpan(KUNCI_USER, list); }
    return list;
  }

  function cari(email) {
    var list = daftarUser();
    email = String(email || "").trim().toLowerCase();
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].email).toLowerCase() === email) return list[i];
    }
    return null;
  }

  function emailValid(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").trim());
  }

  /* ---------- API ---------- */
  var Auth = {
    akunDemo: { email: AKUN_DEMO.email, sandi: AKUN_DEMO.sandi },

    masuk: function (email, sandi) {
      if (!String(email || "").trim() || !String(sandi || "")) {
        return { ok: false, pesan: "Email dan password wajib diisi." };
      }
      if (!emailValid(email)) return { ok: false, pesan: "Format email belum benar." };

      var user = cari(email);
      if (!user) return { ok: false, pesan: "Akun dengan email itu belum terdaftar." };
      if (user.sandi !== String(sandi)) return { ok: false, pesan: "Password salah. Coba lagi." };

      simpan(KUNCI_SESI, { email: user.email, nama: user.nama, peran: user.peran, masukPada: Date.now() });
      return { ok: true, user: user };
    },

    daftar: function (data) {
      data = data || {};
      var nama  = String(data.nama || "").trim();
      var email = String(data.email || "").trim();
      var sandi = String(data.sandi || "");
      var ulang = String(data.ulangSandi === undefined ? sandi : data.ulangSandi);

      if (nama.length < 3)     return { ok: false, pesan: "Nama minimal 3 huruf." };
      if (!emailValid(email))  return { ok: false, pesan: "Format email belum benar." };
      if (cari(email))         return { ok: false, pesan: "Email itu sudah terdaftar. Silakan login." };
      if (sandi.length < 4)    return { ok: false, pesan: "Password minimal 4 karakter." };
      if (sandi !== ulang)     return { ok: false, pesan: "Konfirmasi password belum sama." };

      var list = daftarUser();
      var baru = {
        nama: nama,
        email: email,
        sandi: sandi,
        peran: "Anggota",
        bergabung: new Date().toISOString().slice(0, 10)
      };
      list.push(baru);
      simpan(KUNCI_USER, list);
      simpan(KUNCI_SESI, { email: baru.email, nama: baru.nama, peran: baru.peran, masukPada: Date.now() });
      return { ok: true, user: baru };
    },

    sesi: function () {
      var s = ambil(KUNCI_SESI, null);
      if (!s || !s.email) return null;
      var user = cari(s.email);
      if (!user) { hapus(KUNCI_SESI); return null; }
      return { nama: user.nama, email: user.email, peran: user.peran, bergabung: user.bergabung };
    },

    perbarui: function (data) {
      var s = this.sesi();
      if (!s) return { ok: false, pesan: "Sesi sudah berakhir." };
      var list = daftarUser();
      for (var i = 0; i < list.length; i++) {
        if (String(list[i].email).toLowerCase() === s.email.toLowerCase()) {
          if (data.nama) list[i].nama = String(data.nama).trim();
          if (data.sandi) list[i].sandi = String(data.sandi);
          simpan(KUNCI_USER, list);
          simpan(KUNCI_SESI, { email: list[i].email, nama: list[i].nama, peran: list[i].peran, masukPada: Date.now() });
          return { ok: true, user: list[i] };
        }
      }
      return { ok: false, pesan: "Akun tidak ditemukan." };
    },

    keluar: function () { hapus(KUNCI_SESI); },

    /* dipakai halaman dashboard: tendang keluar kalau belum masuk */
    wajibMasuk: function (halamanMasuk) {
      var s = this.sesi();
      if (!s) { window.location.replace(halamanMasuk || "index.html"); return null; }
      return s;
    },

    inisial: function (nama) {
      var bagian = String(nama || "?").trim().split(/\s+/);
      var a = (bagian[0] || "?").charAt(0);
      var b = bagian.length > 1 ? bagian[bagian.length - 1].charAt(0) : "";
      return (a + b).toUpperCase();
    }
  };

  global.Auth = Auth;
})(window);
