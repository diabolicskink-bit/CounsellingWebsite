import type { ReactNode } from "react";
import Container from "./Container";

type PageHeroProps = {
  title: string;
  copy: string;
  aside?: ReactNode;
};

export default function PageHero({ title, copy, aside }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Container className="page-hero__grid">
        <div className="page-hero__content">
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
        {aside ? <div className="page-hero__aside">{aside}</div> : null}
      </Container>
    </section>
  );
}
