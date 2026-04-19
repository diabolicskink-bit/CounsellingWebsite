import { useEffect } from "react";
import DesignSystemSidebar from "../../components/DesignSystemSidebar";

const colorTokens = [
  { name: "Page background", token: "--paper", value: "#F7F6F2", role: "Main page canvas", usage: "Default background for every page. Never use a coloured surface here." },
  { name: "Section surface", token: "--surface", value: "#EEF2EC", role: "Soft green section rhythm", usage: "Alternate sections on the page to create gentle visual rhythm without loud contrast." },
  { name: "Card surface", token: "--surface-strong", value: "#FCFCFA", role: "Cards, forms and inset panels", usage: "Use for cards, form fields, and any surface that needs slight separation from paper." },
  { name: "Surface muted", token: "--surface-muted", value: "#F4F6F2", role: "Subtle wash", usage: "Between paper and surface when a very faint wash is needed. Use sparingly." },
  { name: "Border", token: "--line", value: "#CCD4CA", role: "Dividers and quiet structure", usage: "All borders and dividers. Prefer a single border over a shadow when separating surfaces." },
  { name: "Heading text", token: "--ink", value: "#1F231F", role: "Primary headings and strong labels", usage: "H1, H2, H3 and any label that needs full weight. Avoid using on body paragraphs." },
  { name: "Body text", token: "--body", value: "#3F493F", role: "Main reading copy", usage: "Standard paragraph copy. Warm near-black — not pure black." },
  { name: "Muted text", token: "--muted", value: "#505A51", role: "Supporting copy and metadata", usage: "Descriptions, captions, helper text. One step quieter than body." },
  { name: "Faint text", token: "--faint", value: "#687268", role: "Labels, eyebrows, metadata", usage: "Eyebrow labels, timestamps, very low-priority notes. Not for body copy." },
  { name: "Primary accent", token: "--cedar", value: "#234B3D", role: "Buttons and small emphasis", usage: "Primary button background, icon emphasis, active states. Use disciplined — it carries authority." },
  { name: "Accent hover", token: "--cedar-dark", value: "#1D4034", role: "Hover and active states", usage: "Only for hover/active on cedar elements. Never used as a standalone surface." },
  { name: "Accent soft", token: "--cedar-soft", value: "#EEF2EC", role: "Chips, icon wells and subtle washes", usage: "Pill backgrounds, icon wells, tag backgrounds. Pairs with cedar text for readable chips." },
  { name: "Accent secondary", token: "--accent", value: "#2D5946", role: "Secondary green accent", usage: "Use for decorative accents, hover states, or border emphasis. Not for primary actions." },
  { name: "Accent deep", token: "--accent-deep", value: "#173028", role: "Deep green for heavy emphasis", usage: "Very dark green for text on cedar backgrounds, or deep decorative use only." },
  { name: "Accent soft alt", token: "--accent-soft", value: "#EAF2EB", role: "Alternate light green wash", usage: "Similar to cedar-soft. Use for variety when two different light-green washes are needed on the same page." },
  { name: "Shadow", token: "--shadow", value: "0 8px 22px rgba(31,35,31,0.055)", role: "Elevation for floating surfaces", usage: "Use very sparingly — only when a surface genuinely floats above the page (dropdowns, modals, cards on hover)." },
  { name: "Border radius", token: "--radius", value: "8px", role: "Standard corner rounding", usage: "All cards, buttons, inputs, and panels use this value. Do not invent custom radii." },
];

const typographySamples = [
  {
    label: "H1 / page title",
    className: "type-sample--h1",
    usage: "One per page. Sets the emotional register for the whole page. Use Georgia/serif.",
    text: "Calm, grounded counselling for complicated lives.",
  },
  {
    label: "H2 / section title",
    className: "type-sample--h2",
    usage: "Opens each major section. Should feel like a considered statement, not a label.",
    text: "A clear structure for sensitive information.",
  },
  {
    label: "H3 / card or sub-section title",
    className: "type-sample--h3",
    usage: "Card headings, feature labels, sub-section titles within a section.",
    text: "Contained trust",
  },
  {
    label: "Body",
    className: "type-sample--body",
    usage: "All paragraph copy. Inter/sans-serif at 1.02rem. Line height 1.58.",
    text: "Body copy should feel warm, readable, and direct without becoming casual or vague. Keep paragraphs short and purposeful.",
  },
  {
    label: "Small",
    className: "type-sample--small",
    usage: "Caveats, form helper text, footnotes, practical policy notes.",
    text: "Small notes, caveats, and practical details stay quiet but legible.",
  },
  {
    label: "Eyebrow / label",
    className: "type-sample--eyebrow",
    usage: "Section category label above a heading. Uppercase, tracked, faint colour. Never bold.",
    text: "Section label",
  },
];

const spacingRules = [
  { label: "Container max-width", token: "--max", value: "1180px", note: "Use the Container component for all major content. Never manually set a max-width." },
  { label: "Page gutter", token: "—", value: "20px each side", note: "Container handles this via min(100% - 40px, var(--max))." },
  { label: "Section padding", token: "—", value: "80–96px block", note: "Large sections need room to breathe. Tight sections feel clinical." },
  { label: "Card padding", token: "—", value: "20–28px", note: "Consistent inner spacing so all cards feel intentional and related." },
  { label: "Border radius", token: "--radius", value: "8px", note: "All rounded surfaces. Avoid larger values — they become pillowy." },
  { label: "Elevation / shadow", token: "--shadow", value: "0 8px 22px rgba(31,35,31,0.055)", note: "Only when a surface needs separation. Borders do more work than shadows here." },
  { label: "Grid gap (cards)", token: "—", value: "16–20px", note: "Card grids use consistent gaps. Do not exceed 24px in card grids." },
  { label: "Section gap (stacked)", token: "—", value: "56–60px between ds-sections", note: "Used on design system sub-pages. Production pages use section padding instead." },
];

export default function DS_Foundations() {
  useEffect(() => {
    document.title = "Foundations | Design System | Vive Counselling";
  }, []);

  return (
    <main className="trial-two-page design-language-page">
      <div className="ds-page-header">
        <div className="ds-page-header__inner">
          <span className="ds-page-header__badge">Design system</span>
          <h1>Foundations</h1>
          <p>Colour tokens, typography scale, spacing rules, and base HTML — the building blocks everything else is made from.</p>
        </div>
      </div>

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">

          <section className="ds-section" id="colour">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Colour tokens</span>
              <h2>The palette is a rule set, not just a mood.</h2>
              <p>Use green with discipline. The site reads as paper, soft surface, cedar accent, and grounded text — not as a broad green wash.</p>
            </div>

            <div className="design-language-token-grid">
              {colorTokens.map((color) => (
                <article className="design-language-token" key={color.token}>
                  <span className="design-language-token__swatch" style={{ background: color.value }} />
                  <div>
                    <h3>{color.name}</h3>
                    <code>{color.token}</code>
                    <p>{color.value} · {color.role}</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--faint)", marginTop: "4px" }}>{color.usage}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="typography">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Typography scale</span>
              <h2>Serif-led, practical, and confident.</h2>
              <p>Headings carry emotional weight. Body copy does the real work. Labels are restrained and used sparingly.</p>
            </div>

            <div className="design-language-type-card">
              {typographySamples.map((sample) => (
                <div key={sample.label}>
                  <div className={`design-language-type-sample ${sample.className}`}>
                    <span>{sample.label}</span>
                    <p>{sample.text}</p>
                  </div>
                  <div className="ds-usage-note">
                    <strong>Use when:</strong> {sample.usage}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ds-section" id="spacing">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">Spacing & layout</span>
              <h2>Spacing and borders do more work than decoration.</h2>
              <p>Consistent spatial rhythm makes the site feel considered. These values should repeat predictably across all pages.</p>
            </div>

            <table className="ds-spacing-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Token / value</th>
                  <th>Guidance</th>
                </tr>
              </thead>
              <tbody>
                {spacingRules.map((rule) => (
                  <tr key={rule.label}>
                    <td>{rule.label}</td>
                    <td>
                      {rule.token !== "—" ? <code>{rule.token}</code> : null}
                      {rule.token !== "—" ? <br /> : null}
                      {rule.value}
                    </td>
                    <td>{rule.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="ds-section" id="html">
            <div className="ds-section-heading">
              <span className="trial-two-subtitle">HTML elements</span>
              <h2>Base elements should still feel designed.</h2>
              <p>Even where rich editorial content is not heavily used, the system handles all standard HTML elements consistently.</p>
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
                    <td>Blockquote</td>
                    <td>Editorial emphasis or a careful practice principle.</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <p>Small closing copy can sit after a divider when a section needs a quiet final note.</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
