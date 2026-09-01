const storageVersion = 1;
const visitorStorageKey = "vive:visit-analytics:visitor:v1";
const visitStorageKey = "vive:visit-analytics:visit:v1";
const visitInactivityTimeoutMs = 30 * 60 * 1000;
const visitorIdentifierLifetimeMonths = 12;
const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type StoredVisitor = {
  createdAt: number;
  id: string;
  version: typeof storageVersion;
};

type StoredVisit = {
  adCode: string | null;
  gclid: string | null;
  id: string;
  landingPath: string;
  lastActivityAt: number;
  matchType: string | null;
  matchedKeyword: string | null;
  networkCode: string | null;
  referrerUrl: string | null;
  version: typeof storageVersion;
  visitorId: string;
};

export type VisitPageViewObservation = {
  adCode: string | null;
  gclid: string | null;
  isWebDriver: boolean | null;
  landingPath: string;
  matchType: string | null;
  matchedKeyword: string | null;
  networkCode: string | null;
  pageViewId: string;
  path: string;
  referrerUrl: string | null;
  visitId: string;
  visitorId: string;
};

export type VisitEventContext = Pick<
  VisitPageViewObservation,
  "pageViewId" | "visitId" | "visitorId"
>;

let volatileVisitor: StoredVisitor | undefined;
let volatileVisit: StoredVisit | undefined;
let currentEventContext: VisitEventContext | undefined;

export function createVisitAnalyticsUuid() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = crypto.getRandomValues(new Uint8Array(16));

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

function readStoredValue(storage: Storage, key: string) {
  try {
    const value = storage.getItem(key);

    return value ? JSON.parse(value) as unknown : undefined;
  } catch {
    return undefined;
  }
}

function writeStoredValue(storage: Storage, key: string, value: unknown) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Volatile module state still prevents duplicate work during this document load.
  }
}

function getLocalStorage() {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function getSessionStorage() {
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
}

function isStoredVisitor(value: unknown): value is StoredVisitor {
  if (!value || typeof value !== "object") {
    return false;
  }

  const visitor = value as Partial<StoredVisitor>;

  return visitor.version === storageVersion
    && typeof visitor.id === "string"
    && uuidV4Pattern.test(visitor.id)
    && typeof visitor.createdAt === "number"
    && Number.isFinite(visitor.createdAt)
    && visitor.createdAt > 0;
}

function getVisitorIdentifierExpiresAt(createdAt: number) {
  const createdDate = new Date(createdAt);
  const targetMonthIndex = createdDate.getUTCMonth() + visitorIdentifierLifetimeMonths;
  const targetYear = createdDate.getUTCFullYear() + Math.floor(targetMonthIndex / 12);
  const targetMonth = targetMonthIndex % 12;
  const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  const expiresAt = new Date(createdAt);

  expiresAt.setUTCFullYear(
    targetYear,
    targetMonth,
    Math.min(createdDate.getUTCDate(), lastDayOfTargetMonth),
  );

  return expiresAt.getTime();
}

function isVisitorIdentifierActive(visitor: StoredVisitor, now: number) {
  return visitor.createdAt <= now && now < getVisitorIdentifierExpiresAt(visitor.createdAt);
}

function getOrCreateVisitor(now: number) {
  const storage = getLocalStorage();
  const storedVisitor = storage ? readStoredValue(storage, visitorStorageKey) : undefined;

  if (isStoredVisitor(storedVisitor) && isVisitorIdentifierActive(storedVisitor, now)) {
    volatileVisitor = storedVisitor;
    return storedVisitor;
  }

  if (isStoredVisitor(volatileVisitor) && isVisitorIdentifierActive(volatileVisitor, now)) {
    return volatileVisitor;
  }

  const visitor: StoredVisitor = {
    createdAt: now,
    id: createVisitAnalyticsUuid(),
    version: storageVersion,
  };

  volatileVisitor = visitor;

  if (storage) {
    writeStoredValue(storage, visitorStorageKey, visitor);
  }

  return visitor;
}

function getOptionalSearchParameter(parameters: URLSearchParams, name: string, maxLength: number) {
  const value = parameters.get(name);

  if (!value) {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue && normalizedValue.length <= maxLength ? normalizedValue : null;
}

function getCurrentAttribution() {
  const parameters = new URLSearchParams(window.location.search);

  return {
    adCode: getOptionalSearchParameter(parameters, "ad", 128),
    gclid: getOptionalSearchParameter(parameters, "gclid", 2048),
    matchType: getOptionalSearchParameter(parameters, "mt", 32),
    matchedKeyword: getOptionalSearchParameter(parameters, "kw", 1024),
    networkCode: getOptionalSearchParameter(parameters, "net", 32),
  };
}

function getCurrentReferrer() {
  const referrerUrl = document.referrer;

  if (!referrerUrl || referrerUrl.length > 4096) {
    return null;
  }

  try {
    const referrer = new URL(referrerUrl);

    return referrer.protocol === "http:" || referrer.protocol === "https:"
      ? referrerUrl
      : null;
  } catch {
    return null;
  }
}

function isExternalReferrer(referrerUrl: string | null) {
  if (!referrerUrl) {
    return false;
  }

  try {
    return new URL(referrerUrl).origin !== window.location.origin;
  } catch {
    return false;
  }
}

function hasAttribution(attribution: ReturnType<typeof getCurrentAttribution>) {
  return Object.values(attribution).some(Boolean);
}

function attributionChanged(
  visit: StoredVisit,
  attribution: ReturnType<typeof getCurrentAttribution>,
) {
  return visit.adCode !== attribution.adCode
    || visit.gclid !== attribution.gclid
    || visit.matchType !== attribution.matchType
    || visit.matchedKeyword !== attribution.matchedKeyword
    || visit.networkCode !== attribution.networkCode;
}

function isStoredVisit(value: unknown): value is StoredVisit {
  if (!value || typeof value !== "object") {
    return false;
  }

  const visit = value as Partial<StoredVisit>;
  const optionalValues = [
    visit.adCode,
    visit.gclid,
    visit.matchType,
    visit.matchedKeyword,
    visit.networkCode,
    visit.referrerUrl,
  ];

  return visit.version === storageVersion
    && typeof visit.id === "string"
    && uuidV4Pattern.test(visit.id)
    && typeof visit.visitorId === "string"
    && uuidV4Pattern.test(visit.visitorId)
    && typeof visit.lastActivityAt === "number"
    && Number.isFinite(visit.lastActivityAt)
    && typeof visit.landingPath === "string"
    && visit.landingPath.startsWith("/")
    && optionalValues.every((item) => item === null || typeof item === "string");
}

function canReuseVisit(
  visit: StoredVisit,
  visitorId: string,
  now: number,
  referrerUrl: string | null,
  attribution: ReturnType<typeof getCurrentAttribution>,
) {
  const inactivity = now - visit.lastActivityAt;

  if (
    visit.visitorId !== visitorId
    || inactivity < 0
    || inactivity > visitInactivityTimeoutMs
    || isExternalReferrer(referrerUrl)
  ) {
    return false;
  }

  return !hasAttribution(attribution) || !attributionChanged(visit, attribution);
}

function createVisit(
  visitorId: string,
  now: number,
  landingPath: string,
  referrerUrl: string | null,
  attribution: ReturnType<typeof getCurrentAttribution>,
): StoredVisit {
  return {
    ...attribution,
    id: createVisitAnalyticsUuid(),
    landingPath,
    lastActivityAt: now,
    referrerUrl,
    version: storageVersion,
    visitorId,
  };
}

function getOrCreateVisit(visitorId: string, path: string, now: number) {
  const storage = getSessionStorage();
  const storedVisit = storage ? readStoredValue(storage, visitStorageKey) : undefined;
  const candidateVisit = isStoredVisit(storedVisit) ? storedVisit : volatileVisit;
  const referrerUrl = getCurrentReferrer();
  const attribution = getCurrentAttribution();
  const visit = isStoredVisit(candidateVisit)
    && canReuseVisit(candidateVisit, visitorId, now, referrerUrl, attribution)
    ? { ...candidateVisit, lastActivityAt: now }
    : createVisit(visitorId, now, path, referrerUrl, attribution);

  volatileVisit = visit;

  if (storage) {
    writeStoredValue(storage, visitStorageKey, visit);
  }

  return visit;
}

function getOrCreateVisitForRoute(visitorId: string, path: string, now: number) {
  const storage = getSessionStorage();
  const storedVisit = storage ? readStoredValue(storage, visitStorageKey) : undefined;
  const candidateVisit = isStoredVisit(storedVisit) ? storedVisit : volatileVisit;
  const inactivity = isStoredVisit(candidateVisit) ? now - candidateVisit.lastActivityAt : undefined;
  const visit = isStoredVisit(candidateVisit)
    && candidateVisit.visitorId === visitorId
    && typeof inactivity === "number"
    && inactivity >= 0
    && inactivity <= visitInactivityTimeoutMs
    ? { ...candidateVisit, lastActivityAt: now }
    : createVisit(visitorId, now, path, null, {
        adCode: null,
        gclid: null,
        matchType: null,
        matchedKeyword: null,
        networkCode: null,
      });

  volatileVisit = visit;

  if (storage) {
    writeStoredValue(storage, visitStorageKey, visit);
  }

  return visit;
}

function createObservation(
  visitor: StoredVisitor,
  visit: StoredVisit,
  path: string,
): VisitPageViewObservation {
  const observation = {
    adCode: visit.adCode,
    gclid: visit.gclid,
    isWebDriver: typeof navigator.webdriver === "boolean" ? navigator.webdriver : null,
    landingPath: visit.landingPath,
    matchType: visit.matchType,
    matchedKeyword: visit.matchedKeyword,
    networkCode: visit.networkCode,
    pageViewId: createVisitAnalyticsUuid(),
    path,
    referrerUrl: visit.referrerUrl,
    visitId: visit.id,
    visitorId: visitor.id,
  };

  currentEventContext = {
    pageViewId: observation.pageViewId,
    visitId: observation.visitId,
    visitorId: observation.visitorId,
  };

  return observation;
}

export function getCurrentVisitEventContext() {
  return currentEventContext;
}

export function createInitialVisitObservation(
  path = window.location.pathname,
  now = Date.now(),
): VisitPageViewObservation {
  const visitor = getOrCreateVisitor(now);
  const visit = getOrCreateVisit(visitor.id, path, now);

  return createObservation(visitor, visit, path);
}

export function createRouteVisitObservation(
  path: string,
  now = Date.now(),
): VisitPageViewObservation {
  const visitor = getOrCreateVisitor(now);
  const visit = getOrCreateVisitForRoute(visitor.id, path, now);

  return createObservation(visitor, visit, path);
}
