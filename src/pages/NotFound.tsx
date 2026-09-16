import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import { notFoundMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-not-found.css";

const suggestedLinks = [
  {
    label: "Working with Joel",
    description: "How sessions work, Joel's background, and the shape of the work.",
    href: publicRoutePaths.workingWithJoel,
  },
  {
    label: "Inclusive practice",
    description: "Kink, ENM, polyamory, LGBTQIA+ lives, and other misunderstood parts of life.",
    href: publicRoutePaths.inclusion,
  },
  {
    label: "Fees and contact",
    description: "Session fee, availability, and the enquiry form.",
    href: publicRoutePaths.contact,
  },
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
            {suggestedLinks.map(({ label, description, href }) => (
              <li key={href}>
                <Link className="not-found-page__route" to={href}>
                  <span className="not-found-page__route-heading">
                    <strong>{label}</strong>
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                  <span className="not-found-page__route-copy">{description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </main>
  );
}
