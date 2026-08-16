import { randomUUID } from "node:crypto";
import { deliverEnquiry } from "../src/server/enquiry/delivery.ts";
import {
  getPayloadBody,
  getRequestShapeBlock,
  getResponseMode,
  logBlockedEnquiryRequest,
  type EnquiryRequest,
} from "../src/server/enquiry/request.ts";
import {
  sendPublicFailure,
  sendSuccess,
  sendValidationError,
  type EnquiryResponse,
} from "../src/server/enquiry/response.ts";
import { validateEnquiryPayload } from "../src/server/enquiry/validation.ts";
import type {
  VisitEventProperties,
  VisitEventSource,
  VisitEventType,
} from "../src/data/visitEventContract.ts";
import {
  recordVisitEvent as persistVisitEvent,
} from "../src/server/visit-events/repository.ts";

declare const process: {
  env: Record<string, string | undefined>;
};

type EnquiryHandlerDependencies = {
  environment: Readonly<Record<string, string | undefined>>;
  fetch: typeof globalThis.fetch;
  logError: (...data: unknown[]) => void;
  logWarning: (...data: unknown[]) => void;
  recordVisitEvent: (observation: {
    eventId: string;
    eventType: VisitEventType;
    pageViewId: string | null;
    properties: VisitEventProperties;
    source: VisitEventSource;
    visitId: string;
  }) => Promise<unknown>;
};

type EnquiryAnalyticsContext = {
  pageViewId: string | null;
  visitId: string;
};

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getUuid(value: unknown) {
  if (typeof value !== "string") return null;
  const normalizedValue = value.trim().toLowerCase();
  return uuidV4Pattern.test(normalizedValue) ? normalizedValue : null;
}

function getEnquiryAnalyticsContext(payload: Record<string, unknown>): EnquiryAnalyticsContext | null {
  const visitId = getUuid(payload.analyticsVisitId);

  if (!visitId) return null;

  return {
    pageViewId: getUuid(payload.analyticsPageViewId),
    visitId,
  };
}

async function recordEnquiryEvent(
  context: EnquiryAnalyticsContext | null,
  eventType: Extract<VisitEventType, "enquiry_submit_attempted" | "enquiry_sent" | "enquiry_failed">,
  properties: VisitEventProperties,
  dependencies: EnquiryHandlerDependencies,
) {
  if (!context) return;

  try {
    await dependencies.recordVisitEvent({
      eventId: randomUUID(),
      eventType,
      pageViewId: context.pageViewId,
      properties,
      source: "server",
      visitId: context.visitId,
    });
  } catch (error) {
    dependencies.logWarning(
      "Enquiry analytics event could not be recorded:",
      eventType,
      error instanceof Error ? error.name : "UnknownError",
    );
  }
}

export async function handleEnquiry(
  request: EnquiryRequest,
  response: EnquiryResponse,
  dependencies: EnquiryHandlerDependencies,
) {
  const responseMode = getResponseMode(request);

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendPublicFailure(response, 405, responseMode);
  }

  const requestShapeBlock = getRequestShapeBlock(request, dependencies.environment);

  if (requestShapeBlock) {
    logBlockedEnquiryRequest(request, requestShapeBlock, dependencies.logWarning);

    return sendPublicFailure(response, requestShapeBlock.status, responseMode);
  }

  const payload = getPayloadBody(request);
  const analyticsContext = getEnquiryAnalyticsContext(payload);
  const validation = validateEnquiryPayload(payload);

  if (validation.type === "honeypot") {
    return sendSuccess(response, responseMode);
  }

  if (validation.type === "invalid") {
    return sendValidationError(response, responseMode);
  }

  await recordEnquiryEvent(
    analyticsContext,
    "enquiry_submit_attempted",
    {},
    dependencies,
  );

  const delivery = await deliverEnquiry(validation.enquiry, dependencies);

  if (delivery.type === "failed") {
    await recordEnquiryEvent(
      analyticsContext,
      "enquiry_failed",
      { reason: delivery.reason },
      dependencies,
    );
    return sendPublicFailure(response, delivery.status, responseMode);
  }

  await recordEnquiryEvent(
    analyticsContext,
    "enquiry_sent",
    {},
    dependencies,
  );

  return sendSuccess(response, responseMode);
}

export default function handler(request: EnquiryRequest, response: EnquiryResponse) {
  return handleEnquiry(request, response, {
    environment: process.env,
    fetch: globalThis.fetch,
    logError: console.error,
    logWarning: console.warn,
    recordVisitEvent: persistVisitEvent,
  });
}
