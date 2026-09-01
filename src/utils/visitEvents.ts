import type {
  ClientVisitEventType,
  VisitEventProperties,
} from "../data/visitEventContract";
import {
  isVisitAnalyticsHostAllowed,
  visitAnalyticsEnabled,
} from "./visitAnalytics";
import { enqueueVisitAnalyticsRecord } from "./visitAnalyticsQueue";
import {
  createVisitAnalyticsUuid,
  getCurrentVisitEventContext,
} from "./visitSession";

export function recordVisitEvent(
  eventType: ClientVisitEventType,
  properties: VisitEventProperties,
) {
  if (!visitAnalyticsEnabled || !isVisitAnalyticsHostAllowed()) {
    return;
  }

  const context = getCurrentVisitEventContext();

  if (!context) {
    return;
  }

  const payload = {
    eventId: createVisitAnalyticsUuid(),
    eventType,
    pageViewId: context.pageViewId,
    properties,
    visitId: context.visitId,
  };

  void enqueueVisitAnalyticsRecord(async () => {
    await fetch("/api/visit-event", {
      body: JSON.stringify(payload),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      method: "POST",
    });
  });
}
