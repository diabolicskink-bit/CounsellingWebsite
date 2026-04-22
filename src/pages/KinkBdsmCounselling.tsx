import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import "../styles-kink-bdsm.css";

const pageContent = {
  title: "Kink & BDSM-Aware Counselling | Vive Counselling",
  meta:
    "Counselling for kinky clients where kink is not pathologised, over-scrutinised, or treated as the whole story. Support for anxiety, relationships, shame, grief, trauma, and more. Perth-based, online across Australia.",
  hero: {
    badge: "Kink-aware counselling",
    title: "Kink & BDSM-aware counselling",
    intro:
      "Counselling for kinky clients who want ordinary therapy without having to hide, justify, or over-explain this part of life. You might be coming for anxiety, shame, grief, relationship strain, trauma, self-worth, or something harder to name. Many people arrive after past therapy where kink was judged, pathologised, over-scrutinised, or simply misunderstood.",
    trustItems: [
      "For adults",
      "Online across Australia",
      "Grounded and non-shaming",
      "Kink does not have to be hidden first",
    ],
    panelEyebrow: "What this offers",
    panelItems: [
      "You do not need a kink-specific crisis to come here.",
      "Kink is not treated as proof that something is wrong with you.",
      "If it matters, it can be spoken about directly. If it does not, it does not have to take over the work.",
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
    note:
      "You do not need a polished explanation before getting in touch. A brief, honest starting point is enough.",
  },
  faqs: [
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
};

function FaqSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pageContent.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      }}
    />
  );
}

export default function KinkBdsmCounselling() {
  useEffect(() => {
    document.title = pageContent.title;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (metaDescription) {
      metaDescription.content = pageContent.meta;
    }
  }, []);

  return (
    <main className="site-page kink-page">
      <FaqSchema />

      <section className="hero-section hero-bg--diagonal kink-page__hero">
        <Container>
          <div className="hero-top kink-page__hero-top">
            <div className="kink-page__hero-copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <Link to="/inclusion">Inclusive practice</Link>
                <span>Kink & BDSM</span>
              </nav>

              <span className="hero-badge">{pageContent.hero.badge}</span>
              <h1 className="hero-display kink-page__hero-title">{pageContent.hero.title}</h1>
              <p className="kink-page__hero-intro">{pageContent.hero.intro}</p>

              <ul className="site-trust-list kink-page__trust" aria-label="Practice details">
                {pageContent.hero.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <aside className="site-copy-panel kink-page__hero-panel" aria-label="Kink-aware counselling summary">
              <span className="site-highlight__eyebrow">{pageContent.hero.panelEyebrow}</span>
              <div className="site-detail-stack">
                {pageContent.hero.panelItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="site-actions kink-page__hero-actions">
                <Button href="/contact">Make an enquiry about counselling</Button>
                <Button href="/inclusion" variant="secondary">
                  Inclusive counselling hub
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid kink-page__topics">
        <Container>
          <div className="site-grid__heading kink-page__topics-heading">
            <span className="site-eyebrow">{pageContent.topicSection.eyebrow}</span>
            <h2>{pageContent.topicSection.heading}</h2>
            <p>{pageContent.topicSection.intro}</p>
          </div>

          <div className="site-card-grid">
            {pageContent.topicSection.cards.map((card) => (
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
            <span className="site-eyebrow">{pageContent.focusSection.eyebrow}</span>
            <h2>{pageContent.focusSection.heading}</h2>
            <p>{pageContent.focusSection.intro}</p>
          </div>

          <div className="kink-page__focus-content">
            <div className="kink-page__focus-grid" aria-label="Common therapy reasons">
              {pageContent.focusSection.items.map((item) => (
                <article className="site-topic-card kink-page__focus-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>

            <p className="site-ruled-paragraph kink-page__focus-note">{pageContent.focusSection.note}</p>
          </div>
        </Container>
      </section>

      <section className="site-highlight kink-page__stance">
        <Container className="site-split kink-page__stance-split">
          <div className="section-heading">
            <span className="site-eyebrow">{pageContent.stance.eyebrow}</span>
            <h2>{pageContent.stance.heading}</h2>
          </div>

          <div className="kink-page__stance-content">
            <article className="site-copy-panel rich-text">
              {pageContent.stance.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))} 
            </article>

            <div className="site-principles" aria-label="Kink-aware counselling principles">
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

      <section className="site-grid kink-page__individual">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{pageContent.individual.eyebrow}</span>
            <h2>{pageContent.individual.heading}</h2>
          </div>

          <div className="kink-page__individual-content">
            <article className="site-copy-panel rich-text">
              {pageContent.individual.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                You can also <Link to="/working-with-joel">read more about working with Joel</Link>, check{" "}
                <Link to="/fees">online counselling fees and session details</Link>, or{" "}
                <Link to="/contact">make an enquiry about counselling</Link>.
              </p>
            </article>

            <p className="site-ruled-paragraph kink-page__individual-note">{pageContent.individual.note}</p>
          </div>
        </Container>
      </section>

      <section className="site-grid site-faq-section kink-page__faq">
        <Container>
          <div className="site-faq-shell">
            <div className="site-faq-shell__header">
              <span className="site-eyebrow">Questions</span>
              <h2>Common questions before starting</h2>
              <p>
                These are some of the things people often want to know before making first contact.
              </p>
            </div>

            <div className="site-faq-list">
              {pageContent.faqs.map((faq, index) => (
                <details className="site-faq-item" key={faq.question} open={index === 0}>
                  <summary className="site-faq-question">
                    <h3>{faq.question}</h3>
                    <span className="site-faq-icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </summary>
                  <div className="site-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div>
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
