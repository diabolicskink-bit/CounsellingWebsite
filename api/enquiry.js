const fallbackRecipient = "diabolicskink@gmail.com";
const resendEndpoint = "https://api.resend.com/emails";
const htmlEscapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => htmlEscapeMap[character]);
}

function getMailtoHref(email, subject) {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;
}

function getDetailValue(details, label) {
  return details.find((detail) => detail.label.toLowerCase() === label.toLowerCase())?.value ?? "";
}

function parseEnquiryText(text) {
  const lines = text.split(/\r?\n/);
  const details = [];
  const messageLines = [];
  let timingNote = "";
  let isMessage = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmedLine = line.trim();

    if (isMessage) {
      messageLines.push(line);
      continue;
    }

    if (!trimmedLine) {
      continue;
    }

    if (trimmedLine === "Message:") {
      isMessage = true;
      continue;
    }

    if (trimmedLine.startsWith("Message:")) {
      isMessage = true;
      messageLines.push(trimmedLine.slice("Message:".length).trim());
      continue;
    }

    const delimiterIndex = trimmedLine.indexOf(":");

    if (delimiterIndex === -1) {
      continue;
    }

    const label = trimmedLine.slice(0, delimiterIndex).trim();
    const value = trimmedLine.slice(delimiterIndex + 1).trim();

    if (label.toLowerCase() === "timing note") {
      timingNote = value;
      continue;
    }

    details.push({ label, value });
  }

  return {
    details,
    message: messageLines.join("\n").trim(),
    timingNote,
  };
}

function renderDetailRows(details) {
  if (!details.length) {
    return `
      <tr>
        <td style="padding: 16px 0; color: #6f7d73; font-size: 14px;">No structured details were supplied.</td>
      </tr>
    `;
  }

  return details
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding: 12px 14px; border-top: 1px solid #dde5db; color: #6f7d73; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; vertical-align: top; width: 34%;">${escapeHtml(label)}</td>
          <td style="padding: 12px 14px; border-top: 1px solid #dde5db; color: #1f2c25; font-size: 15px; line-height: 1.5; vertical-align: top;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderSummaryCards(details, enquiryType) {
  const cards = [
    ["Request", getDetailValue(details, "Booking request") || enquiryType],
    ["Timing", getDetailValue(details, "Preferred timing") || getDetailValue(details, "Availability") || "Not specified"],
    ["Location / zone", getDetailValue(details, "State or territory") || getDetailValue(details, "Timezone") || "Not specified"],
  ];

  return cards
    .map(
      ([label, value]) => `
        <td style="width: 33.33%; padding: 0 6px 12px 0; vertical-align: top;">
          <div style="min-height: 88px; padding: 15px 16px; border: 1px solid #d8e2d9; border-radius: 18px; background: #ffffff;">
            <p style="margin: 0 0 8px; color: #6f7d73; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase;">${escapeHtml(label)}</p>
            <p style="margin: 0; color: #1f2c25; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.45;">${escapeHtml(value)}</p>
          </div>
        </td>
      `,
    )
    .join("");
}

function getEnquiryHtml({ replyTo, subject, text }) {
  const { details, message, timingNote } = parseEnquiryText(text);
  const enquiryType = getDetailValue(details, "Enquiry type") || "Website enquiry";
  const name = getDetailValue(details, "Name") || "Website visitor";
  const safeEnquiryType = escapeHtml(enquiryType);
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message || "No message supplied.").replace(/\n/g, "<br />");
  const safeReplyTo = escapeHtml(replyTo);
  const safeSubject = escapeHtml(subject);
  const replyHref = escapeHtml(getMailtoHref(replyTo, subject));

  return `<!doctype html>
<html lang="en">
  <body style="margin: 0; padding: 0; background: #f4efe6; color: #1f2c25; font-family: Georgia, 'Times New Roman', serif;">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
      New enquiry from ${safeName} - ${safeEnquiryType}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f4efe6; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 32px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 680px; border-collapse: collapse;">
            <tr>
              <td style="border: 1px solid #cdd9cf; border-radius: 24px; overflow: hidden; background: #fffaf1;">
                <div style="padding: 30px 30px 24px; background: #234b3d; color: #fffaf1;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                    <tr>
                      <td style="vertical-align: top;">
                        <p style="margin: 0 0 12px; color: #d7e4da; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">New counselling enquiry</p>
                        <h1 style="margin: 0; color: #fffaf1; font-size: 31px; line-height: 1.12; font-weight: 500;">${safeName}</h1>
                        <p style="margin: 12px 0 0; color: #eef5ef; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.55;">${safeEnquiryType} received through the website form.</p>
                      </td>
                      <td align="right" style="vertical-align: top; width: 130px;">
                        <span style="display: inline-block; padding: 8px 11px; border: 1px solid rgba(255, 250, 241, 0.35); border-radius: 999px; color: #fffaf1; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Needs reply</span>
                      </td>
                    </tr>
                  </table>
                </div>

                <div style="padding: 24px 30px 28px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin: 0 0 10px;">
                    <tr>
                      ${renderSummaryCards(details, enquiryType)}
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 22px;">
                    <tr>
                      <td style="padding: 0 0 12px; color: #6f7d73; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Fast reply</td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 18px; border: 1px solid #cdd9cf; border-radius: 18px; background: #eef6ed; color: #1f2c25; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.55;">
                        <a href="${replyHref}" style="display: inline-block; margin: 0 12px 8px 0; padding: 10px 16px; border-radius: 999px; background: #234b3d; color: #fffaf1; font-weight: 700; text-decoration: none;">Reply to ${safeName}</a>
                        <span style="color: #405248;">Reply goes to <strong>${safeReplyTo}</strong></span>
                      </td>
                    </tr>
                  </table>

                  ${
                    timingNote
                      ? `<div style="margin: 0 0 22px; padding: 16px 18px; border-left: 4px solid #d8a85f; border-radius: 14px; background: #fff6e4; color: #314039; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.55;"><strong style="color: #234b3d;">Timing note:</strong> ${escapeHtml(timingNote)}</div>`
                      : ""
                  }

                  <div style="margin: 0 0 22px; padding: 22px 24px; border: 1px solid #cdd9cf; border-radius: 20px; background: #ffffff;">
                    <p style="margin: 0 0 12px; color: #6f7d73; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Client message</p>
                    <div style="color: #1f2c25; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.65;">${safeMessage}</div>
                  </div>

                  <div style="margin: 0 0 22px;">
                    <p style="margin: 0 0 10px; color: #6f7d73; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Full intake details</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #d8e2d9; border-radius: 18px; border-collapse: separate; border-spacing: 0; overflow: hidden; background: #ffffff; font-family: Arial, sans-serif;">
                      ${renderDetailRows(details)}
                    </table>
                  </div>

                  <div style="padding: 14px 16px; border-radius: 16px; background: #f3f0e8; color: #7d897f; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.55;">
                    <strong style="color: #405248;">Email subject:</strong> ${safeSubject}<br />
                    Sent through the counselling website enquiry form.
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
        html: getEnquiryHtml({ replyTo, subject, text }),
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
