import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  clearDeliveryEnv,
  createDependencies,
  invokeHandler,
  jsonHeaders,
  mockConsoleWarn,
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

function assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, { reason, status }) {
  const warningText = JSON.stringify(consoleWarnings);

  assert.equal(result.statusCode, status);
  assert.equal(result.body.error, publicFailureMessage);
  assertNoPublicDetails(result);
  assert.equal(fetchCalled, false);
  assert.match(warningText, new RegExp(reason));
  assert.doesNotMatch(warningText, /I would like to ask a question|secret body|alex@example\.com|Alex Person/);
}

test("rejects a consult without a mobile number before delivery", async () => {
  setDeliveryEnv(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for an incomplete consult");
  };

  const result = await invokeHandler(dependencies, {
    availability: "Thursday morning",
    bookingType: "consult",
    email: "taylor@example.com",
    enquiryType: "booking",
    message: "Could we book a consult?",
    mobile: "",
    name: "Taylor Green",
    timeZone: "AWST",
    website: "",
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.body.error, "Invalid enquiry submission.");
  assert.equal(fetchCalled, false);
});

test("accepts a valid JSON submission when origin, referer, and fetch-site headers are absent", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies, JSON.stringify(validGeneralPayload()));

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(fetchCalls.length, 1);
});

test("accepts a local IPv6 origin when forwarded protocol metadata is absent", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies, validGeneralPayload(), {
    headers: jsonHeaders({
      host: "[::1]:4287",
      origin: "http://[::1]:4287",
    }),
  });

  assert.equal(result.statusCode, 200);
  assert.equal(fetchCalls.length, 1);
});

test("accepts a matching production origin", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies, validGeneralPayload(), {
    headers: jsonHeaders({
      host: "vivecounselling.com.au",
      origin: "https://vivecounselling.com.au",
      "x-forwarded-proto": "https",
    }),
  });

  assert.equal(result.statusCode, 200);
  assert.equal(fetchCalls.length, 1);
});

test("rejects a missing content type safely before delivery", async () => {
  setDeliveryEnv(dependencies);
  const consoleWarnings = mockConsoleWarn(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for blocked request shapes");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(), { headers: {} });

  assertBlockedWithoutDelivery(result, fetchCalled, consoleWarnings, {
    reason: "unsupported_content_type",
    status: 415,
  });
});

test("rejects an unsupported content type safely before delivery", async () => {
  setDeliveryEnv(dependencies);
  const consoleWarnings = mockConsoleWarn(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for blocked request shapes");
  };

  const result = await invokeHandler(dependencies, "secret body", {
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
  setDeliveryEnv(dependencies);
  const consoleWarnings = mockConsoleWarn(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for multipart submissions");
  };

  const result = await invokeHandler(dependencies, "secret body", {
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
  setDeliveryEnv(dependencies);
  const consoleWarnings = mockConsoleWarn(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for oversized submissions");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(), {
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
  setDeliveryEnv(dependencies);
  const consoleWarnings = mockConsoleWarn(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for cross-site submissions");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(), {
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
  setDeliveryEnv(dependencies);
  const consoleWarnings = mockConsoleWarn(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for mismatched origins");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(), {
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
  setDeliveryEnv(dependencies);
  const consoleWarnings = mockConsoleWarn(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for mismatched referers");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(), {
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
  clearDeliveryEnv(dependencies);
  const events = mockVisitEvents(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for honeypot submissions");
  };

  const result = await invokeHandler(dependencies, {
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
  setDeliveryEnv(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for invalid submissions");
  };

  const result = await invokeHandler(dependencies, {
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
  setDeliveryEnv(dependencies);
  const events = mockVisitEvents(dependencies);
  const result = await invokeHandler(dependencies, {
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

test("rejects overlong enquiry fields instead of silently truncating them", async () => {
  setDeliveryEnv(dependencies);
  let fetchCalled = false;
  dependencies.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called for overlong fields");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload({
    name: "A".repeat(161),
  }));

  assert.equal(result.statusCode, 400);
  assert.equal(result.body.error, "Invalid enquiry submission.");
  assert.equal(fetchCalled, false);
});

for (const timeZone of ["GMT+8", "constructor", "__proto__", "toString"]) {
  test(`rejects the invalid booking timezone ${timeZone} before sending email`, async () => {
    setDeliveryEnv(dependencies);
    const emails = mockResendSuccess(dependencies);
    const result = await invokeHandler(dependencies, {
      availability: "Tuesday afternoons",
      bookingType: "appointment",
      email: "sam@example.com",
      enquiryType: "booking",
      message: "Hello",
      name: "Sam River",
      timeZone,
      website: "",
    });

    assert.equal(result.statusCode, 400);
    assert.equal(result.body.error, "Invalid enquiry submission.");
    assertNoPublicDetails(result);
    assert.equal(emails.length, 0);
  });
}
