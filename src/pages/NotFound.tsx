import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import { notFoundMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-not-found.css";

function useNoIndex(directive: string) {
  useEffect(() => {
    const robotsMeta =
      document.querySelector<HTMLMetaElement>('meta[name="robots"]')
      ?? document.createElement("meta");

    if (!robotsMeta.isConnected) {
      robotsMeta.name = "robots";
      document.head.append(robotsMeta);
    }

    robotsMeta.content = directive;

    return () => {
      if (robotsMeta.content === directive) {
        robotsMeta.remove();
      }
    };
  }, [directive]);
}

const notFoundRoutes = [
  {
    title: "Working with Joel",
    copy: "How sessions work, Joel's background, and the shape of the work.",
    href: publicRoutePaths.workingWithJoel,
  },
  {
    title: "Inclusive practice",
    copy: "Kink, ENM, polyamory, LGBTQIA+ lives, and other misunderstood parts of life.",
    href: publicRoutePaths.inclusion,
  },
  {
    title: "Fees and contact",
    copy: "Session fee, availability, and the enquiry form.",
    href: publicRoutePaths.contact,
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
  useDocumentMetadata(notFoundMetadata.title, notFoundMetadata.description);
  useNoIndex(notFoundMetadata.robots);
  const location = useLocation();
  const requestedPath = getReadablePath(location.pathname);

  return (
    <main className="site-page not-found-page">
      <Container>
        <div className="not-found-page__mark" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>

        <div className="not-found-page__content">
          <p className="not-found-page__label">Page not found</p>
          <h1>{notFoundMetadata.heading}</h1>
          <p className="not-found-page__lead">
            The address you used does not lead to a page on this site. It may
            be an old link, a mistyped URL, or something that has moved.
          </p>

          <dl className="not-found-page__address">
            <dt>Requested address</dt>
            <dd>
              <code>{requestedPath}</code>
            </dd>
          </dl>

          <div className="not-found-page__actions">
            <Button href={publicRoutePaths.home}>Go to homepage</Button>
            <Button href={publicRoutePaths.contact} variant="secondary">
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
