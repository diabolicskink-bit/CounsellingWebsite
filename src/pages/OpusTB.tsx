import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

// ── Content ───────────────────────────────────────────────────────

const approachCopy =
  "I seek to understand the problem you are dealing with in the context of your actual life. Paying attention not only to what is happening now, but also to the patterns, pressures, and relationships around it — so the work is grounded in the reality of your life.";

const approachPrinciples = [
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

// ── Background variants ───────────────────────────────────────────

const bgVariants = [
  {
    bgClass: "approach-v2--bg-surface",
    num: "01",
    title: "Surface tint",
    desc: "var(--surface) as the hero background. Slightly cooler and greener than paper — gives the section its own identity and makes the principles below feel like a continuation of the same zone.",
  },
  {
    bgClass: "approach-v2--bg-diagonal",
    num: "02",
    title: "Diagonal gradient",
    desc: "135° gradient from surface (top-left) to paper (bottom-right). Adds quiet depth without decoration — the section feels composed rather than flat.",
  },
  {
    bgClass: "approach-v2--bg-cedar-border",
    num: "03",
    title: "Cedar top border",
    desc: "Paper background with a 5px cedar top border. A single strong colour edge is a classic editorial device — signals the start of the section with authority.",
  },
  {
    bgClass: "approach-v2--bg-cedar-soft",
    num: "04",
    title: "Cedar soft",
    desc: "var(--cedar-soft) — the lightest green in the palette. Warmer than surface, distinctly site-palette without being loud. The cedar emphasis in the heading sits more naturally against it.",
  },
  {
    bgClass: "approach-v2--bg-fade",
    num: "05",
    title: "Vertical fade",
    desc: "Linear gradient top-to-bottom from surface to paper. The hero feels like it emerges from the page rather than sitting on it — the lightest possible depth treatment.",
  },
];

// ── Hero component ────────────────────────────────────────────────

function ApproachHero({ bgClass, num, title, desc }: (typeof bgVariants)[number]) {
  return (
    <section className={`approach-v2 approach-v2--type-weight ${bgClass}`}>
      <Container>
        <div className="approach-v2__top">
          <h2>
            Working with<br />
            <em>the bigger</em><br />
            picture.
          </h2>
          <p className="approach-v2__copy">{approachCopy}</p>
        </div>
      </Container>
      <div className="approach-v2__principles-section">
        <Container>
          <div className="approach-v2__principles-row">
            {approachPrinciples.map((p) => (
              <div className="approach-v2__principle" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className="opus-hero__label-strip">
        <Container>
          <p><strong>{num} / {title}</strong> {desc}</p>
        </Container>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function OpusTB() {
  useEffect(() => {
    document.title = "Opus TB | Approach Hero Candidates";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Approach page hero background candidates for Vive Counselling.");
    }
  }, []);

  return (
    <main className="site-page opus-tb-page">

      <section className="test-bed-approach-intro">
        <Container className="test-bed-approach-intro__inner">
          <div>
            <span className="site-hero__badge">Opus TB</span>
            <h1>Approach hero — background options.</h1>
            <p>
              Same layout, five background treatments. Surface tint, diagonal gradient,
              cedar top border, cedar soft, and vertical fade.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button href="/codex-tb" variant="secondary">View Codex TB <ArrowRight size={16} /></Button>
            <Button href="/approach" variant="secondary">Current approach page <ArrowRight size={16} /></Button>
          </div>
        </Container>
      </section>

      <div className="opus-test-hero-list">
        {bgVariants.map((v) => (
          <ApproachHero key={v.num} {...v} />
        ))}
      </div>

    </main>
  );
}
