import { site } from "../data";

interface FooterProps {
  subtitle: string;
}

export function Footer({ subtitle }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>{site.name}</strong>
          <p>
            {subtitle} • {year}
          </p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
