import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
    <section className={`site-hero site-hero-surface specialist-counselling-hero ${className}`}>
      <Container>
        <div className="specialist-counselling-hero__copy">
          <h1 className="site-hero__eyebrow">{eyebrow}</h1>
          <p className="site-hero__statement">{title}</p>

          <nav className="specialist-counselling-hero__actions" aria-label="Page actions">
            <Link className="specialist-counselling-hero__action" to={primaryAction.href}>
              <span>{primaryAction.label}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="specialist-counselling-hero__action" to={secondaryAction.href}>
              <ArrowLeft size={18} aria-hidden="true" />
              <span>{secondaryAction.label}</span>
            </Link>
          </nav>
        </div>
      </Container>
    </section>
  );
}
