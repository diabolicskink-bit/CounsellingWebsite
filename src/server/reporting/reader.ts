import type { VisitReportSelection } from "./request.ts";

export class VisitReportDataUnavailableError extends Error {
  constructor() {
    super("Visit reporting database reader has not been connected.");
    this.name = "VisitReportDataUnavailableError";
  }
}

export async function readVisitReport(_selection: VisitReportSelection): Promise<unknown> {
  throw new VisitReportDataUnavailableError();
}
