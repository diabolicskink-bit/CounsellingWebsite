import { getHeader } from "./request-origin.ts";

type BodyRequest = {
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type JsonRequestBodyBlock = {
  reason: "unsupported_content_type" | "invalid_content_length" | "body_too_large";
  status: 400 | 413 | 415;
};

export function getMediaType(contentType: string) {
  return contentType.split(";")[0].trim().toLowerCase();
}

function getJsonBodyByteLength(body: unknown) {
  try {
    const serializedBody = typeof body === "string" ? body : JSON.stringify(body);
    return typeof serializedBody === "string"
      ? new TextEncoder().encode(serializedBody).length
      : 0;
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

export function getJsonRequestBodyBlock(
  request: BodyRequest,
  maximumBodyBytes: number,
): JsonRequestBodyBlock | null {
  if (getMediaType(getHeader(request, "content-type")) !== "application/json") {
    return { reason: "unsupported_content_type", status: 415 };
  }

  const declaredLength = Number(getHeader(request, "content-length").trim());
  if (!Number.isInteger(declaredLength) || declaredLength < 0) {
    return { reason: "invalid_content_length", status: 400 };
  }

  if (declaredLength > maximumBodyBytes || getJsonBodyByteLength(request.body) > maximumBodyBytes) {
    return { reason: "body_too_large", status: 413 };
  }

  return null;
}

export function getJsonPayloadBody(request: BodyRequest): Record<string, unknown> {
  let { body } = request;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body !== null && typeof body === "object" && !Array.isArray(body)
    ? body as Record<string, unknown>
    : {};
}
