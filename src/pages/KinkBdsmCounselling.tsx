import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
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

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type TopicCard = {
  title: string;
  copy: string;
  items: string[];
};

type FocusItem = {
  title: string;
  copy: string;
};

type PrincipleItem = {
  title: string;
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
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
  topicSection: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: TopicCard[];
  };
  focusSection: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: FocusItem[];
    note: string;
  };
  stance: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    principles: PrincipleItem[];
  };
  individual: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    resourcesLead: string;
    resources: TextLink[];
    note: string;
  };
  faqSection: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: FaqItem[];
  };
  ctaSection: {
    heading: string;
    copy: string;
    buttonLabel: string;
    buttonHref: string;
    buttonVariant: "primary" | "secondary" | "tertiary";
  };
};

const kinkPageContent: KinkPageContent = {
  title: "Kink & BDSM-Aware Counselling | Vive Counselling",
  meta:
    "Counselling for kinky clients where kink is not pathologised, over-scrutinised, or treated as the whole story. Support for anxiety, relationships, shame, grief, trauma, and more. Perth-based, online across Australia.",
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Inclusive practice", href: "/inclusion" },
      { label: "Kink & BDSM" },
    ],
    eyebrow: "Kink & BDSM-aware counselling",
    title: "Ordinary therapy where kink will not be mishandled.",
    intro:
      "You might be coming for anxiety, grief, shame, trauma, burnout, or relationship strain. What matters is being able to mention kink plainly without it being treated as pathology, danger, or the explanation for everything else.",
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
  topicSection: {
    eyebrow: "What Often Goes Wrong",
    heading: "Many kinky clients are looking for ordinary therapy in a room where kink will not be mishandled",
    intro:
      "For many kinky clients, this is not hypothetical. They come in after experiences of therapists getting stuck on kink, misreading it, confusing it with harm, or turning it into the explanation for everything else.",
    cards: [
      {
        title: "Self-censoring in therapy",
        copy:
          "You may find yourself editing out partners, scenes, sexual history, marks, fears, or desires because it feels risky to let a therapist see the full picture.",
        items: ["Holding back relevant context", "Trying not to be misread"],
      },
      {
        title: "Being treated as pathology",
        copy:
          "Many kinky clients worry that kink will be treated as evidence of trauma, instability, danger, or damage before the real conversation has even started.",
        items: ["Not being reduced to a stereotype", "No automatic assumption of harm"],
      },
      {
        title: "Having to educate the therapist",
        copy:
          "Sometimes people come in already expecting they will have to explain basic kink concepts, correct assumptions, or manage another person's discomfort before anything useful can happen.",
        items: ["Too much energy spent orienting the room", "Not enough space for the real work"],
      },
      {
        title: "The real issue getting lost",
        copy:
          "You may be seeking therapy for anxiety, depression, burnout, grief, conflict, shame, attachment, loneliness, or self-worth, and still need the therapist not to get kink wrong.",
        items: ["The actual problem stays central", "Kink can be context instead of the topic"],
      },
    ],
  },
  focusSection: {
    eyebrow: "What You Can Come For",
    heading: "You do not need a kink issue to need kink-aware therapy",
    intro:
      "You might be coming for the same reasons anyone comes to therapy. What makes this relevant is that you should not have to hide part of your life in order to get proper help.",
    items: [
      {
        title: "Anxiety and overthinking",
        copy: "When you feel on edge, stuck in your head, or worn down by constant vigilance.",
      },
      {
        title: "Shame and self-criticism",
        copy: "When your inner life feels harsh, exposing, or hard to live inside.",
      },
      {
        title: "Relationship strain",
        copy: "When conflict, distance, trust, resentment, or communication are becoming difficult.",
      },
      {
        title: "Trauma and self-protection",
        copy: "When past experience still shapes the present, without kink being assumed to be the trauma.",
      },
      {
        title: "Grief, loneliness, or loss",
        copy: "When something important has been lost and you need room to feel it properly.",
      },
      {
        title: "Burnout, flatness, or feeling stuck",
        copy: "When life feels heavy, narrowed, or hard to move inside.",
      },
    ],
    note:
      "If kink matters to the work, it can be included directly. If it does not, it does not need to dominate the room.",
  },
  stance: {
    eyebrow: "How I work",
    heading: "This is therapy for your whole life, not a narrow service for kink problems only",
    paragraphs: [
      "If you are kinky, good therapy should not require you to split yourself in two. You should be able to talk about your life as it is, including the parts that involve kink, BDSM, fantasy, D/s, scenes, or power exchange, without those things being automatically treated as pathology or as the explanation for everything.",
      "You can come for the same reasons anyone comes to therapy: anxiety, grief, shame, relationship difficulties, self-criticism, trauma, burnout, loneliness, desire, confusion, or a sense of being stuck. Kink can be part of the context when it matters and stay in the background when it does not.",
    ],
    principles: [
      {
        title: "No automatic judgement",
        text: "You are not treated as suspect, broken, or unsafe simply because kink is part of your life.",
      },
      {
        title: "No need to split yourself off",
        text: "You do not need to hide, minimise, or edit out relevant parts of your life in order to be taken seriously.",
      },
      {
        title: "The real issue stays central",
        text: "If the problem is anxiety, grief, shame, conflict, or self-worth, the work can stay there while still making room for the truth of your life.",
      },
    ],
  },
  individual: {
    eyebrow: "Individual counselling",
    heading: "You do not need a kink issue to belong here",
    paragraphs: [
      "You can come because something feels difficult in your life and you want help with it. That might be anxiety, shame, grief, anger, low self-worth, relationship strain, trauma, uncertainty, burnout, or a general sense that something is not working.",
      "What makes this relevant is not that every problem comes from kink. It is that therapy works better when you do not have to monitor yourself, leave things out, or worry that an important part of your life will derail the room. If kink matters, it can be included. If it is not the focus, it does not need to become one.",
    ],
    resourcesLead: "You can also",
    resources: [
      { label: "read more about working with Joel", href: "/working-with-joel" },
      { label: "check online counselling fees and session details", href: "/fees" },
      { label: "make an enquiry about counselling", href: "/contact" },
    ],
    note:
      "You do not need a polished explanation before getting in touch. A brief, honest starting point is enough.",
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
  ctaSection: {
    heading: "You do not need to explain everything perfectly.",
    copy:
      "A first enquiry can be brief. Name what is bringing you to counselling, whether online sessions suit you, and anything important for first contact.",
    buttonLabel: "Make an enquiry about counselling",
    buttonHref: "/contact",
    buttonVariant: "secondary",
  },
};

export default function KinkBdsmCounselling() {
  useDocumentMetadata(kinkPageContent.title, kinkPageContent.meta);
  const { hero, topicSection, focusSection, stance, individual, faqSection, ctaSection } = kinkPageContent;

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

              <ul className="kink-page__hero-trust" aria-label="Practice details">
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

      <section className="site-grid kink-page__topics">
        <Container>
          <div className="site-grid__heading kink-page__topics-heading">
            <span className="site-eyebrow">{topicSection.eyebrow}</span>
            <h2>{topicSection.heading}</h2>
            <p>{topicSection.intro}</p>
          </div>

          <div className="site-card-grid">
            {topicSection.cards.map((card) => (
              <article className="site-card kink-page__topic-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <ul className="site-card__list">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-highlight kink-page__focus">
        <Container className="site-split kink-page__stance-split">
          <div className="section-heading">
            <span className="site-eyebrow">{focusSection.eyebrow}</span>
            <h2>{focusSection.heading}</h2>
            <p>{focusSection.intro}</p>
          </div>

          <div className="kink-page__focus-content">
            <div className="kink-page__focus-grid" aria-label="Common therapy reasons">
              {focusSection.items.map((item) => (
                <article className="site-topic-card kink-page__focus-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>

            <p className="site-ruled-paragraph kink-page__focus-note">{focusSection.note}</p>
          </div>
        </Container>
      </section>

      <section className="site-highlight kink-page__stance">
        <Container className="site-split kink-page__stance-split">
          <div className="section-heading">
            <span className="site-eyebrow">{stance.eyebrow}</span>
            <h2>{stance.heading}</h2>
          </div>

          <div className="kink-page__stance-content">
            <article className="site-copy-panel rich-text">
              {stance.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>

            <div className="site-principles" aria-label="Kink-aware counselling principles">
              {stance.principles.map((item) => (
                <article className="site-principle" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="site-grid kink-page__individual">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{individual.eyebrow}</span>
            <h2>{individual.heading}</h2>
          </div>

          <div className="kink-page__individual-content">
            <article className="site-copy-panel rich-text">
              {individual.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                {individual.resourcesLead}{" "}
                {individual.resources.map((item, index) => (
                  <span key={item.label}>
                    {index === 0 ? "" : index === individual.resources.length - 1 ? ", or " : ", "}
                    <Link to={item.href}>{item.label}</Link>
                  </span>
                ))}
                .
              </p>
            </article>

            <p className="site-ruled-paragraph kink-page__individual-note">{individual.note}</p>
          </div>
        </Container>
      </section>

      <FaqSection intro={faqSection.intro} items={faqSection.items} title={faqSection.heading} />

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div className="site-cta-block__copy">
            <h2>{ctaSection.heading}</h2>
            <p>{ctaSection.copy}</p>
          </div>
          <Button href={ctaSection.buttonHref} variant={ctaSection.buttonVariant}>
            {ctaSection.buttonLabel} <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
