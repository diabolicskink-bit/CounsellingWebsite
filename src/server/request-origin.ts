type OriginRequest = {
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
};

type OriginPolicy = {
  readonly allowIpv6Loopback: boolean;
};

type OriginBlockReason = "cross_site_fetch_site" | "mismatched_origin" | "mismatched_referer";

const ipv4LocalHostnames = new Set(["localhost", "127.0.0.1"]);

export function getHeader(request: OriginRequest, name: string) {
  const normalizedName = name.toLowerCase();

  return Object.entries(request.headers ?? {})
    .flatMap(([headerName, value]) => (
      headerName.toLowerCase() === normalizedName ? value ?? [] : []
    ))
    .join(", ");
}

function getOriginCandidate(value: string) {
  const candidate = value.trim();
  return candidate.toLowerCase() === "null" ? "" : candidate;
}

function parseHttpUrl(value: string) {
  const candidate = getOriginCandidate(value);
  // Do not let URL repair missing slashes, backslashes, or control characters.
  if (!/^https?:\/\/[^/?#]/i.test(candidate) || /[\\\s\u0000-\u001f\u007f]/.test(candidate)) {
    return null;
  }

  try {
    const url = new URL(candidate);
    return url.username || url.password ? null : url;
  } catch {
    return null;
  }
}

function parseHttpOrigin(value: string) {
  return parseHttpUrl(value)?.origin ?? null;
}

function parseOriginHeader(value: string) {
  const candidate = getOriginCandidate(value);
  // An Origin contains only the scheme and authority, with no URL path or suffix.
  if (!/^https?:\/\/[^/?#\\\s]+$/i.test(candidate)) return null;

  return parseHttpOrigin(candidate);
}

function parseConfiguredHttpOrigin(value: string) {
  const candidate = getOriginCandidate(value);
  return candidate
    ? parseHttpOrigin(candidate.includes("://") ? candidate : `https://${candidate}`)
    : null;
}

export const visitOriginPolicy: OriginPolicy = { allowIpv6Loopback: true };
export const enquiryOriginPolicy = visitOriginPolicy;
// Visit-event collection only needs IPv4 loopback during local development.
export const visitEventOriginPolicy: OriginPolicy = { allowIpv6Loopback: false };

function getAllowedOrigins(
  request: OriginRequest,
  environment: Readonly<Record<string, string | undefined>>,
  policy: OriginPolicy,
) {
  const origins = new Set<string>();
  const addOrigin = (origin: string | null) => {
    if (origin) origins.add(origin);
  };
  const host = getHeader(request, "host").trim();
  const forwardedProto = getHeader(request, "x-forwarded-proto").split(",")[0].trim().toLowerCase();
  const requestProto = forwardedProto === "http" ? "http" : "https";

  const requestOrigin = parseOriginHeader(`${requestProto}://${host}`);
  if (requestOrigin) {
    origins.add(requestOrigin);
    const hostname = new URL(requestOrigin).hostname;
    if (ipv4LocalHostnames.has(hostname) || (policy.allowIpv6Loopback && hostname === "[::1]")) {
      addOrigin(parseOriginHeader(`http://${host}`));
      addOrigin(parseOriginHeader(`https://${host}`));
    }
  }

  addOrigin(parseConfiguredHttpOrigin(environment.SITE_URL ?? ""));
  addOrigin(parseConfiguredHttpOrigin(environment.VERCEL_URL ?? ""));
  addOrigin(parseConfiguredHttpOrigin(environment.VERCEL_BRANCH_URL ?? ""));
  return origins;
}

export function getCrossSiteBlockReason(
  request: OriginRequest,
  environment: Readonly<Record<string, string | undefined>>,
  policy: OriginPolicy,
): OriginBlockReason | null {
  if (getHeader(request, "sec-fetch-site").trim().toLowerCase() === "cross-site") {
    return "cross_site_fetch_site";
  }

  const allowedOrigins = getAllowedOrigins(request, environment, policy);
  const originHeader = getHeader(request, "origin");
  if (originHeader.trim()) {
    const origin = parseOriginHeader(originHeader);
    return origin && allowedOrigins.has(origin) ? null : "mismatched_origin";
  }

  const refererHeader = getHeader(request, "referer");
  if (refererHeader.trim()) {
    const origin = parseHttpOrigin(refererHeader);
    if (!origin || !allowedOrigins.has(origin)) return "mismatched_referer";
  }

  return null;
}

function getSafeOriginForLog(value: string) {
  return value.trim() ? parseHttpOrigin(value) ?? "invalid" : "";
}

export function getBlockedRequestLogDetails(
  request: OriginRequest,
  block: { reason: string; status: number },
) {
  return {
    contentLength: getHeader(request, "content-length"),
    contentType: getHeader(request, "content-type"),
    fetchSite: getHeader(request, "sec-fetch-site"),
    host: getHeader(request, "host"),
    method: request.method ?? "",
    origin: getSafeOriginForLog(getHeader(request, "origin")),
    reason: block.reason,
    refererOrigin: getSafeOriginForLog(getHeader(request, "referer")),
    status: block.status,
  };
}
