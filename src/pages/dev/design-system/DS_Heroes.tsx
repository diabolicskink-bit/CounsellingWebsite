import Button from "../../../components/Button";
import Container from "../../../components/Container";
import DevPageHero from "../../../components/DevPageHero";
import DesignSystemSidebar from "../../../components/DesignSystemSidebar";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";

const demoTaglineItems = [
  "Perth-based, working with adults across Australia",
  "Individual counselling",
  "Serious, thoughtful, and human",
  "Kink-, ENM-, and LGBTQIA+-aware",
];

const demoPortraitSrc = "/joel-griffiths-homepage-portrait.jpg";

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
    "The earlier catalogue used the deck when the first sentence carried more weight than the rest of the introduction, with fuller explanation following in a quieter voice.",
};

const anatomyRows = [
  {
    zone: "Wrapper",
    className: ".hero-section",
    desc: "The snapshot recorded a full-width page-opening section with 40px top and bottom rhythm plus a bottom divider.",
  },
  {
    zone: "Background",
    className: ".hero-bg--default",
    desc: "The snapshot described this as the single shared hero background, creating a calm paper-and-sage field with soft depth.",
  },
  {
    zone: "Top zone",
    className: ".hero-top",
    desc: "The recorded two-column opening placed a display heading left and copy panel or media right, using a 1fr / minmax(240px, 310px) split.",
  },
  {
    zone: "Top zone (media variant)",
    className: ".hero-top--supporting-media",
    desc: "The recorded wider-right-column variant held a portrait note rather than a short copy panel and was associated with the earlier Home-page treatment.",
  },
  {
    zone: "Display statement",
    className: ".hero-display",
    desc: "The snapshot placed this measured serif statement after h1.hero-badge, with a 16px gap and --hero-display-max-width available for the recorded title-measure variation.",
  },
  {
    zone: "Intro paragraph",
    className: ".hero-intro",
    desc: "The snapshot used this measured introductory copy for a readable line length beneath text-led hero headings.",
  },
  {
    zone: "Hero deck",
    className: ".hero-deck",
    desc: "The snapshot used this two-level editorial deck when an introduction needed internal hierarchy rather than one continuous paragraph.",
  },
  {
    zone: "Copy panel",
    className: ".hero-copy-panel",
    desc: "The recorded support-copy rail used a cedar left rule and appeared as either a simple paragraph or a richer panel.",
  },
  {
    zone: "Tagline row",
    className: ".hero-support-tagline",
    desc: "The snapshot placed this thin trust row beneath supporting copy for practical details.",
  },
  {
    zone: "Media note",
    className: ".hero-media-note*",
    desc: "The snapshot paired this supporting portrait or image note with a quiet caption and recorded portrait and tag modifiers.",
  },
  {
    zone: "Badge",
    className: ".hero-badge",
    desc: "The earlier guidance placed this small uppercase cedar label in an h1 above p.hero-display on public-page examples.",
  },
  {
    zone: "Detail stack",
    className: ".hero-detail-stack",
    desc: "The snapshot used this open typographic stack for a few short supporting themes and recorded a link modifier for pathway variants.",
  },
  {
    zone: "Principles strip",
    className: ".hero-principles-strip",
    desc: "The recorded strip contained three supporting items with a top rule and quiet vertical dividers.",
  },
  {
    zone: "Principle item",
    className: ".hero-principle-item",
    desc: "The snapshot defined each supporting-strip column as a serif label with small muted copy.",
  },
];

const backgroundTreatments = [
  {
    label: "Default hero surface",
    className: "hero-bg--default",
    value: "layered radial washes + paper gradient",
    use: "The snapshot catalogued this as a single calm editorial field with soft depth, rather than a visible shape or alternate skin.",
  },
];

export default function DS_Heroes() {
  useDocumentMetadata(
    "Historical Heroes | Design Catalogue | Vive Counselling",
    "An archived snapshot of earlier Vive hero guidance, retained for historical reference and source-backed reconciliation.",
  );

  return (
    <main className="site-page">
      <DevPageHero
        badge="Historical catalogue"
        title="Historical heroes"
        description="An outdated snapshot of earlier page-opening hero patterns. These examples are retained for reconciliation and do not define current production guidance or approved reusable API."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DesignSystemSidebar />
        </div>

        <div className="ds-layout__content">
          <section className="ds-section" id="anatomy">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical anatomy</span>
              <h2>How this snapshot described a composed page opening.</h2>
              <p>
                The earlier catalogue presented a focused top zone, one background treatment, and an optional
                three-item principles strip. Those claims have not yet been reconciled with current public routes.
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
              <span className="site-eyebrow">Historical display statement</span>
              <h2>The recorded large, light display treatment.</h2>
              <p>
                The snapshot described <code>.hero-display</code> as an expressive statement placed after an{" "}
                <code>h1.hero-badge</code>, with deliberate line breaks and a page-scoped{" "}
                <code>--hero-display-max-width</code> option. That description is historical, not authoritative.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Historical sample: .hero-display</div>
              <div className="ds-hero-demo__body hero-bg--default">
                <p className="hero-display">
                  Working with
                  <br />
                  <em>the bigger</em>
                  <br />
                  picture.
                </p>
              </div>
            </div>

            <div className="ds-hero-demo" style={{ marginTop: "20px" }}>
              <div className="ds-hero-demo__label">Historical sample: .hero-intro</div>
              <div className="ds-hero-demo__body hero-bg--default">
                <p className="hero-intro">
                  The earlier sample kept longer introductions calm and readable beneath a heading occupying several
                  lines, with a controlled measure for quiet orienting work.
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
                  <td>badge-to-display gap</td>
                  <td>
                    <code>var(--hero-badge-display-gap, 16px)</code>
                  </td>
                  <td>The snapshot kept the page-topic H1 close to the expressive statement without changing the recorded support-copy rhythm.</td>
                </tr>
                <tr>
                  <td>title measure</td>
                  <td>
                    <code>max-width: var(--hero-display-max-width, 18ch)</code>
                  </td>
                  <td>The snapshot gave hero statements a default measure with a page-level width variable.</td>
                </tr>
                <tr>
                  <td>font-size</td>
                  <td>
                    <code>var(--type-display)</code>
                  </td>
                  <td>The recorded treatment took its scale from the earlier foundational display role.</td>
                </tr>
                <tr>
                  <td>font-weight</td>
                  <td>
                    <code>500</code>
                  </td>
                  <td>The snapshot gave the serif display more presence without a heavy sales-heading effect.</td>
                </tr>
                <tr>
                  <td>line-height</td>
                  <td>
                    <code>var(--leading-display)</code>
                  </td>
                  <td>The recorded line height balanced compact display headings with longer multi-line titles.</td>
                </tr>
                <tr>
                  <td>letter-spacing</td>
                  <td>
                    <code>0</code>
                  </td>
                  <td>The snapshot kept letter spacing stable within its recorded typography system.</td>
                </tr>
                <tr>
                  <td>emphasis</td>
                  <td>
                    <code>em color: var(--cedar); font-style: normal; font-weight: 600</code>
                  </td>
                  <td>The recorded emphasis highlighted a key phrase without changing the heading voice.</td>
                </tr>
                <tr>
                  <td>shared rhythm</td>
                  <td>
                    <code>.hero-section 40px top and bottom</code>
                  </td>
                  <td>The snapshot used this as its default rhythm from hero content to boundary.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="ds-section" id="hero-deck">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical hero deck</span>
              <h2>The snapshot's hierarchy within under-heading copy.</h2>
              <p>
                The earlier catalogue used this deck when the first sentence needed to land separately from the full
                paragraph. It described the result as editorial and deliberate rather than a quote box or card.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Historical sample: .hero-deck</div>
              <div className="ds-hero-demo__body hero-bg--default">
                <div className="hero-deck ds-hero-demo__copy-panel" style={{ marginTop: 0 }}>
                  <p className="hero-deck__lead">{demoHeroDeck.lead}</p>
                  <p className="hero-deck__body">{demoHeroDeck.body}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="copy-panel">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical copy panel</span>
              <h2>The recorded cedar-rule treatment for explanatory copy.</h2>
              <p>
                The snapshot paired simple heroes with a plain paragraph and used a panel container when a breadcrumb,
                badge, or actions appeared within the same support rail.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Historical sample: .hero-copy-panel</div>
              <div className="ds-hero-demo__body hero-bg--default">
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
              <div className="ds-hero-demo__label">Historical sample: .hero-support-tagline + .hero-media-note--portrait</div>
              <div className="ds-hero-demo__body hero-bg--default">
                <div className="hero-top hero-top--supporting-media" style={{ paddingBottom: 0 }}>
                  <div className="hero-copy-panel ds-hero-demo__copy-panel">
                    <p>
                      The earlier catalogue used this trust row for a few practical signals within the support flow.
                    </p>
                    <ul className="hero-support-tagline" aria-label="Practice details">
                      {demoTaglineItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <aside className="hero-media-note hero-media-note--portrait" aria-label="Example portrait media note">
                    <div className="hero-media-note__image">
                      <img src={demoPortraitSrc} alt="" />
                    </div>
                    <span className="hero-media-note__tag">Joel Griffiths</span>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="principles">
            <div className="ds-section-heading">
              <span className="site-eyebrow">Historical principles strip</span>
              <h2>The recorded three-support treatment.</h2>
              <p>
                The earlier catalogue described short, parallel items clarifying the page promise and omitted the
                strip when three useful supports were not available.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Historical sample: .hero-principles-strip</div>
              <div className="ds-hero-demo__body hero-bg--default">
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
              <span className="site-eyebrow">Historical detail stack</span>
              <h2>The snapshot's open, text-led hero-side stack.</h2>
              <p>
                The earlier catalogue used this for two or three strong thematic labels when a card or principles
                strip felt too heavy, keeping the treatment short, typographic, and slightly staggered.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Historical sample: .hero-detail-stack</div>
              <div className="ds-hero-demo__body hero-bg--default">
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
              <span className="site-eyebrow">Historical background</span>
              <h2>The surface this snapshot catalogued for public heroes.</h2>
              <p>
                The earlier catalogue described a soft field of paper and sage light that created atmosphere without
                becoming the subject, rather than a visible wedge, split panel, or alternate theme.
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
                  <th>Earlier description</th>
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
              <span className="site-eyebrow">Historical full composition</span>
              <h2>The hero composition retained in this snapshot.</h2>
              <p>
                This historical sample preserves the classes and semantic pairing recorded by the earlier catalogue:
                an <code>h1.hero-badge</code> page-topic label followed by a <code>p.hero-display</code> statement.
                The demo keeps the badge as a non-heading label to avoid a duplicate page H1 within this archive page.
              </p>
            </div>

            <div className="ds-hero-demo">
              <div className="ds-hero-demo__label">Historical sample: full shared hero</div>
              <section className="hero-section hero-bg--default" style={{ borderBottom: "none" }}>
                <Container>
                  <div className="hero-top">
                    <div>
                      <span className="hero-badge">Working with Joel Griffiths</span>
                      <p className="hero-display">
                        Working with
                        <br />
                        <em>the bigger</em>
                        <br />
                        picture.
                      </p>
                    </div>
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
