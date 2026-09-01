import {
  PageViewIdentityConflictError,
  recordVisitObservation,
  VisitDatabaseConfigurationError,
  VisitIdentityConflictError,
  type VisitBotClassification,
  type VisitObservation,
} from "../src/server/visits/repository.ts";
import {
  getVisitPayloadBody,
  getVisitRequestEnvironment,
  getVisitRequestShapeBlock,
  logBlockedVisitRequest,
  type VisitRequest,
  type VisitResponse,
} from "../src/server/visits/request.ts";
import {
  classifyVisitBot,
  unclassifiedVisitBot,
} from "../src/server/visits/bot.ts";
import { validateVisitPayload } from "../src/server/visits/validation.ts";

type RecordVisitObservation = (observation: VisitObservation) => Promise<unknown>;
type ClassifyVisitBot = (request: VisitRequest) => Promise<VisitBotClassification>;

const publicFailureMessage = "Visit could not be recorded.";

function sendFailure(response: VisitResponse, status: number) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(status).json({ error: publicFailureMessage });
}

function sendSuccess(response: VisitResponse) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(204).end();
}

export function createVisitHandler(
  recordObservation: RecordVisitObservation = recordVisitObservation,
  classifyBot: ClassifyVisitBot = classifyVisitBot,
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

    const validation = validateVisitPayload(getVisitPayloadBody(request));

    if (validation.type === "invalid") {
      console.warn("Visit payload rejected:", validation.issues);
      return sendFailure(response, 400);
    }

    let botClassification = unclassifiedVisitBot;

    try {
      botClassification = await classifyBot(request);
    } catch (error) {
      console.warn(
        "Visit bot classification unavailable:",
        error instanceof Error ? error.name : "UnknownError",
      );
    }

    try {
      await recordObservation({
        ...validation.observation,
        ...getVisitRequestEnvironment(request),
        ...botClassification,
      });
      return sendSuccess(response);
    } catch (error) {
      if (error instanceof VisitIdentityConflictError || error instanceof PageViewIdentityConflictError) {
        console.warn("Visit identity conflict:", error.name);
        return sendFailure(response, 409);
      }

      const errorName = error instanceof Error ? error.name : "UnknownError";
      if (error instanceof VisitDatabaseConfigurationError) {
        console.error("Visit database configuration missing:", errorName);
      } else {
        console.error("Visit recording failed:", errorName);
      }

      return sendFailure(response, 500);
    }
  };
}

export default createVisitHandler();
