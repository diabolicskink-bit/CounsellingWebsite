import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import {
  enquiryEmail,
  enquiryFailureContent,
  enquirySuccessContent,
} from "../data/enquiry";
import {
  contactPaths,
  enquiryFieldLimits,
  enquiryTypes,
  findContactPath,
  type BookingType,
  type ContactPath,
  type EnquiryType,
} from "../data/enquiryContract";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  trackContactOptionSelected,
  trackEnquiryStarted,
  trackSuccessfulEnquirySubmission,
} from "../utils/analytics";
import {
  getActiveAustralianPerthBusinessHoursNotes,
  getActiveAustralianTimeZoneOptions,
} from "../utils/timeZones";
import { recordVisitEvent } from "../utils/visitEvents";
import { getCurrentVisitEventContext } from "../utils/visitSession";
import "../styles-contact.css";

type SubmitStatus = "idle" | "sending" | "success" | "error";

type EnquiryPathOption = {
  bookingType?: BookingType;
  enquiryType: EnquiryType;
  submitLabel: string;
  title: string;
  value: ContactPath;
};

type ContactPageProps = {
  initialRenderAt: string;
};

const enquiryPathOptions: readonly EnquiryPathOption[] = [
  {
    ...contactPaths.question,
    submitLabel: "Send message",
    title: "General Enquiry / Ask a Question",
  },
  {
    ...contactPaths.consult,
    submitLabel: "Request Consult",
    title: "Schedule a free consult",
  },
  {
    ...contactPaths.appointment,
    submitLabel: "Send session enquiry",
    title: "Make an appointment",
  },
];

const contactMetadata = getRouteMetadata(publicRoutePaths.contact);
const crisisSupportHref = publicRoutePaths.crisisSupport;

function isEnquiryPath(value: FormDataEntryValue | null): value is ContactPath {
  return typeof value === "string" && Boolean(findContactPath(value));
}

function getFormText(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

function buildEnquiryPayload(formData: FormData) {
  const analyticsContext = getCurrentVisitEventContext();

  return {
    analyticsPageViewId: analyticsContext?.pageViewId ?? "",
    analyticsVisitId: analyticsContext?.visitId ?? "",
    availability: getFormText(formData, "availability"),
    bookingType: getFormText(formData, "bookingType"),
    email: getFormText(formData, "email"),
    enquiryType: getFormText(formData, "enquiryType"),
    message: getFormText(formData, "message"),
    mobile: getFormText(formData, "mobile"),
    name: getFormText(formData, "name"),
    timeZone: getFormText(formData, "timeZone"),
    website: getFormText(formData, "website"),
  };
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="contact-page__sr-only"> (required)</span>
    </>
  );
}

function FormField({
  children,
  id,
  label,
  required = false,
  wide = false,
}: {
  children: ReactNode;
  id: string;
  label: string;
  required?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={
        "contact-page__form-field" +
        (wide ? " contact-page__form-field--wide" : "")
      }
    >
      <label htmlFor={id}>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      {children}
    </div>
  );
}

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

function EnquirySuccess() {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statusElement = statusRef.current;

    // Position the focused confirmation clear of the sticky site header.
    statusElement?.focus({ preventScroll: true });
    statusElement?.scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "nearest",
    });
  }, []);

  return (
    <section className="contact-page__success">
      <div
        className="contact-page__success-status"
        ref={statusRef}
        role="status"
        tabIndex={-1}
      >
        <span className="contact-page__success-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="m6.5 12.5 3.3 3.3 7.7-8" />
          </svg>
        </span>
        <div className="contact-page__success-copy">
          <h2>{enquirySuccessContent.title}</h2>
          <p>{enquirySuccessContent.note}</p>
        </div>
      </div>
    </section>
  );
}

function EnquiryForm({ initialRenderAt }: ContactPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const enquiryStartTrackedRef = useRef(false);
  const submissionInProgressRef = useRef(false);
  const [selectedPath, setSelectedPath] = useState<ContactPath | "">("");
  const [hasHydrated, setHasHydrated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const timeZoneOptions = getActiveAustralianTimeZoneOptions(
    hasHydrated ? new Date() : new Date(initialRenderAt),
  );

  useEffect(() => {
    const formElement = formRef.current;

    if (formElement) {
      const formData = new FormData(formElement);
      const restoredPath = formData.get("contactPath");

      if (isEnquiryPath(restoredPath)) {
        setSelectedPath(restoredPath);
      }
    }

    setHasHydrated(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submissionInProgressRef.current) {
      return;
    }

    const formElement = event.currentTarget;

    submissionInProgressRef.current = true;
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
      setSelectedPath("");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      submissionInProgressRef.current = false;
    }
  };

  const handleFormInput = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target;

    if (
      enquiryStartTrackedRef.current ||
      ((target instanceof HTMLInputElement || target instanceof HTMLSelectElement) &&
        ["contactPath", "website"].includes(target.name))
    ) {
      return;
    }

    enquiryStartTrackedRef.current = true;
    trackEnquiryStarted();
    recordVisitEvent("enquiry_started", {});
  };

  const handleEnquiryPathChange = (value: ContactPath) => {
    trackContactOptionSelected(value);
    recordVisitEvent("contact_option_selected", { option: value });
    setSelectedPath(value);
    setSubmitStatus("idle");
  };

  if (submitStatus === "success") {
    return <EnquirySuccess />;
  }

  const selectedOption = enquiryPathOptions.find(
    (option) => option.value === selectedPath,
  );
  const isConsult = selectedPath === contactPaths.consult.value;
  const isBooking = selectedOption?.enquiryType === enquiryTypes.booking.value;
  const showBookingFields = isBooking || !hasHydrated;
  const showConsultMobile = isConsult || !hasHydrated;

  return (
    <form
      action="/api/enquiry"
      aria-busy={submitStatus === "sending"}
      aria-labelledby="contact-form-title"
      className="contact-page__form"
      data-clarity-mask="true"
      method="post"
      onInputCapture={handleFormInput}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <input
        aria-hidden="true"
        autoComplete="off"
        maxLength={enquiryFieldLimits.website}
        name="website"
        tabIndex={-1}
      />

      <div className="contact-page__form-details">
        <input
          name="enquiryType"
          type="hidden"
          value={selectedOption?.enquiryType ?? ""}
        />
        {selectedOption?.bookingType ? (
          <input
            name="bookingType"
            type="hidden"
            value={selectedOption.bookingType}
          />
        ) : null}

        <div className="contact-page__form-start">
          <h2 className="contact-page__form-eyebrow" id="contact-form-title">
            Your enquiry
          </h2>

          <div className="contact-page__form-fields">
            <FormField id="contact-name" label="Name" required>
              <input
                autoComplete="name"
                id="contact-name"
                maxLength={enquiryFieldLimits.name}
                name="name"
                placeholder="Your name"
                required
                type="text"
              />
            </FormField>

            <FormField id="contact-email" label="Email" required>
              <input
                autoComplete="email"
                id="contact-email"
                maxLength={enquiryFieldLimits.email}
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </FormField>

            <FormField id="contact-message" label="Your message" required wide>
              <textarea
                id="contact-message"
                maxLength={enquiryFieldLimits.message}
                name="message"
                required
                rows={4}
              />
            </FormField>
          </div>
        </div>

        <div className="contact-page__form-field contact-page__enquiry-path">
          <select
            aria-label="How would you like to start?"
            id="contact-path"
            name="contactPath"
            onChange={(event) => {
              const value = event.currentTarget.value;

              if (isEnquiryPath(value)) {
                handleEnquiryPathChange(value);
              }
            }}
            required
            value={selectedPath}
          >
            <option disabled value="">
              Choose an option
            </option>
            {enquiryPathOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        {showBookingFields ? (
          <div className="contact-page__form-fields contact-page__form-fields--conditional">
            <FormField
              id="contact-availability"
              label={
                hasHydrated
                  ? "Availability"
                  : "Availability (required for an appointment or consult)"
              }
              required={isBooking}
              wide
            >
              <input
                id="contact-availability"
                maxLength={enquiryFieldLimits.availability}
                name="availability"
                placeholder="For example: Tuesday after 3pm"
                required={isBooking}
                type="text"
              />
            </FormField>

            {showConsultMobile ? (
              <FormField
                id="contact-mobile"
                label={
                  hasHydrated
                    ? "Mobile number"
                    : "Mobile number (required for a consult)"
                }
                required={isConsult}
              >
                <input
                  autoComplete="tel"
                  id="contact-mobile"
                  inputMode="tel"
                  maxLength={enquiryFieldLimits.mobile}
                  name="mobile"
                  placeholder="For example: 0412 345 678"
                  required={isConsult}
                  type="tel"
                />
              </FormField>
            ) : null}

            <FormField
              id="contact-timezone"
              label={
                hasHydrated
                  ? "Timezone"
                  : "Timezone (required for an appointment or consult)"
              }
              required={isBooking}
            >
              <select
                defaultValue=""
                id="contact-timezone"
                name="timeZone"
                required={isBooking}
              >
                {timeZoneOptions.map((option) => (
                  <option key={option.value || "default"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        ) : null}

        <div className="contact-page__form-actions">
          <Button disabled={submitStatus === "sending"} type="submit">
            {submitStatus === "sending"
              ? "Sending..."
              : selectedOption?.submitLabel ?? "Send enquiry"}
          </Button>
        </div>

        {submitStatus === "error" ? (
          <div className="contact-page__form-error" role="alert">
            <p>
              {enquiryFailureContent.messageBeforeEmail}{" "}
              <a href={`mailto:${enquiryFailureContent.email}`}>
                {enquiryFailureContent.email}
              </a>{" "}
              {enquiryFailureContent.messageAfterEmail}
            </p>
          </div>
        ) : null}
      </div>

      <p className="contact-page__crisis-note">
        If you’re in crisis, <Link to={crisisSupportHref}>find support now</Link>.
      </p>
    </form>
  );
}

export default function Contact({ initialRenderAt }: ContactPageProps) {
  useDocumentMetadata(contactMetadata.title, contactMetadata.description);

  return (
    <main className="site-page contact-page">
      <section className="site-hero contact-page__hero site-hero-background" aria-labelledby="contact-title">
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
        aria-labelledby="contact-enquiry-intro-title"
        className="contact-page__enquiry site-section-warm"
        id="contact-start"
        tabIndex={-1}
      >
        <Container className="contact-page__enquiry-layout">
          <header className="contact-page__enquiry-intro">
            <h2 id="contact-enquiry-intro-title">
              Choosing a counsellor can be hard.
            </h2>
            <p className="site-reading">
              I offer a free 15-minute consult so you can speak with me before
              deciding whether to book. If you would rather start with a
              question, you can send one through the form or{" "}
              <a href={`mailto:${enquiryEmail}`}>by email</a>.
            </p>
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

      <section
        aria-labelledby="contact-details-title"
        className="contact-page__practice-details"
        id="contact-details"
      >
        <Container>
          <h2 className="contact-page__practice-heading" id="contact-details-title">
            <span className="contact-page__eyebrow">Practical details</span>
          </h2>

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
