/* =========================================================
   Logo — Landing + Login  |  main.js
   Semua animasi, smooth scroll, dan interaksi halaman.
   ========================================================= */
(function () {
  "use strict";

  var doc  = document.documentElement;
  var body = document.body;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===================================================
     1. SMOOTH SCROLL (inersia lembut ala "slide")
     =================================================== */
  var Scroller = (function () {
    var canSmooth = !reduceMotion &&
      !!window.requestAnimationFrame &&
      window.matchMedia("(pointer: fine)").matches &&   // di layar sentuh pakai inersia bawaan
      window.innerWidth > 860;

    var target = window.pageYOffset;
    var current = target;
    var running = false;
    var tweening = false;
    var locked = false;
    var EASE = 0.12;

    function maxScroll() {
      return Math.max(0, doc.scrollHeight - window.innerHeight);
    }

    function clamp(v) {
      return Math.max(0, Math.min(v, maxScroll()));
    }

    function loop() {
      var diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }
      current += diff * EASE;
      window.scrollTo(0, current);
      window.requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      window.requestAnimationFrame(loop);
    }

    function onWheel(e) {
      if (locked || tweening || e.ctrlKey) return;
      var delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 18;          // baris
      else if (e.deltaMode === 2) delta *= window.innerHeight; // halaman
      e.preventDefault();
      target = clamp(target + delta);
      start();
    }

    function sync() {
      if (running || tweening) return;
      target = current = window.pageYOffset;
    }

    /* animasi scroll ke posisi tertentu (dipakai menu & tombol) */
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function scrollTo(y, duration) {
      y = clamp(y);
      if (reduceMotion) {
        window.scrollTo(0, y);
        target = current = y;
        return;
      }
      var startY = window.pageYOffset;
      var dist = y - startY;
      if (Math.abs(dist) < 1) return;
      var time = duration || Math.min(1400, Math.max(600, Math.abs(dist) * 0.7));
      var startTime = null;
      tweening = true;

      function step(now) {
        if (startTime === null) startTime = now;
        var p = Math.min(1, (now - startTime) / time);
        var val = startY + dist * easeInOutCubic(p);
        window.scrollTo(0, val);
        current = target = val;
        if (p < 1) {
          window.requestAnimationFrame(step);
        } else {
          tweening = false;
          current = target = y;
        }
      }
      window.requestAnimationFrame(step);
    }

    if (canSmooth) {
      doc.style.scrollBehavior = "auto";  // jangan bentrok dengan mesin sendiri
      window.addEventListener("wheel", onWheel, { passive: false });
    }
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", function () {
      target = clamp(target);
      sync();
    }, { passive: true });

    return {
      scrollTo: scrollTo,
      lock: function (v) { locked = v; },
      sync: sync
    };
  })();

  /* ===================================================
     2. ANCHOR LINK -> SCROLL HALUS
     =================================================== */
  var navbar = document.getElementById("navbar");

  function navHeight() {
    return navbar ? navbar.offsetHeight : 0;
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-scroll]"), function (link) {
    link.addEventListener("click", function (e) {
      var hash = link.getAttribute("href");
      if (!hash || hash.charAt(0) !== "#") return;
      var section = document.querySelector(hash);
      if (!section) return;

      e.preventDefault();
      closeNav();
      closeModal();

      var top = section.getBoundingClientRect().top + window.pageYOffset;
      var offset = (hash === "#home") ? 0 : top - navHeight() + 1;
      Scroller.scrollTo(hash === "#home" ? 0 : offset);

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", hash);
      }
    });
  });

  /* ===================================================
     3. SCROLL REVEAL
     =================================================== */
  var revealItems = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    Array.prototype.forEach.call(revealItems, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealItems, function (el) { el.classList.add("is-visible"); });
  }

  /* ===================================================
     4. ANGKA BERJALAN (statistik About)
     =================================================== */
  var counters = document.querySelectorAll("[data-count]");

  function runCounter(el) {
    var end = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = end + suffix; return; }

    var duration = 1600;
    var startTime = null;

    function step(now) {
      if (startTime === null) startTime = now;
      var p = Math.min(1, (now - startTime) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
  } else {
    Array.prototype.forEach.call(counters, runCounter);
  }

  /* ===================================================
     5. EFEK SAAT SCROLL (navbar, progress, shade, spy)
     =================================================== */
  var progressBar = document.getElementById("progressBar");
  var bgShade     = document.getElementById("bgShade");
  var toTop       = document.getElementById("toTop");
  var navLinks    = document.querySelectorAll(".nav-links a");
  var sections    = document.querySelectorAll("main section[id]");
  var ticking     = false;

  function onScrollFrame() {
    var y = window.pageYOffset;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var vh = window.innerHeight;

    if (navbar) navbar.classList.toggle("scrolled", y > 40);
    if (progressBar) progressBar.style.transform = "scaleX(" + (y / max) + ")";
    if (bgShade) bgShade.style.opacity = Math.min(0.55, (y / vh) * 0.5);
    if (toTop) toTop.classList.toggle("show", y > vh * 0.7);

    // scroll spy
    var currentId = "home";
    Array.prototype.forEach.call(sections, function (sec) {
      if (y >= sec.offsetTop - navHeight() - 120) currentId = sec.id;
    });
    Array.prototype.forEach.call(navLinks, function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });

    ticking = false;
  }

  function requestScrollFrame() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScrollFrame);
  }

  window.addEventListener("scroll", requestScrollFrame, { passive: true });
  window.addEventListener("resize", requestScrollFrame, { passive: true });
  requestScrollFrame();

  if (toTop) {
    toTop.addEventListener("click", function () { Scroller.scrollTo(0, 1100); });
  }

  /* ===================================================
     6. MODAL LOGIN
     =================================================== */
  var modal      = document.getElementById("loginModal");
  var backdrop   = document.getElementById("modalBackdrop");
  var openBtn    = document.getElementById("openLogin");
  var closeBtn   = document.getElementById("closeLogin");
  var form       = document.getElementById("loginForm");
  var formError  = document.getElementById("formError");
  var emailInput = document.getElementById("email");
  var passInput  = document.getElementById("password");

  var modalLocked = false;   // true = dibuka user, scroll halaman dikunci

  function lockScroll(v) {
    if (v) {
      var gap = window.innerWidth - doc.clientWidth;
      if (gap > 0) body.style.paddingRight = gap + "px";
      doc.style.overflow = "hidden";
    } else {
      doc.style.overflow = "";
      body.style.paddingRight = "";
    }
    body.classList.toggle("no-scroll", v);
    Scroller.lock(v);
    modalLocked = v;
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.classList.remove("is-passive");
    if (backdrop) backdrop.classList.add("is-open");
    closeNav();
    lockScroll(true);
    window.setTimeout(function () { if (emailInput) emailInput.focus(); }, 320);
  }

  function closeModal() {
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.classList.remove("is-passive");
    if (backdrop) backdrop.classList.remove("is-open");
    lockScroll(false);
    hideError();
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  Array.prototype.forEach.call(document.querySelectorAll("[data-open-login]"), function (btn) {
    btn.addEventListener("click", openModal);
  });

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") { closeModal(); closeNav(); }
  });

  /* Saat halaman dibuka, modal tampil (sesuai desain) tanpa mengunci scroll.
     Begitu pengunjung mulai menggulir, modal menutup sendiri dengan halus. */
  // di layar kecil kartu tidak tampil otomatis supaya isi hero terlihat utuh
  if (modal && window.innerWidth <= 1024) {
    modal.classList.remove("is-open", "is-passive");
  }

  (function autoCloseOnFirstScroll() {
    if (!modal) return;
    var opts = { passive: true };

    function handler() {
      if (!modalLocked) closeModal();
      remove();
    }
    function remove() {
      window.removeEventListener("wheel", handler, opts);
      window.removeEventListener("touchmove", handler, opts);
      window.removeEventListener("scroll", handler, opts);
      document.removeEventListener("keydown", keyHandler);
    }
    function keyHandler(e) {
      var keys = ["ArrowDown", "PageDown", "End", " ", "Spacebar"];
      if (keys.indexOf(e.key) !== -1 && !modalLocked) { closeModal(); remove(); }
    }

    window.addEventListener("wheel", handler, opts);
    window.addEventListener("touchmove", handler, opts);
    window.addEventListener("scroll", handler, opts);
    document.addEventListener("keydown", keyHandler);
  })();

  /* ===================================================
     7. NAVBAR MOBILE
     =================================================== */
  var navToggle = document.getElementById("navToggle");
  var navMenu   = document.getElementById("navMenu");

  function closeNav() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      // tutup kartu login yang masih tampil otomatis agar tidak menutupi menu
      if (isOpen && modal && modal.classList.contains("is-passive")) closeModal();
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ===================================================
     8. FORM LOGIN
     =================================================== */
  function showError(msg) {
    if (!formError) return;
    formError.classList.remove("show");
    void formError.offsetWidth;          // reset animasi getar
    formError.textContent = msg;
    formError.classList.add("show");
  }

  function hideError() {
    if (!formError) return;
    formError.textContent = "";
    formError.classList.remove("show");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var email = emailInput ? emailInput.value.trim() : "";
      var pass  = passInput ? passInput.value : "";
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

      if (!email || !pass) { showError("Email dan password wajib diisi."); return; }
      if (!emailOk)        { showError("Format email belum benar."); return; }
      if (pass.length < 6) { showError("Password minimal 6 karakter."); return; }

      hideError();

      // >>> Sambungkan ke API/backend kamu di sini <<<
      var btn = form.querySelector(".btn-submit");
      if (!btn) return;
      var original = btn.textContent;
      btn.textContent = "Loading...";
      btn.disabled = true;
      window.setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
        closeModal();
        form.reset();
      }, 900);
    });

    [emailInput, passInput].forEach(function (el) {
      if (el) el.addEventListener("input", hideError);
    });
  }

  /* ===================================================
     9. VIDEO BACKGROUND
     =================================================== */
  var video    = document.getElementById("bgVideo");
  var playHint = document.getElementById("playHint");

  if (video) {
    // properti (bukan cuma atribut) — beberapa browser hanya mengizinkan
    // autoplay kalau keduanya benar-benar diset.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    var gestures = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"];

    function sembunyikanTombol() {
      if (playHint) playHint.hidden = true;
    }

    function tampilkanTombol() {
      // hanya bila videonya memang ada tapi ditahan browser
      if (!playHint || !video.paused || video.error || video.networkState === 3) return;
      playHint.hidden = false;
    }

    function coba() {
      if (!video.paused) return;
      var p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () { tampilkanTombol(); });
      }
    }

    function lepasGesture() {
      gestures.forEach(function (ev) { window.removeEventListener(ev, coba); });
    }

    // video baru ditampilkan begitu gambarnya benar-benar berjalan.
    // dipasang ke beberapa event sekaligus karena atribut autoplay bisa membuat
    // video sudah jalan sebelum skrip ini dieksekusi.
    function tandaiJalan() {
      if (video.paused) return;
      video.classList.add("is-playing");
      sembunyikanTombol();
      lepasGesture();
    }

    video.addEventListener("playing", tandaiJalan);
    video.addEventListener("play", tandaiJalan);
    video.addEventListener("timeupdate", tandaiJalan);
    tandaiJalan();
    video.addEventListener("pause", function () { video.classList.remove("is-playing"); });

    video.addEventListener("loadeddata", coba);
    video.addEventListener("canplay", coba);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) coba();
    });

    // setiap interaksi pengguna dipakai sebagai izin untuk memulai video
    gestures.forEach(function (ev) {
      window.addEventListener(ev, coba, { passive: true });
    });

    if (playHint) {
      playHint.addEventListener("click", function (e) {
        e.preventDefault();
        video.play();
        sembunyikanTombol();
      });
    }

    coba();

    // masih diam setelah 2,5 detik padahal filenya ada -> tawarkan tombol
    window.setTimeout(function () {
      if (video.paused) tampilkanTombol();
    }, 2500);

    // Kalau file video benar-benar tidak ada / tidak didukung, sembunyikan <video>
    // agar gradien cadangan yang tampil. Video yang hanya "lambat" tidak disembunyikan.
    var hideVideo = function () {
      video.style.display = "none";
      sembunyikanTombol();
    };

    video.addEventListener("error", hideVideo, true);

    window.setTimeout(function () {
      // networkState 3 = NETWORK_NO_SOURCE (tidak ada sumber yang bisa dipakai)
      if (video.networkState === 3 || video.error) hideVideo();
    }, 4000);
  }

  /* ===================================================
     10. FILTER KARYA
     =================================================== */
  var filterBtns = document.querySelectorAll(".filter");
  var workCards  = document.querySelectorAll(".work-card");

  Array.prototype.forEach.call(filterBtns, function (btn) {
    btn.addEventListener("click", function () {
      var kategori = btn.getAttribute("data-filter");

      Array.prototype.forEach.call(filterBtns, function (b) {
        b.classList.toggle("is-active", b === btn);
      });

      Array.prototype.forEach.call(workCards, function (card, i) {
        var cocok = kategori === "all" || card.getAttribute("data-cat") === kategori;

        if (!cocok) {
          card.classList.add("is-out");
          window.setTimeout(function () {
            if (card.classList.contains("is-out")) card.hidden = true;
          }, 320);
          return;
        }

        card.hidden = false;
        card.classList.add("is-out");
        window.setTimeout(function () { card.classList.remove("is-out"); }, 30 + i * 60);
      });
    });
  });

  /* ===================================================
     11. HARGA: BULANAN / TAHUNAN
     =================================================== */
  var priceToggle = document.getElementById("priceToggle");
  var labelMonth  = document.getElementById("labelMonth");
  var labelYear   = document.getElementById("labelYear");
  var hargaEls    = document.querySelectorAll(".price strong");

  function rupiah(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  if (priceToggle) {
    priceToggle.addEventListener("click", function () {
      var tahunan = !priceToggle.classList.contains("is-on");

      priceToggle.classList.toggle("is-on", tahunan);
      priceToggle.setAttribute("aria-checked", tahunan ? "true" : "false");
      if (labelMonth) labelMonth.classList.toggle("is-on", !tahunan);
      if (labelYear) labelYear.classList.toggle("is-on", tahunan);

      Array.prototype.forEach.call(hargaEls, function (el) {
        var box = el.parentNode;
        box.classList.add("is-switching");
        window.setTimeout(function () {
          var nilai = el.getAttribute(tahunan ? "data-year" : "data-month");
          el.textContent = rupiah(nilai);
          var per = box.querySelector(".per");
          if (per) per.textContent = tahunan ? "/bln, ditagih tahunan" : "/bln";
          box.classList.remove("is-switching");
        }, 220);
      });
    });
  }

  /* ===================================================
     12. TESTIMONI BERGANTIAN
     =================================================== */
  var quotes   = document.querySelectorAll(".quote");
  var dots     = document.querySelectorAll(".dot");
  var quoteBox = document.getElementById("quoteBox");
  var kutipan  = 0;
  var timerKutipan = null;

  function tampilkanKutipan(i) {
    if (!quotes.length) return;
    kutipan = (i + quotes.length) % quotes.length;
    Array.prototype.forEach.call(quotes, function (q, n) { q.classList.toggle("is-on", n === kutipan); });
    Array.prototype.forEach.call(dots, function (d, n) { d.classList.toggle("is-on", n === kutipan); });
  }

  function jalankanKutipan() {
    hentikanKutipan();
    if (quotes.length < 2 || reduceMotion) return;
    timerKutipan = window.setInterval(function () { tampilkanKutipan(kutipan + 1); }, 6000);
  }

  function hentikanKutipan() {
    if (timerKutipan) { window.clearInterval(timerKutipan); timerKutipan = null; }
  }

  Array.prototype.forEach.call(dots, function (d, n) {
    d.addEventListener("click", function () { tampilkanKutipan(n); jalankanKutipan(); });
  });

  if (quoteBox) {
    quoteBox.addEventListener("mouseenter", hentikanKutipan);
    quoteBox.addEventListener("mouseleave", jalankanKutipan);
  }
  jalankanKutipan();

  /* ===================================================
     13. AKORDEON FAQ
     =================================================== */
  var accItems = document.querySelectorAll(".acc-item");

  Array.prototype.forEach.call(accItems, function (item) {
    var head = item.querySelector(".acc-head");
    var body = item.querySelector(".acc-body");
    if (!head || !body) return;

    head.addEventListener("click", function () {
      var sedangTerbuka = item.classList.contains("is-open");

      Array.prototype.forEach.call(accItems, function (lain) {
        var b = lain.querySelector(".acc-body");
        var h = lain.querySelector(".acc-head");
        lain.classList.remove("is-open");
        if (b) b.style.maxHeight = "0px";
        if (h) h.setAttribute("aria-expanded", "false");
      });

      if (!sedangTerbuka) {
        item.classList.add("is-open");
        body.style.maxHeight = body.scrollHeight + "px";
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(accItems, function (item) {
      var body = item.querySelector(".acc-body");
      if (body && item.classList.contains("is-open")) body.style.maxHeight = body.scrollHeight + "px";
    });
  }, { passive: true });

  /* ===================================================
     14. FORM KONTAK & NEWSLETTER
     =================================================== */
  var contactForm = document.getElementById("contactForm");
  var cfError     = document.getElementById("cfError");
  var cfDone      = document.getElementById("cfDone");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nama  = contactForm.elements["nama"].value.trim();
      var surel = contactForm.elements["email"].value.trim();
      var pesan = contactForm.elements["pesan"].value.trim();
      var surelOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(surel);

      function salah(msg) {
        if (!cfError) return;
        cfError.classList.remove("show");
        void cfError.offsetWidth;
        cfError.textContent = msg;
        cfError.classList.add("show");
      }

      if (!nama)        { salah("Nama masih kosong."); return; }
      if (!surelOk)     { salah("Format email belum benar."); return; }
      if (pesan.length < 10) { salah("Ceritakan kebutuhanmu sedikit lebih panjang (minimal 10 karakter)."); return; }

      if (cfError) cfError.classList.remove("show");

      var tombol = contactForm.querySelector("button[type=submit]");
      if (tombol) { tombol.textContent = "Mengirim..."; tombol.disabled = true; }

      window.setTimeout(function () {
        if (cfDone) cfDone.hidden = false;
        window.setTimeout(function () {
          if (cfDone) cfDone.hidden = true;
          contactForm.reset();
          if (tombol) { tombol.textContent = "Kirim Pesan"; tombol.disabled = false; }
        }, 3200);
      }, 700);
    });
  }

  var newsForm = document.getElementById("newsForm");
  var newsMsg  = document.getElementById("newsMsg");

  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nilai = newsForm.elements["email"].value.trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(nilai);
      if (!newsMsg) return;
      newsMsg.textContent = ok ? "Terima kasih, emailmu sudah terdaftar." : "Masukkan email yang benar dulu ya.";
      newsMsg.style.color = ok ? "#cfd4da" : "#ffb4b4";
      if (ok) newsForm.reset();
    });
  }

  /* ===================================================
     15. TOMBOL MAGNETIS
     =================================================== */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    Array.prototype.forEach.call(document.querySelectorAll(".magnetic"), function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.28;
        var y = (e.clientY - r.top - r.height / 2) * 0.4;
        el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ===================================================
     16. LAIN-LAIN
     =================================================== */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
