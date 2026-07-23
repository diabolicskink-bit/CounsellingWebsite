type EnquiryOption = Readonly<{
  label: string;
  value: string;
}>;

type ValueOf<T> = T[keyof T];

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

export const australianStates = {
  westernAustralia: {
    label: "Western Australia",
    value: "wa",
  },
  newSouthWales: {
    label: "New South Wales",
    value: "nsw",
  },
  victoria: {
    label: "Victoria",
    value: "vic",
  },
  queensland: {
    label: "Queensland",
    value: "qld",
  },
  southAustralia: {
    label: "South Australia",
    value: "sa",
  },
  tasmania: {
    label: "Tasmania",
    value: "tas",
  },
  australianCapitalTerritory: {
    label: "Australian Capital Territory",
    value: "act",
  },
  northernTerritory: {
    label: "Northern Territory",
    value: "nt",
  },
  other: {
    label: "Outside Australia or unsure",
    value: "other",
  },
} as const satisfies Record<string, EnquiryOption>;

export type EnquiryTypeOption = ValueOf<typeof enquiryTypes>;
export type EnquiryType = EnquiryTypeOption["value"];
export type BookingTypeOption = ValueOf<typeof bookingTypes>;
export type BookingType = BookingTypeOption["value"];
export type AustralianStateOption = ValueOf<typeof australianStates>;
export type AustralianState = AustralianStateOption["value"];

export const enquiryTypeOptions: readonly EnquiryTypeOption[] = Object.values(enquiryTypes);
export const bookingTypeOptions: readonly BookingTypeOption[] = Object.values(bookingTypes);
export const australianStateOptions: readonly AustralianStateOption[] = Object.values(australianStates);

function findOption<TOption extends EnquiryOption>(options: readonly TOption[], value: string) {
  return options.find((option) => option.value === value);
}

export function findEnquiryType(value: string) {
  return findOption(enquiryTypeOptions, value);
}

export function findBookingType(value: string) {
  return findOption(bookingTypeOptions, value);
}

export function findAustralianState(value: string) {
  return findOption(australianStateOptions, value);
}
