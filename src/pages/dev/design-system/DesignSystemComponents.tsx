import Button from "../../../components/Button";
import ContactInvitation from "../../../components/ContactInvitation";
import DesignSystemSpecimen from "../../../components/DesignSystemSpecimen";
import DesignSystemWorkspace from "./DesignSystemWorkspace";

export default function DesignSystemComponents() {
  return (
    <DesignSystemWorkspace
      description="Current reusable React contracts, rendered from production source with their supported boundaries and verified consumers."
      section="components"
      title="Components"
    >
      <section
        className="system-workspace__supported"
        id="components"
        aria-labelledby="components-heading"
        data-supported-specimen-count="2"
      >
        <div className="system-workspace__section-heading">
          <p>Supported component</p>
          <h2 id="components-heading">Components</h2>
        </div>

        <DesignSystemSpecimen
          consumers={[
            "Shared header action",
            "Public-page hero decisions",
            "Contact form submission",
            "Contact invitation",
            "Not Found recovery actions",
          ]}
          identifier="<Button />"
          recordPath="docs/design-system/components.md"
          role="Closed public action control with primary and secondary hierarchy, internal-link and native-button modes, and complete interaction states."
          title="Button"
        >
          <div className="system-button-specimen">
            <Button href="/contact">Primary action</Button>
            <Button type="button" variant="secondary">
              Secondary action
            </Button>
          </div>
        </DesignSystemSpecimen>

        <DesignSystemSpecimen
          consumers={[
            "Home closing invitation",
            "Working with Joel closing invitation",
            "Kink and BDSM closing invitation",
            "ENM and polyamory closing invitation",
            "LGBTQIA+ closing invitation",
          ]}
          identifier="<ContactInvitation />"
          recordPath="docs/design-system/components.md"
          role="Canonical final invitation from a public content page into the Contact journey; copy, destination, accessibility, and responsive presentation are component-owned."
          title="Contact invitation"
        >
          <ContactInvitation />
        </DesignSystemSpecimen>
      </section>
    </DesignSystemWorkspace>
  );
}
