import { NavLink } from "react-router-dom";
import { navItems } from "../data";

interface HeaderProps {
  menuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onNavigate: () => void;
}

export function Header({ menuOpen, onToggleTheme, onToggleMenu, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav">
        <NavLink className="logo" to="/" onClick={onNavigate}>
          Massimo Giaccone
        </NavLink>
        <nav className="nav-links" id="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.page}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              to={item.to}
              onClick={onNavigate}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
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
