import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { enquiryEmail } from "../data/enquiry";
import { getTrackedPagePath, publicRoutePaths, usesSharedChromePath } from "../data/routes";
import { footerNavItems, navItems, socialProfileLinks } from "../data/site";
import Button from "./Button";
import Container from "./Container";
import { DesktopNavigation, MobileNavigation, NavItemLink } from "./SiteNavigation";

// A fixed publication year keeps prerendered and hydrated footer markup deterministic.
const copyrightPublicationYear = 2026;
// Mirrors the CSS breakpoint where desktop navigation replaces the mobile menu.
const desktopNavigationMediaQuery = "(min-width: 1081px)";
const mobileNavigationId = "mobile-navigation";

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const activePath = getTrackedPagePath(location.pathname, location.state);
  const MenuToggleIcon = isMenuOpen ? X : Menu;

  const closeMenu = () => setIsMenuOpen(false);

  // Covers history navigation; menu links close it directly because their path may not change.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const desktopNavigationQuery = window.matchMedia(desktopNavigationMediaQuery);
    const closeAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    // The menu covers the page, so focus leaving the header would otherwise land on hidden content.
    const closeWhenFocusLeavesHeader = (event: FocusEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    // Preserve any page-owned inline overflow policy while the full-screen menu locks scrolling.
    const previousBodyOverflow = document.body.style.overflow;

    desktopNavigationQuery.addEventListener("change", closeAtDesktopBreakpoint);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("focusin", closeWhenFocusLeavesHeader);
    document.body.style.overflow = "hidden";

    return () => {
      desktopNavigationQuery.removeEventListener("change", closeAtDesktopBreakpoint);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("focusin", closeWhenFocusLeavesHeader);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <Container className="site-header__inner">
        <Link className="brand" to={publicRoutePaths.home} onClick={closeMenu}>
          <span className="brand__name">Vive Counselling</span>
        </Link>

        <div className="site-header__cluster">
          <DesktopNavigation activePath={activePath} items={navItems} />
        </div>

        <div className="site-header__actions">
          <Button href={publicRoutePaths.contact} className="header-button" onClick={closeMenu}>
            Get in touch
            <ArrowRight aria-hidden="true" className="header-button__icon" size={16} />
          </Button>
          <button
            ref={menuToggleRef}
            aria-controls={mobileNavigationId}
            aria-expanded={isMenuOpen}
            // Contains the visible label for voice control; narrow screens hide that label.
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            type="button"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span className="menu-toggle__label">{isMenuOpen ? "Close" : "Menu"}</span>
            <MenuToggleIcon aria-hidden="true" size={21} />
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <MobileNavigation
          activePath={activePath}
          id={mobileNavigationId}
          items={navItems}
          onNavigate={closeMenu}
        />
      ) : null}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__main">
          <Link className="site-footer__brand" to={publicRoutePaths.home}>
            Vive Counselling
          </Link>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <ul>
              {footerNavItems.map((item) => (
                <li key={item.label}>
                  <NavItemLink item={item} />
                </li>
              ))}
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
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const shellClassName = usesSharedChromePath(pathname) ? "site-shell site-shell--shared" : "site-shell";

  return (
    <div className={shellClassName}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
