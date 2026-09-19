/* =========================================================
   Logo — Landing + Login  |  main.js
   ========================================================= */
(function () {
  "use strict";

  var modal      = document.getElementById("loginModal");
  var backdrop   = document.getElementById("modalBackdrop");
  var openBtn    = document.getElementById("openLogin");
  var closeBtn   = document.getElementById("closeLogin");
  var form       = document.getElementById("loginForm");
  var formError  = document.getElementById("formError");
  var emailInput = document.getElementById("email");
  var passInput  = document.getElementById("password");
  var navToggle  = document.getElementById("navToggle");
  var navMenu    = document.getElementById("navMenu");
  var video      = document.getElementById("bgVideo");

  /* ---------- Modal ---------- */
  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-open");
    closeNav();
    window.setTimeout(function () {
      if (emailInput) emailInput.focus();
    }, 220);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-open");
    hideError();
  }

  if (openBtn)  openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  // klik area kosong di luar kartu
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal();
      closeNav();
    }
  });

  /* ---------- Navbar mobile ---------- */
  function closeNav() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ---------- Form ---------- */
  function showError(msg) {
    if (!formError) return;
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
      hideError();

      var email = emailInput ? emailInput.value.trim() : "";
      var pass  = passInput ? passInput.value : "";
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

      if (!email || !pass) {
        showError("Email dan password wajib diisi.");
        return;
      }
      if (!emailOk) {
        showError("Format email belum benar.");
        return;
      }
      if (pass.length < 6) {
        showError("Password minimal 6 karakter.");
        return;
      }

      // >>> Sambungkan ke API/backend kamu di sini <<<
      var btn = form.querySelector(".btn-submit");
      if (btn) {
        var original = btn.textContent;
        btn.textContent = "Loading...";
        btn.disabled = true;
        window.setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
          closeModal();
          form.reset();
        }, 900);
      }
    });

    [emailInput, passInput].forEach(function (el) {
      if (el) el.addEventListener("input", hideError);
    });
  }

  /* ---------- Video background ---------- */
  if (video) {
    // Sebagian browser memblokir autoplay sampai ada interaksi.
    var tryPlay = function () {
      var p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () { /* diabaikan */ });
    };
    tryPlay();
    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true });

    // Kalau file video belum ada, sembunyikan <video> agar gradien cadangan tampil.
    video.addEventListener("error", function () { video.style.display = "none"; }, true);
    window.setTimeout(function () {
      if (video.readyState === 0) video.style.display = "none";
    }, 4000);
  }
})();
