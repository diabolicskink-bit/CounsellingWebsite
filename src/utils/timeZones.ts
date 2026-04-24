type AustralianTimeZoneRegion = {
  label: string;
  stateValues: string[];
  timeZone: string;
};

type ActiveAustralianTimeZone = {
  abbreviation: string;
  labels: string[];
  offsetMinutes: number;
  timeZone: string;
};

const australianTimeZoneRegions: AustralianTimeZoneRegion[] = [
  { label: "WA", stateValues: ["wa"], timeZone: "Australia/Perth" },
  { label: "SA", stateValues: ["sa"], timeZone: "Australia/Adelaide" },
  { label: "NT", stateValues: ["nt"], timeZone: "Australia/Darwin" },
  { label: "QLD", stateValues: ["qld"], timeZone: "Australia/Brisbane" },
  { label: "NSW / ACT / VIC / TAS", stateValues: ["nsw", "act", "vic", "tas"], timeZone: "Australia/Sydney" },
];

export function getTimeZoneAbbreviation(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    timeZoneName: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

export function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
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

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  const zonedTime = Date.UTC(
    getPart("year"),
    getPart("month") - 1,
    getPart("day"),
    getPart("hour"),
    getPart("minute"),
    getPart("second"),
  );

  return Math.round((zonedTime - date.getTime()) / 60000);
}

export function getActiveAustralianTimeZones(date = new Date()): ActiveAustralianTimeZone[] {
  const groupedTimeZones = australianTimeZoneRegions.reduce<Record<string, ActiveAustralianTimeZone>>(
    (groups, region) => {
      const abbreviation = getTimeZoneAbbreviation(date, region.timeZone);
      const offsetMinutes = getTimeZoneOffsetMinutes(date, region.timeZone);
      const key = `${abbreviation}-${offsetMinutes}`;

      groups[key] ??= {
        abbreviation,
        labels: [],
        offsetMinutes,
        timeZone: region.timeZone,
      };
      groups[key].labels.push(region.label);

      return groups;
    },
    {},
  );

  return Object.values(groupedTimeZones).sort((first, second) => first.offsetMinutes - second.offsetMinutes);
}

export function getActiveAustralianTimeZoneOptions(date = new Date()) {
  return [
    { value: "", label: "Select your timezone" },
    ...getActiveAustralianTimeZones(date).map((timeZone) => ({
      value: timeZone.abbreviation,
      label: `${timeZone.abbreviation} (${timeZone.labels.join(" / ")})`,
    })),
  ];
}

export function getActiveAustralianTimeZoneByAbbreviation(abbreviation: string, date = new Date()) {
  return getActiveAustralianTimeZones(date).find((timeZone) => timeZone.abbreviation === abbreviation);
}

export function getActiveAustralianTimeZoneByState(stateValue: string, date = new Date()) {
  const region = australianTimeZoneRegions.find((timeZone) => timeZone.stateValues.includes(stateValue));

  if (!region) {
    return undefined;
  }

  return {
    abbreviation: getTimeZoneAbbreviation(date, region.timeZone),
    labels: [region.label],
    offsetMinutes: getTimeZoneOffsetMinutes(date, region.timeZone),
    timeZone: region.timeZone,
  };
}

function getTimeParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value.toLowerCase() ?? "";

  return `${hour}.${minute}${dayPeriod}`;
}

function getPerthDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value ?? 0),
    month: Number(parts.find((part) => part.type === "month")?.value ?? 1),
    day: Number(parts.find((part) => part.type === "day")?.value ?? 1),
  };
}

function getPerthBusinessHoursUtcRange(date = new Date()) {
  const perthDate = getPerthDateParts(date);

  return {
    start: new Date(Date.UTC(perthDate.year, perthDate.month - 1, perthDate.day, 1, 30)),
    end: new Date(Date.UTC(perthDate.year, perthDate.month - 1, perthDate.day, 9, 0)),
  };
}

export function getPerthBusinessHoursRange(timeZone: string, date = new Date()) {
  const { start, end } = getPerthBusinessHoursUtcRange(date);

  return `${getTimeParts(start, timeZone)} to ${getTimeParts(end, timeZone)}`;
}

export function getPerthBusinessHoursPrimaryLabel(date = new Date()) {
  const perthTimeZone = "Australia/Perth";
  const { start } = getPerthBusinessHoursUtcRange(date);
  const abbreviation = getTimeZoneAbbreviation(start, perthTimeZone);

  return `Mon to Fri, ${getPerthBusinessHoursRange(perthTimeZone, date)} ${abbreviation}`;
}

export function getPerthBusinessHoursComparisonNote({
  date = new Date(),
  stateLabel,
  timeZone,
  timeZoneLabel,
}: {
  date?: Date;
  stateLabel?: string;
  timeZone: string;
  timeZoneLabel?: string;
}) {
  const perthTimeZone = "Australia/Perth";
  const { start } = getPerthBusinessHoursUtcRange(date);
  const perthAbbreviation = getTimeZoneAbbreviation(start, perthTimeZone);
  const localAbbreviation = getTimeZoneAbbreviation(start, timeZone);
  const stateText = stateLabel ? `State/territory: ${stateLabel}. ` : "";
  const timeZoneText = `Timezone: ${timeZoneLabel ?? localAbbreviation}. `;

  return `${stateText}${timeZoneText}Joel's Mon-Fri 9.30am-5.00pm ${perthAbbreviation} is ${getPerthBusinessHoursRange(
    timeZone,
    date,
  )} ${localAbbreviation}.`;
}

export function getActiveAustralianPerthBusinessHoursNotes(date = new Date()) {
  const perthTimeZone = "Australia/Perth";

  return getActiveAustralianTimeZones(date)
    .filter((timeZone) => timeZone.timeZone !== perthTimeZone)
    .map((timeZone) => `${timeZone.abbreviation}: ${getPerthBusinessHoursRange(timeZone.timeZone, date)}`);
}
