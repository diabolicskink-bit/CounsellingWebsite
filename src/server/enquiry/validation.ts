import { getAustralianTimeZoneLabel } from "../../utils/timeZones.ts";

type ValidationIssue = {
  code: "invalid_format" | "invalid_value" | "required";
  field: string;
  message: string;
};

export type ValidatedEnquiry = {
  availability?: string;
  bookingType?: string;
  bookingTypeLabel?: string;
  email: string;
  enquiryType: string;
  enquiryTypeLabel: string;
  message: string;
  name: string;
  state?: string;
  stateLabel?: string;
  timing?: string;
  timeZone?: string;
  timeZoneLabel?: string;
};

type ValidationResult =
  | { type: "honeypot" }
  | { issues: ValidationIssue[]; type: "invalid" }
  | { enquiry: ValidatedEnquiry; type: "valid" };

const enquiryTypeLabels: Record<string, string> = {
  booking: "Booking enquiry",
  general: "General enquiry",
};

const bookingTypeLabels: Record<string, string> = {
  appointment: "Make an appointment",
  consult: "Request a 15-minute consult",
};

const stateLabels: Record<string, string> = {
  act: "Australian Capital Territory",
  nsw: "New South Wales",
  nt: "Northern Territory",
  other: "Outside Australia or unsure",
  qld: "Queensland",
  sa: "South Australia",
  tas: "Tasmania",
  vic: "Victoria",
  wa: "Western Australia",
};

function getText(value: unknown, maxLength = 5000) {
  if (typeof value === "string") {
    return value.trim().slice(0, maxLength);
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0].trim().slice(0, maxLength);
  }

  return "";
}

function addIssue(issues: ValidationIssue[], field: string, code: ValidationIssue["code"], message: string) {
  issues.push({ field, code, message });
}

function getRequiredTextField(
  payload: Record<string, unknown>,
  field: string,
  maxLength: number,
  issues: ValidationIssue[],
  label: string,
) {
  const value = getText(payload[field], maxLength);

  if (!value) {
    addIssue(issues, field, "required", `${label} is required.`);
  }

  return value;
}

function isValidEmailAddress(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateEnquiryPayload(payload: Record<string, unknown>): ValidationResult {
  if (getText(payload.website, 320)) {
    return { type: "honeypot" };
  }

  const issues: ValidationIssue[] = [];
  const enquiryType = getRequiredTextField(payload, "enquiryType", 60, issues, "Enquiry type");
  const name = getRequiredTextField(payload, "name", 160, issues, "Name");
  const email = getRequiredTextField(payload, "email", 320, issues, "Email");
  const message = getRequiredTextField(payload, "message", 5000, issues, "Message");
  const enquiry: ValidatedEnquiry = {
    email,
    enquiryType,
    enquiryTypeLabel: enquiryTypeLabels[enquiryType] ?? "",
    message,
    name,
  };

  if (email && !isValidEmailAddress(email)) {
    addIssue(issues, "email", "invalid_format", "Enter a valid email address.");
  }

  if (enquiryType && !enquiryTypeLabels[enquiryType]) {
    addIssue(issues, "enquiryType", "invalid_value", "Choose a valid enquiry type.");
  }

  if (enquiryType === "booking") {
    const bookingType = getRequiredTextField(payload, "bookingType", 60, issues, "Booking request");

    enquiry.bookingType = bookingType;
    enquiry.bookingTypeLabel = bookingTypeLabels[bookingType] ?? "";

    if (bookingType && !bookingTypeLabels[bookingType]) {
      addIssue(issues, "bookingType", "invalid_value", "Choose a valid booking request.");
    }

    if (bookingType === "appointment") {
      const timing = getRequiredTextField(payload, "timing", 500, issues, "Preferred timing");
      const state = getRequiredTextField(payload, "state", 60, issues, "State or territory");

      enquiry.timing = timing;
      enquiry.state = state;
      enquiry.stateLabel = stateLabels[state] ?? "";

      if (state && !stateLabels[state]) {
        addIssue(issues, "state", "invalid_value", "Choose a valid state or territory.");
      }
    }

    if (bookingType === "consult") {
      const availability = getRequiredTextField(payload, "availability", 500, issues, "Availability");
      const timeZone = getRequiredTextField(payload, "timeZone", 60, issues, "Timezone");
      const timeZoneLabel = getAustralianTimeZoneLabel(timeZone);

      enquiry.availability = availability;
      enquiry.timeZone = timeZone;
      enquiry.timeZoneLabel = timeZoneLabel;

      if (timeZone && !timeZoneLabel) {
        addIssue(issues, "timeZone", "invalid_value", "Choose a valid timezone.");
      }
    }
  }

  if (issues.length) {
    return { issues, type: "invalid" };
  }

  return { enquiry, type: "valid" };
}
