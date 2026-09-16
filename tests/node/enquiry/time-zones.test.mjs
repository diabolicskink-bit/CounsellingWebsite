import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getActiveAustralianPerthBusinessHoursNotes,
  getActiveAustralianTimeZoneOptions,
  getAustralianTimeZoneLabel,
} from "../../../src/utils/timeZones.ts";

function optionValues(date) {
  return getActiveAustralianTimeZoneOptions(date).map(({ value }) => value);
}

function activeBusinessZones(date) {
  return getActiveAustralianPerthBusinessHoursNotes(date).map((note) => note.split(":")[0]);
}

test("offers the timezones active in Australian summer and winter", () => {
  assert.deepEqual(
    optionValues(new Date("2026-01-15T00:00:00.000Z")),
    ["", "AWST", "ACST", "AEST", "ACDT", "AEDT"],
  );
  assert.deepEqual(
    optionValues(new Date("2026-07-15T00:00:00.000Z")),
    ["", "AWST", "ACST", "AEST"],
  );
});

test("rejects invalid and inherited timezone identifiers", () => {
  const date = new Date("2026-07-15T00:00:00.000Z");
  for (const value of ["", "GMT+8", "constructor", "__proto__", "toString", "hasOwnProperty"]) {
    assert.equal(getAustralianTimeZoneLabel(value, date), "", value);
  }
});

test("uses the Perth calendar date for daylight-saving changes", () => {
  assert.deepEqual(
    activeBusinessZones(new Date("2026-04-04T15:59:59.999Z")),
    ["ACST", "AEST", "ACDT", "AEDT"],
  );
  assert.deepEqual(
    activeBusinessZones(new Date("2026-04-04T16:00:00.000Z")),
    ["ACST", "AEST"],
  );
  assert.deepEqual(
    activeBusinessZones(new Date("2026-10-03T15:59:59.999Z")),
    ["ACST", "AEST"],
  );
  assert.deepEqual(
    activeBusinessZones(new Date("2026-10-03T16:00:00.000Z")),
    ["ACST", "AEST", "ACDT", "AEDT"],
  );
});
