import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { enquiryEmail } from "../data/enquiry";
import {
  publicRoutePaths,
  routeHref,
  usesSharedChromePath,
} from "../data/routes";
import { navItems, socialProfileLinks } from "../data/site";
import Button from "./Button";
import Container from "./Container";
import { DesktopNavigation, MobileNavigation } from "./SiteNavigation";

const copyrightPublicationYear = 2026;
const desktopNavigationMediaQuery = "(min-width: 1081px)";
const homeHref = routeHref(publicRoutePaths.home);
const workingWithJoelHref = routeHref(publicRoutePaths.workingWithJoel);
const inclusionHref = routeHref(publicRoutePaths.inclusion);
const blogHref = routeHref(publicRoutePaths.blog);
const contactHref = routeHref(publicRoutePaths.contact);

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
    const desktopNavigation = window.matchMedia(desktopNavigationMediaQuery);
    const closeMenuAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    desktopNavigation.addEventListener("change", closeMenuAtDesktopBreakpoint);

    return () => {
      desktopNavigation.removeEventListener("change", closeMenuAtDesktopBreakpoint);
    };
  }, []);

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
        <Container className="site-header__inner">
          <Link className="brand brand--header" to={homeHref} onClick={closeMenu}>
            <span className="brand__name brand__name--header">Vive Counselling</span>
          </Link>

          <div className="site-header__cluster">
            <DesktopNavigation
              items={navItems}
              onLinkPointerUp={blurDesktopNavLinkAfterPointerClick}
              pathname={location.pathname}
            />
          </div>

          <div className="site-header__actions">
            <Button href={contactHref} className="header-button" onClick={closeMenu}>
              Get in touch
              <ArrowRight aria-hidden="true" className="header-button__icon" size={16} />
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
              <span className="menu-toggle__label">{isOpen ? "Close" : "Menu"}</span>
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </Container>

        {isOpen ? (
          <MobileNavigation
            items={navItems}
            onNavigate={closeMenu}
            pathname={location.pathname}
          />
        ) : null}
      </header>

      <Outlet />

      <footer className="site-footer">
        <Container className="site-footer__inner">
          <div className="site-footer__main">
            <Link className="site-footer__brand" to={homeHref}>
              Vive Counselling
            </Link>
            <nav className="site-footer__nav" aria-label="Footer navigation">
              <ul>
                <li>
                  <Link to={workingWithJoelHref}>Working with Joel</Link>
                </li>
                <li>
                  <Link to={inclusionHref}>Inclusive practice</Link>
                </li>
                <li>
                  <Link to={blogHref}>Articles</Link>
                </li>
                <li>
                  <Link to={contactHref}>Fees</Link>
                </li>
              </ul>
            </nav>

            <a className="site-footer__email" href={`mailto:${enquiryEmail}`}>
              {enquiryEmail}
            </a>
          </div>

          <div className="site-footer__utility">
            <p>Mon to Fri, 9.30am to 5.00pm AWST</p>
            <nav className="site-footer__social" aria-label="Social profiles">
              <ul>
                {socialProfileLinks.map((profile) => (
                  <li key={profile.href}>
                    <a href={profile.href} rel="me">
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="site-footer__copyright">
              &copy; {copyrightPublicationYear} Vive Counselling
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
