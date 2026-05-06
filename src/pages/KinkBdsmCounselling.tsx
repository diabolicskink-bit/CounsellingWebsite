import Button from "../components/Button";
import Container from "../components/Container";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-kink-bdsm.css";

type PrimaryAction = {
  label: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type CopyPanel = {
  title: string;
  body?: string[];
};

type LanguageField = {
  ariaLabel: string;
  listItems: string[];
};

type KinkPageContent = {
  title: string;
  meta: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryAction: PrimaryAction;
  };
  panelSection: {
    knowledgeSection: {
      prose: CopyPanel;
      language: LanguageField;
    };
    closingRow: CopyPanel[];
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
    eyebrow: "Kink & BDSM-aware counselling",
    title: "Therapy where kink doesn't need a preamble.",
    intro:
      "Ordinary therapy where kink will not be mishandled. You will not have to explain it, hide it, or watch it take over the conversation. What you came for doesn't get lost.",
    primaryAction: {
      label: "Make an enquiry",
      href: routeHref(publicRoutePaths.contact),
    },
  },
  panelSection: {
    knowledgeSection: {
      prose: {
        title: "No translation needed.",
        body: [
          "This world is known here. Not read about. Lived in. The dynamics, the language, the things that do not survive translation to people outside it. It can be said without setup.",
          "You won't be anyone's education. You won't spend the first session building context. However long you've been carrying this alone, it can come into the room as it is.",
        ],
      },
      language: {
        ariaLabel: "Kink and BDSM language",
        listItems: [
          "D/S",
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
          "High Protocol",
        ],
      },
    },
    closingRow: [
      {
        title: "What goes unspoken.",
        body: [
          "Drop. The kind that follows a scene, whichever side of it you were on. Shame, a dynamic that stopped feeling okay. Something that crossed a line, or that you're not sure crossed a line. A disclosure that didn't land well. A desire that has lived privately for years and never been put down anywhere.",
          "None of it needs to be resolved before it comes here. It can arrive as it is, as complicated as it actually is, without the conversation becoming about managing someone else's reaction to it.",
        ],
      },
      {
        title: "More than kink.",
        body: [
          "Kink being known here does not make it the subject. You might be coming for anxiety, grief, relationships, work, or something you have not named yet. Whatever brought you here, you will not have to manage this practice's relationship with kink while you deal with the real reason.",
        ],
      },
    ],
  },
  faqSection: {
    eyebrow: "Questions",
    heading: "Frequently asked questions",
    intro: "",
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
  const [closingIntro, closingSupport] = panelSection.closingRow;

  return (
    <main className="site-page kink-page">
      <FaqSchema faqs={faqSection.items} />

      <section className="hero-section hero-bg--default kink-page__hero">
        <Container>
          <div className="kink-page__hero-main">
            <div className="kink-page__hero-copy">
              <h1 className="hero-badge">{hero.eyebrow}</h1>
              <h2 className="hero-display">{hero.title}</h2>

              <div className="hero-copy-panel kink-page__hero-support">
                <p>{hero.intro}</p>
                <div className="site-actions kink-page__hero-actions">
                  <Button href={hero.primaryAction.href}>{hero.primaryAction.label}</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="site-grid kink-page__knowledge-section" aria-label="Kink-aware counselling themes">
        <Container>
          <div className="kink-page__knowledge-grid">
            <article className="kink-page__knowledge-copy">
              <h3 className="kink-page__panel-title">{panelSection.knowledgeSection.prose.title}</h3>
              <div className="kink-page__panel-body">
                {panelSection.knowledgeSection.prose.body?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div
              className="kink-page__language-panel kink-page__panel--language-field"
              role="group"
              aria-label={panelSection.knowledgeSection.language.ariaLabel}
            >
              <ul className="kink-page__language-field">
                {panelSection.knowledgeSection.language.listItems.map((label) => (
                  <li key={label}>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="site-highlight kink-page__closing-section" aria-label="Kink-aware counselling context">
        <Container>
          <div className="site-split kink-page__closing-split">
            {closingIntro ? (
              <div className="section-heading kink-page__closing-intro">
                <h2>{closingIntro.title}</h2>
                <div className="kink-page__closing-intro-body">
                  {closingIntro.body?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : null}

            {closingSupport ? (
              <article className="site-card kink-page__closing-card">
                <div className="kink-page__closing-card-head">
                  <h3>{closingSupport.title}</h3>
                </div>
                <div className="kink-page__closing-card-body">
                  {closingSupport.body?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </Container>
      </section>

      <FaqSection
        className="site-grid kink-page__faq-section"
        intro={faqSection.intro}
        items={faqSection.items}
        title={faqSection.heading}
      />
    </main>
  );
}
