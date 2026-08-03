import { useState } from "react";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import { enquiryEmail } from "../../../data/enquiry";
import {
  australianStateOptions,
  bookingTypes,
  enquiryTypes,
} from "../../../data/enquiryContract";
import { getRouteMetadata } from "../../../data/routeMetadata";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";
import { getActiveAustralianTimeZoneOptions } from "../../../utils/timeZones";
import "../../../styles-opus-tb.css";

type ContactPath = "appointment" | "consult" | "question";

const contactPathOptions: readonly {
  id: ContactPath;
  title: string;
}[] = [
  {
    id: "appointment",
    title: "Counselling session",
  },
  {
    id: "consult",
    title: "Free 15-minute consult",
  },
  {
    id: "question",
    title: "Ask a question",
  },
] as const;

const contactMetadata = getRouteMetadata("/contact");

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="opus-contact__sr-only"> (required)</span>
    </>
  );
}

function PathFacts({ path }: { path: ContactPath }) {
  if (path === "appointment") {
    return (
      <span className="opus-contact__path-facts opus-contact__path-facts--session">
        <span className="opus-contact__path-fact">
          <strong>$120</strong>
          <small>Individual · 50 minutes</small>
        </span>
        <span className="opus-contact__path-fact">
          <strong>$150</strong>
          <small>Couples</small>
        </span>
        <span className="opus-contact__path-note">
          More than two people? <strong>Please contact me to discuss.</strong>
        </span>
      </span>
    );
  }

  if (path === "consult") {
    return (
      <span className="opus-contact__path-facts">
        <span className="opus-contact__path-fact">
          <strong>Free</strong>
          <small>15 minutes</small>
        </span>
      </span>
    );
  }

  return (
    <span className="opus-contact__path-facts">
      <span className="opus-contact__path-note">
        You do not need to be ready to arrange anything.
      </span>
    </span>
  );
}

type EnquiryDetailsProps = {
  contactPath: ContactPath;
};

function EnquiryDetails({ contactPath }: EnquiryDetailsProps) {
  const timeZoneOptions = getActiveAustralianTimeZoneOptions();
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
    <div className="opus-contact__details">
      <div className="opus-contact__details-heading">
        <h3>A few details</h3>
        <p>Fields marked * are required.</p>
      </div>

      <div className="opus-contact__details-body">
        <input name="enquiryType" type="hidden" value={enquiryType} />
        {bookingType ? <input name="bookingType" type="hidden" value={bookingType} /> : null}

        <div className="opus-contact__field-grid">
          <div className="opus-contact__field">
            <label htmlFor="opus-contact-name">
              Name
              <RequiredMark />
            </label>
            <input
              autoComplete="name"
              id="opus-contact-name"
              name="name"
              placeholder="Your name"
              required
              type="text"
            />
          </div>

          <div className="opus-contact__field">
            <label htmlFor="opus-contact-email">
              Email
              <RequiredMark />
            </label>
            <input
              autoComplete="email"
              id="opus-contact-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          {isAppointment ? (
            <>
              <div className="opus-contact__field" key="appointment-timing">
                <label htmlFor="opus-contact-timing">
                  Preferred timing
                  <RequiredMark />
                </label>
                <input
                  id="opus-contact-timing"
                  name="timing"
                  placeholder="For example: weekday afternoons"
                  required
                  type="text"
                />
              </div>

              <div className="opus-contact__field" key="appointment-state">
                <label htmlFor="opus-contact-state">
                  State or territory
                  <RequiredMark />
                </label>
                <select defaultValue="" id="opus-contact-state" name="state" required>
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
              <div className="opus-contact__field" key="consult-availability">
                <label htmlFor="opus-contact-availability">
                  Availability
                  <RequiredMark />
                </label>
                <input
                  id="opus-contact-availability"
                  name="availability"
                  placeholder="For example: Tuesday after 3pm"
                  required
                  type="text"
                />
              </div>

              <div className="opus-contact__field" key="consult-timezone">
                <label htmlFor="opus-contact-timezone">
                  Timezone
                  <RequiredMark />
                </label>
                <select defaultValue="" id="opus-contact-timezone" name="timeZone" required>
                  {timeZoneOptions.map((option) => (
                    <option key={option.value || "default"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          <div className="opus-contact__field opus-contact__field--message" key="message">
            <label htmlFor="opus-contact-message">
              {isQuestion ? "Your question" : "Your message"}
              <RequiredMark />
            </label>
            <textarea id="opus-contact-message" name="message" required rows={4} />
          </div>
        </div>

        <div className="opus-contact__submit-row">
          <Button type="submit">{submitLabel}</Button>
        </div>
      </div>
    </div>
  );
}

function ContactEnquiryForm() {
  const [contactPath, setContactPath] = useState<ContactPath | "">("");

  const handlePathChange = (value: ContactPath) => {
    setContactPath(value);
  }

  return (
    <form
      aria-labelledby="opus-contact-form-heading"
      className="opus-contact__form"
      onSubmit={(event) => event.preventDefault()}
    >
      <header className="opus-contact__form-heading">
        <span className="opus-contact__utility-label">Your enquiry</span>
        <h2 id="opus-contact-form-heading">What would you like to do?</h2>
      </header>

      <fieldset className="opus-contact__path-fieldset">
        <legend className="opus-contact__sr-only">Choose an enquiry type</legend>
        <div className="opus-contact__path-list">
          {contactPathOptions.map((option) => {
            const isSelected = contactPath === option.id;

            return (
              <div
                className={`opus-contact__path-row${
                  isSelected ? " opus-contact__path-row--selected" : ""
                }`}
                key={option.id}
              >
                <label className="opus-contact__path-choice">
                  <input
                    checked={isSelected}
                    name="contactPath"
                    onChange={() => handlePathChange(option.id)}
                    required
                    type="radio"
                    value={option.id}
                  />
                  <span className="opus-contact__path-title">{option.title}</span>
                  <PathFacts path={option.id} />
                </label>

                {isSelected ? (
                  <EnquiryDetails contactPath={option.id} />
                ) : null}
              </div>
            );
          })}
        </div>
      </fieldset>

      <p className="opus-contact__form-boundary">
        If you’re in crisis, please use the{" "}
        <a href="#opus-contact-crisis-support">support options below</a> rather than
        this form.
      </p>
    </form>
  );
}

export default function OpusTB() {
  useDocumentMetadata(contactMetadata.title, contactMetadata.description);

  return (
    <main className="site-page opus-tb-page opus-contact">
      <section className="opus-contact__opening" aria-labelledby="opus-contact-title">
        <Container>
          <header className="opus-contact__intro">
            <span className="opus-contact__eyebrow">Contact and fees</span>
            <div className="opus-contact__intro-main">
              <h1 id="opus-contact-title">Make an enquiry.</h1>
              <p className="opus-contact__email-route">
                Prefer email?{" "}
                <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
              </p>
            </div>
          </header>
        </Container>
      </section>

      <section className="opus-contact__enquiry" id="opus-contact-start">
        <Container>
          <ContactEnquiryForm />
        </Container>
      </section>

      <section className="opus-contact__practical" aria-labelledby="opus-contact-practical-title">
        <Container className="opus-contact__practical-grid">
          <h2 id="opus-contact-practical-title">Practical details</h2>

          <dl className="opus-contact__practical-list">
            <div>
              <dt>Practice hours</dt>
              <dd>Mon to Fri, 9.30am to 5.00pm AWST.</dd>
            </div>
            <div>
              <dt>Cancellations</dt>
              <dd>
                If you cancel or change an appointment with less than 48 hours’
                notice, the full fee is payable, except in cases of illness.
              </dd>
            </div>
            <div id="opus-contact-crisis-support">
              <dt>Crisis support</dt>
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
