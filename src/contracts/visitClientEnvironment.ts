export const visitDeviceTypes = [
  "desktop",
  "mobile",
  "tablet",
  "unknown",
] as const;

export type VisitDeviceType = (typeof visitDeviceTypes)[number];

export const australianVisitRegionCodes = [
  "ACT",
  "NSW",
  "NT",
  "QLD",
  "SA",
  "TAS",
  "VIC",
  "WA",
] as const;

export type AustralianVisitRegionCode = (typeof australianVisitRegionCodes)[number];

export type VisitRequestEnvironment = {
  deviceType: VisitDeviceType;
  locationCountryCode: string | null;
  locationRegionCode: AustralianVisitRegionCode | null;
  userAgent: string | null;
};
