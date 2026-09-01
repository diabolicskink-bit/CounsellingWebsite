import { ArrowRight, Menu, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { enquiryEmail } from "../data/enquiry";
import {
  feesRoutePath,
  getTrackedPagePath,
  publicRoutePaths,
  usesSharedChromePath,
} from "../data/routes";
import { navItems, socialProfileLinks } from "../data/site";
import Button from "./Button";
import Container from "./Container";
import { DesktopNavigation, MobileNavigation } from "./SiteNavigation";

// A fixed publication year keeps prerendered and hydrated footer markup deterministic.
const copyrightPublicationYear = 2026;
// Mirrors the CSS breakpoint where desktop navigation replaces the mobile menu.
const desktopNavigationMediaQuery = "(min-width: 1081px)";
const homeHref = publicRoutePaths.home;
const workingWithJoelHref = publicRoutePaths.workingWithJoel;
const inclusionHref = publicRoutePaths.inclusion;
const blogHref = publicRoutePaths.blog;
const contactHref = publicRoutePaths.contact;
const crisisSupportHref = publicRoutePaths.crisisSupport;
const privacyPolicyHref = publicRoutePaths.privacyPolicy;

export default function Layout() {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const mobileNavigationToggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const activeNavigationPath = getTrackedPagePath(location.pathname, location.state);
  const usesSharedChrome = usesSharedChromePath(location.pathname);
  const shellClassName = usesSharedChrome ? "site-shell site-shell--shared" : "site-shell";

  const closeMobileNavigation = () => setIsMobileNavigationOpen(false);
  const blurDesktopNavLinkAfterPointerClick = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    // Blurring pointer-activated links prevents :focus-within from holding a submenu open.
    event.currentTarget.blur();
  };

  useEffect(() => {
    setIsMobileNavigationOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const desktopNavigationQuery = window.matchMedia(desktopNavigationMediaQuery);
    const closeMobileNavigationAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileNavigationOpen(false);
      }
    };

    desktopNavigationQuery.addEventListener("change", closeMobileNavigationAtDesktopBreakpoint);

    return () => {
      desktopNavigationQuery.removeEventListener("change", closeMobileNavigationAtDesktopBreakpoint);
    };
  }, []);

  useEffect(() => {
    if (!isMobileNavigationOpen) {
      return;
    }

    // Preserve any page-owned inline overflow policy while the full-screen menu locks scrolling.
    const previousBodyOverflow = document.body.style.overflow;
    const handleMobileNavigationKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavigationOpen(false);
        mobileNavigationToggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleMobileNavigationKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleMobileNavigationKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isMobileNavigationOpen]);

  return (
    <div className={shellClassName}>
      <header className="site-header">
        <Container className="site-header__inner">
          <Link className="brand brand--header" to={homeHref} onClick={closeMobileNavigation}>
            <span className="brand__name brand__name--header">Vive Counselling</span>
          </Link>

          <div className="site-header__cluster">
            <DesktopNavigation
              activePath={activeNavigationPath}
              items={navItems}
              onLinkPointerUp={blurDesktopNavLinkAfterPointerClick}
            />
          </div>

          <div className="site-header__actions">
            <Button href={contactHref} className="header-button" onClick={closeMobileNavigation}>
              Get in touch
              <ArrowRight aria-hidden="true" className="header-button__icon" size={16} />
            </Button>
            <button
              ref={mobileNavigationToggleRef}
              aria-controls="mobile-navigation"
              aria-expanded={isMobileNavigationOpen}
              aria-label={isMobileNavigationOpen ? "Close navigation" : "Open navigation"}
              className="menu-toggle"
              type="button"
              onClick={() => setIsMobileNavigationOpen((isOpen) => !isOpen)}
            >
              <span className="menu-toggle__label">
                {isMobileNavigationOpen ? "Close" : "Menu"}
              </span>
              {isMobileNavigationOpen ? (
                <X aria-hidden="true" size={21} />
              ) : (
                <Menu aria-hidden="true" size={21} />
              )}
            </button>
          </div>
        </Container>

        {isMobileNavigationOpen ? (
          <MobileNavigation
            activePath={activeNavigationPath}
            items={navItems}
            onNavigate={closeMobileNavigation}
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
                  {/* Contact stays visible while analytics records the visitor's Fees intent. */}
                  <Link state={{ trackedPagePath: feesRoutePath }} to={contactHref}>
                    Fees
                  </Link>
                </li>
                <li>
                  <Link to={crisisSupportHref}>Crisis support</Link>
                </li>
                <li>
                  <Link to={privacyPolicyHref}>Privacy</Link>
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
