import { createAnalyticsHostAllowlist, isCurrentHostnameAllowed } from "./analyticsHosts";

export const visitAnalyticsEnabled = import.meta.env.VITE_VISIT_ANALYTICS_ENABLED === "true";

const allowedVisitAnalyticsHostnames = createAnalyticsHostAllowlist(
  import.meta.env.VITE_VISIT_ANALYTICS_ALLOWED_HOSTS,
);

export function isVisitAnalyticsHostAllowed() {
  return isCurrentHostnameAllowed(allowedVisitAnalyticsHostnames);
}
