import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

// ── Shared content ────────────────────────────────────────────────

const homepageHeroCopy =
  "Based in Perth, I offer online counselling for adults across Australia. People often come with anxiety, relationship strain, self-criticism, grief, sexuality, or things that feel exposing, confusing, or hard to talk about. My approach is direct, thoughtful, and non-shaming.";

const homepageSignals = [
  { title: "Online across Australia", text: "Private online counselling for adults, available from wherever you are." },
  { title: "Grounded and non-shaming", text: "A direct, thoughtful way of working with material that can feel exposing." },
  { title: "Inclusive practice", text: "Relationships, sexualities, identities, kink, BDSM, and ENM can be spoken about plainly." },
];

const feesSessionDetails = [
  { label: "Fee", value: "$170" },
  { label: "Session length", value: "50 minutes" },
  { label: "Format", value: "Online" },
  { label: "Availability", value: "Adults across Australia" },
];

// ── Homepage hero candidates ───────────────────────────────────────

const homepageCandidates = [
  {
    title: "Centered editorial",
    note: "The most symmetrical option — heading and copy centered at scale, signals as a full-width ruled row at the foot of the hero. Clean, magazine-like, and unambiguously open.",
    className: "opus-hero--centered",
    variant: "centered" as const,
  },
  {
    title: "Asymmetric ledger",
    note: "A document-influenced split: heading fills the left column at scale, copy and signals stack vertically on the right behind a vertical rule. Structured and confident without feeling editorial.",
    className: "opus-hero--ledger",
    variant: "ledger" as const,
  },
  {
    title: "Heavy type",
    note: "The most typographically aggressive option — heading pushed to near-display size on the left, a narrow right column holds copy and signals with ruled dividers. Relies on mass and restraint, no decoration.",
    className: "opus-hero--heavy",
    variant: "heavy" as const,
  },
  {
    title: "Green field, paper card",
    note: "A spatial inversion of the standard pattern: the soft green field is the background, and the heading and copy float in a white card. Signals anchor at the base on paper, bridging card and field.",
    className: "opus-hero--field-card",
    variant: "field-card" as const,
  },
  {
    title: "Horizontal band stack",
    note: "The most architectural option — three distinct horizontal zones: a quiet eyebrow band, the main heading field, and a cedar signal band. The colour shift carries authority without using large type alone.",
    className: "opus-hero--band-stack",
    variant: "band-stack" as const,
  },
];

// ── Fees hero candidates ──────────────────────────────────────────

const feesCandidates = [
  {
    title: "Price monument",
    note: "The fee is the hero. $170 at near-billboard scale on the left — confident, unashamed, and immediately legible. Session details anchor below it. The right column holds the heading and CTA, which clarify rather than lead. For a page where the fee is often the first question, this answers it immediately.",
  },
  {
    title: "Structured intake",
    note: "The hero reads as a composed document — a fee schedule. A surface header band orients the visitor with the heading and framing copy. Below it, a labelled ledger on the left states each fact (fee, duration, format, location) with the fee rendered at a larger scale. The right column holds human framing and the enquiry CTA. Structure signals reliability.",
  },
  {
    title: "Cedar room",
    note: "The entire hero lives in cedar green — a full inversion of the site's typical palette. White type, a composed price card on the right. The departure signals: this is a professional service with a clear and considered fee. The price card is self-contained and readable against the dark field. Buttons are reversed to paper-on-cedar.",
  },
  {
    title: "Promise and price",
    note: "Two horizontal zones with distinct registers. The upper band leads with a large editorial statement about what the fee actually buys — no numbers yet, just the promise. The lower band then delivers the price, details, and CTA in a single horizontal register. Anticipation is the mechanism: promise leads, price follows naturally.",
  },
  {
    title: "Conversational halves",
    note: "The hero is split into two facing sides using a linear-gradient background — paper left, surface right. Left: the emotional framing of the fee, why it exists, what you're paying for. Right: the $170 at display scale with session details below. The two halves face each other like the two sides of a fees conversation.",
  },
];

// ── Homepage hero rendering ───────────────────────────────────────

type HomepageVariant = "centered" | "ledger" | "heavy" | "field-card" | "band-stack";

function HomepageHeroVariant({ candidate }: { candidate: (typeof homepageCandidates)[number] }) {
  const { className, variant } = candidate;
  const v = variant as HomepageVariant;

  if (v === "centered") {
    return (
      <section className={`opus-hero ${className}`}>
        <Container className="opus-hero__inner">
          <div className="opus-hero__top">
            <h2>Counselling for when life feels difficult, tangled, or hard to make sense of.</h2>
            <p>{homepageHeroCopy}</p>
          </div>
          <div className="opus-hero__signals" aria-label="Practice signals">
            {homepageSignals.map((s) => (
              <article className="opus-hero__signal" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>
            ))}
          </div>
        </Container>
        <div className="opus-hero__label-strip">
          <Container><p><strong>01 / Centered editorial</strong> Heading and copy centered · signals as full-width ruled row</p></Container>
        </div>
      </section>
    );
  }

  if (v === "ledger") {
    return (
      <section className={`opus-hero ${className}`}>
        <Container className="opus-hero__inner">
          <div className="opus-hero__top">
            <h2>Counselling for when life feels difficult, tangled, or hard to make sense of.</h2>
          </div>
          <div className="opus-hero__signals" aria-label="Practice signals">
            <p className="opus-hero__copy-aside">{homepageHeroCopy}</p>
            {homepageSignals.map((s) => (
              <article className="opus-hero__signal" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>
            ))}
          </div>
        </Container>
        <div className="opus-hero__label-strip">
          <Container><p><strong>02 / Asymmetric ledger</strong> Large left heading · vertical rule · copy + signals stacked right</p></Container>
        </div>
      </section>
    );
  }

  if (v === "heavy") {
    return (
      <section className={`opus-hero ${className}`}>
        <Container className="opus-hero__inner">
          <div className="opus-hero__top">
            <h2>Counselling for when life feels difficult, tangled, or hard to make sense of.</h2>
          </div>
          <div className="opus-hero__signals" aria-label="Practice signals">
            <span className="opus-hero__eyebrow">Vive Counselling · Perth</span>
            <p className="opus-hero__copy-note">{homepageHeroCopy}</p>
            {homepageSignals.map((s) => (
              <article className="opus-hero__signal" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>
            ))}
          </div>
        </Container>
        <div className="opus-hero__label-strip">
          <Container><p><strong>03 / Heavy type</strong> Display-scale heading left · eyebrow + copy + signals stacked right</p></Container>
        </div>
      </section>
    );
  }

  if (v === "field-card") {
    return (
      <section className={`opus-hero ${className}`}>
        <Container className="opus-hero__inner">
          <div className="opus-hero__top">
            <h2>Counselling for when life feels difficult, tangled, or hard to make sense of.</h2>
            <p>{homepageHeroCopy}</p>
          </div>
          <div className="opus-hero__signals" aria-label="Practice signals">
            {homepageSignals.map((s) => (
              <article className="opus-hero__signal" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>
            ))}
          </div>
        </Container>
        <div className="opus-hero__label-strip">
          <Container><p><strong>04 / Green field, paper card</strong> Soft green field · floating white heading card · signals on paper below</p></Container>
        </div>
      </section>
    );
  }

  if (v === "band-stack") {
    return (
      <section className={`opus-hero ${className}`}>
        <div className="opus-hero__eyebrow-band">
          <span>Vive Counselling · Online psychotherapy · Perth</span>
        </div>
        <div className="opus-hero__inner">
          <Container className="opus-hero__top">
            <h2>Counselling for when life feels difficult, tangled, or hard to make sense of.</h2>
            <p>{homepageHeroCopy}</p>
          </Container>
          <div className="opus-hero__signals" aria-label="Practice signals">
            {homepageSignals.map((s) => (
              <article className="opus-hero__signal" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>
            ))}
          </div>
        </div>
        <div className="opus-hero__label-strip">
          <Container><p><strong>05 / Horizontal band stack</strong> Eyebrow band · paper heading field · cedar signal band</p></Container>
        </div>
      </section>
    );
  }

  return null;
}

// ── Fees hero rendering ───────────────────────────────────────────

function FeesHeroMonument() {
  return (
    <section className="fees-hero fees-hero--monument">
      <Container className="fees-hero__inner">
        <div className="fees-hero__left">
          <div>
            <span className="fees-hero__amount">$170</span>
            <span className="fees-hero__amount-sub">per 50-minute online session</span>
          </div>
          <div className="fees-hero__detail-row">
            {[
              { label: "Duration", value: "50 minutes" },
              { label: "Format", value: "Online" },
              { label: "Location", value: "Australia-wide" },
            ].map((d) => (
              <div className="fees-hero__detail-item" key={d.label}>
                <span className="fees-hero__detail-label">{d.label}</span>
                <span className="fees-hero__detail-value">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="fees-hero__right">
          <div>
            <h2>No ambiguity.<br />No hidden extras.</h2>
            <p>One fee, one session, one clear starting point. The practical details are here so they don't have to fill the space the work is for.</p>
          </div>
          <Button href="/contact">Make an enquiry</Button>
        </div>
      </Container>
      <div className="opus-hero__label-strip">
        <Container><p><strong>01 / Price monument</strong> Fee at display scale · details below · heading and CTA clarify from the right</p></Container>
      </div>
    </section>
  );
}

function FeesHeroIntake() {
  return (
    <section className="fees-hero fees-hero--intake">
      <div className="fees-hero__header">
        <Container>
          <h2>Everything you need to know, set out clearly.</h2>
          <p>A brief reference before the first session. Practical questions are better settled here than in the room.</p>
        </Container>
      </div>
      <div>
        <Container className="fees-hero__body">
          <div className="fees-hero__ledger">
            {feesSessionDetails.map((row) => (
              <div className="fees-hero__ledger-row" key={row.label}>
                <span className="fees-hero__ledger-label">{row.label}</span>
                <span className={`fees-hero__ledger-value${row.label === "Fee" ? " fees-hero__ledger-value--price" : ""}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="fees-hero__cta-col">
            <p>You don't need to explain the whole story before making an enquiry. A short message is enough to start.</p>
            <Button href="/contact">Make an enquiry</Button>
          </div>
        </Container>
      </div>
      <div className="opus-hero__label-strip">
        <Container><p><strong>02 / Structured intake</strong> Surface header band · ledger of facts left · framing and CTA right</p></Container>
      </div>
    </section>
  );
}

function FeesHeroCedarRoom() {
  return (
    <section className="fees-hero fees-hero--cedar-room">
      <Container className="fees-hero__inner">
        <div>
          <span className="fees-hero__badge--inverted">Fees and practical details</span>
          <h2>The practical side of a private counselling practice.</h2>
          <p className="fees-hero__copy">
            Sessions are online, 50 minutes, and held to a clear structure. The fee is the same each session — no variable pricing, no packages.
          </p>
          <div className="fees-hero__actions">
            <Button href="/contact">Make an enquiry</Button>
            <Button href="/approach" variant="secondary">Read the approach</Button>
          </div>
        </div>
        <aside className="fees-hero__price-card" aria-label="Session fee">
          <span className="fees-hero__price-card-eyebrow">Standard session</span>
          <span className="fees-hero__amount">$170</span>
          <span className="fees-hero__price-card-sub">50-minute online counselling session</span>
          <hr className="fees-hero__price-divider" />
          <div className="fees-hero__price-card-details">
            {[
              { label: "Duration", value: "50 min" },
              { label: "Format", value: "Online" },
              { label: "Location", value: "AU-wide" },
            ].map((d) => (
              <div className="fees-hero__price-card-detail" key={d.label}>
                <span>{d.label}</span>
                <strong>{d.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </Container>
      <div className="opus-hero__label-strip">
        <Container><p><strong>03 / Cedar room</strong> Full cedar background · white type · composed price card right</p></Container>
      </div>
    </section>
  );
}

function FeesHeroPromisePrice() {
  return (
    <section className="fees-hero fees-hero--promise-price">
      <div className="fees-hero__promise-band">
        <Container>
          <h2>A private, attentive hour.<br />Here's what that looks like, practically.</h2>
          <p>
            Online, structured, and available across Australia. The fee reflects a consistent private practice —
            not a clinic rate, not a sliding scale.
          </p>
        </Container>
      </div>
      <div className="fees-hero__price-band">
        <Container className="fees-hero__price-band-row">
          <div className="fees-hero__price-cell">
            <span className="fees-hero__amount">$170</span>
            <span className="fees-hero__price-cell-sub">per session</span>
          </div>
          <div className="fees-hero__detail-cells">
            {[
              { label: "Duration", value: "50 minutes" },
              { label: "Format", value: "Online" },
              { label: "Availability", value: "Adults, AU-wide" },
            ].map((d) => (
              <div className="fees-hero__detail-item" key={d.label}>
                <span className="fees-hero__detail-label">{d.label}</span>
                <span className="fees-hero__detail-value">{d.value}</span>
              </div>
            ))}
          </div>
          <div className="fees-hero__cta-cell">
            <Button href="/contact">Make an enquiry</Button>
          </div>
        </Container>
      </div>
      <div className="opus-hero__label-strip">
        <Container><p><strong>04 / Promise and price</strong> Large editorial promise band · lean price row below with fee, details, CTA</p></Container>
      </div>
    </section>
  );
}

function FeesHeroHalves() {
  return (
    <section className="fees-hero fees-hero--halves">
      <Container className="fees-hero__inner">
        <div className="fees-hero__left">
          <div>
            <h2>The fee, without the guesswork.</h2>
            <p>
              One session, one fee. If you're wondering whether it's worth it before you've even started — that's a reasonable question.
              The answer is easier to reach once the practical side is clear.
            </p>
          </div>
          <Button href="/contact">Make an enquiry</Button>
        </div>
        <div className="fees-hero__right">
          <span className="fees-hero__right-eyebrow">Standard session</span>
          <span className="fees-hero__amount">$170</span>
          <span className="fees-hero__right-sub">50-minute online counselling session</span>
          <div className="fees-hero__right-ledger">
            {[
              { label: "Duration", value: "50 minutes" },
              { label: "Format", value: "Online" },
              { label: "Location", value: "Australia-wide" },
            ].map((d) => (
              <div className="fees-hero__right-row" key={d.label}>
                <span>{d.label}</span>
                <strong>{d.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className="opus-hero__label-strip">
        <Container><p><strong>05 / Conversational halves</strong> Paper left (framing) · surface right (price) · gradient background split</p></Container>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function OpusTB() {
  useEffect(() => {
    document.title = "Opus TB | Hero Candidates";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Homepage and fees page hero candidates designed by Claude for Vive Counselling.");
    }
  }, []);

  return (
    <main className="site-page opus-tb-page">

      {/* ── Intro ── */}
      <section className="test-bed-approach-intro">
        <Container className="test-bed-approach-intro__inner">
          <div>
            <span className="site-hero__badge">Opus TB</span>
            <h1>Homepage and fees page hero candidates.</h1>
            <p>
              Two sets of five. The homepage candidates explore different compositional logics for the opening hero.
              The fees candidates treat the $170 fee as the content challenge — each making a distinct argument
              for how to present practical information with authority.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button href="/codex-tb" variant="secondary">View Codex TB <ArrowRight size={16} /></Button>
            <Button href="/" variant="secondary">Current homepage <ArrowRight size={16} /></Button>
          </div>
        </Container>
      </section>

      {/* ── Homepage heroes ── */}
      <section className="test-bed-approach-intro" style={{ borderTop: "1px solid var(--line)" }}>
        <Container>
          <p className="site-eyebrow">Set 01</p>
          <h2>Homepage hero — five compositional directions.</h2>
        </Container>
      </section>

      <div className="opus-test-hero-list">
        {homepageCandidates.map((candidate) => (
          <HomepageHeroVariant key={candidate.title} candidate={candidate} />
        ))}
      </div>

      {/* ── Homepage commentary ── */}
      <section className="test-bed-commentary-section">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">Set 01 notes</p>
            <h2>Homepage hero commentary.</h2>
          </div>
          <div className="test-bed-commentary-grid">
            {homepageCandidates.map((c) => (
              <article className="site-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Fees heroes ── */}
      <section className="test-bed-approach-intro opus-tb-commentary" style={{ borderTop: "2px solid var(--line)" }}>
        <Container>
          <p className="site-eyebrow">Set 02</p>
          <h2>Fees page hero — five ways to present a fee.</h2>
          <p style={{ maxWidth: "580px", color: "var(--muted)", marginTop: "10px", fontSize: "0.97rem", lineHeight: "1.6" }}>
            Each candidate treats the $170 fee differently — as a typographic anchor, a document row, a composed price card,
            a post-promise reveal, or one half of a conversation. Same content, different design argument.
          </p>
        </Container>
      </section>

      <div className="opus-test-hero-list">
        <FeesHeroMonument />
        <FeesHeroIntake />
        <FeesHeroCedarRoom />
        <FeesHeroPromisePrice />
        <FeesHeroHalves />
      </div>

      {/* ── Fees commentary ── */}
      <section className="test-bed-commentary-section opus-tb-commentary">
        <Container>
          <div className="site-grid__heading">
            <p className="site-eyebrow">Set 02 notes</p>
            <h2>Fees hero commentary.</h2>
          </div>
          <div className="test-bed-commentary-grid">
            {feesCandidates.map((c) => (
              <article className="site-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

    </main>
  );
}
