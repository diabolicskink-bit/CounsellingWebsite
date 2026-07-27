import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import { enquiryEmail, enquiryFormContent } from "../data/enquiry";
import {
  australianStateOptions,
  bookingTypes,
  enquiryTypes,
} from "../data/enquiryContract";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  trackEnquiryStarted,
  trackSuccessfulEnquirySubmission,
} from "../utils/analytics";
import {
  getActiveAustralianPerthBusinessHoursNotes,
  getActiveAustralianTimeZoneOptions,
} from "../utils/timeZones";
import "../styles-contact.css";

type ContactPath = "appointment" | "consult" | "question";
type SubmitStatus = "idle" | "sending" | "success" | "error";

type ContactPathOption = {
  id: ContactPath;
  title: string;
};

type ContactProps = {
  initialRenderAt: string;
};

const contactPathOptions: readonly ContactPathOption[] = [
  {
    id: "appointment",
    title: "Make an appointment",
  },
  {
    id: "consult",
    title: "Request a consult",
  },
  {
    id: "question",
    title: "General enquiry",
  },
] as const;

const contactMetadata = getRouteMetadata("/contact");

function isContactPath(value: FormDataEntryValue | null): value is ContactPath {
  return (
    typeof value === "string" &&
    contactPathOptions.some((option) => option.id === value)
  );
}

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

function SubmissionSuccess() {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <section className="site-form site-form--complete codex-contact__submission-success">
      <div
        className="codex-contact__submission-status"
        ref={statusRef}
        role="status"
        tabIndex={-1}
      >
        <span className="codex-contact__step-label">Enquiry sent</span>
        <h2>{enquiryFormContent.success.title}</h2>
        <p>{enquiryFormContent.success.message}</p>
        <p>{enquiryFormContent.success.note}</p>
      </div>
    </section>
  );
}

function ContactEnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const enquiryStartTrackedRef = useRef(false);
  const [contactPath, setContactPath] = useState<ContactPath | "">("");
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [preserveInitialDetails, setPreserveInitialDetails] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const timeZoneOptions = getActiveAustralianTimeZoneOptions();

  useEffect(() => {
    const formElement = formRef.current;

    if (formElement) {
      const formData = new FormData(formElement);
      const selectedPath = formData.get("contactPath");
      const hasEnteredDetails = ["name", "email", "message"].some(
        (fieldName) => getFormText(formData, fieldName).length > 0,
      );

      if (isContactPath(selectedPath)) {
        setContactPath(selectedPath);
      }

      setPreserveInitialDetails(hasEnteredDetails);
    }

    setIsEnhanced(true);
  }, []);

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
      setPreserveInitialDetails(false);
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
    setPreserveInitialDetails(false);
    setSubmitStatus("idle");
  };

  if (submitStatus === "success") {
    return <SubmissionSuccess />;
  }

  const isAppointment = contactPath === "appointment";
  const isConsult = contactPath === "consult";
  const isQuestion = contactPath === "question";
  const showDetails = Boolean(contactPath) || !isEnhanced || preserveInitialDetails;
  const showAppointmentFields = isAppointment || !isEnhanced;
  const showConsultFields = isConsult || !isEnhanced;
  const enquiryType = isQuestion
    ? enquiryTypes.general.value
    : contactPath
      ? enquiryTypes.booking.value
      : "";
  const bookingType = isAppointment
    ? bookingTypes.appointment.value
    : isConsult
      ? bookingTypes.consult.value
      : "";
  const submitLabel = isAppointment
    ? "Send session enquiry"
    : isConsult
      ? "Request the 15-minute consult"
      : "Send enquiry";

  return (
    <form
      action="/api/enquiry"
      aria-label="Enquiry"
      className="site-form codex-contact__form"
      data-clarity-mask="true"
      method="post"
      onInputCapture={handleFormInput}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <input
        aria-hidden="true"
        autoComplete="off"
        className="site-form__honeypot"
        name="website"
        tabIndex={-1}
      />

      <header className="codex-contact__form-heading">
        <span className="codex-contact__step-label">Your enquiry</span>
        <h2>Get in touch</h2>
      </header>

      <fieldset className="codex-contact__path-fieldset">
        <legend className="codex-contact__sr-only">Choose an enquiry type</legend>
        <div className="codex-contact__path-list">
          {contactPathOptions.map((option) => (
            <label className="codex-contact__path-choice" key={option.id}>
              <span className="codex-contact__path-copy">
                <strong>{option.title}</strong>
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

      {showDetails ? (
        <div className="codex-contact__details">
          <div className="codex-contact__details-heading">
            <h3>A few details</h3>
            <p>Fields marked * are required.</p>
          </div>

          <input name="enquiryType" type="hidden" value={enquiryType} />
          {bookingType ? (
            <input name="bookingType" type="hidden" value={bookingType} />
          ) : null}

          <div className="codex-contact__field-grid">
            <div className="codex-contact__field">
              <label htmlFor="contact-name">
                Name
                <RequiredMark />
              </label>
              <input
                autoComplete="name"
                id="contact-name"
                name="name"
                placeholder="Your name"
                required={Boolean(contactPath)}
                type="text"
              />
            </div>

            <div className="codex-contact__field">
              <label htmlFor="contact-email">
                Email
                <RequiredMark />
              </label>
              <input
                autoComplete="email"
                id="contact-email"
                name="email"
                placeholder="you@example.com"
                required={Boolean(contactPath)}
                type="email"
              />
            </div>

            {showAppointmentFields ? (
              <>
                <div className="codex-contact__field" key="appointment-timing">
                  <label htmlFor="contact-timing">
                    Preferred timing
                    <RequiredMark />
                  </label>
                  <input
                    id="contact-timing"
                    name="timing"
                    placeholder="For example: weekday afternoons"
                    required={isAppointment}
                    type="text"
                  />
                </div>

                <div className="codex-contact__field" key="appointment-state">
                  <label htmlFor="contact-state">
                    State or territory
                    <RequiredMark />
                  </label>
                  <select
                    defaultValue=""
                    id="contact-state"
                    name="state"
                    required={isAppointment}
                  >
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

            {showConsultFields ? (
              <>
                <div className="codex-contact__field" key="consult-availability">
                  <label htmlFor="contact-availability">
                    Availability
                    <RequiredMark />
                  </label>
                  <input
                    id="contact-availability"
                    name="availability"
                    placeholder="For example: Tuesday after 3pm"
                    required={isConsult}
                    type="text"
                  />
                </div>

                <div className="codex-contact__field" key="consult-timezone">
                  <label htmlFor="contact-timezone">
                    Timezone
                    <RequiredMark />
                  </label>
                  <select
                    defaultValue=""
                    id="contact-timezone"
                    name="timeZone"
                    required={isConsult}
                  >
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
              <label htmlFor="contact-message">
                {isQuestion ? "Your enquiry" : "Your message"}
                <RequiredMark />
              </label>
              <textarea
                id="contact-message"
                name="message"
                required={Boolean(contactPath)}
                rows={4}
              />
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

      <p className="codex-contact__form-boundary">
        This form is not monitored for urgent support.{" "}
        <a href="#contact-urgent-support">Urgent support information</a> is below.
      </p>
    </form>
  );
}

export default function Contact({ initialRenderAt }: ContactProps) {
  useDocumentMetadata(contactMetadata.title, contactMetadata.description);

  return (
    <main className="site-page contact-page codex-contact">
      <section className="codex-contact__opening" aria-labelledby="contact-title">
        <Container className="codex-contact__opening-grid">
          <header className="codex-contact__intro">
            <span className="codex-contact__eyebrow">Contact and fees</span>
            <h1 id="contact-title">Make an enquiry.</h1>
          </header>
        </Container>
      </section>

      <section className="codex-contact__task-section" id="contact-start" tabIndex={-1}>
        <Container className="codex-contact__task-grid">
          <aside
            aria-labelledby="contact-first-message-title"
            className="codex-contact__first-message"
          >
            <h2 id="contact-first-message-title">
              Choosing a counsellor can be hard.
            </h2>
            <p>
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
            <div>
              <dt>Cancellations</dt>
              <dd>
                If you cancel or change an appointment with less than 48 hours'
                notice, the full fee is payable, except in cases of illness.
              </dd>
            </div>
            <div id="contact-urgent-support">
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
