import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";

const topicPanels = [
  {
    title: "Kink & BDSM-aware counselling",
    href: "/inclusion/kink-bdsm",
    copy: "Individual counselling where kink, BDSM, D/s, and power exchange can be named without awkwardness, moralising, or basic translation work.",
    issues: ["Shame or secrecy", "Trust and surrender", "Boundaries and consent", "Conflict inside a dynamic"],
  },
  {
    title: "Counselling for ENM & polyamory",
    href: "/inclusion/enm-polyamory",
    copy: "Support for people in polyamory, open relationships, and consensual non-monogamy, including when the structure itself is not the problem.",
    issues: ["Jealousy and comparison", "Agreements under strain", "Hinge stress", "Questions about fit"],
  },
  {
    title: "LGBTQIA+ affirming counselling",
    href: "/inclusion/lgbtqia",
    copy: "Affirming counselling for LGBTQIA+ clients where sexuality, gender, relationships, visibility, and ordinary life difficulties can be met directly.",
    issues: ["Identity and questioning", "Family or religious strain", "Minority stress", "Relationships and belonging"],
  },
];

const practiceBlocks = [
  {
    title: "Thoughtful and non-pathologising",
    copy: "Difference is not treated as evidence of damage. The work is to understand what is actually happening in your life.",
  },
  {
    title: "Direct and grounded",
    copy: "Plain language is welcome. Counselling can be careful without becoming vague, evasive, or overly polished.",
  },
  {
    title: "Respectful of real complexity",
    copy: "Relationships, sexualities, identities, kink, and non-monogamy can be part of the frame without taking over the whole story.",
  },
];

const heroSignals = [
  {
    title: "Relationships",
    copy: "Diverse relationship structures can be part of the context without being treated as the problem.",
  },
  {
    title: "Sexuality and identity",
    copy: "Gender, sexuality, desire, visibility, and belonging can be named plainly and respectfully.",
  },
  {
    title: "Kink and consent",
    copy: "Kink, BDSM, power exchange, and consent can be discussed without moralising or spectacle.",
  },
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
          <div className="hero-top">
            <h1 className="hero-display">
              Inclusive counselling for <em>diverse lives</em>.
            </h1>
            <div className="hero-copy-panel inclusion-hero__copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>Inclusive practice</span>
              </nav>
              <span className="hero-badge">Inclusive counselling</span>
              <p>
                Some clients want counselling where important parts of their life do not need to be defended,
                simplified, or translated before the real work can begin. This page explains the broader stance and
                helps you find the more specific counselling page that fits.
              </p>
              <div className="site-actions">
                <Button href="/contact">Make an enquiry about counselling</Button>
                <Button href="/approach" variant="secondary">
                  Read more about my counselling approach
                </Button>
              </div>
            </div>
          </div>
          <div className="hero-principles-strip">
            {heroSignals.map((signal) => (
              <div className="hero-principle-item" key={signal.title}>
                <h3>{signal.title}</h3>
                <p>{signal.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-grid">
        <Container>
          <div className="site-grid__heading">
            <span className="site-eyebrow">Choose a clearer starting point</span>
            <h2>Dedicated counselling pages for specific contexts</h2>
          </div>
          <div className="site-card-grid">
            {topicPanels.map((topic) => (
              <Link className="site-card site-card--link" to={topic.href} key={topic.title}>
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
                <ul className="site-card__list">
                  {topic.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
                <span className="site-card__action">
                  Read about {topic.title.toLowerCase()} <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-highlight">
        <Container>
          <div className="site-grid__heading">
            <span className="site-eyebrow">What inclusive practice means here</span>
            <h2>A way of working, not a slogan</h2>
          </div>
          <div className="site-card-grid">
            {practiceBlocks.map((block) => (
              <article className="site-card" key={block.title}>
                <div className="site-card__icon">
                  <CheckCircle2 size={20} />
                </div>
                <h3>{block.title}</h3>
                <p>{block.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-grid">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">Questions</span>
            <h2>Before getting in touch</h2>
          </div>
          <div className="site-faq-list">
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div>
            <h2>A short first message is enough.</h2>
            <p>
              You can name what brings you to counselling, whether online sessions suit you, and anything that would
              help first contact feel easier.
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
