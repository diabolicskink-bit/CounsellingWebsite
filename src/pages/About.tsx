import { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
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
    <main className="site-page about-page">
      <section className="hero-section hero-bg--diagonal about-page__hero">
        <Container>
          <div className="hero-top hero-top--supporting-media">
            <div className="about-page__hero-copy">
              <h1 className="hero-display about-page__hero-title">Joel Griffiths</h1>
              <div className="hero-copy-panel about-page__hero-support">
                <div className="about-page__hero-intro">
                  <p>
                    What brought me into this work was recognising how much it matters for people to have somewhere they
                    can speak honestly, especially about the parts of life that feel complicated, private, painful, or
                    touched by shame.
                  </p>
                  <p>
                    That may be about anxiety, relationships, sexuality, kink, ethical non-monogamy, or simply the fact
                    that something feels stuck and hard to make sense of.
                  </p>
                </div>
                <ul className="hero-support-tagline" aria-label="Practice details">
                  {trustDetails.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="hero-media-note about-page__hero-note" aria-label="Portrait of Joel Griffiths">
            {showPortrait ? (
              <div className="hero-media-note__image">
                <img
                  alt="Joel Griffiths"
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
                  onError={() => setShowPortrait(false)}
                />
              </div>
            ) : null}
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid about-page__orientation">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">Therapeutic stance</p>
            <h2>Hearing a person's life properly, not flattening it into a category.</h2>
          </div>

          <div className="site-card-grid">
            {orientationCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="site-card" key={card.title}>
                  <div className="site-card__icon">
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

      <section className="site-highlight about-page__matters">
        <Container className="about-page__matters-grid">
          <article className="site-highlight__box">
            <span className="site-highlight__eyebrow">Why this work matters</span>
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
            <span className="site-eyebrow">Experience and understanding</span>
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
    </main>
  );
}
