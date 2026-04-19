import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const usagePrinciples = [
  "Calm and intelligent before decorative.",
  "Warm without becoming beige, cosmetic, or generic wellness.",
  "Use borders, rhythm, and spacing before louder colour.",
  "Make practical information feel clear rather than administrative.",
  "Let inclusive content feel ordinary, direct, and well-held.",
];

const sections = [
  {
    eyebrow: "01",
    title: "Foundations",
    description: "Colour tokens, typography scale, spacing rules, and base HTML — the building blocks everything else is made from.",
    href: "/design-language/foundations",
    count: "17 tokens · 6 type levels · 8 spacing rules",
  },
  {
    eyebrow: "02",
    title: "Components",
    description: "Buttons, cards, trust strips, forms, fee card, and list treatments — the reusable UI pieces with usage guidance.",
    href: "/design-language/components",
    count: "4 button variants · 2 card types · full form set",
  },
  {
    eyebrow: "03",
    title: "Patterns",
    description: "Section compositions, information layouts, and media treatments — the page-level building blocks.",
    href: "/design-language/patterns",
    count: "10 section patterns · 10 information patterns · 3 media panels",
  },
];

export default function DesignLanguage() {
  useEffect(() => {
    document.title = "Design System | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The Vive Counselling design system — colour tokens, typography, components, and page patterns."
      );
    }
  }, []);

  return (
    <main className="trial-two-page design-language-page">
      <section className="trial-two-hero design-language-hero">
        <Container className="trial-two-hero__content">
          <div className="trial-two-hero__copy">
            <span className="trial-two-hero__badge">Design system</span>
            <h1>Vive's site system in one place.</h1>
            <p>
              A living reference for the full site direction: colour tokens, serif-led type, cedar accents, quiet
              cards, practical panels, form states, and section architecture.
            </p>
            <ul className="design-language-trust-list" aria-label="System overview">
              <li>Paper backgrounds, soft green surfaces, and cedar accents</li>
              <li>Georgia headings with plain, steady body copy</li>
              <li>Restrained cards, borders, shadows, chips, and panels</li>
              <li>Usage guidance on every component and pattern</li>
            </ul>
            <div className="trial-two-actions">
              <Button href="/design-language/foundations">Foundations</Button>
              <Button href="/design-language/components" variant="secondary">
                Components
              </Button>
              <Button href="/design-language/patterns" variant="tertiary">
                Patterns
              </Button>
            </div>
          </div>

          <div className="trial-two-hero__panel">
            <div className="trial-two-panel__eyebrow">System scope</div>
            <ul className="trial-two-feature-list">
              <li>Paper backgrounds, soft green surfaces, cedar accents.</li>
              <li>Georgia headings with plain, steady body copy.</li>
              <li>Restrained cards, borders, shadows, chips, and panels.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="trial-two-grid">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">Sections</p>
            <h2>Three focused sections, each with usage guidance.</h2>
          </div>

          <div className="ds-overview-grid">
            {sections.map((section) => (
              <a className="ds-overview-card" href={section.href} key={section.title}>
                <span className="ds-overview-card__eyebrow">{section.eyebrow}</span>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <span className="ds-overview-card__count">{section.count}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="trial-two-highlight">
        <Container className="design-language-split">
          <div className="trial-two-highlight__box">
            <div>
              <span className="trial-two-highlight__eyebrow">Usage principles</span>
              <h2>What the system should protect.</h2>
              <p>
                These five principles govern how the design language should be applied. When in doubt, return to them.
              </p>
            </div>
          </div>

          <ul className="ds-principles-list">
            {usagePrinciples.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="trial-two-cta-block">
        <Container className="trial-two-cta-block__inner">
          <div>
            <h2>Also: five homepage hero candidates.</h2>
            <p>
              TestBed holds five distinct visual treatments for the homepage hero — each exploring a different
              compositional approach with the same content.
            </p>
          </div>
          <Button href="/test-bed" variant="secondary">
            View TestBed <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
