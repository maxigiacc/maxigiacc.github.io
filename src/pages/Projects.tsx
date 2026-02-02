import { cvProjects, detailProjects, pdfProjects, site } from "../data";

export function ProjectsPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content" data-reveal>
            <span className="eyebrow">Portfolio tecnico</span>
            <h1>Progetti e documenti</h1>
            <p className="tagline">Tesi, documentazione e progetti sviluppati durante il percorso universitario.</p>
            <div className="hero-actions">
              <a className="button primary" href={site.cvUrl} target="_blank" rel="noopener">
                CV in PDF
              </a>
              <a className="button ghost" href="./contatti.html">
                Richiedi dettagli
              </a>
            </div>
          </div>
          <div className="card" data-reveal>
            <h2>Download rapido</h2>
            <p>PDF tecnici disponibili nella cartella risorse del sito.</p>
            <div className="chip-group">
              <span className="chip">Tesi</span>
              <span className="chip">Progetti</span>
              <span className="chip">Documenti</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Progetti dal CV</h2>
            <p>Selezione di progetti e laboratori indicati nel curriculum.</p>
          </div>
          <div className="grid three">
            {cvProjects.map((project) => (
              <article className="card" data-reveal key={project.title}>
                <span className="project-tag">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Dettagli interattivi</h2>
            <p>Apri le schede per leggere obiettivi, stack e focus principali.</p>
          </div>
          {detailProjects.map((project) => (
            <details className="accordion" data-reveal key={project.title}>
              <summary>{project.title}</summary>
              <div className="accordion-body">
                <p>{project.summary}</p>
                <ul className="list-check">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {project.link ? (
                  <div className="hero-actions">
                    <a className="button ghost" href={project.link} target="_blank" rel="noopener">
                      Apri PDF
                    </a>
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>PDF disponibili</h2>
            <p>Materiali accademici e progettuali in formato PDF.</p>
          </div>
          <div className="grid three">
            {pdfProjects.map((project) => (
              <article className="card" data-reveal key={project.title}>
                <span className="project-tag">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="hero-actions">
                  <a className="button ghost" href={project.url} target="_blank" rel="noopener">
                    {project.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
