import { useState } from "react";
import Container from "../components/Container";
import SplitSection from "../components/SplitSection";

export default function About() {
  const [showPortrait, setShowPortrait] = useState(true);

  return (
    <>
      <section className="page-hero about-hero">
        <Container className={`page-hero__grid about-hero__grid ${showPortrait ? "" : "about-hero__grid--text"}`}>
          <div className="about-hero__content">
            <h1>Joel Griffiths</h1>
            <div className="about-hero__copy">
              <p>
                What brought me into this work was recognising how much it matters for people to have somewhere
                they can speak honestly, especially about the parts of life that feel complicated, private,
                painful, or touched by shame.
              </p>
              <p>
                That may be about anxiety, relationships, sexuality, kink, ethical non-monogamy, or simply the
                fact that something feels stuck and hard to make sense of. I care about hearing a person's life
                properly, not reducing it to a label or comparing it to someone else's idea of how they should be
                living.
              </p>
            </div>
            <p className="about-hero__meta">
              Graduate Diploma in Counselling and Psychotherapy - ACA registered counsellor - Online sessions for
              adults across Australia
            </p>
          </div>
          {showPortrait ? (
            <div className="about-portrait">
              <img
                alt="Joel Griffiths"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
                onError={() => setShowPortrait(false)}
              />
            </div>
          ) : null}
        </Container>
      </section>

      <SplitSection title="Why this work matters to me" className="section--surface about-matters-section">
        <p>
          Over time, I found that people often brought me the things they were not saying elsewhere. That shaped
          how I think about counselling: being able to speak honestly and be heard properly, especially when
          something feels difficult to say out loud.
        </p>
        <p>
          I have a particular understanding of shame, relationships, sexuality, kink, and ethical non-monogamy.
          People are often misunderstood in these areas, or made to feel they need to explain themselves before
          they can even begin. I also bring longstanding personal experience within kink communities, which means
          this is an area I understand from the inside as well as professionally.
        </p>
        <p>
          More broadly, the same principle applies elsewhere too. Whether you are dealing with anxiety,
          self-doubt, overwhelm, relationship strain, or something harder to name, I am interested in
          understanding your life on its own terms so you do not feel pushed toward a version of your life that
          fits someone else's idea of how it should look.
        </p>
      </SplitSection>
    </>
  );
}
