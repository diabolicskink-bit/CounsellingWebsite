import { Buffer } from "node:buffer";
import { getHeader } from "./request-origin.ts";

type BodyRequest = {
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type JsonRequestBodyBlock =
  | { reason: "unsupported_content_type"; status: 415 }
  | { reason: "invalid_content_length"; status: 400 }
  | { reason: "body_too_large"; status: 413 };

export function getMediaType(contentType: string) {
  return contentType.split(";")[0].trim().toLowerCase();
}

function getJsonBodyByteLength(body: unknown) {
  try {
    const serializedBody = typeof body === "string" ? body : JSON.stringify(body);
    return Buffer.byteLength(serializedBody ?? "", "utf8");
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

  const contentLength = getHeader(request, "content-length").trim();
  if (contentLength && !/^\d+$/.test(contentLength)) {
    return { reason: "invalid_content_length", status: 400 };
  }

  if (
    Number(contentLength) > maximumBodyBytes
    || getJsonBodyByteLength(request.body) > maximumBodyBytes
  ) {
    return { reason: "body_too_large", status: 413 };
  }

  return null;
}

export function getJsonPayloadBody({ body }: BodyRequest): Record<string, unknown> {
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
