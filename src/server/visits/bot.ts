import { checkBotId } from "botid/server";
import BotParser from "node-device-detector/parser/bot-abstract-parser.js";
import { identifyBotByIp } from "./bot-network.ts";
import type { VisitBotClassification } from "./repository.ts";
import { getStoredUserAgent, getVisitClientIp, type VisitRequest } from "./request.ts";

const maxBotIdentityLength = 128;
const botParser = new BotParser();

export const unclassifiedVisitBot: VisitBotClassification = {
  botCategory: null,
  botName: null,
  isBot: null,
};

function normalizeBotIdentity(value: string | undefined) {
  const normalizedValue = value?.trim();
  return normalizedValue ? normalizedValue.slice(0, maxBotIdentityLength) : null;
}

export function createVisitBotClassifier({
  check = checkBotId,
  identifyIp = identifyBotByIp,
  environment = process.env,
} = {}) {
  return async function classifyVisitBot(request: VisitRequest): Promise<VisitBotClassification> {
    let isBot: boolean | null = null;

    // Disabling BotID leaves server-side User-Agent identification available.
    if (environment.VITE_VISIT_BOT_DETECTION_ENABLED !== "false") {
      try {
        const verification = await check({
          advancedOptions: { checkLevel: "basic", headers: request.headers ?? {} },
        });

        if (!verification.bypassed) {
          isBot = verification.isBot || verification.isVerifiedBot;
          const botName = verification.isVerifiedBot && "verifiedBotName" in verification
            ? normalizeBotIdentity(verification.verifiedBotName)
            : null;

          if (botName) {
            return {
              botCategory: "verifiedBotCategory" in verification
                ? normalizeBotIdentity(verification.verifiedBotCategory)
                : null,
              botName,
              isBot: true,
            };
          }
        }
      } catch (error) {
        console.warn("Visit BotID check unavailable:", error instanceof Error ? error.name : "UnknownError");
      }
    }

    const userAgent = getStoredUserAgent(request);
    const parsedBot = userAgent ? botParser.parse(userAgent) : null;
    const botName = parsedBot?.name === "Generic Bot" ? null : normalizeBotIdentity(parsedBot?.name);
    if (parsedBot) isBot = true;

    if (botName) {
      return {
        botCategory: normalizeBotIdentity(parsedBot?.category),
        botName,
        isBot: true,
      };
    }

    const ip = isBot === true ? getVisitClientIp(request, environment) : null;
    if (ip) {
      try {
        const identity = await identifyIp(ip);
        if (identity) return { ...identity, isBot: true };
      } catch {
        // An optional naming lookup must never erase the positive bot verdict.
      }
    }

    return { ...unclassifiedVisitBot, isBot };
  };
}

export const classifyVisitBot = createVisitBotClassifier();
