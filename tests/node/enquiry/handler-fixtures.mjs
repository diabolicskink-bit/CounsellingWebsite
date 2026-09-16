import { handleEnquiry } from "../../../api/enquiry.ts";
import { createResponse } from "../support/http-response.mjs";

export const publicFailureMessage = "Sorry, the enquiry could not be sent. Please email joel@vivecounselling.com.au directly.";
export const validAnalyticsContext = {
  analyticsPageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
  analyticsVisitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
};

export function createDependencies() {
  return {
    environment: {},
    fetch: async () => {
      throw new Error("Unexpected fetch call");
    },
    logError: () => {},
    logWarning: () => {},
    recordVisitEvent: async () => ({ eventInserted: true }),
    waitUntil: () => {},
  };
}

export function setDeliveryEnv(dependencies) {
  dependencies.environment = {
    ENQUIRY_FROM_EMAIL: "no-reply@vivecounselling.com.au",
    ENQUIRY_TO_EMAIL: "inbox@example.com",
    RESEND_API_KEY: "test_resend_key",
  };
}

export function clearDeliveryEnv(dependencies) {
  dependencies.environment = {};
}

export async function invokeHandler(dependencies, body, options = {}) {
  const { response, result } = createResponse();
  const headers = options.headers === undefined ? jsonHeaders() : options.headers;
  const returned = await handleEnquiry(
    {
      body,
      headers,
      method: options.method ?? "POST",
    },
    response,
    dependencies,
  );

  return returned ?? result;
}

export function mockResendSuccess(dependencies) {
  const calls = [];

  dependencies.fetch = async (url, init) => {
    calls.push({
      body: JSON.parse(init.body),
      headers: init.headers,
      method: init.method,
      url,
    });

    return {
      ok: true,
      status: 200,
      statusText: "OK",
      text: async () => "",
    };
  };

  return calls;
}

export function mockResendFailure(dependencies, { status = 429, statusText = "Too Many Requests", text = "quota exceeded" } = {}) {
  const calls = [];

  dependencies.fetch = async (url, init) => {
    calls.push({
      body: JSON.parse(init.body),
      headers: init.headers,
      method: init.method,
      url,
    });

    return {
      ok: false,
      status,
      statusText,
      text: async () => text,
    };
  };

  return calls;
}

export function mockConsoleError(dependencies) {
  const calls = [];

  dependencies.logError = (...args) => {
    calls.push(args.map(String).join(" "));
  };

  return calls;
}

export function mockConsoleWarn(dependencies) {
  const calls = [];

  dependencies.logWarning = (...args) => {
    calls.push(args);
  };

  return calls;
}

export function mockVisitEvents(dependencies) {
  const events = [];

  dependencies.recordVisitEvent = async (event) => {
    events.push(event);
    return { eventInserted: true };
  };

  return events;
}

export function jsonHeaders(headers = {}) {
  return {
    "content-type": "application/json",
    ...headers,
  };
}

export function encodeForm(fields) {
  return new URLSearchParams(fields).toString();
}

export function validGeneralPayload(overrides = {}) {
  return {
    email: "alex@example.com",
    enquiryType: "general",
    message: "I would like to ask a question.",
    name: "Alex Person",
    website: "",
    ...overrides,
  };
}
