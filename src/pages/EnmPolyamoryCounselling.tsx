import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-enm-polyamory.css";

const pageContent = {
  title: "Counselling for Polyamory, Open Relationships and ENM | Vive Counselling",
  meta:
    "Counselling for polyamorous and consensually non-monogamous clients where monogamy is not assumed to be the answer and the relationship structure is not treated as the whole story. Perth-based, online across Australia.",
  hero: {
    badge: "ENM and polyamory counselling",
    title: "Counselling for polyamory, open relationships, and ENM",
    intro:
      "Counselling for people in polyamory, open relationships, and consensual non-monogamy who want real therapy without having to defend the structure first. You might be coming for anxiety, shame, grief, burnout, relationship strain, jealousy, attachment, confusion, or something harder to name. Many people arrive after therapy where non-monogamy was treated as the obvious problem before anything else had been understood.",
    trustItems: [
      "For adults",
      "Online across Australia",
      "Grounded and non-shaming",
      "Monogamy is not treated as the default answer",
    ],
    panelEyebrow: "What this offers",
    panelItems: [
      "You do not need an ENM-specific crisis to come here.",
      "Non-monogamy is not treated as proof that your relationships are inherently unstable.",
      "If the structure matters, it can be discussed directly. If it does not, it does not need to swallow the work.",
    ],
  },
  topicSection: {
    eyebrow: "What Often Goes Wrong",
    heading: "Many CNM clients are looking for ordinary therapy in a room where non-monogamy will not be flattened or blamed",
    intro:
      "For many polyamorous and consensually non-monogamous clients, the problem is not just the relationship structure. The problem is what happens when a therapist assumes monogamy is healthier, simpler, or the obvious solution.",
    cards: [
      {
        title: "Monogamy being treated as the answer",
        copy:
          "People often worry that the conversation will quietly steer toward closing the relationship before anyone has really understood what is happening.",
        items: ["Feeling pushed toward a preferred outcome", "Not feeling met where you actually are"],
      },
      {
        title: "The structure being blamed for everything",
        copy:
          "Anxiety, jealousy, shame, grief, conflict, or exhaustion may get collapsed into the idea that non-monogamy itself is the problem.",
        items: ["Complexity reduced too quickly", "The real issue getting overshadowed"],
      },
      {
        title: "Having to educate the therapist",
        copy:
          "Some clients come in expecting they will have to explain basic CNM language, hinge dynamics, agreements, disclosure issues, or the difference between pressure and consent before the real work can begin.",
        items: ["Too much energy spent orienting the room", "Not enough room for your actual experience"],
      },
      {
        title: "Relational complexity being oversimplified",
        copy:
          "When more than one partner or relationship is involved, the emotional reality can be more layered than a simple right-or-wrong frame allows.",
        items: ["More than one attachment bond matters", "Decisions do not always fit monogamous templates"],
      },
    ],
  },
  focusSection: {
    eyebrow: "What You Can Come For",
    heading: "You do not need a non-monogamy issue to need ENM-aware therapy",
    intro:
      "You might be coming for the same reasons anyone comes to therapy. What makes this relevant is that you should not have to edit your relationships or leave out important context in order to get help.",
    items: [
      {
        title: "Anxiety and overthinking",
        copy: "When you feel flooded, vigilant, or mentally exhausted by what is happening in you or around you.",
      },
      {
        title: "Jealousy, insecurity, or comparison",
        copy: "When difficult feelings keep taking over and you want to understand them without shame.",
      },
      {
        title: "Attachment strain and relationship conflict",
        copy: "When trust, reassurance, resentment, conflict, distance, or rupture are becoming harder to hold.",
      },
      {
        title: "Burnout and emotional overload",
        copy: "When too many moving parts, too much caretaking, or not enough capacity are leaving you flat or reactive.",
      },
      {
        title: "Shame, grief, or self-worth",
        copy: "When the deeper issue is how you feel in yourself, not just what structure you are in.",
      },
      {
        title: "Uncertainty about fit",
        copy: "When you are trying to think honestly about whether polyamory, openness, or ENM actually fits your life and values.",
      },
    ],
    note:
      "If non-monogamy matters to the work, it can be included directly. If it is not the main issue, the room does not need to keep dragging everything back to it.",
  },
  stance: {
    eyebrow: "How I work",
    heading: "This is therapy for your whole relational life, not a narrow service for CNM problems only",
    paragraphs: [
      "If you are in polyamory, an open relationship, or some other consensually non-monogamous structure, good therapy should not require you to split your life into acceptable and unacceptable parts. You should be able to talk about your relationships as they actually are, without non-monogamy being treated as pathology, immaturity, avoidance, or the automatic explanation for conflict.",
      "You can come for anxiety, shame, jealousy, grief, self-criticism, conflict, burnout, loneliness, uncertainty, trauma, or a general sense of being stuck. Non-monogamy can be part of the context when it matters and stay in the background when it does not.",
    ],
    principles: [
      {
        title: "No automatic bias toward monogamy",
        text: "The aim is not to steer you back to monogamy or sell you on CNM. The aim is to understand what is true for you.",
      },
      {
        title: "No need to hide relational reality",
        text: "You do not need to flatten your life into a monogamous script in order to be taken seriously.",
      },
      {
        title: "The real issue stays central",
        text: "If the problem is anxiety, grief, jealousy, conflict, or self-worth, the work can stay there while still making room for the structure you are living in.",
      },
    ],
  },
  individual: {
    eyebrow: "Individual counselling",
    heading: "You can come on your own, even when more than one relationship is involved",
    paragraphs: [
      "You do not need to bring partners with you for this to be useful. Individual counselling can still help when the issue involves a hinge role, multiple attachments, divided loyalties, disclosure, jealousy, uncertainty, conflict, or the wider pressure of relational complexity.",
      "Sometimes the work is about your own limits, needs, fears, capacity, or sense of fit. Sometimes it is about how to think more clearly when there are several relationships, several pressures, or several truths in the room at once.",
    ],
    note:
      "You do not need a polished explanation before getting in touch. A brief, honest starting point is enough.",
  },
  faqSection: {
    title: "Common questions before starting",
    intro: "These are some of the things people often want to know before making first contact.",
    items: [
      {
        question: "Do I need to be coming for a poly or ENM issue?",
        answer:
          "No. You might be coming for anxiety, grief, shame, self-worth, burnout, conflict, attachment, or something harder to name. The point is that you should not have to hide or distort your relationship life in order to get proper help.",
      },
      {
        question: "Do you assume monogamy is healthier or the goal?",
        answer:
          "No. I do not start from the assumption that monogamy is healthier, more mature, or the obvious answer. The work is about understanding what is happening for you rather than pushing you toward a predetermined structure.",
      },
      {
        question: "What if I am not sure non-monogamy fits me?",
        answer:
          "That is a valid reason to come. Therapy can help you think about desire, pressure, fear, values, attachment, and capacity without pushing you toward or away from ENM before you have made sense of it.",
      },
      {
        question: "Can I come alone if more than one relationship is involved?",
        answer:
          "Yes. Individual counselling can still be useful when a concern involves several partners, a wider relationship network, or strain across more than one bond.",
      },
    ],
  },
};

export default function EnmPolyamoryCounselling() {
  useDocumentMetadata(pageContent.title, pageContent.meta);

  return (
    <main className="site-page enm-page">
      <FaqSchema faqs={pageContent.faqSection.items} />

      <section className="hero-section hero-bg--default enm-page__hero">
        <Container>
          <div className="hero-top enm-page__hero-top">
            <div className="enm-page__hero-copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <Link to="/inclusion">Inclusive practice</Link>
                <span>ENM & polyamory</span>
              </nav>

              <span className="hero-badge">{pageContent.hero.badge}</span>
              <h1 className="hero-display">{pageContent.hero.title}</h1>
              <p className="hero-intro">{pageContent.hero.intro}</p>

              <ul className="site-trust-list site-trust-list--highlight-last enm-page__trust" aria-label="Practice details">
                {pageContent.hero.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <aside className="site-copy-panel enm-page__hero-panel" aria-label="ENM-aware counselling summary">
              <span className="site-highlight__eyebrow">{pageContent.hero.panelEyebrow}</span>
              <div className="site-detail-stack">
                {pageContent.hero.panelItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="site-actions enm-page__hero-actions">
                <Button href="/contact">Make an enquiry</Button>
                <Button href="/inclusion" variant="secondary">
                  Inclusive counselling hub
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid enm-page__topics">
        <Container>
          <div className="site-grid__heading enm-page__topics-heading">
            <span className="site-eyebrow">{pageContent.topicSection.eyebrow}</span>
            <h2>{pageContent.topicSection.heading}</h2>
            <p>{pageContent.topicSection.intro}</p>
          </div>

          <div className="site-card-grid">
            {pageContent.topicSection.cards.map((card) => (
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

      <section className="site-highlight enm-page__focus">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{pageContent.focusSection.eyebrow}</span>
            <h2>{pageContent.focusSection.heading}</h2>
            <p>{pageContent.focusSection.intro}</p>
          </div>

          <div className="site-content-stack">
            <div className="site-topic-grid" aria-label="Common therapy reasons">
              {pageContent.focusSection.items.map((item) => (
                <article className="site-topic-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>

            <p className="site-ruled-paragraph site-ruled-paragraph--wide">{pageContent.focusSection.note}</p>
          </div>
        </Container>
      </section>

      <section className="site-highlight enm-page__stance">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{pageContent.stance.eyebrow}</span>
            <h2>{pageContent.stance.heading}</h2>
          </div>

          <div className="site-content-stack">
            <article className="site-copy-panel rich-text">
              {pageContent.stance.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>

            <div className="site-principles" aria-label="ENM-aware counselling principles">
              {pageContent.stance.principles.map((item) => (
                <article className="site-principle" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="site-grid enm-page__individual">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{pageContent.individual.eyebrow}</span>
            <h2>{pageContent.individual.heading}</h2>
          </div>

          <div className="site-content-stack">
            <article className="site-copy-panel rich-text">
              {pageContent.individual.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                You can also <Link to="/working-with-joel">read more about working with Joel</Link>, check{" "}
                <Link to="/contact">online counselling fees and session details</Link>, or{" "}
                <Link to="/contact">make an enquiry about counselling</Link>.
              </p>
            </article>

            <p className="site-ruled-paragraph site-ruled-paragraph--wide">{pageContent.individual.note}</p>
          </div>
        </Container>
      </section>

      <FaqSection
        intro={pageContent.faqSection.intro}
        items={pageContent.faqSection.items}
        title={pageContent.faqSection.title}
      />

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div className="site-cta-block__copy">
            <h2>You do not need to explain everything perfectly.</h2>
            <p>
              A first enquiry can be brief. Name what is bringing you to counselling, whether online sessions suit you,
              and anything important for first contact.
            </p>
          </div>
          <Button href="/contact" variant="secondary">
            Make an enquiry about counselling <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
