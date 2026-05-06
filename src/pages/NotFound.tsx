import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-not-found.css";

function useNoIndex() {
  useEffect(() => {
    const existingMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robotsMeta = existingMeta ?? document.createElement("meta");
    const previousContent = existingMeta?.content;

    if (!existingMeta) {
      robotsMeta.name = "robots";
      document.head.append(robotsMeta);
    }

    robotsMeta.content = "noindex, nofollow";

    return () => {
      if (existingMeta) {
        existingMeta.content = previousContent ?? "";
      } else {
        robotsMeta.remove();
      }
    };
  }, []);
}

const notFoundRoutes = [
  {
    title: "Working with Joel",
    copy: "How sessions work, Joel's background, and the shape of the work.",
    href: routeHref(publicRoutePaths.workingWithJoel),
  },
  {
    title: "Inclusive practice",
    copy: "Kink, ENM, polyamory, LGBTQIA+ lives, and other misunderstood parts of life.",
    href: routeHref(publicRoutePaths.inclusion),
  },
  {
    title: "Fees and contact",
    copy: "Session fee, availability, and the enquiry form.",
    href: routeHref(publicRoutePaths.contact),
  },
] as const;

function getReadablePath(pathname: string) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

export default function NotFound() {
  useDocumentMetadata("Page not found | Vive Counselling");
  useNoIndex();
  const location = useLocation();
  const requestedPath = getReadablePath(location.pathname);

  return (
    <main className="site-page not-found-page">
      <Container className="not-found-page__shell">
        <div className="not-found-page__mark" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>

        <div className="not-found-page__content">
          <p className="not-found-page__label">Page not found</p>
          <h1>This is not the room.</h1>
          <p className="not-found-page__lead">
            The address you used does not lead to a page on this site. It may
            be an old link, a mistyped URL, or something that has moved.
          </p>

          <div className="not-found-page__address" aria-label="Requested address">
            <span>Requested address</span>
            <code>{requestedPath}</code>
          </div>

          <div className="not-found-page__actions">
            <Button href={routeHref(publicRoutePaths.home)}>Go to homepage</Button>
            <Button href={routeHref(publicRoutePaths.contact)} variant="secondary">
              Make an enquiry <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>

        <nav className="not-found-page__routes" aria-labelledby="not-found-routes-title">
          <h2 id="not-found-routes-title">Useful ways back in</h2>
          <ul>
            {notFoundRoutes.map((route) => (
              <li key={route.href}>
                <Link className="not-found-page__route" to={route.href}>
                  <span className="not-found-page__route-heading">
                    <strong>{route.title}</strong>
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                  <span className="not-found-page__route-copy">{route.copy}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </main>
  );
}
