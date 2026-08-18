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
  australianStateOptions,
  bookingTypes,
  enquiryTypes,
  type BookingType,
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

type EnquiryPath = BookingType | "question";
type SubmitStatus = "idle" | "sending" | "success" | "error";

type EnquiryPathOption = {
  bookingType?: BookingType;
  enquiryType: EnquiryType;
  id: EnquiryPath;
  submitLabel: string;
  title: string;
};

type ContactPageProps = {
  initialRenderAt: string;
};

const enquiryPathOptions: readonly EnquiryPathOption[] = [
  {
    bookingType: bookingTypes.appointment.value,
    enquiryType: enquiryTypes.booking.value,
    id: "appointment",
    submitLabel: "Send session enquiry",
    title: "Make an appointment",
  },
  {
    bookingType: bookingTypes.consult.value,
    enquiryType: enquiryTypes.booking.value,
    id: "consult",
    submitLabel: "Request the 15-minute consult",
    title: "Request a consult",
  },
  {
    enquiryType: enquiryTypes.general.value,
    id: "question",
    submitLabel: "Send enquiry",
    title: "General enquiry",
  },
];

const contactMetadata = getRouteMetadata(publicRoutePaths.contact);
const crisisSupportHref = publicRoutePaths.crisisSupport;

function isEnquiryPath(value: FormDataEntryValue | null): value is EnquiryPath {
  return (
    typeof value === "string" &&
    enquiryPathOptions.some((option) => option.id === value)
  );
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
      <span className="contact-page__sr-only"> (required)</span>
    </>
  );
}

function RequiredField({
  children,
  id,
  label,
  wide = false,
}: {
  children: ReactNode;
  id: string;
  label: string;
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
        <RequiredMark />
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

function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const enquiryStartTrackedRef = useRef(false);
  const [selectedPath, setSelectedPath] = useState<EnquiryPath | "">("");
  const [hasHydrated, setHasHydrated] = useState(false);
  const [hasRestoredDetails, setHasRestoredDetails] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const timeZoneOptions = getActiveAustralianTimeZoneOptions();

  useEffect(() => {
    const formElement = formRef.current;

    if (formElement) {
      const formData = new FormData(formElement);
      const restoredPath = formData.get("contactPath");
      const hasBrowserRestoredDetails = ["name", "email", "message"].some(
        (fieldName) => getFormText(formData, fieldName).length > 0,
      );

      if (isEnquiryPath(restoredPath)) {
        setSelectedPath(restoredPath);
      }

      setHasRestoredDetails(hasBrowserRestoredDetails);
    }

    setHasHydrated(true);
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
      setSelectedPath("");
      setHasRestoredDetails(false);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleFormInput = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target;

    if (
      enquiryStartTrackedRef.current ||
      (target instanceof HTMLInputElement && ["contactPath", "website"].includes(target.name))
    ) {
      return;
    }

    enquiryStartTrackedRef.current = true;
    trackEnquiryStarted();
    recordVisitEvent("enquiry_started", {});
  };

  const handleEnquiryPathChange = (value: EnquiryPath) => {
    trackContactOptionSelected(value);
    recordVisitEvent("contact_option_selected", { option: value });
    setSelectedPath(value);
    setHasRestoredDetails(false);
    setSubmitStatus("idle");
  };

  if (submitStatus === "success") {
    return <EnquirySuccess />;
  }

  const selectedOption = enquiryPathOptions.find(
    (option) => option.id === selectedPath,
  );
  const isAppointment = selectedPath === "appointment";
  const isConsult = selectedPath === "consult";
  const isQuestion = selectedPath === "question";
  const showDetails = Boolean(selectedOption) || !hasHydrated || hasRestoredDetails;
  const showAppointmentFields = isAppointment || !hasHydrated;
  const showConsultFields = isConsult || !hasHydrated;

  return (
    <form
      action="/api/enquiry"
      aria-label="Enquiry"
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
        name="website"
        tabIndex={-1}
      />

      <header className="contact-page__form-heading">
        <span className="contact-page__form-eyebrow">Your enquiry</span>
      </header>

      <fieldset className="contact-page__enquiry-options">
        <legend className="contact-page__sr-only">Choose an enquiry type</legend>
        <div className="contact-page__enquiry-option-list">
          {enquiryPathOptions.map((option) => (
            <label className="contact-page__enquiry-option" key={option.id}>
              <strong>{option.title}</strong>
              <input
                checked={selectedPath === option.id}
                name="contactPath"
                onChange={() => handleEnquiryPathChange(option.id)}
                required
                type="radio"
                value={option.id}
              />
            </label>
          ))}
        </div>
      </fieldset>

      {showDetails ? (
        <div className="contact-page__form-details">
          <div className="contact-page__form-details-heading">
            <h3>A few details</h3>
            <p>Fields marked * are required.</p>
          </div>

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

          <div className="contact-page__form-fields">
            <RequiredField id="contact-name" label="Name">
              <input
                autoComplete="name"
                id="contact-name"
                name="name"
                placeholder="Your name"
                required={Boolean(selectedOption)}
                type="text"
              />
            </RequiredField>

            <RequiredField id="contact-email" label="Email">
              <input
                autoComplete="email"
                id="contact-email"
                name="email"
                placeholder="you@example.com"
                required={Boolean(selectedOption)}
                type="email"
              />
            </RequiredField>

            {showAppointmentFields ? (
              <>
                <RequiredField id="contact-timing" label="Preferred timing">
                  <input
                    id="contact-timing"
                    name="timing"
                    placeholder="For example: weekday afternoons"
                    required={isAppointment}
                    type="text"
                  />
                </RequiredField>

                <RequiredField id="contact-state" label="State or territory">
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
                </RequiredField>
              </>
            ) : null}

            {showConsultFields ? (
              <>
                <RequiredField id="contact-availability" label="Availability">
                  <input
                    id="contact-availability"
                    name="availability"
                    placeholder="For example: Tuesday after 3pm"
                    required={isConsult}
                    type="text"
                  />
                </RequiredField>

                <RequiredField id="contact-timezone" label="Timezone">
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
                </RequiredField>
              </>
            ) : null}

            <RequiredField
              id="contact-message"
              label={isQuestion ? "Your enquiry" : "Your message"}
              wide
            >
              <textarea
                id="contact-message"
                name="message"
                required={Boolean(selectedOption)}
                rows={4}
              />
            </RequiredField>
          </div>

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
      ) : null}

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
      <section className="contact-page__hero site-hero-background" aria-labelledby="contact-title">
        <Container>
          <header className="contact-page__hero-content">
            <span className="contact-page__eyebrow">Contact and fees</span>
            <h1 className="contact-page__hero-title" id="contact-title">
              Get in touch.
            </h1>
          </header>
        </Container>
      </section>

      <section className="contact-page__enquiry site-section-warm" id="contact-start" tabIndex={-1}>
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

          <EnquiryForm />
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
