import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  clearDeliveryEnv,
  createDependencies,
  invokeHandler,
  mockConsoleError,
  mockResendFailure,
  mockResendSuccess,
  publicFailureMessage,
  setDeliveryEnv,
  validGeneralPayload,
} from "./handler-fixtures.mjs";

let dependencies = createDependencies();
afterEach(() => {
  dependencies = createDependencies();
});

function assertNoPublicDetails(result) {
  assert.equal(Object.hasOwn(result.body, "details"), false);
}

test("delivers a structured enquiry with server-owned metadata", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);
  const result = await invokeHandler(dependencies, {
    email: "alex@example.com", enquiryType: "general", message: "I would like to ask a question.",
    name: "Alex Person", subject: "Client supplied subject should be ignored", website: "",
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
  assert.ok(email.subject);
  assert.notEqual(email.subject, "Client supplied subject should be ignored");
  for (const value of ["Alex Person", "alex@example.com", "I would like to ask a question."]) {
    assert.ok(email.text.includes(value));
  }
});

test("sanitizes the visitor display name in the sender address", async () => {
  setDeliveryEnv(dependencies);
  dependencies.environment.ENQUIRY_FROM_EMAIL = "Vive Counselling <no-reply@vivecounselling.com.au>";
  const fetchCalls = mockResendSuccess(dependencies);
  const result = await invokeHandler(dependencies, validGeneralPayload({ name: 'Alex "The Great" Person <script>' }));

  assert.equal(result.statusCode, 200);
  assert.equal(fetchCalls[0].body.from, '"Alex \\"The Great\\" Person script" <no-reply@vivecounselling.com.au>');
  assert.doesNotMatch(fetchCalls[0].body.html, /<script>/);
});

test("returns a safe failure when delivery configuration is missing", async () => {
  clearDeliveryEnv(dependencies);
  const consoleErrors = mockConsoleError(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("unexpected");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload());
  assert.equal(result.statusCode, 500);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.match(consoleErrors.join("\n"), /RESEND_API_KEY|ENQUIRY_FROM_EMAIL/);
  assert.equal(fetchCalled, false);
});

test("maps provider and unexpected delivery failures to safe responses", async () => {
  for (const { configure, expectedStatus } of [
    { configure: () => mockResendFailure(dependencies), expectedStatus: 502 },
    { configure: () => { dependencies.fetch = async () => { throw new Error("network socket reset"); }; }, expectedStatus: 500 },
  ]) {
    setDeliveryEnv(dependencies);
    const consoleErrors = mockConsoleError(dependencies);
    configure();
    const result = await invokeHandler(dependencies, validGeneralPayload());
    assert.equal(result.statusCode, expectedStatus);
    assert.equal(result.body.error, publicFailureMessage);
    assertNoPublicDetails(result);
    assert.doesNotMatch(JSON.stringify(result.body), /network socket reset|quota exceeded/);
    assert.ok(consoleErrors.length > 0);
    dependencies = createDependencies();
  }
});
