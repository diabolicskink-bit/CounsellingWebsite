import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { navItems } from "../data/site";
import Button from "./Button";

const headerNavItems = navItems.filter((item) => item.href !== "/contact");

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" to="/" onClick={closeMenu}>
            <span className="brand__name">Vive Counselling</span>
          </Link>

          <div className="site-header__cluster">
            <nav className="desktop-nav" aria-label="Main navigation">
              {headerNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Button href="/contact" className="header-button">
              Get in touch
            </Button>
          </div>

          <div className="site-header__actions">
            <button
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              className="menu-toggle"
              type="button"
              onClick={() => setIsOpen((value) => !value)}
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            <Button href="/contact" className="mobile-nav__button" onClick={closeMenu}>
              Get in touch
            </Button>
            {headerNavItems.map((item) => (
              <NavLink
                key={item.href}
                className={({ isActive }) => `mobile-nav__link ${isActive ? "mobile-nav__link--active" : ""}`}
                to={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div>
            <Link className="brand" to="/">
              <span className="brand__name">Vive Counselling</span>
            </Link>
            <p>
              Private online counselling for adults in Western Australia and across Australia.
            </p>
          </div>
          <div className="site-footer__links">
            <Link to="/fees">Fees</Link>
            <Link to="/contact">Contact</Link>
            <span>&copy; 2026 Vive Counselling</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
