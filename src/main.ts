const body = document.body;

const themeOrder = ["sunrise", "ocean", "terra"] as const;
type ThemeName = (typeof themeOrder)[number];

const themeLabels: Record<ThemeName, string> = {
  sunrise: "Sunrise",
  ocean: "Ocean",
  terra: "Terra",
};

const toast = document.querySelector<HTMLElement>("[data-toast]");

const showToast = (message: string) => {
  if (!toast) {
    return;
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
};

const storedTheme = localStorage.getItem("theme") as ThemeName | null;
if (storedTheme && themeOrder.includes(storedTheme)) {
  body.dataset.theme = storedTheme;
}

const themeToggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = (body.dataset.theme as ThemeName) || "sunrise";
    const index = themeOrder.indexOf(current);
    const nextTheme = themeOrder[(index + 1) % themeOrder.length];
    body.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    showToast(`Tema: ${themeLabels[nextTheme]}`);
  });
}

const menuToggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const navLinks = document.querySelector<HTMLElement>("#site-nav");
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

const navAnchors = document.querySelectorAll<HTMLAnchorElement>("[data-nav]");
const pathTail = window.location.pathname.split("/").pop() || "";
const currentPage = pathTail.endsWith(".html") ? pathTail : "index.html";
navAnchors.forEach((link) => {
  const href = link.getAttribute("href") || "";
  const linkPage = href.split("/").pop();
  if (linkPage === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
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

const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
const skillCards = document.querySelectorAll<HTMLElement>("[data-skill]");
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

const copyButtons = document.querySelectorAll<HTMLButtonElement>("[data-copy]");
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

const yearTargets = document.querySelectorAll<HTMLElement>("[data-year]");
const now = new Date();
yearTargets.forEach((el) => {
  el.textContent = String(now.getFullYear());
});
