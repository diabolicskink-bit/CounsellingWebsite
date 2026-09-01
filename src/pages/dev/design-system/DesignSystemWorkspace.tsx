import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { devRoutePaths } from "../../../data/routes";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";
import "../../../styles-design-system-workspace.css";

type DesignSystemSection = "overview" | "foundations" | "components" | "patterns";

type Props = {
  children: ReactNode;
  description: string;
  section: DesignSystemSection;
  title: string;
};

const cataloguePages = [
  {
    count: "08",
    label: "Foundations",
    path: devRoutePaths.designSystemFoundations,
  },
  {
    count: "01",
    label: "Components",
    path: devRoutePaths.designSystemComponents,
  },
  {
    count: "02",
    label: "Patterns",
    path: devRoutePaths.designSystemPatterns,
  },
] as const;

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

function documentHref(path: string) {
  return `/documents?${new URLSearchParams({ doc: path }).toString()}`;
}

export default function DesignSystemWorkspace({ children, description, section, title }: Props) {
  useDocumentMetadata(
    section === "overview" ? "Design system | Vive Counselling" : `${title} | Design system | Vive Counselling`,
    `Development-only ${title.toLowerCase()} workspace for source-backed, supported design-system items.`,
  );

  return (
    <main
      className="system-workspace"
      data-design-system-section={section}
      data-design-system-workspace="source-backed"
    >
      <header className="system-workspace__cover site-hero-background">
        <div className="system-workspace__container system-workspace__cover-layout">
          <div className="system-workspace__title">
            <p className="system-workspace__eyebrow">
              {section === "overview" ? "Development workspace" : "Design system"}
            </p>
            <h1>{title}</h1>
            <p className="system-workspace__lede">{description}</p>
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
              <strong>11 supported specimens</strong>
              <span>Foundations, Components, and Patterns contain the verified shared system.</span>
            </div>

            <nav className="system-workspace__section-nav" aria-label="Design-system pages">
              <p>Workspace pages</p>
              <NavLink end to={devRoutePaths.designSystem}>
                <strong>Overview</strong>
                <span>11</span>
              </NavLink>
              {cataloguePages.map((page) => (
                <NavLink key={page.path} to={page.path}>
                  <strong>{page.label}</strong>
                  <span>{page.count}</span>
                </NavLink>
              ))}
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

          <div className="system-workspace__working-field">{children}</div>
        </div>
      </section>
    </main>
  );
}
