import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import CTASection from "../components/CTASection";
import SplitSection from "../components/SplitSection";

export default function Approach() {
  return (
    <>
      <section className="page-hero approach-hero">
        <Container className="approach-hero__inner">
          <div className="approach-hero__top">
            <h1>Working with the bigger picture</h1>
            <p className="approach-hero__copy">
              I seek to understand the problem you are dealing with in the context of your actual life. That means paying attention not only to what is happening now, but also to the patterns, pressures, and relationships around it, so what we are talking about is grounded in the reality of your life.
            </p>
          </div>
            <div className="approach-hero__principles" aria-label="Working principles">
              <div className="approach-hero__principle">
                <h2>Real life</h2>
                <p>
                  Counselling should stay connected to the life you are actually living, not drift away from the
                  pressures, relationships, and decisions that make up everyday life.
                </p>
              </div>
              <div className="approach-hero__principle">
                <h2>Relationships</h2>
                <p>
                  What happens between people matters. That includes closeness, conflict, distance, and attachment,
                  as well as the ways these can shape how we feel and respond.
                </p>
              </div>
              <div className="approach-hero__principle">
                <h2>Recurring difficulties</h2>
                <p>
                  Some struggles are not just one-off problems. It can help to look at what keeps returning, and at
                  what may be keeping it going.
                </p>
              </div>
            </div>
        </Container>
      </section>

      <section className="section approach-explainer-section">
        <Container className="approach-explainer">
          <div className="approach-explainer__heading">
            <h2>An integrative, psychodynamically informed approach</h2>
          </div>
          <div className="approach-explainer__blocks">
            <div className="approach-explainer__block">
              <p>
                People often come to counselling with something that feels urgent in the present, such as anxiety,
                relationship strain, shame, overwhelm, self-doubt, or a sense of feeling stuck. Those difficulties
                matter in their own right. But they also sit within a wider emotional and relational context,
                especially when the same struggles keep returning or when the problem feels bigger than the current
                situation alone can explain.
              </p>
            </div>
            <div className="approach-explainer__block">
              <p>
                My approach is integrative, with psychodynamic and attachment-based thinking as important influences.
                In practice, that means paying attention not only to what is happening now, but also to the patterns,
                relationships, and ways of coping that may be shaping it. That can include attachment: the ways
                people learn closeness, distance, trust, and self-protection through relationships, and how those ways
                of relating can continue into adult life.
              </p>
            </div>
            <div className="approach-explainer__block">
              <p>
                The aim is not to force experience into a theory, but to build a fuller understanding of what is
                going on, so counselling can make sense of both the immediate problem and the wider pattern around it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="two-column-panel">
            <div>
              <h2>Not every problem needs to be solved immediately to be understood more honestly.</h2>
              <p>
                People often come when they are tired of carrying things alone, or tired of repeating the same
                emotional shape in different settings.
              </p>
            </div>
            <div className="check-list">
              {[
                "Naming anxiety, shame, grief, or anger without flattening it into a label.",
                "Understanding relationship patterns that keep returning.",
                "Thinking about identity, sexuality, desire, or intimacy without judgement.",
                "Finding language for what has felt private, confusing, or hard to admit.",
                "Building steadier choices in daily life while deeper work unfolds.",
              ].map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={19} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SplitSection
        title="You do not need a perfect explanation before getting in touch."
        className="section--surface"
      >
        <p>
          A first enquiry can be short. You might name what is bringing you to counselling, whether you are looking
          for online sessions, and anything important to know before arranging a first appointment.
        </p>
        <Button href="/fees">
          View fees and practical details <ArrowRight size={17} />
        </Button>
      </SplitSection>

      <CTASection />
    </>
  );
}
