export type VisitDeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export type VisitRequestEnvironment = {
  deviceType: VisitDeviceType;
  userAgent: string | null;
};
