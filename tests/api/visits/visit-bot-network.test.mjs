import assert from "node:assert/strict";
import { test } from "node:test";
import { createBotIpLookup } from "../../../src/server/visits/bot-network.ts";
import { getVisitClientIp } from "../../../src/server/visits/request.ts";

const ip = "203.0.113.9";
const ipv6 = "2001:db8::9";
const fixture = (cidrs) => ({ prefixes: cidrs.map((cidr) => ({
  [cidr.includes(":") ? "ipv6Prefix" : "ipv4Prefix"]: cidr,
})) });

function setup({ feeds = {}, resolver = {}, now } = {}) {
  const fetches = [];
  const dnsCalls = [];
  const dns = {
    reverse: async (address) => { dnsCalls.push(address); return []; },
    resolve4: async () => [],
    resolve6: async () => [],
    cancel() {},
    ...resolver,
  };
  const lookup = createBotIpLookup({
    now,
    fetchRanges: async (url, options) => {
      fetches.push({ url, signal: options.signal });
      const value = Object.entries(feeds).find(([source]) => url.endsWith(source))?.[1];
      return { ok: value !== undefined, json: async () => value };
    },
    createResolver: () => dns,
  });
  return { lookup, fetches, dnsCalls };
}

test("uses only a single Vercel-injected IP, never caller body or alternate headers", () => {
  const env = { VERCEL: "1" };
  assert.equal(getVisitClientIp({ headers: { "X-Vercel-Forwarded-For": ip } }, env), ip);
  assert.equal(getVisitClientIp({ headers: { "x-vercel-forwarded-for": ipv6 } }, env), ipv6);
  assert.equal(getVisitClientIp({ headers: { "x-vercel-forwarded-for": ip } }, {}), null);
  assert.equal(getVisitClientIp({ body: { ip }, headers: { "x-forwarded-for": ip } }, env), null);
  for (const value of [ip + ", 192.0.2.1", [ip, "192.0.2.1"], ip + ":80", "unknown", "fe80::1%eth0"]) {
    assert.equal(getVisitClientIp({ headers: { "x-vercel-forwarded-for": value } }, env), null);
  }
});

test("matches published IPv4/IPv6 ranges for each supported provider", async () => {
  for (const [source, name] of [
    ["/common-crawlers.json", "Google crawler"],
    ["/special-crawlers.json", "Google crawler"],
    ["/bingbot.json", "Bingbot"],
    ["/searchbot.json", "OpenAI bot"],
    ["/gptbot.json", "OpenAI bot"],
    ["/chatgpt-user.json", "OpenAI bot"],
    ["/adsbot.json", "OpenAI bot"],
    ["/bots.json", "Anthropic bot"],
    ["/perplexitybot.json", "Perplexity bot"],
    ["/perplexity-user.json", "Perplexity bot"],
  ]) {
    const { lookup, dnsCalls } = setup({ feeds: { [source]: fixture(["203.0.113.0/24", "2001:db8::/48"]) } });
    for (const address of [ip, ipv6, "::ffff:203.0.113.9"]) {
      assert.equal((await lookup(address))?.botName, name, source);
    }
    assert.deepEqual(dnsCalls, []);
    assert.equal(await lookup("203.0.114.9"), null);
    assert.equal(await lookup("2001:db9::9"), null);
  }
});

test("does not choose arbitrarily when provider ranges overlap", async () => {
  const { lookup } = setup({ feeds: {
    "/bots.json": fixture([ip + "/32"]),
    "/searchbot.json": fixture([ip + "/32"]),
  } });
  assert.equal(await lookup(ip), null);
});

test("falls back to forward-confirmed Google/Bing DNS, including equivalent IPv6", async () => {
  for (const [hostname, name] of [
    ["crawl-203-0-113-9.googlebot.com", "Google crawler"],
    ["geo-crawl-203-0-113-9.geo.googlebot.com", "Google crawler"],
    ["rate-limited-proxy-203-0-113-9.google.com", "Google crawler"],
    ["rate-limited-proxy-2001-db8-0-0-0-0-0-9.google.com", "Google crawler"],
    ["msnbot-203-0-113-9.search.msn.com", "Bingbot"],
  ]) {
    const { lookup } = setup({ resolver: {
      reverse: async () => [hostname.toUpperCase() + "."],
      resolve4: async () => [ip],
      resolve6: async () => ["2001:db8:0:0:0:0:0:9"],
    } });
    assert.equal((await lookup(ip))?.botName, name);
    assert.equal((await lookup(ipv6))?.botName, name);
  }
});

test("rejects misleading DNS suffixes and names that do not resolve back", async () => {
  const forwardQueries = [];
  for (const hostname of ["crawl.googlebot.com.evil.test", "evilgooglebot.com", "search.msn.com.evil.test",
    "evilsearch.msn.com", "customer.googleusercontent.com"]) {
    const { lookup } = setup({ resolver: {
      reverse: async () => [hostname],
      resolve4: async (name) => { forwardQueries.push(name); return [ip]; },
      resolve6: async (name) => { forwardQueries.push(name); return [ipv6]; },
    } });
    assert.equal(await lookup(ip), null);
  }
  assert.deepEqual(forwardQueries, []);
  const { lookup } = setup({ resolver: {
    reverse: async () => ["crawl.googlebot.com"],
    resolve4: async () => ["192.0.2.10"],
  } });
  assert.equal(await lookup(ip), null);
});

test("invalid feeds and DNS failures leave identity unknown", async () => {
  for (const data of [{}, { prefixes: [] }, { prefixes: [{ ipv4Prefix: "203.0.113.0/99" }] },
    { prefixes: [{ ipv4Prefix: "0.0.0.0/0" }] }]) {
    const { lookup } = setup({
      feeds: { "/bingbot.json": data },
      resolver: { reverse: async () => { throw new Error("DNS unavailable"); } },
    });
    assert.equal(await lookup(ip), null);
  }
});

test("caches concurrent requests and refreshes expired identities and lists", async () => {
  let time = 0;
  const { lookup, fetches } = setup({
    feeds: { "/bots.json": fixture(["203.0.113.0/24"]) }, now: () => time,
  });
  const [first, second] = await Promise.all([lookup(ip), lookup(ip)]);
  assert.deepEqual(first, second);
  const initialFetches = fetches.length;
  await lookup("203.0.113.10");
  assert.equal(fetches.length, initialFetches);
  const successfulFeedFetches = () => fetches.filter(({ url }) => url.endsWith("/bots.json")).length;
  time += 2 * 60 * 60 * 1_000;
  await lookup(ip);
  assert.equal(successfulFeedFetches(), 1);
  time += 24 * 60 * 60 * 1_000;
  await lookup(ip);
  assert.equal(successfulFeedFetches(), 2);
});

test("retries unsuccessful lookups after a short cache interval", async () => {
  let time = 0;
  const { lookup, fetches, dnsCalls } = setup({ now: () => time });
  assert.equal(await lookup(ip), null);
  const count = fetches.length;
  await lookup(ip);
  assert.equal(dnsCalls.length, 1);
  time += 60_001;
  await lookup(ip);
  assert.equal(fetches.length, count * 2);
  assert.equal(dnsCalls.length, 2);
});

test("aborts slow feed requests and still attempts DNS within the total budget", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  const signals = [];
  let dnsCalls = 0;
  const lookup = createBotIpLookup({
    fetchRanges: async (_url, { signal }) => {
      signals.push(signal);
      return new Promise(() => {});
    },
    createResolver: () => ({
      reverse: async () => { dnsCalls += 1; return ["crawl.googlebot.com"]; },
      resolve4: async () => [ip],
      resolve6: async () => [],
      cancel() {},
    }),
  });
  const result = lookup(ip);
  context.mock.timers.tick(650);
  assert.equal((await result)?.botName, "Google crawler");
  assert.equal(dnsCalls, 1);
  assert.ok(signals.every((signal) => signal.aborted));
});

test("ends a hanging DNS lookup at the one-second deadline", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  let cancelCalls = 0;
  const { lookup } = setup({ resolver: {
    reverse: async () => new Promise(() => {}),
    cancel() { cancelCalls += 1; },
  } });
  const result = lookup(ip);
  // Let the range-fetch promises settle before advancing the overall deadline.
  await new Promise((resolve) => setImmediate(resolve));
  context.mock.timers.tick(1_000);
  assert.equal(await result, null);
  assert.equal(cancelCalls, 1);
});

test("bounds transient IP cache size and avoids work for invalid input", async () => {
  const { lookup, fetches, dnsCalls } = setup();
  assert.equal(await lookup("not an IP"), null);
  assert.deepEqual(fetches, []);
  for (let i = 0; i < 257; i += 1) await lookup("2001:db8::" + i.toString(16));
  const count = dnsCalls.length;
  await lookup("2001:db8::0");
  assert.equal(dnsCalls.length, count + 1);
});

test("does not start another DNS query after cancelling an expired lookup", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  const queried = [];
  let rejectForward;
  const { lookup } = setup({ resolver: {
    reverse: async () => ["first.googlebot.com", "second.googlebot.com"],
    resolve4: (hostname) => {
      queried.push(hostname);
      return new Promise((_resolve, reject) => { rejectForward = reject; });
    },
    cancel() { rejectForward(new Error("Cancelled")); },
  } });
  const result = lookup(ip);
  await new Promise((resolve) => setImmediate(resolve));
  context.mock.timers.tick(1_000);
  assert.equal(await result, null);
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(queried, ["first.googlebot.com"]);
});

test("refreshing an expired entry does not evict an unrelated cached identity", async () => {
  let time = 0;
  const reverseQueries = [];
  const { lookup } = setup({
    now: () => time,
    resolver: {
      reverse: async (address) => {
        reverseQueries.push(address);
        return address === ip ? ["crawl.googlebot.com"] : [];
      },
      resolve4: async () => [ip],
    },
  });
  assert.equal((await lookup(ip))?.botName, "Google crawler");
  for (let i = 0; i < 255; i += 1) await lookup("2001:db8::" + i.toString(16));

  time = 60_001;
  await lookup("2001:db8::fe");
  assert.equal((await lookup(ip))?.botName, "Google crawler");
  assert.equal(reverseQueries.filter((address) => address === ip).length, 1);
});
