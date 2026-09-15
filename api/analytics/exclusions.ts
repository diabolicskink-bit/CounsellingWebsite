import { getJsonPayloadBody, getMediaType } from "../../src/server/request-body.ts";
import { isAnalyticsVisitorId } from "../../src/data/analyticsContract.ts";
import {
  AnalyticsDataUnavailableError,
} from "../../src/server/reporting/reader.ts";
import {
  readExcludedVisitors,
  setVisitorExclusion,
  UnknownAnalyticsVisitorError,
} from "../../src/server/reporting/exclusions.ts";

type AnalyticsExclusionsRequest = {
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
  query?: Record<string, string | string[] | undefined>;
};

type AnalyticsExclusionsResponse = {
  json(body: unknown): unknown;
  setHeader(name: string, value: string): void;
  status(statusCode: number): AnalyticsExclusionsResponse;
};

type ReadExcludedVisitors = typeof readExcludedVisitors;
type SetVisitorExclusion = typeof setVisitorExclusion;

const maximumBodyBytes = 1024;
const publicFailureMessage = "Analytics exclusions are unavailable.";

function getHeader(request: AnalyticsExclusionsRequest, name: string) {
  const headers = request.headers ?? {};
  const headerName = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  const value = headerName ? headers[headerName] : undefined;

  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function sendFailure(response: AnalyticsExclusionsResponse, status: number) {
  response.setHeader("Cache-Control", "private, no-store");
  return response.status(status).json({ error: publicFailureMessage });
}

function sendSuccess(response: AnalyticsExclusionsResponse, data: unknown) {
  response.setHeader("Cache-Control", "private, no-store");
  return response.status(200).json({ data });
}

function parseUpdate(request: AnalyticsExclusionsRequest) {
  const contentType = getMediaType(getHeader(request, "content-type"));
  if (contentType !== "application/json") return { type: "unsupported" } as const;

  const declaredLength = Number(getHeader(request, "content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maximumBodyBytes) {
    return { type: "oversized" } as const;
  }

  if (typeof request.body === "string" && Buffer.byteLength(request.body, "utf8") > maximumBodyBytes) {
    return { type: "oversized" } as const;
  }

  const record = getJsonPayloadBody(request);
  const keys = Object.keys(record).sort();
  if (keys.length !== 2 || keys[0] !== "excluded" || keys[1] !== "visitorId") {
    return { type: "invalid" } as const;
  }

  if (!isAnalyticsVisitorId(record.visitorId) || typeof record.excluded !== "boolean") {
    return { type: "invalid" } as const;
  }

  return {
    type: "valid",
    excluded: record.excluded,
    visitorId: record.visitorId,
  } as const;
}

export function createAnalyticsExclusionsHandler(
  readExclusions: ReadExcludedVisitors = readExcludedVisitors,
  updateExclusion: SetVisitorExclusion = setVisitorExclusion,
) {
  return async function handler(
    request: AnalyticsExclusionsRequest,
    response: AnalyticsExclusionsResponse,
  ) {
    if (Object.keys(request.query ?? {}).length) {
      return sendFailure(response, 400);
    }

    try {
      if (request.method === "GET") {
        return sendSuccess(response, await readExclusions());
      }

      if (request.method === "PUT") {
        const update = parseUpdate(request);
        if (update.type === "unsupported") return sendFailure(response, 415);
        if (update.type === "oversized") return sendFailure(response, 413);
        if (update.type === "invalid") return sendFailure(response, 400);

        return sendSuccess(
          response,
          await updateExclusion(update.visitorId, update.excluded),
        );
      }

      response.setHeader("Allow", "GET, PUT");
      return sendFailure(response, 405);
    } catch (error) {
      const errorName = error instanceof Error ? error.name : "UnknownError";

      if (error instanceof UnknownAnalyticsVisitorError) {
        return sendFailure(response, 404);
      }

      if (error instanceof AnalyticsDataUnavailableError) {
        console.error("Analytics exclusions unavailable:", errorName);
        return sendFailure(response, 503);
      }

      console.error("Analytics exclusions failed:", errorName);
      return sendFailure(response, 500);
    }
  };
}

export default createAnalyticsExclusionsHandler();
