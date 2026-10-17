import {
  contactPathOptions,
  type ContactPath,
} from "./enquiryContract.ts";

type ValueOf<T> = T[keyof T];

export const visitEventTypes = {
  contactOptionSelected: "contact_option_selected",
  consultCtaClicked: "consult_cta_clicked",
  emailLinkClicked: "email_link_clicked",
  enquiryStarted: "enquiry_started",
  enquirySubmitAttempted: "enquiry_submit_attempted",
  enquirySent: "enquiry_sent",
  enquiryFailed: "enquiry_failed",
  instagramLinkClicked: "instagram_link_clicked",
  linkedinLinkClicked: "linkedin_link_clicked",
  phoneLinkClicked: "phone_link_clicked",
} as const;

export const visitEventSources = [
  "client",
  "server",
] as const;

export const clientVisitEventTypes = [
  visitEventTypes.contactOptionSelected,
  visitEventTypes.consultCtaClicked,
  visitEventTypes.emailLinkClicked,
  visitEventTypes.enquiryStarted,
  visitEventTypes.instagramLinkClicked,
  visitEventTypes.linkedinLinkClicked,
  visitEventTypes.phoneLinkClicked,
] as const;

export const contactOptionValues: readonly ContactPath[] = contactPathOptions.map(
  (option) => option.value,
);

// Mirrors the enquiry_failed reason constraint in database/migrations.
export const enquiryFailureReasons = [
  "configuration",
  "email_provider",
  "network",
  "server",
] as const;

export type VisitEventType = ValueOf<typeof visitEventTypes>;
export type ClientVisitEventType = (typeof clientVisitEventTypes)[number];
export type VisitEventSource = (typeof visitEventSources)[number];
export type VisitEventProperties = Record<string, string>;
export type EnquiryFailureReason = (typeof enquiryFailureReasons)[number];
