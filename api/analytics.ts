import type { AnalyticsReport } from "../src/data/analyticsContract.ts";
import {
  getAnalyticsSelection,
  type AnalyticsRequest,
  type AnalyticsResponse,
  type AnalyticsSelection,
} from "../src/server/reporting/request.ts";
import {
  AnalyticsDataUnavailableError,
  readAnalytics,
} from "../src/server/reporting/reader.ts";

type ReadAnalytics = (selection: AnalyticsSelection) => Promise<AnalyticsReport>;
type GetNow = () => Date;

const publicFailureMessage = "Analytics data is unavailable.";

function sendFailure(response: AnalyticsResponse, status: number) {
  response.setHeader("Cache-Control", "private, no-store");
  return response.status(status).json({ error: publicFailureMessage });
}

function sendSuccess(response: AnalyticsResponse, data: AnalyticsReport) {
  response.setHeader("Cache-Control", "private, no-store");
  return response.status(200).json({ data });
}

export function createAnalyticsHandler(
  readReport: ReadAnalytics = readAnalytics,
  getNow: GetNow = () => new Date(),
) {
  return async function handler(request: AnalyticsRequest, response: AnalyticsResponse) {
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      return sendFailure(response, 405);
    }

    const selection = getAnalyticsSelection(request.query, getNow());

    if (selection.type === "invalid") {
      return sendFailure(response, 400);
    }

    try {
      return sendSuccess(response, await readReport(selection.selection));
    } catch (error) {
      const errorName = error instanceof Error ? error.name : "UnknownError";

      if (error instanceof AnalyticsDataUnavailableError) {
        console.error("Analytics reader unavailable:", errorName);
        return sendFailure(response, 503);
      }

      console.error("Analytics read failed:", errorName);
      return sendFailure(response, 500);
    }
  };
}

export default createAnalyticsHandler();
