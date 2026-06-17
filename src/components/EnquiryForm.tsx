import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
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
      options: EnquiryFormSelectOption[];
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

function getTruncatedErrorBody(body: string) {
  const normalizedBody = body.trim().replace(/\s+/g, " ");
  const maxLength = 1600;

  if (normalizedBody.length <= maxLength) {
    return normalizedBody;
  }

  return `${normalizedBody.slice(0, maxLength)}...`;
}

function getClientFailureDetail(error: unknown) {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  return String(error);
}

async function getSubmitFailureDetail(response: Response) {
  const endpoint = response.url || "/api/enquiry";
  const statusText = response.statusText ? ` ${response.statusText}` : "";
  const fallback = `Request to ${endpoint} failed with status ${response.status}${statusText}.`;
  const responseBody = await response.text();

  if (!responseBody.trim()) {
    return `${fallback} No response body was returned by the server.`;
  }

  try {
    const errorBody = JSON.parse(responseBody) as { error?: string; details?: unknown };
    const details =
      typeof errorBody.details === "string"
        ? errorBody.details
        : errorBody.details
          ? JSON.stringify(errorBody.details)
          : "";
    const apiMessage = [errorBody.error, details].filter(Boolean).join(" ");

    return apiMessage ? `${fallback} ${apiMessage}` : `${fallback} Response JSON: ${getTruncatedErrorBody(responseBody)}`;
  } catch {
    return `${fallback} Raw response body: ${getTruncatedErrorBody(responseBody)}`;
  }
}

export default function EnquiryForm({ content, className, idPrefix = "enquiry" }: EnquiryFormProps) {
  const { fields } = content;
  const successRef = useRef<HTMLDivElement>(null);
  const [enquiryType, setEnquiryType] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const isBookingEnquiry = enquiryType === bookingEnquiryValue;
  const isAppointmentRequest = isBookingEnquiry && bookingType === appointmentBookingValue;
  const isConsultRequest = isBookingEnquiry && bookingType === consultBookingValue;

  useEffect(() => {
    if (submitStatus === "success") {
      successRef.current?.focus();
    }
  }, [submitStatus]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    setSubmitStatus("sending");
    setSubmitError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildEnquiryPayload(new FormData(formElement))),
      });

      if (!response.ok) {
        throw new Error(await getSubmitFailureDetail(response));
      }

      formElement.reset();
      setEnquiryType("");
      setBookingType("");
      setSubmitError("");
      setSubmitStatus("success");
    } catch (error) {
      setSubmitError(getClientFailureDetail(error));
      setSubmitStatus("error");
    }
  };

  const handleEnquiryTypeChange = (value: string) => {
    setEnquiryType(value);
    setSubmitStatus("idle");
    setSubmitError("");

    if (value !== bookingEnquiryValue) {
      setBookingType("");
    }
  };

  return (
    <form
      className={joinClasses("site-form", submitStatus === "success" ? "site-form--complete" : undefined, className)}
      action="/api/enquiry"
      method="post"
      onSubmit={handleSubmit}
    >
      <span className="site-eyebrow">{content.eyebrow}</span>

      {submitStatus === "success" ? (
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
      ) : (
        <>
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
                          setSubmitError("");
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
                    {fields.timeZone.options.map((option) => (
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
              {submitError ? <small className="site-form__technical-error">Technical detail: {submitError}</small> : null}
            </div>
          ) : null}
        </>
      )}
    </form>
  );
}
