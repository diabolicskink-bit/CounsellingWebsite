import type { EnquiryFormContent } from "../components/EnquiryForm";
import {
  australianStateOptions,
  bookingTypeOptions,
  enquiryTypeOptions,
} from "./enquiryContract";

export const enquiryEmail = "joel@vivecounselling.com.au";

export const enquiryFormContent: EnquiryFormContent = {
  eyebrow: "Enquiry",
  recipientEmail: enquiryEmail,
  submitLabel: "Send enquiry",
  success: {
    title: "Your enquiry has been sent.",
    message: "Thanks for getting in touch.",
    note: "I’ll reply by email as soon as I can. If I’m in a client session, it may not be straight away.",
  },
  fields: {
    enquiryType: {
      legend: "What would you like to enquire about?",
      options: enquiryTypeOptions,
    },
    bookingType: {
      legend: "What would you like to do?",
      options: bookingTypeOptions,
    },
    name: {
      label: "Name",
      placeholder: "Your name",
    },
    email: {
      label: "Email",
      placeholder: "you@example.com",
    },
    message: {
      label: "Your enquiry",
      placeholder: "",
      rows: 6,
    },
    availability: {
      label: "Availability",
      placeholder: "For example: Tuesday after 3pm or Thursday morning.",
    },
    timeZone: {
      label: "Timezone",
    },
    timing: {
      label: "Preferred timing",
      placeholder: "For example: weekday afternoons, Tuesday after 2pm, or flexible.",
    },
    state: {
      label: "State or territory",
      options: [
        { value: "", label: "Select your state or territory" },
        ...australianStateOptions,
      ],
    },
  },
};
