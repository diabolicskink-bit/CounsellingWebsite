import assert from "node:assert/strict";
import { test } from "node:test";
import { getAustralianTimeZoneLabel } from "../../src/utils/timeZones.ts";

test("resolves active and fallback Australian timezone labels from the shared source", () => {
  const summer = new Date("2026-01-15T00:00:00.000Z");
  const winter = new Date("2026-07-15T00:00:00.000Z");

  assert.equal(getAustralianTimeZoneLabel("AEDT", summer), "AEDT (NSW / ACT / VIC / TAS)");
  assert.equal(getAustralianTimeZoneLabel("AEST", winter), "AEST (QLD / NSW / ACT / VIC / TAS)");
  assert.equal(getAustralianTimeZoneLabel("ACDT", winter), "ACDT (SA)");
  assert.equal(getAustralianTimeZoneLabel("", winter), "");
});
