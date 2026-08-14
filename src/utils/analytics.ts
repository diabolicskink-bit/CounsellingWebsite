import { createAnalyticsHostAllowlist, isCurrentHostnameAllowed } from "./analyticsHosts";

export const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
export const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();

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
