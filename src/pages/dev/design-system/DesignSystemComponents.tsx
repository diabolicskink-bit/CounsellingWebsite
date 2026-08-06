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
        data-supported-specimen-count="1"
      >
        <div className="system-workspace__section-heading">
          <p>Supported component</p>
          <h2 id="components-heading">Components</h2>
        </div>

        <DesignSystemSpecimen
          consumers={["Home closing invitation"]}
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
