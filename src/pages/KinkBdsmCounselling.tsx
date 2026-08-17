import { Fragment } from "react";
import Container from "../components/Container";
import ContactInvitation from "../components/ContactInvitation";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-kink-bdsm.css";
import SpecialistCounsellingHero from "./SpecialistCounsellingHero";

type MisreadItem = {
  title: string;
  body: string;
};

/** One run of the proportion sentence. Marked runs are the reasons someone books. */
type ProportionSegment = {
  text: string;
  marked?: boolean;
};

const kinkMetadata = getRouteMetadata(publicRoutePaths.kinkBdsm);

const kinkPageContent = {
  title: kinkMetadata.title,
  meta: kinkMetadata.description,

  hero: {
    eyebrow: "Kink-aware counselling and therapy",
    title: {
      before: "Regular therapy for ",
      emphasis: "kinky people.",
    },
    primaryAction: {
      label: "Make an enquiry",
      href: publicRoutePaths.contact,
    },
    secondaryAction: {
      label: "Back to inclusive counselling",
      href: publicRoutePaths.inclusion,
    },
  },

  lexicon: {
    heading: "No translation needed.",
    label: "You do not have to explain",
    terms: ["D/s", "power exchange", "drop", "protocol", "fetish"],
    answer: "I already understand the common language, practices and dynamics.",
    note:
      "Kink can be part of an identity, a relationship, a role, a practice or something occasional. Its place in counselling depends on why you are there.",
  },

  misread: {
    heading: "When therapy gets kink wrong.",
    items: [
      {
        title: "Kink becomes the diagnosis.",
        body:
          "Kink is sometimes treated as evidence of trauma, abuse or a problem to be fixed. A counsellor may become uncomfortable, overly interested or unable to move past it. The session then becomes about managing their reaction or explaining the basics.",
      },
      {
        title: "Kink becomes untouchable.",
        body:
          "The opposite mistake is deciding that every kink experience must be healthy or consensual. Something that did not feel okay can be taken seriously without treating kink itself as the problem.",
      },
    ] satisfies MisreadItem[],
  },

  more: {
    heading: "More than kink.",
    lead: "Kink may be why you want counselling, but often it is not.",
    proportion: [
      { text: "Anxiety", marked: true },
      { text: ", " },
      { text: "grief", marked: true },
      { text: ", " },
      { text: "work", marked: true },
      { text: ", " },
      { text: "family", marked: true },
      { text: " or " },
      { text: "a relationship", marked: true },
      { text: " can be the reason you came, with " },
      { text: "kink", marked: true },
      { text: " simply part of your life." },
    ] satisfies ProportionSegment[],
    relevance: {
      label: "When kink is relevant",
      items: [
        "A dynamic that has changed",
        "Different wants between partners",
        "Shame",
        "Disclosure",
        "Trying to understand something that happened",
      ],
    },
    closing: "It does not have to become the explanation for everything else.",
  },
};

export default function KinkBdsmCounselling() {
  useDocumentMetadata(kinkPageContent.title, kinkPageContent.meta);
  const { hero, lexicon, misread, more } = kinkPageContent;

  return (
    <main className="site-page kink-page">
      <SpecialistCounsellingHero
        className="kink-page__hero"
        eyebrow={hero.eyebrow}
        primaryAction={hero.primaryAction}
        secondaryAction={hero.secondaryAction}
        title={
          <>
            {hero.title.before}
            <em>{hero.title.emphasis}</em>
          </>
        }
      />

      {/* The definition column of this glossary is deliberately left empty. */}
      <section className="kink-lexicon" aria-labelledby="kink-lexicon-heading">
        <Container className="kink-lexicon__layout">
          <h2 className="kink-lexicon__title" id="kink-lexicon-heading">
            {lexicon.heading}
          </h2>

          <div className="kink-lexicon__index">
            <p className="kink-lexicon__label" id="kink-lexicon-label">
              {lexicon.label}
            </p>
            <ul className="kink-lexicon__terms" aria-labelledby="kink-lexicon-label">
              {lexicon.terms.map((term) => (
                <li className="kink-lexicon__term" key={term}>
                  <span className="kink-lexicon__term-word">{term}</span>
                  <span className="kink-lexicon__term-leader" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>

          <div className="kink-lexicon__answer">
            <p className="kink-lexicon__answer-line">{lexicon.answer}</p>
            <p className="kink-lexicon__answer-note site-reading">{lexicon.note}</p>
          </div>
        </Container>
      </section>

      <section className="kink-misread" aria-labelledby="kink-misread-heading">
        <Container className="kink-misread__layout">
          <h2 className="kink-misread__title" id="kink-misread-heading">
            {misread.heading}
          </h2>

          <ol className="kink-misread__pair">
            {misread.items.map((item, index) => (
              <li className="kink-misread__item" key={item.title}>
                <span className="kink-misread__marker" aria-hidden="true">
                  <span className="kink-misread__index">{`0${index + 1}`}</span>
                  <span className="kink-misread__rule" />
                </span>
                <h3 className="kink-misread__item-title">{item.title}</h3>
                <p className="kink-misread__item-copy site-reading">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="kink-more" aria-labelledby="kink-more-heading">
        <Container className="kink-more__layout">
          <div className="kink-more__opening">
            <h2 className="kink-more__title" id="kink-more-heading">
              {more.heading}
            </h2>
            <p className="kink-more__lead">{more.lead}</p>
          </div>

          {/* Every reason carries the same weight, kink included. That is the point. */}
          <p className="kink-more__proportion">
            {more.proportion.map((segment, index) =>
              segment.marked ? (
                <span className="kink-more__mark" key={`${segment.text}-${index}`}>
                  {segment.text}
                </span>
              ) : (
                <Fragment key={`${segment.text}-${index}`}>{segment.text}</Fragment>
              ),
            )}
          </p>

          <div className="kink-more__relevance">
            <p className="kink-more__relevance-label" id="kink-relevance-label">
              {more.relevance.label}
            </p>
            <ul className="kink-more__relevance-list" aria-labelledby="kink-relevance-label">
              {more.relevance.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="kink-more__closing">{more.closing}</p>
        </Container>
      </section>

      <ContactInvitation />
    </main>
  );
}
