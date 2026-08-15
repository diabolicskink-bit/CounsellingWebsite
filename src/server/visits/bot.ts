import { checkBotId } from "botid/server";
import type { VisitBotClassification } from "./repository.ts";
import type { VisitRequest } from "./request.ts";

const maxBotIdentityLength = 128;

export const unclassifiedVisitBot: VisitBotClassification = {
  botCategory: null,
  botName: null,
  isBot: null,
};

function normalizeBotIdentity(value: string | undefined) {
  const normalizedValue = value?.trim();

  return normalizedValue
    ? normalizedValue.slice(0, maxBotIdentityLength)
    : null;
}

export async function classifyVisitBot(request: VisitRequest): Promise<VisitBotClassification> {
  const verification = await checkBotId({
    advancedOptions: {
      checkLevel: "basic",
      headers: request.headers ?? {},
    },
  });
  const hasVerifiedIdentity = verification.isBot
    && verification.isVerifiedBot
    && "verifiedBotName" in verification;

  return {
    botCategory: hasVerifiedIdentity
      ? normalizeBotIdentity(verification.verifiedBotCategory)
      : null,
    botName: hasVerifiedIdentity
      ? normalizeBotIdentity(verification.verifiedBotName)
      : null,
    isBot: verification.isBot,
  };
}
