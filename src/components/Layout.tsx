import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { enquiryEmail } from "../data/enquiry";
import { publicRoutePaths, routeHref, usesSharedChromePath } from "../data/routes";
import { navItems, type NavItem } from "../data/site";
import Button from "./Button";
import Container from "./Container";

const copyrightPublicationYear = 2026;
const homeHref = routeHref(publicRoutePaths.home);
const workingWithJoelHref = routeHref(publicRoutePaths.workingWithJoel);
const inclusionHref = routeHref(publicRoutePaths.inclusion);
const contactHref = routeHref(publicRoutePaths.contact);

function itemIsActive(item: NavItem, pathname: string): boolean {
  if (item.href === pathname) {
    return true;
  }

  return item.children?.some((child) => itemIsActive(child, pathname)) ?? false;
}

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const usesSiteChrome = usesSharedChromePath(location.pathname);

  const closeMenu = () => setIsOpen(false);
  const blurDesktopNavLinkAfterPointerClick = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    // Keep keyboard focus support for submenu access, but let pointer clicks dismiss on mouse-out.
    event.currentTarget.blur();
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen]);

  return (
    <div className={`site-shell ${usesSiteChrome ? "site-shell--shared" : ""}`}>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" to={homeHref} onClick={closeMenu}>
            <span className="brand__name">Vive Counselling</span>
          </Link>

          <div className="site-header__cluster">
            <nav className="desktop-nav" aria-label="Main navigation">
              {navItems.map((item) => {
                const isCurrent = itemIsActive(item, location.pathname);

                return (
                  <div className="nav-item" key={item.href}>
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link ${isActive || isCurrent ? "nav-link--active" : ""} ${item.children ? "nav-link--parent" : ""}`
                      }
                      onPointerUp={blurDesktopNavLinkAfterPointerClick}
                      to={item.href}
                    >
                      {item.label}
                    </NavLink>

                    {item.children ? (
                      <div className="nav-submenu" role="group" aria-label={`${item.label} submenu`}>
                        {item.children.map((child) => (
                          <div className="nav-submenu__item" key={child.href}>
                            <NavLink
                              className={({ isActive }) =>
                                `nav-submenu__link ${isActive || itemIsActive(child, location.pathname) ? "nav-submenu__link--active" : ""} ${
                                  child.children ? "nav-submenu__link--parent" : ""
                                }`
                              }
                              onPointerUp={blurDesktopNavLinkAfterPointerClick}
                              to={child.href}
                            >
                              {child.label}
                            </NavLink>

                            {child.children ? (
                              <div
                                className="nav-submenu nav-submenu--nested"
                                role="group"
                                aria-label={`${child.label} submenu`}
                              >
                                {child.children.map((grandchild) => (
                                  <NavLink
                                    key={grandchild.href}
                                    className={({ isActive }) =>
                                      `nav-submenu__link ${isActive ? "nav-submenu__link--active" : ""}`
                                    }
                                    onPointerUp={blurDesktopNavLinkAfterPointerClick}
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
          </div>

          <div className="site-header__actions">
            <Button href={contactHref} className="header-button" onClick={closeMenu}>
              Get in touch
            </Button>
            <button
              ref={menuToggleRef}
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
            {navItems.map((item) => (
              <div key={item.href}>
                <NavLink
                  className={({ isActive }) => `mobile-nav__link ${isActive ? "mobile-nav__link--active" : ""}`}
                  to={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
                {item.children
                  ? item.children.map((child) => (
                      <div key={child.href}>
                        <NavLink
                          className={({ isActive }) =>
                            `mobile-nav__link mobile-nav__sub-link ${isActive || itemIsActive(child, location.pathname) ? "mobile-nav__link--active" : ""}`
                          }
                          to={child.href}
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

      <Outlet />

      <footer className="site-footer">
        <Container className="site-footer__inner">
          <div className="site-footer__primary">
            <div className="site-footer__brand-block">
              <Link className="brand" to={homeHref}>
                <span className="brand__name">Vive Counselling</span>
              </Link>
            </div>

            <nav className="site-footer__nav" aria-label="Footer navigation">
              <Link to={workingWithJoelHref}>Working with Joel</Link>
              <Link to={inclusionHref}>Inclusive practice</Link>
              <Link to={contactHref}>Fees</Link>
            </nav>
          </div>

          <div className="site-footer__secondary">
            <ul className="site-trust-list site-footer__details" aria-label="Footer details">
              <li>
                <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
              </li>
              <li>Mon to Fri, 9.30am to 5.00pm AWST</li>
            </ul>
            <p className="site-footer__copyright">&copy; {copyrightPublicationYear} Vive Counselling</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
