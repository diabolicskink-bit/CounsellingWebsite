import type { EnquiryFormContent } from "../components/EnquiryForm";
import { getActiveAustralianTimeZoneOptions } from "../utils/timeZones";

export const enquiryEmail = "diabolicskink@gmail.com";

export const enquiryFormContent: EnquiryFormContent = {
  eyebrow: "Enquiry",
  recipientEmail: enquiryEmail,
  submitLabel: "Send enquiry",
  subject: "Counselling enquiry",
  subjects: {
    general: "General Enq",
    appointment: "App Request",
    consult: "Consult Request",
    booking: "Book Enq",
  },
  fields: {
    enquiryType: {
      legend: "What would you like to enquire about?",
      options: [
        { value: "booking", label: "Booking enquiry" },
        { value: "general", label: "General enquiry" },
      ],
    },
    bookingType: {
      legend: "What would you like to do?",
      options: [
        { value: "appointment", label: "Make an appointment" },
        { value: "consult", label: "Request a 15-minute consult" },
      ],
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
      label: "Your message",
      placeholder: "Anything else you would like Joel to know?",
      rows: 6,
    },
    availability: {
      label: "Availability",
      placeholder: "For example: Tuesday after 3pm or Thursday morning.",
    },
    timeZone: {
      label: "Timezone",
      options: getActiveAustralianTimeZoneOptions(),
    },
    timing: {
      label: "Preferred timing",
      placeholder: "For example: weekday afternoons, Tuesday after 2pm, or flexible.",
    },
    state: {
      label: "State or territory",
      options: [
        { value: "", label: "Select your state or territory" },
        { value: "wa", label: "Western Australia" },
        { value: "nsw", label: "New South Wales" },
        { value: "vic", label: "Victoria" },
        { value: "qld", label: "Queensland" },
        { value: "sa", label: "South Australia" },
        { value: "tas", label: "Tasmania" },
        { value: "act", label: "Australian Capital Territory" },
        { value: "nt", label: "Northern Territory" },
        { value: "other", label: "Outside Australia or unsure" },
      ],
    },
  },
};
