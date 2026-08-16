type ValueOf<T> = T[keyof T];

export const visitEventTypes = {
  contactOptionSelected: "contact_option_selected",
  enquiryStarted: "enquiry_started",
  enquirySubmitAttempted: "enquiry_submit_attempted",
  enquirySent: "enquiry_sent",
  enquiryFailed: "enquiry_failed",
} as const;

export const visitEventSources = {
  client: "client",
  server: "server",
} as const;

export const contactOptionValues = ["appointment", "consult", "question"] as const;
export const enquiryFailureReasons = [
  "configuration",
  "email_provider",
  "network",
  "server",
] as const;

export type VisitEventType = ValueOf<typeof visitEventTypes>;
export type ClientVisitEventType =
  | typeof visitEventTypes.contactOptionSelected
  | typeof visitEventTypes.enquiryStarted;
export type VisitEventSource = ValueOf<typeof visitEventSources>;
export type VisitEventProperties = Record<string, string>;
export type ContactOptionValue = (typeof contactOptionValues)[number];
export type EnquiryFailureReason = (typeof enquiryFailureReasons)[number];
