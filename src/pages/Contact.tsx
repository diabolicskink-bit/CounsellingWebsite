import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactEnquiryForm from "../components/ContactEnquiryForm";
import Container from "../components/Container";
import { enquiryEmail } from "../data/enquiry";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { getActiveAustralianPerthBusinessHoursNotes } from "../utils/timeZones";
import "../styles-contact.css";

type ContactPageProps = {
  initialRenderAt: string;
};

const contactMetadata = getRouteMetadata(publicRoutePaths.contact);
const crisisSupportHref = publicRoutePaths.crisisSupport;

function BusinessHoursTimeZoneNotes({ initialRenderAt }: ContactPageProps) {
  const [comparison, setComparison] = useState(() => ({
    notes: getActiveAustralianPerthBusinessHoursNotes(new Date(initialRenderAt)),
    source: "prerendered" as "current" | "prerendered",
  }));

  useEffect(() => {
    const currentNotes = getActiveAustralianPerthBusinessHoursNotes();

    setComparison((existingComparison) => {
      const notesAreCurrent =
        existingComparison.notes.length === currentNotes.length &&
        existingComparison.notes.every((note, index) => note === currentNotes[index]);

      return notesAreCurrent
        ? existingComparison
        : { notes: currentNotes, source: "current" };
    });
  }, [initialRenderAt]);

  return (
    <span
      className="contact-page__time-zone-notes"
      data-timezone-notes-source={comparison.source}
    >
      {comparison.notes.map((note) => (
        <small key={note}>{note}</small>
      ))}
    </span>
  );
}

export default function Contact({ initialRenderAt }: ContactPageProps) {
  useDocumentMetadata(contactMetadata.title, contactMetadata.description);

  return (
    <main className="site-page contact-page">
      <section
        aria-labelledby="contact-title"
        className="contact-page__hero site-hero-background"
      >
        <Container>
          <header className="contact-page__hero-content">
            <span className="contact-page__eyebrow">Contact and fees</span>
            <h1 className="contact-page__hero-title" id="contact-title">
              Make an enquiry.
            </h1>
          </header>
        </Container>
      </section>

      <section
        className="contact-page__enquiry site-section-warm"
        id="contact-start"
        tabIndex={-1}
      >
        <Container className="contact-page__enquiry-layout">
          <aside
            aria-labelledby="contact-enquiry-intro-title"
            className="contact-page__enquiry-intro"
          >
            <h2 id="contact-enquiry-intro-title">
              Choosing a counsellor can be hard.
            </h2>
            <p className="site-reading">
              I offer a free 15-minute consult so you can speak with me before
              deciding whether to book. If you would rather start with a
              question, you can send one through the form or{" "}
              <a href={`mailto:${enquiryEmail}`}>by email</a>.
            </p>
          </aside>

          <ContactEnquiryForm />
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

      <section
        aria-label="Contact details"
        className="contact-page__practice-details"
        id="contact-details"
      >
        <Container>
          <header className="contact-page__practice-heading">
            <span className="contact-page__eyebrow">Practical details</span>
          </header>

          <dl className="contact-page__practice-list">
            <div>
              <dt>Practice hours</dt>
              <dd>
                <span>Mon to Fri, 9.30am to 5.00pm AWST.</span>
                <BusinessHoursTimeZoneNotes initialRenderAt={initialRenderAt} />
              </dd>
            </div>
            <div
              className="contact-page__crisis-support"
              id="contact-crisis-support"
            >
              <dt>Crisis support</dt>
              <dd>
                <p className="site-reading">
                  Vive Counselling is not an emergency service. Call 000 if you or
                  someone else is in immediate danger. If you’re in crisis,{" "}
                  <Link to={crisisSupportHref}>find support now</Link>.
                </p>
              </dd>
            </div>
          </dl>
        </Container>
      </section>
    </main>
  );
}
