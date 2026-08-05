import { Link } from "react-router-dom";
import DesignSystemSpecimen from "../../components/DesignSystemSpecimen";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import "../../styles-design-system.css";

const authorityDocuments = [
  {
    label: "Governance",
    path: "docs/design-system/governance.md",
    description: "Lifecycle, promotion, retirement, and rendered-workspace rules.",
  },
  {
    label: "Foundations",
    path: "docs/design-system/foundations.md",
    description: "Current promoted foundation contracts.",
  },
  {
    label: "Components",
    path: "docs/design-system/components.md",
    description: "Current promoted React component contracts.",
  },
  {
    label: "Patterns",
    path: "docs/design-system/patterns.md",
    description: "Current promoted semantic pattern contracts.",
  },
] as const;

const promotionGate = [
  {
    title: "Verify the repeated need",
    description: "Find the same semantic job in current production consumers, not merely similar declarations or shapes.",
  },
  {
    title: "Authorize shared scope",
    description: "Promotion happens only when the current task explicitly includes shared-system work.",
  },
  {
    title: "Stabilise the contract",
    description: "Name the role and boundary, then cover responsive behaviour, accessibility, and interaction states.",
  },
  {
    title: "Migrate and record",
    description: "Move intended consumers to the elevated implementation and complete the source-backed item record.",
  },
  {
    title: "Render the real item",
    description: "Only then add a specimen that imports the production component or applies the supported production classes.",
  },
] as const;

function documentHref(path: string) {
  return `/documents?${new URLSearchParams({ doc: path }).toString()}`;
}

export default function DesignSystem() {
  useDocumentMetadata(
    "Design system | Vive Counselling",
    "Development-only workspace for source-backed, supported design-system specimens.",
  );

  return (
    <main className="system-workspace" data-design-system-workspace="source-backed">
      <header className="system-workspace__cover site-hero-background">
        <div className="system-workspace__container system-workspace__cover-layout">
          <div className="system-workspace__title">
            <p className="system-workspace__eyebrow">Development workspace</p>
            <h1>Design system</h1>
            <p className="system-workspace__lede">
              A rendered view of deliberately supported production UI. The written record grants authority; this
              workspace makes that authority inspectable.
            </p>
          </div>

          <aside className="system-workspace__authority" aria-labelledby="authority-order-heading">
            <p id="authority-order-heading">Authority order</p>
            <ol>
              <li>
                <span>01</span>
                <strong>Item record decides reuse</strong>
              </li>
              <li>
                <span>02</span>
                <strong>Production source proves behaviour</strong>
              </li>
              <li>
                <span>03</span>
                <strong>Rendered specimen shows the result</strong>
              </li>
            </ol>
          </aside>
        </div>
      </header>

      <section className="system-workspace__ledger" aria-label="Design-system workspace">
        <div className="system-workspace__container system-workspace__ledger-layout">
          <aside className="system-workspace__rail">
            <div className="system-workspace__state">
              <p>Current state</p>
              <strong>8 supported specimens</strong>
              <span>Foundations and Patterns contain the verified shared surface system.</span>
            </div>

            <nav className="system-workspace__section-nav" aria-label="Supported specimen sections">
              <p>Supported sections</p>
              <a href="#foundations">
                <strong>Foundations</strong>
                <span>06</span>
              </a>
              <a href="#patterns">
                <strong>Patterns</strong>
                <span>02</span>
              </a>
            </nav>

            <nav className="system-workspace__documents" aria-label="Design-system authority documents">
              <p>Written authority</p>
              {authorityDocuments.map((document) => (
                <Link key={document.path} to={documentHref(document.path)}>
                  <strong>{document.label}</strong>
                  <span>{document.description}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <div className="system-workspace__working-field">
            <section
              className="system-workspace__supported"
              id="foundations"
              aria-labelledby="foundations-heading"
              data-supported-specimen-count="6"
            >
              <div className="system-workspace__section-heading">
                <p>Supported foundation</p>
                <h2 id="foundations-heading">Foundations</h2>
              </div>

              <DesignSystemSpecimen
                consumers={[
                  ".site-header .header-button and .button--primary",
                  ".rich-text a, .site-text-link, and .site-card__action",
                  ".home-closing__action and Contact form focus states",
                ]}
                identifier="--cedar"
                recordPath="docs/design-system/foundations.md"
                role="Primary brand accent for action surfaces, strong interactive or editorial emphasis, and focus or boundary cues on verified light site surfaces."
                title="Cedar"
              >
                <div className="system-colour-specimen">
                  <div
                    className="system-colour-specimen__swatch system-colour-specimen__swatch--cedar"
                    aria-label="Cedar colour swatch, hexadecimal 234b3d"
                  >
                    <span>Primary accent</span>
                    <strong>#234B3D</strong>
                  </div>

                  <div className="system-colour-specimen__facts">
                    <div>
                      <span>Production token</span>
                      <code>var(--cedar)</code>
                    </div>
                    <dl>
                      <div>
                        <dt>Light text on cedar</dt>
                        <dd>9.53:1</dd>
                      </div>
                      <div>
                        <dt>Cedar on paper</dt>
                        <dd>9.05:1</dd>
                      </div>
                    </dl>
                    <p>Both recorded pairings meet WCAG AAA contrast for ordinary text.</p>
                  </div>
                </div>
              </DesignSystemSpecimen>

              <DesignSystemSpecimen
                consumers={[".site-section-warm"]}
                identifier="--section-rule"
                recordPath="docs/design-system/foundations.md"
                role="Quiet lower boundary for the supported warm editorial section pattern."
                title="Warm section rule"
              >
                <div className="system-colour-specimen">
                  <div
                    className="system-colour-specimen__swatch system-colour-specimen__swatch--section-rule"
                    aria-label="Warm section rule swatch, cedar at 22 percent over the warm section background"
                  >
                    <span>Section boundary</span>
                    <strong>22%</strong>
                  </div>

                  <div className="system-colour-specimen__facts">
                    <div>
                      <span>Production token</span>
                      <code>var(--section-rule)</code>
                    </div>
                    <dl>
                      <div>
                        <dt>Composite on section</dt>
                        <dd>#C4CBC2</dd>
                      </div>
                      <div>
                        <dt>Rule width</dt>
                        <dd>1px</dd>
                      </div>
                    </dl>
                    <p>The rule separates adjacent materials without being the only cue to section structure.</p>
                  </div>
                </div>
              </DesignSystemSpecimen>

              <DesignSystemSpecimen
                consumers={[
                  ".home-about and .home-closing",
                  ".site-grid.working-with-joel-page__intro",
                  ".inclusion-hub-page__chapter (warm base and right-hand field)",
                  ".codex-contact__task-section and .kink-page__misread",
                  ".enm-page__reasons and .lgbtqia-page__recognition",
                ]}
                identifier="--section-warm"
                recordPath="docs/design-system/foundations.md"
                role="Flat warm paper background for primary light editorial sections across the public site."
                title="Warm section"
              >
                <div className="system-colour-specimen">
                  <div
                    className="system-colour-specimen__swatch system-colour-specimen__swatch--section-warm"
                    aria-label="Warm section colour swatch, hexadecimal f2efe8"
                  >
                    <span>Editorial section</span>
                    <strong>#F2EFE8</strong>
                  </div>

                  <div className="system-colour-specimen__facts">
                    <div>
                      <span>Production token</span>
                      <code>var(--section-warm)</code>
                    </div>
                    <dl>
                      <div>
                        <dt>Dark ink on section</dt>
                        <dd>13.87:1</dd>
                      </div>
                      <div>
                        <dt>Body text on section</dt>
                        <dd>8.18:1</dd>
                      </div>
                    </dl>
                    <p>The sage side of the Inclusion chapters remains a separate page-local overlay.</p>
                  </div>
                </div>
              </DesignSystemSpecimen>

              <DesignSystemSpecimen
                consumers={[
                  ".home-about__portrait",
                  ".working-with-joel-page__intro-note",
                ]}
                identifier="--portrait-panel"
                recordPath="docs/design-system/foundations.md"
                role="Dark chocolate outer material for the identified-person portrait treatment; not a general surface or action colour."
                title="Portrait panel"
              >
                <div className="system-colour-specimen">
                  <div
                    className="system-colour-specimen__swatch system-colour-specimen__swatch--portrait-panel"
                    aria-label="Portrait panel colour swatch, hexadecimal 6b5146"
                  >
                    <span>Portrait material</span>
                    <strong>#6B5146</strong>
                  </div>

                  <div className="system-colour-specimen__facts">
                    <div>
                      <span>Production token</span>
                      <code>var(--portrait-panel)</code>
                    </div>
                    <dl>
                      <div>
                        <dt>Light text on panel</dt>
                        <dd>7.07:1</dd>
                      </div>
                      <div>
                        <dt>Panel against frame</dt>
                        <dd>5.22:1</dd>
                      </div>
                    </dl>
                    <p>The supported role is limited to the shared portrait treatment.</p>
                  </div>
                </div>
              </DesignSystemSpecimen>

              <DesignSystemSpecimen
                consumers={[
                  ".home-about__portrait-frame",
                  ".working-with-joel-page__intro-note .hero-media-note__image",
                ]}
                identifier="--portrait-frame"
                recordPath="docs/design-system/foundations.md"
                role="Pale warm backing immediately around identified-person imagery inside the shared chocolate portrait panel."
                title="Portrait frame"
              >
                <div className="system-colour-specimen">
                  <div
                    className="system-colour-specimen__swatch system-colour-specimen__swatch--portrait-frame"
                    aria-label="Portrait frame colour swatch, hexadecimal e4d9cc"
                  >
                    <span>Image backing</span>
                    <strong>#E4D9CC</strong>
                  </div>

                  <div className="system-colour-specimen__facts">
                    <div>
                      <span>Production token</span>
                      <code>var(--portrait-frame)</code>
                    </div>
                    <dl>
                      <div>
                        <dt>Dark text on frame</dt>
                        <dd>11.45:1</dd>
                      </div>
                      <div>
                        <dt>Frame against panel</dt>
                        <dd>5.22:1</dd>
                      </div>
                    </dl>
                    <p>This is a non-text media material, not a general content surface.</p>
                  </div>
                </div>
              </DesignSystemSpecimen>

              <DesignSystemSpecimen
                consumers={[
                  ".home-about__portrait-link",
                  ".working-with-joel-page__intro-note-details",
                ]}
                identifier="--portrait-footer-tint"
                recordPath="docs/design-system/foundations.md"
                role="Translucent chocolate footer or action band applied only over the shared portrait panel."
                title="Portrait footer tint"
              >
                <div className="system-colour-specimen">
                  <div
                    className="system-colour-specimen__swatch system-colour-specimen__swatch--portrait-footer"
                    aria-label="Portrait footer tint swatch, rgba 32 21 17 at 12 percent over the portrait panel"
                  >
                    <span>Footer and action tint</span>
                    <strong>12%</strong>
                  </div>

                  <div className="system-colour-specimen__facts">
                    <div>
                      <span>Production token</span>
                      <code>var(--portrait-footer-tint)</code>
                    </div>
                    <dl>
                      <div>
                        <dt>Composite on panel</dt>
                        <dd>#624A40</dd>
                      </div>
                      <div>
                        <dt>Light text on composite</dt>
                        <dd>7.95:1</dd>
                      </div>
                    </dl>
                    <p>The stronger Home-only interaction tint remains page-local.</p>
                  </div>
                </div>
              </DesignSystemSpecimen>
            </section>

            <section
              className="system-workspace__supported"
              id="patterns"
              aria-labelledby="patterns-heading"
              data-supported-specimen-count="2"
            >
              <div className="system-workspace__section-heading">
                <p>Supported pattern</p>
                <h2 id="patterns-heading">Patterns</h2>
              </div>

              <DesignSystemSpecimen
                consumers={[
                  "Home, Working with Joel, and Inclusion heroes",
                  "Kink and BDSM, ENM and polyamory, and LGBTQIA+ heroes",
                  "Contact opening",
                ]}
                identifier=".site-hero-background"
                recordPath="docs/design-system/patterns.md"
                role="Shared dark-green hero surface with one restrained sage highlight and a quiet lower boundary; hero content and composition remain consumer-owned."
                title="Shared hero background"
              >
                <section className="site-hero-background system-hero-background-pattern">
                  <div className="system-hero-background-pattern__inner">
                    <p>Shared public surface</p>
                    <h4>One background. Content-shaped heroes.</h4>
                    <p>
                      The shared layer owns the surface and boundary. Each route retains its own structure, copy,
                      actions, and responsive composition.
                    </p>
                  </div>
                </section>
              </DesignSystemSpecimen>

              <DesignSystemSpecimen
                consumers={[
                  "Home About Vive and closing invitation",
                  "Working with Joel introduction and Inclusion chapters",
                  "Contact enquiry task, Kink misread, ENM reasons, and LGBTQIA+ recognition sections",
                ]}
                identifier=".site-section-warm"
                recordPath="docs/design-system/patterns.md"
                role="Shared warm editorial band with a 60px default vertical rhythm, common lower rule, and explicit page-local responsive override boundary."
                title="Warm editorial section"
              >
                <section className="site-section-warm system-warm-section-pattern">
                  <div className="system-warm-section-pattern__inner">
                    <p>Shared public pattern</p>
                    <h4>Warm editorial section</h4>
                    <p>
                      The shared layer owns the material, default spacing, and boundary. Content composition and
                      responsive exceptions remain shaped by each page.
                    </p>
                  </div>
                </section>
              </DesignSystemSpecimen>
            </section>

            <section className="system-workspace__gate" aria-labelledby="promotion-gate-heading">
              <div className="system-workspace__section-heading">
                <p>Before an item appears here</p>
                <h2 id="promotion-gate-heading">The promotion gate</h2>
              </div>

              <ol>
                {promotionGate.map((step, index) => (
                  <li key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
