import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { enquiryEmail } from "../data/enquiry";
import { publicRoutePaths } from "../data/routes";
import Container from "./Container";

const contactStartHref = `${publicRoutePaths.contact}#contact-start`;

/**
 * Canonical closing invitation for public pages that lead naturally into the
 * contact journey. Consumers own placement only; the component owns its copy,
 * destinations, accessible heading relationship, and responsive presentation.
 */
export default function ContactInvitation() {
  return (
    <section
      className="contact-invitation"
      aria-labelledby="contact-invitation-heading"
    >
      <Container className="contact-invitation__inner">
        <div className="contact-invitation__primary">
          <h2
            className="contact-invitation__heading"
            id="contact-invitation-heading"
          >
            <span>Let’s start with</span>
            <em>a conversation.</em>
          </h2>

          <p className="contact-invitation__copy site-reading">
            I offer a free 15-minute consult so you can speak with me before
            deciding whether to book. We can talk briefly about what brings you
            here, and you can ask questions about how I work.
          </p>
        </div>

        <div className="contact-invitation__details">
          <h3
            className="contact-invitation__fees-heading"
            id="contact-invitation-fees-heading"
          >
            Online session fees
          </h3>

          <dl
            className="contact-invitation__fees"
            aria-labelledby="contact-invitation-fees-heading"
          >
            <div>
              <dt>Individual counselling</dt>
              <dd>$120</dd>
            </div>
            <div>
              <dt>Couples counselling</dt>
              <dd>$150</dd>
            </div>
          </dl>

          <p className="contact-invitation__fees-note">
            For relationship counselling involving more than two people,
            please <Link to={contactStartHref}>send an enquiry</Link>.
          </p>
        </div>

        <div className="contact-invitation__actions">
          <Link className="contact-invitation__action" to={contactStartHref}>
            <span>Request a free consult</span>
            <ArrowRight
              aria-hidden="true"
              className="contact-invitation__action-icon"
              size={18}
            />
          </Link>

          <p className="contact-invitation__alternative">
            <span>Have a question first?</span>{" "}
            <Link to={contactStartHref}>Send a general enquiry</Link> or{" "}
            <a href={`mailto:${enquiryEmail}`}>email me</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
