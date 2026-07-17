import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-enm-polyamory.css";

const pageMetadata = getRouteMetadata("/inclusion/enm-polyamory");

const pageContent = {
  title: pageMetadata.title,
  meta: pageMetadata.description,

  hero: {
    badge: "ENM & polyamory counselling",
    intro:
      "You can talk about polyamory, open relationships and other forms of ethical non-monogamy in your own language. I start with what is happening in your life and what you want help with, not with my own view of how your relationships should work.",
    actions: {
      enquiryLabel: "Make an enquiry",
      enquiryHref: "/contact",
      inclusionLabel: "Back to Inclusion",
      inclusionHref: "/inclusion",
    },
  },

  sectionOne: {
    heading: "What might bring you here",
    paragraphs: [
      "Sometimes you can point to what changed. Opening a relationship has become a real decision, and you are not sure what you want or what happens if you disagree. An agreement was broken, or turned out not to mean the same thing to everyone. A new relationship changed the time and attention available elsewhere.",
      "There may not be one clear event. Jealousy has caught you off guard. Hinging is taking more time and emotional energy than you expected. You may be questioning an arrangement you once wanted.",
      "You and a partner may want different relationship structures: monogamy for one of you and polyamory for the other. A difference that seemed manageable earlier can become harder to live with as the relationship deepens.",
    ],
  },

  sectionTwo: {
    heading: "How much of this is about non-monogamy?",
    main:
      "Your relationships do not have to become the focus of counselling just because they are non-monogamous. Non-monogamy may matter when decisions about family or disclosure affect more than one relationship. Or you may be coming to talk about anxiety, burnout, shame or grief. Your relationships may still need to be part of the conversation so you can talk about what is happening without filtering out part of your life.",
    position: {
      lead:
        "I do not think either monogamy or non-monogamy is inherently better. I will not try to convince you that one is better, and I will not steer the work in either direction.",
      distinction:
        "Monogamy will not be treated as something to outgrow. Non-monogamy will not be treated as a moral failing.",
      detail:
        "I have lived in both monogamous and non-monogamous relationships. That experience helps me approach the work without treating either one as the standard. My focus is the person in front of me: what you want, what you are unsure about and what is actually happening in your life.",
    },
  },
};

export default function EnmPolyamoryCounselling() {
  useDocumentMetadata(pageContent.title, pageContent.meta);
  const { hero, sectionOne, sectionTwo } = pageContent;

  return (
    <main className="site-page enm-page">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-section hero-bg--default enm-page__hero">
        <Container className="enm-page__hero-inner">
          <div className="hero-top enm-page__hero-top">
            <div className="enm-page__hero-heading">
              <h1 className="hero-badge">{hero.badge}</h1>
              <p className="hero-display">
                <span className="enm-page__hero-line">Your <em>relationships</em>,</span>
                <span className="enm-page__hero-line">taken <em>seriously</em>.</span>
              </p>
              <div className="hero-copy-panel enm-page__hero-copy">
                <p>{hero.intro}</p>
              </div>
            </div>
            <nav className="enm-page__hero-actions" aria-label="Page actions">
              <div className="enm-page__hero-action-list">
                <Button href={hero.actions.enquiryHref} variant="primary">
                  {hero.actions.enquiryLabel} <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button href={hero.actions.inclusionHref} variant="secondary">
                  <ArrowLeft size={16} aria-hidden="true" /> {hero.actions.inclusionLabel}
                </Button>
              </div>
            </nav>
          </div>
        </Container>
      </section>

      <section className="enm-page__reasons" aria-labelledby="enm-reasons-heading">
        <Container className="enm-page__reasons-inner">
          <h2 id="enm-reasons-heading">{sectionOne.heading}</h2>
          <div className="enm-page__reasons-panel">
            {sectionOne.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-highlight enm-page__focus" aria-labelledby="enm-focus-heading">
        <Container>
          <div className="site-split enm-page__focus-split">
            <div className="section-heading enm-page__focus-intro">
              <h2 id="enm-focus-heading">{sectionTwo.heading}</h2>
              <p className="section-heading__copy site-ruled-paragraph">{sectionTwo.main}</p>
            </div>

            <aside
              className="site-card enm-page__focus-position"
              aria-labelledby="enm-position-heading"
            >
              <h3 id="enm-position-heading">Where I stand</h3>
              <div className="enm-page__focus-position-body">
                <p>{sectionTwo.position.lead}</p>
                <p>{sectionTwo.position.distinction}</p>
                <p>{sectionTwo.position.detail}</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
