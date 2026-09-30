import type { ContactPath } from "../contracts/enquiryContract";
import { createAnalyticsHostAllowlist, isCurrentHostnameAllowed } from "./analyticsHosts";

export const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
export const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();

export const gaScriptId = "vive-google-analytics";
export const gaConfigScriptId = "vive-google-analytics-config";
export const clarityScriptId = "vive-microsoft-clarity";

export function hasThirdPartyAnalyticsLoaded() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(
    window.gtag ||
    window.clarity ||
    document.getElementById(gaScriptId) ||
    document.getElementById(gaConfigScriptId) ||
    document.getElementById(clarityScriptId),
  );
}

const analyticsAllowedHosts = import.meta.env.VITE_ANALYTICS_ALLOWED_HOSTS;
const allowedAnalyticsHostnames = createAnalyticsHostAllowlist(analyticsAllowedHosts);

export function isAnalyticsHostAllowed() {
  return isCurrentHostnameAllowed(allowedAnalyticsHostnames);
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

export function trackPhoneLinkClicked() {
  trackGoogleAnalyticsEvent("phone_link_clicked");
}

export function trackContactOptionSelected(option: ContactPath) {
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
