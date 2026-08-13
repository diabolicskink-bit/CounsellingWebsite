export type VisitRequest = {
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
};

export type VisitResponse = {
  end(): unknown;
  json(body: unknown): unknown;
  setHeader(name: string, value: string): void;
  status(statusCode: number): VisitResponse;
};

export type VisitRequestShapeBlock = {
  reason: string;
  status: number;
};

type ParsedHeaderOrigin = {
  origin: string;
  valid: boolean;
};

const maxVisitBodyBytes = 16 * 1024;

function getHeader(request: VisitRequest, name: string) {
  const headers = request.headers ?? {};
  const headerName = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  const headerValue = headerName ? headers[headerName] : undefined;

  if (Array.isArray(headerValue)) {
    return headerValue.join(", ");
  }

  return headerValue ?? "";
}

function getMediaType(contentType: string) {
  return contentType.split(";")[0].trim().toLowerCase();
}

function getNormalizedOrigin(value: string) {
  const candidate = value.trim();

  if (!candidate || candidate.toLowerCase() === "null") {
    return "";
  }

  try {
    const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);

    return url.origin.toLowerCase();
  } catch {
    return "";
  }
}

function addAllowedOrigin(origins: Set<string>, value: string | undefined) {
  const origin = getNormalizedOrigin(value ?? "");

  if (origin) {
    origins.add(origin);
  }
}

function isLocalHost(host: string) {
  const hostname = host.split(":")[0].toLowerCase();

  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]";
}

function getAllowedOrigins(request: VisitRequest) {
  const origins = new Set<string>();
  const host = getHeader(request, "host").trim();
  const forwardedProto = getHeader(request, "x-forwarded-proto").split(",")[0].trim().toLowerCase();
  const requestProto = forwardedProto === "http" ? "http" : "https";

  if (host) {
    addAllowedOrigin(origins, `${requestProto}://${host}`);

    if (isLocalHost(host)) {
      addAllowedOrigin(origins, `http://${host}`);
      addAllowedOrigin(origins, `https://${host}`);
    }
  }

  addAllowedOrigin(origins, process.env.SITE_URL);
  addAllowedOrigin(origins, process.env.VERCEL_URL);
  addAllowedOrigin(origins, process.env.VERCEL_BRANCH_URL);

  return origins;
}

function getHeaderOrigin(headerValue: string): ParsedHeaderOrigin {
  if (!headerValue.trim()) {
    return { origin: "", valid: true };
  }

  const origin = getNormalizedOrigin(headerValue);

  return { origin, valid: Boolean(origin) };
}

function isAllowedHeaderOrigin(headerValue: string, allowedOrigins: Set<string>) {
  const parsedOrigin = getHeaderOrigin(headerValue);

  return parsedOrigin.valid && Boolean(parsedOrigin.origin) && allowedOrigins.has(parsedOrigin.origin);
}

function getDeclaredContentLength(request: VisitRequest) {
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

function getBodyByteLength(request: VisitRequest) {
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

function getCrossSiteBlockReason(request: VisitRequest) {
  const fetchSite = getHeader(request, "sec-fetch-site").trim().toLowerCase();

  if (fetchSite === "cross-site") {
    return "cross_site_fetch_site";
  }

  const allowedOrigins = getAllowedOrigins(request);
  const originHeader = getHeader(request, "origin");

  if (originHeader.trim()) {
    if (!isAllowedHeaderOrigin(originHeader, allowedOrigins)) {
      return "mismatched_origin";
    }

    return "";
  }

  const refererHeader = getHeader(request, "referer");

  if (refererHeader.trim() && !isAllowedHeaderOrigin(refererHeader, allowedOrigins)) {
    return "mismatched_referer";
  }

  return "";
}

export function getVisitRequestShapeBlock(request: VisitRequest): VisitRequestShapeBlock | null {
  if (getMediaType(getHeader(request, "content-type")) !== "application/json") {
    return { reason: "unsupported_content_type", status: 415 };
  }

  const declaredContentLength = getDeclaredContentLength(request);

  if (!declaredContentLength.valid) {
    return { reason: "invalid_content_length", status: 400 };
  }

  if (
    (typeof declaredContentLength.value === "number" && declaredContentLength.value > maxVisitBodyBytes)
    || getBodyByteLength(request) > maxVisitBodyBytes
  ) {
    return { reason: "body_too_large", status: 413 };
  }

  const crossSiteBlockReason = getCrossSiteBlockReason(request);

  if (crossSiteBlockReason) {
    return { reason: crossSiteBlockReason, status: 403 };
  }

  return null;
}

function getSafeOriginForLog(headerValue: string) {
  const parsedOrigin = getHeaderOrigin(headerValue);

  if (!headerValue.trim()) {
    return "";
  }

  return parsedOrigin.valid ? parsedOrigin.origin : "invalid";
}

export function logBlockedVisitRequest(request: VisitRequest, block: VisitRequestShapeBlock) {
  console.warn("Visit request blocked:", {
    contentLength: getHeader(request, "content-length"),
    contentType: getHeader(request, "content-type"),
    fetchSite: getHeader(request, "sec-fetch-site"),
    host: getHeader(request, "host"),
    method: request.method ?? "",
    origin: getSafeOriginForLog(getHeader(request, "origin")),
    reason: block.reason,
    refererOrigin: getSafeOriginForLog(getHeader(request, "referer")),
    status: block.status,
  });
}

export function getVisitPayloadBody(request: VisitRequest): Record<string, unknown> {
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
