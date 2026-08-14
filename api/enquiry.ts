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

declare const process: {
  env: Record<string, string | undefined>;
};

type EnquiryHandlerDependencies = {
  environment: Readonly<Record<string, string | undefined>>;
  fetch: typeof globalThis.fetch;
  logError: (...data: unknown[]) => void;
  logWarning: (...data: unknown[]) => void;
};

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
  const validation = validateEnquiryPayload(payload);

  if (validation.type === "honeypot") {
    return sendSuccess(response, responseMode);
  }

  if (validation.type === "invalid") {
    return sendValidationError(response, responseMode);
  }

  const delivery = await deliverEnquiry(validation.enquiry, dependencies);

  if (delivery.type === "failed") {
    return sendPublicFailure(response, delivery.status, responseMode);
  }

  return sendSuccess(response, responseMode);
}

export default function handler(request: EnquiryRequest, response: EnquiryResponse) {
  return handleEnquiry(request, response, {
    environment: process.env,
    fetch: globalThis.fetch,
    logError: console.error,
    logWarning: console.warn,
  });
}
