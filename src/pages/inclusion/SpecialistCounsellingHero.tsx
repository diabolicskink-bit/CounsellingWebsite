import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { publicRoutePaths } from "../../data/routes";
import "./specialist-counselling-hero.css";

type SpecialistCounsellingHeroProps = {
  eyebrow: string;
  title: ReactNode;
};

// Opening for the specialist pages beneath Inclusion; each page supplies its own wording.
export default function SpecialistCounsellingHero({ eyebrow, title }: SpecialistCounsellingHeroProps) {
  return (
    <section className="site-hero site-hero-surface specialist-counselling-hero">
      <Container>
        <div className="specialist-counselling-hero__copy">
          <h1 className="site-hero__eyebrow">{eyebrow}</h1>
          <p className="site-hero__statement">{title}</p>

          <nav className="specialist-counselling-hero__actions" aria-label="Page actions">
            <Link className="specialist-counselling-hero__action" to={publicRoutePaths.contact}>
              <span>Make an enquiry</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="specialist-counselling-hero__action" to={publicRoutePaths.inclusion}>
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Back to inclusive counselling</span>
            </Link>
          </nav>
        </div>
      </Container>
    </section>
  );
}
