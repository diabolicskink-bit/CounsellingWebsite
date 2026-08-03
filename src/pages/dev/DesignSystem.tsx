import { Link } from "react-router-dom";
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
    path: "docs/design-system/foundations/tokens.md",
    description: "Item records for tokens, type roles, colour, and spacing.",
  },
  {
    label: "Components",
    path: "docs/design-system/patterns/components.md",
    description: "Item records for React components and component behaviour.",
  },
  {
    label: "Patterns",
    path: "docs/design-system/patterns/page-patterns.md",
    description: "Item records for selector families and page-level patterns.",
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

const futureSections = [
  ["Foundations", "Supported semantic tokens and identity decisions."],
  ["Components", "Supported React components and their behavioural contracts."],
  ["Patterns", "Supported selector families and repeatable compositions."],
] as const;

function documentHref(path: string) {
  return `/documents?${new URLSearchParams({ doc: path }).toString()}`;
}

export default function DesignSystem() {
  useDocumentMetadata(
    "Design system | Vive Counselling",
    "Development-only workspace for source-backed, shared-supported design-system specimens.",
  );

  return (
    <main className="system-workspace" data-design-system-workspace="source-backed">
      <header className="system-workspace__cover">
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
              <strong>0 supported specimens</strong>
              <span>Nothing has yet been promoted under the current lifecycle.</span>
            </div>

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

            <section
              className="system-workspace__empty"
              aria-labelledby="supported-specimens-heading"
              data-supported-specimen-count="0"
            >
              <div className="system-workspace__section-heading system-workspace__section-heading--light">
                <p>Supported specimens</p>
                <h2 id="supported-specimens-heading">The shelves are intentionally empty.</h2>
              </div>

              <p className="system-workspace__empty-copy">
                Existing production CSS and components remain implementation facts, not approved API. The first
                specimen will arrive with the first completed <code>Shared-supported</code> promotion—not before it.
              </p>

              <dl className="system-workspace__future-sections">
                {futureSections.map(([term, description]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>

              <Link className="system-workspace__governance-link" to={documentHref("docs/design-system/governance.md")}>
                Read the promotion rules
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
