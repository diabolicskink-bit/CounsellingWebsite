declare const process: {
  env: Record<string, string | undefined>;
};

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

type ParsedHeaderOrigin = {
  origin: string;
  valid: boolean;
};

const maxEnquiryBodyBytes = 25 * 1024;

function getHeader(request: EnquiryRequest, name: string) {
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

function getAllowedOrigins(request: EnquiryRequest) {
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

function getCrossSiteBlockReason(request: EnquiryRequest) {
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

export function getRequestShapeBlock(request: EnquiryRequest): RequestShapeBlock | null {
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

export function logBlockedEnquiryRequest(request: EnquiryRequest, block: RequestShapeBlock) {
  console.warn("Enquiry request blocked:", {
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

export function getPayloadBody(request: EnquiryRequest): Record<string, unknown> {
  const { body: requestBody } = request;
  const contentType = getHeader(request, "content-type").toLowerCase();

  if (requestBody instanceof URLSearchParams) {
    return Object.fromEntries(requestBody.entries());
  }

  if (typeof requestBody === "string") {
    if (isFormContentType(contentType)) {
      return Object.fromEntries(new URLSearchParams(requestBody).entries());
    }

    try {
      const parsedBody = JSON.parse(requestBody);

      return parsedBody && typeof parsedBody === "object" && !Array.isArray(parsedBody)
        ? (parsedBody as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }

  return requestBody && typeof requestBody === "object" && !Array.isArray(requestBody)
    ? (requestBody as Record<string, unknown>)
    : {};
}
