import {
  bookingTypes,
  enquiryFieldLimits,
  enquiryTypes,
  findBookingType,
  findContactPath,
  findEnquiryType,
  type BookingTypeOption,
} from "../../data/enquiryContract.ts";
import { getAustralianTimeZoneLabel } from "../../utils/timeZones.ts";

type ValidationIssue = {
  code: "invalid_format" | "invalid_value" | "required" | "too_long";
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

function getText(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0].trim();
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
  const value = getText(payload[field]);

  if (!value) {
    addIssue(issues, field, "required", `${label} is required.`);
  } else if (value.length > maxLength) {
    addIssue(issues, field, "too_long", `${label} is too long.`);
  }

  return value;
}

function isValidEmailAddress(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function applyContactPathFallback(payload: Record<string, unknown>) {
  if (getText(payload.enquiryType)) {
    return payload;
  }

  const contactPath = findContactPath(getText(payload.contactPath));

  if (!contactPath) {
    return payload;
  }

  return {
    ...payload,
    ...("bookingType" in contactPath ? { bookingType: contactPath.bookingType } : {}),
    enquiryType: contactPath.enquiryType,
  };
}

export function validateEnquiryPayload(payload: Record<string, unknown>): ValidationResult {
  if (getText(payload.website)) {
    return { type: "honeypot" };
  }

  const enquiryPayload = applyContactPathFallback(payload);
  const issues: ValidationIssue[] = [];
  const enquiryTypeValue = getRequiredTextField(
    enquiryPayload,
    "enquiryType",
    enquiryFieldLimits.enquiryType,
    issues,
    "Enquiry type",
  );
  const enquiryType = findEnquiryType(enquiryTypeValue);
  const name = getRequiredTextField(
    enquiryPayload,
    "name",
    enquiryFieldLimits.name,
    issues,
    "Name",
  );
  const email = getRequiredTextField(
    enquiryPayload,
    "email",
    enquiryFieldLimits.email,
    issues,
    "Email",
  );
  const message = getRequiredTextField(
    enquiryPayload,
    "message",
    enquiryFieldLimits.message,
    issues,
    "Message",
  );
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
      enquiryFieldLimits.bookingType,
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
        enquiryFieldLimits.availability,
        issues,
        "Availability",
      );
      timeZone = getRequiredTextField(
        enquiryPayload,
        "timeZone",
        enquiryFieldLimits.timeZone,
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
          enquiryFieldLimits.mobile,
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
