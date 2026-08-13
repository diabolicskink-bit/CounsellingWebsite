import { buildEnquiryEmail } from "./email.ts";
import { fallbackRecipient } from "./response.ts";
import type { ValidatedEnquiry } from "./validation.ts";

type EnquiryDeliveryEnvironment = Readonly<Record<string, string | undefined>>;

type EnquiryDeliveryDependencies = {
  environment: EnquiryDeliveryEnvironment;
  fetch: typeof globalThis.fetch;
  logError: (...data: unknown[]) => void;
};

type EnquiryDeliveryResult =
  | { type: "sent" }
  | { status: 500 | 502; type: "failed" };

const resendEndpoint = "https://api.resend.com/emails";

function getMissingItems(items: Record<string, unknown>) {
  return Object.entries(items)
    .filter(([, value]) => !value)
    .map(([label]) => label);
}

export async function deliverEnquiry(
  enquiry: ValidatedEnquiry,
  { environment, fetch, logError }: EnquiryDeliveryDependencies,
): Promise<EnquiryDeliveryResult> {
  const to = environment.ENQUIRY_TO_EMAIL || fallbackRecipient;
  const from = environment.ENQUIRY_FROM_EMAIL;
  const apiKey = environment.RESEND_API_KEY;

  if (!apiKey || !from) {
    const missingEnvironment = getMissingItems({
      RESEND_API_KEY: apiKey,
      ENQUIRY_FROM_EMAIL: from,
    });

    logError("Enquiry delivery configuration missing:", missingEnvironment.join(", "));

    return { status: 500, type: "failed" };
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

      logError("Resend enquiry send failed:", resendResponse.status, resendError);

      return { status: 502, type: "failed" };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    logError("Unexpected enquiry send error:", message);

    return { status: 500, type: "failed" };
  }

  return { type: "sent" };
}
