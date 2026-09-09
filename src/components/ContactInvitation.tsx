import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { enquiryEmail } from "../data/enquiry";
import { publicRoutePaths } from "../data/routes";
import Container from "./Container";

const contactHref = publicRoutePaths.contact;
const consultHref = `${contactHref}#contact-start`;
const detailsHref = `${contactHref}#contact-details`;

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
          <p className="contact-invitation__eyebrow">Taking the first step</p>

          <h2 id="contact-invitation-heading">
            <span>Let’s start with</span>
            <em>a conversation.</em>
          </h2>

          <p className="contact-invitation__copy site-reading">
            I offer a free 15-minute consult so you can speak with me before
            deciding whether to book. We can talk briefly about what brings you
            here, and you can ask questions about how I work.
          </p>

          <Link className="contact-invitation__action" to={consultHref}>
            <span>Request a free consult</span>
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>

          <p className="contact-invitation__email">
            Prefer to write first?{" "}
            <a href={`mailto:${enquiryEmail}`}>Send me an email.</a>
          </p>
        </div>

        <div className="contact-invitation__details">
          <p className="contact-invitation__eyebrow">
            Online sessions <span aria-hidden="true">·</span> Adults across Australia
          </p>

          <dl className="contact-invitation__fees">
            <div>
              <dt>
                <strong>Individual counselling</strong>
                <span>50-minute session</span>
              </dt>
              <dd>$120</dd>
            </div>
            <div>
              <dt>
                <strong>Couples counselling</strong>
                <span>50-minute session</span>
              </dt>
              <dd>$150</dd>
            </div>
          </dl>

          <p className="contact-invitation__note site-reading">
            You can come with a specific concern or simply a sense that
            something needs attention. A few lines about what you are looking
            for is enough to make an enquiry.
          </p>

          <Link className="contact-invitation__details-link" to={detailsHref}>
            <span>Contact and session details</span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
