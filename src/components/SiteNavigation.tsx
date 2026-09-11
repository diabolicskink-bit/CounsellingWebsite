import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { normalizeRoutePath } from "../data/routes";
import type { NavItem } from "../data/site";

type DesktopNavigationProps = {
  activePath: string;
  items: readonly NavItem[];
  onLinkPointerUp: (event: ReactPointerEvent<HTMLAnchorElement>) => void;
};

type MobileNavigationProps = {
  activePath: string;
  items: readonly NavItem[];
  onNavigate: () => void;
};

type NavigationItemProps = {
  activePath: string;
  depth: number;
  item: NavItem;
};

function joinClasses(...classes: Array<string | false>) {
  return classes.filter(Boolean).join(" ");
}

function itemMatchesActivePath(item: NavItem, activePath: string) {
  return normalizeRoutePath(item.trackedPagePath ?? item.href) === activePath;
}

function itemOrDescendantMatchesActivePath(item: NavItem, activePath: string): boolean {
  return (
    itemMatchesActivePath(item, activePath) ||
    item.children?.some((child) => itemOrDescendantMatchesActivePath(child, activePath)) === true
  );
}

function DesktopNavigationItem({
  activePath,
  depth,
  item,
  onLinkPointerUp,
}: NavigationItemProps & Pick<DesktopNavigationProps, "onLinkPointerUp">) {
  const hasChildren = Boolean(item.children?.length);
  const isActive = itemOrDescendantMatchesActivePath(item, activePath);
  const isCurrent = itemMatchesActivePath(item, activePath);
  const isTopLevel = depth === 0;
  const wrapperClassName = isTopLevel ? "nav-item" : "nav-submenu__item";

  return (
    <div className={wrapperClassName}>
      <Link
        aria-current={isCurrent ? "page" : undefined}
        className={
          isTopLevel
            ? joinClasses(
                "nav-link",
                isActive && "nav-link--active",
                hasChildren && "nav-link--parent",
              )
            : joinClasses(
                "nav-submenu__link",
                isActive && "nav-submenu__link--active",
                hasChildren && "nav-submenu__link--parent",
              )
        }
        onPointerUp={onLinkPointerUp}
        state={item.trackedPagePath ? { trackedPagePath: item.trackedPagePath } : undefined}
        to={item.href}
      >
        {item.label}
      </Link>

      {hasChildren ? (
        <div
          aria-label={`${item.label} submenu`}
          className={joinClasses("nav-submenu", !isTopLevel && "nav-submenu--nested")}
          role="group"
        >
          {item.children?.map((child) => (
            <DesktopNavigationItem
              activePath={activePath}
              depth={depth + 1}
              item={child}
              key={child.href}
              onLinkPointerUp={onLinkPointerUp}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileNavigationItem({
  activePath,
  depth,
  item,
  onNavigate,
}: NavigationItemProps & Pick<MobileNavigationProps, "onNavigate">) {
  const hasChildren = Boolean(item.children?.length);
  const isActive = itemOrDescendantMatchesActivePath(item, activePath);
  const isCurrent = itemMatchesActivePath(item, activePath);
  const isSubmenuItem = depth > 0;

  return (
    <div>
      <Link
        aria-current={isCurrent ? "page" : undefined}
        className={joinClasses(
          "mobile-nav__link",
          isSubmenuItem && "mobile-nav__sub-link",
          depth > 1 && "mobile-nav__sub-link--nested",
          isActive && "mobile-nav__link--active",
        )}
        onClick={onNavigate}
        state={item.trackedPagePath ? { trackedPagePath: item.trackedPagePath } : undefined}
        to={item.href}
      >
        {item.label}
      </Link>

      {hasChildren
        ? item.children?.map((child) => (
            <MobileNavigationItem
              activePath={activePath}
              depth={depth + 1}
              item={child}
              key={child.href}
              onNavigate={onNavigate}
            />
          ))
        : null}
    </div>
  );
}

export function DesktopNavigation({
  activePath,
  items,
  onLinkPointerUp,
}: DesktopNavigationProps) {
  const normalizedActivePath = normalizeRoutePath(activePath);

  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {items.filter((item) => !item.mobileOnly).map((item) => (
        <DesktopNavigationItem
          activePath={normalizedActivePath}
          depth={0}
          item={item}
          key={item.href}
          onLinkPointerUp={onLinkPointerUp}
        />
      ))}
    </nav>
  );
}

export function MobileNavigation({
  activePath,
  items,
  onNavigate,
}: MobileNavigationProps) {
  const normalizedActivePath = normalizeRoutePath(activePath);

  return (
    <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
      {items.map((item) => (
        <MobileNavigationItem
          activePath={normalizedActivePath}
          depth={0}
          item={item}
          key={`${item.href}:${item.label}`}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
