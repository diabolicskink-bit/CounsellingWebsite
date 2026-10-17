import Container from "../../components/Container";
import ContactInvitation from "../../components/ContactInvitation";
import { getRouteMetadata } from "../../data/routeMetadata";
import { publicRoutePaths } from "../../data/routes";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import "./specialist-sections.css";
import "./kink-bdsm.css";
import SpecialistCounsellingHero from "./SpecialistCounsellingHero";

const pageMetadata = getRouteMetadata(publicRoutePaths.kinkBdsm);

const pageContent = {
  hero: {
    eyebrow: "Kink-aware counselling and therapy",
    title: (
      <>
        Regular therapy for <em>kinky people.</em>
      </>
    ),
  },
  fluency: {
    heading: "No translation needed.",
    body: [
      "You do not have to explain what D/s, power exchange, drop, protocol, fetish or common practices are, or why someone might want them. I already understand the common language, practices and dynamics.",
      "Kink can be part of an identity, a relationship, a role, a practice or something occasional. Its place in counselling depends on why you are there.",
    ],
  },
  misread: {
    heading: "When therapy gets kink wrong.",
    body: [
      "Kink is sometimes treated as evidence of trauma, abuse or a problem to be fixed. A counsellor may become uncomfortable, overly interested or unable to move past it. The session then becomes about managing their reaction or explaining the basics.",
      "The opposite mistake is deciding that every kink experience must be healthy or consensual. Something that did not feel okay can be taken seriously without treating kink itself as the problem.",
    ],
  },
  more: {
    heading: "More than kink.",
    body: [
      "Kink may be why you want counselling, but often it is not. Anxiety, grief, work, family or a relationship can be the reason you came, with kink simply part of your life.",
      "When kink is relevant, it might involve a dynamic that has changed, different wants between partners, shame, disclosure or trying to understand something that happened. It does not have to become the explanation for everything else.",
    ],
  },
};

export default function KinkBdsmCounselling() {
  useDocumentMetadata(pageMetadata.title, pageMetadata.description);
  const { hero, fluency, misread, more } = pageContent;

  return (
    <main className="site-page kink-page">
      <SpecialistCounsellingHero eyebrow={hero.eyebrow} title={hero.title} />

      <section className="specialist-section-sage" aria-labelledby="kink-fluency-heading">
        <Container className="specialist-split">
          <h2 className="specialist-title kink-page__fluency-title" id="kink-fluency-heading">
            {fluency.heading}
          </h2>
          <div className="kink-page__fluency-copy">
            {fluency.body.map((paragraph) => (
              <p className="site-reading" key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-section-warm" aria-labelledby="kink-misread-heading">
        <Container className="specialist-split">
          <h2 className="specialist-title kink-page__misread-title" id="kink-misread-heading">
            {misread.heading}
          </h2>
          <div className="kink-page__misread-copy">
            {misread.body.map((paragraph) => (
              <p className="site-reading" key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="specialist-section-dark" aria-labelledby="kink-more-heading">
        <Container className="specialist-split">
          <h2 className="specialist-title kink-page__more-title" id="kink-more-heading">
            {more.heading}
          </h2>
          <div className="kink-page__more-copy">
            {more.body.map((paragraph) => (
              <p className="site-reading" key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <ContactInvitation />
    </main>
  );
}
