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

/* ── MarqueeBand ──────────────────────────────────────────────────────────────
   Full-bleed CSS-animated horizontal ticker. Doubled array drives seamless
   loop: animates -50% on the track so the repeat is invisible. aria-hidden. */

function MarqueeBand() {
  const doubled = [...topics, ...topics];
  return (
    <div className="otb-marquee" aria-hidden="true">
      <div className="otb-marquee__track">
        {doubled.map((topic, i) => (
          <span key={i} className="otb-marquee__item">
            {topic.title}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Option 01 · Flood typography ─────────────────────────────────────────────
   Each topic title renders at display scale — full width, enormous serif.
   Copy sits small and right-aligned beneath it. Inline eyebrow + italic
   label above the flood. No cards, no columns. Pure typographic impact. */

function FloodTypography() {
  return (
    <section className="otb-section otb-section--flood" aria-label="Flood typography topics">
      <Container className="otb-flood">
        <div className="otb-flood__intro">
          <span className="otb-eyebrow">What counselling is for</span>
          <h3>Where people begin.</h3>
        </div>
        <div className="otb-flood__list">
          {topics.map((topic) => (
            <article className="otb-flood__item" key={topic.title}>
              <h4 className="otb-flood__title">{topic.title}</h4>
              <p className="otb-flood__copy">{topic.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Option 02 · True collage ─────────────────────────────────────────────────
   12-column explicit grid. Cards have genuinely different sizes and shapes
   via nth-child CSS placement — no two cards occupy the same proportions.
   Lead card spans 7 cols × 2 rows; others vary from 2 to 8 columns wide. */

function TrueCollage() {
  const [featured, ...rest] = topics;
  return (
    <section className="otb-section otb-section--collage" aria-label="Collage topics">
      <Container>
        <div className="otb-collage__header">
          <span className="otb-eyebrow">What counselling is for</span>
          <h3>What people bring.</h3>
        </div>
        <div className="otb-collage__grid">
          <article className="otb-collage__card otb-collage__card--lead">
            <h4>{featured.title}</h4>
            <p>{featured.copy}</p>
          </article>
          {rest.map((topic) => (
            <article className="otb-collage__card" key={topic.title}>
              <h4>{topic.title}</h4>
              <p>{topic.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Option 03 · Marquee herald ───────────────────────────────────────────────
   Full-bleed CSS-animated ticker of topic names runs at the top of the section,
   outside the container. Below: a clean numbered list with title and copy.
   The marquee is decorative only — content is repeated in the list. */

function MarqueeHerald() {
  return (
    <section className="otb-section otb-section--herald" aria-label="Marquee herald topics">
      <MarqueeBand />
      <Container>
        <div className="otb-herald__header">
          <span className="otb-eyebrow">What counselling is for</span>
          <h3>The kinds of things people bring.</h3>
        </div>
        <div className="otb-herald__list">
          {topics.map((topic, index) => (
            <article className="otb-herald__item" key={topic.title}>
              <span className="otb-herald__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="otb-herald__body">
                <h4>{topic.title}</h4>
                <p>{topic.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Option 04 · Native disclosure ───────────────────────────────────────────
   Uses the native <details>/<summary> HTML pattern — zero JS. CSS animates
   the reveal via grid-template-rows: 0fr → 1fr. A custom circular +/× marker
   rotates on open. Six disclosures in a 2-column grid; each topic expands
   independently. Closest-to-live candidate for a compact focused section. */

function NativeDisclosure() {
  return (
    <section className="otb-section otb-section--disc" aria-label="Native disclosure topics">
      <Container>
        <div className="otb-disc__header">
          <span className="otb-eyebrow">What counselling is for</span>
          <h3>What brought you here.</h3>
        </div>
        <div className="otb-disc__grid">
          {topics.map((topic, index) => (
            <details className="otb-disc__item" key={topic.title}>
              <summary className="otb-disc__summary">
                <span className="otb-disc__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="otb-disc__title">{topic.title}</h4>
                <span className="otb-disc__marker" aria-hidden="true" />
              </summary>
              <div className="otb-disc__body">
                <p>{topic.copy}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Option 05 · Cedar scroll ─────────────────────────────────────────────────
   Dark cedar section. Intro uses a 2-col layout: heading stacked left, copy
   text centred right. Below: a CSS scroll-snap horizontal carousel — six
   topic cards as draggable slides. Scrollbar hidden. Touch-friendly. */

function CedarScroll() {
  return (
    <section className="otb-section otb-section--cedar" aria-label="Cedar scroll topics">
      <Container className="otb-cedar">
        <div className="otb-cedar__intro">
          <span className="otb-eyebrow otb-eyebrow--inverted">What counselling is for</span>
          <h3>The things people bring.</h3>
          <p>
            Some of the places people begin when something has become difficult to carry alone.
          </p>
        </div>
      </Container>
      <div className="otb-cedar__scroll" aria-label="Topics — scroll to see all">
        {topics.map((topic) => (
          <article className="otb-cedar__slide" key={topic.title}>
            <h4>{topic.title}</h4>
            <p>{topic.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function OpusTB() {
  useDocumentMetadata(
    "Opus TB | What counselling is for — candidates",
    "Five section directions for the What counselling is for area of the Home page.",
  );

  return (
    <main className="site-page opus-tb-page">
      <DevPageHero
        badge="Opus TB"
        title="What counselling is for — candidates."
        description="Five section directions for the home page topics area. Heading varies per candidate; all topic titles and copy are preserved."
      >
        <div className="site-actions">
          <Button href="/" variant="secondary">
            Live home page <ArrowRight size={16} />
          </Button>
        </div>
      </DevPageHero>

      <div className="otb-gallery">
        <VariantFrame id="flood" option="Option 01" title="Flood typography">
          <FloodTypography />
        </VariantFrame>

        <VariantFrame id="collage" option="Option 02" title="True collage">
          <TrueCollage />
        </VariantFrame>

        <VariantFrame id="herald" option="Option 03" title="Marquee herald">
          <MarqueeHerald />
        </VariantFrame>

        <VariantFrame id="disc" option="Option 04" title="Native disclosure">
          <NativeDisclosure />
        </VariantFrame>

        <VariantFrame id="cedar" option="Option 05" title="Cedar scroll">
          <CedarScroll />
        </VariantFrame>
      </div>
    </main>
  );
}
