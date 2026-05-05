import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import DevPageHero from "../components/DevPageHero";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-opus-tb.css";

type Topic = {
  title: string;
  copy: string;
};

type VariantFrameProps = {
  id: string;
  option: string;
  title: string;
  children: ReactNode;
};

const topics: Topic[] = [
  {
    title: "Low mood and depression",
    copy: "Heaviness, numbness, hopelessness, or a flatness that does not lift and is hard to explain. Feeling distant from yourself, from other people, or from things that used to matter.",
  },
  {
    title: "Anxiety",
    copy: "A mind that will not settle. Going over the same things, bracing for things that have not happened yet, or carrying a background worry that is hard to name or put down.",
  },
  {
    title: "Relationships and attachment",
    copy: "Feeling disconnected, stuck in the same arguments, or unable to get as close as you want to be. Ongoing conflict, or patterns in how you attach, trust, or pull away that keep repeating regardless of who you are with.",
  },
  {
    title: "Shame and self-worth",
    copy: "Harsh self-judgement, a persistent sense of not being enough, or something about yourself that feels too difficult or too exposing to say.",
  },
  {
    title: "Trauma, abuse, and neglect",
    copy: "Experiences of harm, control, or neglect that left a mark on how safe the world feels, how much you trust people, how close you let yourself get, or how you move through ordinary life.",
  },
  {
    title: "Intense emotions",
    copy: "Emotions that hit hard and are slow to come down, often with a sense of being too much. Closeness that can shift to distance without much warning.",
  },
];

function VariantFrame({ id, option, title, children }: VariantFrameProps) {
  const headingId = `otb-${id}`;
  return (
    <section className="otb-variant" aria-labelledby={headingId}>
      <Container className="otb-variant__label">
        <span>{option}</span>
        <h2 id={headingId}>{title}</h2>
      </Container>
      {children}
    </section>
  );
}

/* ── Option 01 · Card grid ────────────────────────────────────────────────────
   Ruled 3x2 grid candidate used for the Home comparison section. */

function CardGrid() {
  return (
    <section className="otb-section otb-section--cg" aria-label="Card grid topics">
      <Container>
        <div className="otb-cg__header">
          <span className="otb-eyebrow">What counselling is for</span>
          <h3>What people bring.</h3>
        </div>
        <div className="otb-cg__grid">
          {topics.map((topic) => (
            <article className="otb-cg__card" key={topic.title}>
              <h4>{topic.title}</h4>
              <p>{topic.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Option 02 · Strip panels ─────────────────────────────────────────────────
   Six full-width horizontal strip panels stacked vertically. Each strip is a
   card with a two-column internal layout: title left, copy right. */

function StripPanels() {
  return (
    <section className="otb-section otb-section--sp" aria-label="Strip panels topics">
      <Container>
        <div className="otb-sp__header">
          <span className="otb-eyebrow">What counselling is for</span>
          <h3>Where things begin.</h3>
        </div>
        <div className="otb-sp__list">
          {topics.map((topic) => (
            <article className="otb-sp__strip" key={topic.title}>
              <h4>{topic.title}</h4>
              <p>{topic.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Option 03 · Cedar mosaic ─────────────────────────────────────────────────
   Dark cedar section. Cards in light tones arranged in an asymmetric 12-column
   mosaic — varied sizes and proportions via nth-child explicit placement. */

function CedarMosaic() {
  const [featured, ...rest] = topics;
  return (
    <section className="otb-section otb-section--cm" aria-label="Cedar mosaic topics">
      <Container>
        <div className="otb-cm__header">
          <span className="otb-eyebrow otb-eyebrow--inverted">What counselling is for</span>
          <h3>The things people carry.</h3>
        </div>
        <div className="otb-cm__grid">
          <article className="otb-cm__card otb-cm__card--lead">
            <h4>{featured.title}</h4>
            <p>{featured.copy}</p>
          </article>
          {rest.map((topic) => (
            <article className="otb-cm__card" key={topic.title}>
              <h4>{topic.title}</h4>
              <p>{topic.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function OpusTB() {
  useDocumentMetadata(
    "Opus TB | What counselling is for — candidates",
    "Three panel-based section directions for the What counselling is for area of the Home page.",
  );

  return (
    <main className="site-page opus-tb-page">
      <DevPageHero
        badge="Opus TB"
        title="What counselling is for — candidates."
        description="Three panel-based section directions for the home page topics area. All topic titles and copy are preserved across candidates."
      >
        <div className="site-actions">
          <Button href="/" variant="secondary">
            Live home page <ArrowRight size={16} />
          </Button>
        </div>
      </DevPageHero>

      <div className="otb-gallery">
        <VariantFrame id="cg" option="Option 01" title="Card grid">
          <CardGrid />
        </VariantFrame>

        <VariantFrame id="sp" option="Option 02" title="Strip panels">
          <StripPanels />
        </VariantFrame>

        <VariantFrame id="cm" option="Option 03" title="Cedar mosaic">
          <CedarMosaic />
        </VariantFrame>
      </div>
    </main>
  );
}
