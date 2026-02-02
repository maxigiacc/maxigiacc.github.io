import { Link } from "react-router-dom";
import { education, site } from "../data";

export function EducationPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content" data-reveal>
            <span className="eyebrow">Percorso accademico</span>
            <h1>Formazione</h1>
            <p className="tagline">Percorso universitario in Ingegneria Informatica con base scientifica solida.</p>
            <div className="hero-actions">
              <a className="button primary" href={site.cvUrl} target="_blank" rel="noopener">
                CV completo
              </a>
              <Link className="button ghost" to="/progetti">
                Tesi e progetti
              </Link>
            </div>
          </div>
          <div className="card" data-reveal>
            <h2>Focus</h2>
            <p>Formazione focalizzata su ingegneria del software, sistemi e sviluppo applicazioni.</p>
            <div className="chip-group">
              <span className="chip">Ingegneria</span>
              <span className="chip">Sistemi</span>
              <span className="chip">Software</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Timeline</h2>
            <p>Gli step principali del mio percorso di studi.</p>
          </div>
          <div className="timeline">
            {education.map((item) => (
              <article className="card timeline-item" data-reveal key={item.title}>
                <span className="timeline-meta">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
