export const enquiryEmail = "joel@vivecounselling.com.au";

export const enquiryPhone = {
  href: "tel:+61416205175",
  label: "0416 205 175",
} as const;

export type ClockTime = Readonly<{
  hour: number;
  minute: number;
}>;

// Perth local time. WA has no daylight saving, so these hours are always AWST.
export const businessHours = {
  days: "Mon to Fri",
  opens: { hour: 9, minute: 30 },
  closes: { hour: 17, minute: 0 },
} as const satisfies Readonly<{ days: string; opens: ClockTime; closes: ClockTime }>;

export const enquirySuccessContent = {
  title: "Your enquiry has been sent.",
  note: "I’ll reply as soon as I can, usually within 24 hours.",
} as const;

export const enquiryFailureContent = {
  title: "The enquiry could not be sent.",
  messageBeforeEmail: "Sorry, the enquiry could not be sent. Please email",
  email: enquiryEmail,
  messageAfterEmail: "directly.",
} as const;

export function getEnquiryFailureMessage() {
  return `${enquiryFailureContent.messageBeforeEmail} ${enquiryFailureContent.email} ${enquiryFailureContent.messageAfterEmail}`;
}
