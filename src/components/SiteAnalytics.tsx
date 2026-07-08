import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMetadata, type RouteMetadata } from "../data/routeMetadata";

const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const gaScriptId = "vive-google-analytics";
const gaConfigScriptId = "vive-google-analytics-config";
const publicRouteMetadata: Record<string, RouteMetadata | undefined> = routeMetadata;

type GoogleAnalyticsProps = {
  measurementId?: string;
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

export default function SiteAnalytics() {
  if (!analyticsEnabled) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics measurementId={gaMeasurementId} />
      <Analytics mode="production" />
    </>
  );
}
