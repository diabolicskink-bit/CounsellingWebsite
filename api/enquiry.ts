declare const process: {
  env: Record<string, string | undefined>;
};

type EnquiryRequest = {
  body?: unknown;
  method?: string;
};

type EnquiryResponse = {
  json(body: unknown): unknown;
  setHeader(name: string, value: string): void;
  status(statusCode: number): EnquiryResponse;
};

type AustralianTimeZoneRegion = {
  label: string;
  stateValues: string[];
  timeZone: string;
};

type ActiveAustralianTimeZone = {
  abbreviation: string;
  labels: string[];
  offsetMinutes: number;
  timeZone: string;
};

type ValidationIssue = {
  code: "invalid_format" | "invalid_value" | "required";
  field: string;
  message: string;
};

type ValidatedEnquiry = {
  availability?: string;
  bookingType?: string;
  bookingTypeLabel?: string;
  email: string;
  enquiryType: string;
  enquiryTypeLabel: string;
  message: string;
  name: string;
  state?: string;
  stateLabel?: string;
  timing?: string;
  timeZone?: string;
  timeZoneLabel?: string;
};

type ValidationResult =
  | { type: "honeypot" }
  | { issues: ValidationIssue[]; type: "invalid" }
  | { enquiry: ValidatedEnquiry; type: "valid" };

type EmailTheme = {
  accent: string;
  background: string;
  cardBackground: string;
  cardBorder: string;
  headerBackground: string;
  headerText: string;
  labelText: string;
  messageBorder: string;
  panelBackground: string;
  panelBorder: string;
  subtleText: string;
};

const fallbackRecipient = "diabolicskink@gmail.com";
const resendEndpoint = "https://api.resend.com/emails";

const enquiryTypeLabels: Record<string, string> = {
  booking: "Booking enquiry",
  general: "General enquiry",
};

const bookingTypeLabels: Record<string, string> = {
  appointment: "Make an appointment",
  consult: "Request a 15-minute consult",
};

const stateLabels: Record<string, string> = {
  act: "Australian Capital Territory",
  nsw: "New South Wales",
  nt: "Northern Territory",
  other: "Outside Australia or unsure",
  qld: "Queensland",
  sa: "South Australia",
  tas: "Tasmania",
  vic: "Victoria",
  wa: "Western Australia",
};

const subjectLabels: Record<string, string> = {
  appointment: "App Request",
  booking: "Book Enq",
  consult: "Consult Request",
  general: "General Enq",
};

const australianTimeZoneRegions: AustralianTimeZoneRegion[] = [
  { label: "WA", stateValues: ["wa"], timeZone: "Australia/Perth" },
  { label: "SA", stateValues: ["sa"], timeZone: "Australia/Adelaide" },
  { label: "NT", stateValues: ["nt"], timeZone: "Australia/Darwin" },
  { label: "QLD", stateValues: ["qld"], timeZone: "Australia/Brisbane" },
  { label: "NSW / ACT / VIC / TAS", stateValues: ["nsw", "act", "vic", "tas"], timeZone: "Australia/Sydney" },
];

const fallbackTimeZoneLabels: Record<string, string> = {
  ACDT: "ACDT (SA)",
  ACST: "ACST (SA / NT)",
  AEDT: "AEDT (NSW / ACT / VIC / TAS)",
  AEST: "AEST (QLD / NSW / ACT / VIC / TAS)",
  AWST: "AWST (WA)",
};

const htmlEscapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function getText(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getPayloadBody(requestBody: unknown): Record<string, unknown> {
  if (typeof requestBody === "string") {
    try {
      const parsedBody = JSON.parse(requestBody);

      return parsedBody && typeof parsedBody === "object" && !Array.isArray(parsedBody)
        ? (parsedBody as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }

  return requestBody && typeof requestBody === "object" && !Array.isArray(requestBody)
    ? (requestBody as Record<string, unknown>)
    : {};
}

function getMissingItems(items: Record<string, unknown>) {
  return Object.entries(items)
    .filter(([, value]) => !value)
    .map(([label]) => label);
}

function sendError(response: EnquiryResponse, status: number, error: string, details?: unknown) {
  return response.status(status).json({
    error,
    ...(details ? { details } : {}),
  });
}

function sendValidationError(response: EnquiryResponse, issues: ValidationIssue[]) {
  return sendError(response, 400, "Invalid enquiry submission.", issues);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEscapeMap[character] ?? character);
}

function getTimeZoneAbbreviation(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  }).formatToParts(date);

  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone,
    year: "numeric",
  }).formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  const zonedTime = Date.UTC(
    getPart("year"),
    getPart("month") - 1,
    getPart("day"),
    getPart("hour"),
    getPart("minute"),
    getPart("second"),
  );

  return Math.round((zonedTime - date.getTime()) / 60000);
}

function getActiveAustralianTimeZones(date = new Date()) {
  const groupedTimeZones = australianTimeZoneRegions.reduce<Record<string, ActiveAustralianTimeZone>>(
    (groups, region) => {
      const abbreviation = getTimeZoneAbbreviation(date, region.timeZone);
      const offsetMinutes = getTimeZoneOffsetMinutes(date, region.timeZone);
      const key = `${abbreviation}-${offsetMinutes}`;

      groups[key] ??= {
        abbreviation,
        labels: [],
        offsetMinutes,
        timeZone: region.timeZone,
      };
      groups[key].labels.push(region.label);

      return groups;
    },
    {},
  );

  return Object.values(groupedTimeZones).sort((first, second) => first.offsetMinutes - second.offsetMinutes);
}

function getActiveAustralianTimeZoneOptions(date = new Date()) {
  return getActiveAustralianTimeZones(date).map((timeZone) => ({
    label: `${timeZone.abbreviation} (${timeZone.labels.join(" / ")})`,
    value: timeZone.abbreviation,
  }));
}

function getTimeZoneLabel(value: string) {
  return getActiveAustralianTimeZoneOptions().find((option) => option.value === value)?.label ?? fallbackTimeZoneLabels[value] ?? "";
}

function addIssue(issues: ValidationIssue[], field: string, code: ValidationIssue["code"], message: string) {
  issues.push({ field, code, message });
}

function getRequiredTextField(
  payload: Record<string, unknown>,
  field: string,
  maxLength: number,
  issues: ValidationIssue[],
  label: string,
) {
  const value = getText(payload[field], maxLength);

  if (!value) {
    addIssue(issues, field, "required", `${label} is required.`);
  }

  return value;
}

function isValidEmailAddress(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateEnquiryPayload(payload: Record<string, unknown>): ValidationResult {
  if (getText(payload.website, 320)) {
    return { type: "honeypot" };
  }

  const issues: ValidationIssue[] = [];
  const enquiryType = getRequiredTextField(payload, "enquiryType", 60, issues, "Enquiry type");
  const name = getRequiredTextField(payload, "name", 160, issues, "Name");
  const email = getRequiredTextField(payload, "email", 320, issues, "Email");
  const message = getRequiredTextField(payload, "message", 5000, issues, "Message");
  const enquiry: ValidatedEnquiry = {
    email,
    enquiryType,
    enquiryTypeLabel: enquiryTypeLabels[enquiryType] ?? "",
    message,
    name,
  };

  if (email && !isValidEmailAddress(email)) {
    addIssue(issues, "email", "invalid_format", "Enter a valid email address.");
  }

  if (enquiryType && !enquiryTypeLabels[enquiryType]) {
    addIssue(issues, "enquiryType", "invalid_value", "Choose a valid enquiry type.");
  }

  if (enquiryType === "booking") {
    const bookingType = getRequiredTextField(payload, "bookingType", 60, issues, "Booking request");

    enquiry.bookingType = bookingType;
    enquiry.bookingTypeLabel = bookingTypeLabels[bookingType] ?? "";

    if (bookingType && !bookingTypeLabels[bookingType]) {
      addIssue(issues, "bookingType", "invalid_value", "Choose a valid booking request.");
    }

    if (bookingType === "appointment") {
      const timing = getRequiredTextField(payload, "timing", 500, issues, "Preferred timing");
      const state = getRequiredTextField(payload, "state", 60, issues, "State or territory");

      enquiry.timing = timing;
      enquiry.state = state;
      enquiry.stateLabel = stateLabels[state] ?? "";

      if (state && !stateLabels[state]) {
        addIssue(issues, "state", "invalid_value", "Choose a valid state or territory.");
      }
    }

    if (bookingType === "consult") {
      const availability = getRequiredTextField(payload, "availability", 500, issues, "Availability");
      const timeZone = getRequiredTextField(payload, "timeZone", 60, issues, "Timezone");
      const timeZoneLabel = getTimeZoneLabel(timeZone);

      enquiry.availability = availability;
      enquiry.timeZone = timeZone;
      enquiry.timeZoneLabel = timeZoneLabel;

      if (timeZone && !timeZoneLabel) {
        addIssue(issues, "timeZone", "invalid_value", "Choose a valid timezone.");
      }
    }
  }

  if (issues.length) {
    return { issues, type: "invalid" };
  }

  return { enquiry, type: "valid" };
}

function getSubjectName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : "";

  return [firstName, lastInitial].filter(Boolean).join(" ");
}

function getEmailSubject(enquiry: ValidatedEnquiry) {
  const baseSubject =
    enquiry.enquiryType === "booking"
      ? subjectLabels[enquiry.bookingType ?? "booking"] ?? subjectLabels.booking
      : subjectLabels.general;
  const subjectName = getSubjectName(enquiry.name);

  return [baseSubject, subjectName].filter(Boolean).join(" - ");
}

function getPresentRows(rows: Array<[string, string | undefined]>) {
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

function getEnquiryDetails(enquiry: ValidatedEnquiry) {
  return getPresentRows([
    ["Enquiry type", enquiry.enquiryTypeLabel],
    ["Booking request", enquiry.bookingTypeLabel],
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Preferred timing", enquiry.timing],
    ["State or territory", enquiry.stateLabel],
    ["Availability", enquiry.availability],
    ["Timezone", enquiry.timeZoneLabel],
  ]);
}

function getEnquiryText(enquiry: ValidatedEnquiry) {
  return [
    ...getEnquiryDetails(enquiry).map(([label, value]) => `${label}: ${value}`),
    "",
    `Message:\n${enquiry.message}`,
  ].join("\n");
}

function getEmailHeading(enquiry: ValidatedEnquiry) {
  if (enquiry.bookingType === "appointment") {
    return "Appointment Enquiry";
  }

  if (enquiry.bookingType === "consult") {
    return "Consult Enquiry";
  }

  return "General Enquiry";
}

function getEmailTheme(emailHeading: string): EmailTheme {
  if (emailHeading === "Appointment Enquiry") {
    return {
      accent: "#8fb7c0",
      background: "#eef4f3",
      cardBackground: "#f8fbfb",
      cardBorder: "#c8dadd",
      headerBackground: "#1f4c58",
      headerText: "#fffaf1",
      labelText: "#d9edf0",
      messageBorder: "#bfd4d8",
      panelBackground: "#fffaf1",
      panelBorder: "#c8dadd",
      subtleText: "#5a7479",
    };
  }

  if (emailHeading === "Consult Enquiry") {
    return {
      accent: "#d8a85f",
      background: "#f7efe2",
      cardBackground: "#fffaf1",
      cardBorder: "#e3c88f",
      headerBackground: "#7a4e1f",
      headerText: "#fffaf1",
      labelText: "#ffe6b7",
      messageBorder: "#e3c88f",
      panelBackground: "#fffaf1",
      panelBorder: "#e3c88f",
      subtleText: "#7b684b",
    };
  }

  return {
    accent: "#d8a85f",
    background: "#f4efe6",
    cardBackground: "#ffffff",
    cardBorder: "#d8e2d9",
    headerBackground: "#234b3d",
    headerText: "#fffaf1",
    labelText: "#d7e4da",
    messageBorder: "#cdd9cf",
    panelBackground: "#fffaf1",
    panelBorder: "#cdd9cf",
    subtleText: "#6f7d73",
  };
}

function getSummaryRows(enquiry: ValidatedEnquiry) {
  if (enquiry.bookingType === "appointment") {
    return getPresentRows([
      ["Timing", enquiry.timing],
      ["State", enquiry.stateLabel],
    ]);
  }

  if (enquiry.bookingType === "consult") {
    return getPresentRows([
      ["Timing", enquiry.availability],
      ["Timezone", enquiry.timeZoneLabel],
    ]);
  }

  return [];
}

function renderDetailPanel(rows: Array<[string, string]>, theme: EmailTheme) {
  if (!rows.length) {
    return "";
  }

  const rowMarkup = rows
    .map(([label, value], index) => {
      const borderTop = index === 0 ? "0" : `1px solid ${theme.cardBorder}`;

      return `
        <tr>
          <td style="width: 116px; padding: 12px 16px 12px 18px; border-top: ${borderTop}; vertical-align: top;">
            <p style="margin: 0; color: ${theme.subtleText}; font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; line-height: 1.4; text-transform: uppercase;">${escapeHtml(
              label,
            )}</p>
          </td>
          <td style="padding: 12px 18px 12px 0; border-top: ${borderTop}; vertical-align: top;">
            <p style="margin: 0; color: #1f2c25; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.45;">${escapeHtml(
              value,
            )}</p>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="margin: 0 0 18px; border: 1px solid ${theme.cardBorder}; border-left: 5px solid ${theme.accent}; border-radius: 18px; overflow: hidden; background: ${theme.cardBackground};">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
        ${rowMarkup}
      </table>
    </div>
  `;
}

function getEnquiryHtml(enquiry: ValidatedEnquiry) {
  const emailHeading = getEmailHeading(enquiry);
  const theme = getEmailTheme(emailHeading);
  const safeEmailHeading = escapeHtml(emailHeading);
  const safeName = escapeHtml(enquiry.name || "Website visitor");
  const safeMessage = escapeHtml(enquiry.message || "No message supplied.").replace(/\n/g, "<br />");
  const detailPanel = renderDetailPanel(getSummaryRows(enquiry), theme);

  return `<!doctype html>
<html lang="en">
  <body style="margin: 0; padding: 0; background: ${theme.background}; color: #1f2c25; font-family: Georgia, 'Times New Roman', serif;">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
      New enquiry from ${safeName} - ${safeEmailHeading}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${theme.background}; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 32px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 680px; border-collapse: collapse;">
            <tr>
              <td style="border: 1px solid ${theme.panelBorder}; border-radius: 24px; overflow: hidden; background: ${theme.panelBackground};">
                <div style="padding: 28px 30px 25px; border-top: 7px solid ${theme.accent}; background: ${theme.headerBackground}; color: ${theme.headerText};">
                  <p style="margin: 0 0 12px; color: ${theme.labelText}; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">${safeEmailHeading}</p>
                  <h1 style="margin: 0; color: ${theme.headerText}; font-size: 31px; line-height: 1.12; font-weight: 500;">${safeName}</h1>
                </div>

                <div style="padding: 24px 30px 28px;">
                  ${detailPanel}

                  <div style="margin: 0 0 20px; padding: 21px 24px; border: 1px solid ${theme.messageBorder}; border-radius: 20px; background: #ffffff;">
                    <p style="margin: 0 0 12px; color: ${theme.subtleText}; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Message</p>
                    <div style="color: #1f2c25; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.65;">${safeMessage}</div>
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

export default async function handler(request: EnquiryRequest, response: EnquiryResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendError(response, 405, "Method not allowed.", `Received ${request.method}; expected POST.`);
  }

  const payload = getPayloadBody(request.body);
  const validation = validateEnquiryPayload(payload);

  if (validation.type === "honeypot") {
    return response.status(200).json({ ok: true });
  }

  if (validation.type === "invalid") {
    return sendValidationError(response, validation.issues);
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

    return sendError(
      response,
      500,
      "Email delivery is not configured yet.",
      `Missing Vercel env vars: ${missingEnvironment.join(", ")}.`,
    );
  }

  try {
    const resendResponse = await fetch(resendEndpoint, {
      body: JSON.stringify({
        from,
        html: getEnquiryHtml(enquiry),
        reply_to: enquiry.email,
        subject: getEmailSubject(enquiry),
        text: getEnquiryText(enquiry),
        to,
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
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
