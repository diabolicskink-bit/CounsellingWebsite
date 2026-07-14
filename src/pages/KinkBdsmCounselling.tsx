import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-kink-bdsm.css";

type HeroAction = {
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
    primaryAction: HeroAction;
    secondaryAction: HeroAction;
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
    secondaryAction: {
      label: "Back to Inclusion",
      href: routeHref(publicRoutePaths.inclusion),
    },
  },
  panelSection: {
    knowledgeSection: {
      prose: {
        title: "No translation needed.",
        body: [
          "You can talk about kink, BDSM, D/s, power exchange, drop and anything else in the language you normally use. You will not need to translate it into clinical terms or stop to explain every reference before we can talk about what is going on. You can speak plainly about your experiences, relationships and desires without first having to work out how much I understand.",
          "I will still ask what it means for you. People can use the same words for very different experiences, and I will not assume that your relationships, practices or dynamics look a certain way. I will want to understand what draws you to them, how you experience them, and the place they have in your life.",
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
        title: "When therapy gets kink wrong.",
        body: [
          "You may have tried to talk about kink in counselling before and found yourself dealing with the counsellor's reaction instead. They may have become uncomfortable or overly interested, treated kink as evidence of trauma, or made it the explanation for problems elsewhere in your life. At the other extreme, something that did not feel okay may have been minimised because it happened within kink.",
          "An experience like that can make trying again feel risky. You do not have to trust that this will be different because a website says so. You can ask direct questions, tell me what went wrong before, and take your time deciding what you want to share.",
        ],
      },
      {
        title: "More than kink.",
        body: [
          "You might look specifically for a kink-aware therapist because kink is part of your life, even when it is not the reason you want counselling. What brings you here may be anxiety, grief, work or a relationship, with kink mattering simply because it is part of the life in which those things are happening. It can be part of the context without becoming the explanation for everything.",
          "Kink can also be the reason you are here. A dynamic may have changed, you and a partner may want different things, or you may be trying to understand something that happened. Those concerns can be taken seriously without deciding in advance that kink itself is the problem.",
        ],
      },
    ],
  },
  faqSection: {
    eyebrow: "Questions",
    intro: "",
    items: [
      {
        question: "Is this individual counselling, or can a partner join a session?",
        answer:
          "Most counselling here is individual. A partner may sometimes join a session when there is something specific you need to talk through together. That might include a kink-related issue that makes more sense to discuss with both of you there. This is considered case by case and is not an ongoing couples counselling service. We would agree beforehand on the purpose of the session and how it fits with your individual counselling. If the relationship itself needs to become the focus of ongoing work, a dedicated couples or relationship counsellor may be more appropriate.",
      },
      {
        question: "What if I'm not sure whether something crossed a line?",
        answer:
          "You do not need to decide that before bringing it to counselling. You may know something did not feel okay without being sure whether an agreement was broken, consent changed, communication failed, or the experience affected you in a way you did not expect.",
      },
      {
        question: "What if Joel and I know each other through Perth's kink community?",
        answer:
          "If we know each other through Perth's kink community, I won't be able to work with you as your counsellor. If we've only crossed paths briefly and you're not sure whether that counts, get in touch and we can work that out. If we can't work together, I can refer you to another counsellor.",
      },
      {
        question: "Can I ask questions before deciding whether to make an appointment?",
        answer:
          "Yes. There is only so much you can tell from a website, and it matters that you feel comfortable with the person you are talking to. The free 15-minute consult is a chance to have a quick chat and get a sense of me before you decide anything.",
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
              <p className="hero-display">{hero.title}</p>

              <div className="hero-copy-panel kink-page__hero-support">
                <p>{hero.intro}</p>
              </div>
            </div>
            <nav className="kink-page__hero-actions" aria-label="Page actions">
              <div className="kink-page__hero-action-list">
                <Button href={hero.primaryAction.href} variant="primary">
                  {hero.primaryAction.label} <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button href={hero.secondaryAction.href} variant="secondary">
                  <ArrowLeft size={16} aria-hidden="true" /> {hero.secondaryAction.label}
                </Button>
              </div>
            </nav>
          </div>
        </Container>
      </section>

      <section className="site-grid kink-page__knowledge-section" aria-label="Kink-aware counselling themes">
        <Container>
          <div className="kink-page__knowledge-grid">
            <article className="kink-page__knowledge-copy">
              <h2 className="kink-page__panel-title">{panelSection.knowledgeSection.prose.title}</h2>
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
                  <h2 className="kink-page__closing-card-title">{closingSupport.title}</h2>
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
      />
    </main>
  );
}
