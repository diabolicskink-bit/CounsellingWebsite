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

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
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
    return response.status(400).json({ error: "Missing required enquiry details." });
  }

  if (!apiKey || !from) {
    return response.status(500).json({ error: "Email delivery is not configured yet." });
  }

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
    console.error("Resend enquiry send failed:", await resendResponse.text());

    return response.status(502).json({ error: "Email delivery failed." });
  }

  return response.status(200).json({ ok: true });
}
