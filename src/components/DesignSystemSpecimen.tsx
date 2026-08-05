import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type DesignSystemRecordPath = `docs/design-system/${string}.md`;

type Props = {
  children: ReactNode;
  consumers: readonly [string, ...string[]];
  identifier: string;
  recordPath: DesignSystemRecordPath;
  role: string;
  title: string;
};

function documentHref(path: DesignSystemRecordPath) {
  return `/documents?${new URLSearchParams({ doc: path }).toString()}`;
}

/**
 * Development-only frame for an item that already has a source-backed contract
 * in an active catalogue. The frame visualises authority; it does not grant it.
 */
export default function DesignSystemSpecimen({
  children,
  consumers,
  identifier,
  recordPath,
  role,
  title,
}: Props) {
  return (
    <article className="system-specimen" data-design-system-status="supported">
      <header className="system-specimen__header">
        <div className="system-specimen__identity">
          <span className="system-specimen__status">Supported</span>
          <code>{identifier}</code>
        </div>
        <h3>{title}</h3>
        <p>{role}</p>
      </header>

      <div className="system-specimen__stage">{children}</div>

      <footer className="system-specimen__evidence">
        <div>
          <h4>Verified consumers</h4>
          <ul>
            {consumers.map((consumer) => (
              <li key={consumer}>{consumer}</li>
            ))}
          </ul>
        </div>
        <Link to={documentHref(recordPath)}>Open authoritative record</Link>
      </footer>
    </article>
  );
}
