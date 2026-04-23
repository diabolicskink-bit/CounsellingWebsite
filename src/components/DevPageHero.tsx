import type { ReactNode } from "react";
import "../styles-dev.css";
import Container from "./Container";

type Props = {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
};

export default function DevPageHero({ badge, title, description, children }: Props) {
  return (
    <section className="hero-section hero-bg--default">
      <Container>
        <div className="hero-top">
          <div>
            <span className="hero-badge">{badge}</span>
            <h1 className="hero-display">{title}</h1>
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
