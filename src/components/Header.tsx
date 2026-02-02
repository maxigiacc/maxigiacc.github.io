import { navItems } from "../data";

interface HeaderProps {
  currentPage: string;
  menuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onNavigate: () => void;
}

export function Header({
  currentPage,
  menuOpen,
  onToggleTheme,
  onToggleMenu,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav">
        <a className="logo" href="./index.html">
          Massimo Giaccone
        </a>
        <nav className="nav-links" id="site-nav">
          {navItems.map((item) => {
            const isActive = item.page === currentPage;
            return (
              <a
                key={item.page}
                className={`nav-link${isActive ? " active" : ""}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={onNavigate}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="nav-actions">
          <button className="ghost-button" type="button" onClick={onToggleTheme}>
            Tema
          </button>
          <button
            className="ghost-button menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={onToggleMenu}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
