import { Link } from "react-router-dom";

export type DocumentsSidebarItem = {
  path: string;
  title: string;
};

export type DocumentsSidebarGroup = {
  key: string;
  label: string;
  emptyLabel: string;
  items: DocumentsSidebarItem[];
};

type Props = {
  groups: DocumentsSidebarGroup[];
  selectedPath: string | null;
};

function documentHref(path: string) {
  const searchParams = new URLSearchParams({ doc: path });
  return `/documents?${searchParams.toString()}`;
}

export default function DocumentsSidebar({ groups, selectedPath }: Props) {
  return (
    <nav className="documents-sidebar" aria-label="Documents navigation">
      {groups.map((group) => (
        <div className="documents-sidebar__group" key={group.key}>
          <details open>
            <summary className="documents-sidebar__group-label">{group.label}</summary>
            {group.items.length ? (
              group.items.map((item) => (
                <Link
                  key={item.path}
                  aria-current={item.path === selectedPath ? "page" : undefined}
                  className={`documents-sidebar__link${
                    item.path === selectedPath ? " documents-sidebar__link--active" : ""
                  }`}
                  to={documentHref(item.path)}
                >
                  {item.title}
                </Link>
              ))
            ) : (
              <span className="documents-sidebar__empty">{group.emptyLabel}</span>
            )}
          </details>
        </div>
      ))}
    </nav>
  );
}
