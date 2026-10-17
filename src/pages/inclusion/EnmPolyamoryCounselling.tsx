import Container from "../../components/Container";
import ContactInvitation from "../../components/ContactInvitation";
import { getRouteMetadata } from "../../data/routeMetadata";
import { publicRoutePaths } from "../../data/routes";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import "./specialist-sections.css";
import "./enm-polyamory.css";
import SpecialistCounsellingHero from "./SpecialistCounsellingHero";

const pageMetadata = getRouteMetadata(publicRoutePaths.enmPolyamory);

const pageContent = {
  hero: {
    eyebrow: "Polyamory and ethical non-monogamy counselling and therapy",
    title: (
      <>
        <span>Your relationships,</span>
        <span>
          taken <em>seriously.</em>
        </span>
      </>
    ),
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
    ],
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
  useDocumentMetadata(pageMetadata.title, pageMetadata.description);
  const { hero, reasons, focus, position } = pageContent;

  return (
    <main className="site-page enm-page">
      <SpecialistCounsellingHero eyebrow={hero.eyebrow} title={hero.title} />

      <section className="site-section-warm" aria-labelledby="enm-reasons-heading">
        <Container className="specialist-split">
          <h2 className="specialist-title enm-page__reasons-title" id="enm-reasons-heading">
            {reasons.heading}
          </h2>

          <ol className="enm-page__reasons-list">
            {reasons.items.map((item) => (
              <li key={item.heading}>
                <h3>{item.heading}</h3>
                <p className="site-reading">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="specialist-section-sage" aria-labelledby="enm-focus-heading">
        <Container className="specialist-split">
          <h2 className="specialist-title enm-page__focus-title" id="enm-focus-heading">
            {focus.heading}
          </h2>
          <p className="enm-page__focus-copy site-reading">{focus.body}</p>
        </Container>
      </section>

      <section className="specialist-section-dark" aria-labelledby="enm-position-heading">
        <Container className="specialist-split">
          <h2 className="specialist-title enm-page__position-title" id="enm-position-heading">
            {position.heading}
          </h2>
          <div className="enm-page__position-copy">
            <p className="site-reading">{position.lead}</p>
            <p className="enm-page__position-distinction">{position.distinction}</p>
            <p className="site-reading">{position.detail}</p>
          </div>
        </Container>
      </section>

      <ContactInvitation />
    </main>
  );
}
