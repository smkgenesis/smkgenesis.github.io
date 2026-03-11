(() => {
  const CONTENT_SELECTOR = "#quarto-content";
  const NAV_LINK_SELECTOR = ".navbar .nav-link";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const prefetchCache = new Map();
  const scrollCache = new Map();
  let currentUrl = new URL(window.location.href);
  let isNavigating = false;

  const routeRank = (url) => {
    const p = url.pathname.toLowerCase();
    if (p.endsWith("/index.html") || p === "/") return 0;
    if (p.endsWith("/articles.html")) return 10;
    if (p.includes("/articles/")) return 11;
    if (p.endsWith("/projects.html")) return 20;
    if (p.includes("/projects/")) return 21;
    return 15;
  };

  const keyOf = (url) => `${url.pathname}${url.search}`;

  const isInternalNavigable = (href) => {
    if (!href) return false;
    if (href.startsWith("#")) return false;
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return false;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === currentUrl.pathname && url.search === currentUrl.search && url.hash) return false;
    return true;
  };

  const closeSearchOverlay = () => {
    document.documentElement.classList.remove("aa-Detached");
    document.body.classList.remove("aa-Detached");
  };

  const fetchHTML = async (url) => {
    const key = url.toString();
    if (prefetchCache.has(key)) return prefetchCache.get(key);

    const res = await fetch(key, {
      credentials: "same-origin",
      headers: { "X-Requested-With": "pjax" }
    });

    if (!res.ok) throw new Error(`Failed to fetch ${key}: ${res.status}`);
    const html = await res.text();
    prefetchCache.set(key, html);
    return html;
  };

  const parseDocument = (html) => new DOMParser().parseFromString(html, "text/html");

  const updateActiveNav = (targetUrl) => {
    const targetPath = targetUrl.pathname.replace(/\/$/, "");

    document.querySelectorAll(NAV_LINK_SELECTOR).forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const linkUrl = new URL(href, window.location.href);
      const linkPath = linkUrl.pathname.replace(/\/$/, "");
      const active = linkPath === targetPath;

      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const animateOut = async (direction) => {
    if (prefersReduced) return;
    const content = document.querySelector(CONTENT_SELECTOR);
    if (!content) return;

    const delta = direction === "forward" ? -34 : 34;
    content.getAnimations().forEach((a) => a.cancel());

    const anim = content.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${delta}px)` }
      ],
      {
        duration: 320,
        easing: "cubic-bezier(0.4, 0, 1, 1)",
        fill: "forwards"
      }
    );

    await anim.finished.catch(() => {});
  };

  const animateIn = async (direction) => {
    if (prefersReduced) return;
    const content = document.querySelector(CONTENT_SELECTOR);
    if (!content) return;

    const delta = direction === "forward" ? 34 : -34;
    content.getAnimations().forEach((a) => a.cancel());

    const anim = content.animate(
      [
        { transform: `translateY(${delta}px)` },
        { transform: "translateY(0)" }
      ],
      {
        duration: 820,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both"
      }
    );

    await anim.finished.catch(() => {});
    content.style.transform = "";
  };

  const restoreHashOrTop = (targetUrl) => {
    if (targetUrl.hash) {
      const id = decodeURIComponent(targetUrl.hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  };

  const swapContent = (nextDoc) => {
    const current = document.querySelector(CONTENT_SELECTOR);
    const incoming = nextDoc.querySelector(CONTENT_SELECTOR);
    if (!current || !incoming) throw new Error("#quarto-content not found during swap");

    current.innerHTML = incoming.innerHTML;
    document.title = nextDoc.title || document.title;
  };

  const navigate = async (targetUrl, mode) => {
    if (isNavigating) return;
    isNavigating = true;

    try {
      closeSearchOverlay();
      scrollCache.set(keyOf(currentUrl), window.scrollY);

      const direction = routeRank(targetUrl) >= routeRank(currentUrl) ? "forward" : "back";
      await animateOut(direction);

      const html = await fetchHTML(targetUrl);
      const nextDoc = parseDocument(html);
      swapContent(nextDoc);
      updateActiveNav(targetUrl);

      if (mode === "push") {
        history.pushState({ url: targetUrl.toString() }, "", targetUrl.toString());
        restoreHashOrTop(targetUrl);
      } else {
        const savedY = scrollCache.get(keyOf(targetUrl));
        if (typeof savedY === "number") window.scrollTo(0, savedY);
        else restoreHashOrTop(targetUrl);
      }

      currentUrl = new URL(targetUrl.toString());
      await animateIn(direction);
    } catch (err) {
      window.location.href = targetUrl.toString();
    } finally {
      isNavigating = false;
    }
  };

  const prefetchFromLink = (link) => {
    const href = link.getAttribute("href");
    if (!isInternalNavigable(href)) return;

    const url = new URL(href, window.location.href);
    fetchHTML(url).catch(() => {});
  };

  document.addEventListener(
    "click",
    (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest("a[href]");
      if (!link) return;
      if (link.target && link.target !== "") return;

      const href = link.getAttribute("href");
      if (!isInternalNavigable(href)) return;

      event.preventDefault();
      navigate(new URL(href, window.location.href), "push");
    },
    true
  );

  document.addEventListener("pointerenter", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    prefetchFromLink(link);
  }, true);

  document.addEventListener("focusin", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    prefetchFromLink(link);
  });

  window.addEventListener("popstate", () => {
    navigate(new URL(window.location.href), "pop");
  });
})();
