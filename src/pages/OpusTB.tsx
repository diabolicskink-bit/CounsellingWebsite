import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import DevPageHero from "../components/DevPageHero";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

const cleanupNotes = [
  "The approach hero background candidates have been retired now that the shared hero system is established.",
  "Shared hero spacing, display type scale, and the default hero background now live in the design system rather than this test route.",
  "This page remains as a lightweight Opus workspace so future experiments can start cleanly instead of inheriting old candidate code.",
];

export default function OpusTB() {
  useDocumentMetadata(
    "Opus TB | Hero archive",
    "Opus test bed archive. The approach hero background trials have been retired now that the shared hero system is in place."
  );

  return (
    <main className="site-page opus-tb-page">
      <DevPageHero
        badge="Opus TB"
        title="Hero trials retired."
        description="The older hero background candidates have been cleared out now that the shared hero system and live page direction are in place."
      >
        <div className="site-actions">
          <Button href="/working-with-joel" variant="secondary">
            Current live page <ArrowRight size={16} />
          </Button>
          <Button href="/design-language/heroes" variant="secondary">
            Hero system <ArrowRight size={16} />
          </Button>
        </div>
      </DevPageHero>

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
