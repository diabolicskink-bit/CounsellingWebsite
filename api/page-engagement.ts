import {
  PageEngagementIdentityConflictError,
  recordPageEngagement,
} from "../src/server/page-engagement/repository.ts";
import {
  validatePageEngagementPayload,
  type PageEngagementObservation,
} from "../src/server/page-engagement/validation.ts";
import {
  getVisitPayloadBody,
  getVisitRequestShapeBlock,
  logBlockedVisitRequest,
  type VisitRequest,
  type VisitResponse,
} from "../src/server/visits/request.ts";
import { VisitDatabaseConfigurationError } from "../src/server/visits/repository.ts";

type RecordPageEngagement = (observation: PageEngagementObservation) => Promise<unknown>;

const publicFailureMessage = "Page engagement could not be recorded.";

function sendFailure(response: VisitResponse, status: number) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(status).json({ error: publicFailureMessage });
}

function sendSuccess(response: VisitResponse) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(204).end();
}

export function createPageEngagementHandler(
  recordEngagement: RecordPageEngagement = recordPageEngagement,
) {
  return async function handler(request: VisitRequest, response: VisitResponse) {
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      return sendFailure(response, 405);
    }

    const requestShapeBlock = getVisitRequestShapeBlock(request);

    if (requestShapeBlock) {
      logBlockedVisitRequest(request, requestShapeBlock);
      return sendFailure(response, requestShapeBlock.status);
    }

    const validation = validatePageEngagementPayload(getVisitPayloadBody(request));

    if (validation.type === "invalid") {
      console.warn("Page engagement payload rejected");
      return sendFailure(response, 400);
    }

    try {
      await recordEngagement(validation.observation);
      return sendSuccess(response);
    } catch (error) {
      if (error instanceof PageEngagementIdentityConflictError) {
        console.warn("Page engagement identity conflict");
        return sendFailure(response, 409);
      }

      const errorName = error instanceof Error ? error.name : "UnknownError";

      if (error instanceof VisitDatabaseConfigurationError) {
        console.error("Page engagement database configuration missing:", errorName);
      } else {
        console.error("Page engagement recording failed:", errorName);
      }

      return sendFailure(response, 500);
    }
  };
}

export default createPageEngagementHandler();
