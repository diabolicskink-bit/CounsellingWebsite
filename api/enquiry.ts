declare const process: {
  env: Record<string, string | undefined>;
};

type EnquiryRequest = {
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
};

type EnquiryResponse = {
  json(body: unknown): unknown;
  send(body: string): unknown;
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

type ResponseMode = "html" | "json";

type RequestShapeBlock = {
  reason: string;
  status: number;
};

type ParsedHeaderOrigin = {
  origin: string;
  valid: boolean;
};

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

const fallbackRecipient = "joel@vivecounselling.com.au";
const resendEndpoint = "https://api.resend.com/emails";
const invalidSubmissionMessage = "Invalid enquiry submission.";
const publicFailureMessage = `Sorry, the enquiry could not be sent. Please email ${fallbackRecipient} directly.`;
const maxEnquiryBodyBytes = 25 * 1024;

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
  if (typeof value === "string") {
    return value.trim().slice(0, maxLength);
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0].trim().slice(0, maxLength);
  }

  return "";
}

function getHeader(request: EnquiryRequest, name: string) {
  const headers = request.headers ?? {};
  const headerName = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  const headerValue = headerName ? headers[headerName] : undefined;

  if (Array.isArray(headerValue)) {
    return headerValue.join(", ");
  }

  return headerValue ?? "";
}

function getMediaType(contentType: string) {
  return contentType.split(";")[0].trim().toLowerCase();
}

function isJsonContentType(contentType: string) {
  return getMediaType(contentType) === "application/json";
}

function isFormContentType(contentType: string) {
  return getMediaType(contentType) === "application/x-www-form-urlencoded";
}

function getResponseMode(request: EnquiryRequest): ResponseMode {
  const contentType = getHeader(request, "content-type").toLowerCase();
  const accept = getHeader(request, "accept").toLowerCase();

  if (isFormContentType(contentType)) {
    return "html";
  }

  if (accept.includes("text/html") && !accept.includes("application/json")) {
    return "html";
  }

  return "json";
}

function getNormalizedOrigin(value: string) {
  const candidate = value.trim();

  if (!candidate || candidate.toLowerCase() === "null") {
    return "";
  }

  try {
    const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);

    return url.origin.toLowerCase();
  } catch {
    return "";
  }
}

function addAllowedOrigin(origins: Set<string>, value: string | undefined) {
  const origin = getNormalizedOrigin(value ?? "");

  if (origin) {
    origins.add(origin);
  }
}

function isLocalHost(host: string) {
  const hostname = host.split(":")[0].toLowerCase();

  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]";
}

function getAllowedOrigins(request: EnquiryRequest) {
  const origins = new Set<string>();
  const host = getHeader(request, "host").trim();
  const forwardedProto = getHeader(request, "x-forwarded-proto").split(",")[0].trim().toLowerCase();
  const requestProto = forwardedProto === "http" ? "http" : "https";

  if (host) {
    addAllowedOrigin(origins, `${requestProto}://${host}`);

    if (isLocalHost(host)) {
      addAllowedOrigin(origins, `http://${host}`);
      addAllowedOrigin(origins, `https://${host}`);
    }
  }

  addAllowedOrigin(origins, process.env.SITE_URL);
  addAllowedOrigin(origins, process.env.VERCEL_URL);
  addAllowedOrigin(origins, process.env.VERCEL_BRANCH_URL);

  return origins;
}

function getHeaderOrigin(headerValue: string): ParsedHeaderOrigin {
  if (!headerValue.trim()) {
    return { origin: "", valid: true };
  }

  const origin = getNormalizedOrigin(headerValue);

  return { origin, valid: Boolean(origin) };
}

function isAllowedHeaderOrigin(headerValue: string, allowedOrigins: Set<string>) {
  const parsedOrigin = getHeaderOrigin(headerValue);

  return parsedOrigin.valid && Boolean(parsedOrigin.origin) && allowedOrigins.has(parsedOrigin.origin);
}

function getDeclaredContentLength(request: EnquiryRequest) {
  const contentLength = getHeader(request, "content-length").trim();

  if (!contentLength) {
    return undefined;
  }

  const parsedLength = Number(contentLength);

  return Number.isFinite(parsedLength) && parsedLength >= 0 ? parsedLength : undefined;
}

function getBodyByteLength(request: EnquiryRequest) {
  if (typeof request.body === "string") {
    return new TextEncoder().encode(request.body).length;
  }

  if (request.body instanceof URLSearchParams) {
    return new TextEncoder().encode(request.body.toString()).length;
  }

  return undefined;
}

function getCrossSiteBlockReason(request: EnquiryRequest) {
  const fetchSite = getHeader(request, "sec-fetch-site").trim().toLowerCase();

  if (fetchSite === "cross-site") {
    return "cross_site_fetch_site";
  }

  const allowedOrigins = getAllowedOrigins(request);
  const originHeader = getHeader(request, "origin");

  if (originHeader.trim()) {
    if (!isAllowedHeaderOrigin(originHeader, allowedOrigins)) {
      return "mismatched_origin";
    }

    return "";
  }

  const refererHeader = getHeader(request, "referer");

  if (refererHeader.trim() && !isAllowedHeaderOrigin(refererHeader, allowedOrigins)) {
    return "mismatched_referer";
  }

  return "";
}

function getRequestShapeBlock(request: EnquiryRequest): RequestShapeBlock | null {
  const contentType = getHeader(request, "content-type");

  if (!isJsonContentType(contentType) && !isFormContentType(contentType)) {
    return { reason: "unsupported_content_type", status: 415 };
  }

  const declaredContentLength = getDeclaredContentLength(request);
  const bodyByteLength = getBodyByteLength(request);

  if (
    (typeof declaredContentLength === "number" && declaredContentLength > maxEnquiryBodyBytes) ||
    (typeof bodyByteLength === "number" && bodyByteLength > maxEnquiryBodyBytes)
  ) {
    return { reason: "body_too_large", status: 413 };
  }

  const crossSiteBlockReason = getCrossSiteBlockReason(request);

  if (crossSiteBlockReason) {
    return { reason: crossSiteBlockReason, status: 403 };
  }

  return null;
}

function getSafeOriginForLog(headerValue: string) {
  const parsedOrigin = getHeaderOrigin(headerValue);

  if (!headerValue.trim()) {
    return "";
  }

  return parsedOrigin.valid ? parsedOrigin.origin : "invalid";
}

function logBlockedEnquiryRequest(request: EnquiryRequest, block: RequestShapeBlock) {
  console.warn("Enquiry request blocked:", {
    contentLength: getHeader(request, "content-length"),
    contentType: getHeader(request, "content-type"),
    fetchSite: getHeader(request, "sec-fetch-site"),
    host: getHeader(request, "host"),
    method: request.method ?? "",
    origin: getSafeOriginForLog(getHeader(request, "origin")),
    reason: block.reason,
    refererOrigin: getSafeOriginForLog(getHeader(request, "referer")),
    status: block.status,
  });
}

function getPayloadBody(request: EnquiryRequest): Record<string, unknown> {
  const { body: requestBody } = request;
  const contentType = getHeader(request, "content-type").toLowerCase();

  if (requestBody instanceof URLSearchParams) {
    return Object.fromEntries(requestBody.entries());
  }

  if (typeof requestBody === "string") {
    if (isFormContentType(contentType)) {
      return Object.fromEntries(new URLSearchParams(requestBody).entries());
    }

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

function sendJsonError(response: EnquiryResponse, status: number, error: string) {
  return response.status(status).json({ error });
}

function renderNativeResponseHtml(title: string, message: string) {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const safeEmail = escapeHtml(fallbackRecipient);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle} | Vive Counselling</title>
    <style>
      body {
        margin: 0;
        background: #f7f6f2;
        color: #1f2c25;
        font-family: Georgia, "Times New Roman", serif;
        line-height: 1.55;
      }

      main {
        box-sizing: border-box;
        width: min(100%, 680px);
        margin: 12vh auto;
        padding: 32px 24px;
      }

      h1 {
        margin: 0 0 16px;
        font-size: clamp(2rem, 6vw, 3.4rem);
        font-weight: 500;
        line-height: 1.05;
      }

      p {
        margin: 0 0 12px;
        max-width: 56ch;
      }

      a {
        color: #234b3d;
        font-weight: 700;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 24px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${safeTitle}</h1>
      <p>${safeMessage}</p>
      <div class="actions">
        <a href="mailto:${safeEmail}">${safeEmail}</a>
        <a href="/contact">Return to contact and fees</a>
      </div>
    </main>
  </body>
</html>`;
}

function sendNativeHtml(response: EnquiryResponse, status: number, title: string, message: string) {
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");

  return response.status(status).send(renderNativeResponseHtml(title, message));
}

function sendSuccess(response: EnquiryResponse, mode: ResponseMode) {
  if (mode === "html") {
    return sendNativeHtml(response, 200, "Thanks, your enquiry has been sent.", "I will respond as soon as I can.");
  }

  return response.status(200).json({ ok: true });
}

function sendPublicFailure(response: EnquiryResponse, status: number, mode: ResponseMode) {
  if (mode === "html") {
    return sendNativeHtml(response, status, "The enquiry could not be sent.", publicFailureMessage);
  }

  return sendJsonError(response, status, publicFailureMessage);
}

function sendValidationError(response: EnquiryResponse, mode: ResponseMode) {
  if (mode === "html") {
    return sendNativeHtml(response, 400, "The enquiry could not be sent.", publicFailureMessage);
  }

  return sendJsonError(response, 400, invalidSubmissionMessage);
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

function getSenderAddress(configuredSender: string) {
  const sender = configuredSender.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  const addressMatch = sender.match(/<([^<>]+)>$/);

  return (addressMatch?.[1] ?? sender).trim();
}

function getSafeEmailDisplayName(name: string) {
  return name
    .replace(/[\u0000-\u001f\u007f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function quoteEmailDisplayName(name: string) {
  return `"${name.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function getEmailDisplayName(name: string) {
  const displayName = getSafeEmailDisplayName(name) || "Website visitor";
  const atomPattern = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]+$/;

  if (displayName.split(" ").every((part) => atomPattern.test(part))) {
    return displayName;
  }

  return quoteEmailDisplayName(displayName);
}

function getEmailSender(enquiry: ValidatedEnquiry, configuredSender: string) {
  return `${getEmailDisplayName(enquiry.name)} <${getSenderAddress(configuredSender)}>`;
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
      body: JSON.stringify({
        from: getEmailSender(enquiry, from),
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

      return sendPublicFailure(response, 502, responseMode);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("Unexpected enquiry send error:", message);

    return sendPublicFailure(response, 500, responseMode);
  }

  return sendSuccess(response, responseMode);
}
