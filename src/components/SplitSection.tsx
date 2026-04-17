import type { ReactNode } from "react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

type SplitSectionProps = {
  title: string;
  copy?: string;
  children: ReactNode;
  className?: string;
};

export default function SplitSection({
  title,
  copy,
  children,
  className = "",
}: SplitSectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
      <Container className="split">
        <SectionHeading title={title} copy={copy} />
        <div className="rich-text">{children}</div>
      </Container>
    </section>
  );
}
