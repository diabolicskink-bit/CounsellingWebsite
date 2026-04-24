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

function getTimeMinutes(time) {
  const match = time.match(/(\d{1,2})(?:[.:](\d{2}))?\s*(am|pm)/i);

  if (!match) {
    return undefined;
  }

  const period = match[3].toLowerCase();
  const hour = Number(match[1]) % 12;
  const minute = Number(match[2] ?? 0);

  return hour * 60 + minute + (period === "pm" ? 12 * 60 : 0);
}

function formatTimeDifference(minutes) {
  if (!minutes) {
    return "0 hrs";
  }

  const sign = minutes > 0 ? "+" : "-";
  const absoluteHours = Math.abs(minutes) / 60;
  const hours = Number.isInteger(absoluteHours) ? String(absoluteHours) : absoluteHours.toFixed(1);

  return `${sign}${hours} hrs`;
}

function normalizeTimeRange(range) {
  return range
    .replace(/\s+to\s+/i, " - ")
    .replace(/:/g, ".")
    .replace(/\.00(?=am|pm)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getTimingRangeParts(timingNote) {
  const olderFormat = timingNote.match(/\bis currently\s+(.+?)\s+in\s+([A-Z]{2,5})/);

  if (olderFormat) {
    return {
      localAbbreviation: olderFormat[2],
      localRange: olderFormat[1],
    };
  }

  const currentFormat = timingNote.match(/\bis\s+(.+?)\s+([A-Z]{2,5})\.$/);

  if (currentFormat) {
    return {
      localAbbreviation: currentFormat[2],
      localRange: currentFormat[1],
    };
  }

  return undefined;
}

function getFormattedTimingNote(timingNote) {
  if (!timingNote) {
    return "";
  }

  const timingRange = getTimingRangeParts(timingNote);

  if (!timingRange) {
    return `Time Difference: ${timingNote}`;
  }

  const localRange = normalizeTimeRange(timingRange.localRange);
  const localStart = getTimeMinutes(localRange.split(" - ")[0]);
  const difference = typeof localStart === "number" ? localStart - getTimeMinutes("9.30am") : undefined;

  return `Time Difference: ${formatTimeDifference(difference)}. 9.30am - 5pm WST is ${localRange} ${
    timingRange.localAbbreviation
  }.`;
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

function getEnquiryHtml({ text }) {
  const { details, message, timingNote } = parseEnquiryText(text);
  const enquiryType = getDetailValue(details, "Enquiry type") || "Website enquiry";
  const name = getDetailValue(details, "Name") || "Website visitor";
  const safeEnquiryType = escapeHtml(enquiryType);
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message || "No message supplied.").replace(/\n/g, "<br />");
  const formattedTimingNote = getFormattedTimingNote(timingNote);

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
                        <p style="margin: 0 0 12px; color: #d7e4da; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">${safeEnquiryType}</p>
                        <h1 style="margin: 0; color: #fffaf1; font-size: 31px; line-height: 1.12; font-weight: 500;">${safeName}</h1>
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

                  <div style="margin: 0 0 22px; padding: 22px 24px; border: 1px solid #cdd9cf; border-radius: 20px; background: #ffffff;">
                    <p style="margin: 0 0 12px; color: #6f7d73; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Client message</p>
                    <div style="color: #1f2c25; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.65;">${safeMessage}</div>
                  </div>

                  ${
                    formattedTimingNote
                      ? `<div style="padding: 14px 16px; border-radius: 16px; background: #f3f0e8; color: #6f7d73; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.55;"><strong style="color: #405248;">${escapeHtml(
                          formattedTimingNote,
                        )}</strong></div>`
                      : ""
                  }
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
        html: getEnquiryHtml({ text }),
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
