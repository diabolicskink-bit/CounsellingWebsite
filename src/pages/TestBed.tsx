import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const homepageHeroCopy =
  "Based in Perth, I offer online counselling for adults across Australia. People often come with anxiety, relationship strain, self-criticism, grief, sexuality, or things that feel exposing, confusing, or hard to talk about. My approach is direct, thoughtful, and non-shaming.";

const homepageSignals = [
  {
    title: "Online across Australia",
    text: "Private online counselling for adults, available from wherever you are.",
  },
  {
    title: "Grounded and non-shaming",
    text: "A direct, thoughtful way of working with material that can feel exposing.",
  },
  {
    title: "Inclusive practice",
    text: "Relationships, sexualities, identities, kink, BDSM, and ENM can be spoken about plainly.",
  },
];

const candidates = [
  {
    title: "Framed editorial split",
    note: "The cleanest editorial option: heading left, copy right, and the trust signals as one continuous ruled band.",
    className: "home-test-hero--framed-editorial",
  },
  {
    title: "Inset field hero",
    note: "The strongest special-object treatment, with the whole hero built into a large inset panel inside a soft outer field.",
    className: "home-test-hero--inset-field",
  },
  {
    title: "Offset principle band",
    note: "A more authored layout where the lower signal band is offset from the upper heading/copy composition.",
    className: "home-test-hero--offset-band",
  },
  {
    title: "Quiet monument",
    note: "The boldest type-led version, relying on scale, empty space, and a narrow right-hand note column.",
    className: "home-test-hero--quiet-monument",
  },
  {
    title: "Split-surface hero",
    note: "The most spatial option, using closely related left/right surfaces with the signals bridging the composition.",
    className: "home-test-hero--split-surface",
  },
];

export default function TestBed() {
  useEffect(() => {
    document.title = "TestBed | Homepage Hero Candidates";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Five homepage hero candidates exploring a distinct hero-specific visual language for Vive Counselling."
      );
    }
  }, []);

  return (
    <main className="trial-two-page test-bed-page">
      <section className="test-bed-approach-intro">
        <Container className="test-bed-approach-intro__inner">
          <div>
            <span className="trial-two-hero__badge">TestBed</span>
            <h1>Five homepage hero candidates with a hero-specific design language.</h1>
            <p>
              These are not normal page sections. Each option gives the homepage opening its own visual field, stronger
              typographic scale, and integrated practice signals.
            </p>
          </div>
          <Button href="/" variant="secondary">
            Current homepage <ArrowRight size={16} />
          </Button>
        </Container>
      </section>

      <div className="home-test-hero-list">
        {candidates.map((candidate) => (
          <section className={`home-test-hero ${candidate.className}`} key={candidate.title}>
            <Container className="home-test-hero__inner">
              <div className="home-test-hero__top">
                <h2>Counselling for when life feels difficult, tangled, or hard to make sense of.</h2>
                <p>{homepageHeroCopy}</p>
              </div>

              <div className="home-test-hero__signals" aria-label="Practice signals">
                {homepageSignals.map((signal) => (
                  <article className="home-test-hero__signal" key={signal.title}>
                    <h3>{signal.title}</h3>
                    <p>{signal.text}</p>
                  </article>
                ))}
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className="test-bed-commentary-section">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">TestBed notes</p>
            <h2>Commentary for the five homepage hero candidates.</h2>
          </div>

          <div className="test-bed-commentary-grid">
            {candidates.map((candidate) => (
              <article className="trial-two-card" key={candidate.title}>
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
