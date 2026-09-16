import assert from "node:assert/strict";
import { test } from "node:test";
import { getPayloadBody } from "../../../src/server/enquiry/request.ts";

test("enquiry accepts JSON objects and leaves malformed or non-object bodies to payload validation", () => {
  const payload = { message: "Example", nested: { enabled: true } };
  assert.equal(getPayloadBody({ body: payload }), payload);
  assert.deepEqual(getPayloadBody({ body: JSON.stringify(payload) }), payload);

  for (const body of [undefined, null, false, 42, [], "", "{", "null", "false", "42", "[]", '"text"']) {
    assert.deepEqual(getPayloadBody({ body }), {});
  }
});

test("enquiries retain native form decoding alongside JSON", () => {
  const body = "message=First&message=Hello+%26+welcome&name=Taylor";
  const expected = { message: "Hello & welcome", name: "Taylor" };
  assert.deepEqual(getPayloadBody({
    body,
    headers: { "Content-Type": " Application/X-WWW-Form-Urlencoded; charset=UTF-8" },
  }), expected);
  assert.deepEqual(getPayloadBody({ body: new URLSearchParams(body) }), expected);
});
