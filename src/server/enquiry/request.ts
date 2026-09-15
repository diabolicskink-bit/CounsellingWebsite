import {
  getBlockedRequestLogDetails,
  getCrossSiteBlockReason,
  getHeader,
  enquiryOriginPolicy,
} from "../request-origin.ts";
import { getJsonPayloadBody, getMediaType } from "../request-body.ts";

export type EnquiryRequest = {
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
};

export type ResponseMode = "html" | "json";

type RequestShapeBlock = {
  reason: string;
  status: number;
};

const maxEnquiryBodyBytes = 25 * 1024;

function isJsonContentType(contentType: string) {
  return getMediaType(contentType) === "application/json";
}

function isFormContentType(contentType: string) {
  return getMediaType(contentType) === "application/x-www-form-urlencoded";
}

export function getResponseMode(request: EnquiryRequest): ResponseMode {
  const contentType = getHeader(request, "content-type").toLowerCase();
  const accept = getHeader(request, "accept").toLowerCase();

  if (isFormContentType(contentType)) {
    return "html";
  }

  if (accept.includes("text/html") && !accept.includes("application/json")) {
    return "html";
  }

  return "json";
}

function getDeclaredContentLength(request: EnquiryRequest) {
  const contentLength = getHeader(request, "content-length").trim();

  if (!contentLength) {
    return undefined;
  }

  const parsedLength = Number(contentLength);

  return Number.isFinite(parsedLength) && parsedLength >= 0 ? parsedLength : undefined;
}

function getBodyByteLength(request: EnquiryRequest) {
  if (typeof request.body === "string") {
    return new TextEncoder().encode(request.body).length;
  }

  if (request.body instanceof URLSearchParams) {
    return new TextEncoder().encode(request.body.toString()).length;
  }

  return undefined;
}

export function getRequestShapeBlock(
  request: EnquiryRequest,
  environment: Readonly<Record<string, string | undefined>>,
): RequestShapeBlock | null {
  const contentType = getHeader(request, "content-type");

  if (!isJsonContentType(contentType) && !isFormContentType(contentType)) {
    return { reason: "unsupported_content_type", status: 415 };
  }

  const declaredContentLength = getDeclaredContentLength(request);
  const bodyByteLength = getBodyByteLength(request);

  if (
    (typeof declaredContentLength === "number" && declaredContentLength > maxEnquiryBodyBytes) ||
    (typeof bodyByteLength === "number" && bodyByteLength > maxEnquiryBodyBytes)
  ) {
    return { reason: "body_too_large", status: 413 };
  }

  const crossSiteBlockReason = getCrossSiteBlockReason(request, environment, enquiryOriginPolicy);

  if (crossSiteBlockReason) {
    return { reason: crossSiteBlockReason, status: 403 };
  }

  return null;
}

export function logBlockedEnquiryRequest(
  request: EnquiryRequest,
  block: RequestShapeBlock,
  logWarning: (...data: unknown[]) => void,
) {
  logWarning("Enquiry request blocked:", getBlockedRequestLogDetails(request, block, enquiryOriginPolicy));
}

export function getPayloadBody(request: EnquiryRequest): Record<string, unknown> {
  const { body: requestBody } = request;
  const contentType = getHeader(request, "content-type").toLowerCase();

  if (requestBody instanceof URLSearchParams) {
    return Object.fromEntries(requestBody.entries());
  }

  if (typeof requestBody === "string" && isFormContentType(contentType)) {
    return Object.fromEntries(new URLSearchParams(requestBody).entries());
  }

  return getJsonPayloadBody(request);
}
