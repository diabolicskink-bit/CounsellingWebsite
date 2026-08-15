export const enquiryEmail = "joel@vivecounselling.com.au";

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
