import type { PointerEvent as ReactPointerEvent } from "react";
import { NavLink } from "react-router-dom";
import { navItems, type NavItem } from "../data/site";

type DesktopNavigationProps = {
  onLinkPointerUp: (event: ReactPointerEvent<HTMLAnchorElement>) => void;
  pathname: string;
};

type MobileNavigationProps = {
  onNavigate: () => void;
  pathname: string;
};

type NavigationItemProps = {
  depth: number;
  item: NavItem;
  pathname: string;
};

function joinClasses(...classes: Array<string | false>) {
  return classes.filter(Boolean).join(" ");
}

function itemIsActive(item: NavItem, pathname: string): boolean {
  return item.href === pathname || item.children?.some((child) => itemIsActive(child, pathname)) === true;
}

function DesktopNavigationItem({
  depth,
  item,
  onLinkPointerUp,
  pathname,
}: NavigationItemProps & Pick<DesktopNavigationProps, "onLinkPointerUp">) {
  const hasChildren = Boolean(item.children?.length);
  const isTopLevel = depth === 0;
  const wrapperClassName = isTopLevel ? "nav-item" : "nav-submenu__item";

  return (
    <div className={wrapperClassName}>
      <NavLink
        className={({ isActive }) =>
          isTopLevel
            ? joinClasses(
                "nav-link",
                (isActive || itemIsActive(item, pathname)) && "nav-link--active",
                hasChildren && "nav-link--parent",
              )
            : joinClasses(
                "nav-submenu__link",
                (isActive || itemIsActive(item, pathname)) && "nav-submenu__link--active",
                hasChildren && "nav-submenu__link--parent",
              )
        }
        onPointerUp={onLinkPointerUp}
        to={item.href}
      >
        {item.label}
      </NavLink>

      {hasChildren ? (
        <div
          aria-label={`${item.label} submenu`}
          className={joinClasses("nav-submenu", !isTopLevel && "nav-submenu--nested")}
          role="group"
        >
          {item.children?.map((child) => (
            <DesktopNavigationItem
              depth={depth + 1}
              item={child}
              key={child.href}
              onLinkPointerUp={onLinkPointerUp}
              pathname={pathname}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileNavigationItem({
  depth,
  item,
  onNavigate,
  pathname,
}: NavigationItemProps & Pick<MobileNavigationProps, "onNavigate">) {
  const hasChildren = Boolean(item.children?.length);
  const isSubmenuItem = depth > 0;

  return (
    <div>
      <NavLink
        className={({ isActive }) =>
          joinClasses(
            "mobile-nav__link",
            isSubmenuItem && "mobile-nav__sub-link",
            depth > 1 && "mobile-nav__sub-link--nested",
            (isActive || (isSubmenuItem && itemIsActive(item, pathname))) && "mobile-nav__link--active",
          )
        }
        onClick={onNavigate}
        to={item.href}
      >
        {item.label}
      </NavLink>

      {hasChildren
        ? item.children?.map((child) => (
            <MobileNavigationItem
              depth={depth + 1}
              item={child}
              key={child.href}
              onNavigate={onNavigate}
              pathname={pathname}
            />
          ))
        : null}
    </div>
  );
}

export function DesktopNavigation({ onLinkPointerUp, pathname }: DesktopNavigationProps) {
  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {navItems.map((item) => (
        <DesktopNavigationItem
          depth={0}
          item={item}
          key={item.href}
          onLinkPointerUp={onLinkPointerUp}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}

export function MobileNavigation({ onNavigate, pathname }: MobileNavigationProps) {
  return (
    <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <MobileNavigationItem
          depth={0}
          item={item}
          key={item.href}
          onNavigate={onNavigate}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}
