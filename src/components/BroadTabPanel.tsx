import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type BroadTabPanelItem = {
  title: string;
  content: ReactNode;
};

type BroadTabPanelProps = {
  ariaLabel: string;
  items: BroadTabPanelItem[];
  className?: string;
  defaultActiveIndex?: number;
};

function getInitialIndex(defaultActiveIndex: number | undefined, itemCount: number) {
  if (defaultActiveIndex == null || defaultActiveIndex < 0 || defaultActiveIndex >= itemCount) {
    return 0;
  }

  return defaultActiveIndex;
}

export default function BroadTabPanel({
  ariaLabel,
  items,
  className = "",
  defaultActiveIndex,
}: BroadTabPanelProps) {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(() => getInitialIndex(defaultActiveIndex, items.length));

  useEffect(() => {
    setActiveIndex((currentIndex) => {
      if (items.length === 0) {
        return 0;
      }

      return Math.min(currentIndex, items.length - 1);
    });
  }, [items.length]);

  if (items.length === 0) {
    return null;
  }

  const safeActiveIndex = Math.min(activeIndex, items.length - 1);
  const activeItem = items[safeActiveIndex];
  const panelId = `${baseId}-panel`;
  const rootClassName = ["site-broad-tabs", className].filter(Boolean).join(" ");

  function getTabId(index: number) {
    return `${baseId}-tab-${index}`;
  }

  function focusTab(index: number) {
    window.requestAnimationFrame(() => {
      tabRefs.current[index]?.focus();
    });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = items.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    focusTab(nextIndex);
  }

  const activeContent =
    typeof activeItem.content === "string" || typeof activeItem.content === "number" ? (
      <p>{activeItem.content}</p>
    ) : (
      activeItem.content
    );

  return (
    <div className={rootClassName}>
      <div className="site-broad-tabs__tabs" role="tablist" aria-label={ariaLabel}>
        {items.map((item, index) => {
          const isActive = safeActiveIndex === index;
          const tabId = getTabId(index);

          return (
            <button
              aria-controls={panelId}
              aria-selected={isActive}
              className="site-broad-tabs__tab"
              data-active={isActive ? "true" : "false"}
              id={tabId}
              key={`${item.title}-${index}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={getTabId(safeActiveIndex)}
        className="site-broad-tabs__content"
        id={panelId}
        role="tabpanel"
        tabIndex={0}
      >
        {activeContent}
      </div>
    </div>
  );
}
