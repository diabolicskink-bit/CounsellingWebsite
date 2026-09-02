import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getTrackedPagePath, isPrivateRoutePath } from "../data/routes";
import { socialProfileLinks } from "../data/site";
import { visitEventTypes, type ClientVisitEventType } from "../data/visitEventContract";
import {
  isVisitAnalyticsHostAllowed,
  visitAnalyticsEnabled,
} from "../utils/visitAnalytics";
import {
  createInitialVisitObservation,
  createRouteVisitObservation,
} from "../utils/visitSession";
import { enqueueVisitAnalyticsRecord } from "../utils/visitAnalyticsQueue";
import { startPageEngagement, stopPageEngagement } from "../utils/pageEngagement";
import { recordVisitEvent } from "../utils/visitEvents";

let hasRecordedPageView = false;
let lastObservedPath: string | undefined;
const socialClickEventTypeByHref = new Map<string, ClientVisitEventType>(
  socialProfileLinks.map((profile) => [profile.href, profile.clickEventType]),
);

function getClickedLinkEventType(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  const link = target.closest<HTMLAnchorElement>("a[href]");
  const href = link?.getAttribute("href")?.trim();

  if (!href) {
    return null;
  }

  if (href.toLowerCase().startsWith("mailto:")) {
    return visitEventTypes.emailLinkClicked;
  }

  return socialClickEventTypeByHref.get(href) ?? null;
}

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

    void enqueueVisitAnalyticsRecord(async () => {
      await fetch("/api/visit", {
        body: JSON.stringify(observation),
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
        method: "POST",
      });
    });
    startPageEngagement(observation);
  } catch {
    // Visit analytics is best-effort and must never affect the visitor experience.
  }
}

export default function VisitRecorder() {
  const { pathname, state } = useLocation();
  const trackedPagePath = getTrackedPagePath(pathname, state);

  useEffect(() => {
    if (!visitAnalyticsEnabled || !isVisitAnalyticsHostAllowed()) {
      return;
    }

    if (isPrivateRoutePath(pathname)) {
      lastObservedPath = pathname;
      stopPageEngagement();
      return;
    }

    recordPageView(trackedPagePath);
  }, [pathname, trackedPagePath]);

  useEffect(() => {
    if (!visitAnalyticsEnabled || !isVisitAnalyticsHostAllowed()) {
      return;
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      const restoredPath = window.location.pathname;
      const restoredState = window.history.state && typeof window.history.state === "object"
        ? (window.history.state as { usr?: unknown }).usr
        : undefined;

      if (event.persisted && !isPrivateRoutePath(restoredPath)) {
        recordPageView(getTrackedPagePath(restoredPath, restoredState), true);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    if (!visitAnalyticsEnabled || !isVisitAnalyticsHostAllowed()) {
      return;
    }

    const handleLinkClick = (event: MouseEvent) => {
      if (isPrivateRoutePath(window.location.pathname)) {
        return;
      }

      const eventType = getClickedLinkEventType(event.target);

      if (eventType) {
        recordVisitEvent(eventType, {});
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return null;
}
