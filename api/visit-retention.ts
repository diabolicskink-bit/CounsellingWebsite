import { timingSafeEqual } from "node:crypto";
import {
  deleteExpiredVisitData,
  type VisitRetentionCleanupResult,
} from "../src/server/visits/retention.ts";
import {
  VisitDatabaseConfigurationError,
} from "../src/server/visits/repository.ts";
import type {
  VisitRequest,
  VisitResponse,
} from "../src/server/visits/request.ts";

type DeleteExpiredVisitData = () => Promise<VisitRetentionCleanupResult>;
type GetCronSecret = () => string | undefined;

const publicFailureMessage = "Visit retention cleanup failed.";

function getHeader(request: VisitRequest, name: string) {
  const headers = request.headers ?? {};
  const headerName = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  const value = headerName ? headers[headerName] : undefined;

  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function isAuthorized(request: VisitRequest, cronSecret: string) {
  const suppliedAuthorization = Buffer.from(getHeader(request, "authorization"));
  const expectedAuthorization = Buffer.from(`Bearer ${cronSecret}`);

  return suppliedAuthorization.length === expectedAuthorization.length
    && timingSafeEqual(suppliedAuthorization, expectedAuthorization);
}

function sendFailure(response: VisitResponse, status: number) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(status).json({ error: publicFailureMessage });
}

function sendSuccess(response: VisitResponse, result: VisitRetentionCleanupResult) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ ok: true, ...result });
}

export function createVisitRetentionHandler(
  deleteExpiredData: DeleteExpiredVisitData = deleteExpiredVisitData,
  getCronSecret: GetCronSecret = () => process.env.CRON_SECRET,
) {
  return async function handler(request: VisitRequest, response: VisitResponse) {
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      return sendFailure(response, 405);
    }

    const cronSecret = getCronSecret();

    if (!cronSecret) {
      console.error("Visit retention configuration missing: CRON_SECRET");
      return sendFailure(response, 500);
    }

    if (!isAuthorized(request, cronSecret)) {
      console.warn("Visit retention request rejected: unauthorized");
      return sendFailure(response, 401);
    }

    try {
      const result = await deleteExpiredData();

      console.info("Visit retention cleanup complete:", result);
      return sendSuccess(response, result);
    } catch (error) {
      const errorName = error instanceof Error ? error.name : "UnknownError";

      if (error instanceof VisitDatabaseConfigurationError) {
        console.error("Visit retention database configuration missing:", errorName);
      } else {
        console.error("Visit retention cleanup failed:", errorName);
      }

      return sendFailure(response, 500);
    }
  };
}

export default createVisitRetentionHandler();
