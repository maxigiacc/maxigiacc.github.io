import { site } from "../data";

interface ContactPageProps {
  onCopyEmail: () => void;
}

export function ContactPage({ onCopyEmail }: ContactPageProps) {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content" data-reveal>
            <span className="eyebrow">Parliamo di progetti</span>
            <h1>Contatti</h1>
            <p className="tagline">
              Disponibile per collaborazioni, progetti universitari e nuove opportunita in ambito
              digitale.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={`mailto:${site.email}`}>
                Scrivimi
              </a>
              <a className="button ghost" href={site.cvUrl} target="_blank" rel="noopener">
                CV in PDF
              </a>
            </div>
          </div>
          <div className="card" data-reveal>
            <h2>Disponibilita</h2>
            <p>Preferenza per progetti digitali, mobile e AI, con team dinamici e obiettivi chiari.</p>
            <div className="chip-group">
              <span className="chip">Collaborazioni</span>
              <span className="chip">Stage</span>
              <span className="chip">Progetti accademici</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal>
            <h2>Canali diretti</h2>
            <p>Se vuoi parlare di un progetto, ecco i riferimenti principali.</p>
          </div>
          <div className="contact-grid">
            <div className="card" data-reveal>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
              <div className="contact-action">
                <button className="button primary" type="button" onClick={onCopyEmail}>
                  Copia email
                </button>
                <span className="chip">Risposta veloce</span>
              </div>
            </div>
            <div className="card" data-reveal>
              <h3>LinkedIn</h3>
              <p>
                <a href={site.linkedin} target="_blank" rel="noopener">
                  Profilo LinkedIn
                </a>
              </p>
              <div className="contact-action">
                <a className="button ghost" href={site.linkedin} target="_blank" rel="noopener">
                  Vai al profilo
                </a>
                <span className="chip">Networking</span>
              </div>
            </div>
            <div className="card" data-reveal>
              <h3>Curriculum</h3>
              <p>PDF aggiornato con formazione, esperienze e progetti.</p>
              <div className="contact-action">
                <a className="button ghost" href={site.cvUrl} target="_blank" rel="noopener">
                  Apri CV
                </a>
                <span className="chip">Versione 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
