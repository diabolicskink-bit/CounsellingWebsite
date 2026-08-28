import assert from "node:assert/strict";
import { test } from "node:test";
import { createVisitRetentionHandler } from "../../../api/visit-retention.ts";
import { VisitDatabaseConfigurationError } from "../../../src/server/visits/repository.ts";

function createResponse() {
  const result = {
    body: undefined,
    headers: {},
    statusCode: 200,
  };
  const response = {
    end() {
      return result;
    },
    json(body) {
      result.body = body;
      return result;
    },
    setHeader(name, value) {
      result.headers[name.toLowerCase()] = value;
    },
    status(statusCode) {
      result.statusCode = statusCode;
      return response;
    },
  };

  return { response, result };
}

function silenceExpectedLogs(context) {
  const errors = [];
  const infos = [];
  const warnings = [];

  context.mock.method(console, "error", (...args) => errors.push(args));
  context.mock.method(console, "info", (...args) => infos.push(args));
  context.mock.method(console, "warn", (...args) => warnings.push(args));

  return { errors, infos, warnings };
}

async function invoke(handler, { authorization, method = "GET" } = {}) {
  const { response, result } = createResponse();
  const headers = authorization ? { authorization } : {};
  const returned = await handler({ headers, method }, response);

  return returned ?? result;
}

test("runs an authorized retention cleanup and returns counts only", async (context) => {
  const { infos } = silenceExpectedLogs(context);
  let cleanupCalls = 0;
  const handler = createVisitRetentionHandler(
    async () => {
      cleanupCalls += 1;
      return { exclusionsDeleted: 1, pageViewsDeleted: 8, visitsDeleted: 3 };
    },
    () => "test-retention-secret",
  );

  const result = await invoke(handler, {
    authorization: "Bearer test-retention-secret",
  });

  assert.equal(cleanupCalls, 1);
  assert.equal(result.statusCode, 200);
  assert.equal(result.headers["cache-control"], "no-store");
  assert.deepEqual(result.body, {
    ok: true,
    exclusionsDeleted: 1,
    pageViewsDeleted: 8,
    visitsDeleted: 3,
  });
  assert.equal(infos.length, 1);
});

test("rejects missing and incorrect cron authorization before cleanup", async (context) => {
  const { warnings } = silenceExpectedLogs(context);
  let cleanupCalls = 0;
  const handler = createVisitRetentionHandler(
    async () => {
      cleanupCalls += 1;
      return { exclusionsDeleted: 0, pageViewsDeleted: 0, visitsDeleted: 0 };
    },
    () => "test-retention-secret",
  );

  const missing = await invoke(handler);
  const incorrect = await invoke(handler, { authorization: "Bearer incorrect" });

  assert.equal(missing.statusCode, 401);
  assert.equal(incorrect.statusCode, 401);
  assert.equal(cleanupCalls, 0);
  assert.equal(warnings.length, 2);
});

test("fails closed when cron or database configuration is missing", async (context) => {
  const { errors } = silenceExpectedLogs(context);
  let cleanupCalls = 0;
  const missingSecretHandler = createVisitRetentionHandler(
    async () => {
      cleanupCalls += 1;
      return { exclusionsDeleted: 0, pageViewsDeleted: 0, visitsDeleted: 0 };
    },
    () => undefined,
  );
  const missingDatabaseHandler = createVisitRetentionHandler(
    async () => {
      throw new VisitDatabaseConfigurationError();
    },
    () => "test-retention-secret",
  );

  const missingSecret = await invoke(missingSecretHandler);
  const missingDatabase = await invoke(missingDatabaseHandler, {
    authorization: "Bearer test-retention-secret",
  });

  assert.equal(missingSecret.statusCode, 500);
  assert.equal(missingDatabase.statusCode, 500);
  assert.equal(cleanupCalls, 0);
  assert.equal(errors.length, 2);
});

test("rejects non-GET requests", async (context) => {
  silenceExpectedLogs(context);
  let cleanupCalls = 0;
  const handler = createVisitRetentionHandler(
    async () => {
      cleanupCalls += 1;
      return { exclusionsDeleted: 0, pageViewsDeleted: 0, visitsDeleted: 0 };
    },
    () => "test-retention-secret",
  );

  const result = await invoke(handler, {
    authorization: "Bearer test-retention-secret",
    method: "POST",
  });

  assert.equal(result.statusCode, 405);
  assert.equal(result.headers.allow, "GET");
  assert.equal(cleanupCalls, 0);
});

test("keeps cleanup runtime details out of public failures", async (context) => {
  const { errors } = silenceExpectedLogs(context);
  const handler = createVisitRetentionHandler(
    async () => {
      throw new Error("postgres://user:password@private-host/database");
    },
    () => "test-retention-secret",
  );

  const result = await invoke(handler, {
    authorization: "Bearer test-retention-secret",
  });

  assert.equal(result.statusCode, 500);
  assert.deepEqual(result.body, { error: "Visit retention cleanup failed." });
  assert.doesNotMatch(JSON.stringify(errors), /password|private-host/);
});
