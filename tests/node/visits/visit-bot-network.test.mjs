import assert from "node:assert/strict";
import { test } from "node:test";
import { createBotIpLookup } from "../../../src/server/visits/bot-network.ts";

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

test("matches crawler ranges in IPv4, IPv6 and mapped form", async () => {
  for (const [source, name] of [
    ["/bingbot.json", "Bingbot"],
    ["/searchbot.json", "OpenAI bot"],
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

test("reuses provider ranges and refreshes changed identities after expiry", async () => {
  let time = 0;
  const feeds = { "/bots.json": fixture(["203.0.113.0/24"]) };
  const { lookup, fetches } = setup({ feeds, now: () => time });

  assert.equal((await lookup(ip))?.botName, "Anthropic bot");
  const initialFetches = fetches.length;
  feeds["/bots.json"] = fixture(["192.0.2.0/24"]);
  assert.equal((await lookup(ip))?.botName, "Anthropic bot");
  assert.equal((await lookup("203.0.113.10"))?.botName, "Anthropic bot");
  assert.equal(fetches.length, initialFetches);

  time += 48 * 60 * 60 * 1_000;
  assert.equal(await lookup(ip), null);
});

test("retries unsuccessful lookups after a short cache interval", async () => {
  let time = 0;
  const { lookup, fetches, dnsCalls } = setup({ now: () => time });
  assert.equal(await lookup(ip), null);
  const count = fetches.length;
  await lookup(ip);
  assert.equal(dnsCalls.length, 1);
  time += 5 * 60 * 1_000;
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
  context.mock.timers.tick(900);
  assert.equal((await result)?.botName, "Google crawler");
  assert.equal(dnsCalls, 1);
  assert.ok(signals.every((signal) => signal.aborted));
});

test("stops DNS work at the one-second deadline without starting another query", async (context) => {
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
