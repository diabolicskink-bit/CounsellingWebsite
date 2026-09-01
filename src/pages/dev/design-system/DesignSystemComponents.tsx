import ContactInvitation from "../../../components/ContactInvitation";
import DesignSystemSpecimen from "../../../components/DesignSystemSpecimen";
import BlogArticleHero from "../../../content/blog/BlogArticleHero";
import { blogPostMetadata } from "../../../content/blog/manifest";
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
            "Every manifest-backed article route",
            "Standard Markdown articles",
            "Articles with registered subject-specific body presentations",
          ]}
          identifier="<BlogArticleHero />"
          recordPath="docs/design-system/components.md"
          role="Canonical article masthead for orientation, classification, abstract, authorship, and publication dates; article bodies and their presentations remain separate."
          title="Article masthead"
        >
          <BlogArticleHero post={blogPostMetadata[0]} />
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
