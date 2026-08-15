import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isPrivateRoutePath } from "../data/routes";
import {
  isVisitAnalyticsHostAllowed,
  visitAnalyticsEnabled,
} from "../utils/visitAnalytics";
import {
  createInitialVisitObservation,
  createRouteVisitObservation,
} from "../utils/visitSession";

let hasRecordedPageView = false;
let lastObservedPath: string | undefined;
let recordQueue = Promise.resolve();

function recordPageView(path: string, force = false) {
  if (!force && lastObservedPath === path) {
    return;
  }

  const isInitialPageView = !hasRecordedPageView;

  hasRecordedPageView = true;
  lastObservedPath = path;

  try {
    const observation = isInitialPageView
      ? createInitialVisitObservation(path)
      : createRouteVisitObservation(path);

    recordQueue = recordQueue
      .catch(() => undefined)
      .then(async () => {
        try {
          await fetch("/api/visit", {
            body: JSON.stringify(observation),
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            keepalive: true,
            method: "POST",
          });
        } catch {
          // Visit analytics is best-effort and must never affect the visitor experience.
        }
      });
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

    if (isPrivateRoutePath(pathname)) {
      lastObservedPath = pathname;
      return;
    }

    recordPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!visitAnalyticsEnabled || !isVisitAnalyticsHostAllowed()) {
      return;
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      const restoredPath = window.location.pathname;

      if (event.persisted && !isPrivateRoutePath(restoredPath)) {
        recordPageView(restoredPath, true);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return null;
}
