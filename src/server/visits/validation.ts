import type { VisitObservationPayload } from "./repository.ts";
import { isPrivateRoutePath } from "../../data/routes.ts";

type ValidationIssue = {
  code: "invalid_format" | "invalid_type" | "required" | "too_long";
  field: string;
};

export type VisitValidationResult =
  | { issues: ValidationIssue[]; type: "invalid" }
  | { observation: VisitObservationPayload; type: "valid" };

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const controlCharacterPattern = /[\u0000-\u001f\u007f]/;
const optionalTextMaxLength = {
  adCode: 128,
  gclid: 2048,
  matchType: 32,
  matchedKeyword: 1024,
  networkCode: 32,
} as const;
const maxPathLength = 2048;
const maxReferrerHostLength = 253;
const maxReferrerUrlLength = 4096;

function addIssue(issues: ValidationIssue[], field: string, code: ValidationIssue["code"]) {
  issues.push({ code, field });
}

function parseUuidField(payload: Record<string, unknown>, field: string, issues: ValidationIssue[]) {
  const value = payload[field];

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

function parsePathField(payload: Record<string, unknown>, field: string, issues: ValidationIssue[]) {
  const value = payload[field];

  if (typeof value !== "string" || !value) {
    addIssue(issues, field, "required");
    return "";
  }

  if (value.length > maxPathLength) {
    addIssue(issues, field, "too_long");
    return "";
  }

  if (
    value !== value.trim()
    || !value.startsWith("/")
    || value.startsWith("//")
    || value.includes("?")
    || value.includes("#")
    || value.includes("\\")
    || controlCharacterPattern.test(value)
  ) {
    addIssue(issues, field, "invalid_format");
    return "";
  }

  const normalizedValue = value.toLowerCase();

  if (isPrivateRoutePath(normalizedValue)) {
    addIssue(issues, field, "invalid_format");
    return "";
  }

  return normalizedValue;
}

function parseOptionalTextField(
  payload: Record<string, unknown>,
  field: keyof typeof optionalTextMaxLength,
  issues: ValidationIssue[],
) {
  const value = payload[field];

  if (typeof value === "undefined" || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    addIssue(issues, field, "invalid_type");
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue || controlCharacterPattern.test(normalizedValue)) {
    addIssue(issues, field, "invalid_format");
    return null;
  }

  if (normalizedValue.length > optionalTextMaxLength[field]) {
    addIssue(issues, field, "too_long");
    return null;
  }

  return normalizedValue;
}

function parseOptionalBooleanField(
  payload: Record<string, unknown>,
  field: string,
  issues: ValidationIssue[],
) {
  const value = payload[field];

  if (typeof value === "undefined" || value === null) {
    return null;
  }

  if (typeof value !== "boolean") {
    addIssue(issues, field, "invalid_type");
    return null;
  }

  return value;
}

function parseReferrer(payload: Record<string, unknown>, issues: ValidationIssue[]) {
  const value = payload.referrerUrl;

  if (typeof value === "undefined" || value === null || value === "") {
    return { referrerHost: null, referrerUrl: null };
  }

  if (typeof value !== "string") {
    addIssue(issues, "referrerUrl", "invalid_type");
    return { referrerHost: null, referrerUrl: null };
  }

  if (value.length > maxReferrerUrlLength) {
    addIssue(issues, "referrerUrl", "too_long");
    return { referrerHost: null, referrerUrl: null };
  }

  if (value !== value.trim() || controlCharacterPattern.test(value)) {
    addIssue(issues, "referrerUrl", "invalid_format");
    return { referrerHost: null, referrerUrl: null };
  }

  try {
    const parsedUrl = new URL(value);

    if (
      (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:")
      || !parsedUrl.hostname
      || parsedUrl.username
      || parsedUrl.password
      || parsedUrl.hostname.length > maxReferrerHostLength
    ) {
      addIssue(issues, "referrerUrl", "invalid_format");
      return { referrerHost: null, referrerUrl: null };
    }

    return {
      referrerHost: parsedUrl.hostname.toLowerCase(),
      referrerUrl: value,
    };
  } catch {
    addIssue(issues, "referrerUrl", "invalid_format");
    return { referrerHost: null, referrerUrl: null };
  }
}

export function validateVisitPayload(payload: Record<string, unknown>): VisitValidationResult {
  const issues: ValidationIssue[] = [];
  const visitorId = parseUuidField(payload, "visitorId", issues);
  const visitId = parseUuidField(payload, "visitId", issues);
  const pageViewId = parseUuidField(payload, "pageViewId", issues);
  const landingPath = parsePathField(payload, "landingPath", issues);
  const path = parsePathField(payload, "path", issues);
  const referrer = parseReferrer(payload, issues);
  const gclid = parseOptionalTextField(payload, "gclid", issues);
  const adCode = parseOptionalTextField(payload, "adCode", issues);
  const networkCode = parseOptionalTextField(payload, "networkCode", issues);
  const matchedKeyword = parseOptionalTextField(payload, "matchedKeyword", issues);
  const matchType = parseOptionalTextField(payload, "matchType", issues);
  const isWebDriver = parseOptionalBooleanField(payload, "isWebDriver", issues);

  if (issues.length > 0) {
    return { issues, type: "invalid" };
  }

  return {
    observation: {
      adCode,
      gclid,
      isWebDriver,
      landingPath,
      matchType,
      matchedKeyword,
      networkCode,
      pageViewId,
      path,
      ...referrer,
      visitId,
      visitorId,
    },
    type: "valid",
  };
}
