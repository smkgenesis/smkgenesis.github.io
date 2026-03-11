(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsViewTransition = "startViewTransition" in document;
  const useFallbackAnimation = !prefersReduced && !supportsViewTransition;
  const prefetchSet = new Set();
  const maxPrefetch = 30;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const scrollKey = `scroll:${location.pathname}`;

  const saveScroll = () => {
    try {
      sessionStorage.setItem(scrollKey, String(Math.round(window.scrollY)));
    } catch {}
  };

  const restoreScroll = () => {
    if (location.hash) return;
    try {
      const raw = sessionStorage.getItem(scrollKey);
      if (raw === null) return;
      const y = Number(raw);
      if (!Number.isNaN(y)) {
        window.scrollTo(0, y);
      }
    } catch {}
  };

  const isInternalNavigable = (href) => {
    if (!href) return false;
    if (href.startsWith("#")) return false;
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return false;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;
    return true;
  };

  const prefetch = (link) => {
    if (prefetchSet.size >= maxPrefetch) return;
    const href = link.getAttribute("href");
    if (!isInternalNavigable(href)) return;

    const url = new URL(href, window.location.href);
    const key = url.toString();
    if (prefetchSet.has(key)) return;
    prefetchSet.add(key);

    const el = document.createElement("link");
    el.rel = "prefetch";
    el.as = "document";
    el.href = key;
    document.head.appendChild(el);
  };

  const installPrefetch = () => {
    document.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("pointerenter", () => prefetch(link), { passive: true });
      link.addEventListener("focus", () => prefetch(link), { passive: true });
      link.addEventListener("touchstart", () => prefetch(link), { passive: true, once: true });
    });
  };

  restoreScroll();
  requestAnimationFrame(() => document.body.classList.add("page-entered"));
  installPrefetch();

  let scrollTimer;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(saveScroll, 120);
  }, { passive: true });
  window.addEventListener("pagehide", saveScroll, { capture: true });

  if (!useFallbackAnimation) return;

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.target && link.target !== "") return;

    const href = link.getAttribute("href");
    if (!isInternalNavigable(href)) return;

    event.preventDefault();
    saveScroll();
    document.body.classList.add("page-leaving");

    const url = new URL(href, window.location.href).toString();
    window.setTimeout(() => {
      window.location.href = url;
    }, 230);
  }, true);
})();
