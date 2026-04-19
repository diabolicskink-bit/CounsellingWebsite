import { useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";
const stockPortraitSrc =
  "https://images.pexels.com/photos/8560219/pexels-photo-8560219.jpeg?cs=srgb&dl=pexels-timur-weber-8560219.jpg&fm=jpg";

const hero = {
  badge: "Vive Counselling",
  heading: "Counselling for when life feels painful, stuck, or hard to untangle.",
  copy:
    "I offer online counselling for adults across Australia, based in Perth. I work with anxiety, relationship strain, self-criticism, trauma, sexuality, and experiences that feel exposing, confusing, or hard to talk about. My approach is direct, thoughtful, and non-shaming.",
  name: "Joel Griffiths",
  role: "Counselling and psychodynamic psychotherapy",
};

const softArrivalHeading = (
  <>
    Counselling for when life feels <em>hard to untangle</em>.
  </>
);

const trustItems = [
  "Perth-based, online across Australia",
  "Individual counselling",
  "Serious, thoughtful, and human",
  "Kink-, ENM-, and LGBTQIA+-aware",
];

const notes = [
  {
    title: "Soft Arrival",
    note: "Keeps the homepage warm and direct: text first, portrait as a softened presence, practical details close by.",
  },
  {
    title: "First Conversation",
    note: "Frames the hero around the feeling of beginning. Less architectural, more like an invitation to make contact.",
  },
  {
    title: "Grounded Practice",
    note: "Keeps clarity high with a strong practical strip, while avoiding the ledger-heavy feeling of the previous round.",
  },
  {
    title: "Human And Plain",
    note: "A more personal split: Joel is present, the copy is readable, and the CTA is not buried under layout ceremony.",
  },
  {
    title: "Quiet Clearing",
    note: "The calmest and most spacious option. It gives the headline room while keeping the supporting copy grounded.",
  },
];

function Candidate({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className: string;
  title: string;
}) {
  return (
    <section className={`codex-home-v2 ${className}`}>
      <Container>
        <div className="codex-home-v2__label">
          <span>Candidate</span>
          <strong>{title}</strong>
        </div>
        {children}
      </Container>
    </section>
  );
}

function Actions() {
  return (
    <div className="codex-home-v2__actions">
      <Button href="/contact">Make an enquiry</Button>
      <Button href="/approach" variant="secondary">
        Read about the approach
      </Button>
    </div>
  );
}

function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "codex-home-v2__trust codex-home-v2__trust--compact" : "codex-home-v2__trust"}>
      {trustItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function TrustTagline() {
  return (
    <ul className="codex-home-v2__tagline" aria-label="Practice details">
      {trustItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function JoelPresence({
  imageOnly = false,
  nameOnly = false,
  small = false,
}: {
  imageOnly?: boolean;
  nameOnly?: boolean;
  small?: boolean;
}) {
  return (
    <aside
      className={[
        "codex-home-v2__joel",
        small ? "codex-home-v2__joel--small" : "",
        imageOnly ? "codex-home-v2__joel--image-only" : "",
        nameOnly ? "codex-home-v2__joel--name-only" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="codex-home-v2__joel-image">
        <img src={portraitSrc} alt="" />
      </div>
      {imageOnly && !nameOnly ? null : (
        <div className="codex-home-v2__joel-text">
          <strong>{hero.name}</strong>
          {nameOnly ? null : <span>{hero.role}</span>}
        </div>
      )}
    </aside>
  );
}

function SamplePortrait() {
  return (
    <aside className="codex-home-v2__sample-portrait" aria-label="Sample stock image">
      <img src={stockPortraitSrc} alt="" />
      <div className="codex-home-v2__sample-portrait-caption">
        <strong>Joel Griffiths</strong>
        <span>Counselling and Psychodynamic Psychotherapy</span>
      </div>
    </aside>
  );
}

export default function CodexTB() {
  useEffect(() => {
    document.title = "Codex TB | Homepage Hero Candidates";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Codex test bed with five warmer homepage hero candidates using the current Vive Counselling homepage hero content."
      );
    }
  }, []);

  return (
    <main className="site-page codex-tb-page">
      <section className="test-bed-approach-intro">
        <Container className="test-bed-approach-intro__inner">
          <div>
            <span className="site-hero__badge">Codex TB</span>
            <h1>Five warmer homepage hero candidates.</h1>
            <p>
              Same homepage content, but with less design-system austerity and more human invitation. This round tests
              warmth, clarity, portrait presence, and whether the first screen feels approachable.
            </p>
          </div>
          <div className="test-bed-intro-actions">
            <Button href="/" variant="secondary">
              Current homepage <ArrowRight size={16} />
            </Button>
            <Button href="/design-language/heroes" variant="secondary">
              Hero system <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>

      <div className="codex-home-v2-list">
        <Candidate className="codex-home-v2--soft-arrival" title="Soft Arrival">
          <div className="codex-home-v2__soft-grid">
            <div className="codex-home-v2__copy">
              <h2>{softArrivalHeading}</h2>
              <div className="hero-copy-panel codex-home-v2__soft-support">
                <p className="codex-home-v2__soft-paragraph">{hero.copy}</p>
                <TrustTagline />
              </div>
            </div>
            <div className="codex-home-v2__soft-copy">
              <SamplePortrait />
            </div>
          </div>
        </Candidate>

        <Candidate className="codex-home-v2--conversation" title="First Conversation">
          <div className="codex-home-v2__conversation">
            <div className="codex-home-v2__conversation-card">
              <span>{hero.badge}</span>
              <h2>{hero.heading}</h2>
              <p>{hero.copy}</p>
              <Actions />
            </div>
            <div className="codex-home-v2__conversation-note">
              <p>You do not need to explain everything clearly before getting in touch.</p>
              <JoelPresence small />
            </div>
          </div>
          <TrustStrip />
        </Candidate>

        <Candidate className="codex-home-v2--grounded-practice" title="Grounded Practice">
          <div className="codex-home-v2__grounded">
            <div className="codex-home-v2__grounded-heading">
              <span>{hero.badge}</span>
              <h2>{hero.heading}</h2>
            </div>
            <div className="codex-home-v2__grounded-copy">
              <p>{hero.copy}</p>
              <Actions />
            </div>
          </div>
          <TrustStrip />
        </Candidate>

        <Candidate className="codex-home-v2--human-plain" title="Human And Plain">
          <div className="codex-home-v2__human">
            <JoelPresence />
            <div className="codex-home-v2__copy">
              <span>{hero.badge}</span>
              <h2>{hero.heading}</h2>
              <p>{hero.copy}</p>
              <Actions />
            </div>
          </div>
          <TrustStrip />
        </Candidate>

        <Candidate className="codex-home-v2--quiet-clearing" title="Quiet Clearing">
          <div className="codex-home-v2__clearing">
            <span>{hero.badge}</span>
            <h2>{hero.heading}</h2>
            <div className="codex-home-v2__clearing-lower">
              <p>{hero.copy}</p>
              <div>
                <Actions />
                <JoelPresence small />
              </div>
            </div>
          </div>
          <TrustStrip />
        </Candidate>
      </div>

      <section className="test-bed-commentary-section">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">Codex TB notes</p>
            <h2>What each candidate is testing.</h2>
          </div>

          <div className="test-bed-commentary-grid">
            {notes.map((candidate) => (
              <article className="site-card" key={candidate.title}>
                <h3>{candidate.title}</h3>
                <p>{candidate.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
