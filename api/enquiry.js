const fallbackRecipient = "diabolicskink@gmail.com";
const resendEndpoint = "https://api.resend.com/emails";

function getText(value, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getPayloadBody(requestBody) {
  if (typeof requestBody === "string") {
    try {
      return JSON.parse(requestBody);
    } catch {
      return {};
    }
  }

  return requestBody && typeof requestBody === "object" ? requestBody : {};
}

function getMissingItems(items) {
  return Object.entries(items)
    .filter(([, value]) => !value)
    .map(([label]) => label);
}

function sendError(response, status, error, details) {
  return response.status(status).json({
    error,
    ...(details ? { details } : {}),
  });
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendError(response, 405, "Method not allowed.", `Received ${request.method}; expected POST.`);
  }

  const payload = getPayloadBody(request.body);

  if (getText(payload.website)) {
    return response.status(200).json({ ok: true });
  }

  const subject = getText(payload.subject, 180);
  const text = getText(payload.body);
  const replyTo = getText(payload.replyTo, 320);
  const to = process.env.ENQUIRY_TO_EMAIL || fallbackRecipient;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!subject || !text || !replyTo) {
    const missingFields = getMissingItems({
      subject,
      body: text,
      replyTo,
    });

    return sendError(
      response,
      400,
      "Missing required enquiry details.",
      `Missing payload fields: ${missingFields.join(", ")}.`,
    );
  }

  if (!apiKey || !from) {
    const missingEnvironment = getMissingItems({
      RESEND_API_KEY: apiKey,
      ENQUIRY_FROM_EMAIL: from,
    });

    return sendError(
      response,
      500,
      "Email delivery is not configured yet.",
      `Missing Vercel env vars: ${missingEnvironment.join(", ")}.`,
    );
  }

  try {
    const resendResponse = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        reply_to: replyTo,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();

      console.error("Resend enquiry send failed:", resendResponse.status, resendError);

      return sendError(
        response,
        502,
        "Email delivery failed.",
        `Resend API ${resendResponse.status}: ${resendError || resendResponse.statusText}`,
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("Unexpected enquiry send error:", message);

    return sendError(response, 500, "Unexpected email delivery error.", message);
  }

  return response.status(200).json({ ok: true });
}
