import { useEffect, useId, useState, type ReactNode } from "react";
import Container from "./Container";

type FaqSectionItem = {
  question: string;
  answer: ReactNode;
};

type FaqSectionProps = {
  title?: string;
  intro?: string;
  items: FaqSectionItem[];
  defaultOpenIndex?: number | null;
  singleOpen?: boolean;
  className?: string;
};

function createInitialOpenIndexes(defaultOpenIndex: number | null | undefined, itemsLength: number) {
  if (defaultOpenIndex == null || defaultOpenIndex < 0 || defaultOpenIndex >= itemsLength) {
    return new Set<number>();
  }

  return new Set([defaultOpenIndex]);
}

export default function FaqSection({
  title,
  intro,
  items,
  defaultOpenIndex = null,
  singleOpen = true,
  className = "",
}: FaqSectionProps) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState(() => createInitialOpenIndexes(defaultOpenIndex, items.length));

  useEffect(() => {
    setOpenIndexes((current) => {
      const next = new Set(Array.from(current).filter((index) => index >= 0 && index < items.length));

      if (singleOpen && next.size > 1) {
        const [firstOpenIndex] = next;
        return new Set(firstOpenIndex === undefined ? [] : [firstOpenIndex]);
      }

      if (next.size === current.size && Array.from(next).every((index) => current.has(index))) {
        return current;
      }

      return next;
    });
  }, [items.length, singleOpen]);

  const handleToggle = (index: number) => {
    setOpenIndexes((current) => {
      const isOpen = current.has(index);

      if (singleOpen) {
        return isOpen ? new Set<number>() : new Set([index]);
      }

      const next = new Set(current);

      if (isOpen) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  const sectionClassName = ["site-faq-section", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName}>
      <Container>
        <div className="site-faq-shell">
          {title || intro ? (
            <div className="site-faq-shell__header">
              {title ? <h2 className="site-faq-shell__title">{title}</h2> : null}
              {intro ? <p className="site-faq-shell__intro">{intro}</p> : null}
            </div>
          ) : null}

          <div className="site-faq-list">
            {items.map((item, index) => {
              const isOpen = openIndexes.has(index);
              const questionId = `${baseId}-question-${index}`;
              const answerId = `${baseId}-answer-${index}`;
              const answerContent =
                typeof item.answer === "string" || typeof item.answer === "number" ? <p>{item.answer}</p> : item.answer;

              return (
                <article className="site-faq-item" data-open={isOpen ? "true" : "false"} key={item.question}>
                  <h3 className="site-faq-item__heading">
                    <button
                      aria-controls={answerId}
                      aria-expanded={isOpen}
                      className="site-faq-question"
                      id={questionId}
                      onClick={() => handleToggle(index)}
                      type="button"
                    >
                      <span className="site-faq-question__text">{item.question}</span>
                      <span className="site-faq-icon" aria-hidden="true" />
                    </button>
                  </h3>

                  <div
                    aria-hidden={!isOpen}
                    aria-labelledby={questionId}
                    className="site-faq-answer-region"
                    data-open={isOpen ? "true" : "false"}
                    id={answerId}
                    ref={(node) => {
                      if (node) {
                        node.inert = !isOpen;
                      }
                    }}
                    role="region"
                  >
                    <div className="site-faq-answer">
                      <div className="site-faq-answer__inner">{answerContent}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
