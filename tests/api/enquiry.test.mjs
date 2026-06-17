import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import handler from "../../api/enquiry.ts";

const deliveryEnvKeys = ["RESEND_API_KEY", "ENQUIRY_FROM_EMAIL", "ENQUIRY_TO_EMAIL"];
const originalEnv = Object.fromEntries(deliveryEnvKeys.map((key) => [key, process.env[key]]));
const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const publicFailureMessage = "Sorry, the enquiry could not be sent. Please email diabolicskink@gmail.com directly.";

afterEach(() => {
  for (const key of deliveryEnvKeys) {
    if (typeof originalEnv[key] === "undefined") {
      delete process.env[key];
    } else {
      process.env[key] = originalEnv[key];
    }
  }

  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});

function setDeliveryEnv() {
  process.env.RESEND_API_KEY = "test_resend_key";
  process.env.ENQUIRY_FROM_EMAIL = "Joel <hello@example.com>";
  process.env.ENQUIRY_TO_EMAIL = "inbox@example.com";
}

function clearDeliveryEnv() {
  for (const key of deliveryEnvKeys) {
    delete process.env[key];
  }
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
  const returned = await handler(
    {
      body,
      headers: options.headers,
      method: options.method ?? "POST",
    },
    response,
  );

  return returned ?? result;
}

function mockResendSuccess() {
  const calls = [];

  globalThis.fetch = async (url, init) => {
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

  globalThis.fetch = async (url, init) => {
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

  console.error = (...args) => {
    calls.push(args.map(String).join(" "));
  };

  return calls;
}

function encodeForm(fields) {
  return new URLSearchParams(fields).toString();
}

function assertNoPublicDetails(result) {
  assert.equal(Object.hasOwn(result.body, "details"), false);
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

  assert.equal(email.from, "Joel <hello@example.com>");
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

test("short-circuits honeypot submissions without sending email", async () => {
  clearDeliveryEnv();
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for honeypot submissions");
  };

  const result = await invokeHandler({
    email: "spam@example.com",
    enquiryType: "general",
    message: "Hello",
    name: "Spam Bot",
    website: "https://example.com",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(fetchCalled, false);
});

test("rejects the old composed subject body replyTo payload", async () => {
  setDeliveryEnv();
  let fetchCalled = false;
  globalThis.fetch = async () => {
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
  const result = await invokeHandler({
    email: "not-an-email",
    enquiryType: "not-valid",
    message: "",
    name: "",
    website: "",
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.body.error, "Invalid enquiry submission.");
  assertNoPublicDetails(result);
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
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called without delivery config");
  };

  const result = await invokeHandler({
    email: "alex@example.com",
    enquiryType: "general",
    message: "Hello",
    name: "Alex Person",
    website: "",
  });

  assert.equal(result.statusCode, 500);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /RESEND_API_KEY/);
  assert.match(consoleErrors.join("\n"), /ENQUIRY_FROM_EMAIL/);
  assert.equal(fetchCalled, false);
});

test("returns a generic public error and logs details when Resend rejects a valid payload", async () => {
  setDeliveryEnv();
  const consoleErrors = mockConsoleError();
  const fetchCalls = mockResendFailure();

  const result = await invokeHandler({
    email: "alex@example.com",
    enquiryType: "general",
    message: "Hello",
    name: "Alex Person",
    website: "",
  });

  assert.equal(fetchCalls.length, 1);
  assert.equal(result.statusCode, 502);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /Resend enquiry send failed: 429 quota exceeded/);
});

test("returns a generic public error and logs details when Resend throws unexpectedly", async () => {
  setDeliveryEnv();
  const consoleErrors = mockConsoleError();

  globalThis.fetch = async () => {
    throw new Error("network socket reset");
  };

  const result = await invokeHandler({
    email: "alex@example.com",
    enquiryType: "general",
    message: "Hello",
    name: "Alex Person",
    website: "",
  });

  assert.equal(result.statusCode, 500);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /Unexpected enquiry send error: network socket reset/);
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
  assert.match(result.body, /Thanks, your enquiry has been sent\./);
  assert.match(result.body, /I will respond as soon as I can\./);
  assert.doesNotMatch(result.body, /RESEND_API_KEY|ENQUIRY_FROM_EMAIL|quota exceeded|network socket reset/);
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
  assert.match(result.body, /diabolicskink@gmail\.com/);
  assert.doesNotMatch(result.body, /RESEND_API_KEY|ENQUIRY_FROM_EMAIL|Missing Vercel env vars/);
  assert.match(consoleErrors.join("\n"), /RESEND_API_KEY/);
});
