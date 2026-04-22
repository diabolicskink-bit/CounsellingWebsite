import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import "../styles-lgbtqia.css";

type FaqItem = {
  question: string;
  answer: string;
};

const pageContent = {
  title: "LGBTQIA+ Affirming Counselling | Vive Counselling",
  meta:
    "Affirming counselling for LGBTQIA+ clients, including support with identity, relationships, shame, family strain, and mental health. Perth-based, online across Australia.",
  hero: {
    badge: "Queer-affirming counselling",
    title: "LGBTQIA+ affirming counselling",
    intro:
      "LGBTQIA+ affirming counselling means you do not need to explain yourself from scratch before therapy can begin. Gender, sexuality, relationships, and the rest of your life can be met with ordinary competence and care.",
  },
  firstSection: {
    eyebrow: "What people may want to bring",
    heading: "The issue may be identity, or it may be life",
    items: [
      "Identity, self-understanding, uncertainty, or questioning.",
      "Family rejection, family strain, or religious conflict.",
      "Shame, minority stress, or internalised criticism.",
      "Relationships, breakups, intimacy, visibility, and belonging.",
      "Gender exploration or navigating systems that do not fit well.",
      "Wanting a therapist who does not make hetero or cis assumptions.",
      "Mental health concerns where LGBTQIA+ context still matters.",
      "Ordinary life difficulties in a setting that feels affirming.",
    ],
  },
  stance: {
    eyebrow: "You do not need to explain yourself from scratch",
    heading: "Less time correcting the frame",
    paragraphs: [
      "Affirming counselling means there is no default assumption about your gender, sexuality, relationship structure, or what your life should look like. You should not need to spend half the session correcting the frame before getting to what matters.",
      "Inclusion shows up in ordinary language and practice: how questions are asked, what is not assumed, and whether your experience can be taken seriously without becoming a token or a teaching moment.",
    ],
  },
  individual: {
    eyebrow: "What affirming practice looks like here",
    heading: "Practical inclusion, not badge language",
    paragraphs: [
      "Respectful language matters. So does not forcing people into poor-fit categories, leaving room for trans and non-binary clients, and being careful with assumptions about partners, bodies, family, sex, faith, and visibility.",
      "You can also come when sexuality or gender is not the main reason for counselling. Anxiety, grief, relationship strain, shame, self-worth, burnout, and loneliness still deserve support in a setting where you do not have to scan for basic safety first.",
    ],
  },
  faqs: [
    {
      question: "Do I need to be out?",
      answer:
        "No. You do not need to be out to family, work, community, or anyone else to come to counselling. We can talk carefully about privacy, visibility, risk, and what feels possible.",
    },
    {
      question: "Can I come if sexuality or gender is not the main reason I want counselling?",
      answer:
        "Yes. LGBTQIA+ affirming counselling is not only for identity issues. It can support ordinary life difficulties without treating your identity as irrelevant or as the whole story.",
    },
    {
      question: "Do you work with trans and non-binary clients?",
      answer:
        "Yes. Trans and non-binary clients are welcome, including clients exploring gender, navigating systems, dealing with family strain, or seeking counselling for unrelated concerns.",
    },
    {
      question: "Can I talk about family rejection, religion, or shame?",
      answer:
        "Yes. Family rejection, religious conflict, shame, and internalised criticism can be discussed directly and at your pace.",
    },
  ] satisfies FaqItem[],
};

function useSeo() {
  useEffect(() => {
    document.title = pageContent.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageContent.meta);
    }
  }, []);
}

function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
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

export default function LgbtqiaCounselling() {
  useSeo();
  const { hero, firstSection, stance, individual, faqs } = pageContent;

  return (
    <main className="site-page inclusion-page lgbtqia-page">
      <FaqSchema faqs={faqs} />

      <section className="hero-section hero-bg--diagonal lgbtqia-page__hero">
        <Container>
          <div className="hero-top">
            <div className="lgbtqia-page__hero-heading">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <Link to="/inclusion">Inclusive practice</Link>
                <span>LGBTQIA+</span>
              </nav>
              <h1 className="hero-display lgbtqia-page__hero-title">{hero.title}</h1>
            </div>

            <div className="hero-copy-panel lgbtqia-page__hero-panel">
              <span className="hero-badge">{hero.badge}</span>
              <p>{hero.intro}</p>
              <div className="site-actions">
                <Button href="/contact">Make an enquiry about counselling</Button>
                <Button href="/inclusion" variant="secondary">
                  Inclusive counselling hub
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="site-highlight">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{stance.eyebrow}</span>
            <h2>{stance.heading}</h2>
          </div>
          <div className="rich-text">
            {stance.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-grid">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{firstSection.eyebrow}</span>
            <h2>{firstSection.heading}</h2>
          </div>
          <div className="site-check-panel site-check-panel--grid">
            {firstSection.items.map((item) => (
              <div className="check-item" key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-grid">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{individual.eyebrow}</span>
            <h2>{individual.heading}</h2>
          </div>
          <div className="rich-text">
            {individual.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              You can also <Link to="/working-with-joel">read more about working with Joel</Link>, check{" "}
              <Link to="/fees">online counselling fees and session details</Link>, or{" "}
              <Link to="/contact">make an enquiry about counselling</Link>.
            </p>
          </div>
        </Container>
      </section>

      <section className="site-grid">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">Questions</span>
            <h2>Common questions before starting</h2>
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
