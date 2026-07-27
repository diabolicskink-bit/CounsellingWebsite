import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-enm-polyamory.css";

type ReasonItem = {
  heading: string;
  body: string;
};

const pageMetadata = getRouteMetadata("/polyamory-enm-counselling");

const pageContent = {
  title: pageMetadata.title,
  meta: pageMetadata.description,

  hero: {
    badge: "Polyamory and ethical non-monogamy counselling and therapy",
    title: {
      lineOne: "Your relationships,",
      lineTwo: "taken seriously.",
    },
    actions: {
      enquiryLabel: "Make an enquiry",
      enquiryHref: routeHref(publicRoutePaths.contact),
      inclusionLabel: "Back to inclusive counselling",
      inclusionHref: routeHref(publicRoutePaths.inclusion),
    },
  },

  reasons: {
    heading: "What might bring you here",
    items: [
      {
        heading: "Opening, agreements and change",
        body:
          "Opening a relationship has become a real decision, and you are not sure what you want or what happens if you disagree. An agreement was broken, or turned out not to mean the same thing to everyone. A new relationship changed the time and attention available elsewhere.",
      },
      {
        heading: "Jealousy, time and hinging",
        body:
          "Jealousy has caught you off guard. Hinging is taking more time and emotional energy than expected. You may be questioning an arrangement you once wanted.",
      },
      {
        heading: "Different relationship structures",
        body:
          "You and a partner want different relationship structures: monogamy for one of you and polyamory for the other. A difference that seemed manageable earlier has become harder to live with as the relationship deepens.",
      },
    ] satisfies ReasonItem[],
  },

  focus: {
    heading: "How much of this is about non-monogamy?",
    body:
      "Your relationships do not have to become the focus of counselling just because they are non-monogamous. Non-monogamy may matter when decisions about family or disclosure affect more than one relationship. Or you may be coming to talk about anxiety, burnout, shame or grief. Your relationships can still be part of the conversation without becoming the explanation for everything.",
  },

  position: {
    heading: "Where I stand.",
    lead:
      "I do not think either monogamy or non-monogamy is inherently better, and I will not steer the work in either direction.",
    distinction:
      "Monogamy is not something to outgrow. Non-monogamy is not a moral failing.",
    detail:
      "I have lived in both monogamous and non-monogamous relationships. That experience helps me approach the work without treating either one as the standard. My focus is what you want, what you are unsure about and what is actually happening in your life.",
  },
};

export default function EnmPolyamoryCounselling() {
  useDocumentMetadata(pageContent.title, pageContent.meta);
  const { hero, reasons, focus, position } = pageContent;

  return (
    <main className="site-page enm-page">
      <section className="hero-section enm-page__hero">
        <Container>
          <div className="enm-page__hero-copy">
            <h1 className="hero-badge">{hero.badge}</h1>
            <p className="hero-display">
              <span>{hero.title.lineOne}</span>
              <span>
                taken <em>seriously.</em>
              </span>
            </p>

            <nav className="enm-page__hero-actions" aria-label="Page actions">
              <Link className="enm-page__hero-action" to={hero.actions.enquiryHref}>
                <span>{hero.actions.enquiryLabel}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="enm-page__hero-action" to={hero.actions.inclusionHref}>
                <ArrowLeft size={18} aria-hidden="true" />
                <span>{hero.actions.inclusionLabel}</span>
              </Link>
            </nav>
          </div>
        </Container>
      </section>

      <section className="enm-page__reasons" aria-labelledby="enm-reasons-heading">
        <Container className="enm-page__reasons-layout">
          <h2 className="enm-page__reasons-title" id="enm-reasons-heading">
            {reasons.heading}
          </h2>

          <ol className="enm-page__reasons-list">
            {reasons.items.map((item) => (
              <li key={item.heading}>
                <h3>{item.heading}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="enm-page__focus" aria-labelledby="enm-focus-heading">
        <Container className="enm-page__focus-layout">
          <h2 className="enm-page__focus-title" id="enm-focus-heading">
            {focus.heading}
          </h2>
          <p className="enm-page__focus-copy">{focus.body}</p>
        </Container>
      </section>

      <section className="enm-page__position" aria-labelledby="enm-position-heading">
        <Container className="enm-page__position-layout">
          <h2 className="enm-page__position-title" id="enm-position-heading">
            {position.heading}
          </h2>
          <div className="enm-page__position-copy">
            <p>{position.lead}</p>
            <p className="enm-page__position-distinction">{position.distinction}</p>
            <p>{position.detail}</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
