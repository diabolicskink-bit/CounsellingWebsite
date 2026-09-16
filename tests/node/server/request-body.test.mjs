import assert from "node:assert/strict";
import { test } from "node:test";
import { getJsonPayloadBody } from "../../../src/server/request-body.ts";

test("JSON decoder accepts JSON objects and leaves malformed or non-object bodies to payload validation", () => {
  const payload = { message: "Example", nested: { enabled: true } };
  assert.equal(getJsonPayloadBody({ body: payload }), payload);
  assert.deepEqual(getJsonPayloadBody({ body: JSON.stringify(payload) }), payload);

  for (const body of [undefined, null, false, 42, [], "", "{", "null", "false", "42", "[]", '"text"']) {
    assert.deepEqual(getJsonPayloadBody({ body }), {});
  }
});
