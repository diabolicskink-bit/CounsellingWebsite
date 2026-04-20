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
    description: "Colour tokens, typography scale, spacing rules, and base HTML - the building blocks everything else is made from.",
    href: "/design-language/foundations",
    count: "17 tokens | 6 type levels | 8 spacing rules",
  },
  {
    eyebrow: "02",
    title: "Components",
    description: "Buttons, cards, trust strips, forms, fee card, and list treatments - reusable UI pieces with usage guidance.",
    href: "/design-language/components",
    count: "4 button variants | 2 card types | full form set",
  },
  {
    eyebrow: "03",
    title: "Heroes",
    description: "Shared page-opening hero language used across Home, Approach, and Inclusion: display type, copy rails, support strips, and background fields.",
    href: "/design-language/heroes",
    count: "11 hero classes | 6 background treatments | 1 canonical composition",
  },
  {
    eyebrow: "04",
    title: "Patterns",
    description: "Section compositions, information layouts, and media treatments - the page-level building blocks.",
    href: "/design-language/patterns",
    count: "10 section patterns | 10 information patterns | 3 media panels",
  },
];

export default function DesignLanguage() {
  useEffect(() => {
    document.title = "Design System | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The Vive Counselling design system - colour tokens, typography, components, heroes, and page patterns."
      );
    }
  }, []);

  return (
    <main className="site-page design-language-page">
      <section className="site-hero design-language-hero">
        <Container className="site-hero__content">
          <div className="site-hero__copy">
            <span className="site-hero__badge">Design system</span>
            <h1>Vive's site system in one place.</h1>
            <p>
              A living reference for the full site direction: colour tokens, serif-led type, cedar accents, quiet
              cards, practical panels, hero compositions, form states, and section architecture.
            </p>
            <ul className="design-language-trust-list" aria-label="System overview">
              <li>Paper backgrounds, soft green surfaces, and cedar accents</li>
              <li>Georgia headings with plain, steady body copy</li>
              <li>Shared page heroes, restrained cards, borders, chips, and panels</li>
              <li>Usage guidance on every component and pattern</li>
            </ul>
            <div className="site-actions">
              <Button href="/design-language/foundations">Foundations</Button>
              <Button href="/design-language/components" variant="secondary">
                Components
              </Button>
              <Button href="/design-language/heroes" variant="tertiary">
                Heroes
              </Button>
            </div>
          </div>

          <div className="site-hero__panel">
            <div className="site-panel__eyebrow">System scope</div>
            <ul className="site-feature-list">
              <li>Paper backgrounds, soft green surfaces, cedar accents.</li>
              <li>Georgia headings with plain, steady body copy.</li>
              <li>Shared page heroes, restrained cards, borders, chips, and panels.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="site-grid">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">Sections</p>
            <h2>Four focused sections, each with usage guidance.</h2>
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

      <section className="site-highlight">
        <Container className="design-language-split">
          <div className="site-highlight__box">
            <div>
              <span className="site-highlight__eyebrow">Usage principles</span>
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

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div>
            <h2>Hero system now lives in the shared library.</h2>
            <p>
              The live homepage hero now uses the shared hero system. Use the Heroes page as the reference instead of
              the old test-bed experiments.
            </p>
          </div>
          <Button href="/codex-tb" variant="secondary">
            Open Codex TB archive <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
