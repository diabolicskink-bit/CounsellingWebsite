import { useEffect, useRef, useState, type FormEvent } from "react";
import { enquiryEmail, enquirySuccessContent } from "../data/enquiry";
import {
  australianStateOptions,
  bookingTypes,
  enquiryTypes,
} from "../data/enquiryContract";
import {
  trackContactOptionSelected,
  trackEnquiryStarted,
  trackSuccessfulEnquirySubmission,
} from "../utils/analytics";
import { getActiveAustralianTimeZoneOptions } from "../utils/timeZones";
import Button from "./Button";
import "../styles-contact.css";

type ContactPath = "appointment" | "consult" | "question";
type SubmitStatus = "idle" | "sending" | "success" | "error";

type ContactPathOption = {
  id: ContactPath;
  title: string;
};

type ContactEnquiryFormProps = {
  analyticsFormName?: string;
  crisisHref?: string;
  showHeading?: boolean;
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

function SubmissionSuccess() {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statusElement = statusRef.current;

    statusElement?.focus({ preventScroll: true });
    statusElement?.scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "nearest",
    });
  }, []);

  return (
    <section className="codex-contact__submission-success">
      <div
        className="codex-contact__submission-status"
        ref={statusRef}
        role="status"
        tabIndex={-1}
      >
        <span className="codex-contact__submission-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="m6.5 12.5 3.3 3.3 7.7-8" />
          </svg>
        </span>
        <div className="codex-contact__submission-copy">
          <h2>{enquirySuccessContent.title}</h2>
          <p>{enquirySuccessContent.note}</p>
        </div>
      </div>
    </section>
  );
}

export default function ContactEnquiryForm({
  analyticsFormName = "contact",
  crisisHref = "#contact-crisis-support",
  showHeading = true,
}: ContactEnquiryFormProps) {
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

      trackSuccessfulEnquirySubmission(analyticsFormName);
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
    trackContactOptionSelected(value);
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
      className="codex-contact__form"
      data-clarity-mask="true"
      method="post"
      onInputCapture={handleFormInput}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <input
        aria-hidden="true"
        autoComplete="off"
        className="codex-contact__honeypot"
        name="website"
        tabIndex={-1}
      />

      <header
        className={`codex-contact__form-heading${
          showHeading ? "" : " codex-contact__form-heading--compact"
        }`}
      >
        <span className="codex-contact__step-label">Your enquiry</span>
        {showHeading ? <h2>Get in touch</h2> : null}
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
        If you’re in crisis, please use the <a href={crisisHref}>support options</a>{" "}
        rather than this form.
      </p>
    </form>
  );
}
