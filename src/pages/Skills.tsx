import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { languages, skillFilters, skills, site } from "../data";

export function SkillsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleSkills = useMemo(() => {
    if (activeFilter === "all") {
      return skills;
    }
    return skills.filter((skill) => skill.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content" data-reveal>
            <span className="eyebrow">Stack tecnico</span>
            <h1>Competenze</h1>
            <p className="tagline">Mix bilanciato tra sviluppo mobile, web, AI e linguaggi core.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/progetti">
                Progetti in evidenza
              </Link>
              <a className="button ghost" href={site.cvUrl} target="_blank" rel="noopener">
                CV completo
              </a>
            </div>
          </div>
          <div className="card" data-reveal>
            <h2>Livello di padronanza</h2>
            <p>Competenze avanzate su mobile e core, livello intermedio su web e data processing.</p>
            <div className="chip-group">
              <span className="chip">Avanzato</span>
              <span className="chip">Intermedio</span>
              <span className="chip">In crescita</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Filtra per area</h2>
            <p>Clicca un filtro per esplorare le competenze piu rilevanti.</p>
          </div>
          <div className="filter-bar" data-reveal>
            {skillFilters.map((filter) => (
              <button
                key={filter.value}
                className={`chip${activeFilter === filter.value ? " is-active" : ""}`}
                type="button"
                aria-pressed={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="grid three">
            {visibleSkills.map((skill) => (
              <div className="skill-card" data-reveal key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <span className="chip">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Lingue</h2>
            <p>Competenze linguistiche indicate nel CV.</p>
          </div>
          <div className="grid two">
            {languages.map((lang) => (
              <div className="card" data-reveal key={lang.title}>
                <h3>{lang.title}</h3>
                <p>{lang.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
