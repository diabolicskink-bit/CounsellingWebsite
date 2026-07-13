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
            <h1 className="hero-badge">{badge}</h1>
            <p className="hero-display">{title}</p>
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
