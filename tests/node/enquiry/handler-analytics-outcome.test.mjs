import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  createDependencies,
  invokeHandler,
  mockConsoleWarn,
  mockResendFailure,
  mockResendSuccess,
  mockVisitEvents,
  setDeliveryEnv,
  validAnalyticsContext,
  validGeneralPayload,
} from "./handler-fixtures.mjs";

let dependencies = createDependencies();

afterEach(() => {
  dependencies = createDependencies();
});

function assertFailedAnalytics(events, reason) {
  assert.deepEqual(events.map(({ eventType, properties }) => ({ eventType, properties })), [
    { eventType: "enquiry_submit_attempted", properties: {} },
    { eventType: "enquiry_failed", properties: { reason } },
  ]);
}

test("records authoritative enquiry attempt and sent events against the visit", async () => {
  setDeliveryEnv(dependencies);
  mockResendSuccess(dependencies);
  const events = mockVisitEvents(dependencies);

  const result = await invokeHandler(dependencies, validGeneralPayload({
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
  setDeliveryEnv(dependencies);
  mockResendFailure(dependencies);
  const events = mockVisitEvents(dependencies);

  const result = await invokeHandler(dependencies, validGeneralPayload({
    ...validAnalyticsContext,
  }));

  assert.equal(result.statusCode, 502);
  assertFailedAnalytics(events, "email_provider");
});

test("ignores invalid optional analytics context without affecting delivery", async () => {
  setDeliveryEnv(dependencies);
  mockResendSuccess(dependencies);
  let eventCalls = 0;
  dependencies.recordVisitEvent = async () => {
    eventCalls += 1;
  };

  const result = await invokeHandler(dependencies, validGeneralPayload({
    analyticsPageViewId: "not-a-page-view",
    analyticsVisitId: "not-a-visit",
  }));

  assert.equal(result.statusCode, 200);
  assert.equal(eventCalls, 0);
});

test("keeps valid visit context when page-view context is invalid", async () => {
  setDeliveryEnv(dependencies);
  mockResendSuccess(dependencies);
  const events = mockVisitEvents(dependencies);

  const result = await invokeHandler(dependencies, validGeneralPayload({
    analyticsPageViewId: "not-a-page-view",
    analyticsVisitId: validAnalyticsContext.analyticsVisitId,
  }));

  assert.equal(result.statusCode, 200);
  assert.equal(events.length, 2);
  assert.ok(events.every(({ pageViewId }) => pageViewId === null));
  assert.ok(events.every(({ visitId }) => visitId === validAnalyticsContext.analyticsVisitId));
});

test("keeps enquiry delivery successful when event storage is unavailable", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);
  const warnings = mockConsoleWarn(dependencies);
  dependencies.recordVisitEvent = async () => {
    throw new Error("private analytics database detail");
  };

  const result = await invokeHandler(dependencies, validGeneralPayload({
    analyticsPageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    analyticsVisitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
  }));

  assert.equal(result.statusCode, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(JSON.stringify(warnings), /Enquiry analytics event could not be recorded/);
  assert.doesNotMatch(JSON.stringify(warnings), /private analytics database detail/);
});

test("does not wait for analytics storage and preserves enquiry event order", async () => {
  setDeliveryEnv(dependencies);
  const fetchCalls = mockResendSuccess(dependencies);
  const recordedEventTypes = [];
  const scheduledWork = [];
  let releaseAttemptedEvent;
  dependencies.recordVisitEvent = (event) => {
    recordedEventTypes.push(event.eventType);

    if (event.eventType === "enquiry_submit_attempted") {
      return new Promise((resolve) => {
        releaseAttemptedEvent = resolve;
      });
    }

    return Promise.resolve({ eventInserted: true });
  };
  dependencies.waitUntil = (work) => {
    scheduledWork.push(work);
  };

  const result = await invokeHandler(dependencies, validGeneralPayload(validAnalyticsContext));

  assert.equal(result.statusCode, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(scheduledWork.length, 2);
  assert.deepEqual(recordedEventTypes, ["enquiry_submit_attempted"]);

  releaseAttemptedEvent({ eventInserted: true });
  await scheduledWork[1];

  assert.deepEqual(recordedEventTypes, ["enquiry_submit_attempted", "enquiry_sent"]);
});