import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { handleEnquiry } from "../../api/enquiry.ts";

const publicFailureMessage = "Sorry, the enquiry could not be sent. Please email joel@vivecounselling.com.au directly.";
const validAnalyticsContext = {
  analyticsPageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
  analyticsVisitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
};

function createDependencies() {
  return {
    environment: {},
    fetch: async () => {
      throw new Error("Unexpected fetch call");
    },
    logError: () => {},
    logWarning: () => {},
    recordVisitEvent: async () => ({ eventInserted: true }),
  };
}

let dependencies = createDependencies();

afterEach(() => {
  dependencies = createDependencies();
});

function setDeliveryEnv() {
  dependencies.environment = {
    ENQUIRY_FROM_EMAIL: "no-reply@vivecounselling.com.au",
    ENQUIRY_TO_EMAIL: "inbox@example.com",
    RESEND_API_KEY: "test_resend_key",
  };
}

function clearDeliveryEnv() {
  dependencies.environment = {};
}

function createResponse() {
  const result = {
    body: undefined,
    headers: {},
    statusCode: 200,
  };

  const response = {
    setHeader(name, value) {
      result.headers[name.toLowerCase()] = value;
    },
    status(statusCode) {
      result.statusCode = statusCode;
      return response;
    },
    json(body) {
      result.body = body;
      return result;
    },
    send(body) {
      result.body = body;
      return result;
    },
  };

  return { response, result };
}

async function invokeHandler(body, options = {}) {
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

function mockResendSuccess() {
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

function mockResendFailure({ status = 429, statusText = "Too Many Requests", text = "quota exceeded" } = {}) {
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

function mockConsoleError() {
  const calls = [];

  dependencies.logError = (...args) => {
    calls.push(args.map(String).join(" "));
  };

  return calls;
}

function mockConsoleWarn() {
  const calls = [];

  dependencies.logWarning = (...args) => {
    calls.push(args);
  };

  return calls;
}

function mockVisitEvents() {
  const events = [];

  dependencies.recordVisitEvent = async (event) => {
    events.push(event);
    return { eventInserted: true };
  };

  return events;
}

function assertFailedAnalytics(events, reason) {
  assert.deepEqual(events.map(({ eventType, properties }) => ({ eventType, properties })), [
    { eventType: "enquiry_submit_attempted", properties: {} },
    { eventType: "enquiry_failed", properties: { reason } },
  ]);
}

function jsonHeaders(headers = {}) {
  return {
    "content-type": "application/json",
    ...headers,
  };
}

function encodeForm(fields) {
  return new URLSearchParams(fields).toString();
}

function assertNoPublicDetails(result) {
  assert.equal(Object.hasOwn(result.body, "details"), false);
}

function validGeneralPayload(overrides = {}) {
  return {
    email: "alex@example.com",
    enquiryType: "general",
    message: "I would like to ask a question.",
    name: "Alex Person",
    website: "",
    ...overrides,
  };
}

function assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, { reason, status }) {
  const warningText = JSON.stringify(consoleWarnings);

  assert.equal(result.statusCode, status);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.equal(fetchCalled, false);
  assert.match(warningText, new RegExp(reason));
  assert.doesNotMatch(warningText, /I would like to ask a question|secret body|alex@example\.com|Alex Person/);
}

test("accepts a structured general enquiry and builds the Resend email server-side", async () => {
  setDeliveryEnv();
  const fetchCalls = mockResendSuccess();

  const result = await invokeHandler({
    email: "alex@example.com",
    enquiryType: "general",
    message: "I would like to ask a question.",
    name: "Alex Person",
    subject: "Client supplied subject should be ignored",
    website: "",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].url, "https://api.resend.com/emails");
  assert.equal(fetchCalls[0].method, "POST");
  assert.equal(fetchCalls[0].headers.Authorization, "Bearer test_resend_key");

  const email = fetchCalls[0].body;

  assert.equal(email.from, "Alex Person <no-reply@vivecounselling.com.au>");
  assert.equal(email.to, "inbox@example.com");
  assert.equal(email.reply_to, "alex@example.com");
  assert.equal(email.subject, "General Enq - Alex P");
  assert.match(email.text, /Enquiry type: General enquiry/);
  assert.match(email.text, /Name: Alex Person/);
  assert.match(email.text, /Email: alex@example\.com/);
  assert.match(email.text, /Message:\nI would like to ask a question\./);
  assert.match(email.html, /General Enquiry/);
  assert.match(email.html, /Alex Person/);
  assert.doesNotMatch(email.text, /Client supplied subject/);
});

test("records authoritative enquiry attempt and sent events against the visit", async () => {
  setDeliveryEnv();
  mockResendSuccess();
  const events = mockVisitEvents();

  const result = await invokeHandler(validGeneralPayload({
    ...validAnalyticsContext,
  }));

  assert.equal(result.statusCode, 200);
  assert.deepEqual(events.map(({ eventId, ...event }) => event), [
    {
      eventType: "enquiry_submit_attempted",
      pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
      properties: {},
      source: "server",
      visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
    },
    {
      eventType: "enquiry_sent",
      pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
      properties: {},
      source: "server",
      visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
    },
  ]);
  assert.ok(events.every(({ eventId }) => /^[0-9a-f-]{36}$/i.test(eventId)));
  assert.notEqual(events[0].eventId, events[1].eventId);
});

test("records a controlled failed event when delivery rejects an attempted enquiry", async () => {
  setDeliveryEnv();
  mockResendFailure();
  const events = mockVisitEvents();

  const result = await invokeHandler(validGeneralPayload({
    ...validAnalyticsContext,
  }));

  assert.equal(result.statusCode, 502);
  assertFailedAnalytics(events, "email_provider");
});

test("ignores invalid optional analytics context without affecting delivery", async () => {
  setDeliveryEnv();
  mockResendSuccess();
  let eventCalls = 0;
  dependencies.recordVisitEvent = async () => {
    eventCalls += 1;
  };

  const result = await invokeHandler(validGeneralPayload({
    analyticsPageViewId: "not-a-page-view",
    analyticsVisitId: "not-a-visit",
  }));

  assert.equal(result.statusCode, 200);
  assert.equal(eventCalls, 0);
});

test("keeps valid visit context when page-view context is invalid", async () => {
  setDeliveryEnv();
  mockResendSuccess();
  const events = mockVisitEvents();

  const result = await invokeHandler(validGeneralPayload({
    analyticsPageViewId: "not-a-page-view",
    analyticsVisitId: validAnalyticsContext.analyticsVisitId,
  }));

  assert.equal(result.statusCode, 200);
  assert.equal(events.length, 2);
  assert.ok(events.every(({ pageViewId }) => pageViewId === null));
  assert.ok(events.every(({ visitId }) => visitId === validAnalyticsContext.analyticsVisitId));
});

test("keeps enquiry delivery successful when event storage is unavailable", async () => {
  setDeliveryEnv();
  const fetchCalls = mockResendSuccess();
  const warnings = mockConsoleWarn();
  dependencies.recordVisitEvent = async () => {
    throw new Error("private analytics database detail");
  };

  const result = await invokeHandler(validGeneralPayload({
    analyticsPageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    analyticsVisitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
  }));

  assert.equal(result.statusCode, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(JSON.stringify(warnings), /Enquiry analytics event could not be recorded/);
  assert.doesNotMatch(JSON.stringify(warnings), /private analytics database detail/);
});

test("uses the visitor name with the configured sender address", async () => {
  setDeliveryEnv();
  dependencies.environment.ENQUIRY_FROM_EMAIL = "Vive Counselling <no-reply@vivecounselling.com.au>";
  const fetchCalls = mockResendSuccess();

  const result = await invokeHandler(
    validGeneralPayload({
      name: 'Alex "The Great" Person <script>',
    }),
  );

  assert.equal(result.statusCode, 200);

  const email = fetchCalls[0].body;

  assert.equal(email.from, '"Alex \\"The Great\\" Person script" <no-reply@vivecounselling.com.au>');
  assert.equal(email.reply_to, "alex@example.com");
});

test("accepts a structured appointment booking payload", async () => {
  setDeliveryEnv();
  const fetchCalls = mockResendSuccess();

  const result = await invokeHandler({
    bookingType: "appointment",
    email: "sam@example.com",
    enquiryType: "booking",
    message: "I would like an appointment.",
    name: "Sam River",
    state: "wa",
    timing: "Tuesday afternoons",
    website: "",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });

  const email = fetchCalls[0].body;

  assert.equal(email.subject, "App Request - Sam R");
  assert.equal(email.reply_to, "sam@example.com");
  assert.match(email.text, /Booking request: Make an appointment/);
  assert.match(email.text, /Preferred timing: Tuesday afternoons/);
  assert.match(email.text, /State or territory: Western Australia/);
  assert.match(email.html, /Appointment Enquiry/);
  assert.match(email.html, /Tuesday afternoons/);
});

test("accepts a structured consult booking payload", async () => {
  setDeliveryEnv();
  const fetchCalls = mockResendSuccess();

  const result = await invokeHandler({
    availability: "Thursday morning",
    bookingType: "consult",
    email: "taylor@example.com",
    enquiryType: "booking",
    message: "Could we book a consult?",
    name: "Taylor Green",
    timeZone: "AWST",
    website: "",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });

  const email = fetchCalls[0].body;

  assert.equal(email.subject, "Consult Request - Taylor G");
  assert.equal(email.reply_to, "taylor@example.com");
  assert.match(email.text, /Booking request: Request a 15-minute consult/);
  assert.match(email.text, /Availability: Thursday morning/);
  assert.match(email.text, /Timezone: AWST \(WA\)/);
  assert.match(email.html, /Consult Enquiry/);
  assert.match(email.html, /Thursday morning/);
});

test("accepts a valid JSON submission when origin, referer, and fetch-site headers are absent", async () => {
  setDeliveryEnv();
  const fetchCalls = mockResendSuccess();

  const result = await invokeHandler(validGeneralPayload());

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(fetchCalls.length, 1);
});

test("rejects a missing content type safely before delivery", async () => {
  setDeliveryEnv();
  const consoleWarnings = mockConsoleWarn();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for blocked request shapes");
  };

  const result = await invokeHandler(validGeneralPayload(), { headers: {} });

  assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, {
    reason: "unsupported_content_type",
    status: 415,
  });
});

test("rejects an unsupported content type safely before delivery", async () => {
  setDeliveryEnv();
  const consoleWarnings = mockConsoleWarn();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for blocked request shapes");
  };

  const result = await invokeHandler("secret body", {
    headers: {
      "content-type": "text/plain",
    },
  });

  assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, {
    reason: "unsupported_content_type",
    status: 415,
  });
});

test("rejects multipart form submissions with a safe HTML failure page", async () => {
  setDeliveryEnv();
  const consoleWarnings = mockConsoleWarn();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for multipart submissions");
  };

  const result = await invokeHandler("secret body", {
    headers: {
      accept: "text/html",
      "content-type": "multipart/form-data; boundary=abc123",
    },
  });
  const warningText = JSON.stringify(consoleWarnings);

  assert.equal(result.statusCode, 415);
  assert.equal(result.headers["content-type"], "text/html; charset=utf-8");
  assert.equal(typeof result.body, "string");
  assert.match(result.body, /The enquiry could not be sent\./);
  assert.match(result.body, /joel@vivecounselling\.com\.au/);
  assert.doesNotMatch(result.body, /multipart|unsupported_content_type|secret body/);
  assert.equal(fetchCalled, false);
  assert.match(warningText, /unsupported_content_type/);
  assert.doesNotMatch(warningText, /secret body/);
});

test("rejects an oversized declared body safely before delivery", async () => {
  setDeliveryEnv();
  const consoleWarnings = mockConsoleWarn();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for oversized submissions");
  };

  const result = await invokeHandler(validGeneralPayload(), {
    headers: jsonHeaders({
      "content-length": "25601",
    }),
  });

  assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, {
    reason: "body_too_large",
    status: 413,
  });
});

test("rejects an explicit cross-site fetch-site signal safely before delivery", async () => {
  setDeliveryEnv();
  const consoleWarnings = mockConsoleWarn();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for cross-site submissions");
  };

  const result = await invokeHandler(validGeneralPayload(), {
    headers: jsonHeaders({
      "sec-fetch-site": "cross-site",
    }),
  });

  assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, {
    reason: "cross_site_fetch_site",
    status: 403,
  });
});

test("rejects a mismatched origin safely before delivery", async () => {
  setDeliveryEnv();
  const consoleWarnings = mockConsoleWarn();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for mismatched origins");
  };

  const result = await invokeHandler(validGeneralPayload(), {
    headers: jsonHeaders({
      host: "vivecounselling.com",
      origin: "https://attacker.example",
      "x-forwarded-proto": "https",
    }),
  });

  assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, {
    reason: "mismatched_origin",
    status: 403,
  });
});

test("rejects a mismatched referer when origin is absent safely before delivery", async () => {
  setDeliveryEnv();
  const consoleWarnings = mockConsoleWarn();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for mismatched referers");
  };

  const result = await invokeHandler(validGeneralPayload(), {
    headers: jsonHeaders({
      host: "vivecounselling.com",
      referer: "https://attacker.example/secret-body",
      "x-forwarded-proto": "https",
    }),
  });
  const warningText = JSON.stringify(consoleWarnings);

  assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, {
    reason: "mismatched_referer",
    status: 403,
  });
  assert.doesNotMatch(warningText, /secret-body/);
});

test("short-circuits honeypot submissions without sending email", async () => {
  clearDeliveryEnv();
  const events = mockVisitEvents();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for honeypot submissions");
  };

  const result = await invokeHandler({
    ...validAnalyticsContext,
    email: "spam@example.com",
    enquiryType: "general",
    message: "Hello",
    name: "Spam Bot",
    website: "https://example.com",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(fetchCalled, false);
  assert.equal(events.length, 0);
});

test("rejects the old composed subject body replyTo payload", async () => {
  setDeliveryEnv();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for invalid submissions");
  };

  const result = await invokeHandler({
    body: "Name: Old Client\n\nMessage:\nHello",
    replyTo: "old@example.com",
    subject: "Old composed payload",
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.body.error, "Invalid enquiry submission.");
  assertNoPublicDetails(result);
  assert.equal(fetchCalled, false);
});

test("returns a generic validation error for missing and invalid base fields", async () => {
  setDeliveryEnv();
  const events = mockVisitEvents();
  const result = await invokeHandler({
    ...validAnalyticsContext,
    email: "not-an-email",
    enquiryType: "not-valid",
    message: "",
    name: "",
    website: "",
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.body.error, "Invalid enquiry submission.");
  assertNoPublicDetails(result);
  assert.equal(events.length, 0);
});

test("returns a generic validation error for invalid booking fields", async () => {
  setDeliveryEnv();
  const result = await invokeHandler({
    bookingType: "appointment",
    email: "sam@example.com",
    enquiryType: "booking",
    message: "Hello",
    name: "Sam River",
    state: "moon",
    timing: "",
    website: "",
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.body.error, "Invalid enquiry submission.");
  assertNoPublicDetails(result);
});

test("returns a generic public error and logs details when delivery env is missing", async () => {
  clearDeliveryEnv();
  const consoleErrors = mockConsoleError();
  const events = mockVisitEvents();
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called without delivery config");
  };

  const result = await invokeHandler(validGeneralPayload(validAnalyticsContext));

  assert.equal(result.statusCode, 500);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /RESEND_API_KEY/);
  assert.match(consoleErrors.join("\n"), /ENQUIRY_FROM_EMAIL/);
  assert.equal(fetchCalled, false);
  assertFailedAnalytics(events, "configuration");
});

test("returns a generic public error and logs details when Resend rejects a valid payload", async () => {
  setDeliveryEnv();
  const consoleErrors = mockConsoleError();
  const fetchCalls = mockResendFailure();
  const events = mockVisitEvents();

  const result = await invokeHandler(validGeneralPayload(validAnalyticsContext));

  assert.equal(fetchCalls.length, 1);
  assert.equal(result.statusCode, 502);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /Resend enquiry send failed: 429 quota exceeded/);
  assertFailedAnalytics(events, "email_provider");
});

test("returns a generic public error and logs details when Resend throws unexpectedly", async () => {
  setDeliveryEnv();
  const consoleErrors = mockConsoleError();
  const events = mockVisitEvents();

  dependencies.fetch = async () => {
    throw new Error("network socket reset");
  };

  const result = await invokeHandler(validGeneralPayload(validAnalyticsContext));

  assert.equal(result.statusCode, 500);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /Unexpected enquiry send error: network socket reset/);
  assertFailedAnalytics(events, "network");
});

test("accepts a URL-encoded native form submission and returns a safe HTML success page", async () => {
  setDeliveryEnv();
  const fetchCalls = mockResendSuccess();

  const result = await invokeHandler(
    encodeForm({
      email: "alex@example.com",
      enquiryType: "general",
      message: "I would like to ask a question.",
      name: "Alex Person",
      website: "",
    }),
    {
      headers: {
        accept: "text/html",
        "content-type": "application/x-www-form-urlencoded",
      },
    },
  );

  assert.equal(result.statusCode, 200);
  assert.equal(result.headers["content-type"], "text/html; charset=utf-8");
  assert.equal(fetchCalls.length, 1);
  assert.equal(typeof result.body, "string");
  assert.match(result.body, /Your enquiry has been sent\./);
  assert.match(result.body, /I’ll reply as soon as I can, usually within 24 hours\./);
  assert.doesNotMatch(result.body, /RESEND_API_KEY|ENQUIRY_FROM_EMAIL|quota exceeded|network socket reset/);
});

test("derives a structured booking from the Contact form path in a native submission", async () => {
  setDeliveryEnv();
  const fetchCalls = mockResendSuccess();

  const result = await invokeHandler(
    encodeForm({
      contactPath: "appointment",
      email: "sam@example.com",
      enquiryType: "",
      message: "I would like an appointment.",
      name: "Sam River",
      state: "wa",
      timing: "Tuesday afternoons",
      website: "",
    }),
    {
      headers: {
        accept: "text/html",
        "content-type": "application/x-www-form-urlencoded",
      },
    },
  );

  assert.equal(result.statusCode, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].body.subject, "App Request - Sam R");
  assert.match(fetchCalls[0].body.text, /Booking request: Make an appointment/);
});

test("returns a safe HTML failure page for a URL-encoded native form submission failure", async () => {
  clearDeliveryEnv();
  const consoleErrors = mockConsoleError();

  const result = await invokeHandler(
    encodeForm({
      email: "alex@example.com",
      enquiryType: "general",
      message: "Hello",
      name: "Alex Person",
      website: "",
    }),
    {
      headers: {
        accept: "text/html",
        "content-type": "application/x-www-form-urlencoded",
      },
    },
  );

  assert.equal(result.statusCode, 500);
  assert.equal(result.headers["content-type"], "text/html; charset=utf-8");
  assert.equal(typeof result.body, "string");
  assert.match(result.body, /The enquiry could not be sent\./);
  assert.match(result.body, /joel@vivecounselling\.com\.au/);
  assert.doesNotMatch(result.body, /RESEND_API_KEY|ENQUIRY_FROM_EMAIL|Missing Vercel env vars/);
  assert.match(consoleErrors.join("\n"), /RESEND_API_KEY/);
});
