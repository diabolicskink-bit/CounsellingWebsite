import { ArrowRight } from "lucide-react";
import { publicRoutePaths } from "../data/routes";
import Button from "./Button";
import Container from "./Container";

const contactHref = publicRoutePaths.contact;

/**
 * Canonical closing invitation for public pages that lead naturally into the
 * contact journey. Consumers own placement only; the component owns its copy,
 * destination, accessible heading relationship, and responsive presentation.
 */
export default function ContactInvitation() {
  return (
    <section
      className="contact-invitation site-section-warm"
      aria-labelledby="contact-invitation-heading"
    >
      <Container className="contact-invitation__inner">
        <div className="contact-invitation__heading">
          <h2 id="contact-invitation-heading">
            Get in <em className="site-emphasis">touch</em>.
          </h2>
        </div>

        <div className="contact-invitation__content">
          <p className="contact-invitation__copy site-reading">
            Make an appointment if you’re ready, or request a free 15-minute consult if you’d rather speak first. You
            can also send me a message with any questions. I’m happy to answer them.
          </p>
          <Button className="contact-invitation__action" href={contactHref}>
            <span>See contact options</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
