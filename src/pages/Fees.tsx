import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { practicalItems } from "../data/site";

const sessionDetails = [
  { label: "Session length", value: "50 minutes" },
  { label: "Format", value: "Online counselling" },
  { label: "Availability", value: "Adults across Australia" },
];

const gettingStartedSteps = [
  "Send a brief enquiry through the contact page.",
  "Joel will reply with availability and any useful next questions.",
  "If it seems like a reasonable fit, a first online session can be arranged.",
  "You do not need to explain the whole story before booking.",
];

const practicalNotes = [
  "Payment details can be confirmed before the first appointment.",
  "Cancellation terms and any required forms can be shared before you begin.",
  "Vive does not currently present itself as a crisis service.",
];

export default function Fees() {
  useEffect(() => {
    document.title = "Fees | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Fees and practical details for online counselling sessions with Vive Counselling."
      );
    }
  }, []);

  return (
    <main className="site-page fees-page">
      <section className="site-hero fees-page__hero">
        <Container className="site-hero__content fees-page__hero-grid">
          <div className="site-hero__copy">
            <span className="site-hero__badge">Fees and practical details</span>
            <h1>Clear practical details before you begin.</h1>
            <p>
              Sessions are online, 50 minutes, and available to adults across Australia. The first step is a brief
              enquiry so availability, timing, and fit can be considered.
            </p>
            <div className="site-actions">
              <Button href="/contact">Make an enquiry</Button>
              <Button href="/approach" variant="secondary">
                Read the approach
              </Button>
            </div>
          </div>

          <aside className="fees-page__price-panel" aria-label="Standard session fee">
            <span>Standard session</span>
            <strong>$170</strong>
            <p>50-minute online counselling session</p>
            <small>Placeholder fee for editing before launch.</small>
            <div className="fees-page__session-ledger">
              {sessionDetails.map((detail) => (
                <div key={detail.label}>
                  <span>{detail.label}</span>
                  <strong>{detail.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      <section className="site-grid fees-page__details">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">The basic frame</p>
            <h2>Simple information, held in a steady structure.</h2>
            <p className="fees-page__section-copy">
              This page should be easy to scan, easy to update, and clear enough that practical questions do not take
              over the work.
            </p>
          </div>

          <div className="site-card-grid fees-page__practical-grid">
            {practicalItems.map(({ icon: Icon, title, copy }) => (
              <article className="site-card" key={title}>
                <div className="site-card__icon">
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="fees-page__start-section">
        <Container>
          <div className="fees-page__start-panel">
            <div>
              <span className="site-eyebrow">Getting started</span>
              <h2>Starting does not need to be elaborate.</h2>
              <p>
                A short message is enough. You can say what is bringing you to counselling, whether online work suits
                you, and any scheduling constraints that matter.
              </p>
            </div>

            <div className="fees-page__check-panel">
              {gettingStartedSteps.map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={19} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="fees-page__boundaries">
        <Container className="fees-page__boundaries-grid">
          <div>
            <span className="site-eyebrow">Boundaries and terms</span>
            <h2>Clear boundaries help keep the work steady.</h2>
          </div>

          <article className="fees-page__terms-panel">
            <p>
              A cancellation policy, payment details, and any required forms can be confirmed before the first
              appointment. This placeholder copy can be replaced with the final practice terms when they are ready.
            </p>
            <div className="fees-page__note-list">
              {practicalNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
            <p>
              If you are in immediate danger, call emergency services on 000 or contact a crisis support service in your
              area.
            </p>
            <Button href="/contact">Make an enquiry</Button>
          </article>
        </Container>
      </section>

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div>
            <h2>A brief enquiry is enough to begin.</h2>
            <p>
              You can include what is bringing you to counselling, your availability, and whether online sessions are
              what you are looking for.
            </p>
          </div>
          <Button href="/approach" variant="secondary">
            Read the approach <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
