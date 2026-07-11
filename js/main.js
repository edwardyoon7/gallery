(function () {
  "use strict";

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // ---- Scroll-spy: highlight active nav link ----
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id], header[id]"));
  var navAnchors = Array.prototype.slice.call(navLinks.querySelectorAll("a"));

  function onScroll() {
    var pos = window.scrollY + 90;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec;
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Lightbox gallery ----
  var figures = Array.prototype.slice.call(document.querySelectorAll("#gallery figure"));
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbTitle = document.getElementById("lbTitle");
  var lbMeta = document.getElementById("lbMeta");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var current = 0;

  function openLightbox(index) {
    current = index;
    var fig = figures[current];
    lbImg.src = fig.getAttribute("data-full");
    lbImg.alt = fig.getAttribute("data-title");
    lbTitle.textContent = fig.getAttribute("data-title");
    lbMeta.textContent = " — " + fig.getAttribute("data-meta");
    lightbox.classList.add("open");
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
  }
  function step(delta) {
    current = (current + delta + figures.length) % figures.length;
    openLightbox(current);
  }

  figures.forEach(function (fig, i) {
    fig.addEventListener("click", function () { openLightbox(i); });
  });
  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { step(-1); });
  lbNext.addEventListener("click", function () { step(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
