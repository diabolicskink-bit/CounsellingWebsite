import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { navItems, type NavItem } from "../data/site";
import Button from "./Button";

const headerNavItems = navItems.filter(
  (item) => item.href !== "/contact" && (!item.devOnly || import.meta.env.DEV)
);

function itemIsActive(item: NavItem, pathname: string): boolean {
  if (item.href === pathname) {
    return true;
  }

  return item.children?.some((child) => itemIsActive(child, pathname)) ?? false;
}

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
    location.pathname === "/enquire" ||
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
              {headerNavItems.map((item) => {
                const isCurrent = itemIsActive(item, location.pathname);

                return (
                <div className="nav-item" key={item.href ?? item.label}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive || isCurrent ? "nav-link--active" : ""} ${item.children ? "nav-link--parent" : ""}`
                    }
                    to={item.href ?? "#"}
                  >
                    {item.label}
                  </NavLink>

                  {item.children ? (
                    <div className="nav-submenu" aria-label={`${item.label} submenu`}>
                      {item.children.map((child) => (
                        <div className="nav-submenu__item" key={child.href ?? child.label}>
                          <NavLink
                            className={({ isActive }) =>
                              `nav-submenu__link ${isActive || itemIsActive(child, location.pathname) ? "nav-submenu__link--active" : ""} ${
                                child.children ? "nav-submenu__link--parent" : ""
                              }`
                            }
                            to={child.href ?? "#"}
                          >
                            {child.label}
                          </NavLink>

                          {child.children ? (
                            <div className="nav-submenu nav-submenu--nested" aria-label={`${child.label} submenu`}>
                              {child.children.map((grandchild) => (
                                <NavLink
                                  key={grandchild.href}
                                  className={({ isActive }) =>
                                    `nav-submenu__link ${isActive ? "nav-submenu__link--active" : ""}`
                                  }
                                  to={grandchild.href}
                                >
                                  {grandchild.label}
                                </NavLink>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                );
              })}
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
                      <div key={child.href ?? child.label}>
                        <NavLink
                          className={({ isActive }) =>
                            `mobile-nav__link mobile-nav__sub-link ${isActive || itemIsActive(child, location.pathname) ? "mobile-nav__link--active" : ""}`
                          }
                          to={child.href ?? "#"}
                          onClick={closeMenu}
                        >
                          {child.label}
                        </NavLink>

                        {child.children
                          ? child.children.map((grandchild) => (
                              <NavLink
                                key={grandchild.href}
                                className={({ isActive }) =>
                                  `mobile-nav__link mobile-nav__sub-link mobile-nav__sub-link--nested ${
                                    isActive ? "mobile-nav__link--active" : ""
                                  }`
                                }
                                to={grandchild.href}
                                onClick={closeMenu}
                              >
                                {grandchild.label}
                              </NavLink>
                            ))
                          : null}
                      </div>
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
          <div className="site-footer__brand">
            <Link className="brand" to="/">
              <span className="brand__name">Vive Counselling</span>
            </Link>
            <p>
              Private online counselling for adults in Western Australia and across Australia.
            </p>
          </div>
          <nav className="site-footer__links" aria-label="Footer navigation">
            <Link to="/about-joel">About Joel</Link>
            <Link to="/approach">Approach</Link>
            <Link to="/inclusion">Inclusive practice</Link>
            <Link to="/fees">Fees</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <p className="site-footer__copyright">&copy; 2026 Vive Counselling</p>
        </div>
      </footer>
    </div>
  );
}
