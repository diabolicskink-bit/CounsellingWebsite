import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found | Vive Counselling";
  }, []);

  return (
    <main className="site-page">
      <section className="hero-section hero-bg--cedar-soft">
        <Container>
          <div className="hero-top">
            <div>
              <span className="hero-badge">404</span>
              <h1 className="hero-display">
                This page does
                <br />
                not <em>exist</em>.
              </h1>
            </div>
            <div className="hero-copy-panel">
              <p>
                The link may be out of date, or the page may have moved. You
                can return to the homepage or reach out directly.
              </p>
              <div className="site-actions">
                <Button href="/">Go to homepage</Button>
                <Button href="/contact" variant="secondary">
                  Make an enquiry <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="hero-principles-strip">
            <div className="hero-principle-item">
              <h3>Working with Joel</h3>
              <p>Background, training, and what the work actually involves.</p>
            </div>
            <div className="hero-principle-item">
              <h3>Inclusive practice</h3>
              <p>Support for kink, ENM, LGBTQIA+ lives, and other misunderstood parts of life.</p>
            </div>
            <div className="hero-principle-item">
              <h3>Fees and booking</h3>
              <p>Practical details, session length, and how to get started.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
