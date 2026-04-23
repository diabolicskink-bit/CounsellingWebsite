import { ArrowRight } from "lucide-react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import DevPageHero from "../../components/DevPageHero";
import DesignSystemSidebar from "../../components/DesignSystemSidebar";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";

const potentialPatterns = [
  { title: "Notice banner", label: "Availability", text: "A quiet announcement strip for availability, holidays, or important practice updates.", className: "design-language-pattern--notice" },
  { title: "Process timeline", label: "Three steps", text: "A compact sequence for enquiry, reply, and first session without making the process feel rigid.", className: "design-language-pattern--timeline" },
  { title: "Comparison row", label: "This / not this", text: "Useful for clarifying inclusive practice, boundaries, crisis limits, or service fit.", className: "design-language-pattern--compare" },
  { title: "Quote panel", label: "Statement", text: "An editorial block for a core belief, therapeutic stance, or memorable line of copy.", className: "design-language-pattern--quote" },
  { title: "Availability slots", label: "Scheduling", text: "A calm way to show broad appointment windows before a booking system exists.", className: "design-language-pattern--slots" },
  { title: "Resource links", label: "Reading", text: "A link cluster for policies, FAQs, external supports, or deeper site pages.", className: "design-language-pattern--resources" },
  { title: "Definition pair", label: "Term / meaning", text: "Good for explaining therapy words, session formats, or inclusive practice language.", className: "design-language-pattern--definition" },
  { title: "Progress marker", label: "Path", text: "A soft visual cue for where someone is in an enquiry or onboarding sequence.", className: "design-language-pattern--progress" },
  { title: "Micro CTA", label: "Prompt", text: "A small inline action for moments where a full CTA panel would feel too loud.", className: "design-language-pattern--micro-cta" },
  { title: "Boundary note", label: "Care limits", text: "A contained way to present crisis limits, cancellation terms, or privacy reminders.", className: "design-language-pattern--boundary" },
];

const informationPatterns = [
  {
    eyebrow: "01 / detail stack",
    title: "Ruled statement stack",
    text: "For short, high-confidence statements that should feel direct without becoming cards.",
    className: "info-pattern--detail-stack",
    items: ["Less time explaining context before the real work begins", "Consent, shame, identity, and relationship shape can be named plainly", "The work stays focused on what matters, not on making your life legible"],
  },
  {
    eyebrow: "02 / split proof",
    title: "Claim with supporting evidence",
    text: "For pairing a broad promise with concrete details that make the promise feel believable.",
    className: "info-pattern--split-proof",
    items: ["Online sessions", "Adults across Australia", "Clear first enquiry", "Non-shaming tone"],
  },
  {
    eyebrow: "03 / stepped path",
    title: "Simple process path",
    text: "For explaining how someone moves from curiosity to contact without making the process feel bureaucratic.",
    className: "info-pattern--steps",
    items: ["Send a short note", "Receive a reply", "Arrange a first session"],
  },
  {
    eyebrow: "04 / context cluster",
    title: "Grouped topic cluster",
    text: "For showing related themes without implying the visitor needs to fit a single category.",
    className: "info-pattern--cluster",
    items: ["Anxiety", "Attachment", "Kink", "ENM", "Shame", "Identity", "Grief", "Conflict"],
  },
  {
    eyebrow: "05 / quote and note",
    title: "Editorial quote with practical note",
    text: "For combining a memorable line with a grounded explanation or caveat.",
    className: "info-pattern--quote-note",
    items: ["You do not need a perfect explanation before getting in touch.", "A first enquiry can be short."],
  },
  {
    eyebrow: "06 / comparison",
    title: "This means / this does not mean",
    text: "For clarifying boundaries, inclusive practice, or therapeutic stance without sounding defensive.",
    className: "info-pattern--comparison",
    items: ["Plain language", "No pathologising", "No pressure to over-explain", "No crisis service claim"],
  },
  {
    eyebrow: "07 / practical ledger",
    title: "Practical detail ledger",
    text: "For fees, session length, payment notes, location, and policy details that need calm structure.",
    className: "info-pattern--ledger",
    items: ["Session length: 50 minutes", "Fee: $170", "Format: online", "Location: Australia-wide"],
  },
  {
    eyebrow: "08 / reassurance rail",
    title: "Side rail for reassurance",
    text: "For holding emotional reassurance beside practical copy, especially on contact and fees pages.",
    className: "info-pattern--rail",
    items: ["A short message is enough", "You can leave detail for later", "No need to summarise everything"],
  },
  {
    eyebrow: "09 / card constellation",
    title: "Uneven card constellation",
    text: "For adding movement to topic previews while keeping the palette calm and controlled.",
    className: "info-pattern--constellation",
    items: ["Relationships", "Overthinking", "Self-worth", "Trauma", "Desire"],
  },
  {
    eyebrow: "10 / final prompt",
    title: "Large quiet final prompt",
    text: "For ending a page with a confident line and one action, without using a loud marketing CTA.",
    className: "info-pattern--final-prompt",
    items: ["Start where you are.", "Get in touch"],
  },
];

const principleSamples = [
  { title: "Real life", text: "The design should stay connected to practical decisions, relationships, and the pressures of ordinary life." },
  { title: "Relationships", text: "Patterns between people can be presented with clarity, space, and a sense of emotional containment." },
  { title: "Recurring difficulties", text: "Repeated themes need room for explanation without making the page feel dense or clinical." },
];

// AI maintainers: this page documents page-level composition. If a production
// page repeats a layout such as split copy, principles, FAQ beside a heading,
// or a single-column hero, document it here and use shared site-* classes.
export default function DS_Patterns() {
  useDocumentMetadata("Patterns | Design System | Vive Counselling");

  return (
    <main className="site-page design-language-page">
      <DevPageHero
        badge="Design system"
        title="Patterns"
        description="Reusable section compositions, information layouts, and media treatments — the page-level building blocks."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">

          <section className="ds-section" id="section-patterns">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Section patterns</span>
              <h2>Additional reusable pieces that may be useful as the site grows.</h2>
              <p>Each pattern has a specific content type and use case. Don't use a pattern outside its intended register.</p>
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
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Shared dev-page header</p>
              <section className="hero-section hero-bg--default" style={{ borderBottom: "none", paddingTop: 0 }}>
                <Container>
                  <div className="hero-top" style={{ paddingBottom: 0 }}>
                    <div>
                      <span className="hero-badge">Design system</span>
                      <h2 className="hero-display" style={{ marginBottom: 0 }}>Use the shared hero system here too.</h2>
                    </div>
                    <div className="hero-copy-panel">
                      <p>
                        Design system and test-bed pages now use the same shared page-opening classes as the live site:
                        <code> .hero-section</code>, <code>.hero-top</code>, <code>.hero-display</code>, and{" "}
                        <code>.hero-copy-panel</code>.
                      </p>
                    </div>
                  </div>
                </Container>
              </section>
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Split copy panel</p>
              <div className="site-split">
                <div className="section-heading">
                  <span className="site-eyebrow">Therapeutic frame</span>
                  <h2>Pair a section heading with contained reading copy.</h2>
                </div>
                <article className="site-copy-panel rich-text">
                  <p>
                    Use this for explanatory counselling copy that needs more containment than plain text, without
                    inventing a page-specific panel class.
                  </p>
                  <p>
                    Links inside rich text inherit the shared editorial link treatment, such as{" "}
                    <a href="/working-with-joel">reading about working with Joel</a>.
                  </p>
                </article>
              </div>
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Shared closing CTA</p>
              <section className="site-cta-block">
                <Container className="site-cta-block__inner">
                  <div className="site-cta-block__copy">
                    <h2>
                      For when <span className="site-emphasis">"I just need to talk to someone."</span>
                    </h2>
                    <p>
                      Use this as the default page-ending prompt when one strong line and one clear next step are
                      enough.
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
              <span className="site-eyebrow">Information patterns</span>
              <h2>Reusable ways to present common counselling-site content.</h2>
              <p>Ten numbered patterns — each demonstrates a distinct layout approach for a specific content type. The pattern name indicates its purpose; don't repurpose across content types.</p>
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
              <span className="site-eyebrow">Media panels</span>
              <h2>Portrait, note, and principle treatments.</h2>
              <p>Three quiet treatments for image context, reflective copy, and grouped principles. Keep these understated — they support the copy, not the other way around.</p>
            </div>

            <div className="design-language-media-grid">
              <div className="design-language-portrait-card">
                <img src="/joel-griffiths-portrait-temp.svg" alt="" />
                <div>
                  <strong>Portrait or image panel</strong>
                  <span>Use for practitioner images, article visuals, or grounded supporting context.</span>
                </div>
              </div>

              <div className="design-language-note-panel">
                <span>Letter or note treatment</span>
                <p>
                  A quieter text block can hold reflective copy without becoming a full card. It works well for personal
                  notes, therapeutic stance, or copy that should feel direct but not promotional.
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
              <p className="site-highlight__eyebrow" style={{ marginBottom: "14px" }}>Shared principle stack</p>
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
              <strong>Portrait card</strong> — For the practitioner image and name. Keep the image placeholder until a real photo exists.<br />
              <strong>Note panel</strong> — For reflective or first-person copy that should feel less formal than a card.<br />
              <strong>Principle blocks</strong> — For grouped values or stance statements. Three items is the right number.
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
