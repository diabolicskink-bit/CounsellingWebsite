import { ArrowRight, Asterisk } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-kink-bdsm.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PrimaryAction = {
  label: string;
  href: string;
};

type TextLink = {
  label: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type PanelItem = {
  title?: string;
  ariaLabel?: string;
  variant?: "language-field";
  listItems?: string[];
  body?: string[];
};

type KinkPageContent = {
  title: string;
  meta: string;
  hero: {
    breadcrumb: BreadcrumbItem[];
    eyebrow: string;
    title: string;
    intro: string;
    primaryAction: PrimaryAction;
    secondaryAction: TextLink;
    trustItems: string[];
    noteEyebrow: string;
    noteItems: string[];
  };
  panelSection: {
    items: PanelItem[];
  };
  faqSection: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: FaqItem[];
  };
};

const kinkMetadata = getRouteMetadata("/inclusion/kink-bdsm");

const kinkPageContent: KinkPageContent = {
  title: kinkMetadata.title,
  meta: kinkMetadata.description,
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Inclusive practice", href: "/inclusion" },
      { label: "Kink & BDSM" },
    ],
    eyebrow: "Kink & BDSM-aware counselling",
    title: "Kink & BDSM-aware counselling",
    intro:
      "Ordinary therapy where kink will not be mishandled. You might be coming for anxiety, grief, shame, trauma, burnout, or relationship strain. What matters is being able to mention kink plainly without it being treated as pathology, danger, or the explanation for everything else.",
    primaryAction: {
      label: "Make an enquiry",
      href: "/contact",
    },
    secondaryAction: {
      label: "Working with Joel",
      href: "/working-with-joel",
    },
    trustItems: [
      "For adults",
      "Perth-based",
      "Online across Australia",
    ],
    noteEyebrow: "What this changes",
    noteItems: [
      "No need for a kink-specific problem.",
      "No need to explain the basics.",
      "No need for the real issue to get lost.",
    ],
  },
  panelSection: {
    items: [
      {
        title: "No translation needed.",
        body: [
          "This world is known here. Not read about. Lived in. The dynamics, the language, the things that do not survive translation to people outside it: none of it needs a preamble.",
          "You won't be anyone's education. You won't spend the first session building context. However long you've been carrying this alone, it can come into the room as it is.",
        ],
      },
      {
        title: "All of it belongs.",
        ariaLabel: "Kink and BDSM language",
        variant: "language-field",
        listItems: [
          "D/s",
          "Bondage",
          "Rope",
          "Impact",
          "Sensation",
          "Masochism",
          "Sadism",
          "Fetish",
          "Primal",
          "Pet play",
          "Service",
          "Humiliation",
          "Degradation",
          "CNC",
          "Objectification",
          "Aftercare",
        ],
      },
      { title: "Carried alone." },
      { title: "And everything else." },
    ],
  },
  faqSection: {
    eyebrow: "Questions",
    heading: "Common questions before starting",
    intro: "These are some of the things people often want to know before making first contact.",
    items: [
      {
        question: "Do I need to be coming for a kink-related issue?",
        answer:
          "No. You might be coming for anxiety, grief, shame, self-worth, relationships, trauma, burnout, or something harder to name. The point is that you should not have to hide kink in order to get help with the real issue.",
      },
      {
        question: "What if kink is relevant, but not the main focus?",
        answer:
          "That is completely fine. Kink can be part of the context without becoming the whole conversation. If it matters, we can include it. If it is not the main issue, the work does not need to orbit around it.",
      },
      {
        question: "Do you assume kink comes from trauma, pathology, or something being wrong?",
        answer:
          "No. I do not start from the assumption that kink is evidence of trauma, dysfunction, instability, or poor attachment. If something is causing distress, we can look at that carefully without making kink itself the diagnosis.",
      },
      {
        question: "Will I have to explain basic kink terms or context?",
        answer:
          "You may need to explain what particular words, practices, scenes, or dynamics mean in your life, but you should not have to teach basic kink concepts before the real work can begin.",
      },
    ],
  },
};

export default function KinkBdsmCounselling() {
  useDocumentMetadata(kinkPageContent.title, kinkPageContent.meta);
  const { hero, panelSection, faqSection } = kinkPageContent;

  return (
    <main className="site-page kink-page">
      <FaqSchema faqs={faqSection.items} />

      <section className="hero-section hero-bg--default kink-page__hero">
        <Container className="kink-page__hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {hero.breadcrumb.map((item) =>
              item.href ? (
                <Link key={item.label} to={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span key={item.label}>{item.label}</span>
              ),
            )}
          </nav>

          <div className="kink-page__hero-main">
            <div className="kink-page__hero-copy">
              <span className="hero-badge">{hero.eyebrow}</span>
              <h1 className="hero-display">{hero.title}</h1>
              <p className="kink-page__hero-intro">{hero.intro}</p>

              <div className="kink-page__hero-actions">
                <Button href={hero.primaryAction.href}>{hero.primaryAction.label}</Button>
                <Link className="site-text-link kink-page__hero-text-link" to={hero.secondaryAction.href}>
                  {hero.secondaryAction.label} <ArrowRight size={16} />
                </Link>
              </div>

              <ul className="site-trust-list kink-page__hero-trust" aria-label="Practice details">
                {hero.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <aside className="kink-page__hero-note" aria-label="What this changes">
              <p className="kink-page__hero-note-eyebrow">{hero.noteEyebrow}</p>
              <div className="kink-page__hero-note-list">
                {hero.noteItems.map((item) => (
                  <p className="kink-page__hero-note-item" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid kink-page__panel-section" aria-label="Kink-aware counselling themes">
        <Container>
          <ul className="kink-page__panel-grid">
            {panelSection.items.map((item) => (
              <li
                className={[
                  "kink-page__panel",
                  item.body ? "kink-page__panel--with-copy" : "",
                  item.variant === "language-field" ? "kink-page__panel--language-field" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={item.title ?? item.ariaLabel}
                aria-label={item.ariaLabel}
              >
                {item.title ? <h2 className="kink-page__panel-title">{item.title}</h2> : null}
                {item.variant === "language-field" ? (
                  <ul className="kink-page__language-field" aria-hidden="true">
                    {item.listItems?.map((label) => (
                      <li key={label}>
                        <Asterisk className="kink-page__language-icon" size={15} strokeWidth={2.4} />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.body ? (
                  <div className="kink-page__panel-body">
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FaqSection intro={faqSection.intro} items={faqSection.items} title={faqSection.heading} />
    </main>
  );
}
