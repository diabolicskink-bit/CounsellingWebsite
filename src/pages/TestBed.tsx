import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const approachHeroCopy =
  "I seek to understand the problem you are dealing with in the context of your actual life. That means paying attention not only to what is happening now, but also to the patterns, pressures, and relationships around it, so what we are talking about is grounded in the reality of your life.";

const approachPrinciples = [
  {
    title: "Real life",
    text: "Counselling should stay connected to the life you are actually living, not drift away from the pressures, relationships, and decisions that make up everyday life.",
  },
  {
    title: "Relationships",
    text: "What happens between people matters. That includes closeness, conflict, distance, and attachment, as well as the ways these can shape how we feel and respond.",
  },
  {
    title: "Recurring difficulties",
    text: "Some struggles are not just one-off problems. It can help to look at what keeps returning, and at what may be keeping it going.",
  },
];

const candidates = [
  {
    label: "Split hero with principle panel",
    title: "Split hero with principle panel",
    note: "Closest to the current structure, but with stronger containment and clearer surface hierarchy.",
    className: "test-bed-approach-hero--split-panel",
  },
  {
    label: "Editorial hero with ruled stack",
    title: "Editorial hero with ruled stack",
    note: "Best if the hero should feel thoughtful, spacious, and text-led rather than card-led.",
    className: "test-bed-approach-hero--editorial",
  },
  {
    label: "Hero with card trio",
    title: "Hero with card trio",
    note: "Best if the three working principles need to be very scannable and reusable elsewhere.",
    className: "test-bed-approach-hero--cards",
  },
  {
    label: "Side rail hero",
    title: "Side rail hero",
    note: "A more architectural treatment with the principles acting as a structured navigation rail.",
    className: "test-bed-approach-hero--rail",
  },
  {
    label: "Quiet statement hero",
    title: "Quiet statement hero",
    note: "Most restrained. Puts the main idea first, then lets the principles sit as a calm footer strip.",
    className: "test-bed-approach-hero--statement",
  },
];

export default function TestBed() {
  useEffect(() => {
    document.title = "TestBed | Approach Hero Candidates";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Five candidate hero treatments for the Approach page using the Vive Counselling design language."
      );
    }
  }, []);

  return (
    <main className="trial-two-page test-bed-page">
      <section className="test-bed-approach-intro">
        <Container className="test-bed-approach-intro__inner">
          <div>
            <span className="trial-two-hero__badge">TestBed</span>
            <h1>Five candidate Approach hero treatments.</h1>
            <p>
              Each option ports the current Approach hero content into the authoritative design language, with a
              different structure for the same heading, paragraph, and three working principles.
            </p>
          </div>
          <Button href="/design-language" variant="secondary">
            Design language <ArrowRight size={16} />
          </Button>
        </Container>
      </section>

      <div className="test-bed-approach-list">
        {candidates.map((candidate, index) => {
          return (
            <section className={`test-bed-approach-hero ${candidate.className}`} key={candidate.label}>
              <Container>
                <div className="test-bed-approach-hero__frame">
                  <div className="test-bed-approach-hero__main">
                    <h2>Working with the bigger picture</h2>
                    <p>{approachHeroCopy}</p>
                    {index === 4 ? (
                      <div className="trial-two-actions">
                        <Button href="/contact">Get in touch</Button>
                        <Button href="/fees" variant="secondary">
                          Fees and practical details
                        </Button>
                      </div>
                    ) : null}
                  </div>

                  <div className="test-bed-approach-hero__support">
                    <div className="test-bed-principles" aria-label="Working principles">
                      {approachPrinciples.map((principle) => (
                        <article className="test-bed-principle" key={principle.title}>
                          <h3>{principle.title}</h3>
                          <p>{principle.text}</p>
                          {index === 2 ? <CheckCircle2 size={18} /> : null}
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <section className="test-bed-commentary-section">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">TestBed notes</p>
            <h2>Commentary for the five Approach hero candidates.</h2>
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
