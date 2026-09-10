/* ==========================================================================
   LUFI — the gate

   No scroll library and no animation library, deliberately.

   Lenis preventDefaults the wheel and drives scroll programmatically, so the
   browser's snap engine never arms — a smooth-scroll library and CSS
   scroll-snap cannot both be right, and snap is the requirement here.
   Nothing on the page needs pinning, and nothing is hidden waiting to be
   revealed, so there is no animation library either. What is left is small
   enough to hand-write.
   ========================================================================== */
import "./styles/tokens.css";
import "./styles/app.css";
import "./styles/redesign.css";

const reel = document.querySelector(".reel");
const frames = [...document.querySelectorAll("[data-frame]")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
let reduced = motionPreference.matches;
motionPreference.addEventListener('change', event => { reduced = event.matches; });
const compact = matchMedia("(max-width:1100px), (max-height:760px), (max-aspect-ratio:13/10)");

/* ---------- first paint --------------------------------------------------
   The mark is the loading vessel: image/font readiness raises a warm fill,
   then the whole plate clears once the browser has a usable first frame. */
{
  const loader = document.querySelector('[data-loader]');
  if (loader) {
    const images = [...document.images];
    const pct = loader.querySelector('[data-loader-pct]');
    const rule = loader.querySelector('[data-loader-rule]');
    let finished = false;
    const setProgress = (value) => {
      const amount = Math.max(0, Math.min(1, value));
      const text = `${Math.round(amount * 100)}%`;
      loader.style.setProperty('--loader-fill', `${amount * 100}%`);
      if (pct) pct.textContent = text;
      if (rule) rule.style.transform = `scaleX(${amount})`;
    };
    const update = () => {
      const imageProgress = images.length
        ? images.filter((image) => image.complete).length / images.length
        : 1;
      const fontsReady = document.fonts?.status === 'loaded' ? 1 : 0;
      setProgress(imageProgress * 0.82 + fontsReady * 0.18);
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      loader.classList.add('is-done');
      window.setTimeout(() => loader.remove(), reduced ? 80 : 720);
    };
    images.forEach((image) => {
      image.addEventListener('load', update, { once: true, passive: true });
      image.addEventListener('error', update, { once: true, passive: true });
    });
    document.fonts?.ready?.then(update);
    window.addEventListener('load', finish, { once: true });
    window.setTimeout(finish, 4200);
    update();
  }
}

/* ---------- which frame is locked -----------------------------------------
   Drives the rail's aria-current and the counter. `scroll-state(snapped)`
   handles the frame's own styling in CSS; this is the part CSS cannot do,
   because the rail lives outside the scroll container. */
{
  const count = document.querySelector("[data-count]");
  const rail = document.querySelector(".rail");
  let current = null;

  const setActive = (n) => {
    if (n === current) return;
    current = n;
    if (count) count.textContent = String(n).padStart(2, "0");
    navLinks.forEach((a) => {
      const on = a.dataset.nav === String(n);
      a.setAttribute("aria-current", on ? "true" : "false");
    });
    if (rail) rail.toggleAttribute("data-dark", n === 6);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        // the most-visible frame wins, so a partly grown frame still reports
        let best = null;
        for (const e of entries) if (e.isIntersecting) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) setActive(+best.target.dataset.frame);
      },
      { root: reel, threshold: [0.35, 0.6, 0.9] }
    );
    frames.forEach((f) => io.observe(f));
  }
  setActive(1);
}

/* ---------- navigating between frames -------------------------------------
   The gate owns vertical paging. Studio pieces temporarily borrow the same
   wheel gesture for their horizontal rail, then return the gesture to the
   next section at either edge. One short, interruptible glide keeps the
   browser's snap engine from fighting a second scroll writer. */
{
  const easeOutQuint = (x) => 1 - Math.pow(1 - x, 5);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const work = document.querySelector("#f4");
  const track = work?.querySelector(".reel-x");
  let gliding = 0;
  let glideDirection = 0;
  let wheelUnlock = 0;
  let horizontalRaf = 0;
  let horizontalTarget = track?.scrollLeft || 0;
  let horizontalUnlock = 0;
  const pieces = track ? [...track.querySelectorAll(".piece")] : [];

  const cancelGlide = () => {
    cancelAnimationFrame(gliding);
    gliding = 0;
    glideDirection = 0;
    reel.classList.remove("is-gliding");
  };

  const glideTo = (top, ms = 480, direction = 0) => {
    cancelGlide();
    const from = reel.scrollTop;
    const dist = top - from;
    if (Math.abs(dist) < 2) return;
    if (reduced) { reel.scrollTop = top; return; }

    glideDirection = direction || Math.sign(dist);
    reel.classList.add("is-gliding");
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      reel.scrollTop = from + dist * easeOutQuint(p);
      if (p < 1) gliding = requestAnimationFrame(step);
      else cancelGlide();
    };
    gliding = requestAnimationFrame(step);
  };

  const topOf = (el) =>
    el.getBoundingClientRect().top - reel.getBoundingClientRect().top + reel.scrollTop;

  const nearestFrame = () => {
    const height = Math.max(1, reel.clientHeight);
    return clamp(Math.round(reel.scrollTop / height), 0, frames.length - 1);
  };

  const normalizeWheel = (event) => {
    const factor = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? reel.clientHeight : 1;
    const y = event.deltaY * factor;
    const x = event.deltaX * factor;
    return Math.abs(y) >= Math.abs(x) ? y : x;
  };

  const nearestProject = (left = track?.scrollLeft || 0) => {
    if (!pieces.length || !track) return 0;
    let best = 0;
    let distance = Infinity;
    pieces.forEach((piece, index) => {
      const nextDistance = Math.abs(piece.offsetLeft - left);
      if (nextDistance < distance) {
        best = index;
        distance = nextDistance;
      }
    });
    return best;
  };

  const driveHorizontalTo = (target) => {
    if (!track) return;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    horizontalTarget = clamp(target, 0, max);
    if (reduced) { track.scrollTo({ left: horizontalTarget, top: 0, behavior: "auto" }); return; }
    // Let the browser's compositor own this one-page transition. A JS rAF
    // loop fights mandatory scroll snap and can leave the rail at page zero.
    if (horizontalRaf) cancelAnimationFrame(horizontalRaf);
    horizontalRaf = -1;
    track.scrollTo({ left: horizontalTarget, top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      if (horizontalRaf === -1) {
        horizontalRaf = 0;
        horizontalTarget = track.scrollLeft;
      }
    }, 560);
  };

  const stepHorizontal = (direction) => {
    if (!track || !pieces.length) return false;
    const now = performance.now();
    if (now < horizontalUnlock) return true;
    const from = horizontalRaf ? horizontalTarget : track.scrollLeft;
    const current = nearestProject(from);
    const next = clamp(current + direction, 0, pieces.length - 1);
    if (next === current) return false;
    horizontalTarget = pieces[next].offsetLeft;
    horizontalUnlock = now + 500;
    driveHorizontalTo(horizontalTarget);
    return true;
  };

  const stopHorizontal = () => {
    cancelAnimationFrame(horizontalRaf);
    horizontalRaf = 0;
  };

  const workIsLocked = () => {
    if (!work) return false;
    return Math.abs(work.getBoundingClientRect().top - reel.getBoundingClientRect().top) < 2;
  };

  const onWheel = (event) => {
    const delta = normalizeWheel(event);
    if (Math.abs(delta) < 2) return;
    const direction = Math.sign(delta);

    if (workIsLocked() && track && track.scrollWidth > track.clientWidth) {
      const current = nearestProject(horizontalRaf ? horizontalTarget : track.scrollLeft);
      const atStart = current === 0;
      const atEnd = current === pieces.length - 1;
      const canBorrow = (direction > 0 && !atEnd) || (direction < 0 && !atStart);
      if (canBorrow) {
        event.preventDefault();
        cancelGlide();
        stepHorizontal(direction);
        return;
      }
    }

    if (reduced) return;
    if (reel.classList.contains("is-gliding")) {
      if (direction === glideDirection) { event.preventDefault(); return; }
      cancelGlide();
    }
    const now = performance.now();
    if (now < wheelUnlock) { event.preventDefault(); return; }

    const current = nearestFrame();
    const next = clamp(current + direction, 0, frames.length - 1);
    if (next === current) return;
    event.preventDefault();
    stopHorizontal();
    wheelUnlock = now + 470;
    glideTo(topOf(frames[next]), 440, direction);
  };

  reel.addEventListener("wheel", onWheel, { passive: false });
  track?.addEventListener("scroll", () => {
    if (!horizontalRaf) horizontalTarget = track.scrollLeft;
  }, { passive: true });
  track?.addEventListener("pointerdown", () => { horizontalTarget = track.scrollLeft; horizontalUnlock = 0; }, { passive: true });
  track?.addEventListener("touchstart", () => { horizontalTarget = track.scrollLeft; horizontalUnlock = 0; }, { passive: true });
  track?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      const moved = stepHorizontal(event.key === "ArrowRight" ? 1 : -1);
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const currentProject = nearestProject(horizontalRaf ? horizontalTarget : track.scrollLeft);
    const atEdge = event.key === "ArrowDown"
      ? currentProject === pieces.length - 1
      : currentProject === 0;
    if (!atEdge) return;
    const current = nearestFrame();
    const next = clamp(current + (event.key === "ArrowDown" ? 1 : -1), 0, frames.length - 1);
    if (next === current) return;
    event.preventDefault();
    event.stopPropagation();
    stopHorizontal();
    glideTo(topOf(frames[next]), 440, event.key === "ArrowDown" ? 1 : -1);
  });

  document.addEventListener("click", (ev) => {
    const a = ev.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;

    ev.preventDefault();
    glideTo(topOf(target), 440, Math.sign(topOf(target) - reel.scrollTop));
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });

  ["touchstart", "keydown"].forEach((type) =>
    reel.addEventListener(type, cancelGlide, { passive: true })
  );
}

/* ---------- the material --------------------------------------------------
   Capability-gated before a single byte is fetched: the audience arrives from
   Instagram, often on a mid-range phone over mobile data. */
{
  const mats = [...document.querySelectorAll("[data-mat]")];
  const nav = navigator;
  const constrained =
    nav.connection?.saveData ||
    nav.deviceMemory === 1 ||
    nav.hardwareConcurrency === 1;

  if (mats.length && !constrained) {
    import("./chrome.js").then(async ({ mount }) => {
      for (const [i, el] of mats.entries()) {
        const canvas = document.createElement("canvas");
        el.insertBefore(canvas, el.firstChild);

        const coarse = !matchMedia("(pointer: fine)").matches;
        const api = await mount(canvas, {
          seed: Number(el.dataset.seed || 12) + i * 7,
          dark: true,
          pointer: !coarse,
          cap: coarse ? 0.85 : 1.5,
          fps: coarse ? 30 : 60,
        });

        if (!api) { canvas.remove(); continue; }   // the CSS still stays
        el.classList.add("is-live");

        // Phones use a lower-resolution, 30fps pass; reduced motion stays still.
        api.once();
        let visible = false;
        const sync = () => visible && !document.hidden && !reduced ? api.start() : api.stop();
        const io = new IntersectionObserver(
          (es) => { visible = es[0].isIntersecting; sync(); },
          { root: reel, threshold: 0 }
        );
        io.observe(el);
        document.addEventListener("visibilitychange", sync);
        motionPreference.addEventListener('change', sync);
        const dispose = () => {
          io.disconnect(); api.destroy();
          document.removeEventListener('visibilitychange',sync);
          motionPreference.removeEventListener('change',sync);
        };
        addEventListener('pagehide', event => { if (!event.persisted) dispose(); else api.stop(); });
        addEventListener('pageshow', sync);
        if (import.meta.hot) import.meta.hot.dispose(dispose);
      }
    }).catch(() => { /* fallback panel stays. never a blank frame. */ });
  }
}

/* ---------- reactive cursor --------------------------------------------- */
{
  const fine = matchMedia('(pointer:fine)');
  const cursor = document.createElement('div');
  cursor.className = 'cursor-reactive';
  cursor.setAttribute('aria-hidden','true');
  document.body.append(cursor);

  let x = -80, y = -80, targetX = x, targetY = y;
  let scale = 1, targetScale = 1, visible = false, pressed = false;
  let cursorRaf = 0;
  const enabled = () => fine.matches && !reduced;
  const sync = () => {
    document.documentElement.classList.toggle('has-reactive-cursor',enabled());
    if (!enabled()) { visible=false; cursor.classList.remove('is-on','is-hot','is-down'); }
  };
  const frame = () => {
    x += (targetX-x)*0.22;
    y += (targetY-y)*0.22;
    scale += (targetScale-scale)*0.18;
    cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${scale})`;
    cursorRaf = requestAnimationFrame(frame);
  };
  const move = (event) => {
    if (!enabled() || event.pointerType !== 'mouse') return;
    targetX=event.clientX; targetY=event.clientY;
    if (!visible) { x=targetX; y=targetY; visible=true; cursor.classList.add('is-on'); }
  };
  const react = (event) => {
    if (!enabled()) return;
    const hot = Boolean(event.target.closest('a,button,[role="button"],.piece'));
    cursor.classList.toggle('is-hot',hot);
    targetScale = pressed ? .72 : hot ? 1.72 : 1;
  };
  const down = () => { if (enabled()) { pressed=true; targetScale=.72; cursor.classList.add('is-down'); } };
  const up = (event) => { pressed=false; cursor.classList.remove('is-down'); react(event); };
  const leave = () => { visible=false; cursor.classList.remove('is-on'); };

  addEventListener('pointermove',move,{passive:true});
  addEventListener('pointerover',react,{passive:true});
  addEventListener('pointerdown',down,{passive:true});
  addEventListener('pointerup',up,{passive:true});
  document.documentElement.addEventListener('pointerleave',leave,{passive:true});
  fine.addEventListener('change',sync); motionPreference.addEventListener('change',sync);
  sync(); frame();

  if (import.meta.hot) import.meta.hot.dispose(() => {
    cancelAnimationFrame(cursorRaf); cursor.remove();
    document.documentElement.classList.remove('has-reactive-cursor');
    removeEventListener('pointermove',move); removeEventListener('pointerover',react);
    removeEventListener('pointerdown',down); removeEventListener('pointerup',up);
    document.documentElement.removeEventListener('pointerleave',leave);
    fine.removeEventListener('change',sync); motionPreference.removeEventListener('change',sync);
  });
}

/* ---------- footer year ---------------------------------------------------- */
{
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
}


