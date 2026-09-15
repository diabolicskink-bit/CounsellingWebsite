type OriginRequest = {
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
};

type OriginPolicy = {
  parseHeaderOrigin(value: string): string | null;
  parseUrlOrigin(value: string): string | null;
  parseConfiguredOrigin(value: string): string | null;
  isLocalHost(host: string): boolean;
};

type OriginBlockReason = "cross_site_fetch_site" | "mismatched_origin" | "mismatched_referer";

const localHostnames = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function getHeader(request: OriginRequest, name: string) {
  const headers = request.headers ?? {};
  const normalizedName = name.toLowerCase();
  const headerName = Object.keys(headers).find((key) => key.toLowerCase() === normalizedName);
  const value = headerName ? headers[headerName] : undefined;

  return Array.isArray(value) ? value.join(", ") : value ?? "";
}

function getOriginCandidate(value: string) {
  const candidate = value.trim();
  return candidate.toLowerCase() === "null" ? "" : candidate;
}

function parseHttpUrl(value: string) {
  const candidate = getOriginCandidate(value);
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    return (url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password
      ? url
      : null;
  } catch {
    return null;
  }
}

function parseHttpOrigin(value: string) {
  return parseHttpUrl(value)?.origin.toLowerCase() ?? null;
}

function parseOriginHeader(value: string) {
  const url = parseHttpUrl(value);
  return url && url.pathname === "/" && !url.search && !url.hash
    ? url.origin.toLowerCase()
    : null;
}

function parseConfiguredHttpOrigin(value: string) {
  const candidate = getOriginCandidate(value);
  return candidate
    ? parseHttpOrigin(candidate.includes("://") ? candidate : `https://${candidate}`)
    : null;
}

function parseNormalizedOrigin(value: string) {
  const candidate = getOriginCandidate(value);
  if (!candidate) return null;

  try {
    return new URL(candidate.includes("://") ? candidate : `https://${candidate}`).origin.toLowerCase();
  } catch {
    return null;
  }
}

export const visitOriginPolicy: OriginPolicy = {
  parseHeaderOrigin: parseOriginHeader,
  parseUrlOrigin: parseHttpOrigin,
  parseConfiguredOrigin: parseConfiguredHttpOrigin,
  isLocalHost(host) {
    const hostname = parseHttpUrl(`http://${host}`)?.hostname.toLowerCase();
    return Boolean(hostname && localHostnames.has(hostname));
  },
};

export const enquiryOriginPolicy: OriginPolicy = {
  parseHeaderOrigin: parseOriginHeader,
  parseUrlOrigin: parseNormalizedOrigin,
  parseConfiguredOrigin: parseNormalizedOrigin,
  isLocalHost(host) {
    try {
      const hostname = new URL(`http://${host}`).hostname.replace(/^\[|\]$/g, "").toLowerCase();
      return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
    } catch {
      return false;
    }
  },
};

export const visitEventOriginPolicy: OriginPolicy = {
  ...enquiryOriginPolicy,
  isLocalHost(host) {
    // Preserve the event endpoint's local IPv6 behaviour pending DEBT-47.
    const hostname = host.split(":")[0].toLowerCase();
    return localHostnames.has(hostname) || hostname === "::1";
  },
};

function getAllowedOrigins(
  request: OriginRequest,
  environment: Readonly<Record<string, string | undefined>>,
  policy: OriginPolicy,
) {
  const origins = new Set<string>();
  const addOrigin = (value: string) => {
    const origin = policy.parseConfiguredOrigin(value);
    if (origin) origins.add(origin);
  };
  const host = getHeader(request, "host").trim();
  const forwardedProto = getHeader(request, "x-forwarded-proto").split(",")[0].trim().toLowerCase();
  const requestProto = forwardedProto === "http" ? "http" : "https";

  if (host) {
    addOrigin(`${requestProto}://${host}`);
    if (policy.isLocalHost(host)) {
      addOrigin(`http://${host}`);
      addOrigin(`https://${host}`);
    }
  }

  addOrigin(environment.SITE_URL ?? "");
  addOrigin(environment.VERCEL_URL ?? "");
  addOrigin(environment.VERCEL_BRANCH_URL ?? "");
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
    const origin = policy.parseHeaderOrigin(originHeader);
    return origin && allowedOrigins.has(origin) ? null : "mismatched_origin";
  }

  const refererHeader = getHeader(request, "referer");
  if (refererHeader.trim()) {
    const origin = policy.parseUrlOrigin(refererHeader);
    if (!origin || !allowedOrigins.has(origin)) return "mismatched_referer";
  }

  return null;
}

function getSafeOriginForLog(value: string, policy: OriginPolicy) {
  return value.trim() ? policy.parseUrlOrigin(value) ?? "invalid" : "";
}

export function getBlockedRequestLogDetails(
  request: OriginRequest,
  block: { reason: string; status: number },
  policy: OriginPolicy,
) {
  return {
    contentLength: getHeader(request, "content-length"),
    contentType: getHeader(request, "content-type"),
    fetchSite: getHeader(request, "sec-fetch-site"),
    host: getHeader(request, "host"),
    method: request.method ?? "",
    origin: getSafeOriginForLog(getHeader(request, "origin"), policy),
    reason: block.reason,
    refererOrigin: getSafeOriginForLog(getHeader(request, "referer"), policy),
    status: block.status,
  };
}
