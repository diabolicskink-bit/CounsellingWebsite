import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  isVisitAnalyticsHostAllowed,
  visitAnalyticsEnabled,
} from "../utils/visitAnalytics";
import {
  createInitialVisitObservation,
  createRouteVisitObservation,
} from "../utils/visitSession";

let lastRecordedPath: string | undefined;

function recordPageView(path: string) {
  if (lastRecordedPath === path) {
    return;
  }

  const isInitialPageView = typeof lastRecordedPath === "undefined";

  lastRecordedPath = path;

  try {
    const observation = isInitialPageView
      ? createInitialVisitObservation(path)
      : createRouteVisitObservation(path);

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
  const { pathname } = useLocation();

  useEffect(() => {
    if (!visitAnalyticsEnabled || !isVisitAnalyticsHostAllowed()) {
      return;
    }

    recordPageView(pathname);
  }, [pathname]);

  return null;
}
