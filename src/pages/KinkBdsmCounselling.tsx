import { ArrowRight } from "lucide-react";
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

type TopicCard = {
  title: string;
  copy: string;
  items: string[];
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
  const { hero, topicSection, faqSection } = kinkPageContent;

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

      <section className="site-grid kink-page__topics">
        <Container>
          <div className="site-grid__heading kink-page__topics-heading">
            <span className="site-eyebrow">{topicSection.eyebrow}</span>
            <h2>{topicSection.heading}</h2>
            <p>{topicSection.intro}</p>
          </div>

          <div className="site-card-grid">
            {topicSection.cards.map((card) => (
              <article className="site-card" key={card.title}>
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

      <FaqSection intro={faqSection.intro} items={faqSection.items} title={faqSection.heading} />
    </main>
  );
}
