import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const cleanupNotes = [
  "The five homepage hero trials have been retired now that the chosen direction is live on the homepage.",
  "Shared hero spacing, type scale, and support-panel behavior now live in the hero design system rather than inside this test bed.",
  "This route stays as a lightweight Codex workspace page so future experiments can be added without carrying the old candidate code around.",
];

export default function CodexTB() {
  useEffect(() => {
    document.title = "Codex TB | Hero archive";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Codex test bed archive. The homepage hero trials have been retired now that the chosen shared-hero direction is live."
      );
    }
  }, []);

  return (
    <main className="site-page codex-tb-page">
      <section className="test-bed-approach-intro">
        <Container className="test-bed-approach-intro__inner">
          <div>
            <span className="site-hero__badge">Codex TB</span>
            <h1>Homepage hero trials retired.</h1>
            <p>
              The chosen homepage hero direction is now live and folded into the shared hero system, so the five trial
              candidates have been cleared out of this test bed.
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

      <section className="test-bed-commentary-section">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">Cleanup</p>
            <h2>What changed</h2>
          </div>

          <div className="test-bed-commentary-grid">
            {cleanupNotes.map((note) => (
              <article className="site-card" key={note}>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
