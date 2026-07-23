import { escapeHtml } from "./html.ts";
import type { ValidatedEnquiry } from "./validation.ts";

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

type EnquiryEmailAddresses = {
  from: string;
  to: string;
};

const subjectLabels: Record<string, string> = {
  appointment: "App Request",
  booking: "Book Enq",
  consult: "Consult Request",
  general: "General Enq",
};

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

export function buildEnquiryEmail(enquiry: ValidatedEnquiry, addresses: EnquiryEmailAddresses) {
  return {
    from: getEmailSender(enquiry, addresses.from),
    html: getEnquiryHtml(enquiry),
    reply_to: enquiry.email,
    subject: getEmailSubject(enquiry),
    text: getEnquiryText(enquiry),
    to: addresses.to,
  };
}
