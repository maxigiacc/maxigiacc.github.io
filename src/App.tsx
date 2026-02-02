import { useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Toast } from "./components/Toast";
import { site } from "./data";
import { ContactPage } from "./pages/Contact";
import { EducationPage } from "./pages/Education";
import { ExperiencePage } from "./pages/Experience";
import { HomePage } from "./pages/Home";
import { ProjectsPage } from "./pages/Projects";
import { SkillsPage } from "./pages/Skills";

const themeOrder = ["sunrise", "ocean", "terra"] as const;
type ThemeName = (typeof themeOrder)[number];

const themeLabels: Record<ThemeName, string> = {
  sunrise: "Sunrise",
  ocean: "Ocean",
  terra: "Terra",
};

const footerSubtitles: Record<string, string> = {
  home: "Portfolio personale",
  skills: "Competenze tecniche",
  experience: "Esperienze professionali",
  education: "Formazione",
  projects: "Progetti",
  contact: "Contatti",
};

interface AppProps {
  page: string;
}

export function App({ page }: AppProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<number | null>(null);

  const initialTheme = useMemo<ThemeName>(() => {
    const stored = localStorage.getItem("theme") as ThemeName | null;
    if (stored && themeOrder.includes(stored)) {
      return stored;
    }
    const bodyTheme = document.body.dataset.theme as ThemeName | undefined;
    return bodyTheme && themeOrder.includes(bodyTheme) ? bodyTheme : "sunrise";
  }, []);

  const [theme, setTheme] = useState<ThemeName>(initialTheme);

  const showToast = (message: string) => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    setToastMessage(message);
    setToastVisible(true);
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 2200);
  };

  const handleToggleTheme = () => {
    const index = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(index + 1) % themeOrder.length];
    setTheme(nextTheme);
    showToast(`Tema: ${themeLabels[nextTheme]}`);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      showToast("Email copiata negli appunti");
    } catch (error) {
      const fallback = document.createElement("textarea");
      fallback.value = site.email;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "absolute";
      fallback.style.left = "-9999px";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
      showToast("Email copiata");
    }
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

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

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const pageNode = (() => {
    switch (page) {
      case "skills":
        return <SkillsPage />;
      case "experience":
        return <ExperiencePage />;
      case "education":
        return <EducationPage />;
      case "projects":
        return <ProjectsPage />;
      case "contact":
        return <ContactPage onCopyEmail={handleCopyEmail} />;
      case "home":
      default:
        return <HomePage />;
    }
  })();

  const subtitle = footerSubtitles[page] ?? "Portfolio";

  return (
    <>
      <Header
        currentPage={page}
        menuOpen={menuOpen}
        onToggleTheme={handleToggleTheme}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      {pageNode}
      <Footer subtitle={subtitle} />
      <Toast message={toastMessage} visible={toastVisible} />
    </>
  );
}
