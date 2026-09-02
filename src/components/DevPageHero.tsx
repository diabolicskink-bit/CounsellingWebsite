import type { ReactNode } from "react";
import Container from "./Container";

type Props = {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
};

export default function DevPageHero({ badge, title, description, children }: Props) {
  return (
    <section className="site-hero site-hero-surface">
      <Container>
        <div className="hero-top">
          <div>
            <h1 className="site-hero__eyebrow">{badge}</h1>
            <p className="site-hero__statement">{title}</p>
          </div>
          <div className="hero-copy-panel">
            <p>{description}</p>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
