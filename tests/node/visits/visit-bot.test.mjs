import assert from "node:assert/strict";
import { test } from "node:test";
import { createVisitBotClassifier } from "../../../src/server/visits/bot.ts";

const human = { isHuman: true, isBot: false, isVerifiedBot: false, bypassed: false };
const bot = { ...human, isHuman: false, isBot: true };
const browserUa = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36";
const request = (ua = browserUa) => ({
  headers: { "user-agent": ua, "x-vercel-forwarded-for": "203.0.113.9" },
});
const unnamed = (isBot) => ({ isBot, botName: null, botCategory: null });

function classifier(checkResult = human, overrides = {}) {
  return createVisitBotClassifier({
    check: async () => checkResult,
    environment: { VERCEL: "1" },
    identifyIp: async () => null,
    ...overrides,
  });
}

test("accepts Vercel's verified-only identity before User-Agent or IP", async () => {
  const classify = classifier({
    ...human, isVerifiedBot: true,
    verifiedBotName: "  Vercel supplied bot  ", verifiedBotCategory: " Search bot ",
  });
  assert.deepEqual(await classify(request("Googlebot/2.1")), {
    isBot: true, botName: "Vercel supplied bot", botCategory: "Search bot",
  });
});

test("uses named User-Agents even when BotID does not flag a bot", async () => {
  const classify = classifier();
  for (const [ua, name] of [
    ["Googlebot/2.1", "Googlebot"],
    ["GPTBot/1.4", "GPTBot"],
  ]) {
    const result = await classify(request(ua));
    assert.equal(result.botName, name, ua);
    assert.equal(result.isBot, true, ua);
  }
});

test("retains User-Agent identification when BotID fails without logging request data", async (context) => {
  const warnings = [];
  context.mock.method(console, "warn", (...args) => warnings.push(args));
  const classify = classifier(human, {
    check: async () => { throw new Error("private request data"); },
  });
  assert.equal((await classify(request("GPTBot/1.4"))).botName, "GPTBot");
  assert.deepEqual(await classify(request()), unnamed(null));
  assert.equal(JSON.stringify(warnings).includes("private request data"), false);
});

test("disabled and bypassed BotID supply no human evidence", async (context) => {
  const check = context.mock.fn(async () => human);
  const disabled = classifier(human, {
    environment: { VERCEL: "1", VITE_VISIT_BOT_DETECTION_ENABLED: "false" },
    check,
  });
  assert.deepEqual(await disabled(request()), unnamed(null));
  assert.equal((await disabled(request("Googlebot/2.1"))).isBot, true);
  assert.equal(check.mock.callCount(), 0);
  assert.deepEqual(await classifier({ ...human, bypassed: true })(request()), unnamed(null));
  assert.deepEqual(await classifier()(request()), unnamed(false));
});

test("does not accept a claimed Vercel identity without its verified flag", async () => {
  const classify = classifier({ ...bot, verifiedBotName: "Ignored name" }, {
    environment: {},
  });
  assert.deepEqual(await classify(request()), unnamed(true));
});

test("falls back to IP only for unnamed bots, including generic User-Agent matches", async () => {
  const identity = { botName: "OpenAI bot", botCategory: "AI bot" };
  const identifyIp = async () => identity;
  assert.deepEqual(await classifier(bot, { identifyIp })(request()), { ...identity, isBot: true });
  assert.deepEqual(await classifier(human, { identifyIp })(request("UnlistedCrawlerBot/1.0")),
    { ...identity, isBot: true });
});

test("verified bots without names and failed IP lookups remain bots", async () => {
  assert.deepEqual(await classifier(bot)(request()), unnamed(true));
  const verified = { ...human, isVerifiedBot: true };
  const identifyIp = async () => { throw new Error("lookup failed"); };
  assert.deepEqual(await classifier(verified, { identifyIp })(request()), unnamed(true));
});

test("keeps Vercel checks on the free Basic level", async () => {
  let options;
  const classify = classifier(human, {
    check: async (value) => { options = value; return human; },
  });
  await classify(request());
  assert.equal(options.advancedOptions.checkLevel, "basic");
});

test("skips network naming for named bots and unflagged visits", async (context) => {
  const identifyIp = context.mock.fn(async () => null);
  const verified = { ...human, isVerifiedBot: true, verifiedBotName: "Verified bot" };
  await classifier(verified, { identifyIp })(request());
  await classifier(bot, { identifyIp })(request("Googlebot/2.1"));
  await classifier(human, { identifyIp })(request());
  assert.equal(identifyIp.mock.callCount(), 0);
});
