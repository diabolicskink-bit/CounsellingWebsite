import { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Laptop,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const cardSamples = [
  {
    icon: Sparkles,
    title: "Composed first impressions",
    description: "A restrained visual system with enough structure to feel confident, calm, and deliberate.",
  },
  {
    icon: ShieldCheck,
    title: "Contained trust",
    description: "A quieter frame for sensitive material, using contrast and rhythm rather than visual noise.",
  },
  {
    icon: Laptop,
    title: "Online practice",
    description: "Service details can be presented clearly without making the page feel administrative.",
  },
  {
    icon: Users,
    title: "Inclusive signals",
    description: "Short cues, careful hierarchy, and plain copy make specialist support easier to scan.",
  },
  {
    icon: FileText,
    title: "Practical information",
    description: "Fees, session format, policies, and next steps can sit within the same design language.",
  },
  {
    icon: Clock,
    title: "Steady rhythm",
    description: "Section spacing, cards, panels, and dividers create structure without heavy decoration.",
  },
];

const checkItems = [
  "Use paper and soft green surfaces for section rhythm.",
  "Use cedar for primary actions and small emphasis only.",
  "Keep cards quiet, crisp, and lightly elevated.",
  "Let spacing and borders do more work than decoration.",
];

const topicSamples = [
  "Anxiety and overthinking",
  "Relationship patterns",
  "Inclusive practice",
  "Fees and practical details",
];

const detailStackItems = [
  "Less time educating the therapist",
  "Consent, boundaries, power exchange, and BDSM can be discussed directly",
  "Polyamory, open relationships, and ethical non-monogamy are not treated as the problem",
  "More room for what matters",
];

const trustSamples = [
  "Online across Australia",
  "For adults",
  "Grounded and non-shaming",
  "Inclusive relationships, sexualities, and identities",
];

const colorTokens = [
  { name: "Page background", token: "--paper", value: "#F7F6F2", role: "Main page canvas" },
  { name: "Section surface", token: "--surface", value: "#EEF2EC", role: "Soft green section rhythm" },
  { name: "Card surface", token: "--surface-strong", value: "#FCFCFA", role: "Cards, forms and inset panels" },
  { name: "Border", token: "--line", value: "#D6DED3", role: "Dividers and quiet structure" },
  { name: "Heading text", token: "--ink", value: "#20251F", role: "Primary headings and strong labels" },
  { name: "Body text", token: "--body", value: "#3E473F", role: "Main reading copy" },
  { name: "Muted text", token: "--muted", value: "#667064", role: "Supporting copy and metadata" },
  { name: "Primary accent", token: "--cedar", value: "#234B3D", role: "Buttons and small emphasis" },
  { name: "Accent hover", token: "--cedar-dark", value: "#1D4034", role: "Hover and active states" },
  { name: "Accent soft", token: "--cedar-soft", value: "#EEF2EC", role: "Chips, icon wells and subtle washes" },
];

const typographySamples = [
  { label: "H1 / page title", className: "type-sample--h1", text: "Calm, grounded counselling for complicated lives." },
  { label: "H2 / section title", className: "type-sample--h2", text: "A clear structure for sensitive information." },
  { label: "H3 / card title", className: "type-sample--h3", text: "Contained trust" },
  { label: "Body", className: "type-sample--body", text: "Body copy should feel warm, readable, and direct without becoming casual or vague." },
  { label: "Small", className: "type-sample--small", text: "Small notes, caveats, and practical details stay quiet but legible." },
  { label: "Eyebrow", className: "type-sample--eyebrow", text: "Section label" },
];

const layoutRules = [
  { label: "Page width", value: "Use the shared container for all major content blocks." },
  { label: "Section padding", value: "Large sections need enough vertical room to feel calm, not padded for drama." },
  { label: "Card padding", value: "Cards use consistent inner spacing so content feels intentional." },
  { label: "Radius", value: "Corners stay rounded but restrained; avoid pillowy panels." },
  { label: "Shadow", value: "Use very soft elevation only where a surface needs separation." },
  { label: "Green use", value: "Cedar leads actions and tiny emphasis; pale green supports, never dominates." },
];

const usagePrinciples = [
  "Calm and intelligent before decorative.",
  "Warm without becoming beige, cosmetic, or generic wellness.",
  "Use borders, rhythm, and spacing before louder colour.",
  "Make practical information feel clear rather than administrative.",
  "Let inclusive content feel ordinary, direct, and well-held.",
];

const principleSamples = [
  {
    title: "Real life",
    text: "The design should stay connected to practical decisions, relationships, and the pressures of ordinary life.",
  },
  {
    title: "Relationships",
    text: "Patterns between people can be presented with clarity, space, and a sense of emotional containment.",
  },
  {
    title: "Recurring difficulties",
    text: "Repeated themes need room for explanation without making the page feel dense or clinical.",
  },
];

const potentialPatterns = [
  {
    title: "Notice banner",
    label: "Availability",
    text: "A quiet announcement strip for availability, holidays, or important practice updates.",
    className: "design-language-pattern--notice",
  },
  {
    title: "Process timeline",
    label: "Three steps",
    text: "A compact sequence for enquiry, reply, and first session without making the process feel rigid.",
    className: "design-language-pattern--timeline",
  },
  {
    title: "Comparison row",
    label: "This / not this",
    text: "Useful for clarifying inclusive practice, boundaries, crisis limits, or service fit.",
    className: "design-language-pattern--compare",
  },
  {
    title: "Quote panel",
    label: "Statement",
    text: "An editorial block for a core belief, therapeutic stance, or memorable line of copy.",
    className: "design-language-pattern--quote",
  },
  {
    title: "Availability slots",
    label: "Scheduling",
    text: "A calm way to show broad appointment windows before a booking system exists.",
    className: "design-language-pattern--slots",
  },
  {
    title: "Resource links",
    label: "Reading",
    text: "A link cluster for policies, FAQs, external supports, or deeper site pages.",
    className: "design-language-pattern--resources",
  },
  {
    title: "Definition pair",
    label: "Term / meaning",
    text: "Good for explaining therapy words, session formats, or inclusive practice language.",
    className: "design-language-pattern--definition",
  },
  {
    title: "Progress marker",
    label: "Path",
    text: "A soft visual cue for where someone is in an enquiry or onboarding sequence.",
    className: "design-language-pattern--progress",
  },
  {
    title: "Micro CTA",
    label: "Prompt",
    text: "A small inline action for moments where a full CTA panel would feel too loud.",
    className: "design-language-pattern--micro-cta",
  },
  {
    title: "Boundary note",
    label: "Care limits",
    text: "A contained way to present crisis limits, cancellation terms, or privacy reminders.",
    className: "design-language-pattern--boundary",
  },
];

const informationPatterns = [
  {
    eyebrow: "01 / detail stack",
    title: "Ruled statement stack",
    text: "For short, high-confidence statements that should feel direct without becoming cards.",
    className: "info-pattern--detail-stack",
    items: [
      "Less time explaining context before the real work begins",
      "Consent, shame, identity, and relationship shape can be named plainly",
      "The work stays focused on what matters, not on making your life legible",
    ],
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

export default function DesignLanguage() {
  useEffect(() => {
    document.title = "Design Language | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "A design language sample page for Vive Counselling, showing the core visual system, components, and section patterns."
      );
    }
  }, []);

  return (
    <main className="trial-two-page design-language-page">
      <section className="trial-two-hero design-language-hero">
        <Container className="trial-two-hero__content">
          <div className="trial-two-hero__copy">
            <span className="trial-two-hero__badge">Design language</span>
            <h1>Vive's calm, grounded site system in one place.</h1>
            <p>
              A working specimen for the full site direction: homepage colour, serif-led type, cedar accents, quiet
              cards, practical panels, form states, and section architecture.
            </p>
            <ul className="design-language-trust-list" aria-label="Practice details">
              {trustSamples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="trial-two-actions">
              <Button href="/contact">Primary action</Button>
              <Button href="/fees" variant="secondary">
                Secondary action
              </Button>
              <Button href="/inclusive-practice" variant="tertiary">
                Tertiary action
              </Button>
            </div>
          </div>

          <div className="trial-two-hero__panel">
            <div className="trial-two-panel__eyebrow">System tokens</div>
            <ul className="trial-two-feature-list">
              <li>Paper backgrounds, soft green surfaces, and cedar accents.</li>
              <li>Georgia headings with plain, steady body copy.</li>
              <li>Restrained cards, borders, shadows, chips, and panels.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="trial-two-spotlight">
        <Container className="design-language-split">
          <article>
            <span className="trial-two-spotlight__eyebrow">Typography and rhythm</span>
            <h2>Strong enough to anchor the page, soft enough to stay human.</h2>
            <p>
              Headings carry the main emotional weight. Body copy stays warm and readable. Labels are restrained,
              direct, and used sparingly.
            </p>
          </article>

          <div className="trial-two-spotlight__stats">
            <div>
              <strong>01</strong>
              <span>Hero and page intro treatment</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Cards, chips, panels and dividers</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Forms, CTAs and practical content</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="design-language-reference-section">
        <Container>
          <div className="design-language-reference-heading">
            <span className="trial-two-subtitle">Core colour tokens</span>
            <h2>The palette is a rule set, not just a mood.</h2>
            <p>
              Use green with discipline. The site should read as paper, soft surface, cedar accent, and grounded text,
              not as a broad green wash.
            </p>
          </div>

          <div className="design-language-token-grid">
            {colorTokens.map((color) => (
              <article className="design-language-token" key={color.token}>
                <span className="design-language-token__swatch" style={{ background: color.value }} />
                <div>
                  <h3>{color.name}</h3>
                  <code>{color.token}</code>
                  <p>
                    {color.value} · {color.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="design-language-type-section">
        <Container className="design-language-type-grid">
          <div className="design-language-reference-heading">
            <span className="trial-two-subtitle">Typography scale</span>
            <h2>Serif-led, practical, and confident.</h2>
            <p>
              The type system should feel editorial without becoming theatrical. Labels stay quiet. Body copy does the
              real work.
            </p>
          </div>

          <div className="design-language-type-card">
            {typographySamples.map((sample) => (
              <div className={`design-language-type-sample ${sample.className}`} key={sample.label}>
                <span>{sample.label}</span>
                <p>{sample.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="design-language-button-section">
        <Container className="design-language-button-grid">
          <div className="design-language-reference-heading">
            <span className="trial-two-subtitle">Buttons and links</span>
            <h2>Actions should feel stable, not salesy.</h2>
            <p>
              Primary actions use cedar. Secondary actions stay quieter. Text links should be visible without looking
              like a separate brand language.
            </p>
          </div>

          <div className="design-language-button-card">
            <Button href="/contact">Primary button</Button>
            <Button href="/fees" variant="secondary">
              Secondary button
            </Button>
            <Button href="/inclusive-practice" variant="tertiary">
              Tertiary button
            </Button>
            <a href="/approach" className="design-language-text-link">
              Text link treatment <ArrowRight size={15} />
            </a>
          </div>
        </Container>
      </section>

      <section className="design-language-trust-section">
        <Container className="design-language-trust-spec">
          <div className="design-language-reference-heading">
            <span className="trial-two-subtitle">Trust and status strip</span>
            <h2>Use this for compact reassurance before heavier content begins.</h2>
            <p>
              This pattern is for short factual signals such as format, audience, location, registration, or practice
              stance. It should stay text-led and understated, with dot dividers rather than badges.
            </p>
          </div>

          <div className="design-language-trust-demo">
            <ul className="design-language-trust-list" aria-label="Trust strip example">
              {trustSamples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Best used directly under hero copy, page introductions, or compact service summaries. Avoid using it as a
              replacement for detailed cards when the information needs explanation.
            </p>
          </div>
        </Container>
      </section>

      <section className="trial-two-grid">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">Cards and chips</p>
            <h2>Reusable cards for service themes, practical details, and reassurance points.</h2>
          </div>

          <div className="trial-two-card-grid">
            {cardSamples.map((item) => {
              const Icon = item.icon;
              return (
                <article className="trial-two-card" key={item.title}>
                  <div className="trial-two-card__icon">
                    <Icon size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="trial-two-highlight">
        <Container className="design-language-panel-grid">
          <div className="trial-two-highlight__box">
            <div>
              <span className="trial-two-highlight__eyebrow">Panel treatment</span>
              <h2>Inset panels can hold practical copy without becoming heavy.</h2>
              <p>
                Use these for process notes, fees, policy reminders, inclusive practice details, or supportive
                explanations that need more emphasis than a standard paragraph.
              </p>
            </div>
            <div className="trial-two-pill-row">
              <span>Guided intake path</span>
              <span>Trust badges</span>
              <span>Outcome themes</span>
              <span>Service bundles</span>
            </div>
          </div>

          <aside className="design-language-fee-card">
            <p className="trial-two-highlight__eyebrow">Fee card</p>
            <strong>$170</strong>
            <span>50-minute online counselling session</span>
            <small>Short notes can sit here without overpowering the amount.</small>
          </aside>
        </Container>
      </section>

      <section className="design-language-section">
        <Container className="design-language-split">
          <div className="design-language-section__intro">
            <span className="trial-two-subtitle">Lists and steps</span>
            <h2>Use structure to make next steps feel manageable.</h2>
            <p>
              Check lists should feel practical and grounded. The icon is an accent, not the design feature.
            </p>
          </div>

          <div className="design-language-check-panel">
            {checkItems.map((item) => (
              <div className="check-item" key={item}>
                <CheckCircle2 size={19} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="design-language-detail-section">
        <Container className="design-language-split">
          <div className="design-language-section__intro">
            <span className="trial-two-subtitle">Detail stack</span>
            <h2>Use ruled lines for short statements that need quiet emphasis.</h2>
            <p>
              This pattern works well when a section needs direct, memorable points without turning them into cards or
              badges.
            </p>
          </div>

          <div className="design-language-detail-stack" aria-label="Example detail stack">
            {detailStackItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="design-language-media-section">
        <Container className="design-language-media-grid">
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
        </Container>
      </section>

      <section className="design-language-form-section">
        <Container className="design-language-form-grid">
          <div>
            <span className="trial-two-subtitle">Forms and contact rows</span>
            <h2>Contact surfaces should feel clear, calm, and low-friction.</h2>
            <p>
              Form fields, side notes, and contact details use the same card, border, and icon language as the rest of
              the site.
            </p>
          </div>

          <form className="contact-form design-language-form" action="#" method="post">
            <div className="form-row">
              <label htmlFor="sample-name">Name</label>
              <input id="sample-name" name="name" placeholder="Your name" type="text" />
            </div>
            <div className="form-row">
              <label htmlFor="sample-email">Email</label>
              <input id="sample-email" name="email" placeholder="you@example.com" type="email" />
            </div>
            <div className="form-row">
              <label htmlFor="sample-message">Message</label>
              <textarea id="sample-message" name="message" placeholder="A short message is enough." rows={4} />
            </div>
            <div className="design-language-control-row">
              <label>
                <input name="sample-contact" type="checkbox" /> Email is the best first contact
              </label>
              <label>
                <input name="sample-session" type="radio" /> Online session
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="sample-select">Preferred timing</label>
              <select id="sample-select" name="timing">
                <option>Weekday daytime</option>
                <option>Weekday evening</option>
                <option>Flexible</option>
              </select>
            </div>
            <Button type="submit">Send enquiry</Button>
          </form>
        </Container>

        <Container className="design-language-contact-strip">
          {[
            { icon: Mail, label: "Email", value: "hello@example.com" },
            { icon: Phone, label: "Phone", value: "Short call available" },
            { icon: MapPin, label: "Location", value: "Online across Australia" },
          ].map(({ icon: Icon, label, value }) => (
            <div className="design-language-contact-item" key={label}>
              <span className="icon-box">
                <Icon size={20} />
              </span>
              <p>
                <strong>{label}</strong>
                <span>{value}</span>
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="design-language-topic-section">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">Content tiles</p>
            <h2>Small topic tiles can create movement without breaking the design system.</h2>
          </div>

          <div className="design-language-topic-grid">
            {topicSamples.map((topic) => (
              <article className="design-language-topic-card" key={topic}>
                <h3>{topic}</h3>
                <p>Short supporting copy can help visitors understand where to go next.</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="design-language-html-section">
        <Container className="design-language-html-grid">
          <div className="design-language-section__intro">
            <span className="trial-two-subtitle">Native HTML</span>
            <h2>Base elements should still feel designed.</h2>
            <p>
              Even if these are not used heavily yet, the system should know how to handle editorial content,
              structured information, and simple inline elements.
            </p>
          </div>

          <div className="design-language-html-card">
            <h1>Heading one</h1>
            <h2>Heading two</h2>
            <h3>Heading three</h3>
            <h4>Heading four</h4>
            <p>
              Paragraph copy includes a <a href="/contact">text link</a>, a <strong>strong phrase</strong>, and{" "}
              <code>inline code</code> for technical notes.
            </p>
            <blockquote>The design should make clear information feel steady, not sterile.</blockquote>
            <ul>
              <li>Unordered list item</li>
              <li>Another useful item</li>
            </ul>
            <ol>
              <li>Ordered list item</li>
              <li>Second ordered item</li>
            </ol>
            <table>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Table</td>
                  <td>Fees, availability, comparison, or simple structured data.</td>
                </tr>
                <tr>
                  <td>Quote</td>
                  <td>Editorial emphasis or a careful practice principle.</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <p>Small closing copy can sit after a divider when a section needs a quiet final note.</p>
          </div>
        </Container>
      </section>

      <section className="design-language-rules-section">
        <Container className="design-language-rules-grid">
          <div className="design-language-rule-card">
            <span className="trial-two-subtitle">Layout rules</span>
            <h2>Spacing, borders, radius, and shadow should repeat predictably.</h2>
            <div className="design-language-rule-list">
              {layoutRules.map((rule) => (
                <p key={rule.label}>
                  <strong>{rule.label}</strong>
                  <span>{rule.value}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="design-language-principle-card">
            <span className="trial-two-subtitle">Usage principles</span>
            <h2>What the system should protect.</h2>
            <ul>
              {usagePrinciples.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="design-language-pattern-section">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">Potential patterns</p>
            <h2>Additional reusable pieces that may be useful as the site grows.</h2>
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
        </Container>
      </section>

      <section className="design-language-info-patterns">
        <Container>
          <div className="trial-two-grid__heading">
            <p className="trial-two-subtitle">Information patterns</p>
            <h2>Reusable ways to present common counselling-site content.</h2>
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
        </Container>
      </section>

      <section className="trial-two-cta-block">
        <Container className="trial-two-cta-block__inner">
          <div>
            <h2>A complete page kit for the next round of site design.</h2>
            <p>
              This page can be used as the source for applying the same language across Home, Fees, Approach, About,
              Contact, and Inclusive Practice.
            </p>
          </div>
          <Button href="/fees" variant="secondary">
            See applied Fees page <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
