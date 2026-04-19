import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { navItems } from "../data/site";
import Button from "./Button";

const headerNavItems = navItems.filter((item) => item.href !== "/contact");

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAiSandbox = location.pathname === "/codex-tb" || location.pathname === "/opus-tb";
  const isDesignLanguage =
    location.pathname === "/design-language" ||
    location.pathname.startsWith("/design-language/");
  const usesSiteChrome =
    isDesignLanguage ||
    isAiSandbox ||
    location.pathname === "/fees" ||
    location.pathname === "/about-joel" ||
    location.pathname === "/approach" ||
    location.pathname === "/inclusion" ||
    location.pathname.startsWith("/inclusion/") ||
    location.pathname === "/contact";

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
    <div className={`site-shell ${usesSiteChrome ? "site-shell--shared" : ""}`}>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" to="/" onClick={closeMenu}>
            <span className="brand__name">Vive Counselling</span>
          </Link>

          <div className="site-header__cluster">
            <nav className="desktop-nav" aria-label="Main navigation">
              {headerNavItems.map((item) => (
                <div className="nav-item" key={item.href ?? item.label}>
                  <NavLink
                    className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""} ${item.children ? "nav-link--parent" : ""}`}
                    to={item.href ?? "#"}
                  >
                    {item.label}
                  </NavLink>

                  {item.children ? (
                    <div className="nav-submenu" aria-label={`${item.label} submenu`}>
                      {item.children.map((child) => (
                        <NavLink
                          key={child.href}
                          className={({ isActive }) => `nav-submenu__link ${isActive ? "nav-submenu__link--active" : ""}`}
                          to={child.href}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
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
              <div key={item.href ?? item.label}>
                <NavLink
                  className={({ isActive }) => `mobile-nav__link ${isActive ? "mobile-nav__link--active" : ""}`}
                  to={item.href ?? "#"}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
                {item.children
                  ? item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        className={({ isActive }) =>
                          `mobile-nav__link mobile-nav__sub-link ${isActive ? "mobile-nav__link--active" : ""}`
                        }
                        to={child.href}
                        onClick={closeMenu}
                      >
                        {child.label}
                      </NavLink>
                    ))
                  : null}
              </div>
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
            <Link to="/inclusion">Inclusive practice</Link>
            <Link to="/inclusion/kink-bdsm">Kink & BDSM-aware counselling</Link>
            <Link to="/inclusion/enm-polyamory">Counselling for ENM & polyamory</Link>
            <Link to="/inclusion/lgbtqia">LGBTQIA+ affirming counselling</Link>
            <Link to="/fees">Fees</Link>
            <Link to="/contact">Contact</Link>
            <span>&copy; 2026 Vive Counselling</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
