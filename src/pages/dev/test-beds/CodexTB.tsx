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
import "../../../styles-contact.css";

type ContactPath = "appointment" | "consult" | "question";

type ContactPathOption = {
  id: ContactPath;
  title: string;
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

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="codex-contact__sr-only"> (required)</span>
    </>
  );
}

function ContactEnquiryForm() {
  const [contactPath, setContactPath] = useState<ContactPath | "">("");
  const timeZoneOptions = getActiveAustralianTimeZoneOptions();

  const handlePathChange = (value: ContactPath) => {
    setContactPath(value);
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
      : "Send enquiry";

  return (
    <form
      aria-labelledby="codex-contact-form-heading"
      className="codex-contact__form"
      onSubmit={(event) => event.preventDefault()}
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
        <h2 id="codex-contact-form-heading">Get in touch</h2>
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

      {contactPath ? (
        <div className="codex-contact__details">
          <div className="codex-contact__details-heading">
            <h3>A few details</h3>
            <p>Fields marked * are required.</p>
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
                {isQuestion ? "Your enquiry" : "Your message"}
                <RequiredMark />
              </label>
              <textarea
                id="codex-contact-message"
                name="message"
                required
                rows={4}
              />
            </div>
          </div>

          <div className="codex-contact__submit-row">
            <Button type="submit">{submitLabel}</Button>
          </div>
        </div>
      ) : null}

      <p className="codex-contact__form-boundary">
        If you’re in crisis, please use the{" "}
        <a href="#codex-contact-crisis-support">support options below</a> rather than
        this form.
      </p>
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
          </header>
        </Container>
      </section>

      <section className="codex-contact__task-section" id="codex-contact-start">
        <Container className="codex-contact__task-grid">
          <aside
            aria-labelledby="codex-contact-first-message-title"
            className="codex-contact__first-message"
          >
            <h2 id="codex-contact-first-message-title">
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
        className="codex-contact__essentials"
        id="codex-contact-fees"
        aria-labelledby="codex-contact-essentials-title"
      >
        <Container>
          <h2 className="codex-contact__sr-only" id="codex-contact-essentials-title">
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
                <a
                  className="codex-contact__essential-action"
                  href="#codex-contact-start"
                >
                  Get in touch
                </a>
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="codex-contact__practical" aria-label="Practical details">
        <Container>
          <header className="codex-contact__practical-heading">
            <span className="codex-contact__eyebrow">Practical details</span>
          </header>

          <dl className="codex-contact__practical-list">
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
            <div id="codex-contact-crisis-support">
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
