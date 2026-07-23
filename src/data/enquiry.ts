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
    title: "Thanks, your enquiry has been sent.",
    message: "I will respond as soon as I can.",
    note: "If I am in client sessions or between appointments, there may be a delay before I can reply.",
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
