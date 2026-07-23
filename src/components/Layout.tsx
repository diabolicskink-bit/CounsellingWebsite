import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { enquiryEmail } from "../data/enquiry";
import { publicRoutePaths, routeHref, usesSharedChromePath } from "../data/routes";
import Button from "./Button";
import Container from "./Container";
import { DesktopNavigation, MobileNavigation } from "./SiteNavigation";

const copyrightPublicationYear = 2026;
const homeHref = routeHref(publicRoutePaths.home);
const workingWithJoelHref = routeHref(publicRoutePaths.workingWithJoel);
const inclusionHref = routeHref(publicRoutePaths.inclusion);
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
            <DesktopNavigation
              onLinkPointerUp={blurDesktopNavLinkAfterPointerClick}
              pathname={location.pathname}
            />
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
          <MobileNavigation onNavigate={closeMenu} pathname={location.pathname} />
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
