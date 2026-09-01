import Container from "../../../components/Container";
import DesignSystemSpecimen from "../../../components/DesignSystemSpecimen";
import DesignSystemWorkspace from "./DesignSystemWorkspace";

export default function DesignSystemPatterns() {
  return (
    <DesignSystemWorkspace
      description="Repeated semantic arrangements that coordinate supported materials without imposing a page template."
      section="patterns"
      title="Patterns"
    >
      <section
        className="system-workspace__supported"
        id="patterns"
        aria-labelledby="patterns-heading"
        data-supported-specimen-count="3"
      >
        <div className="system-workspace__section-heading">
          <p>Supported pattern</p>
          <h2 id="patterns-heading">Patterns</h2>
        </div>

        <DesignSystemSpecimen
          consumers={[
            "Home, Working with Joel, and Inclusion heroes",
            "Specialist counselling heroes and Crisis Support",
            "Articles index, article mastheads, and development heroes",
          ]}
          identifier=".site-hero, .site-hero__eyebrow, .site-hero__statement"
          recordPath="docs/design-system/patterns.md"
          role="Established hero frame, opening type roles, spacing, and dark-surface foreground roles; statement scale, layout, actions, supporting-content structure, and responsive composition remain consumer-owned."
          title="Shared hero structure"
        >
          <section className="site-hero site-hero-background system-hero-frame-pattern">
            <Container>
              <p className="site-hero__eyebrow">Shared opening role</p>
              <p className="site-hero__statement">A consistent frame that still follows the page.</p>
            </Container>
          </section>
        </DesignSystemSpecimen>

        <DesignSystemSpecimen
          consumers={[
            "Home, Working with Joel, and Inclusion heroes",
            "Kink and BDSM, ENM and polyamory, and LGBTQIA+ heroes",
            "Articles index, article mastheads, Crisis Support, and Contact opening",
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
                The shared layer owns the surface and boundary. Each route retains its own structure, copy, actions,
                and responsive composition.
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
                The shared layer owns the material, default spacing, and boundary. Content composition and responsive
                exceptions remain shaped by each page.
              </p>
            </div>
          </section>
        </DesignSystemSpecimen>
      </section>
    </DesignSystemWorkspace>
  );
}
