import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  clearDeliveryEnv,
  createDependencies,
  encodeForm,
  invokeHandler,
  mockConsoleError,
  mockResendSuccess,
  setDeliveryEnv,
} from "./handler-fixtures.mjs";

let dependencies = createDependencies();

afterEach(() => {
  dependencies = createDependencies();
});

test("accepts a URL-encoded native form submission and returns a safe HTML success page", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies,
    encodeForm({
      contactPath: "question",
      email: "alex@example.com",
      enquiryType: "",
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
  assert.doesNotMatch(result.body, /RESEND_API_KEY|ENQUIRY_FROM_EMAIL|quota exceeded|network socket reset/);
});

test("derives a structured booking from the Contact form path in a native submission", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies,
    encodeForm({
      availability: "Tuesday afternoons",
      contactPath: "appointment",
      email: "sam@example.com",
      enquiryType: "",
      message: "I would like an appointment.",
      name: "Sam River",
      timeZone: "AWST",
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
  assert.ok(fetchCalls[0].body.subject);
  assert.ok(fetchCalls[0].body.text.includes("Tuesday afternoons"));
});

test("derives a consult with mobile details from the Contact form path", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);

  const result = await invokeHandler(dependencies,
    encodeForm({
      availability: "Thursday mornings",
      contactPath: "consult",
      email: "taylor@example.com",
      enquiryType: "",
      message: "I would like a consult.",
      mobile: "0412 345 678",
      name: "Taylor Green",
      timeZone: "AWST",
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
  assert.ok(fetchCalls[0].body.subject);
  assert.ok(fetchCalls[0].body.text.includes("0412 345 678"));
});

test("returns a safe HTML failure page for a URL-encoded native form submission failure", async () => {
  clearDeliveryEnv(dependencies);
  const consoleErrors = mockConsoleError(dependencies);

  const result = await invokeHandler(dependencies,
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
  assert.doesNotMatch(result.body, /RESEND_API_KEY|ENQUIRY_FROM_EMAIL|Missing Vercel env vars/);
  assert.match(consoleErrors.join("\n"), /RESEND_API_KEY/);
});
