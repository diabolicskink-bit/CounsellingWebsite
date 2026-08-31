import {
  bookingTypes,
  enquiryTypes,
  findBookingType,
  findEnquiryType,
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
  availability: string;
  bookingType: typeof bookingTypes.appointment.value;
  bookingTypeLabel: typeof bookingTypes.appointment.label;
  enquiryType: typeof enquiryTypes.booking.value;
  enquiryTypeLabel: typeof enquiryTypes.booking.label;
  timeZone: string;
  timeZoneLabel: string;
};

type ValidatedConsultEnquiry = ValidatedEnquiryBase & {
  availability: string;
  bookingType: typeof bookingTypes.consult.value;
  bookingTypeLabel: typeof bookingTypes.consult.label;
  enquiryType: typeof enquiryTypes.booking.value;
  enquiryTypeLabel: typeof enquiryTypes.booking.label;
  mobile: string;
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

function applyContactPathFallback(payload: Record<string, unknown>) {
  if (getText(payload.enquiryType, 60)) {
    return payload;
  }

  switch (getText(payload.contactPath, 60)) {
    case "appointment":
      return {
        ...payload,
        bookingType: bookingTypes.appointment.value,
        enquiryType: enquiryTypes.booking.value,
      };
    case "consult":
      return {
        ...payload,
        bookingType: bookingTypes.consult.value,
        enquiryType: enquiryTypes.booking.value,
      };
    case "question":
      return {
        ...payload,
        enquiryType: enquiryTypes.general.value,
      };
    default:
      return payload;
  }
}

export function validateEnquiryPayload(payload: Record<string, unknown>): ValidationResult {
  if (getText(payload.website, 320)) {
    return { type: "honeypot" };
  }

  const enquiryPayload = applyContactPathFallback(payload);
  const issues: ValidationIssue[] = [];
  const enquiryTypeValue = getRequiredTextField(
    enquiryPayload,
    "enquiryType",
    60,
    issues,
    "Enquiry type",
  );
  const enquiryType = findEnquiryType(enquiryTypeValue);
  const name = getRequiredTextField(enquiryPayload, "name", 160, issues, "Name");
  const email = getRequiredTextField(enquiryPayload, "email", 320, issues, "Email");
  const message = getRequiredTextField(enquiryPayload, "message", 5000, issues, "Message");
  let bookingType: BookingTypeOption | undefined;
  let availability = "";
  let mobile = "";
  let timeZone = "";
  let timeZoneLabel = "";

  if (email && !isValidEmailAddress(email)) {
    addIssue(issues, "email", "invalid_format", "Enter a valid email address.");
  }

  if (enquiryTypeValue && !enquiryType) {
    addIssue(issues, "enquiryType", "invalid_value", "Choose a valid enquiry type.");
  }

  if (enquiryType?.value === enquiryTypes.booking.value) {
    const bookingTypeValue = getRequiredTextField(
      enquiryPayload,
      "bookingType",
      60,
      issues,
      "Booking request",
    );

    bookingType = findBookingType(bookingTypeValue);

    if (bookingTypeValue && !bookingType) {
      addIssue(issues, "bookingType", "invalid_value", "Choose a valid booking request.");
    }

    if (bookingType) {
      availability = getRequiredTextField(
        enquiryPayload,
        "availability",
        500,
        issues,
        "Availability",
      );
      timeZone = getRequiredTextField(
        enquiryPayload,
        "timeZone",
        60,
        issues,
        "Timezone",
      );
      timeZoneLabel = getAustralianTimeZoneLabel(timeZone);

      if (timeZone && !timeZoneLabel) {
        addIssue(issues, "timeZone", "invalid_value", "Choose a valid timezone.");
      }

      if (bookingType.value === bookingTypes.consult.value) {
        mobile = getRequiredTextField(
          enquiryPayload,
          "mobile",
          40,
          issues,
          "Mobile number",
        );
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

  return {
    enquiry: {
      ...baseEnquiry,
      availability,
      bookingType: bookingType.value,
      bookingTypeLabel: bookingType.label,
      enquiryType: enquiryType.value,
      enquiryTypeLabel: enquiryType.label,
      mobile,
      timeZone,
      timeZoneLabel,
    },
    type: "valid",
  };
}
