import DesignSystemSpecimen from "../../../components/DesignSystemSpecimen";
import DesignSystemWorkspace from "./DesignSystemWorkspace";

export default function DesignSystemFoundations() {
  return (
    <DesignSystemWorkspace
      description="Public semantic materials approved for deliberate reuse, shown through their current production tokens and verified roles."
      section="foundations"
      title="Foundations"
    >
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
            ".contact-invitation__action and Contact form focus states",
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
            ".home-about and .contact-invitation",
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
          consumers={[".home-about__portrait", ".working-with-joel-page__intro-note"]}
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
          consumers={[".home-about__portrait-link", ".working-with-joel-page__intro-note-details"]}
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
    </DesignSystemWorkspace>
  );
}
