import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatClockTimeRange,
  getActiveAustralianTimeZoneOptions,
  getAustralianTimeZoneLabel,
  getBusinessHoursByTimeZone,
} from "../../../src/utils/timeZones.ts";

const summer = new Date("2026-01-15T00:00:00.000Z");
const winter = new Date("2026-07-15T00:00:00.000Z");

function optionValues(date) {
  return getActiveAustralianTimeZoneOptions(date).map(({ value }) => value);
}

function activeBusinessZones(date) {
  return getBusinessHoursByTimeZone(date).map(({ abbreviation }) => abbreviation);
}

test("offers the timezones active in Australian summer and winter", () => {
  assert.deepEqual(optionValues(summer), ["AWST", "ACST", "AEST", "ACDT", "AEDT"]);
  assert.deepEqual(optionValues(winter), ["AWST", "ACST", "AEST"]);
});

test("labels each timezone with the regions currently observing it", () => {
  assert.deepEqual(getActiveAustralianTimeZoneOptions(winter), [
    { value: "AWST", label: "AWST (WA)" },
    { value: "ACST", label: "ACST (SA / NT)" },
    { value: "AEST", label: "AEST (QLD / NSW / ACT / VIC / TAS)" },
  ]);
  assert.equal(getAustralianTimeZoneLabel("AEST", summer), "AEST (QLD)");
});

test("labels a daylight-saving timezone submitted after it has ended", () => {
  assert.equal(getAustralianTimeZoneLabel("ACDT", winter), "ACDT (SA)");
  assert.equal(getAustralianTimeZoneLabel("AEDT", winter), "AEDT (NSW / ACT / VIC / TAS)");
});

test("rejects invalid and inherited timezone identifiers", () => {
  for (const value of ["", "GMT+8", "constructor", "__proto__", "toString", "hasOwnProperty"]) {
    assert.equal(getAustralianTimeZoneLabel(value, winter), "", value);
  }
});

test("converts Perth business hours into each active timezone", () => {
  assert.deepEqual(getBusinessHoursByTimeZone(summer), [
    { abbreviation: "AWST", hours: "9.30am to 5.00pm" },
    { abbreviation: "ACST", hours: "11.00am to 6.30pm" },
    { abbreviation: "AEST", hours: "11.30am to 7.00pm" },
    { abbreviation: "ACDT", hours: "12.00pm to 7.30pm" },
    { abbreviation: "AEDT", hours: "12.30pm to 8.00pm" },
  ]);
});

test("uses the Perth calendar date for daylight-saving changes", () => {
  assert.deepEqual(
    activeBusinessZones(new Date("2026-04-04T15:59:59.999Z")),
    ["AWST", "ACST", "AEST", "ACDT", "AEDT"],
  );
  assert.deepEqual(
    activeBusinessZones(new Date("2026-04-04T16:00:00.000Z")),
    ["AWST", "ACST", "AEST"],
  );
  assert.deepEqual(
    activeBusinessZones(new Date("2026-10-03T15:59:59.999Z")),
    ["AWST", "ACST", "AEST"],
  );
  assert.deepEqual(
    activeBusinessZones(new Date("2026-10-03T16:00:00.000Z")),
    ["AWST", "ACST", "AEST", "ACDT", "AEDT"],
  );
});

test("formats clock times in the site's style", () => {
  assert.equal(formatClockTimeRange({ hour: 0, minute: 5 }, { hour: 12, minute: 0 }), "12.05am to 12.00pm");
});
