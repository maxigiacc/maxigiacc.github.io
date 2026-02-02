"use strict";
(() => {
  // src/main.ts
  var body = document.body;
  var themeOrder = ["sunrise", "ocean", "terra"];
  var themeLabels = {
    sunrise: "Sunrise",
    ocean: "Ocean",
    terra: "Terra"
  };
  var toast = document.querySelector("[data-toast]");
  var showToast = (message) => {
    if (!toast) {
      return;
    }
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  };
  var storedTheme = localStorage.getItem("theme");
  if (storedTheme && themeOrder.includes(storedTheme)) {
    body.dataset.theme = storedTheme;
  }
  var themeToggle = document.querySelector("[data-theme-toggle]");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = body.dataset.theme || "sunrise";
      const index = themeOrder.indexOf(current);
      const nextTheme = themeOrder[(index + 1) % themeOrder.length];
      body.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      showToast(`Tema: ${themeLabels[nextTheme]}`);
    });
  }
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var navLinks = document.querySelector("#site-nav");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        if (menuToggle) {
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
  var navAnchors = document.querySelectorAll("[data-nav]");
  var pathTail = window.location.pathname.split("/").pop() || "";
  var currentPage = pathTail.endsWith(".html") ? pathTail : "index.html";
  navAnchors.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
  var revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
  var filterButtons = document.querySelectorAll("[data-filter]");
  var skillCards = document.querySelectorAll("[data-skill]");
  if (filterButtons.length && skillCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";
        filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        skillCards.forEach((card) => {
          const tags = (card.dataset.skill || "").split(" ");
          const shouldShow = filter === "all" || tags.includes(filter);
          card.style.display = shouldShow ? "flex" : "none";
        });
      });
    });
  }
  var copyButtons = document.querySelectorAll("[data-copy]");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copyValue;
      if (!value) {
        return;
      }
      try {
        await navigator.clipboard.writeText(value);
        showToast("Email copiata negli appunti");
      } catch (error) {
        const fallback = document.createElement("textarea");
        fallback.value = value;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "absolute";
        fallback.style.left = "-9999px";
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand("copy");
        fallback.remove();
        showToast("Email copiata");
      }
    });
  });
  var yearTargets = document.querySelectorAll("[data-year]");
  var now = /* @__PURE__ */ new Date();
  yearTargets.forEach((el) => {
    el.textContent = String(now.getFullYear());
  });
})();
