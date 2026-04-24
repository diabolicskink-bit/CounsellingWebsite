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
import Button from "../../components/Button";
import Container from "../../components/Container";
import DevPageHero from "../../components/DevPageHero";
import DesignSystemSidebar from "../../components/DesignSystemSidebar";
import EnquiryForm from "../../components/EnquiryForm";
import FaqSection from "../../components/FaqSection";
import { enquiryEmail, enquiryFormContent } from "../../data/enquiry";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";

const iconCards = [
  { icon: Sparkles, title: "Composed first impressions", description: "A restrained visual system with enough structure to feel confident, calm, and deliberate." },
  { icon: ShieldCheck, title: "Contained trust", description: "A quieter frame for sensitive material, using contrast and rhythm rather than visual noise." },
  { icon: Laptop, title: "Online practice", description: "Service details can be presented clearly without making the page feel administrative." },
  { icon: Users, title: "Inclusive signals", description: "Short cues, careful hierarchy, and plain copy make specialist support easier to scan." },
  { icon: FileText, title: "Practical information", description: "Fees, session format, policies, and next steps can sit within the same design language." },
  { icon: Clock, title: "Steady rhythm", description: "Section spacing, cards, panels, and dividers create structure without heavy decoration." },
];

const trustItems = [
  "Online across Australia",
  "For adults",
  "Grounded and non-shaming",
  "Inclusive relationships, sexualities, and identities",
];

const trustHighlightItems = [
  "For adults",
  "Online across Australia",
  "Grounded and non-shaming",
  "Monogamy is not treated as the default answer",
];

const checkItems = [
  "Use paper and soft green surfaces for section rhythm.",
  "Use cedar for primary actions and small emphasis only.",
  "Keep cards quiet, crisp, and lightly elevated.",
  "Let spacing and borders do more work than decoration.",
];

const gridCheckItems = [
  "Identity, self-understanding, uncertainty, or questioning.",
  "Family rejection, family strain, or religious conflict.",
  "Shame, minority stress, or internalised criticism.",
  "Relationships, intimacy, visibility, and belonging.",
];

const detailStackItems = [
  "Less time educating the therapist",
  "Consent, boundaries, power exchange, and BDSM can be discussed directly",
  "Polyamory, open relationships, and ethical non-monogamy are not treated as the problem",
  "More room for what matters",
];

const linkedDetailStackItems = [
  {
    title: "Kink & BDSM-aware counselling",
    copy: "Nothing needs to be softened, translated, or defended before the real conversation begins.",
    href: "/inclusion/kink-bdsm",
  },
  {
    title: "Polyamory & ENM counselling",
    copy: "Relationship structure is not treated as the problem before we understand what is actually difficult.",
    href: "/inclusion/enm-polyamory",
  },
  {
    title: "LGBTQIA+ inclusive counselling",
    copy: "Gender, sexuality, identity, and belonging can be part of the conversation or simply part of who you are.",
    href: "/inclusion/lgbtqia",
  },
];

const faqItems = [
  {
    question: "Can this pattern hold several short questions?",
    answer: "Yes. Use it for FAQs where each answer needs space, not for tiny metadata or navigation.",
  },
  {
    question: "Should FAQ items be cards?",
    answer: "No. The shared accordion keeps question pages quieter and easier to scan than repeated cards.",
  },
];

const footerDemoLinks = [
  { label: "Working with Joel", href: "/working-with-joel" },
  { label: "Inclusive practice", href: "/inclusion" },
  { label: "Fees", href: "/fees" },
  { label: "Contact", href: "/contact" },
];

const footerDemoDetails = [
  { label: enquiryEmail, href: `mailto:${enquiryEmail}` },
  { label: "Online across Australia" },
  { label: "Mon to Fri, 9.30am to 5.00pm WST" },
];

// AI maintainers: this page documents reusable UI components. When a production
// page needs a repeated card/list/panel treatment, add it here using the real
// shared class names instead of creating a page-specific lookalike.
export default function DS_Components() {
  useDocumentMetadata("Components | Design System | Vive Counselling");

  return (
    <main className="site-page">
      <DevPageHero
        badge="Design system"
        title="Components"
        description="Buttons, cards, trust strips, forms, and list treatments — the reusable UI pieces and their usage rules."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">

          <section className="ds-section" id="buttons">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Buttons</span>
              <h2>Actions should feel stable, not salesy.</h2>
              <p>Primary actions use cedar. Secondary stays quieter. Text links are visible without looking like a separate brand language.</p>
            </div>

            <div className="ds-demo ds-demo--gap">
              <Button href="/contact">Primary button</Button>
              <Button href="/fees" variant="secondary">Secondary button</Button>
              <Button href="/inclusion" variant="tertiary">Tertiary button</Button>
              <a href="/working-with-joel" className="site-text-link">
                Text link <ArrowRight size={15} />
              </a>
            </div>

            <div className="ds-usage-note">
              <strong>Primary</strong> — One per view. Contact, enquiry, key next step. Never use for navigation.<br />
              <strong>Secondary</strong> — Supporting action alongside primary (e.g. "View fees" next to "Get in touch").<br />
              <strong>Tertiary</strong> — Low-emphasis action on a coloured or busy surface.<br />
              <strong>Text link</strong> — Inline contextual navigation within copy. Not a standalone CTA.
            </div>
          </section>

          <section className="ds-section" id="cards">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Cards</span>
              <h2>Reusable cards for service themes, practical details, and reassurance points.</h2>
              <p>Cards should feel quiet and crisp. Avoid adding decoration — the icon, title, and copy carry the weight.</p>
            </div>

            <div className="site-card-grid">
              {iconCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="site-card" key={item.title}>
                    <div className="site-card__icon">
                      <Icon size={24} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>

            {/* AI maintainers: linked cards use the same site-card primitive. Do not create a page-specific card class just to add bullets or a trailing action. */}
            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Linked card example</p>
              <a className="site-card site-card--link" href="/inclusion/kink-bdsm" style={{ maxWidth: "360px" }}>
                <h3>Kink & BDSM-aware counselling</h3>
                <p>For a destination card where short context and common topics need to sit together.</p>
                <ul className="site-card__list">
                  <li>Shame or secrecy</li>
                  <li>Boundaries and consent</li>
                  <li>Conflict inside a dynamic</li>
                </ul>
                <span className="site-card__action">
                  Read the page <ArrowRight size={16} />
                </span>
              </a>
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Topic grid and content stack</p>
              <div className="site-content-stack" style={{ maxWidth: "720px" }}>
                <div className="site-topic-grid">
                  <article className="site-topic-card">
                    <h3>Anxiety and overthinking</h3>
                    <p>For compact issue cards that need a consistent two-up rhythm inside a content column.</p>
                  </article>
                  <article className="site-topic-card">
                    <h3>Relationship strain</h3>
                    <p>Use the shared grid instead of recreating the same local two-column card layout.</p>
                  </article>
                </div>
                <p className="site-ruled-paragraph site-ruled-paragraph--wide">
                  Wider ruled notes can sit under a card grid without each page inventing its own note sizing.
                </p>
              </div>
            </div>

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>Icon cards</strong> (site-card) — For service features, practice signals, and grouped reassurances. Use a grid of 3 or 6.<br />
              <strong>Chips / pills</strong> — Use <code>.site-pill-row</code> for short categorical tags inside a panel. Not for standalone navigation.
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Pill row example</p>
              <div className="site-pill-row">
                <span>Guided intake path</span>
                <span>Trust badges</span>
                <span>Outcome themes</span>
                <span>Service bundles</span>
              </div>
            </div>
          </section>

          <section className="ds-section" id="trust-strip">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Trust strip</span>
              <h2>Compact reassurance before heavier content begins.</h2>
              <p>Short factual signals: format, audience, location, registration, or practice stance. Text-led, understated, dot-divided.</p>
            </div>

            <div className="ds-demo">
              <ul className="site-trust-list" aria-label="Trust strip example">
                {trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ds-demo" style={{ marginTop: "16px" }}>
              <ul className="site-trust-list site-trust-list--highlight-last" aria-label="Trust strip with highlighted last item">
                {trustHighlightItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ds-usage-note">
              <strong>Use directly under</strong> hero copy, page introductions, or compact service summaries.<br />
              <strong>Optional modifier</strong> add <code>.site-trust-list--highlight-last</code> when the final item is a positioning statement that should stand apart from the factual cues above it.<br />
              <strong>Avoid</strong> using it as a replacement for detailed cards when the information needs explanation. Never more than 4–5 items.
            </div>
          </section>

          <section className="ds-section" id="forms">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Forms & contact</span>
              <h2>Contact surfaces should feel clear, calm, and low-friction.</h2>
              <p>Form fields, side notes, and contact details use the same card, border, and icon language as the rest of the site.</p>
            </div>

            <div className="ds-demo" style={{ maxWidth: "760px" }}>
              <EnquiryForm content={enquiryFormContent} idPrefix="design-system-enquiry" />
            </div>

            <div className="site-contact-strip" style={{ marginTop: "32px" }}>
              {[
                { icon: Mail, label: "Email", value: "hello@example.com" },
                { icon: Phone, label: "Phone", value: "Short call available" },
                { icon: MapPin, label: "Location", value: "Online across Australia" },
              ].map(({ icon: Icon, label, value }) => (
                <div className="site-contact-item" key={label}>
                  <span className="icon-box">
                    <Icon size={20} />
                  </span>
                  <p>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>Enquiry form</strong> - Use the shared <code>EnquiryForm</code> component and <code>src/data/enquiry.ts</code> content so the production contact form and this example stay identical.<br />
              <strong>All form elements</strong> share the same border, radius, and focus-ring treatment. Do not invent custom input styles.<br />
              <strong>Contact strip</strong> — Icon + label + value. Use for email, phone, and location. Sits below the form or in a page aside.
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Fee card example</p>
              <aside className="site-fee-card" style={{ maxWidth: "280px" }}>
                <p className="site-highlight__eyebrow">Session fee</p>
                <strong>$170</strong>
                <span>50-minute online counselling session</span>
                <small>Short notes can sit here without overpowering the amount.</small>
              </aside>
            </div>
          </section>

          <section className="ds-section" id="footer">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Footer</span>
              <h2>The shared footer should close the page quietly.</h2>
              <p>Keep it thin: brand, utility links, and one restrained detail line. It should feel finished, not promotional.</p>
            </div>

            <div className="ds-demo">
              <div className="site-footer">
                <Container className="site-footer__inner">
                  <div className="site-footer__primary">
                    <div className="site-footer__brand-block">
                      <a className="brand" href="/">
                        <span className="brand__name">Vive Counselling</span>
                      </a>
                    </div>

                    <nav className="site-footer__nav" aria-label="Footer example navigation">
                      {footerDemoLinks.map((item) => (
                        <a href={item.href} key={item.href}>
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div className="site-footer__secondary">
                    <ul className="site-trust-list site-footer__details" aria-label="Footer example details">
                      {footerDemoDetails.map((item) => (
                        <li key={item.label}>
                          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                        </li>
                      ))}
                    </ul>
                    <p className="site-footer__copyright">&copy; 2026 Vive Counselling</p>
                  </div>
                </Container>
              </div>
            </div>

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>Use for:</strong> shared site chrome only. Keep the footer informational and low-height. Do not add large CTA panels, stacked cards, or repeated page sections here.
            </div>
          </section>

          <section className="ds-section" id="lists">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Lists & stacks</span>
              <h2>Use structure to make content feel manageable.</h2>
              <p>Four distinct text-structure treatments, each suited to a different content register.</p>
            </div>

            <div className="site-split">
              <div>
                <p className="site-eyebrow" style={{ marginBottom: "14px" }}>Check list</p>
                <div className="site-check-panel">
                  {checkItems.map((item) => (
                    <div className="check-item" key={item}>
                      <CheckCircle2 size={19} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="ds-usage-note">
                  <strong>Use for:</strong> Practical guidance, design rules, feature confirmation. Use <code>.site-check-panel</code>; the icon is an accent, not the feature.
                </div>
              </div>

              <div>
                <p className="site-eyebrow" style={{ marginBottom: "14px" }}>Grid check panel</p>
                <div className="site-check-panel site-check-panel--grid">
                  {gridCheckItems.map((item) => (
                    <div className="check-item" key={item}>
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="ds-usage-note">
                  <strong>Use for:</strong> Larger issue lists in a split section. Do not create page-specific item-list classes for this shape.
                </div>
              </div>
            </div>

            <div className="site-split" style={{ marginTop: "28px" }}>
              <div>
                <p className="site-eyebrow" style={{ marginBottom: "14px" }}>Detail stack</p>
                <div className="site-detail-stack" aria-label="Detail stack example">
                  {detailStackItems.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
                <div className="ds-usage-note">
                  <strong>Use for:</strong> Short, high-confidence statements that need quiet emphasis — especially inclusive practice signals. Ruled lines, no icons.
                </div>
              </div>

              <div>
                <p className="site-eyebrow" style={{ marginBottom: "14px" }}>FAQ accordion</p>
                <div className="site-copy-panel">
                  <p style={{ maxWidth: "42ch", margin: 0 }}>
                    FAQ sections now use the shared <code>FaqSection</code> component so spacing, motion, semantics,
                    and open-state behaviour stay consistent across the public site.
                  </p>
                </div>
                <div className="ds-usage-note">
                  <strong>Use for:</strong> Question-and-answer sections. Use the shared <code>FaqSection</code>{" "}
                  component rather than page-level accordion markup.
                </div>
              </div>
            </div>

            <div className="ds-demo" style={{ marginTop: "28px", maxWidth: "640px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Linked detail stack</p>
              <div className="site-detail-stack site-detail-stack--linked" aria-label="Linked detail stack example">
                {linkedDetailStackItems.map((item) => (
                  <div className="site-detail-stack__item" key={item.title}>
                    <a className="site-detail-stack__link" href={item.href}>
                      <span className="site-detail-stack__heading">
                        <strong className="site-detail-stack__title">{item.title}</strong>
                        <span className="site-detail-stack__action">
                          Learn more <ArrowRight className="site-detail-stack__icon" size={16} aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                    <p className="site-detail-stack__copy">{item.copy}</p>
                  </div>
                ))}
              </div>
              <div className="ds-usage-note" style={{ marginTop: "16px" }}>
                <strong>Use for:</strong> Small destination lists where each item needs a clear next-step cue plus one short line of context. Keep it to a handful of links, not a full navigation menu.
              </div>
            </div>

            <div className="ds-demo" style={{ marginTop: "28px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Ruled paragraph</p>
              <p className="site-ruled-paragraph" style={{ maxWidth: "52ch", fontSize: "1.04rem", lineHeight: 1.68 }}>
                Use this for a single paragraph that needs a little more visual weight than plain body copy, but not the
                full containment of a panel. It works well for orienting copy, quiet reassurance, or a paragraph that
                should feel slightly set apart from the surrounding text.
              </p>
              <div className="ds-usage-note" style={{ marginTop: "16px" }}>
                <strong>Use for:</strong> One paragraph at a time. A subtle left-rule cue for reflective, orienting, or
                trust-building copy. Do not use it for long rich-text blocks or stacked multi-paragraph content.
              </div>
            </div>
          </section>

          <section className="ds-section" id="faq-accordion">
            <div className="ds-section-heading">
              <span className="site-eyebrow">FAQ accordion</span>
              <h2>Use the shared component at full section width.</h2>
              <p>
                The live example below shows the reusable FAQ treatment with its intended spacing, contained reveal,
                and one-open-at-a-time behaviour.
              </p>
            </div>

            <FaqSection
              intro="Use this shared section when answers need comfortable reading space and the interaction should feel calm, clear, and contained."
              items={faqItems}
              title="Common questions before starting"
            />
          </section>

        </div>
      </div>
    </main>
  );
}
