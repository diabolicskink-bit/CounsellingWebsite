import { useEffect, useState } from "react";
import ContactEnquiryForm from "../components/ContactEnquiryForm";
import Container from "../components/Container";
import { enquiryEmail } from "../data/enquiry";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { getActiveAustralianPerthBusinessHoursNotes } from "../utils/timeZones";
import "../styles-contact.css";

type ContactProps = {
  initialRenderAt: string;
};

const contactMetadata = getRouteMetadata("/contact");

function ContactTimeZoneNotes({ initialRenderAt }: ContactProps) {
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
      className="contact-page__contact-notes"
      data-timezone-notes-source={comparison.source}
    >
      {comparison.notes.map((note) => (
        <small key={note}>{note}</small>
      ))}
    </span>
  );
}

export default function Contact({ initialRenderAt }: ContactProps) {
  useDocumentMetadata(contactMetadata.title, contactMetadata.description);

  return (
    <main className="site-page contact-page codex-contact">
      <section className="codex-contact__opening site-hero-background" aria-labelledby="contact-title">
        <Container className="codex-contact__opening-grid">
          <header className="codex-contact__intro">
            <span className="codex-contact__eyebrow">Contact and fees</span>
            <h1 id="contact-title">Make an enquiry.</h1>
          </header>
        </Container>
      </section>

      <section className="codex-contact__task-section site-section-warm" id="contact-start" tabIndex={-1}>
        <Container className="codex-contact__task-grid">
          <aside
            aria-labelledby="contact-first-message-title"
            className="codex-contact__first-message"
          >
            <h2 id="contact-first-message-title">
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
        aria-labelledby="contact-essentials-title"
        className="codex-contact__essentials"
        id="contact-fees"
        tabIndex={-1}
      >
        <Container>
          <h2 className="codex-contact__sr-only" id="contact-essentials-title">
            Fees and session details
          </h2>
          <dl className="codex-contact__essentials-list">
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
                <a className="codex-contact__essential-action" href="#contact-start">
                  Get in touch
                </a>
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section
        aria-label="Contact details"
        className="codex-contact__practical"
        id="contact-practical"
      >
        <Container>
          <header className="codex-contact__practical-heading">
            <span className="codex-contact__eyebrow">Practical details</span>
          </header>

          <dl className="codex-contact__practical-list">
            <div>
              <dt>Practice hours</dt>
              <dd>
                <span>Mon to Fri, 9.30am to 5.00pm AWST.</span>
                <ContactTimeZoneNotes initialRenderAt={initialRenderAt} />
              </dd>
            </div>
            <div id="contact-crisis-support">
              <dt>Crisis support</dt>
              <dd>
                <p className="site-reading">
                  Vive Counselling is not an emergency service. If you are in
                  immediate danger, call 000. For crisis support, call Lifeline on
                  13 11 14 or Suicide Call Back Service on 1300 659 467.
                </p>
              </dd>
            </div>
          </dl>
        </Container>
      </section>
    </main>
  );
}
