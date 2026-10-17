import type { PointerEvent } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { normalizeRoutePath } from "../data/routes";
import type { NavItem } from "../data/site";

type NavigationProps = {
  activePath: string;
  items: readonly NavItem[];
};

type NavigationItemProps = {
  // Already normalized by the top-level navigation.
  activePath: string;
  depth: number;
  item: NavItem;
};

type NavItemLinkProps = Omit<LinkProps, "children" | "state" | "to"> & {
  isCurrent?: boolean;
  item: NavItem;
};

function joinClasses(...classes: Array<string | false>) {
  return classes.filter(Boolean).join(" ");
}

function isCurrentItem(item: NavItem, activePath: string) {
  return normalizeRoutePath(item.trackedPagePath ?? item.href) === activePath;
}

// An item is active when it or any descendant is the current page.
function isActiveItem(item: NavItem, activePath: string): boolean {
  return isCurrentItem(item, activePath)
    || (item.children?.some((child) => isActiveItem(child, activePath)) ?? false);
}

// Blurring pointer-activated links prevents :focus-within from holding a submenu open.
function blurAfterPointerActivation(event: PointerEvent<HTMLAnchorElement>) {
  event.currentTarget.blur();
}

// Shared with the footer so every navigation link carries its tracked-page state.
export function NavItemLink({ isCurrent = false, item, ...linkProps }: NavItemLinkProps) {
  return (
    <Link
      {...linkProps}
      aria-current={isCurrent ? "page" : undefined}
      state={item.trackedPagePath ? { trackedPagePath: item.trackedPagePath } : undefined}
      to={item.href}
    >
      {item.label}
    </Link>
  );
}

function DesktopNavigationItem({ activePath, depth, item }: NavigationItemProps) {
  const isTopLevel = depth === 0;
  const linkClassName = isTopLevel ? "nav-link" : "nav-submenu__link";
  const subItems = item.children?.length ? item.children : null;

  return (
    <li className={isTopLevel ? "nav-item" : "nav-submenu__item"}>
      <NavItemLink
        className={joinClasses(
          linkClassName,
          isActiveItem(item, activePath) && `${linkClassName}--active`,
          subItems !== null && `${linkClassName}--parent`,
        )}
        isCurrent={isCurrentItem(item, activePath)}
        item={item}
        onPointerUp={blurAfterPointerActivation}
      />

      {subItems ? (
        <ul className={joinClasses("nav-submenu", !isTopLevel && "nav-submenu--nested")}>
          {subItems.map((subItem) => (
            <DesktopNavigationItem
              activePath={activePath}
              depth={depth + 1}
              item={subItem}
              key={subItem.label}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function MobileNavigationItem({
  activePath,
  depth,
  item,
  onNavigate,
}: NavigationItemProps & { onNavigate: () => void }) {
  const subItems = item.children?.length ? item.children : null;

  return (
    <li className={depth === 0 ? "mobile-nav__item" : undefined}>
      <NavItemLink
        className={joinClasses(
          "mobile-nav__link",
          depth > 0 && "mobile-nav__sub-link",
          depth > 1 && "mobile-nav__sub-link--nested",
          isActiveItem(item, activePath) && "mobile-nav__link--active",
        )}
        isCurrent={isCurrentItem(item, activePath)}
        item={item}
        onClick={onNavigate}
      />

      {subItems ? (
        <ul>
          {subItems.map((subItem) => (
            <MobileNavigationItem
              activePath={activePath}
              depth={depth + 1}
              item={subItem}
              key={subItem.label}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function DesktopNavigation({ activePath, items }: NavigationProps) {
  const normalizedActivePath = normalizeRoutePath(activePath);

  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      <ul>
        {items.filter((item) => !item.mobileOnly).map((item) => (
          <DesktopNavigationItem
            activePath={normalizedActivePath}
            depth={0}
            item={item}
            key={item.label}
          />
        ))}
      </ul>
    </nav>
  );
}

export function MobileNavigation({
  activePath,
  id,
  items,
  onNavigate,
}: NavigationProps & { id: string; onNavigate: () => void }) {
  const normalizedActivePath = normalizeRoutePath(activePath);

  return (
    <nav className="mobile-nav" id={id} aria-label="Mobile navigation">
      <ul>
        {items.map((item) => (
          <MobileNavigationItem
            activePath={normalizedActivePath}
            depth={0}
            item={item}
            key={item.label}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  );
}
