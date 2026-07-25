import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import { enquiryEmail, enquiryFormContent } from "../../../data/enquiry";
import {
  australianStateOptions,
  bookingTypes,
  enquiryTypes,
} from "../../../data/enquiryContract";
import { getRouteMetadata } from "../../../data/routeMetadata";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";
import {
  trackEnquiryStarted,
  trackSuccessfulEnquirySubmission,
} from "../../../utils/analytics";
import { getActiveAustralianTimeZoneOptions } from "../../../utils/timeZones";
import "../../../styles-codex-tb.css";

type ContactPath = "appointment" | "consult" | "question";
type SubmitStatus = "idle" | "sending" | "success" | "error";

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

const contactMetadata = getRouteMetadata("/contact");

function getFormText(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

function buildEnquiryPayload(formData: FormData) {
  return {
    availability: getFormText(formData, "availability"),
    bookingType: getFormText(formData, "bookingType"),
    email: getFormText(formData, "email"),
    enquiryType: getFormText(formData, "enquiryType"),
    message: getFormText(formData, "message"),
    name: getFormText(formData, "name"),
    state: getFormText(formData, "state"),
    timing: getFormText(formData, "timing"),
    timeZone: getFormText(formData, "timeZone"),
    website: getFormText(formData, "website"),
  };
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="codex-contact__sr-only"> (required)</span>
    </>
  );
}

function SubmissionSuccess() {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <div
      className="codex-contact__submission-success"
      ref={statusRef}
      role="status"
      tabIndex={-1}
    >
      <span className="codex-contact__step-label">Enquiry sent</span>
      <h2>{enquiryFormContent.success.title}</h2>
      <p>{enquiryFormContent.success.message}</p>
      <p>{enquiryFormContent.success.note}</p>
    </div>
  );
}

function ContactEnquiryForm() {
  const [contactPath, setContactPath] = useState<ContactPath | "">("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const enquiryStartTrackedRef = useRef(false);
  const timeZoneOptions = getActiveAustralianTimeZoneOptions();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    setSubmitStatus("sending");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildEnquiryPayload(new FormData(formElement))),
      });

      if (!response.ok) {
        throw new Error("Enquiry submission failed.");
      }

      trackSuccessfulEnquirySubmission("contact");
      formElement.reset();
      setContactPath("");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleFormInput = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target;

    if (
      enquiryStartTrackedRef.current ||
      (target instanceof HTMLInputElement && target.name === "website")
    ) {
      return;
    }

    enquiryStartTrackedRef.current = true;
    trackEnquiryStarted();
  };

  const handlePathChange = (value: ContactPath) => {
    setContactPath(value);
    setSubmitStatus("idle");
  };

  if (submitStatus === "success") {
    return <SubmissionSuccess />;
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
      action="/api/enquiry"
      aria-labelledby="codex-contact-form-heading"
      className="codex-contact__form"
      data-clarity-mask="true"
      method="post"
      onInputCapture={handleFormInput}
      onSubmit={handleSubmit}
    >
      <input
        aria-hidden="true"
        autoComplete="off"
        className="site-form__honeypot"
        name="website"
        tabIndex={-1}
      />

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
            <Button disabled={submitStatus === "sending"} type="submit">
              {submitStatus === "sending" ? "Sending..." : submitLabel}
            </Button>
          </div>

          {submitStatus === "error" ? (
            <div className="codex-contact__submission-error" role="alert">
              <p>
                Sorry, the enquiry could not be sent. Please email{" "}
                <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a> directly.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

export default function CodexTB() {
  useDocumentMetadata(contactMetadata.title, contactMetadata.description);

  return (
    <main className="site-page codex-tb-page codex-contact">
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

          <ContactEnquiryForm />
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
