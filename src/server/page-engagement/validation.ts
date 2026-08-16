export type PageEngagementObservation = {
  activeSeconds: number;
  pageViewId: string;
  visitId: string;
  visitorId: string;
};

export type PageEngagementValidationResult =
  | { type: "invalid" }
  | { observation: PageEngagementObservation; type: "valid" };

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const allowedFields = new Set(["activeSeconds", "pageViewId", "visitId", "visitorId"]);

export function validatePageEngagementPayload(
  payload: Record<string, unknown>,
): PageEngagementValidationResult {
  if (Object.keys(payload).some((field) => !allowedFields.has(field))) {
    return { type: "invalid" };
  }

  const activeSeconds = payload.activeSeconds;
  const pageViewId = payload.pageViewId;
  const visitId = payload.visitId;
  const visitorId = payload.visitorId;

  if (
    !Number.isInteger(activeSeconds)
    || (activeSeconds as number) < 1
    || (activeSeconds as number) > 43200
    || typeof pageViewId !== "string"
    || !uuidV4Pattern.test(pageViewId)
    || typeof visitId !== "string"
    || !uuidV4Pattern.test(visitId)
    || typeof visitorId !== "string"
    || !uuidV4Pattern.test(visitorId)
  ) {
    return { type: "invalid" };
  }

  return {
    observation: {
      activeSeconds: activeSeconds as number,
      pageViewId: pageViewId.toLowerCase(),
      visitId: visitId.toLowerCase(),
      visitorId: visitorId.toLowerCase(),
    },
    type: "valid",
  };
}
