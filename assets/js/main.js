// CRAVIO LABS — interactions
(function () {
  // nav scroll state
  const nav = document.getElementById('nav');
  const onScrollNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);

  // ---- reveal on scroll (viewport-check based; robust in capture + real browsers) ----
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  function revealInView() {
    const h = window.innerHeight || document.documentElement.clientHeight;
    for (let i = revealEls.length - 1; i >= 0; i--) {
      const el = revealEls[i];
      const top = el.getBoundingClientRect().top;
      if (top < h * 0.92) {
        el.classList.add('visible');
        revealEls.splice(i, 1);
      }
    }
  }

  // primary path: IntersectionObserver fires on any viewport entry,
  // including fragment jumps that never emit scroll events
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  let ticking = false;
  function onScroll() {
    onScrollNav();
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { revealInView(); ticking = false; });
    }
  }

  onScrollNav();

  // Opt into entrance animation ONLY if the document timeline is actually
  // advancing (it is frozen in some capture/preview contexts). When frozen or
  // reduced-motion, .reveal stays visible by default — content is never stranded.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t0 = document.timeline ? (document.timeline.currentTime || 0) : 0;
  setTimeout(function () {
    const t1 = document.timeline ? (document.timeline.currentTime || 0) : 0;
    const live = t1 > t0;
    if (live && !reduce) {
      document.documentElement.classList.add('motion');
      // mark on-screen items visible in the same tick so they animate in (no flash)
      revealInView();
    }
  }, 60);

  // safety net — never leave content hidden
  window.addEventListener('load', revealInView);
  setTimeout(revealInView, 500);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', revealInView, { passive: true });

  // smooth anchor scroll with offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
