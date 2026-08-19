import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getActiveAustralianPerthBusinessHoursNotes,
  getActiveAustralianTimeZoneOptions,
  getAustralianTimeZoneLabel,
} from "../../src/utils/timeZones.ts";

test("resolves active and seasonally inactive Australian timezone labels", () => {
  const summer = new Date("2026-01-15T00:00:00.000Z");
  const winter = new Date("2026-07-15T00:00:00.000Z");

  assert.equal(getAustralianTimeZoneLabel("AEST", summer), "AEST (QLD)");
  assert.equal(getAustralianTimeZoneLabel("AEST", winter), "AEST (QLD / NSW / ACT / VIC / TAS)");
  assert.equal(getAustralianTimeZoneLabel("ACDT", winter), "ACDT (SA)");
  assert.equal(getAustralianTimeZoneLabel("", winter), "");
  assert.equal(getAustralianTimeZoneLabel("GMT+8", winter), "");
});

test("builds the active Australian timezone choices for summer and winter", () => {
  const summer = new Date("2026-01-15T00:00:00.000Z");
  const winter = new Date("2026-07-15T00:00:00.000Z");

  assert.deepEqual(getActiveAustralianTimeZoneOptions(summer), [
    { value: "", label: "Select your timezone" },
    { value: "AWST", label: "AWST (WA)" },
    { value: "ACST", label: "ACST (NT)" },
    { value: "AEST", label: "AEST (QLD)" },
    { value: "ACDT", label: "ACDT (SA)" },
    { value: "AEDT", label: "AEDT (NSW / ACT / VIC / TAS)" },
  ]);
  assert.deepEqual(getActiveAustralianTimeZoneOptions(winter), [
    { value: "", label: "Select your timezone" },
    { value: "AWST", label: "AWST (WA)" },
    { value: "ACST", label: "ACST (SA / NT)" },
    { value: "AEST", label: "AEST (QLD / NSW / ACT / VIC / TAS)" },
  ]);
});

test("labels Perth business hours using the zones active during those hours", () => {
  const daylightSavingEnds = new Date("2026-04-04T16:00:00.000Z");
  const daylightSavingStarts = new Date("2026-10-03T16:00:00.000Z");

  assert.deepEqual(getActiveAustralianPerthBusinessHoursNotes(daylightSavingEnds), [
    "ACST: 11.00am to 6.30pm",
    "AEST: 11.30am to 7.00pm",
  ]);
  assert.deepEqual(getActiveAustralianPerthBusinessHoursNotes(daylightSavingStarts), [
    "ACST: 11.00am to 6.30pm",
    "AEST: 11.30am to 7.00pm",
    "ACDT: 12.00pm to 7.30pm",
    "AEDT: 12.30pm to 8.00pm",
  ]);
});
