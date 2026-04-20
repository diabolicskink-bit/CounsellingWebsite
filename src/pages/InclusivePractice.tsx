import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const topicPanels = [
  {
    title: "Kink & BDSM-aware counselling",
    href: "/inclusion/kink-bdsm",
    copy: "Counselling where kink, BDSM, D/s, and power exchange can be named without awkwardness or moralising.",
    issues: ["Shame or secrecy", "Trust and surrender", "Boundaries and consent", "Conflict inside a dynamic"],
    cta: "Explore kink & BDSM support",
  },
  {
    title: "Counselling for ENM & polyamory",
    href: "/inclusion/enm-polyamory",
    copy: "Support for polyamory, open relationships, and consensual non-monogamy when the structure itself is not the problem.",
    issues: ["Jealousy and comparison", "Agreements under strain", "Hinge stress", "Questions about fit"],
    cta: "Explore ENM & polyamory support",
  },
  {
    title: "LGBTQIA+ affirming counselling",
    href: "/inclusion/lgbtqia",
    copy: "Affirming counselling where sexuality, gender, relationships, and everyday difficulties can be met directly.",
    issues: ["Identity and questioning", "Family or religious strain", "Minority stress", "Relationships and belonging"],
    cta: "Explore LGBTQIA+ support",
  },
];

const heroTopics = [
  "Kink & BDSM",
  "ENM & Polyamory",
  "LGBTQIA+",
];

const faqs = [
  {
    question: "What does inclusive counselling mean here?",
    answer:
      "It means counselling where diverse relationships, sexualities, identities, kink, BDSM, polyamory, and consensual non-monogamy can be spoken about plainly, without being treated as pathology or spectacle.",
  },
  {
    question: "Do I need to know which inclusion page fits me best?",
    answer:
      "No. The dedicated pages are there to make the site clearer. You can start with the broad inclusion page or make an enquiry directly if your situation crosses several areas.",
  },
  {
    question: "Is counselling only for problems related to identity or relationship structure?",
    answer:
      "No. Many people come for anxiety, grief, shame, conflict, loneliness, or self-understanding. Inclusive practice helps those conversations happen with enough context.",
  },
  {
    question: "Do you offer online inclusive counselling across Australia?",
    answer:
      "Yes. Vive Counselling is Perth-based and offers online counselling for adults across Australia.",
  },
];

function useSeo() {
  useEffect(() => {
    document.title = "Inclusive Counselling for Diverse Relationships, Sexualities and Identities | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Inclusive counselling for adults seeking thoughtful, non-shaming support around relationships, sexuality, identity, and emotional life. Perth-based, online across Australia."
      );
    }
  }, []);
}

function FaqSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      }}
    />
  );
}

export default function InclusivePractice() {
  useSeo();

  return (
    <main className="site-page inclusion-page">
      <FaqSchema />
      <section className="hero-section hero-bg--diagonal inclusion-hero">
        <Container>
          <div className="hero-top inclusion-hero__top">
            <div className="inclusion-hero__intro">
              <h1 className="hero-display inclusion-hero__title">
                Inclusive counselling for <em>diverse lives</em>.
              </h1>
              <p className="hero-copy-panel inclusion-hero__lede">
                Some clients want counselling where important parts of their life do not need to be defended,
                simplified, or translated before the real work can begin. This page explains the broader stance and
                helps you find the more specific counselling page that fits.
              </p>
            </div>

            <aside className="inclusion-hero__details" aria-label="Inclusive counselling topics">
              <div className="hero-detail-stack inclusion-hero__detail-stack">
                {heroTopics.map((item) => (
                  <p className="hero-detail-stack__item inclusion-hero__detail-item" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid inclusion-topics">
        <Container>
          <div className="site-grid__heading">
            <span className="site-eyebrow">Inclusion in practice</span>
            <h2>Support that does not ask you to edit yourself first</h2>
            <p>
              Difference is not treated as evidence of damage. Plain language is welcome, and complexity does not need
              to be flattened to fit the room. Relationships, sexualities, identities, kink, and non-monogamy can be
              part of the frame without taking over the whole story.
            </p>
          </div>
          <div className="site-card-grid">
            {topicPanels.map((topic) => (
              <article className="site-card inclusion-topics__card" key={topic.title}>
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
                <ul className="site-card__list">
                  {topic.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
                <Button href={topic.href} variant="secondary" className="inclusion-topics__button">
                  {topic.cta} <ArrowRight size={16} />
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-grid site-faq-section">
        <Container>
          <div className="site-faq-shell">
            <div className="site-faq-shell__header">
              <h2>Frequently asked questions</h2>
            </div>
            <div className="site-faq-list">
              {faqs.map((faq, index) => (
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
    </main>
  );
}
