import { ArrowRight } from "lucide-react";
import Button from "./Button";
import Container from "./Container";

type CTASectionProps = {
  title?: string;
  copy?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CTASection({
  title = "A brief first message is enough to begin.",
  copy = "You do not need to summarise everything perfectly. A short note about what is bringing you to counselling and whether you are looking for online sessions is enough.",
  primaryHref = "/contact",
  primaryLabel = "Contact Vive Counselling",
  secondaryHref = "/fees",
  secondaryLabel = "View fees",
}: CTASectionProps) {
  return (
    <section className="section section--cta">
      <Container>
        <div className="cta-panel">
          <div>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
          <div className="cta-panel__actions">
            <Button href={primaryHref} variant="light">
              {primaryLabel} <ArrowRight size={17} />
            </Button>
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
