import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import { enquiryEmail } from "../../../data/enquiry";
import {
  australianStateOptions,
  bookingTypes,
  enquiryTypes,
} from "../../../data/enquiryContract";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";
import { getActiveAustralianTimeZoneOptions } from "../../../utils/timeZones";
import "../../../styles-codex-tb.css";

type ContactPath = "appointment" | "consult" | "question";
type PrototypeStatus = "editing" | "complete";

type ContactPathOption = {
  id: ContactPath;
  marker: string;
  title: string;
  detail: string;
};

const contactPathOptions: readonly ContactPathOption[] = [
  {
    id: "appointment",
    marker: "01",
    title: "Arrange a counselling session",
    detail: "$120 · 50 minutes",
  },
  {
    id: "consult",
    marker: "02",
    title: "Request the free 15-minute consult",
    detail: "Free · 15 minutes",
  },
  {
    id: "question",
    marker: "03",
    title: "Ask a question",
    detail: "Fees, availability or something else you need to check",
  },
] as const;

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="codex-contact__sr-only"> (required)</span>
    </>
  );
}

function PrototypeSuccess({ onReset }: { onReset: () => void }) {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <div
      className="codex-contact__prototype-success"
      ref={statusRef}
      role="status"
      tabIndex={-1}
    >
      <span className="codex-contact__step-label">Prototype complete</span>
      <h2>That is the full enquiry path.</h2>
      <p>No enquiry was sent from this test-bed page.</p>
      <Button onClick={onReset} variant="secondary">
        Try another option
      </Button>
    </div>
  );
}

function ContactCandidateForm() {
  const [contactPath, setContactPath] = useState<ContactPath | "">("");
  const [prototypeStatus, setPrototypeStatus] = useState<PrototypeStatus>("editing");
  const timeZoneOptions = getActiveAustralianTimeZoneOptions();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrototypeStatus("complete");
  };

  const handlePathChange = (value: ContactPath) => {
    setContactPath(value);
    setPrototypeStatus("editing");
  };

  if (prototypeStatus === "complete") {
    return (
      <PrototypeSuccess
        onReset={() => {
          setContactPath("");
          setPrototypeStatus("editing");
        }}
      />
    );
  }

  const isAppointment = contactPath === "appointment";
  const isConsult = contactPath === "consult";
  const isQuestion = contactPath === "question";
  const enquiryType = isQuestion ? enquiryTypes.general.value : enquiryTypes.booking.value;
  const bookingType = isAppointment
    ? bookingTypes.appointment.value
    : isConsult
      ? bookingTypes.consult.value
      : "";

  const submitLabel = isAppointment
    ? "Send session enquiry"
    : isConsult
      ? "Request the 15-minute consult"
      : "Send question";

  return (
    <form
      aria-labelledby="codex-contact-form-heading"
      className="codex-contact__form"
      data-prototype-form="true"
      onSubmit={handleSubmit}
    >
      <header className="codex-contact__form-heading">
        <span className="codex-contact__step-label">Start here</span>
        <h2 id="codex-contact-form-heading">What would you like to do?</h2>
        <p>
          Choose one option. The form will change to match it, and you can keep
          the first message brief.
        </p>
      </header>

      <fieldset className="codex-contact__path-fieldset">
        <legend className="codex-contact__sr-only">Choose an enquiry type</legend>
        <div className="codex-contact__path-list">
          {contactPathOptions.map((option) => (
            <label className="codex-contact__path-choice" key={option.id}>
              <span aria-hidden="true" className="codex-contact__path-marker">
                {option.marker}
              </span>
              <span className="codex-contact__path-copy">
                <strong>{option.title}</strong>
                <small>{option.detail}</small>
              </span>
              <input
                checked={contactPath === option.id}
                name="contactPath"
                onChange={() => handlePathChange(option.id)}
                required
                type="radio"
                value={option.id}
              />
            </label>
          ))}
        </div>
      </fieldset>

      {contactPath ? (
        <div className="codex-contact__details">
          <div className="codex-contact__details-heading">
            <span aria-hidden="true" className="codex-contact__details-marker">
              04
            </span>
            <div>
              <h3>Your details</h3>
              <p>
                Fields marked * are required. Share only what is useful for this
                enquiry.
              </p>
            </div>
          </div>

          <input name="enquiryType" type="hidden" value={enquiryType} />
          {bookingType ? <input name="bookingType" type="hidden" value={bookingType} /> : null}

          <div className="codex-contact__field-grid">
            <div className="codex-contact__field">
              <label htmlFor="codex-contact-name">
                Name
                <RequiredMark />
              </label>
              <input
                autoComplete="name"
                id="codex-contact-name"
                name="name"
                placeholder="Your name"
                required
                type="text"
              />
            </div>

            <div className="codex-contact__field">
              <label htmlFor="codex-contact-email">
                Email
                <RequiredMark />
              </label>
              <input
                autoComplete="email"
                id="codex-contact-email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>

            {isAppointment ? (
              <>
                <div className="codex-contact__field" key="appointment-timing">
                  <label htmlFor="codex-contact-timing">
                    Preferred timing
                    <RequiredMark />
                  </label>
                  <input
                    id="codex-contact-timing"
                    name="timing"
                    placeholder="For example: weekday afternoons"
                    required
                    type="text"
                  />
                </div>

                <div className="codex-contact__field" key="appointment-state">
                  <label htmlFor="codex-contact-state">
                    State or territory
                    <RequiredMark />
                  </label>
                  <select defaultValue="" id="codex-contact-state" name="state" required>
                    <option value="">Select your state or territory</option>
                    {australianStateOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : null}

            {isConsult ? (
              <>
                <div className="codex-contact__field" key="consult-availability">
                  <label htmlFor="codex-contact-availability">
                    Availability
                    <RequiredMark />
                  </label>
                  <input
                    id="codex-contact-availability"
                    name="availability"
                    placeholder="For example: Tuesday after 3pm"
                    required
                    type="text"
                  />
                </div>

                <div className="codex-contact__field" key="consult-timezone">
                  <label htmlFor="codex-contact-timezone">
                    Timezone
                    <RequiredMark />
                  </label>
                  <select defaultValue="" id="codex-contact-timezone" name="timeZone" required>
                    {timeZoneOptions.map((option) => (
                      <option key={option.value || "default"} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : null}

            <div className="codex-contact__field codex-contact__field--message" key="message">
              <label htmlFor="codex-contact-message">
                {isQuestion ? "Your question" : "Your message"}
                <RequiredMark />
              </label>
              <textarea
                aria-describedby="codex-contact-message-help"
                id="codex-contact-message"
                name="message"
                required
                rows={4}
              />
              <small id="codex-contact-message-help">
                A sentence or two is enough. You do not need to explain everything here.
              </small>
            </div>
          </div>

          <div className="codex-contact__submit-row">
            <Button type="submit">{submitLabel}</Button>
            <p>This prototype will not send an enquiry.</p>
          </div>
        </div>
      ) : null}
    </form>
  );
}

export default function CodexTB() {
  useDocumentMetadata(
    "Contact candidate | Codex TB | Vive Counselling",
    "Mobile-first Contact and fees page candidate for Vive Counselling.",
  );

  return (
    <main className="site-page codex-tb-page codex-contact">
      <div className="codex-contact__prototype-bar">
        <Container>
          <strong>Codex TB</strong>
          <span>Contact page candidate · form submissions stay in the browser</span>
        </Container>
      </div>

      <section className="codex-contact__opening" aria-labelledby="codex-contact-title">
        <Container className="codex-contact__opening-grid">
          <header className="codex-contact__intro">
            <span className="codex-contact__eyebrow">Contact and fees</span>
            <h1 id="codex-contact-title">Make an enquiry.</h1>
            <p className="codex-contact__lede">
              Start with the practical part: choose a counselling session, the
              15-minute consult, or a question.
            </p>
            <p className="codex-contact__email-route">
              Prefer email?{" "}
              <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
            </p>
          </header>

          <aside className="codex-contact__fee-ledger" aria-label="Fees and service details">
            <div className="codex-contact__fee">
              <span>Standard session</span>
              <strong>$120</strong>
              <small>50 minutes</small>
            </div>
            <dl className="codex-contact__facts">
              <div>
                <dt>Initial consult</dt>
                <dd>Free · 15 minutes</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Online across Australia</dd>
              </div>
              <div>
                <dt>Referral</dt>
                <dd>Not required</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </section>

      <section className="codex-contact__task-section" id="codex-contact-start">
        <Container className="codex-contact__task-grid">
          <aside className="codex-contact__sequence" aria-label="Enquiry steps">
            <span className="codex-contact__step-label">One short form</span>
            <ol>
              <li>
                <span>01–03</span>
                Choose a session, consult or question
              </li>
              <li>
                <span>04</span>
                Add the details for that option
              </li>
              <li>
                <span>05</span>
                Send the enquiry
              </li>
            </ol>
            <p>
              I will respond as soon as I can. There may be a delay while I am
              in client sessions.
            </p>
          </aside>

          <ContactCandidateForm />
        </Container>
      </section>

      <section className="codex-contact__practical" aria-labelledby="codex-contact-practical-title">
        <Container>
          <header className="codex-contact__practical-heading">
            <span className="codex-contact__eyebrow">Practical details</span>
            <h2 id="codex-contact-practical-title">Cancellations and urgent support.</h2>
          </header>

          <dl className="codex-contact__practical-list">
            <div>
              <dt>Cancellations</dt>
              <dd>
                Less than 48 hours’ notice: the full fee is payable, except in
                cases of illness.
              </dd>
            </div>
            <div>
              <dt>Urgent support</dt>
              <dd>
                Vive Counselling is not an emergency service. If you are in
                immediate danger, call 000. For crisis support, call Lifeline on
                13 11 14 or Suicide Call Back Service on 1300 659 467.
              </dd>
            </div>
          </dl>
        </Container>
      </section>
    </main>
  );
}
