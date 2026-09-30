import { useEffect, useState } from "react";
import Container from "../../components/Container";
import { businessHours, enquiryEmail, enquiryPhone } from "../../data/enquiry";
import { getRouteMetadata } from "../../data/routeMetadata";
import { publicRoutePaths } from "../../data/routes";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import { trackPhoneLinkClicked } from "../../tracking/analytics";
import { recordVisitEvent } from "../../tracking/visitEvents";
import { getBusinessHoursByTimeZone, type BusinessHoursInTimeZone } from "../../utils/timeZones";
import EnquiryForm from "./EnquiryForm";
import "./contact.css";

type ContactPageProps = {
  initialRenderAt: string;
};

const contactMetadata = getRouteMetadata(publicRoutePaths.contact);

function haveSameHours(first: readonly BusinessHoursInTimeZone[], second: readonly BusinessHoursInTimeZone[]) {
  return first.length === second.length &&
    first.every((row, index) => (
      row.abbreviation === second[index].abbreviation && row.hours === second[index].hours
    ));
}

function BusinessHoursTable({ initialRenderAt }: ContactPageProps) {
  const [hoursTable, setHoursTable] = useState(() => ({
    rows: getBusinessHoursByTimeZone(new Date(initialRenderAt)),
    source: "prerendered" as "current" | "prerendered",
  }));

  useEffect(() => {
    const currentRows = getBusinessHoursByTimeZone();

    setHoursTable((existingTable) => (
      haveSameHours(existingTable.rows, currentRows)
        ? existingTable
        : { rows: currentRows, source: "current" }
    ));
  }, [initialRenderAt]);

  return (
    <table
      className="contact-page__business-hours"
      data-timezone-notes-source={hoursTable.source}
    >
      <caption>{businessHours.days}</caption>
      <tbody>
        {hoursTable.rows.map(({ abbreviation, hours }) => (
          <tr key={abbreviation}>
            <th scope="row">{abbreviation}</th>
            <td>{hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Contact({ initialRenderAt }: ContactPageProps) {
  useDocumentMetadata(contactMetadata.title, contactMetadata.description);

  return (
    <main className="site-page contact-page">
      <section className="site-hero contact-page__hero site-hero-surface" aria-labelledby="contact-title">
        <Container>
          <header>
            <span className="site-hero__eyebrow">Contact and fees</span>
            <h1 className="site-hero__statement" id="contact-title">
              Make an enquiry.
            </h1>
          </header>
        </Container>
      </section>

      <section
        aria-labelledby="contact-enquiry-intro-title"
        className="contact-page__enquiry site-section-warm"
        id="contact-start"
        tabIndex={-1}
      >
        <Container className="contact-page__enquiry-layout">
          <header className="contact-page__enquiry-intro">
            <h2 id="contact-enquiry-intro-title">
              Get in touch
            </h2>
            <p className="site-reading">
              Send me a message to ask a question or arrange a session.
            </p>
            <p className="site-reading">
              If you’d like to talk first, I offer a free 15-minute consultation
              so you can tell me a little about what you’d like help with and see
              how you feel talking with me. There’s no obligation to book a
              session afterwards.
            </p>

            <address
              aria-label="Contact Joel directly"
              className="contact-page__direct-contact"
            >
              <div className="contact-page__direct-contact-option">
                <span className="contact-page__direct-contact-label">Email</span>
                <a
                  className="contact-page__direct-contact-link"
                  href={`mailto:${enquiryEmail}`}
                >
                  {enquiryEmail}
                </a>
              </div>
              <div className="contact-page__direct-contact-option">
                <span className="contact-page__direct-contact-label">Phone</span>
                <a
                  className="contact-page__direct-contact-link"
                  href={enquiryPhone.href}
                  onClick={() => {
                    trackPhoneLinkClicked();
                    recordVisitEvent("phone_link_clicked", {});
                  }}
                >
                  {enquiryPhone.label}
                </a>
              </div>
              <div className="contact-page__direct-contact-option contact-page__direct-contact-option--hours">
                <span className="contact-page__direct-contact-label">Hours</span>
                <div className="contact-page__direct-contact-hours">
                  <BusinessHoursTable initialRenderAt={initialRenderAt} />
                </div>
              </div>
            </address>
          </header>

          <EnquiryForm initialRenderAt={initialRenderAt} />
        </Container>
      </section>

      <section
        aria-labelledby="contact-fees-title"
        className="contact-page__fees"
        id="contact-fees"
        tabIndex={-1}
      >
        <Container>
          <h2 className="contact-page__sr-only" id="contact-fees-title">
            Fees and session details
          </h2>
          <dl className="contact-page__fee-list">
            <div>
              <dt>Initial consult</dt>
              <dd>
                <strong>Free</strong>
                <span>15 minutes</span>
              </dd>
            </div>
            <div>
              <dt>Individual</dt>
              <dd>
                <strong>$120</strong>
                <span>50 minutes</span>
              </dd>
            </div>
            <div>
              <dt>Couples</dt>
              <dd>
                <strong>$150</strong>
                <span>50 minutes</span>
              </dd>
            </div>
            <div>
              <dt>More than two?</dt>
              <dd>
                <a className="contact-page__fee-action" href="#contact-start">
                  Get in touch
                </a>
              </dd>
            </div>
          </dl>
        </Container>
      </section>

    </main>
  );
}
