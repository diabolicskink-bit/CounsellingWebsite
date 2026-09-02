import {
  contactPathOptions,
  type ContactPath,
} from "./enquiryContract.ts";

type ValueOf<T> = T[keyof T];

export const visitEventTypes = {
  contactOptionSelected: "contact_option_selected",
  emailLinkClicked: "email_link_clicked",
  enquiryStarted: "enquiry_started",
  enquirySubmitAttempted: "enquiry_submit_attempted",
  enquirySent: "enquiry_sent",
  enquiryFailed: "enquiry_failed",
  instagramLinkClicked: "instagram_link_clicked",
  linkedinLinkClicked: "linkedin_link_clicked",
} as const;

export const visitEventSources = {
  client: "client",
  server: "server",
} as const;

export const clientVisitEventTypes = [
  visitEventTypes.contactOptionSelected,
  visitEventTypes.emailLinkClicked,
  visitEventTypes.enquiryStarted,
  visitEventTypes.instagramLinkClicked,
  visitEventTypes.linkedinLinkClicked,
] as const;

export const contactOptionValues: readonly ContactPath[] = contactPathOptions.map(
  (option) => option.value,
);
export const enquiryFailureReasons = [
  "configuration",
  "email_provider",
  "network",
  "server",
] as const;

export type VisitEventType = ValueOf<typeof visitEventTypes>;
export type ClientVisitEventType = (typeof clientVisitEventTypes)[number];
export type VisitEventSource = ValueOf<typeof visitEventSources>;
export type VisitEventProperties = Record<string, string>;
export type ContactOptionValue = ContactPath;
export type EnquiryFailureReason = (typeof enquiryFailureReasons)[number];
