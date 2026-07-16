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
      "You can talk about polyamory, open relationships and other forms of ethical non-monogamy in your own language. I start with what is happening for you, not how your relationships should look. We can look at jealousy, agreements, pressure and uncertainty without assuming the structure explains everything.",
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
      "You may be considering opening a relationship, or hearing the idea from a partner before you know what you think — or how much room you have to say it.",
      "You may already be non-monogamous and something has shifted. Jealousy feels sharper than you expected. An agreement means something different to each person, or something has happened outside it. A breakup or new relationship has changed the time, attention, or reassurance available elsewhere.",
      "You may be carrying too much between relationships: managing messages, anticipating reactions, and trying to keep everyone steady while your own response gets postponed. Or you may care deeply about someone whose idea of a workable relationship does not match yours.",
    ],
  },
};

export default function EnmPolyamoryCounselling() {
  useDocumentMetadata(pageContent.title, pageContent.meta);
  const { hero, sectionOne } = pageContent;

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
    </main>
  );
}
