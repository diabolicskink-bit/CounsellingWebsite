export type VisitDeviceType = "desktop" | "mobile" | "tablet" | "unknown";

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
