import Button from "../../components/Button";
import Container from "../../components/Container";
import DevPageHero from "../../components/DevPageHero";
import DesignSystemSidebar from "../../components/DesignSystemSidebar";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";

const foundationRules = [
  {
    title: "Paper first",
    text: "Most pages should read as paper with soft green rhythm, not as a themed green interface.",
  },
  {
    title: "Type carries tone",
    text: "Serif headings set the emotional register. Sans-serif body copy stays plain, practical, and readable.",
  },
  {
    title: "Borders before effects",
    text: "Structure comes from spacing, rules, and restrained borders. Shadows are reserved for true floating surfaces.",
  },
  {
    title: "Cedar is an accent",
    text: "Use cedar for actions, labels, icons, links, and small emphasis. Do not turn it into a general background color.",
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
    use: "Page-opening emotional statement. Keep this out of cards, forms, and compact panels.",
  },
  {
    role: "Page title",
    token: "--type-page-title",
    source: "h1",
    use: "Plain page titles when a page is not using the shared hero display pattern.",
  },
  {
    role: "Section heading",
    token: "--type-section",
    source: "h2, .section-heading",
    use: "Major section statements. Large enough to carry tone without becoming hero scale.",
  },
  {
    role: "Compact section heading",
    token: "--type-section-compact",
    source: ".rich-text h2, .site-cta-block h2",
    use: "Contained panels, rich text, form success states, and compact section moments.",
  },
  {
    role: "Card title",
    token: "--type-card-title",
    source: "h3, .site-card h3",
    use: "Cards, grouped ideas, FAQ links, principles, and repeated content items.",
  },
  {
    role: "Body",
    token: "--type-body",
    source: "p",
    use: "Default paragraphs, compact stack copy, forms, FAQ answers, and practical information.",
  },
  {
    role: "Rich body",
    token: "--type-body-rich",
    source: ".rich-text p",
    use: "Longer editorial reading copy where paragraphs need a little more presence.",
  },
  {
    role: "Support copy",
    token: "--type-support",
    source: ".hero-intro, .hero-copy-panel",
    use: "Hero support, section introductions, and explanatory rails.",
  },
  {
    role: "Label and small",
    token: "--type-label / --type-small",
    source: ".site-eyebrow, helper text",
    use: "Eyebrows, metadata, helper text, captions, notes, and practical labels.",
  },
  {
    role: "Numeric display",
    token: "--type-fee-display",
    source: ".site-fee-card strong",
    use: "Large figures such as session fees. Keep it rare and purposeful.",
  },
];

const layoutRules = [
  {
    label: "Content width",
    token: "--max",
    value: "1180px",
    guidance: "Use the Container component for major page content and demos that need the real site gutter.",
  },
  {
    label: "Shared section",
    token: ".site-grid",
    value: "40px block padding",
    guidance: "Default public-page section surface. Use as the neutral step in the alternating rhythm.",
  },
  {
    label: "Highlighted section",
    token: ".site-highlight",
    value: "40px block padding",
    guidance: "Quiet sage alternate surface. Use between site-grid sections instead of local wrapper classes.",
  },
  {
    label: "Split layout",
    token: ".site-split",
    value: "0.72fr / 1fr",
    guidance: "Pair a heading block with the reading or component side of a section.",
  },
  {
    label: "Content stack",
    token: ".site-content-stack",
    value: "24px gap",
    guidance: "Stack cards, panels, notes, and principle blocks inside the content column.",
  },
  {
    label: "Standard radius",
    token: "--radius",
    value: "8px",
    guidance: "Use for cards, buttons, inputs, chips, and docs-shell surfaces.",
  },
  {
    label: "Shadow",
    token: "--shadow",
    value: "0 8px 22px rgba(31, 35, 31, 0.055)",
    guidance: "Use sparingly. Most separation should come from borders and spacing.",
  },
];

const stateRules = [
  {
    title: "Links stay visible",
    text: "Inline rich-text links use cedar, weight, underline, and underline offset so they remain obvious in calm copy.",
  },
  {
    title: "Focus is quiet but clear",
    text: "Inputs, linked stacks, and editorial links use cedar outlines or rings. The state should be legible without feeling loud.",
  },
  {
    title: "Hover is a small lift",
    text: "Cards and buttons move slightly or deepen their border. Avoid large motion or decorative hover states.",
  },
];

const foundationReferenceNames = [
  {
    name: "Foundation rule card",
    pointsTo: "The small principle cards in Core rules.",
    status: "Active example built with .site-card.",
  },
  {
    name: "Token swatch card",
    pointsTo: "The colour token cards with a live swatch, token name, value, and role.",
    status: "Docs-only token preview.",
  },
  {
    name: "Paper action panel",
    pointsTo: "The larger left panel in the live colour composition example.",
    status: "Docs-only composition example using production tokens.",
  },
  {
    name: "Soft surface block",
    pointsTo: "The smaller soft-green block in the live colour composition example.",
    status: "Docs-only surface example using production tokens.",
  },
  {
    name: "Hero display specimen",
    pointsTo: "The large hero typography sample in the Typography section.",
    status: "Active hero-* system example.",
  },
  {
    name: "Section heading specimen",
    pointsTo: "The contained section heading sample in the type specimen grid.",
    status: "Active type-role example.",
  },
  {
    name: "Contained trust card",
    pointsTo: "The Card title / Contained trust card in the type specimen grid.",
    status: "Active .site-card example.",
  },
  {
    name: "Rich text panel",
    pointsTo: "The panel showing rich text headings, paragraphs, and contextual links.",
    status: "Active .site-copy-panel.rich-text example.",
  },
  {
    name: "Fee display card",
    pointsTo: "The numeric display card showing a large session fee.",
    status: "Active .site-fee-card example.",
  },
  {
    name: "Section rhythm preview",
    pointsTo: "The stacked neutral and highlighted section preview in Spacing & layout.",
    status: "Active .site-grid and quieter .site-highlight example.",
  },
  {
    name: "Edge sample card",
    pointsTo: "The radius, border, and shadow examples in Surfaces & edges.",
    status: "Docs-only edge preview using production tokens.",
  },
  {
    name: "State rule card",
    pointsTo: "The Links stay visible, Focus is quiet, and Hover is a small lift cards.",
    status: "Active behaviour guidance built with .site-card.",
  },
  {
    name: "Rich text link sample",
    pointsTo: "The small text block showing the shared rich-text link treatment.",
    status: "Active .rich-text link-state example.",
  },
  {
    name: "Mini form focus sample",
    pointsTo: "The small form field in Links & states.",
    status: "Active .site-form focus-state example.",
  },
  {
    name: "Editorial HTML panel",
    pointsTo: "The final rich-text demo with headings, links, lists, quote, table, code, and divider.",
    status: "Active .rich-text baseline example.",
  },
];

type ReferenceNameProps = {
  block?: boolean;
  children: string;
};

function ReferenceName({ block = false, children }: ReferenceNameProps) {
  return <span className={`ds-reference-name${block ? " ds-reference-name--block" : ""}`}>Reference: {children}</span>;
}

// AI maintainers: Foundations is for tokens, base typography, spacing, section rhythm,
// shared rich-text behavior, and baseline state rules. Component-specific demos belong
// in DS_Components; page-level composition belongs in DS_Patterns or DS_Heroes.
export default function DS_Foundations() {
  useDocumentMetadata("Foundations | Design System | Vive Counselling");

  return (
    <main className="site-page ds-foundations-page">
      <DevPageHero
        badge="Design system"
        title="Foundations"
        description="The baseline rules behind the site: color, type, section rhythm, editorial HTML, and the small interaction states that keep sensitive content readable."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">
          <section className="ds-section" id="rules">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Core rules</span>
              <h2>The foundations are practical constraints.</h2>
              <p>
                These rules keep the site grounded as pages change. Use them before reaching for new colors, special
                wrappers, decorative effects, or page-specific typography.
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
              <span className="site-eyebrow">Reference names</span>
              <h2>Use these names when pointing at a Foundations treatment.</h2>
              <p>
                These are stable conversational handles for the examples on this page. They do not create new
                production components by themselves.
              </p>
            </div>

            <table className="ds-spacing-table">
              <thead>
                <tr>
                  <th>Name to use</th>
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
              <span className="site-eyebrow">Colour tokens</span>
              <h2>The palette should read as paper, surface, text, and cedar.</h2>
              <p>
                Token values are shown here with live swatches using the actual CSS variables. Hex values are labels for
                maintainers, not an invitation to hard-code colors in components.
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
                <span className="site-eyebrow">Live color composition</span>
                <h3>Paper carries the page. Cedar only marks action and emphasis.</h3>
                <p>
                  The strongest color should usually be text or a focused call to action, not the whole section.
                </p>
                <Button href="/contact">Primary cedar action</Button>
              </div>
              <div className="ds-foundation-colour-demo__surface">
                <ReferenceName>Soft surface block</ReferenceName>
                <strong>Soft surface</strong>
                <span>Use for alternating rhythm, chips, icon wells, and low-pressure emphasis.</span>
              </div>
            </div>
          </section>

          <section className="ds-section" id="typography">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Typography</span>
              <h2>Serif headings create the voice; body copy does the work.</h2>
              <p>
                The type scale now has named roles. Use these before adding page-specific sizes, and keep display type
                reserved for page openings or deliberately large closing prompts.
              </p>
            </div>

            <table className="ds-spacing-table ds-foundation-type-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Token</th>
                  <th>Current source</th>
                  <th>Use</th>
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
                <h2 className="hero-display">
                  Calm enough
                  <br />
                  for complicated things.
                </h2>
                <p className="hero-intro">
                  Use <code>.hero-display</code> for production page openings. The scale is measured, the weight is
                  deliberate, and the default title measure keeps longer headings under control.
                </p>
              </article>

              <div className="ds-foundation-type-specimen-grid" aria-label="Type role specimens">
                <article className="ds-foundation-type-specimen ds-foundation-type-specimen--section">
                  <ReferenceName>Section heading specimen</ReferenceName>
                  <span className="site-eyebrow">Section heading</span>
                  <h2>A section heading should read like a considered statement.</h2>
                  <p className="section-heading__copy">
                    Support copy can orient the reader without becoming a second headline.
                  </p>
                </article>

                <article className="site-card ds-foundation-type-specimen">
                  <ReferenceName>Contained trust card</ReferenceName>
                  <span className="site-eyebrow">Card title</span>
                  <h3>Contained trust</h3>
                  <p>Card copy stays quieter than section copy and should be easy to scan.</p>
                </article>

                <article className="site-copy-panel rich-text ds-foundation-type-copy">
                  <ReferenceName>Rich text panel</ReferenceName>
                  <span className="site-eyebrow">Rich text</span>
                  <h2>Rich text gets its own compact heading role.</h2>
                  <p>
                    Body copy should feel warm, specific, and plain. It can include a{" "}
                    <a href="/working-with-joel">contextual text link</a> without needing page-specific link styling.
                  </p>
                  <h3>Nested rich heading</h3>
                  <p>
                    H3s support smaller content clusters. They should not compete with the surrounding section heading.
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
              <strong>Rule of thumb:</strong> one production <code>h1</code> per page, serif-led section headings, and
              measured paragraph widths. Do not use display scale inside compact cards, sidebars, form panels, or small
              support blocks.
            </div>
          </section>

          <section className="ds-section" id="spacing">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Spacing & layout</span>
              <h2>Spacing, not decoration, creates the page rhythm.</h2>
              <p>
                Major content should sit inside the shared container. Page sections alternate between neutral
                <code> .site-grid</code> and quieter <code>.site-highlight</code> surfaces.
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
                      <h3>Use site-grid for the default content step.</h3>
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
                      <h3>Use site-highlight as the quiet alternate surface.</h3>
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
              <span className="site-eyebrow">Surfaces & edges</span>
              <h2>Edges should feel crisp, not glossy.</h2>
              <p>
                The system uses an 8px radius as the baseline, quiet borders for most containment, and a restrained
                shadow only where a surface needs to feel lifted.
              </p>
            </div>

            <ReferenceName block>Edge sample card</ReferenceName>
            <div className="ds-foundation-edge-grid">
              <article className="ds-foundation-edge-sample">
                <span className="ds-foundation-edge-sample__preview ds-foundation-edge-sample__preview--radius" />
                <div>
                  <strong>Radius</strong>
                  <code>--radius: 8px</code>
                  <p>Cards, buttons, forms, chips, and docs previews should all feel related.</p>
                </div>
              </article>
              <article className="ds-foundation-edge-sample">
                <span className="ds-foundation-edge-sample__preview ds-foundation-edge-sample__preview--border" />
                <div>
                  <strong>Border</strong>
                  <code>--line</code>
                  <p>Use dividers and borders before adding decorative elevation.</p>
                </div>
              </article>
              <article className="ds-foundation-edge-sample">
                <span className="ds-foundation-edge-sample__preview ds-foundation-edge-sample__preview--shadow" />
                <div>
                  <strong>Shadow</strong>
                  <code>--shadow</code>
                  <p>Reserve for dropdowns, forms, fee cards, and cards that truly lift.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="ds-section" id="states">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Links & states</span>
              <h2>Interaction states should be obvious without becoming noisy.</h2>
              <p>
                Foundational states apply across shared components: links, inputs, cards, buttons, and structured text.
                Cedar is the signal color; motion stays small.
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
                  A rich text link should look like a link:{" "}
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
              <span className="site-eyebrow">Editorial HTML</span>
              <h2>Rich text should still look designed.</h2>
              <p>
                The shared <code>.rich-text</code> baseline now covers headings, paragraphs, links, lists, quotes,
                tables, dividers, and inline code. Use it for editorial content instead of styling each page by hand.
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
                Use lists when the content is genuinely list-shaped, such as practical requirements or related
                considerations.
              </p>
              <ul>
                <li>Use plain language before specialist language.</li>
                <li>Keep each item short enough to scan.</li>
                <li>Let the list sit inside the same reading rhythm as the paragraphs.</li>
              </ul>
              <blockquote>
                <p>The design should make clear information feel steady, not sterile.</p>
              </blockquote>
              <table>
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Table</td>
                    <td>Simple structured details such as fees, availability, or comparison notes.</td>
                  </tr>
                  <tr>
                    <td>Blockquote</td>
                    <td>A quiet editorial principle or short reflective statement.</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <p>Dividers should close a thought quietly, not split a page into heavy chunks.</p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
