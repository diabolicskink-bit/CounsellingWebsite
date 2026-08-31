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

function addIssue(issues: ValidationIssue[], field: string, code: ValidationIssue["code"]) {
  issues.push({ code, field });
}

function getUuid(payload: Record<string, unknown>, field: string, issues: ValidationIssue[]) {
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

function getPath(payload: Record<string, unknown>, field: string, issues: ValidationIssue[]) {
  const value = payload[field];

  if (typeof value !== "string" || !value) {
    addIssue(issues, field, "required");
    return "";
  }

  if (value.length > 2048) {
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

function getOptionalText(
  payload: Record<string, unknown>,
  field: string,
  maxLength: number,
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

  if (normalizedValue.length > maxLength) {
    addIssue(issues, field, "too_long");
    return null;
  }

  return normalizedValue;
}

function getOptionalBoolean(
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

function getReferrer(payload: Record<string, unknown>, issues: ValidationIssue[]) {
  const value = payload.referrerUrl;

  if (typeof value === "undefined" || value === null || value === "") {
    return { host: null, url: null };
  }

  if (typeof value !== "string") {
    addIssue(issues, "referrerUrl", "invalid_type");
    return { host: null, url: null };
  }

  if (value !== value.trim() || value.length > 4096 || controlCharacterPattern.test(value)) {
    addIssue(issues, "referrerUrl", value.length > 4096 ? "too_long" : "invalid_format");
    return { host: null, url: null };
  }

  try {
    const parsedUrl = new URL(value);

    if (
      (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:")
      || !parsedUrl.hostname
      || parsedUrl.username
      || parsedUrl.password
      || parsedUrl.hostname.length > 253
    ) {
      addIssue(issues, "referrerUrl", "invalid_format");
      return { host: null, url: null };
    }

    return {
      host: parsedUrl.hostname.toLowerCase(),
      url: value,
    };
  } catch {
    addIssue(issues, "referrerUrl", "invalid_format");
    return { host: null, url: null };
  }
}

export function validateVisitPayload(payload: Record<string, unknown>): VisitValidationResult {
  const issues: ValidationIssue[] = [];
  const visitorId = getUuid(payload, "visitorId", issues);
  const visitId = getUuid(payload, "visitId", issues);
  const pageViewId = getUuid(payload, "pageViewId", issues);
  const landingPath = getPath(payload, "landingPath", issues);
  const path = getPath(payload, "path", issues);
  const referrer = getReferrer(payload, issues);
  const gclid = getOptionalText(payload, "gclid", 2048, issues);
  const adCode = getOptionalText(payload, "adCode", 128, issues);
  const networkCode = getOptionalText(payload, "networkCode", 32, issues);
  const matchedKeyword = getOptionalText(payload, "matchedKeyword", 1024, issues);
  const matchType = getOptionalText(payload, "matchType", 32, issues);
  const isWebDriver = getOptionalBoolean(payload, "isWebDriver", issues);

  if (issues.length) {
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
      referrerHost: referrer.host,
      referrerUrl: referrer.url,
      visitId,
      visitorId,
    },
    type: "valid",
  };
}
