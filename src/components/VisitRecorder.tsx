import { useEffect } from "react";
import {
  isVisitAnalyticsHostAllowed,
  visitAnalyticsEnabled,
} from "../utils/visitAnalytics";
import { createInitialVisitObservation } from "../utils/visitSession";

let initialRecordingStarted = false;

function recordInitialVisit() {
  if (initialRecordingStarted) {
    return;
  }

  initialRecordingStarted = true;

  try {
    const observation = createInitialVisitObservation();

    void fetch("/api/visit", {
      body: JSON.stringify(observation),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      method: "POST",
    }).catch(() => undefined);
  } catch {
    // Visit analytics is best-effort and must never affect the visitor experience.
  }
}

export default function VisitRecorder() {
  useEffect(() => {
    if (!visitAnalyticsEnabled || !isVisitAnalyticsHostAllowed()) {
      return;
    }

    recordInitialVisit();
  }, []);

  return null;
}
