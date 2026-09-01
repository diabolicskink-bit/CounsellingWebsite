import { useEffect, useState } from "react";
import {
  isAnalyticsApiResponseOfType,
  type AnalyticsReportOfType,
  type AnalyticsReportType,
} from "../../data/analyticsContract";

type AnalyticsLoadStatus = "error" | "loading" | "ready";

type AnalyticsLoadState<Type extends AnalyticsReportType> =
  | {
      expectedType: Type;
      report: null;
      requestUrl: string;
      status: Exclude<AnalyticsLoadStatus, "ready">;
    }
  | {
      expectedType: Type;
      report: AnalyticsReportOfType<Type>;
      requestUrl: string;
      status: "ready";
    };

export function useAnalyticsReport<Type extends AnalyticsReportType>(
  requestUrl: string,
  expectedType: Type,
) {
  const [requestVersion, setRequestVersion] = useState(0);
  const [state, setState] = useState<AnalyticsLoadState<Type>>({
    expectedType,
    report: null,
    requestUrl,
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ expectedType, report: null, requestUrl, status: "loading" });

    async function loadReport() {
      try {
        const response = await fetch(requestUrl, {
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        const body: unknown = await response.json();

        if (!response.ok || !isAnalyticsApiResponseOfType(body, expectedType)) {
          throw new Error("Analytics request failed.");
        }

        setState({ expectedType, report: body.data, requestUrl, status: "ready" });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(
          "Analytics request failed:",
          error instanceof Error ? error.name : "UnknownError",
        );
        setState({ expectedType, report: null, requestUrl, status: "error" });
      }
    }

    void loadReport();
    return () => controller.abort();
  }, [expectedType, requestUrl, requestVersion]);

  const currentState: AnalyticsLoadState<Type> = state.requestUrl === requestUrl
    && state.expectedType === expectedType
    ? state
    : { expectedType, report: null, requestUrl, status: "loading" };

  return {
    report: currentState.report,
    retry: () => setRequestVersion((version) => version + 1),
    status: currentState.status,
  };
}

export default useAnalyticsReport;
