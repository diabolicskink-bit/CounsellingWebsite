import { ArrowRight } from "lucide-react";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import DevPageHero from "../../../components/DevPageHero";
import DesignSystemSidebar from "../../../components/DesignSystemSidebar";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";

const potentialPatterns = [
  { title: "Notice banner", label: "Availability", text: "Earlier proposed as a quiet announcement strip for availability, holidays, or practice updates.", className: "design-language-pattern--notice" },
  { title: "Process timeline", label: "Three steps", text: "Earlier proposed as a compact sequence for enquiry, reply, and first session.", className: "design-language-pattern--timeline" },
  { title: "Comparison row", label: "This / not this", text: "Earlier proposed for clarifying inclusive practice, boundaries, crisis limits, or service fit.", className: "design-language-pattern--compare" },
  { title: "Quote panel", label: "Statement", text: "Earlier proposed as an editorial block for a belief, therapeutic stance, or memorable line.", className: "design-language-pattern--quote" },
  { title: "Availability slots", label: "Scheduling", text: "Earlier proposed for broad appointment windows before a booking system existed.", className: "design-language-pattern--slots" },
  { title: "Resource links", label: "Reading", text: "Earlier proposed as a link cluster for policies, FAQs, external supports, or deeper pages.", className: "design-language-pattern--resources" },
  { title: "Definition pair", label: "Term / meaning", text: "Earlier proposed for therapy terms, session formats, or inclusive-practice language.", className: "design-language-pattern--definition" },
  { title: "Progress marker", label: "Path", text: "Earlier proposed as a cue within an enquiry or onboarding sequence.", className: "design-language-pattern--progress" },
  { title: "Micro CTA", label: "Prompt", text: "Earlier proposed as a small inline action where a full CTA panel felt too loud.", className: "design-language-pattern--micro-cta" },
  { title: "Boundary note", label: "Care limits", text: "Earlier proposed for crisis limits, cancellation terms, or privacy reminders.", className: "design-language-pattern--boundary" },
];

const informationPatterns = [
  {
    eyebrow: "01 / detail stack",
    title: "Ruled statement stack",
    text: "The snapshot proposed this for short, high-confidence statements without card containment.",
    className: "info-pattern--detail-stack",
    items: ["Less time explaining context before the real work begins", "Consent, shame, identity, and relationship shape can be named plainly", "The work stays focused on what matters, not on making your life legible"],
  },
  {
    eyebrow: "02 / split proof",
    title: "Claim with supporting evidence",
    text: "The snapshot proposed this for pairing a broad promise with concrete supporting details.",
    className: "info-pattern--split-proof",
    items: ["Counselling sessions", "Adults across Australia", "Clear first enquiry", "Non-shaming tone"],
  },
  {
    eyebrow: "03 / stepped path",
    title: "Simple process path",
    text: "The snapshot proposed this for explaining a path from curiosity to contact.",
    className: "info-pattern--steps",
    items: ["Send a short note", "Receive a reply", "Arrange a first session"],
  },
  {
    eyebrow: "04 / context cluster",
    title: "Grouped topic cluster",
    text: "The snapshot proposed this for related themes without imposing a single visitor category.",
    className: "info-pattern--cluster",
    items: ["Anxiety", "Attachment", "Kink", "ENM", "Shame", "Identity", "Grief", "Conflict"],
  },
  {
    eyebrow: "05 / quote and note",
    title: "Editorial quote with practical note",
    text: "The snapshot proposed this for combining a memorable line with grounded explanation.",
    className: "info-pattern--quote-note",
    items: ["You do not need a perfect explanation before getting in touch.", "A first enquiry can be short."],
  },
  {
    eyebrow: "06 / comparison",
    title: "This means / this does not mean",
    text: "The snapshot proposed this for clarifying boundaries, inclusive practice, or therapeutic stance.",
    className: "info-pattern--comparison",
    items: ["Plain language", "No pathologising", "No pressure to over-explain", "No crisis service claim"],
  },
  {
    eyebrow: "07 / practical ledger",
    title: "Practical detail ledger",
    text: "The snapshot proposed this for fees, session length, payment, location, and policy details.",
    className: "info-pattern--ledger",
    items: ["Session length: 50 minutes", "Fee: $170", "Individual counselling", "Location: Australia-wide"],
  },
  {
    eyebrow: "08 / reassurance rail",
    title: "Side rail for reassurance",
    text: "The snapshot proposed this for holding emotional reassurance beside practical copy.",
    className: "info-pattern--rail",
    items: ["A short message is enough", "You can leave detail for later", "No need to summarise everything"],
  },
  {
    eyebrow: "09 / card constellation",
    title: "Uneven card constellation",
    text: "The snapshot proposed this for adding movement to topic previews within its recorded palette.",
    className: "info-pattern--constellation",
    items: ["Relationships", "Overthinking", "Self-worth", "Trauma", "Desire"],
  },
  {
    eyebrow: "10 / final prompt",
    title: "Large quiet final prompt",
    text: "The snapshot proposed this for a confident page ending with one action.",
    className: "info-pattern--final-prompt",
    items: ["Start where you are.", "Get in touch"],
  },
];

const principleSamples = [
  { title: "Real life", text: "The earlier sample connected design decisions to practical pressures, relationships, and ordinary life." },
  { title: "Relationships", text: "The earlier sample presented interpersonal patterns with clarity, space, and emotional containment." },
  { title: "Recurring difficulties", text: "The earlier sample gave repeated themes room for explanation without a dense or clinical effect." },
];

const demoPortraitSrc = "/joel-griffiths-homepage-portrait.jpg";

export default function DS_Patterns() {
  useDocumentMetadata(
    "Historical Patterns | Design Catalogue | Vive Counselling",
    "An archived snapshot of earlier Vive page-pattern guidance, retained for historical reference and source-backed reconciliation.",
  );

  return (
    <main className="site-page">
      <DevPageHero
        badge="Historical catalogue"
        title="Historical patterns"
        description="An outdated snapshot of earlier section compositions, information layouts, and media treatments. These examples are not current production guidance or approved reusable API."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">

          <section className="ds-section" id="section-patterns">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical section patterns</span>
              <h2>Earlier pattern proposals retained for reconciliation.</h2>
              <p>The snapshot associated each proposal with a specific content register; none has been revalidated here.</p>
            </div>

            <div className="design-language-pattern-grid">
              {potentialPatterns.map((pattern) => (
                <article className={`design-language-pattern ${pattern.className}`} key={pattern.title}>
                  <span>{pattern.label}</span>
                  <h3>{pattern.title}</h3>
                  <p>{pattern.text}</p>
                </article>
              ))}
            </div>

            <div className="ds-demo" style={{ marginTop: "28px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Historical sample: dev-page header</p>
              <section className="hero-section hero-bg--default" style={{ borderBottom: "none", paddingTop: 0 }}>
                <Container>
                  <div className="hero-top" style={{ paddingBottom: 0 }}>
                    <div>
                      <span className="hero-badge">Historical catalogue</span>
                      <p className="hero-display" style={{ marginBottom: 0 }}>The earlier shared hero treatment.</p>
                    </div>
                    <div className="hero-copy-panel">
                      <p>
                        This snapshot recorded the same page-opening classes for design-system, test-bed, and public pages:
                        <code> .hero-section</code>, <code>.hero-top</code>, <code>.hero-display</code>, and{" "}
                        <code>.hero-copy-panel</code>.
                      </p>
                    </div>
                  </div>
                </Container>
              </section>
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Historical sample: split copy panel</p>
              <div className="site-split">
                <div className="section-heading">
                  <span className="site-eyebrow">Therapeutic frame</span>
                  <h2>The recorded heading-and-copy pairing.</h2>
                </div>
                <article className="site-copy-panel rich-text">
                  <p>
                    The earlier catalogue positioned this as explanatory counselling copy with more containment than
                    plain text, without a page-specific panel class.
                  </p>
                  <p>
                    The historical sample also preserves its recorded editorial link treatment, such as{" "}
                    <a href="/working-with-joel">reading about working with Joel</a>.
                  </p>
                </article>
              </div>
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Historical sample: closing CTA</p>
              <section className="site-cta-block">
                <Container className="site-cta-block__inner">
                  <div className="site-cta-block__copy">
                    <h2>
                      For when <span className="site-emphasis">"I just need to talk to someone."</span>
                    </h2>
                    <p>
                      The earlier catalogue described this as a default page-ending prompt with one strong line and one
                      clear next step.
                    </p>
                  </div>
                  <Button href="/contact">
                    Get in touch <ArrowRight size={16} />
                  </Button>
                </Container>
              </section>
            </div>
          </section>

          <section className="ds-section" id="info-patterns">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical information patterns</span>
              <h2>Ten earlier approaches to counselling-site content.</h2>
              <p>Each numbered snapshot preserves a distinct layout approach and the content purpose previously assigned to it.</p>
            </div>

            <div className="design-language-info-pattern-list">
              {informationPatterns.map((pattern) => (
                <article className={`design-language-info-pattern ${pattern.className}`} key={pattern.title}>
                  <div className="design-language-info-pattern__intro">
                    <span>{pattern.eyebrow}</span>
                    <h3>{pattern.title}</h3>
                    <p>{pattern.text}</p>
                  </div>
                  <div className="design-language-info-pattern__sample">
                    {pattern.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="media-panels">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical media panels</span>
              <h2>Recorded portrait, note, and principle treatments.</h2>
              <p>The snapshot described three quiet treatments supporting image context, reflective copy, and grouped principles.</p>
            </div>

            <div className="design-language-media-grid">
              <div className="design-language-portrait-card">
                <img src={demoPortraitSrc} alt="" />
                <div>
                  <strong>Portrait or image panel</strong>
                  <span>Earlier intended role: practitioner images, article visuals, or grounded supporting context.</span>
                </div>
              </div>

              <div className="design-language-note-panel">
                <span>Letter or note treatment</span>
                <p>
                  The snapshot used this quieter text block for reflective copy without full card containment, including
                  personal notes and therapeutic stance.
                </p>
              </div>

              <div className="design-language-principles" aria-label="Principle block examples">
                {principleSamples.map((item) => (
                  <article className="design-language-principle" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Historical sample: principle stack</p>
              <div className="site-principles" aria-label="Shared principle block examples">
                {principleSamples.map((item) => (
                  <article className="site-principle" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>Earlier portrait-card role:</strong> practitioner imagery and name.<br />
              <strong>Earlier note-panel role:</strong> reflective or first-person copy with less formality than a card.<br />
              <strong>Earlier principle-block role:</strong> three grouped values or stance statements.
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
