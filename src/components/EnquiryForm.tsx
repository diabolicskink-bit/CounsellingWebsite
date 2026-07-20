import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { trackEnquiryStarted, trackSuccessfulEnquirySubmission } from "../utils/analytics";
import { getActiveAustralianTimeZoneOptions } from "../utils/timeZones";
import Button from "./Button";

export type EnquiryFormTextField = {
  label: string;
  placeholder: string;
};

export type EnquiryFormSelectOption = {
  value: string;
  label: string;
};

export type EnquiryFormContent = {
  eyebrow: string;
  recipientEmail: string;
  submitLabel: string;
  success: {
    title: string;
    message: string;
    note: string;
  };
  fields: {
    enquiryType: {
      legend: string;
      options: EnquiryFormSelectOption[];
    };
    bookingType: {
      legend: string;
      options: EnquiryFormSelectOption[];
    };
    name: EnquiryFormTextField;
    email: EnquiryFormTextField;
    message: EnquiryFormTextField & { rows: number };
    availability: EnquiryFormTextField;
    timeZone: {
      label: string;
    };
    timing: EnquiryFormTextField;
    state: {
      label: string;
      options: EnquiryFormSelectOption[];
    };
  };
};

type EnquiryFormProps = {
  content: EnquiryFormContent;
  className?: string;
  idPrefix?: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

const bookingEnquiryValue = "booking";
const generalEnquiryValue = "general";
const appointmentBookingValue = "appointment";
const consultBookingValue = "consult";

function getFormText(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

function buildEnquiryPayload(formData: FormData) {
  const name = getFormText(formData, "name");
  const email = getFormText(formData, "email");
  const message = getFormText(formData, "message");

  return {
    availability: getFormText(formData, "availability"),
    bookingType: getFormText(formData, "bookingType"),
    email,
    enquiryType: getFormText(formData, "enquiryType"),
    message,
    name,
    state: getFormText(formData, "state"),
    timing: getFormText(formData, "timing"),
    timeZone: getFormText(formData, "timeZone"),
    website: getFormText(formData, "website"),
  };
}

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function EnquiryForm({ content, className, idPrefix = "enquiry" }: EnquiryFormProps) {
  const { fields } = content;
  const formHeadingId = `${idPrefix}-form-heading`;
  const enquiryStartTrackedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [enquiryType, setEnquiryType] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const isBookingEnquiry = enquiryType === bookingEnquiryValue;
  const isAppointmentRequest = isBookingEnquiry && bookingType === appointmentBookingValue;
  const isConsultRequest = isBookingEnquiry && bookingType === consultBookingValue;
  const timeZoneOptions = useMemo(
    () => (isConsultRequest ? getActiveAustralianTimeZoneOptions() : []),
    [isConsultRequest],
  );

  useEffect(() => {
    if (submitStatus === "success") {
      successRef.current?.focus();
    }
  }, [submitStatus]);

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

      trackSuccessfulEnquirySubmission(idPrefix);
      formElement.reset();
      setEnquiryType("");
      setBookingType("");
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

  const handleEnquiryTypeChange = (value: string) => {
    setEnquiryType(value);
    setSubmitStatus("idle");

    if (value !== bookingEnquiryValue) {
      setBookingType("");
    }
  };

  if (submitStatus === "success") {
    return (
      <section className={joinClasses("site-form", "site-form--complete", className)}>
        <div
          className="site-form__status site-form__status--success site-form__status--complete"
          ref={successRef}
          role="status"
          tabIndex={-1}
        >
          <h2>{content.success.title}</h2>
          <p>{content.success.message}</p>
          <p>{content.success.note}</p>
        </div>
      </section>
    );
  }

  return (
    <form
      aria-labelledby={formHeadingId}
      className={joinClasses("site-form", className)}
      action="/api/enquiry"
      data-clarity-mask="true"
      method="post"
      onInputCapture={handleFormInput}
      onSubmit={handleSubmit}
    >
      <h2 className="site-eyebrow site-form__heading" id={formHeadingId}>
        {content.eyebrow}
      </h2>

          <div className="site-form__grid">
            <input
              className="site-form__honeypot"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="form-row">
              <label htmlFor={`${idPrefix}-name`}>{fields.name.label}</label>
              <input
                id={`${idPrefix}-name`}
                name="name"
                autoComplete="name"
                type="text"
                required
                placeholder={fields.name.placeholder}
              />
            </div>

            <div className="form-row">
              <label htmlFor={`${idPrefix}-email`}>{fields.email.label}</label>
              <input
                id={`${idPrefix}-email`}
                name="email"
                autoComplete="email"
                type="email"
                required
                placeholder={fields.email.placeholder}
              />
            </div>

            <div className="form-row site-form__row--full">
              <label htmlFor={`${idPrefix}-message`}>{fields.message.label}</label>
              <textarea
                id={`${idPrefix}-message`}
                name="message"
                placeholder={fields.message.placeholder}
                required
                rows={fields.message.rows}
              />
            </div>

            <fieldset className="site-form__choice-group site-form__row--full">
              <legend className="site-form__legend">{fields.enquiryType.legend}</legend>
              <div className="site-form__choices">
                {fields.enquiryType.options.map((option) => (
                  <label className="site-form__choice" key={option.value}>
                    <input
                      checked={enquiryType === option.value}
                      name="enquiryType"
                      onChange={() => handleEnquiryTypeChange(option.value)}
                      required
                      type="radio"
                      value={option.value}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {isBookingEnquiry ? (
              <fieldset className="site-form__choice-group site-form__row--full">
                <legend className="site-form__legend">{fields.bookingType.legend}</legend>
                <div className="site-form__choices">
                  {fields.bookingType.options.map((option) => (
                    <label className="site-form__choice" key={option.value}>
                      <input
                        checked={bookingType === option.value}
                        name="bookingType"
                        onChange={() => {
                          setBookingType(option.value);
                          setSubmitStatus("idle");
                        }}
                        required
                        type="radio"
                        value={option.value}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {isAppointmentRequest ? (
              <>
                <div className="form-row">
                  <label htmlFor={`${idPrefix}-timing`}>{fields.timing.label}</label>
                  <input
                    id={`${idPrefix}-timing`}
                    name="timing"
                    placeholder={fields.timing.placeholder}
                    required
                    type="text"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor={`${idPrefix}-state`}>{fields.state.label}</label>
                  <select id={`${idPrefix}-state`} name="state" defaultValue="" required>
                    {fields.state.options.map((option) => (
                      <option key={option.value || "default"} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : null}

            {isConsultRequest ? (
              <>
                <div className="form-row">
                  <label htmlFor={`${idPrefix}-availability`}>{fields.availability.label}</label>
                  <input
                    id={`${idPrefix}-availability`}
                    name="availability"
                    placeholder={fields.availability.placeholder}
                    required
                    type="text"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor={`${idPrefix}-timezone`}>{fields.timeZone.label}</label>
                  <select id={`${idPrefix}-timezone`} name="timeZone" defaultValue="" required>
                    {timeZoneOptions.map((option) => (
                      <option key={option.value || "default"} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : null}
          </div>

          <Button className="site-form__submit" disabled={submitStatus === "sending"} type="submit">
            {submitStatus === "sending" ? "Sending..." : content.submitLabel}
          </Button>
          {submitStatus === "error" ? (
            <div className="site-form__status site-form__status--error" role="alert">
              <p>Sorry, the enquiry could not be sent. Please email {content.recipientEmail} directly.</p>
            </div>
          ) : null}
    </form>
  );
}
