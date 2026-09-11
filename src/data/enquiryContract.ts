type EnquiryOption = Readonly<{
  label: string;
  value: string;
}>;

type ValueOf<T> = T[keyof T];

export const enquiryFieldLimits = {
  availability: 500,
  bookingType: 60,
  email: 320,
  enquiryType: 60,
  message: 5000,
  mobile: 40,
  name: 160,
  timeZone: 60,
  website: 320,
} as const;

export const enquiryTypes = {
  booking: {
    label: "Booking enquiry",
    value: "booking",
  },
  general: {
    label: "General enquiry",
    value: "general",
  },
} as const satisfies Record<string, EnquiryOption>;

export const bookingTypes = {
  appointment: {
    label: "Make an appointment",
    value: "appointment",
  },
  consult: {
    label: "Request a 15-minute consult",
    value: "consult",
  },
} as const satisfies Record<string, EnquiryOption>;

export const contactPaths = {
  appointment: {
    bookingType: bookingTypes.appointment.value,
    enquiryType: enquiryTypes.booking.value,
    value: bookingTypes.appointment.value,
  },
  consult: {
    bookingType: bookingTypes.consult.value,
    enquiryType: enquiryTypes.booking.value,
    value: bookingTypes.consult.value,
  },
  question: {
    enquiryType: enquiryTypes.general.value,
    value: "question",
  },
} as const;

export type EnquiryTypeOption = ValueOf<typeof enquiryTypes>;
export type EnquiryType = EnquiryTypeOption["value"];
export type BookingTypeOption = ValueOf<typeof bookingTypes>;
export type BookingType = BookingTypeOption["value"];
export type ContactPathOption = ValueOf<typeof contactPaths>;
export type ContactPath = ContactPathOption["value"];

export const enquiryTypeOptions: readonly EnquiryTypeOption[] = Object.values(enquiryTypes);
export const bookingTypeOptions: readonly BookingTypeOption[] = Object.values(bookingTypes);
export const contactPathOptions: readonly ContactPathOption[] = Object.values(contactPaths);

function findOption<TOption extends Readonly<{ value: string }>>(
  options: readonly TOption[],
  value: string,
) {
  return options.find((option) => option.value === value);
}

export function findEnquiryType(value: string) {
  return findOption(enquiryTypeOptions, value);
}

export function findBookingType(value: string) {
  return findOption(bookingTypeOptions, value);
}

export function findContactPath(value: string) {
  return findOption(contactPathOptions, value);
}
