import { track } from "@vercel/analytics/react";
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

function trackAnonymousVercelEvent(eventName: string) {
  if (!analyticsEnabled || !isAnalyticsHostAllowed()) {
    return;
  }

  try {
    track(eventName);
  } catch {
    // Analytics is best-effort and must never affect visitor interactions.
  }
}

export function trackEnquiryStarted() {
  trackAnonymousVercelEvent("enquiry_started");
}

export function trackEmailLinkClicked() {
  trackAnonymousVercelEvent("email_link_clicked");
}

export function trackSuccessfulEnquirySubmission(formName: string) {
  if (!analyticsEnabled || !isAnalyticsHostAllowed()) {
    return;
  }

  try {
    if (gaMeasurementId && window.gtag) {
      window.gtag("event", "generate_lead", {
        lead_source: "website_enquiry_form",
        send_to: gaMeasurementId,
      });
    }

    track("Enquiry submitted", { form: formName });
  } catch {
    // Analytics is best-effort and must never change a successful form outcome.
  }
}
