import { ArrowRight, BookOpen, Boxes, CheckCircle2, Compass, Layers3, Palette, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Container from "../../components/Container";
import DesignSystemSidebar from "../../components/DesignSystemSidebar";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import "../../styles-dev.css";

const systemRoutes = [
  {
    icon: Palette,
    eyebrow: "01 / foundations",
    title: "Foundations",
    description: "A snapshot of the colour tokens, type roles, spacing, surfaces, and HTML defaults recorded by the earlier system.",
    href: "/design-language/foundations",
    detail: "Tokens, type, rhythm, states",
  },
  {
    icon: Boxes,
    eyebrow: "02 / components",
    title: "Components",
    description: "Earlier examples of buttons, cards, trust strips, forms, fee cards, FAQ, footer, and content treatments.",
    href: "/design-language/components",
    detail: "Actions, panels, forms, lists",
  },
  {
    icon: Layers3,
    eyebrow: "03 / heroes",
    title: "Heroes",
    description: "The former page-opening catalogue: display type, copy rails, support rows, hero media, and background fields.",
    href: "/design-language/heroes",
    detail: "Page openings and first impressions",
  },
  {
    icon: Compass,
    eyebrow: "04 / patterns",
    title: "Patterns",
    description: "Archived section compositions and information layouts retained for later reconciliation.",
    href: "/design-language/patterns",
    detail: "Sections, ledgers, prompts",
  },
];

const historicalPrinciples = [
  {
    title: "Quiet confidence",
    text: "This snapshot prioritised a composed tone, using spacing, type, and rules to carry authority.",
  },
  {
    title: "Practical warmth",
    text: "It paired softness around sensitive content with enough structure to keep decisions clear.",
  },
  {
    title: "Inclusive by default",
    text: "It treated kink, ENM, polyamory, LGBTQIA+ identity, and complex relationships as ordinary parts of the room.",
  },
  {
    title: "No decorative drift",
    text: "It favoured paper, soft green surfaces, cedar accents, borders, and restrained cards.",
  },
];

const statusGroups = [
  {
    label: "Previously catalogued as active",
    items: ["site-* page system", "hero-* hero system", "shared form, FAQ, CTA, footer, card, and trust patterns"],
  },
  {
    label: "Previously catalogued as partial",
    items: ["responsive QA matrix", "accessibility audit matrix", "page-pattern consolidation", "component status labelling"],
  },
  {
    label: "Previously catalogued as legacy",
    items: ["design-language-* demos", "test-bed routes", "opus-* and inc-lab-* experiments", "old hero candidates"],
  },
];

const tokenSwatches = [
  { name: "Paper", token: "--paper", className: "ds-overview-swatch--paper" },
  { name: "Surface", token: "--surface", className: "ds-overview-swatch--surface" },
  { name: "Strong", token: "--surface-strong", className: "ds-overview-swatch--strong" },
  { name: "Cedar", token: "--cedar", className: "ds-overview-swatch--cedar" },
];

export default function DesignLanguage() {
  useDocumentMetadata(
    "Historical Design Catalogue | Vive Counselling",
    "An archived Vive Counselling design-system snapshot retained for reconciliation, not current production guidance."
  );

  return (
    <main className="site-page design-language-page ds-overview-page">
      <section className="hero-section hero-bg--default ds-overview-hero">
        <Container>
          <div className="hero-top ds-overview-hero__grid">
            <div className="ds-overview-hero__copy">
              <h1 className="hero-badge">Historical design catalogue</h1>
              <p className="hero-display">An outdated snapshot retained for reconciliation.</p>
              <p className="hero-intro">
                These pages record an earlier design-system direction: paper-first layouts, serif-led hierarchy, cedar
                accents, quiet components, and a set of patterns that no longer represent the current public site.
              </p>
              <ul className="hero-support-tagline" aria-label="Historical catalogue summary">
                <li>Earlier paper and soft green rhythm</li>
                <li>Earlier Georgia-led editorial tone</li>
                <li>Unverified site-* and hero-* inventory</li>
              </ul>
            </div>

            <aside className="hero-copy-panel ds-overview-hero__panel" aria-label="Design system status">
              <span className="hero-badge">Archive status</span>
              <p>
                The catalogue is browsable for historical reference while its claims are checked against current source.
                Nothing shown here should be assumed to be current production guidance or approved reusable API.
              </p>
              <div className="ds-overview-hero__actions">
                <Button href="/design-language/foundations">Browse historical foundations</Button>
                <Button href="/design-language/components" variant="secondary">
                  Browse historical components
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <div className="ds-layout ds-overview-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">
          <section className="ds-section" id="map">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Archive map</span>
              <h2>Four rooms from an earlier design-system snapshot.</h2>
              <p>
                Each section preserves a different part of the former catalogue. The classifications and reuse guidance
                remain unverified until the reconciliation pass is complete.
              </p>
            </div>

            <div className="ds-overview-route-grid">
              {systemRoutes.map((section) => {
                const Icon = section.icon;
                return (
                  <Link className="ds-overview-route-card" to={section.href} key={section.title}>
                    <span className="ds-overview-route-card__icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <span className="ds-overview-route-card__eyebrow">{section.eyebrow}</span>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                    <span className="ds-overview-route-card__meta">
                      {section.detail}
                      <ArrowRight size={15} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="ds-section" id="language">
            <div className="ds-overview-language">
              <div className="ds-section-heading">
                <span className="site-eyebrow">Recorded design language</span>
                <h2>The visual language captured by this snapshot.</h2>
                <p>
                  The earlier system kept colour close to paper and green surfaces, used cedar for emphasis, and relied on
                  typography for a human register. This description is historical rather than current direction.
                </p>
              </div>

              <div className="ds-overview-specimen" aria-label="Design language specimen">
                <div className="ds-overview-specimen__type">
                  <span className="hero-badge">Type specimen</span>
                  <strong>This snapshot used serif headings to carry feeling.</strong>
                  <p>Its sans-serif body copy stayed plain and practical.</p>
                </div>

                <div className="ds-overview-swatch-grid" aria-label="Core colour tokens">
                  {tokenSwatches.map((swatch) => (
                    <div className="ds-overview-swatch" key={swatch.token}>
                      <span className={`ds-overview-swatch__sample ${swatch.className}`} />
                      <strong>{swatch.name}</strong>
                      <code>{swatch.token}</code>
                    </div>
                  ))}
                </div>

                <ul className="site-trust-list ds-overview-specimen__trust" aria-label="Example trust strip">
                  <li>Adults across Australia</li>
                  <li>Adults</li>
                  <li>Grounded and non-shaming</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="ds-section" id="principles">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Recorded principles</span>
              <h2>What this snapshot set out to protect.</h2>
              <p>
                These principles are retained as history. They are not current instructions for new or maintained pages.
              </p>
            </div>

            <div className="ds-overview-principle-grid">
              {historicalPrinciples.map((principle) => (
                <article className="ds-overview-principle" key={principle.title}>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="status">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical inventory</span>
              <h2>Statuses recorded before the catalogue was quarantined.</h2>
              <p>
                These labels show what the catalogue previously claimed. They have not yet been reconciled with current
                public-route source.
              </p>
            </div>

            <div className="ds-overview-status-grid">
              {statusGroups.map((group) => (
                <article className="ds-overview-status" key={group.label}>
                  <div className="ds-overview-status__heading">
                    {group.label === "Previously catalogued as active" ? <ShieldCheck size={20} /> : <BookOpen size={20} />}
                    <h3>{group.label}</h3>
                  </div>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="site-cta-block ds-overview-cta">
            <div className="site-cta-block__inner ds-overview-cta__inner">
              <div className="site-cta-block__copy">
                <h2>Continue through the archived snapshot.</h2>
                <p>
                  Foundations preserves the earlier token record. Components and Patterns retain the former examples in
                  context for the reconciliation pass.
                </p>
              </div>
              <Button href="/design-language/foundations" variant="secondary">
                Browse historical foundations <ArrowRight size={16} />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
