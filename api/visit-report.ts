import {
  getVisitReportSelection,
  type VisitReportRequest,
  type VisitReportResponse,
  type VisitReportSelection,
} from "../src/server/reporting/request.ts";
import {
  readVisitReport,
  VisitReportDataUnavailableError,
} from "../src/server/reporting/reader.ts";

type ReadVisitReport = (selection: VisitReportSelection) => Promise<unknown>;
type GetNow = () => Date;

const publicFailureMessage = "Visit reporting data is unavailable.";

function sendFailure(response: VisitReportResponse, status: number) {
  response.setHeader("Cache-Control", "private, no-store");
  return response.status(status).json({ error: publicFailureMessage });
}

function sendSuccess(response: VisitReportResponse, data: unknown) {
  response.setHeader("Cache-Control", "private, no-store");
  return response.status(200).json({ data });
}

export function createVisitReportHandler(
  readReport: ReadVisitReport = readVisitReport,
  getNow: GetNow = () => new Date(),
) {
  return async function handler(request: VisitReportRequest, response: VisitReportResponse) {
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      return sendFailure(response, 405);
    }

    const selection = getVisitReportSelection(request.query, getNow());

    if (selection.type === "invalid") {
      return sendFailure(response, 400);
    }

    try {
      return sendSuccess(response, await readReport(selection.selection));
    } catch (error) {
      const errorName = error instanceof Error ? error.name : "UnknownError";

      if (error instanceof VisitReportDataUnavailableError) {
        console.error("Visit reporting reader unavailable:", errorName);
        return sendFailure(response, 503);
      }

      console.error("Visit reporting read failed:", errorName);
      return sendFailure(response, 500);
    }
  };
}

export default createVisitReportHandler();
