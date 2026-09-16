import { Resolver } from "node:dns/promises";
import { BlockList, isIP } from "node:net";

type BotIdentity = { botName: string; botCategory: string | null };
type Cached<T> = { expiresAt: number; value: Promise<T> };

const lookupBudgetMs = 1_000;
const rangeFetchBudgetMs = 650;
const rangeTtlMs = 24 * 60 * 60 * 1_000;
const identityTtlMs = 60 * 60 * 1_000;
const failureTtlMs = 60 * 1_000;
const maxCachedIps = 256;

// Only crawler-specific ranges: cloud-provider address space cannot identify a bot.
// Sources: developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests
// bing.com/webmasters/help/how-to-verify-bingbot-3905dc26
// developers.openai.com/api/docs/bots
// support.claude.com/en/articles/8896518
// docs.perplexity.ai/docs/resources/perplexity-crawlers
const providers = [
  {
    botName: "Google crawler", botCategory: "Search bot",
    urls: [
      "https://developers.google.com/static/crawling/ipranges/common-crawlers.json",
      "https://developers.google.com/static/crawling/ipranges/special-crawlers.json",
    ],
  },
  {
    botName: "Bingbot", botCategory: "Search bot",
    urls: ["https://www.bing.com/toolbox/bingbot.json"],
  },
  {
    botName: "OpenAI bot", botCategory: "AI bot",
    urls: [
      "https://openai.com/searchbot.json",
      "https://openai.com/gptbot.json",
      "https://openai.com/chatgpt-user.json",
      "https://openai.com/adsbot.json",
    ],
  },
  {
    botName: "Anthropic bot", botCategory: "AI bot",
    urls: ["https://claude.com/crawling/bots.json"],
  },
  {
    botName: "Perplexity bot", botCategory: "AI bot",
    urls: [
      "https://www.perplexity.com/perplexitybot.json",
      "https://www.perplexity.com/perplexity-user.json",
    ],
  },
];

function addressFamily(ip: string) {
  return isIP(ip) === 4 ? "ipv4" : "ipv6";
}

function parseRanges(value: unknown) {
  if (!value || typeof value !== "object" || !("prefixes" in value)
    || !Array.isArray(value.prefixes) || !value.prefixes.length
    || value.prefixes.length > 10_000) {
    throw new Error("Invalid crawler ranges");
  }

  const ranges = new BlockList();
  for (const prefix of value.prefixes) {
    if (!prefix || typeof prefix !== "object") throw new Error("Invalid crawler prefix");
    const cidrs = [prefix.ipv4Prefix, prefix.ipv6Prefix].filter((cidr) => cidr !== undefined);
    if (!cidrs.length) throw new Error("Missing crawler prefix");
    for (const cidr of cidrs) {
      if (typeof cidr !== "string") throw new Error("Invalid crawler prefix");
      const [address, bits, extra] = cidr.split("/");
      const family = isIP(address);
      const length = Number(bits);
      if (!family || !bits || !/^\d+$/.test(bits) || extra !== undefined
        || length < 1 || length > (family === 4 ? 32 : 128)) {
        throw new Error("Invalid crawler prefix");
      }
      ranges.addSubnet(address, length, addressFamily(address));
    }
  }
  return ranges;
}

async function withinBudget<T>(
  operation: Promise<T>,
  milliseconds: number,
  cancel: () => void,
): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation.catch(() => null),
      new Promise<null>((resolve) => {
        timer = setTimeout(() => {
          cancel();
          resolve(null);
        }, milliseconds);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

function dnsIdentity(hostname: string): BotIdentity | null {
  if (hostname.endsWith(".googlebot.com")
    || /^rate-limited-proxy-[\da-f-]+\.google\.com$/.test(hostname)) {
    return { botName: "Google crawler", botCategory: "Search bot" };
  }
  if (hostname.endsWith(".search.msn.com")) {
    return { botName: "Bingbot", botCategory: "Search bot" };
  }
  return null;
}

export function createBotIpLookup({
  fetchRanges = fetch,
  createResolver = () => new Resolver({ timeout: 300, tries: 1 }),
  now = Date.now,
} = {}) {
  const rangeCache = new Map<string, Cached<BlockList | null>>();
  const identityCache = new Map<string, Cached<BotIdentity | null>>();

  function loadRanges(url: string) {
    const cached = rangeCache.get(url);
    if (cached && cached.expiresAt > now()) return cached.value;

    const controller = new AbortController();
    const value = withinBudget((async () => {
      const response = await fetchRanges(url, { signal: controller.signal });
      if (!response.ok) return null;
      return parseRanges(await response.json());
    })(), rangeFetchBudgetMs, () => controller.abort());
    const entry = { expiresAt: now() + rangeTtlMs, value };
    rangeCache.set(url, entry);
    void value.then((ranges) => {
      entry.expiresAt = now() + (ranges ? rangeTtlMs : failureTtlMs);
    });
    return value;
  }

  async function fromRanges(ip: string): Promise<BotIdentity | null> {
    const matches = await Promise.all(providers.map(async (provider) => {
      const lists = await Promise.all(provider.urls.map(loadRanges));
      return lists.some((ranges) => ranges?.check(ip, addressFamily(ip)))
        ? { botName: provider.botName, botCategory: provider.botCategory }
        : null;
    }));
    const identities = matches.filter((match) => match !== null);
    return identities.length === 1 ? identities[0] : null;
  }

  async function fromDns(
    ip: string,
    resolver: Resolver,
    hasTimedOut: () => boolean,
  ): Promise<BotIdentity | null> {
    const names = await resolver.reverse(ip);
    const originalAddress = new BlockList();
    originalAddress.addAddress(ip, addressFamily(ip));
    for (const name of names.slice(0, 5)) {
      if (hasTimedOut()) return null;
      const hostname = name.toLowerCase().replace(/\.$/, "");
      const identity = dnsIdentity(hostname);
      if (!identity) continue;

      const addresses = await Promise.allSettled([
        resolver.resolve4(hostname), resolver.resolve6(hostname),
      ]);
      if (addresses.some((result) => result.status === "fulfilled"
        && result.value.some((address) => isIP(address)
          && originalAddress.check(address, addressFamily(address))))) {
        return identity;
      }
    }
    return null;
  }

  return function identifyBotByIp(ip: string): Promise<BotIdentity | null> {
    if (!isIP(ip) || ip.includes("%")) return Promise.resolve(null);
    const cached = identityCache.get(ip);
    if (cached && cached.expiresAt > now()) return cached.value;

    const resolver = createResolver();
    let timedOut = false;
    const value = withinBudget((async () => {
      const identity = await fromRanges(ip);
      return identity ?? (timedOut ? null : await fromDns(ip, resolver, () => timedOut));
    })(), lookupBudgetMs, () => {
      timedOut = true;
      resolver.cancel();
    });
    const entry = { expiresAt: now() + identityTtlMs, value };
    // Replacing an expired entry must not evict another IP or retain its old position.
    identityCache.delete(ip);
    if (identityCache.size >= maxCachedIps) {
      identityCache.delete(identityCache.keys().next().value!);
    }
    identityCache.set(ip, entry);
    void value.then((identity) => {
      entry.expiresAt = now() + (identity ? identityTtlMs : failureTtlMs);
    });
    return value;
  };
}

export const identifyBotByIp = createBotIpLookup();
