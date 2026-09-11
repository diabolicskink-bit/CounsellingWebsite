type AustralianTimeZoneRegion = {
  label: string;
  timeZone: string;
};

type ActiveAustralianTimeZoneGroup = {
  abbreviation: string;
  offsetMinutes: number;
  regionLabels: string[];
  representativeTimeZone: string;
};

const perthTimeZone = "Australia/Perth";

const australianTimeZoneRegions: AustralianTimeZoneRegion[] = [
  { label: "WA", timeZone: perthTimeZone },
  { label: "SA", timeZone: "Australia/Adelaide" },
  { label: "NT", timeZone: "Australia/Darwin" },
  { label: "QLD", timeZone: "Australia/Brisbane" },
  { label: "NSW / ACT / VIC / TAS", timeZone: "Australia/Sydney" },
];

const fallbackAustralianTimeZoneLabels: Record<string, string> = {
  ACDT: "ACDT (SA)",
  ACST: "ACST (SA / NT)",
  AEDT: "AEDT (NSW / ACT / VIC / TAS)",
  AEST: "AEST (QLD / NSW / ACT / VIC / TAS)",
  AWST: "AWST (WA)",
};

function getDateTimePart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((part) => part.type === type)?.value ?? "";
}

function formatTimeZoneLabel(timeZone: ActiveAustralianTimeZoneGroup) {
  return `${timeZone.abbreviation} (${timeZone.regionLabels.join(" / ")})`;
}

function getTimeZoneAbbreviation(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    timeZoneName: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  return getDateTimePart(parts, "timeZoneName");
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const zonedTime = Date.UTC(
    Number(getDateTimePart(parts, "year")),
    Number(getDateTimePart(parts, "month")) - 1,
    Number(getDateTimePart(parts, "day")),
    Number(getDateTimePart(parts, "hour")),
    Number(getDateTimePart(parts, "minute")),
    Number(getDateTimePart(parts, "second")),
  );

  return Math.round((zonedTime - date.getTime()) / 60000);
}

function getActiveAustralianTimeZoneGroups(date = new Date()): ActiveAustralianTimeZoneGroup[] {
  const groupedTimeZones = new Map<string, ActiveAustralianTimeZoneGroup>();

  for (const region of australianTimeZoneRegions) {
    const abbreviation = getTimeZoneAbbreviation(date, region.timeZone);
    const existingGroup = groupedTimeZones.get(abbreviation);

    if (existingGroup) {
      existingGroup.regionLabels.push(region.label);
    } else {
      groupedTimeZones.set(abbreviation, {
        abbreviation,
        offsetMinutes: getTimeZoneOffsetMinutes(date, region.timeZone),
        regionLabels: [region.label],
        representativeTimeZone: region.timeZone,
      });
    }
  }

  return [...groupedTimeZones.values()].sort(
    (first, second) => first.offsetMinutes - second.offsetMinutes,
  );
}

export function getActiveAustralianTimeZoneOptions(date = new Date()) {
  return [
    { value: "", label: "Select your timezone" },
    ...getActiveAustralianTimeZoneGroups(date).map((timeZone) => ({
      value: timeZone.abbreviation,
      label: formatTimeZoneLabel(timeZone),
    })),
  ];
}

export function getAustralianTimeZoneLabel(value: string, date = new Date()) {
  const activeTimeZone = getActiveAustralianTimeZoneGroups(date).find(
    (timeZone) => timeZone.abbreviation === value,
  );

  return activeTimeZone
    ? formatTimeZoneLabel(activeTimeZone)
    : fallbackAustralianTimeZoneLabels[value] ?? "";
}

function formatTime(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const hour = getDateTimePart(parts, "hour");
  const minute = getDateTimePart(parts, "minute");
  const dayPeriod = getDateTimePart(parts, "dayPeriod").toLowerCase();

  return `${hour}.${minute}${dayPeriod}`;
}

function getPerthDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: perthTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  return {
    year: Number(getDateTimePart(parts, "year")),
    month: Number(getDateTimePart(parts, "month")),
    day: Number(getDateTimePart(parts, "day")),
  };
}

function getPerthBusinessHoursUtcRange(date = new Date()) {
  const perthDate = getPerthDateParts(date);

  // Perth remains UTC+8 year-round, so 9.30am–5.00pm is 01:30–09:00 UTC.
  return {
    start: new Date(Date.UTC(perthDate.year, perthDate.month - 1, perthDate.day, 1, 30)),
    end: new Date(Date.UTC(perthDate.year, perthDate.month - 1, perthDate.day, 9, 0)),
  };
}

function formatTimeRange(start: Date, end: Date, timeZone: string) {
  return `${formatTime(start, timeZone)} to ${formatTime(end, timeZone)}`;
}

export function getActiveAustralianPerthBusinessHoursNotes(date = new Date()) {
  const { start, end } = getPerthBusinessHoursUtcRange(date);

  return getActiveAustralianTimeZoneGroups(start)
    .filter((timeZone) => timeZone.representativeTimeZone !== perthTimeZone)
    .map(
      (timeZone) =>
        `${timeZone.abbreviation}: ${formatTimeRange(start, end, timeZone.representativeTimeZone)}`,
    );
}
