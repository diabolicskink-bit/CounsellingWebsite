import { buildEnquiryEmail } from "../src/server/enquiry/email.ts";
import {
  getPayloadBody,
  getRequestShapeBlock,
  getResponseMode,
  logBlockedEnquiryRequest,
  type EnquiryRequest,
} from "../src/server/enquiry/request.ts";
import {
  fallbackRecipient,
  sendPublicFailure,
  sendSuccess,
  sendValidationError,
  type EnquiryResponse,
} from "../src/server/enquiry/response.ts";
import { validateEnquiryPayload } from "../src/server/enquiry/validation.ts";

declare const process: {
  env: Record<string, string | undefined>;
};

const resendEndpoint = "https://api.resend.com/emails";

function getMissingItems(items: Record<string, unknown>) {
  return Object.entries(items)
    .filter(([, value]) => !value)
    .map(([label]) => label);
}

export default async function handler(request: EnquiryRequest, response: EnquiryResponse) {
  const responseMode = getResponseMode(request);

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendPublicFailure(response, 405, responseMode);
  }

  const requestShapeBlock = getRequestShapeBlock(request);

  if (requestShapeBlock) {
    logBlockedEnquiryRequest(request, requestShapeBlock);

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

  const { enquiry } = validation;
  const to = process.env.ENQUIRY_TO_EMAIL || fallbackRecipient;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !from) {
    const missingEnvironment = getMissingItems({
      RESEND_API_KEY: apiKey,
      ENQUIRY_FROM_EMAIL: from,
    });

    console.error("Enquiry delivery configuration missing:", missingEnvironment.join(", "));

    return sendPublicFailure(response, 500, responseMode);
  }

  try {
    const resendResponse = await fetch(resendEndpoint, {
      body: JSON.stringify(buildEnquiryEmail(enquiry, { from, to })),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();

      console.error("Resend enquiry send failed:", resendResponse.status, resendError);

      return sendPublicFailure(response, 502, responseMode);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("Unexpected enquiry send error:", message);

    return sendPublicFailure(response, 500, responseMode);
  }

  return sendSuccess(response, responseMode);
}
