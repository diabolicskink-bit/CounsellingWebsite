import {
  getBlockedRequestLogDetails,
  getCrossSiteBlockReason,
  getHeader,
  visitOriginPolicy,
} from "../request-origin.ts";
import { getJsonRequestBodyBlock } from "../request-body.ts";
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
const countryCodePattern = /^[A-Z]{2}$/;
const australianRegionCodes = new Set<string>(australianVisitRegionCodes);

function isAustralianVisitRegionCode(value: string): value is AustralianVisitRegionCode {
  return australianRegionCodes.has(value);
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

export function getVisitRequestShapeBlock(request: VisitRequest): VisitRequestShapeBlock | null {
  const bodyBlock = getJsonRequestBodyBlock(request, maxVisitBodyBytes);
  if (bodyBlock) return bodyBlock;

  const crossSiteBlockReason = getCrossSiteBlockReason(request, process.env, visitOriginPolicy);

  if (crossSiteBlockReason) {
    return { reason: crossSiteBlockReason, status: 403 };
  }

  return null;
}

export function logBlockedVisitRequest(request: VisitRequest, block: VisitRequestShapeBlock) {
  console.warn("Visit request blocked:", getBlockedRequestLogDetails(request, block, visitOriginPolicy));
}
