import { Link } from "react-router-dom";
import { devRoutePaths } from "../../data/routes";
import DesignSystemWorkspace from "./design-system/DesignSystemWorkspace";

const cataloguePages = [
  {
    count: "8 supported foundations",
    description: "Semantic reading typography, colours, and shared material roles approved for deliberate reuse.",
    label: "Foundations",
    path: devRoutePaths.designSystemFoundations,
  },
  {
    count: "1 supported component",
    description: "Reusable React contracts with explicit ownership, accessibility, and consumer boundaries.",
    label: "Components",
    path: devRoutePaths.designSystemComponents,
  },
  {
    count: "2 supported patterns",
    description: "Repeated semantic arrangements that coordinate supported implementation without fixing page layout.",
    label: "Patterns",
    path: devRoutePaths.designSystemPatterns,
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

export default function DesignSystem() {
  return (
    <DesignSystemWorkspace
      description="A concise index of deliberately supported production UI. Open a catalogue page to inspect its real source-backed specimens."
      section="overview"
      title="Design system"
    >
      <section className="system-workspace__overview" aria-labelledby="catalogue-pages-heading">
        <div className="system-workspace__section-heading">
          <p>Current-only catalogues</p>
          <h2 id="catalogue-pages-heading">Choose a catalogue</h2>
        </div>

        <ul className="system-workspace__catalogue-grid">
          {cataloguePages.map((page) => (
            <li key={page.path}>
              <Link to={page.path}>
                <span>{page.count}</span>
                <h3>{page.label}</h3>
                <p>{page.description}</p>
                <strong>Open catalogue</strong>
              </Link>
            </li>
          ))}
        </ul>
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
    </DesignSystemWorkspace>
  );
}
