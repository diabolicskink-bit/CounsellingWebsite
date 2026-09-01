export function normalizeHostname(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  const isWildcard = trimmedValue.startsWith("*.");
  const hostnameValue = isWildcard ? trimmedValue.slice(2) : trimmedValue;

  try {
    const withProtocol = hostnameValue.includes("://") ? hostnameValue : `https://${hostnameValue}`;
    const hostname = new URL(withProtocol).hostname.toLowerCase();

    return isWildcard ? `*.${hostname}` : hostname;
  } catch {
    return trimmedValue.toLowerCase();
  }
}

export function isHostnameAllowed(allowedHostnames: Set<string>, hostname: string) {
  const normalizedHostname = normalizeHostname(hostname);

  if (!normalizedHostname) {
    return false;
  }

  return allowedHostnames.has(normalizedHostname)
    || [...allowedHostnames].some((allowedHostname) => (
      allowedHostname.startsWith("*.")
      && normalizedHostname.endsWith(allowedHostname.slice(1))
    ));
}
