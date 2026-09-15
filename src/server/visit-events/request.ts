import {
  getBlockedRequestLogDetails,
  getCrossSiteBlockReason,
  visitEventOriginPolicy,
} from "../request-origin.ts";
import { getJsonRequestBodyBlock } from "../request-body.ts";

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

export function getVisitEventRequestShapeBlock(
  request: VisitEventRequest,
): VisitEventRequestShapeBlock | null {
  const bodyBlock = getJsonRequestBodyBlock(request, maxVisitEventBodyBytes);
  if (bodyBlock) return bodyBlock;

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
