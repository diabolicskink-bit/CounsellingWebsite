import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  clearDeliveryEnv,
  createDependencies,
  invokeHandler,
  mockConsoleError,
  mockResendFailure,
  mockResendSuccess,
  mockVisitEvents,
  publicFailureMessage,
  setDeliveryEnv,
  validAnalyticsContext,
  validGeneralPayload,
} from "./handler-fixtures.mjs";

let dependencies = createDependencies();

afterEach(() => {
  dependencies = createDependencies();
});

function assertNoPublicDetails(result) {
  assert.equal(Object.hasOwn(result.body, "details"), false);
}

function assertFailedAnalytics(events, reason) {
  assert.deepEqual(events.map(({ eventType, properties }) => ({ eventType, properties })), [
    { eventType: "enquiry_submit_attempted", properties: {} },
    { eventType: "enquiry_failed", properties: { reason } },
  ]);
}

test("accepts a structured general enquiry and builds the Resend email server-side", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies, {
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

test("uses the visitor name with the configured sender address", async () => {
  setDeliveryEnv(dependencies);
  dependencies.environment.ENQUIRY_FROM_EMAIL = "Vive Counselling <no-reply@vivecounselling.com.au>";
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies,
    validGeneralPayload({
      name: 'Alex "The Great" Person <script>',
    }),
  );

  assert.equal(result.statusCode, 200);

  const email = fetchCalls[0].body;

  assert.equal(email.from, '"Alex \\"The Great\\" Person script" <no-reply@vivecounselling.com.au>');
  assert.equal(email.reply_to, "alex@example.com");
  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.html, /&lt;script&gt;/);
});

test("escapes visitor message markup in the HTML email", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies, validGeneralPayload({
    message: '<img src="x" onerror="alert(1)">',
  }));

  assert.equal(result.statusCode, 200);
  assert.doesNotMatch(fetchCalls[0].body.html, /<img src="x"/);
  assert.match(fetchCalls[0].body.html, /&lt;img src=&quot;x&quot;/);
});

test("accepts a structured appointment booking payload", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies, {
    availability: "Tuesday afternoons",
    bookingType: "appointment",
    email: "sam@example.com",
    enquiryType: "booking",
    message: "I would like an appointment.",
    name: "Sam River",
    timeZone: "AWST",
    website: "",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });

  const email = fetchCalls[0].body;

  assert.equal(email.subject, "App Request - Sam R");
  assert.equal(email.reply_to, "sam@example.com");
  assert.match(email.text, /Booking request: Make an appointment/);
  assert.match(email.text, /Availability: Tuesday afternoons/);
  assert.match(email.text, /Timezone: AWST \(WA\)/);
  assert.doesNotMatch(email.text, /Mobile/);
  assert.match(email.html, /Appointment Enquiry/);
  assert.match(email.html, /Tuesday afternoons/);
});

test("accepts a structured consult booking payload", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies, {
    availability: "Thursday morning",
    bookingType: "consult",
    email: "taylor@example.com",
    enquiryType: "booking",
    message: "Could we book a consult?",
    mobile: "0412 345 678",
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
  assert.match(email.text, /Mobile number: 0412 345 678/);
  assert.match(email.text, /Availability: Thursday morning/);
  assert.match(email.text, /Timezone: AWST \(WA\)/);
  assert.match(email.html, /Consult Enquiry/);
  assert.match(email.html, /Thursday morning/);
  assert.match(email.html, /0412 345 678/);
});

test("returns a generic public error and logs details when delivery env is missing", async () => {
  clearDeliveryEnv(dependencies);
  const consoleErrors = mockConsoleError(dependencies);
  const events = mockVisitEvents(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called without delivery config");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(validAnalyticsContext));

  assert.equal(result.statusCode, 500);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /RESEND_API_KEY/);
  assert.match(consoleErrors.join("\n"), /ENQUIRY_FROM_EMAIL/);
  assert.equal(fetchCalled, false);
  assertFailedAnalytics(events, "configuration");
});

test("returns a generic public error and logs details when Resend rejects a valid payload", async () => {
  setDeliveryEnv(dependencies);
  const consoleErrors = mockConsoleError(dependencies);
  const fetchCalls = mockResendFailure(dependencies);
  const events = mockVisitEvents(dependencies);

  const result = await invokeHandler(dependencies, validGeneralPayload(validAnalyticsContext));

  assert.equal(fetchCalls.length, 1);
  assert.equal(result.statusCode, 502);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /Resend enquiry send failed: 429 quota exceeded/);
  assertFailedAnalytics(events, "email_provider");
});

test("returns a generic public error and logs details when Resend throws unexpectedly", async () => {
  setDeliveryEnv(dependencies);
  const consoleErrors = mockConsoleError(dependencies);
  const events = mockVisitEvents(dependencies);

  dependencies.fetch = async () => {
    throw new Error("network socket reset");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(validAnalyticsContext));

  assert.equal(result.statusCode, 500);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /Unexpected enquiry send error: network socket reset/);
  assertFailedAnalytics(events, "network");
});
