import { useEffect } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import DevPageHero from "../../components/DevPageHero";
import DesignSystemSidebar from "../../components/DesignSystemSidebar";

const demoTaglineItems = [
  "Perth-based, online across Australia",
  "Individual counselling",
  "Serious, thoughtful, and human",
  "Kink-, ENM-, and LGBTQIA+-aware",
];

const demoPortraitSrc = "/joel-griffiths-portrait-temp.svg";

const demoPrinciples = [
  {
    title: "Real life",
    text: "Counselling should stay connected to the life you are actually living, not drift away from the pressures and decisions that make up everyday life.",
  },
  {
    title: "Relationships",
    text: "What happens between people matters: closeness, conflict, distance, attachment, and the ways these can shape how we feel.",
  },
  {
    title: "Recurring difficulties",
    text: "Some struggles are not just one-off problems. It can help to look at what keeps returning, and at what may be keeping it going.",
  },
];

const demoHeroDetailStackItems = [
  "Kink & BDSM",
  "ENM & Polyamory",
  "LGBTQIA+",
];

const demoHeroDeck = {
  lead: "Kinky, non-monogamous, queer, or some mix of all three.",
  body:
    "Use the deck when the first sentence should do more than introduce the paragraph. Give the opening line its own weight, then let the body carry the fuller explanation in a quieter voice.",
};

const anatomyRows = [
  {
    zone: "Wrapper",
    className: ".hero-section",
    desc: "Full-width page-opening section with the shared 40px top rhythm and a bottom divider.",
  },
  {
    zone: "Background",
    className: ".hero-bg--*",
    desc: "A single modifier applied to the wrapper when the shared background treatment is enough. The public hero system now shares one calm paper-and-sage surface via .hero-bg--diagonal, with page-level classes reserved for layout and content rather than alternate hero skins.",
  },
  {
    zone: "Top zone",
    className: ".hero-top",
    desc: "Two-column opening grid: display heading left, copy panel or media right. Default column split is 1fr / minmax(240px, 310px).",
  },
  {
    zone: "Top zone (media variant)",
    className: ".hero-top--supporting-media",
    desc: "Wider right column variant for when the second column holds a portrait note rather than a short copy panel. Used on the Home page.",
  },
  {
    zone: "Display heading",
    className: ".hero-display",
    desc: "Large serif display type. Use h1 in production. The shared rule owns the type styling, while page-level classes should set max-width or line breaks when a hero needs a specific measure.",
  },
  {
    zone: "Intro paragraph",
    className: ".hero-intro",
    desc: "Measured introductory copy for text-led heroes. Use it when the opening paragraph needs a readable line length under the heading.",
  },
  {
    zone: "Hero deck",
    className: ".hero-deck",
    desc: "Two-level editorial support deck with a quiet left rule, a balanced lead sentence, and calmer body copy. Use when the intro needs internal hierarchy rather than one continuous paragraph.",
  },
  {
    zone: "Copy panel",
    className: ".hero-copy-panel",
    desc: "Support copy rail with a cedar left rule. It can be a simple paragraph or a richer panel with badge, body copy, and actions.",
  },
  {
    zone: "Tagline row",
    className: ".hero-support-tagline",
    desc: "Thin trust row used beneath supporting copy when a hero needs practical details without becoming a second block.",
  },
  {
    zone: "Media note",
    className: ".hero-media-note*",
    desc: "Supporting portrait or image note with a quiet caption, used when the top zone needs a human anchor.",
  },
  {
    zone: "Badge",
    className: ".hero-badge",
    desc: "Small uppercase cedar label for hero metadata inside richer copy panels.",
  },
  {
    zone: "Detail stack",
    className: ".hero-detail-stack",
    desc: "Open typographic stack for a few short supporting themes when a hero needs emphasis without adding a card or strip. Add .hero-detail-stack__link when the items should act as quiet pathways.",
  },
  {
    zone: "Principles strip",
    className: ".hero-principles-strip",
    desc: "Three supporting items with a top rule and quiet vertical dividers. Use when a hero genuinely needs three short supporting ideas.",
  },
  {
    zone: "Principle item",
    className: ".hero-principle-item",
    desc: "One column in the supporting strip: serif label plus small muted copy.",
  },
];

const backgroundTreatments = [
  {
    label: "Paper",
    className: "hero-bg--paper",
    value: "var(--paper)",
    use: "A neutral page canvas when the hero should feel completely settled into the page. Available for future pages.",
  },
  {
    label: "Surface tint",
    className: "hero-bg--surface",
    value: "var(--surface)",
    use: "A soft green field when the hero needs a little more separation from the page body.",
  },
  {
    label: "Editorial paper wash",
    className: "hero-bg--diagonal",
    value: "layered radial washes + paper gradient",
    use: "The shared treatment used across public heroes. The class name is retained for continuity, but the surface is now a continuous paper-and-sage field with soft depth rather than a visible split or graphic diagonal.",
  },
  {
    label: "Cedar top border",
    className: "hero-bg--cedar-border",
    value: "var(--paper) with a cedar top rule",
    use: "A stronger editorial start for pages that need more authority. Reserved for future pages.",
  },
  {
    label: "Cedar soft",
    className: "hero-bg--cedar-soft",
    value: "var(--cedar-soft)",
    use: "A warmer green surface for pages where cedar emphasis should feel especially integrated.",
  },
  {
    label: "Vertical fade",
    className: "hero-bg--fade",
    value: "var(--surface) to var(--paper)",
    use: "The lightest depth treatment, useful when the next section should feel continuous.",
  },
];

export default function DS_Heroes() {
  useEffect(() => {
    document.title = "Heroes | Design System | Vive Counselling";
  }, []);

  return (
    <main className="site-page design-language-page">
      <DevPageHero
        badge="Design system"
        title="Heroes"
        description="Page-opening hero patterns for Vive: display headings, copy rails, supporting strips, and calm background treatments. The shared hero system is the canonical reference used across the site, with one continuous paper-and-sage hero surface reused before any page-specific layout refinements."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">
          <section className="ds-section" id="anatomy">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Anatomy</span>
              <h2>A page hero is a composed opening statement.</h2>
              <p>
                Use the shared hero classes for public page openings. Keep the top zone focused, use one background
                treatment, and reserve the principles strip for three short supporting ideas.
              </p>
            </div>

            <table className="ds-spacing-table">
              <thead>
                <tr>
                  <th>Zone</th>
                  <th>Class</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {anatomyRows.map((row) => (
                  <tr key={row.zone}>
                    <td>
                      <strong>{row.zone}</strong>
                    </td>
                    <td>
                      <code>{row.className}</code>
                    </td>
                    <td>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="ds-section" id="display-heading">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Display Heading</span>
              <h2>Large, light, and still readable across longer hero titles.</h2>
              <p>
                The heading should feel editorial, not loud. Keep the phrase deliberate, use line breaks intentionally
                when you control them, and let the shared line-height give multi-line titles a little more air.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Live sample: .hero-display</div>
              <div className="ds-hero-demo__body hero-bg--paper">
                <h2 className="hero-display">
                  Working with
                  <br />
                  <em>the bigger</em>
                  <br />
                  picture.
                </h2>
              </div>
            </div>

            <div className="ds-hero-demo" style={{ marginTop: "20px" }}>
              <div className="ds-hero-demo__label">Live sample: .hero-intro</div>
              <div className="ds-hero-demo__body hero-bg--paper">
                <p className="hero-intro">
                  Longer hero introductions should stay calm and readable, especially when the heading already takes up
                  several lines. Keep the measure controlled and let the opening paragraph do quiet orienting work.
                </p>
              </div>
            </div>

            <table className="ds-spacing-table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>font-size</td>
                  <td>
                    <code>clamp(3rem, 5vw, 5.45rem)</code>
                  </td>
                  <td>Gives the heading presence without overpowering the first screen on desktop.</td>
                </tr>
                <tr>
                  <td>font-weight</td>
                  <td>
                    <code>400</code>
                  </td>
                  <td>The scale carries the hierarchy; weight stays calm.</td>
                </tr>
                <tr>
                  <td>line-height</td>
                  <td>
                    <code>1.05</code>
                  </td>
                  <td>Keeps display headings compact while giving longer multi-line titles a little more breathing room.</td>
                </tr>
                <tr>
                  <td>letter-spacing</td>
                  <td>
                    <code>0</code>
                  </td>
                  <td>Keep spacing stable across the site typography system.</td>
                </tr>
                <tr>
                  <td>emphasis</td>
                  <td>
                    <code>em color: var(--cedar); font-style: normal; font-weight: 600</code>
                  </td>
                  <td>Highlights the key phrase without changing the voice of the heading.</td>
                </tr>
                <tr>
                  <td>shared rhythm</td>
                  <td>
                    <code>.hero-section 40px top / .hero-top 40px bottom</code>
                  </td>
                  <td>Sets the default opening field rhythm. Page-specific heroes can tighten or loosen it when the composition needs a stronger editorial lockup.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="ds-section" id="hero-deck">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Hero Deck</span>
              <h2>When the under-heading copy needs hierarchy inside itself.</h2>
              <p>
                Use the deck when the first sentence should land as a hook rather than dissolving into the full
                paragraph. It should feel editorial and deliberate, not like a quote box or a card, and the lead
                should stay poised rather than oversized.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Live sample: .hero-deck</div>
              <div className="ds-hero-demo__body hero-bg--paper">
                <div className="hero-deck ds-hero-demo__copy-panel" style={{ marginTop: 0 }}>
                  <p className="hero-deck__lead">{demoHeroDeck.lead}</p>
                  <p className="hero-deck__body">{demoHeroDeck.body}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="copy-panel">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Copy Panel</span>
              <h2>A cedar rule anchors the explanatory copy.</h2>
              <p>
                Use a plain paragraph for simple heroes. Use a panel container when the hero needs a breadcrumb, badge,
                or actions inside the same support rail.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Live sample: .hero-copy-panel</div>
              <div className="ds-hero-demo__body hero-bg--paper">
                <div className="hero-copy-panel ds-hero-demo__copy-panel">
                  <span className="hero-badge">Inclusive counselling</span>
                  <p>
                    Important parts of your life do not need to be defended, simplified, or translated before the real
                    work can begin.
                  </p>
                  <div className="site-actions">
                    <Button href="/contact">Make an enquiry</Button>
                    <Button href="/working-with-joel" variant="secondary">
                      Read more
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Live sample: .hero-support-tagline + .hero-media-note</div>
              <div className="ds-hero-demo__body hero-bg--paper">
                <div className="hero-top hero-top--supporting-media" style={{ paddingBottom: 0 }}>
                  <div className="hero-copy-panel ds-hero-demo__copy-panel">
                    <p>
                      Use the trust row when a hero needs a few practical signals kept inside the same support flow.
                    </p>
                    <ul className="hero-support-tagline" aria-label="Practice details">
                      {demoTaglineItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <aside className="hero-media-note" aria-label="Example media note">
                    <div className="hero-media-note__image">
                      <img src={demoPortraitSrc} alt="" />
                    </div>
                    <div className="hero-media-note__caption">
                      <strong>Joel Griffiths</strong>
                      <span>Counselling and psychodynamic psychotherapy</span>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="principles">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Principles Strip</span>
              <h2>Three short supports below the main statement.</h2>
              <p>
                The strip should clarify the promise of the page. Keep each item short and parallel. If there are not
                three genuinely useful supports, skip the strip.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Live sample: .hero-principles-strip</div>
              <div className="ds-hero-demo__body hero-bg--paper">
                <div className="hero-principles-strip">
                  {demoPrinciples.map((principle) => (
                    <div className="hero-principle-item" key={principle.title}>
                      <h3>{principle.title}</h3>
                      <p>{principle.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="detail-stack">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Detail Stack</span>
              <h2>An open hero-side stack when the text itself should carry the emphasis.</h2>
              <p>
                Use this when a hero needs two or three strong thematic labels, but a card or principles strip would
                feel too heavy. Keep it short, typographic, and slightly staggered rather than boxed in.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Live sample: .hero-detail-stack</div>
              <div className="ds-hero-demo__body hero-bg--paper">
                <div style={{ display: "grid", justifyContent: "end" }}>
                  <div className="hero-detail-stack" style={{ maxWidth: "388px" }}>
                    {demoHeroDetailStackItems.map((item) => (
                      <p className="hero-detail-stack__item" key={item}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="backgrounds">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Backgrounds</span>
              <h2>Choose one field treatment per hero.</h2>
              <p>
                Backgrounds should create atmosphere without becoming the subject. The diagonal treatment is the
                starting point, but it should read as a soft wash of light and paper rather than a visible wedge or
                split-screen panel. Adjust it with variables when a page needs more sage weight on one side or a
                lighter paper field on the other.
              </p>
            </div>

            <div className="ds-hero-bg-swatch-grid">
              {backgroundTreatments.map((bg) => (
                <div className="ds-hero-bg-swatch" key={bg.className}>
                  <div className={`ds-hero-bg-swatch__preview ${bg.className}`} />
                  <div className="ds-hero-bg-swatch__label">
                    <strong>{bg.label}</strong>
                    <code>.{bg.className}</code>
                  </div>
                </div>
              ))}
            </div>

            <table className="ds-spacing-table" style={{ marginTop: "24px" }}>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Value</th>
                  <th>Use</th>
                </tr>
              </thead>
              <tbody>
                {backgroundTreatments.map((bg) => (
                  <tr key={bg.className}>
                    <td>
                      <code>.{bg.className}</code>
                    </td>
                    <td>{bg.value}</td>
                    <td>{bg.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="ds-section" id="full-hero">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Full Composition</span>
              <h2>The shared hero composition.</h2>
              <p>
                This sample uses the same shared classes as the live hero system. In production, use <code>h1</code> for
                the display heading (the demo uses <code>h2</code> to avoid a duplicate landmark). Treat this as the
                reference for new page-opening heroes, then layer only the page-specific content and supporting pieces
                on top.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Live sample: full shared hero</div>
              <section className="hero-section hero-bg--diagonal" style={{ borderBottom: "none" }}>
                <Container>
                  <div className="hero-top">
                    <h2 className="hero-display">
                      Working with
                      <br />
                      <em>the bigger</em>
                      <br />
                      picture.
                    </h2>
                    <p className="hero-copy-panel">
                      I seek to understand the problem you are dealing with in the context of your actual life. That
                      means paying attention not only to what is happening now, but also to the patterns, pressures, and
                      relationships around it.
                    </p>
                  </div>
                  <div className="hero-principles-strip">
                    {demoPrinciples.map((principle) => (
                      <div className="hero-principle-item" key={principle.title}>
                        <h3>{principle.title}</h3>
                        <p>{principle.text}</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
