import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const trustDetails = [
  "Graduate Diploma in Counselling and Psychotherapy",
  "ACA registered counsellor",
  "Online sessions for adults across Australia",
];

const orientationCards = [
  {
    icon: ShieldCheck,
    title: "A place for honesty",
    text: "The work is shaped around speaking plainly about the parts of life that can feel private, complicated, painful, or touched by shame.",
  },
  {
    icon: Sparkles,
    title: "Not reduced to a label",
    text: "Your life is treated on its own terms, rather than compared with someone else's idea of how it should look.",
  },
  {
    icon: CheckCircle2,
    title: "Context is welcome",
    text: "Anxiety, relationships, sexuality, kink, ethical non-monogamy, and hard-to-name stuckness can all be brought into the room.",
  },
];

const focusAreas = [
  "Shame, sexuality, kink, and ethical non-monogamy",
  "Anxiety, self-doubt, overwhelm, and relationship strain",
  "The parts of life that are difficult to explain elsewhere",
  "Making sense of what feels stuck without forcing a neat label",
];

export default function About() {
  const [showPortrait, setShowPortrait] = useState(true);

  useEffect(() => {
    document.title = "About Joel | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "About Joel Griffiths, ACA registered counsellor offering private online counselling for adults across Australia."
      );
    }
  }, []);

  return (
    <main className="trial-two-page about-page">
      <section className="trial-two-hero about-page__hero">
        <Container className="trial-two-hero__content about-page__hero-grid">
          <div className="trial-two-hero__copy">
            <span className="trial-two-hero__badge">About Joel</span>
            <h1>Somewhere to speak honestly about complicated parts of life.</h1>
            <div className="about-page__intro-copy">
              <p>
                What brought me into this work was recognising how much it matters for people to have somewhere they can
                speak honestly, especially about the parts of life that feel complicated, private, painful, or touched by
                shame.
              </p>
              <p>
                That may be about anxiety, relationships, sexuality, kink, ethical non-monogamy, or simply the fact that
                something feels stuck and hard to make sense of.
              </p>
            </div>
            <ul className="design-language-trust-list about-page__trust-list" aria-label="Practice details">
              {trustDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <div className="trial-two-actions">
              <Button href="/contact">Get in touch</Button>
              <Button href="/approach" variant="secondary">
                Read about approach
              </Button>
            </div>
          </div>

          <aside className="about-page__portrait-panel">
            {showPortrait ? (
              <img
                alt="Joel Griffiths"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
                onError={() => setShowPortrait(false)}
              />
            ) : null}
          </aside>
        </Container>
      </section>

      <section className="trial-two-grid about-page__orientation">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">Therapeutic stance</p>
            <h2>Hearing a person's life properly, not flattening it into a category.</h2>
          </div>

          <div className="trial-two-card-grid">
            {orientationCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="trial-two-card" key={card.title}>
                  <div className="trial-two-card__icon">
                    <Icon size={24} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="trial-two-highlight about-page__matters">
        <Container className="about-page__matters-grid">
          <article className="trial-two-highlight__box">
            <span className="trial-two-highlight__eyebrow">Why this work matters</span>
            <h2>People often bring the things they are not saying elsewhere.</h2>
            <p>
              Over time, I found that people often brought me the things they were not saying elsewhere. That shaped how
              I think about counselling: being able to speak honestly and be heard properly, especially when something
              feels difficult to say out loud.
            </p>
          </article>

          <aside className="about-page__focus-panel">
            {focusAreas.map((area) => (
              <p key={area}>{area}</p>
            ))}
          </aside>
        </Container>
      </section>

      <section className="about-page__longform">
        <Container className="about-page__longform-grid">
          <div>
            <span className="trial-two-subtitle">Experience and understanding</span>
            <h2>Specialist understanding without making you educate the therapist first.</h2>
          </div>

          <div className="about-page__text-panel">
            <p>
              I have a particular understanding of shame, relationships, sexuality, kink, and ethical non-monogamy.
              People are often misunderstood in these areas, or made to feel they need to explain themselves before they
              can even begin.
            </p>
            <p>
              I also bring longstanding personal experience within kink communities, which means this is an area I
              understand from the inside as well as professionally.
            </p>
            <p>
              More broadly, the same principle applies elsewhere too. Whether you are dealing with anxiety, self-doubt,
              overwhelm, relationship strain, or something harder to name, I am interested in understanding your life on
              its own terms so you do not feel pushed toward a version of your life that fits someone else's idea of how
              it should look.
            </p>
          </div>
        </Container>
      </section>

      <section className="trial-two-cta-block">
        <Container className="trial-two-cta-block__inner">
          <div>
            <h2>A first enquiry can be short.</h2>
            <p>
              You do not need to explain everything clearly before getting in touch. A simple note is enough to begin.
            </p>
          </div>
          <Button href="/contact" variant="secondary">
            Start a conversation <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
