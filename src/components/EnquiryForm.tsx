import { useState } from "react";
import type { FormEvent } from "react";
import {
  getActiveAustralianTimeZoneByAbbreviation,
  getActiveAustralianTimeZoneByState,
  getPerthBusinessHoursComparisonNote,
} from "../utils/timeZones";
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
  subject?: string;
  subjects?: {
    general: string;
    appointment: string;
    consult: string;
    booking: string;
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

function getSelectedOptionLabel(value: string, options: EnquiryFormSelectOption[]) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function getEnquirySubject(content: EnquiryFormContent, enquiryTypeValue: string, bookingTypeValue: string) {
  const subjects = content.subjects;

  if (enquiryTypeValue === generalEnquiryValue) {
    return subjects?.general ?? content.subject ?? "General enquiry";
  }

  if (enquiryTypeValue === bookingEnquiryValue && bookingTypeValue === appointmentBookingValue) {
    return subjects?.appointment ?? content.subject ?? "Booking enquiry";
  }

  if (enquiryTypeValue === bookingEnquiryValue && bookingTypeValue === consultBookingValue) {
    return subjects?.consult ?? content.subject ?? "15-minute consult request";
  }

  if (enquiryTypeValue === bookingEnquiryValue) {
    return subjects?.booking ?? content.subject ?? "Booking enquiry";
  }

  return content.subject ?? "Counselling enquiry";
}

function getSubjectName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : "";

  return [firstName, lastInitial].filter(Boolean).join(" ");
}

function getTimingNote(content: EnquiryFormContent, stateValue: string, timeZoneValue: string) {
  if (stateValue) {
    const activeTimeZone = getActiveAustralianTimeZoneByState(stateValue);

    if (activeTimeZone) {
      return getPerthBusinessHoursComparisonNote({
        stateLabel: getSelectedOptionLabel(stateValue, content.fields.state.options),
        timeZone: activeTimeZone.timeZone,
        timeZoneLabel: activeTimeZone.abbreviation,
      });
    }
  }

  if (timeZoneValue) {
    const activeTimeZone = getActiveAustralianTimeZoneByAbbreviation(timeZoneValue);

    if (activeTimeZone) {
      return getPerthBusinessHoursComparisonNote({
        timeZone: activeTimeZone.timeZone,
        timeZoneLabel: getSelectedOptionLabel(timeZoneValue, content.fields.timeZone.options),
      });
    }
  }

  return "";
}

function buildEnquiryPayload(content: EnquiryFormContent, formData: FormData) {
  const enquiryTypeValue = getFormText(formData, "enquiryType");
  const bookingTypeValue = getFormText(formData, "bookingType");
  const name = getFormText(formData, "name");
  const email = getFormText(formData, "email");
  const message = getFormText(formData, "message");
  const timingValue = getFormText(formData, "timing");
  const stateValue = getFormText(formData, "state");
  const availability = getFormText(formData, "availability");
  const timeZoneValue = getFormText(formData, "timeZone");

  const enquiryType = getSelectedOptionLabel(enquiryTypeValue, content.fields.enquiryType.options);
  const bookingType = getSelectedOptionLabel(bookingTypeValue, content.fields.bookingType.options);
  const timing = timingValue;
  const state = stateValue ? getSelectedOptionLabel(stateValue, content.fields.state.options) : "";
  const timeZone = timeZoneValue ? getSelectedOptionLabel(timeZoneValue, content.fields.timeZone.options) : "";
  const timingNote = getTimingNote(content, stateValue, timeZoneValue);

  const details = [
    ["Enquiry type", enquiryType],
    ["Booking request", bookingType],
    ["Name", name],
    ["Email", email],
    ["Preferred timing", timing],
    ["State or territory", state],
    ["Availability", availability],
    ["Timezone", timeZone],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  const body = [
    ...(timingNote ? [`Timing note: ${timingNote}`, ""] : []),
    ...details,
    "",
    message ? `Message:\n${message}` : "Message:",
  ].join("\n");
  const subjectName = getSubjectName(name);
  const subject = [getEnquirySubject(content, enquiryTypeValue, bookingTypeValue), subjectName]
    .filter(Boolean)
    .join(" - ");

  return {
    body,
    replyTo: email,
    subject,
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
    const errorBody = JSON.parse(responseBody) as { error?: string; details?: string };
    const apiMessage = [errorBody.error, errorBody.details].filter(Boolean).join(" ");

    return apiMessage ? `${fallback} ${apiMessage}` : `${fallback} Response JSON: ${getTruncatedErrorBody(responseBody)}`;
  } catch {
    return `${fallback} Raw response body: ${getTruncatedErrorBody(responseBody)}`;
  }
}

export default function EnquiryForm({ content, className, idPrefix = "enquiry" }: EnquiryFormProps) {
  const { fields } = content;
  const [enquiryType, setEnquiryType] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const isBookingEnquiry = enquiryType === bookingEnquiryValue;
  const isAppointmentRequest = isBookingEnquiry && bookingType === appointmentBookingValue;
  const isConsultRequest = isBookingEnquiry && bookingType === consultBookingValue;

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
        body: JSON.stringify(buildEnquiryPayload(content, new FormData(formElement))),
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
      className={joinClasses("site-form", className)}
      action="/api/enquiry"
      method="post"
      onSubmit={handleSubmit}
    >
      <span className="site-eyebrow">{content.eyebrow}</span>

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
      {submitStatus === "success" ? (
        <p className="site-form__status site-form__status--success" role="status">
          Thanks, your enquiry has been sent.
        </p>
      ) : null}
      {submitStatus === "error" ? (
        <div className="site-form__status site-form__status--error" role="alert">
          <p>Sorry, the enquiry could not be sent. Please email {content.recipientEmail} directly.</p>
          {submitError ? <small className="site-form__technical-error">Technical detail: {submitError}</small> : null}
        </div>
      ) : null}
    </form>
  );
}
