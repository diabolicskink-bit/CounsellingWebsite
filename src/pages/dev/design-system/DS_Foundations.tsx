import Button from "../../../components/Button";
import Container from "../../../components/Container";
import DevPageHero from "../../../components/DevPageHero";
import DesignSystemSidebar from "../../../components/DesignSystemSidebar";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";

const foundationRules = [
  {
    title: "Paper first",
    text: "Earlier guidance described most pages as paper with a soft green rhythm rather than a themed green interface.",
  },
  {
    title: "Type carries tone",
    text: "The snapshot used serif headings for emotional register and sans-serif body copy for practical reading.",
  },
  {
    title: "Borders before effects",
    text: "The snapshot built structure from spacing, rules, and restrained borders, reserving shadows for floating surfaces.",
  },
  {
    title: "Cedar is an accent",
    text: "Earlier guidance reserved cedar for actions, labels, icons, links, and small emphasis rather than general backgrounds.",
  },
];

const colorTokenGroups = [
  {
    title: "Canvas and structure",
    text: "The surfaces that create the site rhythm.",
    tokens: [
      { name: "Page background", token: "--paper", value: "#F7F6F2", role: "Main page canvas" },
      { name: "Section surface", token: "--surface", value: "#EEF2EC", role: "Soft green alternation" },
      { name: "Strong surface", token: "--surface-strong", value: "#FCFCFA", role: "Cards, forms, panels" },
      { name: "Muted surface", token: "--surface-muted", value: "#F4F6F2", role: "Very quiet wash" },
      { name: "Line", token: "--line", value: "#CCD4CA", role: "Borders and dividers" },
    ],
  },
  {
    title: "Text hierarchy",
    text: "The text colors are close together on purpose.",
    tokens: [
      { name: "Heading text", token: "--ink", value: "#1F231F", role: "Headings and strong labels" },
      { name: "Body text", token: "--body", value: "#3F493F", role: "Main reading copy" },
      { name: "Muted text", token: "--muted", value: "#505A51", role: "Support copy" },
      { name: "Faint text", token: "--faint", value: "#687268", role: "Metadata and quiet labels" },
    ],
  },
  {
    title: "Accent system",
    text: "Small, disciplined emphasis rather than decoration.",
    tokens: [
      { name: "Primary accent", token: "--cedar", value: "#234B3D", role: "Primary actions and active emphasis" },
      { name: "Accent hover", token: "--cedar-dark", value: "#1D4034", role: "Hover and active states" },
      { name: "Accent soft", token: "--cedar-soft", value: "#EEF2EC", role: "Icon wells, chips, soft emphasis" },
      { name: "Secondary accent", token: "--accent", value: "#2D5946", role: "Secondary green emphasis" },
      { name: "Deep accent", token: "--accent-deep", value: "#173028", role: "Limited deep emphasis" },
      { name: "Soft alt accent", token: "--accent-soft", value: "#EAF2EB", role: "Alternate light wash" },
    ],
  },
];

const typeRoleRows = [
  {
    role: "Display hero",
    token: "--type-display",
    source: ".hero-display",
    use: "Earlier intended use: an expressive hero statement after the page-topic h1.hero-badge, outside compact surfaces.",
  },
  {
    role: "Page title",
    token: "--type-page-title",
    source: "h1, h1.hero-badge",
    use: "Earlier intended use: the page's single visible H1, either a plain title or concise hero topic label.",
  },
  {
    role: "Section heading",
    token: "--type-section",
    source: "h2, .section-heading",
    use: "Earlier intended use: major section statements below hero scale.",
  },
  {
    role: "Compact section heading",
    token: "--type-section-compact",
    source: ".rich-text h2, .site-cta-block h2",
    use: "Earlier intended use: contained panels, rich text, form success states, and compact sections.",
  },
  {
    role: "Card title",
    token: "--type-card-title",
    source: "h3, .site-card h3",
    use: "Earlier intended use: cards, grouped ideas, FAQ links, principles, and repeated items.",
  },
  {
    role: "Body",
    token: "--type-body",
    source: "p, .site-body-copy, .site-copy-flow",
    use: "Earlier intended use: paragraphs, compact stack copy, forms, FAQ answers, and practical information.",
  },
  {
    role: "Rich body",
    token: "--type-body-rich",
    source: ".rich-text p",
    use: "Earlier intended use: longer editorial copy; this snapshot aliased the standard body rhythm.",
  },
  {
    role: "Support copy",
    token: "--type-support",
    source: ".hero-intro, .hero-copy-panel",
    use: "Earlier intended use: hero support, section introductions, and explanatory rails.",
  },
  {
    role: "Label and small",
    token: "--type-label / --type-small",
    source: ".site-eyebrow, helper text",
    use: "Earlier intended use: eyebrows, metadata, helper text, captions, notes, and practical labels.",
  },
  {
    role: "Numeric display",
    token: "--type-fee-display",
    source: ".site-fee-card strong",
    use: "Earlier intended use: occasional large figures such as session fees.",
  },
];

const layoutRules = [
  {
    label: "Content width",
    token: "--max",
    value: "1180px",
    guidance: "Earlier guidance placed major page content and demos inside Container.",
  },
  {
    label: "Shared section",
    token: ".site-grid",
    value: "40px block padding",
    guidance: "Earlier guidance treated this pale paper gradient as the neutral section step.",
  },
  {
    label: "Highlighted section",
    token: ".site-highlight",
    value: "40px block padding",
    guidance: "Earlier guidance treated this muted paper-sage band as the alternate section step.",
  },
  {
    label: "Split layout",
    token: ".site-split",
    value: "0.72fr / 1fr",
    guidance: "Earlier guidance paired a heading block with the reading or component side.",
  },
  {
    label: "Content stack",
    token: ".site-content-stack",
    value: "24px gap",
    guidance: "Earlier guidance stacked cards, panels, notes, and principle blocks inside a content column.",
  },
  {
    label: "Standard radius",
    token: "--radius",
    value: "8px",
    guidance: "Earlier guidance applied this radius to cards, buttons, inputs, chips, and docs surfaces.",
  },
  {
    label: "Shadow",
    token: "--shadow",
    value: "0 8px 22px rgba(31, 35, 31, 0.055)",
    guidance: "Earlier guidance used this shadow sparingly, after borders and spacing.",
  },
];

const stateRules = [
  {
    title: "Links stay visible",
    text: "This snapshot styled inline rich-text links with cedar, weight, underline, and underline offset.",
  },
  {
    title: "Focus is quiet but clear",
    text: "This snapshot used cedar outlines or rings for inputs, linked stacks, and editorial links.",
  },
  {
    title: "Hover is a small lift",
    text: "This snapshot used slight movement or a deeper border for card and button hover states.",
  },
];

const foundationReferenceNames = [
  {
    name: "Foundation rule card",
    pointsTo: "The small principle cards in Core rules.",
    status: "Previously catalogued as active: .site-card.",
  },
  {
    name: "Token swatch card",
    pointsTo: "The colour token cards with a historical swatch, token name, value, and role.",
    status: "Historical docs-only token preview.",
  },
  {
    name: "Paper action panel",
    pointsTo: "The larger left panel in the historical colour composition example.",
    status: "Historical docs-only composition example.",
  },
  {
    name: "Soft surface block",
    pointsTo: "The smaller soft-green block in the historical colour composition example.",
    status: "Historical docs-only surface example.",
  },
  {
    name: "Hero display specimen",
    pointsTo: "The large hero typography sample in the Typography section.",
    status: "Previously catalogued as active: hero-* example.",
  },
  {
    name: "Section heading specimen",
    pointsTo: "The contained section heading sample in the type specimen grid.",
    status: "Previously catalogued as active: type-role example.",
  },
  {
    name: "Contained trust card",
    pointsTo: "The Card title / Contained trust card in the type specimen grid.",
    status: "Previously catalogued as active: .site-card.",
  },
  {
    name: "Rich text panel",
    pointsTo: "The panel showing rich text headings, paragraphs, and contextual links.",
    status: "Previously catalogued as active: .site-copy-panel.rich-text.",
  },
  {
    name: "Fee display card",
    pointsTo: "The numeric display card showing a large session fee.",
    status: "Previously catalogued as active: .site-fee-card.",
  },
  {
    name: "Section rhythm preview",
    pointsTo: "The stacked neutral and highlighted section preview in Spacing & layout.",
    status: "Previously catalogued as active: .site-grid and .site-highlight.",
  },
  {
    name: "Edge sample card",
    pointsTo: "The radius, border, and shadow examples in Surfaces & edges.",
    status: "Historical docs-only edge preview.",
  },
  {
    name: "State rule card",
    pointsTo: "The Links stay visible, Focus is quiet, and Hover is a small lift cards.",
    status: "Previously catalogued as active: .site-card behaviour guidance.",
  },
  {
    name: "Rich text link sample",
    pointsTo: "The small text block showing the shared rich-text link treatment.",
    status: "Previously catalogued as active: .rich-text link state.",
  },
  {
    name: "Mini form focus sample",
    pointsTo: "The small form field in Links & states.",
    status: "Previously catalogued as active: .site-form focus state.",
  },
  {
    name: "Editorial HTML panel",
    pointsTo: "The final rich-text demo with headings, links, lists, quote, table, code, divider, and button.",
    status: "Previously catalogued as active: .rich-text baseline.",
  },
];

type ReferenceNameProps = {
  block?: boolean;
  children: string;
};

function ReferenceName({ block = false, children }: ReferenceNameProps) {
  return <span className={`ds-reference-name${block ? " ds-reference-name--block" : ""}`}>Reference: {children}</span>;
}

export default function DS_Foundations() {
  useDocumentMetadata(
    "Historical Foundations | Design Catalogue | Vive Counselling",
    "An archived foundations snapshot retained for reconciliation, not current production guidance.",
  );

  return (
    <main className="site-page ds-foundations-page">
      <DevPageHero
        badge="Historical catalogue"
        title="Historical foundations"
        description="An archived snapshot of earlier colour, type, section rhythm, editorial HTML, and interaction-state guidance. Its classifications remain unverified."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">
          <section className="ds-section" id="rules">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Recorded core rules</span>
              <h2>Constraints described by the earlier catalogue.</h2>
              <p>
                These cards preserve the rules attached to this snapshot. They are historical records rather than
                instructions for current maintenance or new work.
              </p>
            </div>

            <ReferenceName block>Foundation rule card</ReferenceName>
            <div className="site-card-grid ds-foundation-rule-grid">
              {foundationRules.map((rule) => (
                <article className="site-card" key={rule.title}>
                  <h3>{rule.title}</h3>
                  <p>{rule.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="reference-names">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical reference names</span>
              <h2>Names attached to treatments in this snapshot.</h2>
              <p>
                These labels are retained to make the archive discussable. They do not indicate current components,
                current status, or approved reusable API.
              </p>
            </div>

            <table className="ds-spacing-table">
              <thead>
                <tr>
                  <th>Recorded name</th>
                  <th>What it points to</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {foundationReferenceNames.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.pointsTo}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="ds-section" id="colour">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical colour tokens</span>
              <h2>The palette recorded as paper, surface, text, and cedar.</h2>
              <p>
                The swatches still resolve from the CSS variables so the snapshot remains inspectable. Their presence
                does not confirm current design-system status.
              </p>
            </div>

            <ReferenceName block>Token swatch card</ReferenceName>
            <div className="ds-foundation-token-groups">
              {colorTokenGroups.map((group) => (
                <section className="ds-foundation-token-group" key={group.title}>
                  <div className="ds-foundation-token-group__header">
                    <h3>{group.title}</h3>
                    <p>{group.text}</p>
                  </div>
                  <div className="ds-foundation-token-grid">
                    {group.tokens.map((color) => (
                      <article className="ds-foundation-token" key={color.token}>
                        <span
                          className="ds-foundation-token__swatch"
                          style={{ background: `var(${color.token})` }}
                          aria-hidden="true"
                        />
                        <div className="ds-foundation-token__copy">
                          <strong>{color.name}</strong>
                          <code>{color.token}</code>
                          <span>{color.value}</span>
                          <p>{color.role}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="ds-demo ds-foundation-colour-demo">
              <div className="ds-foundation-colour-demo__paper">
                <ReferenceName>Paper action panel</ReferenceName>
                <span className="site-eyebrow">Historical colour composition</span>
                <h3>This snapshot used paper as canvas and cedar for action and emphasis.</h3>
                <p>
                  The earlier composition concentrated its strongest colour in text and focused actions.
                </p>
                <Button href="/contact">Primary cedar action</Button>
              </div>
              <div className="ds-foundation-colour-demo__surface">
                <ReferenceName>Soft surface block</ReferenceName>
                <strong>Soft surface</strong>
                <span>Earlier intended use: alternating rhythm, chips, icon wells, and low-pressure emphasis.</span>
              </div>
            </div>
          </section>

          <section className="ds-section" id="typography">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical typography</span>
              <h2>The type roles recorded by this snapshot.</h2>
              <p>
                The earlier catalogue assigned named roles to its type scale. The table records those intended uses
                without confirming their current status.
              </p>
            </div>

            <table className="ds-spacing-table ds-foundation-type-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Token</th>
                  <th>Recorded source</th>
                  <th>Earlier intended use</th>
                </tr>
              </thead>
              <tbody>
                {typeRoleRows.map((row) => (
                  <tr key={row.role}>
                    <td>{row.role}</td>
                    <td>
                      <code>{row.token}</code>
                    </td>
                    <td>{row.source}</td>
                    <td>{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ds-foundation-type-showcase">
              <article className="ds-foundation-type-hero hero-bg--default">
                <ReferenceName>Hero display specimen</ReferenceName>
                <span className="hero-badge">Hero display</span>
                <p className="hero-display">
                  Calm enough
                  <br />
                  for complicated things.
                </p>
                <p className="hero-intro">
                  This snapshot treated <code>.hero-display</code> as its expressive hero statement, with a measured scale,
                  deliberate weight, and controlled title measure.
                </p>
              </article>

              <div className="ds-foundation-type-specimen-grid" aria-label="Type role specimens">
                <article className="ds-foundation-type-specimen ds-foundation-type-specimen--section">
                  <ReferenceName>Section heading specimen</ReferenceName>
                  <span className="site-eyebrow">Section heading</span>
                  <h2>The earlier section heading read like a considered statement.</h2>
                  <p className="section-heading__copy">
                    Support copy can orient the reader without becoming a second headline.
                  </p>
                </article>

                <article className="site-card ds-foundation-type-specimen">
                  <ReferenceName>Contained trust card</ReferenceName>
                  <span className="site-eyebrow">Card title</span>
                  <h3>Contained trust</h3>
                  <p>The earlier card treatment kept copy quieter than section copy.</p>
                </article>

                <article className="site-copy-panel rich-text ds-foundation-type-copy">
                  <ReferenceName>Rich text panel</ReferenceName>
                  <span className="site-eyebrow">Rich text</span>
                  <h2>Rich text gets its own compact heading role.</h2>
                  <p>
                    This specimen used warm, specific body copy with a{" "}
                    <a href="/working-with-joel">contextual text link</a>.
                  </p>
                  <h3>Nested rich heading</h3>
                  <p>
                    In this snapshot, H3s supported smaller content clusters below the surrounding section heading.
                  </p>
                </article>

                <aside className="site-fee-card ds-foundation-type-specimen">
                  <ReferenceName>Fee display card</ReferenceName>
                  <p className="site-highlight__eyebrow">Numeric display</p>
                  <strong>$120</strong>
                  <span>Large numeric type is reserved for fee or figure moments.</span>
                </aside>
              </div>
            </div>

            <div className="ds-usage-note">
              <strong>Earlier rule of thumb:</strong> the snapshot paired one visible <code>h1</code> with a serif-led
              <code> p.hero-display</code> and kept display scale outside compact surfaces.
            </div>
          </section>

          <section className="ds-section" id="spacing">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical spacing & layout</span>
              <h2>The spacing and section rhythm recorded here.</h2>
              <p>
                The earlier catalogue placed major content inside Container and alternated <code>.site-grid</code> with
                quieter <code>.site-highlight</code> surfaces.
              </p>
            </div>

            <table className="ds-spacing-table">
              <thead>
                <tr>
                  <th>Foundation</th>
                  <th>Token or class</th>
                  <th>Value</th>
                  <th>Guidance</th>
                </tr>
              </thead>
              <tbody>
                {layoutRules.map((rule) => (
                  <tr key={rule.label}>
                    <td>{rule.label}</td>
                    <td>
                      <code>{rule.token}</code>
                    </td>
                    <td>{rule.value}</td>
                    <td>{rule.guidance}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ds-foundation-rhythm-demo" aria-label="Section rhythm example">
              <ReferenceName>Section rhythm preview</ReferenceName>
              <section className="site-grid ds-foundation-rhythm-demo__section">
                <Container>
                  <div className="site-split">
                    <div className="section-heading">
                      <span className="site-eyebrow">Neutral section</span>
                      <h3>This snapshot used site-grid as its default content step.</h3>
                    </div>
                    <p className="site-ruled-paragraph">
                      This preview uses the real section class, container, split layout, and ruled paragraph treatment.
                    </p>
                  </div>
                </Container>
              </section>

              <section className="site-highlight ds-foundation-rhythm-demo__section">
                <Container>
                  <div className="site-split">
                    <div className="section-heading">
                      <span className="site-eyebrow">Highlighted section</span>
                      <h3>This snapshot used site-highlight as its quiet alternate surface.</h3>
                    </div>
                    <div className="site-content-stack">
                      <article className="site-card">
                        <h3>Contained detail</h3>
                        <p>The card remains quiet because the section surface already provides the rhythm.</p>
                      </article>
                    </div>
                  </div>
                </Container>
              </section>
            </div>
          </section>

          <section className="ds-section" id="surfaces">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical surfaces & edges</span>
              <h2>The crisp edge treatment recorded by this snapshot.</h2>
              <p>
                The earlier system recorded an 8px radius, quiet borders for containment, and restrained shadows for
                lifted surfaces.
              </p>
            </div>

            <ReferenceName block>Edge sample card</ReferenceName>
            <div className="ds-foundation-edge-grid">
              <article className="ds-foundation-edge-sample">
                <span className="ds-foundation-edge-sample__preview ds-foundation-edge-sample__preview--radius" />
                <div>
                  <strong>Radius</strong>
                  <code>--radius: 8px</code>
                  <p>The snapshot applied this radius across cards, buttons, forms, chips, and documentation previews.</p>
                </div>
              </article>
              <article className="ds-foundation-edge-sample">
                <span className="ds-foundation-edge-sample__preview ds-foundation-edge-sample__preview--border" />
                <div>
                  <strong>Border</strong>
                  <code>--line</code>
                  <p>Earlier guidance favoured dividers and borders before decorative elevation.</p>
                </div>
              </article>
              <article className="ds-foundation-edge-sample">
                <span className="ds-foundation-edge-sample__preview ds-foundation-edge-sample__preview--shadow" />
                <div>
                  <strong>Shadow</strong>
                  <code>--shadow</code>
                  <p>Earlier intended use: dropdowns, forms, fee cards, and lifted cards.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="ds-section" id="states">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical links & states</span>
              <h2>The interaction-state treatment recorded here.</h2>
              <p>
                This snapshot applied cedar signals and small motion across links, inputs, cards, buttons, and structured
                text.
              </p>
            </div>

            <ReferenceName block>State rule card</ReferenceName>
            <div className="ds-foundation-state-grid">
              {stateRules.map((rule) => (
                <article className="site-card" key={rule.title}>
                  <h3>{rule.title}</h3>
                  <p>{rule.text}</p>
                </article>
              ))}
            </div>

            <div className="ds-demo ds-foundation-state-demo">
              <div className="rich-text">
                <ReferenceName>Rich text link sample</ReferenceName>
                <p>
                  The earlier rich-text link remained visibly underlined:{" "}
                  <a href="/fees">read the fee and session details</a>.
                </p>
              </div>
              <form className="site-form ds-foundation-mini-form" action="#" method="post">
                <ReferenceName>Mini form focus sample</ReferenceName>
                <div className="form-row">
                  <label htmlFor="foundation-focus-example">Focused field treatment</label>
                  <input
                    id="foundation-focus-example"
                    name="foundation-focus-example"
                    placeholder="Border and ring use cedar"
                    type="text"
                  />
                </div>
              </form>
            </div>
          </section>

          <section className="ds-section" id="html">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical editorial HTML</span>
              <h2>The rich-text baseline captured by this snapshot.</h2>
              <p>
                The earlier <code>.rich-text</code> baseline covered headings, paragraphs, links, lists, quotes, tables,
                dividers, inline code, and a contextual button.
              </p>
            </div>

            <article className="site-copy-panel rich-text ds-foundation-html-demo">
              <ReferenceName>Editorial HTML panel</ReferenceName>
              <h2>Heading two introduces a section of reading copy.</h2>
              <p>
                Paragraphs are muted, measured, and easy to scan. A paragraph can include{" "}
                <strong>strong emphasis</strong>, <code>inline code</code>, and a{" "}
                <a href="/contact">visible text link</a>.
              </p>
              <h3>Heading three groups a smaller idea</h3>
              <p>
                This historical specimen used a list for practical requirements and related considerations.
              </p>
              <ul>
                <li>Plain language appeared before specialist language.</li>
                <li>Items stayed short enough to scan.</li>
                <li>The list followed the same reading rhythm as the paragraphs.</li>
              </ul>
              <blockquote>
                <p>The earlier design aimed to make clear information feel steady, not sterile.</p>
              </blockquote>
              <table>
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>Earlier role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Table</td>
                    <td>The snapshot used tables for structured details such as fees, availability, or comparison notes.</td>
                  </tr>
                  <tr>
                    <td>Blockquote</td>
                    <td>The snapshot used blockquotes for a quiet editorial principle or short reflective statement.</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <p>In this snapshot, dividers closed a thought quietly rather than splitting the page into heavy chunks.</p>
              <Button href="/contact" variant="secondary">
                View contact and session details
              </Button>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
