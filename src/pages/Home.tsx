import { Link } from "react-router-dom";
import { cvHighlights, focusAreas, heroStats, profilePoints, site } from "../data";

export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content" data-reveal>
            <span className="eyebrow">Ingegneria informatica</span>
            <h1>Costruisco esperienze digitali tra mobile, AI e web.</h1>
            <p className="tagline">
              Laureato triennale, curioso e pratico: amo i progetti concreti, il lavoro
              in team e le soluzioni eleganti.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={site.cvUrl} target="_blank" rel="noopener">
                Scarica CV (EN)
              </a>
              <Link className="button ghost" to="/progetti">
                Vedi progetti
              </Link>
            </div>
            <div className="hero-stats">
              {heroStats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" data-reveal>
            <h2>Profilo</h2>
            <p>
              Computer Engineering graduate con forte passione per AI e sviluppo software.
              Collaborativo, preciso e abituato a rispettare le scadenze.
            </p>
            <p>Ex giocatore di pallacanestro, oggi arbitro tesserato FIP.</p>
            <ul className="list-check">
              {profilePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Focus e metodo</h2>
            <p>Un mix di ingegneria, creativita e rigore tecnico per progetti affidabili.</p>
          </div>
          <div className="grid three">
            {focusAreas.map((area) => (
              <div className="card" data-reveal key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Curriculum e highlights</h2>
            <p>CV in inglese aggiornato al 2025 con formazione, esperienze e progetti principali.</p>
          </div>
          <div className="grid two">
            <div className="card" data-reveal>
              <h3>Curriculum_en_2025.pdf</h3>
              <p>Versione aggiornata del curriculum in lingua inglese.</p>
              <ul className="list-check">
                <li>Formazione UNIBO: triennale 2021–2024, magistrale 2024–2026</li>
                <li>Esperienze: MMG Service, CNA Emilia Romagna</li>
                <li>Progetti AI, mobile e data visualization</li>
              </ul>
              <div className="hero-actions">
                <a className="button primary" href={site.cvUrl} target="_blank" rel="noopener">
                  Apri il CV
                </a>
              </div>
            </div>
            <div className="card card-contrast" data-reveal>
              <h3>Highlights dal CV</h3>
              <ul className="list-check">
                {cvHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="hero-actions">
                <Link className="button ghost" to="/esperienze">
                  Vedi esperienze
                </Link>
                <Link className="button ghost" to="/progetti">
                  Vedi progetti
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
