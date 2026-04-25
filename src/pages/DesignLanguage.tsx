import { ArrowRight, BookOpen, Boxes, CheckCircle2, Compass, Layers3, Palette, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import DesignSystemSidebar from "../components/DesignSystemSidebar";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

const systemRoutes = [
  {
    icon: Palette,
    eyebrow: "01 / foundations",
    title: "Foundations",
    description: "Colour tokens, type roles, spacing, surfaces, HTML defaults, and the baseline rules every page inherits.",
    href: "/design-language/foundations",
    detail: "Tokens, type, rhythm, states",
  },
  {
    icon: Boxes,
    eyebrow: "02 / components",
    title: "Components",
    description: "Buttons, cards, trust strips, forms, fee cards, FAQ, footer, and reusable content treatments.",
    href: "/design-language/components",
    detail: "Actions, panels, forms, lists",
  },
  {
    icon: Layers3,
    eyebrow: "03 / heroes",
    title: "Heroes",
    description: "The canonical page-opening system: display type, copy rails, support rows, hero media, and background fields.",
    href: "/design-language/heroes",
    detail: "Page openings and first impressions",
  },
  {
    icon: Compass,
    eyebrow: "04 / patterns",
    title: "Patterns",
    description: "Section compositions and information layouts that help public pages stay calm, useful, and consistent.",
    href: "/design-language/patterns",
    detail: "Sections, ledgers, prompts",
  },
];

const principles = [
  {
    title: "Quiet confidence",
    text: "The system should feel composed before it feels expressive. Let spacing, type, and rules carry the authority.",
  },
  {
    title: "Practical warmth",
    text: "Sensitive content needs enough softness to feel human, but enough structure to keep decisions clear.",
  },
  {
    title: "Inclusive by default",
    text: "Kink, ENM, polyamory, LGBTQIA+ identity, and complex relationships should read as ordinary parts of the room.",
  },
  {
    title: "No decorative drift",
    text: "Use paper, soft green surfaces, cedar accents, borders, and restrained cards before adding anything new.",
  },
];

const implementationPath = [
  "Start with shared React components.",
  "Compose with active site-* and hero-* classes.",
  "Extend shared styles only when a repeated need appears.",
  "Use page-scoped CSS only for genuine one-page composition.",
  "Document anything promoted into the design system.",
];

const statusGroups = [
  {
    label: "Active",
    items: ["site-* page system", "hero-* hero system", "shared form, FAQ, CTA, footer, card, and trust patterns"],
  },
  {
    label: "Partial",
    items: ["responsive QA matrix", "accessibility audit matrix", "page-pattern consolidation", "component status labelling"],
  },
  {
    label: "Legacy",
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
    "Design System | Vive Counselling",
    "The Vive Counselling design system: foundations, components, hero language, patterns, and implementation rules."
  );

  return (
    <main className="site-page design-language-page ds-overview-page">
      <section className="hero-section hero-bg--default ds-overview-hero">
        <Container>
          <div className="hero-top ds-overview-hero__grid">
            <div className="ds-overview-hero__copy">
              <span className="hero-badge">Design system</span>
              <h1 className="hero-display">A calm, practical design language for sensitive work.</h1>
              <p className="hero-intro">
                Vive's design system keeps counselling content clear, grounded, and human: paper-first layouts, serif-led
                hierarchy, cedar accents, quiet components, and patterns that make inclusive practice easier to understand.
              </p>
              <ul className="hero-support-tagline" aria-label="Design system summary">
                <li>Paper and soft green rhythm</li>
                <li>Georgia-led editorial tone</li>
                <li>Production site-* and hero-* APIs</li>
              </ul>
            </div>

            <aside className="hero-copy-panel ds-overview-hero__panel" aria-label="Design system status">
              <span className="hero-badge">System status</span>
              <p>
                The active production language is already in use across public pages. Use this overview as the front
                door, then move into the focused sections for examples, class names, and usage rules.
              </p>
              <div className="ds-overview-hero__actions">
                <Button href="/design-language/foundations">Start with foundations</Button>
                <Button href="/design-language/components" variant="secondary">
                  Browse components
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
              <span className="site-eyebrow">System map</span>
              <h2>Four reference rooms, one production language.</h2>
              <p>
                Each section answers a different maintenance question: what is the visual foundation, what can be reused,
                how should pages open, and which larger compositions are approved.
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
                <span className="site-eyebrow">Design language</span>
                <h2>Calm is built from repeated decisions.</h2>
                <p>
                  The system is intentionally narrow. Colour stays close to paper and green surfaces, cedar does the
                  emphasis work, and type creates the human register without adding decorative noise.
                </p>
              </div>

              <div className="ds-overview-specimen" aria-label="Design language specimen">
                <div className="ds-overview-specimen__type">
                  <span className="hero-badge">Type specimen</span>
                  <strong>Serif headings carry feeling.</strong>
                  <p>Sans-serif body copy stays plain, legible, and useful when the content becomes practical.</p>
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
                  <li>Online across Australia</li>
                  <li>Adults</li>
                  <li>Grounded and non-shaming</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="ds-section" id="principles">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Principles</span>
              <h2>What the design system should protect.</h2>
              <p>
                These are the judgement calls to return to when a page could be solved several ways.
              </p>
            </div>

            <div className="ds-overview-principle-grid">
              {principles.map((principle) => (
                <article className="ds-overview-principle" key={principle.title}>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="implementation">
            <div className="ds-overview-implementation">
              <div>
                <span className="site-eyebrow">Implementation order</span>
                <h2>Reuse before inventing.</h2>
                <p>
                  The fastest way to keep the site coherent is to move through the same order every time a visual problem
                  appears.
                </p>
              </div>

              <ol className="ds-overview-steps">
                {implementationPath.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>

          <section className="ds-section" id="status">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Inventory</span>
              <h2>Use active layers, handle partial work carefully, leave experiments as reference.</h2>
              <p>
                The system has mature production layers and some older reference material. The boundary matters.
              </p>
            </div>

            <div className="ds-overview-status-grid">
              {statusGroups.map((group) => (
                <article className="ds-overview-status" key={group.label}>
                  <div className="ds-overview-status__heading">
                    {group.label === "Active" ? <ShieldCheck size={20} /> : <BookOpen size={20} />}
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
                <h2>Need a starting point?</h2>
                <p>
                  Foundations explain the tokens and core rules. Components and Patterns show the reusable pieces in
                  context.
                </p>
              </div>
              <Button href="/design-language/foundations" variant="secondary">
                Open foundations <ArrowRight size={16} />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
