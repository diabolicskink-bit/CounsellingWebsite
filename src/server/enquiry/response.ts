import { escapeHtml } from "./html.ts";
import type { ResponseMode } from "./request.ts";

export type EnquiryResponse = {
  json(body: unknown): unknown;
  send(body: string): unknown;
  setHeader(name: string, value: string): void;
  status(statusCode: number): EnquiryResponse;
};

export const fallbackRecipient = "joel@vivecounselling.com.au";

const invalidSubmissionMessage = "Invalid enquiry submission.";
const publicFailureMessage = `Sorry, the enquiry could not be sent. Please email ${fallbackRecipient} directly.`;

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

export function sendSuccess(response: EnquiryResponse, mode: ResponseMode) {
  if (mode === "html") {
    return sendNativeHtml(response, 200, "Thanks, your enquiry has been sent.", "I will respond as soon as I can.");
  }

  return response.status(200).json({ ok: true });
}

export function sendPublicFailure(response: EnquiryResponse, status: number, mode: ResponseMode) {
  if (mode === "html") {
    return sendNativeHtml(response, status, "The enquiry could not be sent.", publicFailureMessage);
  }

  return sendJsonError(response, status, publicFailureMessage);
}

export function sendValidationError(response: EnquiryResponse, mode: ResponseMode) {
  if (mode === "html") {
    return sendNativeHtml(response, 400, "The enquiry could not be sent.", publicFailureMessage);
  }

  return sendJsonError(response, 400, invalidSubmissionMessage);
}
