/* ═══════════════════════════════════════════════════════════
   LUFI — script.js
   No dependencies. Motion stays stepped; nothing eases.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Pixel-dissolve reveals ─────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── 2. Havi — changes state per section ───────────────── */
  var havi = document.getElementById('havi');
  var sections = document.querySelectorAll('[data-havi]');

  if (havi && sections.length) {
    // wake Havi once the hero is behind you, so the entrance isn't crowded
    window.setTimeout(function () { havi.classList.add('is-awake'); }, 900);

    var haviObserver = new IntersectionObserver(function (entries) {
      // pick the most visible section that qualifies
      var best = null;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      });
      if (best) {
        var state = best.target.getAttribute('data-havi');
        if (state && havi.getAttribute('data-state') !== state) {
          havi.setAttribute('data-state', state);
        }
      }
    }, { threshold: [0.25, 0.5, 0.75] });

    sections.forEach(function (section) { haviObserver.observe(section); });
  }

  /* ── 3. Stepped scroll progress ────────────────────────── */
  var bar = document.getElementById('progressBar');
  var nav = document.getElementById('nav');
  var lastStep = -1;
  var ticking = false;

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;

    // snap to 5% increments — the progress bar steps like everything else
    var step = Math.round(pct / 5) * 5;
    if (bar && step !== lastStep) {
      bar.style.width = step + '%';
      lastStep = step;
    }

    if (nav) {
      nav.classList.toggle('is-stuck', window.scrollY > 12);
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();

  /* ── 4. Mobile menu ────────────────────────────────────── */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }
})();
