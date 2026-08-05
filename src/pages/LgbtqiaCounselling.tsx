import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-lgbtqia.css";
import SpecialistCounsellingHero from "./SpecialistCounsellingHero";

type RecognitionItem = {
  title: string;
  body: string;
};

const pageMetadata = getRouteMetadata("/lgbtqia-affirming-counselling");

const pageContent = {
  title: pageMetadata.title,
  meta: pageMetadata.description,

  hero: {
    eyebrow: "LGBTQIA+ affirming counselling and therapy",
    title: {
      lineOne: "Who you are",
      lineTwo: "not up for debate.",
    },
    actions: {
      enquiryLabel: "Make an enquiry",
      enquiryHref: routeHref(publicRoutePaths.contact),
      inclusionLabel: "Back to inclusive counselling",
      inclusionHref: routeHref(publicRoutePaths.inclusion),
    },
  },

  recognition: {
    heading: "Where does sexuality or gender fit?",
    items: [
      {
        title: "It may be the question.",
        body:
          "You may be finding words for your sexuality or gender, thinking about coming out, or looking again at something you thought was settled. You can also be clear about who you are and still be unsure what to do next.",
      },
      {
        title: "It may be the context.",
        body:
          "An important relationship has changed, or family, faith or community has become harder to remain part of. The work can stay with the conflict, loss or choices involved without treating sexuality or gender as the problem.",
      },
      {
        title: "It may barely matter.",
        body:
          "You may want help with anxiety, grief, burnout or trouble in a relationship. Sexuality or gender does not need to become the subject simply because it is part of your life.",
      },
    ] satisfies RecognitionItem[],
  },

  assumptions: {
    heading: "You are not there to manage the therapist.",
    introduction:
      "Counselling can stay with what is happening in your life. You should not have to debate who you are, explain the basics or work around a counsellor’s discomfort.",
    examplesIntroduction: "What that can look like",
    examples: [
      "Arguing against assumptions about your sexuality based on your current partner.",
      "Explaining why asexuality is not a symptom or a problem to solve.",
      "Keeping the conversation going when sexuality or gender makes them uncomfortable.",
    ],
  },

  disclosure: {
    heading: "Who to tell, and when",
    position: "More disclosure is not automatically the goal.",
    body: [
      "Being open may make sense in one part of your life and carry real risk in another. What is safe or useful can differ across relationships, family, work, faith and community.",
      "You can think through whether, when and how to tell someone, and what each choice might change. Questioning or trying out language does not require a conclusion on a timetable.",
      "I will not assume what should happen with family, faith, culture or community. Separation and reconciliation are not measures of progress.",
    ],
  },
};

export default function LgbtqiaCounselling() {
  useDocumentMetadata(pageContent.title, pageContent.meta);
  const { hero, recognition, assumptions, disclosure } = pageContent;

  return (
    <main className="site-page inclusion-page lgbtqia-page">
      <SpecialistCounsellingHero
        className="lgbtqia-page__hero"
        eyebrow={hero.eyebrow}
        primaryAction={{
          href: hero.actions.enquiryHref,
          label: hero.actions.enquiryLabel,
        }}
        secondaryAction={{
          href: hero.actions.inclusionHref,
          label: hero.actions.inclusionLabel,
        }}
        title={
          <>
            <span>{hero.title.lineOne}</span>
            <span>
              is <em>{hero.title.lineTwo}</em>
            </span>
          </>
        }
      />

      <section
        className="lgbtqia-page__recognition site-section-warm"
        aria-labelledby="lgbtqia-recognition-heading"
      >
        <Container>
          <h2 className="lgbtqia-page__recognition-title" id="lgbtqia-recognition-heading">
            {recognition.heading}
          </h2>

          <ol className="lgbtqia-page__recognition-list">
            {recognition.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className="lgbtqia-page__assumptions"
        aria-labelledby="lgbtqia-assumptions-heading"
      >
        <Container className="lgbtqia-page__assumptions-layout">
          <div className="lgbtqia-page__assumptions-principle">
            <h2 className="lgbtqia-page__assumptions-title" id="lgbtqia-assumptions-heading">
              {assumptions.heading}
            </h2>
            <p className="lgbtqia-page__assumptions-introduction">
              {assumptions.introduction}
            </p>
          </div>

          <aside className="lgbtqia-page__assumptions-examples" aria-label="Examples">
            <p className="lgbtqia-page__assumptions-label">
              {assumptions.examplesIntroduction}
            </p>
            <ul className="lgbtqia-page__assumptions-list">
              {assumptions.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section
        className="lgbtqia-page__disclosure"
        aria-labelledby="lgbtqia-disclosure-heading"
      >
        <Container className="lgbtqia-page__disclosure-layout">
          <div className="lgbtqia-page__disclosure-lead">
            <h2 className="lgbtqia-page__disclosure-title" id="lgbtqia-disclosure-heading">
              {disclosure.heading}
            </h2>
            <p className="lgbtqia-page__disclosure-position">{disclosure.position}</p>
          </div>

          <div className="lgbtqia-page__disclosure-copy">
            {disclosure.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
