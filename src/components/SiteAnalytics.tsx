import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMetadata, type RouteMetadata } from "../data/routeMetadata";
import {
  analyticsEnabled,
  clarityProjectId,
  gaMeasurementId,
  isAnalyticsHostAllowed,
  trackEmailLinkClicked,
} from "../utils/analytics";

const gaScriptId = "vive-google-analytics";
const gaConfigScriptId = "vive-google-analytics-config";
const clarityScriptId = "vive-microsoft-clarity";
const publicRouteMetadata: Record<string, RouteMetadata | undefined> = routeMetadata;

type GoogleAnalyticsProps = {
  measurementId?: string;
};

type MicrosoftClarityProps = {
  projectId?: string;
};

function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    if (!document.getElementById(gaScriptId)) {
      const script = document.createElement("script");

      script.async = true;
      script.id = gaScriptId;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }

    if (!document.getElementById(gaConfigScriptId)) {
      const configScript = document.createElement("script");
      const measurementIdJson = JSON.stringify(measurementId);

      configScript.id = gaConfigScriptId;
      configScript.text = [
        "window.dataLayer = window.dataLayer || [];",
        "function gtag(){window.dataLayer.push(arguments);}",
        "gtag('js', new Date());",
        `gtag('config', ${measurementIdJson}, {"send_page_view":false});`,
      ].join("\n");
      document.head.appendChild(configScript);
    }
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || !window.gtag) {
      return;
    }

    const metadata = publicRouteMetadata[location.pathname];

    if (!metadata) {
      return;
    }

    const pagePath = `${location.pathname}${location.search}`;

    window.gtag("event", "page_view", {
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
      page_title: metadata.title,
      send_to: measurementId,
    });
  }, [location.pathname, location.search, measurementId]);

  return null;
}

function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  useEffect(() => {
    if (!projectId || document.getElementById(clarityScriptId)) {
      return;
    }

    if (!window.clarity) {
      const queuedClarity: ClarityFunction = (...args) => {
        queuedClarity.q = queuedClarity.q || [];
        queuedClarity.q.push(args);
      };

      window.clarity = queuedClarity;
    }

    const script = document.createElement("script");

    script.async = true;
    script.id = clarityScriptId;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
    document.head.appendChild(script);
  }, [projectId]);

  return null;
}

function EmailLinkAnalytics() {
  useEffect(() => {
    const handleEmailLinkClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const emailLink = event.target.closest<HTMLAnchorElement>('a[href^="mailto:"]');

      if (emailLink) {
        trackEmailLinkClicked();
      }
    };

    document.addEventListener("click", handleEmailLinkClick);

    return () => document.removeEventListener("click", handleEmailLinkClick);
  }, []);

  return null;
}

export default function SiteAnalytics() {
  if (!analyticsEnabled || !isAnalyticsHostAllowed()) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics measurementId={gaMeasurementId} />
      <MicrosoftClarity projectId={clarityProjectId} />
      <EmailLinkAnalytics />
      <Analytics mode="production" />
    </>
  );
}
