import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import DevPageHero from "../components/DevPageHero";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-opus-tb.css";

const cleanupNotes = [
  "Five How I Work section candidates were explored here: Ledger split, Triptych cards, Manifesto, Tab panel, and Essay.",
  "The tab panel direction was selected and shipped to the Working With Joel page with keyboard navigation and full ARIA support.",
  "This page is now a clean workspace — ready for the next experiment.",
];

export default function OpusTB() {
  useDocumentMetadata(
    "Opus TB",
    "Opus test bed. How I Work candidates have been retired — tab panel shipped to the live page.",
  );

  return (
    <main className="site-page opus-tb-page">
      <DevPageHero
        badge="Opus TB"
        title="How I work — shipped."
        description="The tab panel direction from the How I Work candidates has been implemented on the live Working With Joel page. This workspace is clear for the next experiment."
      >
        <div className="site-actions">
          <Button href="/working-with-joel" variant="secondary">
            Live page <ArrowRight size={16} />
          </Button>
        </div>
      </DevPageHero>

      <section className="opus-tb-commentary">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">Cleanup</p>
            <h2>What shipped</h2>
          </div>
          <div className="opus-tb-commentary__grid">
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
