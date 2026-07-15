import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch({ channel: "chrome" });
const results = [];

for (const width of [390, 820, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("http://127.0.0.1:4177/inclusion/lgbtqia", { waitUntil: "networkidle" });
  const section = page.locator(".lgbtqia-page__relevance");
  await section.screenshot({ path: `codex-lgbtqia-relevance-${width}.png` });

  const metrics = await section.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const field = element.querySelector(".lgbtqia-page__relevance-field")?.getBoundingClientRect();

    return {
      sectionHeight: Math.round(rect.height),
      fieldHeight: field ? Math.round(field.height) : null,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyTextLength: document.body.innerText.trim().length,
      overlay: Boolean(
        document.querySelector("vite-error-overlay, .vite-error-overlay, #webpack-dev-server-client-overlay"),
      ),
    };
  });
  const axe = await new AxeBuilder({ page }).include(".lgbtqia-page__relevance").analyze();
  results.push({
    width,
    metrics,
    consoleErrors: errors,
    axeViolations: axe.violations.map((violation) => violation.id),
  });
  await context.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
