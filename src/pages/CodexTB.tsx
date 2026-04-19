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
    title: "Vertical mineral split",
    note: "Same inset box, with the outer field split into a quiet mineral left plane and a lighter paper right plane.",
    className: "home-test-hero--split-vertical-mineral",
  },
  {
    title: "Diagonal field split",
    note: "Same inset box, with a gentle diagonal background shift to make the hero feel more spatial without touching the panel.",
    className: "home-test-hero--split-diagonal-field",
  },
  {
    title: "Lower plinth split",
    note: "Same inset box, with a stronger lower field that creates a grounded plinth beneath the centrepiece.",
    className: "home-test-hero--split-lower-plinth",
  },
  {
    title: "Right rail split",
    note: "Same inset box, with a narrow right-side surface rail that borrows the spatial feel of Option 5 in a cleaner way.",
    className: "home-test-hero--split-right-rail",
  },
  {
    title: "Layered paper split",
    note: "Same inset box, with layered horizontal paper and mineral fields for a quieter, more atmospheric interpretation.",
    className: "home-test-hero--split-layered-paper",
  },
];

export default function CodexTB() {
  useEffect(() => {
    document.title = "Codex TB | Homepage Hero Candidates";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Codex test bed with five homepage hero candidates exploring a distinct hero-specific visual language for Vive Counselling."
      );
    }
  }, []);

  return (
    <main className="site-page codex-tb-page">
      <section className="test-bed-approach-intro">
        <Container className="test-bed-approach-intro__inner">
          <div>
            <span className="site-hero__badge">Codex TB</span>
            <h1>Five split-background variations of the inset-field hero.</h1>
            <p>
              Each option keeps the same inset hero box and changes only the surrounding field, so the comparison is
              focused on background surface architecture. This is Codex's working set.
            </p>
          </div>
          <div className="test-bed-intro-actions">
            <Button href="/opus-tb" variant="secondary">
              View Opus TB <ArrowRight size={16} />
            </Button>
            <Button href="/" variant="secondary">
              Current homepage <ArrowRight size={16} />
            </Button>
          </div>
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
          <div className="site-grid__heading">
            <p className="site-eyebrow">Codex TB notes</p>
            <h2>Commentary for the five Codex homepage hero candidates.</h2>
          </div>

          <div className="test-bed-commentary-grid">
            {candidates.map((candidate) => (
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
