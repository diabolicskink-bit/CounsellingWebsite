import { NavLink, useLocation } from "react-router-dom";

type NavItem = { label: string; href: string };
type NavGroup = { group: string; basePath: string; items: NavItem[] };

const overviewHref = "/design-language";

const navGroups: NavGroup[] = [
  {
    group: "Foundations",
    basePath: "/design-language/foundations",
    items: [
      { label: "Colour tokens", href: "/design-language/foundations#colour" },
      { label: "Typography", href: "/design-language/foundations#typography" },
      { label: "Spacing & layout", href: "/design-language/foundations#spacing" },
      { label: "HTML elements", href: "/design-language/foundations#html" },
    ],
  },
  {
    group: "Components",
    basePath: "/design-language/components",
    items: [
      { label: "Buttons", href: "/design-language/components#buttons" },
      { label: "Cards", href: "/design-language/components#cards" },
      { label: "Trust strip", href: "/design-language/components#trust-strip" },
      { label: "Forms", href: "/design-language/components#forms" },
      { label: "Lists & stacks", href: "/design-language/components#lists" },
    ],
  },
  {
    group: "Patterns",
    basePath: "/design-language/patterns",
    items: [
      { label: "Section patterns", href: "/design-language/patterns#section-patterns" },
      { label: "Information patterns", href: "/design-language/patterns#info-patterns" },
      { label: "Media panels", href: "/design-language/patterns#media-panels" },
    ],
  },
];

type Props = { className?: string };

export default function DesignSystemSidebar({ className }: Props) {
  const { pathname } = useLocation();
  const isOverview = pathname === overviewHref;

  return (
    <nav className={`ds-sidebar${className ? ` ${className}` : ""}`} aria-label="Design system navigation">
      <NavLink
        to={overviewHref}
        end
        className={`ds-sidebar__overview${isOverview ? " ds-sidebar__overview--active" : ""}`}
      >
        Overview
      </NavLink>

      {navGroups.map((group) => {
        const groupActive = pathname.startsWith(group.basePath);

        return (
          <div className="ds-sidebar__group" key={group.group}>
            <details open={groupActive}>
              <summary className="ds-sidebar__group-label">{group.group}</summary>
              {group.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`ds-sidebar__link${groupActive ? " ds-sidebar__link--active" : ""}`}
                  onClick={(e) => {
                    const hash = item.href.split("#")[1];
                    if (hash && pathname === group.basePath) {
                      e.preventDefault();
                      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
            </details>
          </div>
        );
      })}
    </nav>
  );
}
