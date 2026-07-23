import {
  bookingTypes,
  enquiryTypes,
  findAustralianState,
  findBookingType,
  findEnquiryType,
  type AustralianStateOption,
  type BookingTypeOption,
} from "../../data/enquiryContract.ts";
import { getAustralianTimeZoneLabel } from "../../utils/timeZones.ts";

type ValidationIssue = {
  code: "invalid_format" | "invalid_value" | "required";
  field: string;
  message: string;
};

type ValidatedEnquiryBase = {
  email: string;
  message: string;
  name: string;
};

type ValidatedGeneralEnquiry = ValidatedEnquiryBase & {
  enquiryType: typeof enquiryTypes.general.value;
  enquiryTypeLabel: typeof enquiryTypes.general.label;
};

type ValidatedAppointmentEnquiry = ValidatedEnquiryBase & {
  bookingType: typeof bookingTypes.appointment.value;
  bookingTypeLabel: typeof bookingTypes.appointment.label;
  enquiryType: typeof enquiryTypes.booking.value;
  enquiryTypeLabel: typeof enquiryTypes.booking.label;
  state: AustralianStateOption["value"];
  stateLabel: AustralianStateOption["label"];
  timing: string;
};

type ValidatedConsultEnquiry = ValidatedEnquiryBase & {
  availability: string;
  bookingType: typeof bookingTypes.consult.value;
  bookingTypeLabel: typeof bookingTypes.consult.label;
  enquiryType: typeof enquiryTypes.booking.value;
  enquiryTypeLabel: typeof enquiryTypes.booking.label;
  timeZone: string;
  timeZoneLabel: string;
};

export type ValidatedEnquiry =
  | ValidatedGeneralEnquiry
  | ValidatedAppointmentEnquiry
  | ValidatedConsultEnquiry;

type ValidationResult =
  | { type: "honeypot" }
  | { issues: ValidationIssue[]; type: "invalid" }
  | { enquiry: ValidatedEnquiry; type: "valid" };

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
  const enquiryTypeValue = getRequiredTextField(payload, "enquiryType", 60, issues, "Enquiry type");
  const enquiryType = findEnquiryType(enquiryTypeValue);
  const name = getRequiredTextField(payload, "name", 160, issues, "Name");
  const email = getRequiredTextField(payload, "email", 320, issues, "Email");
  const message = getRequiredTextField(payload, "message", 5000, issues, "Message");
  let bookingType: BookingTypeOption | undefined;
  let timing = "";
  let state: AustralianStateOption | undefined;
  let availability = "";
  let timeZone = "";
  let timeZoneLabel = "";

  if (email && !isValidEmailAddress(email)) {
    addIssue(issues, "email", "invalid_format", "Enter a valid email address.");
  }

  if (enquiryTypeValue && !enquiryType) {
    addIssue(issues, "enquiryType", "invalid_value", "Choose a valid enquiry type.");
  }

  if (enquiryType?.value === enquiryTypes.booking.value) {
    const bookingTypeValue = getRequiredTextField(payload, "bookingType", 60, issues, "Booking request");

    bookingType = findBookingType(bookingTypeValue);

    if (bookingTypeValue && !bookingType) {
      addIssue(issues, "bookingType", "invalid_value", "Choose a valid booking request.");
    }

    if (bookingType?.value === bookingTypes.appointment.value) {
      timing = getRequiredTextField(payload, "timing", 500, issues, "Preferred timing");
      const stateValue = getRequiredTextField(payload, "state", 60, issues, "State or territory");

      state = findAustralianState(stateValue);

      if (stateValue && !state) {
        addIssue(issues, "state", "invalid_value", "Choose a valid state or territory.");
      }
    }

    if (bookingType?.value === bookingTypes.consult.value) {
      availability = getRequiredTextField(payload, "availability", 500, issues, "Availability");
      timeZone = getRequiredTextField(payload, "timeZone", 60, issues, "Timezone");
      timeZoneLabel = getAustralianTimeZoneLabel(timeZone);

      if (timeZone && !timeZoneLabel) {
        addIssue(issues, "timeZone", "invalid_value", "Choose a valid timezone.");
      }
    }
  }

  if (issues.length || !enquiryType) {
    return { issues, type: "invalid" };
  }

  const baseEnquiry = {
    email,
    message,
    name,
  };

  if (enquiryType.value === enquiryTypes.general.value) {
    return {
      enquiry: {
        ...baseEnquiry,
        enquiryType: enquiryType.value,
        enquiryTypeLabel: enquiryType.label,
      },
      type: "valid",
    };
  }

  if (!bookingType) {
    addIssue(issues, "bookingType", "required", "Booking request is required.");
    return { issues, type: "invalid" };
  }

  if (bookingType.value === bookingTypes.appointment.value) {
    if (!state) {
      addIssue(issues, "state", "required", "State or territory is required.");
      return { issues, type: "invalid" };
    }

    return {
      enquiry: {
        ...baseEnquiry,
        bookingType: bookingType.value,
        bookingTypeLabel: bookingType.label,
        enquiryType: enquiryType.value,
        enquiryTypeLabel: enquiryType.label,
        state: state.value,
        stateLabel: state.label,
        timing,
      },
      type: "valid",
    };
  }

  return {
    enquiry: {
      ...baseEnquiry,
      availability,
      bookingType: bookingType.value,
      bookingTypeLabel: bookingType.label,
      enquiryType: enquiryType.value,
      enquiryTypeLabel: enquiryType.label,
      timeZone,
      timeZoneLabel,
    },
    type: "valid",
  };
}
