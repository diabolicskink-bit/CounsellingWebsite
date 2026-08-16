import {
  VisitEventIdentityConflictError,
  VisitEventPageViewConflictError,
  VisitEventVisitConflictError,
  recordVisitEvent,
  type VisitEventObservation,
} from "../src/server/visit-events/repository.ts";
import {
  getVisitEventPayloadBody,
  getVisitEventRequestShapeBlock,
  logBlockedVisitEventRequest,
  type VisitEventRequest,
  type VisitEventResponse,
} from "../src/server/visit-events/request.ts";
import { validateClientVisitEventPayload } from "../src/server/visit-events/validation.ts";
import { VisitDatabaseConfigurationError } from "../src/server/visits/repository.ts";

type RecordVisitEvent = (observation: VisitEventObservation) => Promise<unknown>;

const publicFailureMessage = "Visit event could not be recorded.";

function sendFailure(response: VisitEventResponse, status: number) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(status).json({ error: publicFailureMessage });
}

function sendSuccess(response: VisitEventResponse) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(204).end();
}

export function createVisitEventHandler(
  recordEvent: RecordVisitEvent = recordVisitEvent,
) {
  return async function handler(request: VisitEventRequest, response: VisitEventResponse) {
    const startedAt = Date.now();
    const requestId = request.headers?.["x-vercel-id"] ?? "";

    console.log(JSON.stringify({
      level: "info",
      message: "Visit event request started",
      requestId,
      route: "/api/visit-event",
    }));

    const logCompleted = (status: number) => {
      console.log(JSON.stringify({
        durationMs: Date.now() - startedAt,
        level: "info",
        message: "Visit event request completed",
        route: "/api/visit-event",
        status,
      }));
    };

    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      logCompleted(405);
      return sendFailure(response, 405);
    }

    const requestShapeBlock = getVisitEventRequestShapeBlock(request);

    if (requestShapeBlock) {
      logBlockedVisitEventRequest(request, requestShapeBlock);
      logCompleted(requestShapeBlock.status);
      return sendFailure(response, requestShapeBlock.status);
    }

    const validation = validateClientVisitEventPayload(getVisitEventPayloadBody(request));

    if (validation.type === "invalid") {
      console.warn("Visit event payload rejected:", validation.issues);
      logCompleted(400);
      return sendFailure(response, 400);
    }

    try {
      await recordEvent({
        ...validation.observation,
        source: "client",
      });
      logCompleted(204);
      return sendSuccess(response);
    } catch (error) {
      if (
        error instanceof VisitEventIdentityConflictError
        || error instanceof VisitEventVisitConflictError
        || error instanceof VisitEventPageViewConflictError
      ) {
        console.warn("Visit event identity conflict:", error.name);
        logCompleted(409);
        return sendFailure(response, 409);
      }

      const errorName = error instanceof Error ? error.name : "UnknownError";

      if (error instanceof VisitDatabaseConfigurationError) {
        console.error("Visit event database configuration missing:", errorName);
      } else {
        console.error("Visit event recording failed:", errorName);
      }

      logCompleted(500);
      return sendFailure(response, 500);
    }
  };
}

export default createVisitEventHandler();
