import type { ReactNode } from "react";
import Container from "../components/Container";
import DevPageHero from "../components/DevPageHero";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-codex-tb.css";

type CounsellingTopic = {
  id: string;
  title: string;
  copy: string;
};

type VariantFrameProps = {
  id: string;
  option: string;
  title: string;
  children: ReactNode;
};

const counsellingTopics: CounsellingTopic[] = [
  {
    id: "low-mood",
    title: "Low mood and depression",
    copy: "Heaviness, numbness, hopelessness, or a flatness that does not lift and is hard to explain. Feeling distant from yourself, from other people, or from things that used to matter.",
  },
  {
    id: "anxiety",
    title: "Anxiety",
    copy: "A mind that will not settle. Going over the same things, bracing for things that have not happened yet, or carrying a background worry that is hard to name or put down.",
  },
  {
    id: "relationships",
    title: "Relationships and attachment",
    copy: "Feeling disconnected, stuck in the same arguments, or unable to get as close as you want to be. Ongoing conflict, or patterns in how you attach, trust, or pull away that keep repeating regardless of who you are with.",
  },
  {
    id: "shame",
    title: "Shame and self-worth",
    copy: "Harsh self-judgement, a persistent sense of not being enough, or something about yourself that feels too difficult or too exposing to say.",
  },
  {
    id: "trauma",
    title: "Trauma, abuse, and neglect",
    copy: "Experiences of harm, control, or neglect that left a mark on how safe the world feels, how much you trust people, how close you let yourself get, or how you move through ordinary life.",
  },
  {
    id: "intense-emotions",
    title: "Intense emotions",
    copy: "Emotions that hit hard and are slow to come down, often with a sense of being too much. Closeness that can shift to distance without much warning.",
  },
];

const topicRows = [
  counsellingTopics.slice(0, 2),
  counsellingTopics.slice(2, 4),
  counsellingTopics.slice(4, 6),
];

function VariantFrame({ id, option, title, children }: VariantFrameProps) {
  const headingId = `codex-tb-${id}`;

  return (
    <section className="codex-tb-variant" aria-labelledby={headingId}>
      <Container className="codex-tb-variant__label">
        <span>{option}</span>
        <h2 id={headingId}>{title}</h2>
      </Container>
      {children}
    </section>
  );
}

function TopicBlock({ topic }: { topic: CounsellingTopic }) {
  return (
    <>
      <h4>{topic.title}</h4>
      <p>{topic.copy}</p>
    </>
  );
}

function IndexColumnsSection() {
  return (
    <section className="tb-section tb-section--index-columns" aria-label="Simple index columns section">
      <Container className="tb-index-columns">
        <div className="tb-section-intro tb-index-columns__intro">
          <h3>What counselling is for.</h3>
          <p>A compact directory shape for visitors who scan first and read once something catches.</p>
        </div>
        <div className="tb-index-columns__topics">
          {counsellingTopics.map((topic) => (
            <article className="tb-index-topic" key={topic.id}>
              <TopicBlock topic={topic} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function IndexRowsSection() {
  return (
    <section className="tb-section tb-section--index-rows" aria-label="Topic rows section">
      <Container className="tb-index-rows">
        <div className="tb-section-intro tb-index-rows__intro">
          <h3>What counselling is for.</h3>
          <p>A horizontal reading path for people who want to compare one starting point against another.</p>
        </div>
        <div className="tb-index-rows__list">
          {topicRows.map((row) => (
            <section className="tb-index-row" key={row.map((topic) => topic.id).join("-")}>
              <div className="tb-index-row__topics">
                {row.map((topic) => (
                  <article className="tb-index-row__topic" key={topic.id}>
                    <TopicBlock topic={topic} />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}

function IndexLedgerSection() {
  return (
    <section className="tb-section tb-section--index-ledger" aria-label="Open index ledger section">
      <Container className="tb-index-ledger">
        <div className="tb-section-intro tb-index-ledger__intro">
          <h3>What counselling is for.</h3>
          <p>A quieter index, with enough structure to scan and enough room for the words to land.</p>
        </div>
        <div className="tb-index-ledger__list">
          {counsellingTopics.map((topic) => (
            <article className="tb-index-ledger__item" key={topic.id}>
              <TopicBlock topic={topic} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CedarSplitSection() {
  return (
    <section className="tb-section tb-section--cedar-split" aria-label="Warm split section">
      <Container className="tb-cedar-split">
        <div className="tb-cedar-intro">
          <h3>What counselling is for.</h3>
          <p>Not only crisis. Not only a diagnosis. Often the place where the pattern finally gets enough attention.</p>
        </div>
        <div className="tb-cedar-split__items">
          {counsellingTopics.map((topic) => (
            <section className="tb-cedar-cell" key={topic.id}>
              <TopicBlock topic={topic} />
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CedarIndexSection() {
  return (
    <section className="tb-section tb-section--cedar-index" aria-label="Cedar clean index section">
      <Container className="tb-cedar-index">
        <div className="tb-cedar-intro tb-cedar-index__intro">
          <h3>What counselling is for.</h3>
          <p>The index idea, but with the cedar field doing more of the emotional work.</p>
        </div>
        <div className="tb-cedar-index__topics">
          {counsellingTopics.map((topic) => (
            <article className="tb-cedar-index__topic" key={topic.id}>
              <TopicBlock topic={topic} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CedarRowsSection() {
  return (
    <section className="tb-section tb-section--cedar-rows" aria-label="Cedar ruled rows section">
      <Container className="tb-cedar-rows">
        <div className="tb-cedar-intro tb-cedar-rows__intro">
          <h3>What counselling is for.</h3>
          <p>A darker, more editorial direction that keeps the topics open and ruled instead of boxed.</p>
        </div>
        <div className="tb-cedar-rows__list">
          {counsellingTopics.map((topic) => (
            <article className="tb-cedar-row" key={topic.id}>
              <TopicBlock topic={topic} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function CodexTB() {
  useDocumentMetadata(
    "Codex TB | Counselling Section Variants",
    "Index and cedar section variations for the Vive Counselling topics area.",
  );

  return (
    <main className="site-page codex-tb-page">
      <DevPageHero
        badge="Codex TB"
        title="Index and cedar section variants."
        description="Three index directions and three cedar directions for the Home page area headed What counselling is for."
      />

      <div className="codex-tb-gallery">
        <VariantFrame id="index-columns" option="Index 01" title="Clean columns">
          <IndexColumnsSection />
        </VariantFrame>

        <VariantFrame id="index-rows" option="Index 02" title="Topic rows">
          <IndexRowsSection />
        </VariantFrame>

        <VariantFrame id="index-ledger" option="Index 03" title="Open ledger">
          <IndexLedgerSection />
        </VariantFrame>

        <VariantFrame id="cedar-split" option="Cedar 01" title="Warm split">
          <CedarSplitSection />
        </VariantFrame>

        <VariantFrame id="cedar-index" option="Cedar 02" title="Cedar clean index">
          <CedarIndexSection />
        </VariantFrame>

        <VariantFrame id="cedar-rows" option="Cedar 03" title="Cedar ruled rows">
          <CedarRowsSection />
        </VariantFrame>
      </div>
    </main>
  );
}
