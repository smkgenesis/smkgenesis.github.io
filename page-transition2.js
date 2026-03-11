(() => {
  // Force-inject critical styles — bypasses all external CSS caching
  const _style = document.createElement("style");
  _style.textContent = `
    /* Search palette forced colors */
    .aa-DetachedOverlay, .aa-DetachedContainer,
    #quarto-search-results .aa-Panel {
      background: #0d1117 !important;
      border-color: #1e2a38 !important;
    }
    #quarto-search-results .aa-Input,
    .aa-DetachedSearchButtonPlaceholder {
      background: #161e29 !important;
      color: #cdd4de !important;
    }
    #quarto-search-results .aa-List,
    #quarto-search-results .aa-Source {
      background: #111820 !important;
    }
    #quarto-search-results .aa-SourceHeader,
    #quarto-search-results .aa-SourceHeaderLine {
      background: #0d1117 !important;
      border-bottom: 1px solid #1e2a38 !important;
      background-image: none !important;
    }
    #quarto-search-results .aa-Item {
      background: #111820 !important;
    }
    #quarto-search-results .aa-Item[aria-selected="true"],
    #quarto-search-results .aa-Item[aria-selected="true"] .search-item,
    #quarto-search-results .aa-Item[aria-selected="true"] .search-result-doc,
    #quarto-search-results .aa-Item[aria-selected="true"] .search-result-more,
    #quarto-search-results .aa-Item[aria-selected="true"] .search-result-doc-section {
      background: #26374c !important;
      background-color: #26374c !important;
      background-image: none !important;
    }
    #quarto-search-results .search-item,
    #quarto-search-results .search-result-title,
    #quarto-search-results .search-result-crumbs,
    #quarto-search-results .search-result-section {
      color: #cdd4de !important;
      background-image: none !important;
    }
    #quarto-search-results .search-result-text {
      color: #8a99ad !important;
    }
  `;
  document.head.appendChild(_style);

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsViewTransition = "startViewTransition" in document;
  const useFallbackAnimation = !prefersReduced && !supportsViewTransition;
  const prefetchSet = new Set();
  const maxPrefetch = 30;
  const DIR_KEY = "page:dir";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const scrollKey = `scroll:${location.pathname}`;

  const routeRank = (url) => {
    const p = url.pathname.toLowerCase();
    if (p.endsWith("/index.html") || p === "/") return 0;
    if (p.endsWith("/articles.html")) return 10;
    if (p.includes("/articles/")) return 11;
    if (p.endsWith("/projects.html")) return 20;
    if (p.includes("/projects/")) return 21;
    return 15;
  };

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
      if (!Number.isNaN(y)) window.scrollTo(0, y);
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
    const url = new URL(href, window.location.href).toString();
    if (prefetchSet.has(url)) return;
    prefetchSet.add(url);

    const el = document.createElement("link");
    el.rel = "prefetch";
    el.as = "document";
    el.href = url;
    document.head.appendChild(el);
  };

  const installPrefetch = () => {
    document.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("pointerenter", () => prefetch(link), { passive: true });
      link.addEventListener("focus", () => prefetch(link), { passive: true });
      link.addEventListener("touchstart", () => prefetch(link), { passive: true, once: true });
    });
  };

  const applyEnterDirection = () => {
    try {
      const dir = sessionStorage.getItem(DIR_KEY);
      if (dir === "left") {
        document.body.classList.add("page-enter-from-left");
      }
      sessionStorage.removeItem(DIR_KEY);
    } catch {}
  };

  restoreScroll();
  applyEnterDirection();
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

    const to = new URL(href, window.location.href);
    const from = new URL(window.location.href);
    const dir = routeRank(to) >= routeRank(from) ? "right" : "left";

    event.preventDefault();
    saveScroll();

    try {
      sessionStorage.setItem(DIR_KEY, dir === "right" ? "left" : "right");
    } catch {}

    document.body.classList.add("page-leaving");
    if (dir === "right") {
      document.body.classList.add("page-leave-right");
    }

    window.setTimeout(() => {
      window.location.href = to.toString();
    }, 280);
  }, true);
})();

