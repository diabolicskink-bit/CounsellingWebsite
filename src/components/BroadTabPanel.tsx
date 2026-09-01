import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type BroadTabPanelItem = {
  readonly title: string;
  readonly content: ReactNode;
};

type BroadTabPanelProps = {
  ariaLabel: string;
  items: readonly BroadTabPanelItem[];
};

export default function BroadTabPanel({ ariaLabel, items }: BroadTabPanelProps) {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    setIsEnhanced(true);
  }, []);

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

  function getTabId(index: number) {
    return `${baseId}-tab-${index}`;
  }

  function getPanelId(index: number) {
    return `${baseId}-panel-${index}`;
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = items.length - 1;
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = index === lastIndex ? 0 : index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = index === 0 ? lastIndex : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="site-broad-tabs" data-enhanced={isEnhanced ? "true" : "false"}>
      <div
        aria-label={isEnhanced ? ariaLabel : undefined}
        className="site-broad-tabs__tabs"
        hidden={!isEnhanced}
        role={isEnhanced ? "tablist" : undefined}
      >
        {items.map((item, index) => {
          const isActive = safeActiveIndex === index;
          const tabId = getTabId(index);

          return (
            <button
              aria-controls={isEnhanced ? getPanelId(index) : undefined}
              aria-selected={isEnhanced ? isActive : undefined}
              className="site-broad-tabs__tab"
              data-active={isActive ? "true" : "false"}
              id={tabId}
              key={`${item.title}-${index}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role={isEnhanced ? "tab" : undefined}
              tabIndex={isEnhanced && isActive ? 0 : -1}
              type="button"
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="site-broad-tabs__panels">
        {items.map((item, index) => {
          const isActive = safeActiveIndex === index;

          return (
            <div
              aria-labelledby={isEnhanced ? getTabId(index) : undefined}
              className="site-broad-tabs__content"
              hidden={isEnhanced && !isActive}
              id={getPanelId(index)}
              key={`${item.title}-${index}`}
              role={isEnhanced ? "tabpanel" : undefined}
              tabIndex={isEnhanced ? 0 : undefined}
            >
              <h3 className="site-broad-tabs__fallback-title" hidden={isEnhanced}>
                {item.title}
              </h3>
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
