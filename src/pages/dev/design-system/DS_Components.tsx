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
import BroadTabPanel from "../../../components/BroadTabPanel";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import DevPageHero from "../../../components/DevPageHero";
import DesignSystemSidebar from "../../../components/DesignSystemSidebar";
import EnquiryForm from "../../../components/EnquiryForm";
import FaqSection from "../../../components/FaqSection";
import { enquiryEmail, enquiryFormContent } from "../../../data/enquiry";
import { socialProfileLinks } from "../../../data/site";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";

const iconCards = [
  { icon: Sparkles, title: "Composed first impressions", description: "A restrained visual system with enough structure to feel confident, calm, and deliberate." },
  { icon: ShieldCheck, title: "Contained trust", description: "A quieter frame for sensitive material, using contrast and rhythm rather than visual noise." },
  { icon: Laptop, title: "Practice details", description: "Service details can be presented clearly without making the page feel administrative." },
  { icon: Users, title: "Inclusive signals", description: "Short cues, careful hierarchy, and plain copy make specialist support easier to scan." },
  { icon: FileText, title: "Practical information", description: "Fees, session format, policies, and next steps can sit within the same design language." },
  { icon: Clock, title: "Steady rhythm", description: "Section spacing, cards, panels, and dividers create structure without heavy decoration." },
];

const trustItems = [
  "Adults across Australia",
  "For adults",
  "Grounded and non-shaming",
  "Inclusive relationships, sexualities, and identities",
];

const trustHighlightItems = [
  "For adults",
  "Perth-based",
  "Grounded and non-shaming",
  "Monogamy is not treated as the default answer",
];

const checkItems = [
  "The snapshot used paper and soft green surfaces for section rhythm.",
  "It reserved cedar for primary actions and small emphasis.",
  "It kept cards quiet, crisp, and lightly elevated.",
  "It gave spacing and borders more work than decoration.",
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
    href: "/kink-bdsm-counselling",
  },
  {
    title: "Polyamory & ENM counselling",
    copy: "Relationship structure is not treated as the problem before we understand what is actually difficult.",
    href: "/polyamory-enm-counselling",
  },
  {
    title: "LGBTQIA+ inclusive counselling",
    copy: "Gender, sexuality, identity, and belonging can be part of the conversation or simply part of who you are.",
    href: "/lgbtqia-affirming-counselling",
  },
];

const broadTabPanelItems = [
  {
    title: "Psychodynamic",
    details: [
      "The earlier catalogue assigned this shape to short label sets with one shared reading surface.",
      "The tab column stays compact while the content side is allowed to be longer, so the panel does not create a stray blank block under the final tab.",
    ],
  },
  {
    title: "Attachment",
    details: [
      "The treatment suits related lenses, modes, or service frames where each item deserves more than a card but less than a full section.",
      "Earlier guidance kept tab labels short and limited the set to five.",
    ],
  },
  {
    title: "Integrative",
    details: [
      "The earlier catalogue directed maintainers to this component for ARIA tabs, roving focus, keyboard handling, borders, and responsive stacking.",
      "The recorded active state used a quiet cedar rule, clean paper, and a serif title.",
    ],
  },
];

const faqItems = [
  {
    question: "Can this pattern hold several short questions?",
    answer: "The earlier catalogue assigned it to FAQs with substantial answers rather than metadata or navigation.",
  },
  {
    question: "Should FAQ items be cards?",
    answer: "The snapshot described the accordion as quieter and easier to scan than repeated cards.",
  },
];

const footerDemoLinks = [
  { label: "Working with Joel", href: "/working-with-joel" },
  { label: "Inclusive practice", href: "/inclusive-counselling" },
  { label: "Fees", href: "/contact#contact-fees" },
];

export default function DS_Components() {
  useDocumentMetadata(
    "Historical Components | Design Catalogue | Vive Counselling",
    "An archived component snapshot retained for reconciliation, not current production guidance.",
  );

  return (
    <main className="site-page">
      <DevPageHero
        badge="Historical catalogue"
        title="Historical components"
        description="Archived buttons, cards, trust strips, forms, and list treatments from an earlier system. Their status and usage claims remain unverified."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">

          <section className="ds-section" id="buttons">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical buttons</span>
              <h2>The action hierarchy recorded by this snapshot.</h2>
              <p>The earlier treatment used cedar for primary actions, quieter secondary actions, and visibly distinct text links.</p>
            </div>

            <div className="ds-demo ds-demo--gap">
              <Button href="/contact">Primary button</Button>
              <Button href="/fees" variant="secondary">Secondary button</Button>
              <Button href="/inclusive-counselling" variant="tertiary">Tertiary button</Button>
              <a href="/working-with-joel" className="site-text-link">
                Text link <ArrowRight size={15} />
              </a>
            </div>

            <div className="ds-usage-note">
              <strong>Earlier primary role</strong> — One key contact, enquiry, or next-step action per view.<br />
              <strong>Earlier secondary role</strong> — A supporting action alongside the primary.<br />
              <strong>Earlier tertiary role</strong> — A low-emphasis action on a coloured or busy surface.<br />
              <strong>Earlier text-link role</strong> — Inline contextual navigation within copy.
            </div>
          </section>

          <section className="ds-section" id="cards">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical cards</span>
              <h2>Card treatments retained from the earlier catalogue.</h2>
              <p>The snapshot described these cards as quiet and crisp, with icon, title, and copy carrying the visual weight.</p>
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

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Historical linked-card sample</p>
              <a className="site-card site-card--link" href="/kink-bdsm-counselling" style={{ maxWidth: "360px" }}>
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
                    <p>The earlier catalogue treated this as a shared two-column topic grid.</p>
                  </article>
                </div>
                <p className="site-ruled-paragraph site-ruled-paragraph--wide">
                  Wider ruled notes can sit under a card grid without each page inventing its own note sizing.
                </p>
              </div>
            </div>

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>Earlier icon-card role</strong> — Static cards for service features, practice signals, and grouped reassurances.<br />
              <strong>Earlier chip / pill role</strong> — Short categorical tags inside a panel rather than standalone navigation.
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Historical sample: pill row</p>
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
              <span className="site-eyebrow">Historical trust strip</span>
              <h2>A compact reassurance treatment from this snapshot.</h2>
              <p>The earlier catalogue used short, text-led factual signals divided by quiet dots.</p>
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
              <strong>Earlier placement</strong> — Under hero copy, page introductions, or compact service summaries.<br />
              <strong>Earlier modifier role</strong> — <code>.site-trust-list--highlight-last</code> separated a final positioning statement.<br />
              <strong>Earlier limit</strong> — Four or five short facts rather than detailed explanatory content.
            </div>
          </section>

          <section className="ds-section" id="forms">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical forms & contact</span>
              <h2>The superseded contact treatment recorded here.</h2>
              <p>This form and contact strip are retained as historical examples and no longer match the production Contact page.</p>
            </div>

            <div className="ds-demo" style={{ maxWidth: "760px" }}>
              <EnquiryForm content={enquiryFormContent} idPrefix="design-system-enquiry" />
            </div>

            <div className="site-contact-strip" style={{ marginTop: "32px" }}>
              {[
                { icon: Mail, label: "Email", value: "hello@example.com" },
                { icon: Phone, label: "Phone", value: "Short call available" },
                { icon: MapPin, label: "Location", value: "Perth-based, across Australia" },
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
              <strong>Historical enquiry form</strong> — A superseded <code>EnquiryForm</code> example; it is not the production Contact form.<br />
              <strong>Earlier form treatment</strong> — Shared border, radius, and focus-ring styling.<br />
              <strong>Earlier contact-strip role</strong> — Icon, label, and value shown below a form or in an aside.
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Historical sample: fee card</p>
              <aside className="site-fee-card" style={{ maxWidth: "280px" }}>
                <p className="site-highlight__eyebrow">Session fee</p>
                <strong>$170</strong>
                <span>50-minute counselling session</span>
                <small>Short notes can sit here without overpowering the amount.</small>
              </aside>
            </div>
          </section>

          <section className="ds-section" id="footer">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical footer specimen</span>
              <h2>The footer treatment captured by this snapshot.</h2>
              <p>This example recorded a warm utility bar for navigation and practice details.</p>
            </div>

            <div className="ds-demo">
              <div className="site-footer">
                <Container className="site-footer__inner">
                  <div className="site-footer__main">
                    <a className="site-footer__brand" href="/">Vive Counselling</a>
                    <nav className="site-footer__nav" aria-label="Footer example navigation">
                      <ul>
                        {footerDemoLinks.map((item) => (
                          <li key={item.href}>
                            <a href={item.href}>{item.label}</a>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <a className="site-footer__email" href={`mailto:${enquiryEmail}`}>
                      {enquiryEmail}
                    </a>
                  </div>

                  <div className="site-footer__utility">
                    <p>Mon to Fri, 9.30am to 5.00pm AWST</p>
                    <nav className="site-footer__social" aria-label="Social profiles example">
                      <ul>
                        {socialProfileLinks.map((profile) => (
                          <li key={profile.href}>
                            <a href={profile.href} rel="me">
                              {profile.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <p className="site-footer__copyright">&copy; 2026 Vive Counselling</p>
                  </div>
                </Container>
              </div>
            </div>

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>Earlier intended role:</strong> compact shared site chrome, separate from page-level contact invitations.
            </div>
          </section>

          <section className="ds-section" id="lists">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical lists & stacks</span>
              <h2>Four structure treatments retained from the snapshot.</h2>
              <p>The earlier catalogue assigned each treatment to a different content register.</p>
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
                  <strong>Earlier intended role:</strong> practical guidance, design rules, and feature confirmation, with the icon as an accent.
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
                  <strong>Earlier intended role:</strong> larger issue lists inside a split section.
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
                  <strong>Earlier intended role:</strong> short statements needing quiet emphasis, with ruled lines and no icons.
                </div>
              </div>

              <div>
                <p className="site-eyebrow" style={{ marginBottom: "14px" }}>FAQ accordion</p>
                <div className="site-copy-panel">
                  <p style={{ maxWidth: "42ch", margin: 0 }}>
                    The earlier catalogue paired <code>FaqSection</code> with <code>site-grid</code> or{" "}
                    <code>site-highlight</code> and attributed motion, semantics, and open-state behaviour to the component.
                  </p>
                </div>
                <div className="ds-usage-note">
                  <strong>Earlier intended role:</strong> question-and-answer sections with an explicit section surface.
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
                <strong>Earlier intended role:</strong> small destination lists with a next-step cue and one short line of context.
              </div>
            </div>

            <div className="ds-demo" style={{ marginTop: "28px" }}>
              <p className="site-highlight__eyebrow" style={{ marginBottom: "12px" }}>Ruled paragraph</p>
              <p className="site-ruled-paragraph" style={{ maxWidth: "52ch" }}>
                The earlier catalogue used this ruled treatment for a single paragraph needing more visual weight than
                plain body copy without full panel containment.
              </p>
              <div className="ds-usage-note" style={{ marginTop: "16px" }}>
                <strong>Earlier intended role:</strong> one reflective, orienting, or trust-building paragraph at a time.
              </div>
            </div>
          </section>

          <section className="ds-section" id="broad-tab-panel">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical broad tab panel</span>
              <h2>A tab treatment retained from this snapshot.</h2>
              <p>The earlier catalogue paired a compact label column with a generous reading panel.</p>
            </div>

            <div className="ds-demo" style={{ maxWidth: "920px" }}>
              <BroadTabPanel
                ariaLabel="Broad tab panel example"
                items={broadTabPanelItems.map((item) => ({
                  title: item.title,
                  content: item.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
                }))}
              />
            </div>

            <div className="ds-usage-note" style={{ marginTop: "16px" }}>
              <strong>Earlier intended role:</strong> three to five related lenses, modes, or explanations with paragraph-length content.<br />
              <strong>Earlier exclusions:</strong> primary navigation, filters, tiny metadata, and large topic sets.
            </div>
          </section>

          <section className="ds-section" id="faq-accordion">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical FAQ accordion</span>
              <h2>The recorded full-width FAQ treatment.</h2>
              <p>
                This historical example preserves the FAQ treatment's earlier spacing, contained reveal, and
                one-open-at-a-time behaviour.
              </p>
            </div>

            <FaqSection
              className="site-grid"
              intro="The earlier catalogue positioned this section as a calm, contained treatment for answers needing comfortable reading space."
              items={faqItems}
            />
          </section>

        </div>
      </div>
    </main>
  );
}
