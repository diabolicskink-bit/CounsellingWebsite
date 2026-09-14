import {
  getBlockedRequestLogDetails,
  getCrossSiteBlockReason,
  getHeader,
  visitEventOriginPolicy,
} from "../request-origin.ts";

export type VisitEventRequest = {
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
};

export type VisitEventResponse = {
  end(): unknown;
  json(body: unknown): unknown;
  setHeader(name: string, value: string): void;
  status(statusCode: number): VisitEventResponse;
};

export type VisitEventRequestShapeBlock = {
  reason: string;
  status: number;
};

const maxVisitEventBodyBytes = 4 * 1024;

function getMediaType(contentType: string) {
  return contentType.split(";")[0].trim().toLowerCase();
}

function getDeclaredContentLength(request: VisitEventRequest) {
  const contentLength = getHeader(request, "content-length").trim();

  if (!contentLength) {
    return { valid: true, value: undefined };
  }

  const parsedLength = Number(contentLength);

  if (!Number.isInteger(parsedLength) || parsedLength < 0) {
    return { valid: false, value: undefined };
  }

  return { valid: true, value: parsedLength };
}

function getBodyByteLength(request: VisitEventRequest) {
  try {
    const serializedBody = typeof request.body === "string"
      ? request.body
      : JSON.stringify(request.body);

    return typeof serializedBody === "string"
      ? new TextEncoder().encode(serializedBody).length
      : 0;
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

export function getVisitEventRequestShapeBlock(
  request: VisitEventRequest,
): VisitEventRequestShapeBlock | null {
  if (getMediaType(getHeader(request, "content-type")) !== "application/json") {
    return { reason: "unsupported_content_type", status: 415 };
  }

  const declaredContentLength = getDeclaredContentLength(request);

  if (!declaredContentLength.valid) {
    return { reason: "invalid_content_length", status: 400 };
  }

  if (
    (typeof declaredContentLength.value === "number"
      && declaredContentLength.value > maxVisitEventBodyBytes)
    || getBodyByteLength(request) > maxVisitEventBodyBytes
  ) {
    return { reason: "body_too_large", status: 413 };
  }

  const crossSiteBlockReason = getCrossSiteBlockReason(request, process.env, visitEventOriginPolicy);

  if (crossSiteBlockReason) {
    return { reason: crossSiteBlockReason, status: 403 };
  }

  return null;
}

export function logBlockedVisitEventRequest(
  request: VisitEventRequest,
  block: VisitEventRequestShapeBlock,
) {
  console.warn(
    "Visit event request blocked:",
    getBlockedRequestLogDetails(request, block, visitEventOriginPolicy),
  );
}

export function getVisitEventPayloadBody(
  request: VisitEventRequest,
): Record<string, unknown> {
  const { body } = request;

  if (typeof body === "string") {
    try {
      const parsedBody = JSON.parse(body);

      return parsedBody && typeof parsedBody === "object" && !Array.isArray(parsedBody)
        ? (parsedBody as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }

  return body && typeof body === "object" && !Array.isArray(body)
    ? (body as Record<string, unknown>)
    : {};
}
