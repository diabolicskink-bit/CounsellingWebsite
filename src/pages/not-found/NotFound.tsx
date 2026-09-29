import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Container from "../../components/Container";
import { notFoundMetadata } from "../../data/routeMetadata";
import { publicRoutePaths } from "../../data/routes";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import "./not-found.css";

const suggestedLinks = [
  { label: "Working with Joel", href: publicRoutePaths.workingWithJoel },
  { label: "Articles", href: publicRoutePaths.articles },
  { label: "Fees and contact", href: publicRoutePaths.contact },
] as const;

function formatRequestedPath(pathname: string) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    // Broken links can contain malformed percent escapes; keep their path visible.
    return pathname;
  }
}

export default function NotFound() {
  useDocumentMetadata(
    notFoundMetadata.title,
    notFoundMetadata.description,
    notFoundMetadata.robots,
  );

  const { pathname } = useLocation();
  const requestedPath = formatRequestedPath(pathname);

  return (
    <main className="not-found-page site-hero site-hero-surface">
      <Container className="not-found-page__inner">
        <div className="not-found-page__content">
          <p className="site-hero__eyebrow">404 / Page not found</p>
          <h1 className="site-hero__statement">{notFoundMetadata.heading}</h1>
          <p className="not-found-page__lead">
            The link may be out of date, or the address may have been typed incorrectly.
            You can start again from the homepage or try one of the pages below.
          </p>
          <Link className="not-found-page__home" to={publicRoutePaths.home}>
            Go to homepage <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <nav className="not-found-page__routes" aria-label="Other pages to try">
          <ul>
            {suggestedLinks.map(({ label, href }) => (
              <li key={href}>
                <Link className="not-found-page__route" to={href}>
                  {label} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <dl className="not-found-page__address">
          <dt>Requested address</dt>
          <dd><code>{requestedPath}</code></dd>
        </dl>
      </Container>
    </main>
  );
}
