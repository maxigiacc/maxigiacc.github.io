import { Link } from "react-router-dom";
import { experiences, site } from "../data";

export function ExperiencePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content" data-reveal>
            <span className="eyebrow">Percorso professionale</span>
            <h1>Esperienze</h1>
            <p className="tagline">
              Dalla gestione web alla formazione in AI, con un approccio pratico e orientato al
              risultato.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/contatti">
                Collabora con me
              </Link>
              <a className="button ghost" href={site.cvUrl} target="_blank" rel="noopener">
                CV completo
              </a>
            </div>
          </div>
          <div className="card" data-reveal>
            <h2>Ruoli chiave</h2>
            <p>Esperienze che uniscono sviluppo web, formazione e supporto tecnico.</p>
            <div className="chip-group">
              <span className="chip">Web</span>
              <span className="chip">Didattica</span>
              <span className="chip">Project support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Cronologia</h2>
            <p>Le esperienze principali raccolte in un percorso ordinato.</p>
          </div>
          <div className="timeline">
            {experiences.map((exp) => (
              <article className="card timeline-item" data-reveal key={exp.title}>
                <span className="timeline-meta">{exp.date}</span>
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
