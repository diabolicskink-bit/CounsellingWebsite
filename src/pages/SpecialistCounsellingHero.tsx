import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import "../styles-specialist-counselling-hero.css";

type SpecialistHeroAction = {
  href: string;
  label: string;
};

type SpecialistCounsellingHeroProps = {
  className: string;
  eyebrow: string;
  title: ReactNode;
  primaryAction: SpecialistHeroAction;
  secondaryAction: SpecialistHeroAction;
};

export default function SpecialistCounsellingHero({
  className,
  eyebrow,
  title,
  primaryAction,
  secondaryAction,
}: SpecialistCounsellingHeroProps) {
  return (
    <section className={`hero-section site-hero-background specialist-counselling-hero ${className}`}>
      <Container>
        <div className="specialist-counselling-hero__copy">
          <h1 className="hero-badge">{eyebrow}</h1>
          <p className="hero-display">{title}</p>

          <nav className="specialist-counselling-hero__actions" aria-label="Page actions">
            <Button className="specialist-counselling-hero__action" href={primaryAction.href}>
              <span>{primaryAction.label}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              className="specialist-counselling-hero__action"
              href={secondaryAction.href}
              variant="secondary"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span>{secondaryAction.label}</span>
            </Button>
          </nav>
        </div>
      </Container>
    </section>
  );
}
