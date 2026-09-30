import { businessHours, type ClockTime } from "../data/enquiry.ts";

type AustralianTimeZoneRegion = Readonly<{
  label: string;
  timeZone: string;
}>;

type ActiveTimeZoneGroup = {
  abbreviation: string;
  offsetMinutes: number;
  regionLabels: string[];
  representativeTimeZone: string;
};

type ZonedDateTime = Readonly<{
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}>;

export type TimeZoneOption = Readonly<{
  value: string;
  label: string;
}>;

export type BusinessHoursInTimeZone = Readonly<{
  abbreviation: string;
  hours: string;
}>;

const perthTimeZone = "Australia/Perth";
const perthUtcOffsetMinutes = 8 * 60;

const australianTimeZoneRegions: readonly AustralianTimeZoneRegion[] = [
  { label: "WA", timeZone: perthTimeZone },
  { label: "SA", timeZone: "Australia/Adelaide" },
  { label: "NT", timeZone: "Australia/Darwin" },
  { label: "QLD", timeZone: "Australia/Brisbane" },
  { label: "NSW / ACT / VIC / TAS", timeZone: "Australia/Sydney" },
];

// Abbreviations come from the UTC offset rather than Intl's localised zone names, which vary
// between runtimes and would otherwise leak into the value the enquiry form submits.
const abbreviationsByOffsetMinutes = new Map<number, string>([
  [480, "AWST"],
  [570, "ACST"],
  [600, "AEST"],
  [630, "ACDT"],
  [660, "AEDT"],
]);

// Mid-summer and mid-winter between them observe every standard and daylight-saving zone.
const seasonalReferenceDates = [
  new Date("2026-01-15T00:00:00.000Z"),
  new Date("2026-07-15T00:00:00.000Z"),
];

const dateTimeFormatters = new Map<string, Intl.DateTimeFormat>();

function getDateTimeFormatter(timeZone: string) {
  let formatter = dateTimeFormatters.get(timeZone);

  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-AU", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // Offset arithmetic requires midnight to be 00:00 on the displayed date.
      hourCycle: "h23",
    });
    dateTimeFormatters.set(timeZone, formatter);
  }

  return formatter;
}

function getZonedDateTime(date: Date, timeZone: string): ZonedDateTime {
  const parts = getDateTimeFormatter(timeZone).formatToParts(date);

  const getNumber = (type: Intl.DateTimeFormatPartTypes) => {
    const part = parts.find((candidate) => candidate.type === type);

    if (!part) {
      throw new Error(`Missing ${type} in formatted ${timeZone} date/time.`);
    }

    return Number(part.value);
  };

  return {
    year: getNumber("year"),
    month: getNumber("month"),
    day: getNumber("day"),
    hour: getNumber("hour"),
    minute: getNumber("minute"),
    second: getNumber("second"),
  };
}

function getUtcOffsetMinutes(date: Date, timeZone: string) {
  const { year, month, day, hour, minute, second } = getZonedDateTime(date, timeZone);
  const zonedTime = Date.UTC(year, month - 1, day, hour, minute, second);

  return Math.round((zonedTime - date.getTime()) / 60000);
}

function getAbbreviation(offsetMinutes: number, timeZone: string) {
  const abbreviation = abbreviationsByOffsetMinutes.get(offsetMinutes);

  if (!abbreviation) {
    throw new Error(`No Australian time zone abbreviation for ${timeZone} at UTC offset ${offsetMinutes} minutes.`);
  }

  return abbreviation;
}

function getActiveTimeZoneGroups(date: Date): ActiveTimeZoneGroup[] {
  const groupsByAbbreviation = new Map<string, ActiveTimeZoneGroup>();

  for (const region of australianTimeZoneRegions) {
    const offsetMinutes = getUtcOffsetMinutes(date, region.timeZone);
    const abbreviation = getAbbreviation(offsetMinutes, region.timeZone);
    const existingGroup = groupsByAbbreviation.get(abbreviation);

    if (existingGroup) {
      existingGroup.regionLabels.push(region.label);
    } else {
      groupsByAbbreviation.set(abbreviation, {
        abbreviation,
        offsetMinutes,
        regionLabels: [region.label],
        representativeTimeZone: region.timeZone,
      });
    }
  }

  return [...groupsByAbbreviation.values()].sort(
    (first, second) => first.offsetMinutes - second.offsetMinutes,
  );
}

function formatTimeZoneLabel(abbreviation: string, regionLabels: readonly string[]) {
  return `${abbreviation} (${regionLabels.join(" / ")})`;
}

function formatClockTime({ hour, minute }: ClockTime) {
  const dayPeriod = hour < 12 ? "am" : "pm";

  return `${hour % 12 || 12}.${String(minute).padStart(2, "0")}${dayPeriod}`;
}

export function formatClockTimeRange(start: ClockTime, end: ClockTime) {
  return `${formatClockTime(start)} to ${formatClockTime(end)}`;
}

export function getActiveAustralianTimeZoneOptions(date = new Date()): TimeZoneOption[] {
  return getActiveTimeZoneGroups(date).map((group) => ({
    value: group.abbreviation,
    label: formatTimeZoneLabel(group.abbreviation, group.regionLabels),
  }));
}

export function getAustralianTimeZoneLabel(value: string, date = new Date()) {
  const activeGroup = getActiveTimeZoneGroups(date).find((group) => group.abbreviation === value);

  if (activeGroup) {
    return formatTimeZoneLabel(activeGroup.abbreviation, activeGroup.regionLabels);
  }

  // A zone that was active when the visitor loaded the form may have ended by submission.
  const seasonalRegionLabels = australianTimeZoneRegions
    .filter((region) => seasonalReferenceDates.some((referenceDate) => (
      getAbbreviation(getUtcOffsetMinutes(referenceDate, region.timeZone), region.timeZone) === value
    )))
    .map((region) => region.label);

  return seasonalRegionLabels.length > 0
    ? formatTimeZoneLabel(value, seasonalRegionLabels)
    : "";
}

export function getBusinessHoursByTimeZone(date = new Date()): BusinessHoursInTimeZone[] {
  const perthDate = getZonedDateTime(date, perthTimeZone);

  const toUtc = ({ hour, minute }: ClockTime) => new Date(Date.UTC(
    perthDate.year,
    perthDate.month - 1,
    perthDate.day,
    hour,
    minute - perthUtcOffsetMinutes,
  ));

  const opens = toUtc(businessHours.opens);
  const closes = toUtc(businessHours.closes);

  return getActiveTimeZoneGroups(opens).map((group) => ({
    abbreviation: group.abbreviation,
    hours: formatClockTimeRange(
      getZonedDateTime(opens, group.representativeTimeZone),
      getZonedDateTime(closes, group.representativeTimeZone),
    ),
  }));
}
