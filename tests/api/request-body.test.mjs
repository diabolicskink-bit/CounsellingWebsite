import assert from "node:assert/strict";
import { test } from "node:test";
import { getPayloadBody } from "../../src/server/enquiry/request.ts";
import { getJsonPayloadBody } from "../../src/server/request-body.ts";
import { getVisitRequestShapeBlock } from "../../src/server/visits/request.ts";
import { getVisitEventRequestShapeBlock } from "../../src/server/visit-events/request.ts";

for (const [name, parseBody] of [
  ["enquiry", getPayloadBody],
  ["JSON decoder", getJsonPayloadBody],
]) {
  test(`${name} accepts JSON objects and leaves malformed or non-object bodies to payload validation`, () => {
    const payload = { message: "Example", nested: { enabled: true } };
    assert.equal(parseBody({ body: payload }), payload);
    assert.deepEqual(parseBody({ body: JSON.stringify(payload) }), payload);

    for (const body of [undefined, null, false, 42, [], "", "{", "null", "false", "42", "[]", '"text"']) {
      assert.deepEqual(parseBody({ body }), {});
    }
  });
}

test("enquiries retain native form decoding alongside JSON", () => {
  const body = "message=First&message=Hello+%26+welcome&name=Taylor";
  const expected = { message: "Hello & welcome", name: "Taylor" };
  assert.deepEqual(getPayloadBody({
    body,
    headers: { "Content-Type": " Application/X-WWW-Form-Urlencoded; charset=UTF-8" },
  }), expected);
  assert.deepEqual(getPayloadBody({ body: new URLSearchParams(body) }), expected);
});

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
