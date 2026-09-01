import {
  contactOptionValues,
  visitEventTypes,
  type ClientVisitEventType,
  type VisitEventProperties,
} from "../../data/visitEventContract.ts";

type ValidationIssue = {
  code: "invalid_format" | "invalid_type" | "required" | "unexpected";
  field: string;
};

export type ClientVisitEventObservation = {
  eventId: string;
  eventType: ClientVisitEventType;
  pageViewId: string | null;
  properties: VisitEventProperties;
  visitId: string;
};

export type VisitEventValidationResult =
  | { issues: ValidationIssue[]; type: "invalid" }
  | { observation: ClientVisitEventObservation; type: "valid" };

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const allowedPayloadFields = new Set([
  "eventId",
  "eventType",
  "pageViewId",
  "properties",
  "visitId",
]);

function addIssue(issues: ValidationIssue[], field: string, code: ValidationIssue["code"]) {
  issues.push({ code, field });
}

function getUuid(
  payload: Record<string, unknown>,
  field: string,
  issues: ValidationIssue[],
  optional = false,
) {
  const value = payload[field];

  if (optional && (typeof value === "undefined" || value === null || value === "")) {
    return null;
  }

  if (typeof value !== "string" || !value.trim()) {
    addIssue(issues, field, "required");
    return "";
  }

  const normalizedValue = value.trim().toLowerCase();

  if (!uuidV4Pattern.test(normalizedValue)) {
    addIssue(issues, field, "invalid_format");
    return "";
  }

  return normalizedValue;
}

function getEventType(payload: Record<string, unknown>, issues: ValidationIssue[]) {
  const value = payload.eventType;

  if (value === visitEventTypes.contactOptionSelected || value === visitEventTypes.enquiryStarted) {
    return value;
  }

  addIssue(
    issues,
    "eventType",
    typeof value === "undefined" || value === "" ? "required" : "invalid_format",
  );
  return visitEventTypes.enquiryStarted;
}

function getProperties(
  payload: Record<string, unknown>,
  eventType: ClientVisitEventType,
  issues: ValidationIssue[],
): VisitEventProperties {
  const value = payload.properties;

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    addIssue(
      issues,
      "properties",
      typeof value === "undefined" || value === null ? "required" : "invalid_type",
    );
    return {};
  }

  const properties = value as Record<string, unknown>;
  const propertyKeys = Object.keys(properties);

  if (eventType === visitEventTypes.enquiryStarted) {
    if (propertyKeys.length) {
      addIssue(issues, "properties", "unexpected");
    }

    return {};
  }

  if (propertyKeys.length !== 1 || propertyKeys[0] !== "option") {
    addIssue(issues, "properties", "unexpected");
    return {};
  }

  const option = properties.option;

  if (
    typeof option !== "string"
    || !(contactOptionValues as readonly string[]).includes(option)
  ) {
    addIssue(issues, "properties.option", "invalid_format");
    return {};
  }

  return { option };
}

export function validateClientVisitEventPayload(
  payload: Record<string, unknown>,
): VisitEventValidationResult {
  const issues: ValidationIssue[] = [];

  for (const field of Object.keys(payload)) {
    if (!allowedPayloadFields.has(field)) {
      addIssue(issues, field, "unexpected");
    }
  }

  const eventId = getUuid(payload, "eventId", issues) ?? "";
  const visitId = getUuid(payload, "visitId", issues) ?? "";
  const pageViewId = getUuid(payload, "pageViewId", issues, true);
  const eventType = getEventType(payload, issues);
  const properties = getProperties(payload, eventType, issues);

  if (issues.length) {
    return { issues, type: "invalid" };
  }

  return {
    observation: {
      eventId,
      eventType,
      pageViewId,
      properties,
      visitId,
    },
    type: "valid",
  };
}
