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
import Button from "../../components/Button";
import DesignSystemSidebar from "../../components/DesignSystemSidebar";

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

const checkItems = [
  "Use paper and soft green surfaces for section rhythm.",
  "Use cedar for primary actions and small emphasis only.",
  "Keep cards quiet, crisp, and lightly elevated.",
  "Let spacing and borders do more work than decoration.",
];

const detailStackItems = [
  "Less time educating the therapist",
  "Consent, boundaries, power exchange, and BDSM can be discussed directly",
  "Polyamory, open relationships, and ethical non-monogamy are not treated as the problem",
  "More room for what matters",
];

export default function DS_Components() {
  useEffect(() => {
    document.title = "Components | Design System | Vive Counselling";
  }, []);

  return (
    <main className="trial-two-page design-language-page">
      <div className="ds-page-header">
        <div className="ds-page-header__inner">
          <span className="ds-page-header__badge">Design system</span>
          <h1>Components</h1>
          <p>Buttons, cards, trust strips, forms, and list treatments — the reusable UI pieces and their usage rules.</p>
        </div>
      </div>

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">

          <section className="ds-section" id="buttons">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Buttons</span>
              <h2>Actions should feel stable, not salesy.</h2>
              <p>Primary actions use cedar. Secondary stays quieter. Text links are visible without looking like a separate brand language.</p>
            </div>

            <div className="ds-demo ds-demo--gap">
              <Button href="/contact">Primary button</Button>
              <Button href="/fees" variant="secondary">Secondary button</Button>
              <Button href="/inclusive-practice" variant="tertiary">Tertiary button</Button>
              <Button href="/approach" variant="light">Light button</Button>
              <a href="/approach" className="design-language-text-link">
                Text link <ArrowRight size={15} />
              </a>
            </div>

            <div className="ds-usage-note">
              <strong>Primary</strong> — One per view. Contact, enquiry, key next step. Never use for navigation.<br />
              <strong>Secondary</strong> — Supporting action alongside primary (e.g. "View fees" next to "Get in touch").<br />
              <strong>Tertiary</strong> — Low-emphasis action on a coloured or busy surface.<br />
              <strong>Light</strong> — Minimal style for less prominent or repeated actions.<br />
              <strong>Text link</strong> — Inline contextual navigation within copy. Not a standalone CTA.
            </div>
          </section>

          <section className="ds-section" id="cards">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Cards</span>
              <h2>Reusable cards for service themes, practical details, and reassurance points.</h2>
              <p>Cards should feel quiet and crisp. Avoid adding decoration — the icon, title, and copy carry the weight.</p>
            </div>

            <div className="trial-two-card-grid">
              {iconCards.map((item) => {
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

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>Icon cards</strong> (trial-two-card) — For service features, practice signals, and grouped reassurances. Use a grid of 3 or 6.<br />
              <strong>Chips / pills</strong> — Use <code>.trial-two-pill-row</code> for short categorical tags inside a panel. Not for standalone navigation.
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="trial-two-highlight__eyebrow" style={{ marginBottom: "12px" }}>Pill row example</p>
              <div className="trial-two-pill-row">
                <span>Guided intake path</span>
                <span>Trust badges</span>
                <span>Outcome themes</span>
                <span>Service bundles</span>
              </div>
            </div>
          </section>

          <section className="ds-section" id="trust-strip">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Trust strip</span>
              <h2>Compact reassurance before heavier content begins.</h2>
              <p>Short factual signals: format, audience, location, registration, or practice stance. Text-led, understated, dot-divided.</p>
            </div>

            <div className="ds-demo">
              <ul className="design-language-trust-list" aria-label="Trust strip example">
                {trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ds-usage-note">
              <strong>Use directly under</strong> hero copy, page introductions, or compact service summaries.<br />
              <strong>Avoid</strong> using it as a replacement for detailed cards when the information needs explanation. Never more than 4–5 items.
            </div>
          </section>

          <section className="ds-section" id="forms">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Forms & contact</span>
              <h2>Contact surfaces should feel clear, calm, and low-friction.</h2>
              <p>Form fields, side notes, and contact details use the same card, border, and icon language as the rest of the site.</p>
            </div>

            <div className="design-language-form-grid">
              <div>
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
              </div>
            </div>

            <div className="design-language-contact-strip" style={{ marginTop: "32px" }}>
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
            </div>

            <div className="ds-usage-note" style={{ marginTop: "24px" }}>
              <strong>All form elements</strong> share the same border, radius, and focus-ring treatment. Do not invent custom input styles.<br />
              <strong>Contact strip</strong> — Icon + label + value. Use for email, phone, and location. Sits below the form or in a page aside.
            </div>

            <div className="ds-demo" style={{ marginTop: "24px" }}>
              <p className="trial-two-highlight__eyebrow" style={{ marginBottom: "12px" }}>Fee card example</p>
              <aside className="design-language-fee-card" style={{ maxWidth: "280px" }}>
                <p className="trial-two-highlight__eyebrow">Session fee</p>
                <strong>$170</strong>
                <span>50-minute online counselling session</span>
                <small>Short notes can sit here without overpowering the amount.</small>
              </aside>
            </div>
          </section>

          <section className="ds-section" id="lists">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Lists & stacks</span>
              <h2>Use structure to make content feel manageable.</h2>
              <p>Three distinct list treatments, each suited to a different content register.</p>
            </div>

            <div className="design-language-split">
              <div>
                <p className="trial-two-subtitle" style={{ marginBottom: "14px" }}>Check list</p>
                <div className="design-language-check-panel">
                  {checkItems.map((item) => (
                    <div className="check-item" key={item}>
                      <CheckCircle2 size={19} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="ds-usage-note">
                  <strong>Use for:</strong> Practical guidance, design rules, feature confirmation. The icon is an accent, not the feature.
                </div>
              </div>

              <div>
                <p className="trial-two-subtitle" style={{ marginBottom: "14px" }}>Detail stack</p>
                <div className="design-language-detail-stack" aria-label="Detail stack example">
                  {detailStackItems.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
                <div className="ds-usage-note">
                  <strong>Use for:</strong> Short, high-confidence statements that need quiet emphasis — especially inclusive practice signals. Ruled lines, no icons.
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
