import { siteMetadata } from "../data/routeMetadata";

export const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
export const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();

const analyticsAllowedHosts = import.meta.env.VITE_ANALYTICS_ALLOWED_HOSTS;

function normalizeHostname(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  try {
    const withProtocol = trimmedValue.includes("://") ? trimmedValue : `https://${trimmedValue}`;

    return new URL(withProtocol).hostname.toLowerCase();
  } catch {
    return trimmedValue.toLowerCase();
  }
}

function getDefaultAllowedHostnames() {
  const defaultHostname = normalizeHostname(siteMetadata.defaultOrigin);

  if (!defaultHostname) {
    return [];
  }

  const hostnames = [defaultHostname];

  if (!defaultHostname.startsWith("www.")) {
    hostnames.push(`www.${defaultHostname}`);
  }

  return hostnames;
}

const allowedAnalyticsHostnames = new Set(
  [
    ...getDefaultAllowedHostnames(),
    ...(analyticsAllowedHosts ?? "")
      .split(",")
      .map((hostname) => normalizeHostname(hostname))
      .filter((hostname): hostname is string => Boolean(hostname)),
  ].map((hostname) => hostname.toLowerCase()),
);

export function isAnalyticsHostAllowed() {
  if (typeof window === "undefined") {
    return false;
  }

  return allowedAnalyticsHostnames.has(window.location.hostname.toLowerCase());
}

function trackGoogleAnalyticsEvent(
  eventName: string,
  parameters: Record<string, string> = {},
) {
  if (
    !analyticsEnabled ||
    !isAnalyticsHostAllowed() ||
    !gaMeasurementId ||
    !window.gtag
  ) {
    return;
  }

  try {
    window.gtag("event", eventName, {
      ...parameters,
      send_to: gaMeasurementId,
    });
  } catch {
    // Analytics is best-effort and must never affect visitor interactions.
  }
}

export function trackEnquiryStarted() {
  trackGoogleAnalyticsEvent("enquiry_started");
}

export function trackEmailLinkClicked() {
  trackGoogleAnalyticsEvent("email_link_clicked");
}

export function trackContactOptionSelected(
  option: "appointment" | "consult" | "question",
) {
  trackGoogleAnalyticsEvent("contact_option_selected", {
    contact_option: option,
  });
}

export function trackSuccessfulEnquirySubmission(formName: string) {
  trackGoogleAnalyticsEvent("generate_lead", {
    form_name: formName,
    lead_source: "website_enquiry_form",
  });
}
