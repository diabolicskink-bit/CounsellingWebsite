import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const principles = [
  {
    title: "Real life",
    text: "Counselling should stay connected to the life you are actually living, not drift away from the pressures, relationships, and decisions that make up everyday life.",
  },
  {
    title: "Relationships",
    text: "What happens between people matters. That includes closeness, conflict, distance, and attachment, as well as the ways these can shape how we feel and respond.",
  },
  {
    title: "Recurring difficulties",
    text: "Some struggles are not just one-off problems. It can help to look at what keeps returning, and at what may be keeping it going.",
  },
];

const explainerBlocks = [
  "People often come to counselling with something that feels urgent in the present, such as anxiety, relationship strain, shame, overwhelm, self-doubt, or a sense of feeling stuck. Those difficulties matter in their own right. But they also sit within a wider emotional and relational context, especially when the same struggles keep returning or when the problem feels bigger than the current situation alone can explain.",
  "My approach is integrative, with psychodynamic and attachment-based thinking as important influences. In practice, that means paying attention not only to what is happening now, but also to the patterns, relationships, and ways of coping that may be shaping it. That can include attachment: the ways people learn closeness, distance, trust, and self-protection through relationships, and how those ways of relating can continue into adult life.",
  "The aim is not to force experience into a theory, but to build a fuller understanding of what is going on, so counselling can make sense of both the immediate problem and the wider pattern around it.",
];

const honestUnderstandingItems = [
  "Naming anxiety, shame, grief, or anger without flattening it into a label.",
  "Understanding relationship patterns that keep returning.",
  "Thinking about identity, sexuality, desire, or intimacy without judgement.",
  "Finding language for what has felt private, confusing, or hard to admit.",
  "Building steadier choices in daily life while deeper work unfolds.",
];

export default function Approach() {
  useEffect(() => {
    document.title = "Approach | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "An integrative, psychodynamically informed counselling approach grounded in real life, relationships, and recurring patterns."
      );
    }
  }, []);

  return (
    <main className="site-page approach-page">
      <section className="approach-page__hero">
        <Container className="approach-page__hero-inner">
          <div className="approach-page__hero-main">
            <h1>Working with the bigger picture</h1>
            <p>
              I seek to understand the problem you are dealing with in the context of your actual life. That means
              paying attention not only to what is happening now, but also to the patterns, pressures, and relationships
              around it, so what we are talking about is grounded in the reality of your life.
            </p>
          </div>

          <div className="approach-page__principles" aria-label="Working principles">
            {principles.map((principle) => (
              <article className="approach-page__principle" key={principle.title}>
                <h2>{principle.title}</h2>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="approach-page__explainer">
        <Container className="approach-page__explainer-grid">
          <div className="approach-page__section-heading">
            <span className="site-eyebrow">Therapeutic frame</span>
            <h2>An integrative, psychodynamically informed approach</h2>
          </div>

          <div className="approach-page__text-stack">
            {explainerBlocks.map((block) => (
              <p key={block}>{block}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="approach-page__panel-section">
        <Container>
          <div className="approach-page__understanding-panel">
            <div>
              <span className="site-eyebrow">What this can help with</span>
              <h2>Not every problem needs to be solved immediately to be understood more honestly.</h2>
              <p>
                People often come when they are tired of carrying things alone, or tired of repeating the same emotional
                shape in different settings.
              </p>
            </div>

            <div className="approach-page__check-panel">
              {honestUnderstandingItems.map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={19} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="approach-page__enquiry">
        <Container className="approach-page__enquiry-grid">
          <div>
            <span className="site-eyebrow">Getting started</span>
            <h2>You do not need a perfect explanation before getting in touch.</h2>
          </div>

          <div className="approach-page__enquiry-panel">
            <p>
              A first enquiry can be short. You might name what is bringing you to counselling, whether you are looking
              for online sessions, and anything important to know before arranging a first appointment.
            </p>
            <Button href="/fees">
              View fees and practical details <ArrowRight size={17} />
            </Button>
          </div>
        </Container>
      </section>

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div>
            <h2>A brief first message is enough to begin.</h2>
            <p>
              You do not need to summarise everything perfectly. A short note about what is bringing you to counselling
              and whether you are looking for online sessions is enough.
            </p>
          </div>
          <Button href="/contact" variant="secondary">
            Contact Vive Counselling <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
