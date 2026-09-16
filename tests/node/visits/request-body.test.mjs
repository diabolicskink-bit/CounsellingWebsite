import assert from "node:assert/strict";
import { test } from "node:test";
import { getVisitRequestShapeBlock } from "../../../src/server/visits/request.ts";
import { getVisitEventRequestShapeBlock } from "../../../src/server/visit-events/request.ts";

for (const [name, getBlock, limit] of [
  ["visit and engagement", getVisitRequestShapeBlock, 16 * 1024],
  ["visit event", getVisitEventRequestShapeBlock, 4 * 1024],
]) {
  const headers = { "Content-Type": " Application/JSON; charset=UTF-8" };
  const oversized = { reason: "body_too_large", status: 413 };

  test(`${name} checks declared and actual UTF-8 bytes at its own limit`, () => {
    const body = "\u00e9".repeat(limit / 2);
    assert.equal(getBlock({ body, headers }), null);
    assert.deepEqual(getBlock({ body: `${body}x`, headers }), oversized);
    assert.deepEqual(getBlock({ body: `${body}x`, headers: { ...headers, "content-length": "0" } }), oversized);
    assert.equal(getBlock({ body: {}, headers: { ...headers, "content-length": String(limit) } }), null);
    assert.deepEqual(getBlock({ body: {}, headers: { ...headers, "content-length": String(limit + 1) } }), oversized);
    assert.deepEqual(getBlock({ headers: { ...headers, "content-length": "9".repeat(400) } }), oversized);

    const parsedBody = { text: "x".repeat(limit - Buffer.byteLength(JSON.stringify({ text: "" }))) };
    assert.equal(getBlock({ body: parsedBody, headers }), null);
    assert.deepEqual(getBlock({ body: { text: `${parsedBody.text}x` }, headers }), oversized);
  });

  test(`${name} rejects unserialisable bodies and invalid declared lengths before origin checks`, () => {
    const circular = {};
    circular.self = circular;
    assert.deepEqual(getBlock({ body: circular, headers }), oversized);
    assert.deepEqual(getBlock({ body: { value: 1n }, headers }), oversized);

    for (const value of ["invalid", "-1", "1.5", "Infinity", "1e2", "0x10", "+12", "12.0", "12, 12"]) {
      assert.deepEqual(getBlock({ headers: { ...headers, "content-length": value } }), {
        reason: "invalid_content_length", status: 400,
      });
    }
    for (const value of ["", " ", "0", "12", "0012", " 12 "]) {
      assert.equal(getBlock({ headers: { ...headers, "content-length": value } }), null);
    }

    assert.deepEqual(getBlock({ headers: {
      "content-type": "text/plain", "content-length": "invalid", "sec-fetch-site": "cross-site",
    } }), { reason: "unsupported_content_type", status: 415 });
    assert.deepEqual(getBlock({ body: "x".repeat(limit + 1), headers: {
      ...headers, "sec-fetch-site": "cross-site",
    } }), oversized);
  });
}
