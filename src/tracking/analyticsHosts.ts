import { siteMetadata } from "../data/routeMetadata";
import { isHostnameAllowed, normalizeHostname } from "./hostnameAllowlist";

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

export function createAnalyticsHostAllowlist(additionalHosts: string | undefined) {
  return new Set(
    [
      ...getDefaultAllowedHostnames(),
      ...(additionalHosts ?? "")
        .split(",")
        .map((hostname) => normalizeHostname(hostname))
        .filter((hostname): hostname is string => Boolean(hostname)),
    ].map((hostname) => hostname.toLowerCase()),
  );
}

export function isCurrentHostnameAllowed(allowedHostnames: Set<string>) {
  if (typeof window === "undefined") {
    return false;
  }

  return isHostnameAllowed(allowedHostnames, window.location.hostname);
}
