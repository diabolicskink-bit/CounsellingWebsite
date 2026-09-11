import {
  australianVisitRegionCodes,
  type AustralianVisitRegionCode,
  type VisitDeviceType,
  type VisitRequestEnvironment,
} from "../../data/visitClientEnvironment.ts";

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

type VisitRequestBlockReason =
  | "body_too_large"
  | "cross_site_fetch_site"
  | "invalid_content_length"
  | "mismatched_origin"
  | "mismatched_referer"
  | "unsupported_content_type";

export type VisitRequestShapeBlock = {
  reason: VisitRequestBlockReason;
  status: 400 | 403 | 413 | 415;
};

const maxVisitBodyBytes = 16 * 1024;
const maxUserAgentLength = 1024;
const controlCharacterPattern = /[\u0000-\u001f\u007f]/;
const desktopUserAgentPattern = /windows nt|macintosh|cros|x11|linux x86_64/;
const mobileUserAgentPattern = /iphone|ipod|mobile|windows phone/;
const tabletUserAgentPattern = /ipad|tablet|kindle|playbook|silk|macintosh.*mobile/;
const localHostnames = new Set(["localhost", "127.0.0.1", "[::1]"]);
const countryCodePattern = /^[A-Z]{2}$/;
const australianRegionCodes = new Set<string>(australianVisitRegionCodes);

function isAustralianVisitRegionCode(value: string): value is AustralianVisitRegionCode {
  return australianRegionCodes.has(value);
}

function getHeader(request: VisitRequest, name: string) {
  const headers = request.headers ?? {};
  const normalizedName = name.toLowerCase();
  const headerName = Object.keys(headers).find((key) => key.toLowerCase() === normalizedName);
  const headerValue = headerName ? headers[headerName] : undefined;

  if (Array.isArray(headerValue)) {
    return headerValue.join(", ");
  }

  return headerValue ?? "";
}

function getStoredUserAgent(request: VisitRequest) {
  const userAgent = getHeader(request, "user-agent").trim();

  if (!userAgent || controlCharacterPattern.test(userAgent)) {
    return null;
  }

  return userAgent.slice(0, maxUserAgentLength);
}

function getDeviceType(request: VisitRequest, userAgent: string | null): VisitDeviceType {
  const normalizedUserAgent = userAgent?.toLowerCase() ?? "";
  const mobileHint = getHeader(request, "sec-ch-ua-mobile").trim();
  const isTablet = tabletUserAgentPattern.test(normalizedUserAgent)
    || (/android/.test(normalizedUserAgent) && !/mobile/.test(normalizedUserAgent));

  if (isTablet) {
    return "tablet";
  }
  if (mobileHint === "?1" || mobileUserAgentPattern.test(normalizedUserAgent)) {
    return "mobile";
  }
  if (mobileHint === "?0" || desktopUserAgentPattern.test(normalizedUserAgent)) {
    return "desktop";
  }

  return "unknown";
}

function getVisitLocation(
  request: VisitRequest,
): Pick<VisitRequestEnvironment, "locationCountryCode" | "locationRegionCode"> {
  const countryCode = getHeader(request, "x-vercel-ip-country").trim().toUpperCase();

  if (!countryCodePattern.test(countryCode)) {
    return { locationCountryCode: null, locationRegionCode: null };
  }

  if (countryCode !== "AU") {
    return { locationCountryCode: countryCode, locationRegionCode: null };
  }

  const regionCode = getHeader(request, "x-vercel-ip-country-region").trim().toUpperCase();

  if (!isAustralianVisitRegionCode(regionCode)) {
    return { locationCountryCode: null, locationRegionCode: null };
  }

  return { locationCountryCode: countryCode, locationRegionCode: regionCode };
}

export function getVisitRequestEnvironment(request: VisitRequest): VisitRequestEnvironment {
  const userAgent = getStoredUserAgent(request);

  return {
    deviceType: getDeviceType(request, userAgent),
    ...getVisitLocation(request),
    userAgent,
  };
}

function getMediaType(contentType: string) {
  return contentType.split(";")[0].trim().toLowerCase();
}

function parseHttpUrl(value: string) {
  const candidate = value.trim();

  if (!candidate || candidate.toLowerCase() === "null") {
    return null;
  }

  try {
    const url = new URL(candidate);

    return (
      (url.protocol === "http:" || url.protocol === "https:")
      && !url.username
      && !url.password
    )
      ? url
      : null;
  } catch {
    return null;
  }
}

function parseHttpOrigin(value: string) {
  return parseHttpUrl(value)?.origin.toLowerCase() ?? null;
}

function parseConfiguredOrigin(value: string | undefined) {
  const candidate = value?.trim() ?? "";

  if (!candidate || candidate.toLowerCase() === "null") {
    return null;
  }

  return parseHttpOrigin(candidate.includes("://") ? candidate : `https://${candidate}`);
}

function addAllowedOrigin(origins: Set<string>, origin: string | null) {
  if (origin) {
    origins.add(origin);
  }
}

function isLocalHost(host: string) {
  const hostname = parseHttpUrl(`http://${host}`)?.hostname.toLowerCase();

  return Boolean(hostname && localHostnames.has(hostname));
}

function getAllowedOrigins(request: VisitRequest) {
  const origins = new Set<string>();
  const host = getHeader(request, "host").trim();
  const forwardedProto = getHeader(request, "x-forwarded-proto").split(",")[0].trim().toLowerCase();
  const requestProto = forwardedProto === "http" ? "http" : "https";

  if (host) {
    addAllowedOrigin(origins, parseHttpOrigin(`${requestProto}://${host}`));

    if (isLocalHost(host)) {
      addAllowedOrigin(origins, parseHttpOrigin(`http://${host}`));
      addAllowedOrigin(origins, parseHttpOrigin(`https://${host}`));
    }
  }

  addAllowedOrigin(origins, parseConfiguredOrigin(process.env.SITE_URL));
  addAllowedOrigin(origins, parseConfiguredOrigin(process.env.VERCEL_URL));
  addAllowedOrigin(origins, parseConfiguredOrigin(process.env.VERCEL_BRANCH_URL));

  return origins;
}

function parseOriginHeader(headerValue: string) {
  const url = parseHttpUrl(headerValue);

  if (!url || url.pathname !== "/" || url.search || url.hash) {
    return null;
  }

  return url.origin.toLowerCase();
}

function isAllowedOrigin(origin: string | null, allowedOrigins: Set<string>) {
  return origin !== null && allowedOrigins.has(origin);
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

function getCrossSiteBlockReason(request: VisitRequest): VisitRequestBlockReason | null {
  const fetchSite = getHeader(request, "sec-fetch-site").trim().toLowerCase();

  if (fetchSite === "cross-site") {
    return "cross_site_fetch_site";
  }

  const allowedOrigins = getAllowedOrigins(request);
  const originHeader = getHeader(request, "origin");

  if (originHeader.trim()) {
    if (!isAllowedOrigin(parseOriginHeader(originHeader), allowedOrigins)) {
      return "mismatched_origin";
    }

    return null;
  }

  const refererHeader = getHeader(request, "referer");

  if (
    refererHeader.trim()
    && !isAllowedOrigin(parseHttpOrigin(refererHeader), allowedOrigins)
  ) {
    return "mismatched_referer";
  }

  return null;
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
  if (!headerValue.trim()) {
    return "";
  }

  return parseHttpOrigin(headerValue) ?? "invalid";
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function getVisitPayloadBody(request: VisitRequest): Record<string, unknown> {
  let { body } = request;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return {};
    }
  }

  return isRecord(body) ? body : {};
}
