import type { VisitEventContext } from "./visitSession";
import { enqueueVisitAnalyticsRecord } from "./visitAnalyticsQueue";

const heartbeatMilliseconds = 30_000;
const maximumActiveSeconds = 43_200;

let stopCurrentPageEngagement: (() => void) | undefined;

export function stopPageEngagement() {
  stopCurrentPageEngagement?.();
  stopCurrentPageEngagement = undefined;
}

export function startPageEngagement(context: VisitEventContext) {
  stopPageEngagement();

  let accumulatedMilliseconds = 0;
  let lastQueuedSeconds = 0;
  let visibleSince = document.visibilityState === "visible" ? performance.now() : null;

  const captureVisibleTime = () => {
    if (visibleSince === null) return;

    const now = performance.now();
    accumulatedMilliseconds += Math.max(0, now - visibleSince);
    visibleSince = now;
  };

  const flush = () => {
    captureVisibleTime();
    const activeSeconds = Math.min(
      maximumActiveSeconds,
      Math.floor(accumulatedMilliseconds / 1000),
    );

    if (activeSeconds <= lastQueuedSeconds) return;
    lastQueuedSeconds = activeSeconds;

    void enqueueVisitAnalyticsRecord(async () => {
      await fetch("/api/page-engagement", {
        body: JSON.stringify({ ...context, activeSeconds }),
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        method: "POST",
      });
    });
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      visibleSince = performance.now();
      return;
    }

    flush();
    visibleSince = null;
  };

  const intervalId = window.setInterval(flush, heartbeatMilliseconds);
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    flush();
    window.clearInterval(intervalId);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", stop);
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", stop);
  stopCurrentPageEngagement = stop;
}
