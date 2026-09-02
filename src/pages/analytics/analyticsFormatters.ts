import type {
  AnalyticsTrafficSource,
  AnalyticsVisit,
  AnalyticsVisitEvent,
} from "../../data/analyticsContract";
import type { AustralianVisitRegionCode } from "../../data/visitClientEnvironment";
import { visitEventTypes } from "../../data/visitEventContract";

type VisitJourneyItem =
  | {
      id: string;
      kind: "event";
      occurredAt: string;
      visitEvent: AnalyticsVisitEvent;
    }
  | {
      activeSeconds: number;
      id: string;
      kind: "page";
      occurredAt: string;
      path: string;
    };

const perthTimeFormatter = new Intl.DateTimeFormat("en-AU", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  timeZone: "Australia/Perth",
});

const displayDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  weekday: "long",
  year: "numeric",
});

const compactDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-AU", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

const eventLabels: Record<string, string> = {
  contact_option_selected: "Contact option selected",
  email_link_clicked: "Email link clicked",
  enquiry_failed: "Enquiry failed",
  enquiry_sent: "Enquiry sent",
  enquiry_started: "Enquiry started",
  enquiry_submit_attempted: "Enquiry submit attempted",
  instagram_link_clicked: "Instagram link clicked",
  linkedin_link_clicked: "LinkedIn link clicked",
};

const australianRegionLabels: Record<AustralianVisitRegionCode, string> = {
  ACT: "Australian Capital Territory",
  NSW: "New South Wales",
  NT: "Northern Territory",
  QLD: "Queensland",
  SA: "South Australia",
  TAS: "Tasmania",
  VIC: "Victoria",
  WA: "Western Australia",
};

const countryNameFormatter = new Intl.DisplayNames(["en-AU"], { type: "region" });

const contactOptionLabels: Record<string, string> = {
  appointment: "Make an appointment",
  consult: "Request a 15-minute consult",
  question: "General enquiry",
};

const contactSelectionLabels: Record<string, string> = {
  appointment: "Appointment selected",
  consult: "Consult selected",
  question: "Question selected",
};

const failureReasonLabels: Record<string, string> = {
  configuration: "Configuration",
  email_provider: "Email provider",
  network: "Network",
  server: "Server",
};

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

export function shiftDateKey(dateKey: string, offset: number) {
  const shiftedDate = parseDateKey(dateKey);
  shiftedDate.setUTCDate(shiftedDate.getUTCDate() + offset);
  return shiftedDate.toISOString().slice(0, 10);
}

export function formatDate(dateKey: string, compact = false) {
  return (compact ? compactDateFormatter : displayDateFormatter).format(parseDateKey(dateKey));
}

export function formatTime(timestamp: string) {
  return perthTimeFormatter.format(new Date(timestamp));
}

export function formatActiveTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function formatLongActiveTime(seconds: number) {
  if (seconds < 3600) return formatActiveTime(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export function visitActiveSeconds(visit: AnalyticsVisit) {
  return visit.pageViews.reduce((total, pageView) => total + pageView.activeSeconds, 0);
}

export type OutboundActionCounts = {
  email: number;
  instagram: number;
  linkedin: number;
  total: number;
};

export function outboundActionCounts(
  events: AnalyticsVisitEvent[],
): OutboundActionCounts {
  const counts = events.reduce(
    (result, visitEvent) => {
      if (visitEvent.eventType === visitEventTypes.emailLinkClicked) result.email += 1;
      if (visitEvent.eventType === visitEventTypes.instagramLinkClicked) result.instagram += 1;
      if (visitEvent.eventType === visitEventTypes.linkedinLinkClicked) result.linkedin += 1;
      return result;
    },
    { email: 0, instagram: 0, linkedin: 0 },
  );

  return { ...counts, total: counts.email + counts.instagram + counts.linkedin };
}

export function visitLocationCompactLabel(visit: AnalyticsVisit) {
  if (visit.locationCountryCode === "AU") return visit.locationRegionCode ?? "AU";
  return visit.locationCountryCode ?? "Unknown";
}

export function visitLocationLabel(visit: AnalyticsVisit) {
  if (!visit.locationCountryCode) return "Location unknown";

  if (visit.locationCountryCode === "AU") {
    return visit.locationRegionCode
      ? `${australianRegionLabels[visit.locationRegionCode]}, Australia`
      : "Australia";
  }

  return countryNameFormatter.of(visit.locationCountryCode) ?? visit.locationCountryCode;
}

export function visitorLabel(visitorId: string) {
  const suffix = visitorId.replace(/-/g, "").slice(-6).toUpperCase();
  return `Visitor ${suffix}`;
}

export function sourceLabel(source: AnalyticsTrafficSource) {
  if (source === "paid") return "Paid";
  if (source === "referral") return "Referral";
  if (source === "internal") return "Internal";
  return "Direct";
}

export function networkLabel(networkCode: string | null) {
  if (networkCode === "g") return "Google Search";
  if (networkCode === "s") return "Search partners";
  if (networkCode === "d") return "Google Display";
  return networkCode ?? "Network unavailable";
}

export function matchTypeLabel(matchType: string | null) {
  if (matchType === "e") return "Exact";
  if (matchType === "p") return "Phrase";
  if (matchType === "b") return "Broad";
  return matchType ?? "Match unavailable";
}

export function adNetworkDetail(visit: AnalyticsVisit) {
  const values = [
    visit.adCode,
    visit.networkCode ? networkLabel(visit.networkCode) : null,
  ].filter((value): value is string => Boolean(value));

  if (values.length) return values.join(" / ");
  return visit.trafficSource === "paid" ? "None recorded" : "Not a paid visit";
}

export function keywordMatchDetail(visit: AnalyticsVisit) {
  const values = [
    visit.matchedKeyword,
    visit.matchType ? matchTypeLabel(visit.matchType) : null,
  ].filter((value): value is string => Boolean(value));

  return values.length ? values.join(" / ") : "None recorded";
}

export function sourceDetail(visit: AnalyticsVisit) {
  if (visit.trafficSource === "paid") {
    const adLabel = visit.adCode ? `Ad ${visit.adCode}` : "Ad unavailable";
    return `${adLabel} · ${networkLabel(visit.networkCode)} · ${visit.matchedKeyword ?? "Keyword unavailable"} · ${matchTypeLabel(visit.matchType)}`;
  }

  if (visit.trafficSource === "referral" || visit.trafficSource === "internal") {
    return visit.referrerHost ?? "Referrer unavailable";
  }

  return "No referrer";
}

function parseMonthKey(monthKey: string) {
  return parseDateKey(`${monthKey}-01`);
}

export function shiftMonthKey(monthKey: string, offset: number) {
  const shiftedMonth = parseMonthKey(monthKey);
  shiftedMonth.setUTCMonth(shiftedMonth.getUTCMonth() + offset);
  return shiftedMonth.toISOString().slice(0, 7);
}

export function formatMonth(monthKey: string) {
  return monthFormatter.format(parseMonthKey(monthKey));
}

export function eventLabel(visitEvent: AnalyticsVisitEvent) {
  return eventLabels[visitEvent.eventType] ?? visitEvent.eventType.split("_").join(" ");
}

export function eventProperty(visitEvent: AnalyticsVisitEvent, ...keys: string[]) {
  return keys.map((key) => visitEvent.properties[key]).find(Boolean) ?? null;
}

export function contactOptionLabel(value: string | null) {
  if (!value) return null;
  return contactOptionLabels[value] ?? value.split("_").join(" ");
}

export function contactSelectionLabel(visitEvent: AnalyticsVisitEvent) {
  const value = eventProperty(visitEvent, "option", "contactOption", "contact_option");
  if (!value) return null;
  return contactSelectionLabels[value] ?? `${value.split("_").join(" ")} selected`;
}

export function eventDetail(visitEvent: AnalyticsVisitEvent) {
  if (visitEvent.eventType === "contact_option_selected") {
    return contactOptionLabel(eventProperty(visitEvent, "option", "contactOption", "contact_option"));
  }

  if (visitEvent.eventType === "enquiry_failed") {
    const reason = eventProperty(visitEvent, "reason", "failureReason", "failure_reason");
    return reason ? (failureReasonLabels[reason] ?? reason.split("_").join(" ")) : null;
  }

  return null;
}

export function visitJourney(visit: AnalyticsVisit): VisitJourneyItem[] {
  return [
    ...visit.pageViews.map((pageView) => ({
      activeSeconds: pageView.activeSeconds,
      id: pageView.id,
      kind: "page" as const,
      occurredAt: pageView.viewedAt,
      path: pageView.path,
    })),
    ...visit.events.map((visitEvent) => ({
      id: visitEvent.id,
      kind: "event" as const,
      occurredAt: visitEvent.occurredAt,
      visitEvent,
    })),
  ].sort((left, right) => {
    const timeDifference = new Date(left.occurredAt).getTime() - new Date(right.occurredAt).getTime();
    if (timeDifference !== 0) return timeDifference;
    if (left.kind !== right.kind) return left.kind === "page" ? -1 : 1;
    return left.id.localeCompare(right.id);
  });
}

export function enquiryOptionForEvent(visit: AnalyticsVisit, targetEvent: AnalyticsVisitEvent) {
  const ownOption = contactOptionLabel(eventProperty(targetEvent, "option", "contactOption", "contact_option"));
  if (ownOption) return ownOption;

  const targetTime = new Date(targetEvent.occurredAt).getTime();
  const selectedOption = [...visit.events]
    .filter((visitEvent) => visitEvent.eventType === "contact_option_selected"
      && new Date(visitEvent.occurredAt).getTime() <= targetTime)
    .sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())[0];

  return selectedOption ? eventDetail(selectedOption) : null;
}

export function botDetail(visit: AnalyticsVisit) {
  return [visit.botName ?? "Unknown bot", visit.botCategory]
    .filter((value): value is string => Boolean(value))
    .join(" · ");
}
