import { useEffect } from "react";
import Container from "../components/Container";

export default function CodexTB() {
  useEffect(() => {
    document.title = "Codex TB | No active trials";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Codex test bed with no active section trials."
      );
    }
  }, []);

  return (
    <main className="site-page codex-tb-page">
      <section className="site-grid">
        <Container className="site-grid__heading">
          <h1>Codex TB</h1>
          <p>No active homepage section trials at the moment.</p>
        </Container>
      </section>
    </main>
  );
}
