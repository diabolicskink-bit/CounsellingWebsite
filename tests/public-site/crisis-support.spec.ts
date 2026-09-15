import { expect, test, type Locator } from "playwright/test";
import { readFileSync } from "node:fs";
import type { RouteMetadata } from "../../src/data/routeMetadata";

const routeMetadata = JSON.parse(
  readFileSync(new URL("../../src/data/routeMetadata.json", import.meta.url), "utf8"),
) as { routes: Record<string, RouteMetadata> };

async function expectVisibleFocusIndicator(link: Locator) {
  await link.focus();
  await expect(link).toBeFocused();

  const outline = await link.evaluate((element) => {
    const styles = getComputedStyle(element);

    return {
      style: styles.outlineStyle,
      width: Number.parseFloat(styles.outlineWidth),
    };
  });

  expect(outline.style).not.toBe("none");
  expect(outline.width).toBeGreaterThan(0);
}

test("exposes urgent actions and national and regional services", async ({ page }) => {
  await page.goto("/crisis-support");

  const main = page.locator("main.crisis-support-page");
  const nationalContactHrefs = [
    "tel:131114",
    "sms:0477131114",
    "tel:1300659467",
    "tel:139276",
  ] as const;
  const lastReviewed = routeMetadata.routes["/crisis-support"].lastReviewed;

  if (!lastReviewed) {
    throw new Error("Crisis Support metadata must include a lastReviewed date.");
  }

  await expect(main.getByRole("link", { name: "Call 000" })).toHaveAttribute("href", "tel:000");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(
    "Australian urgent mental health support services.",
  );
  await expect(main.getByRole("heading", { level: 2 })).toHaveText([
    "Immediate danger",
    "Which service should I contact?",
    "National urgent support services",
    "State and territory urgent support services",
  ]);
  await expect(main.getByRole("link", { name: "View national crisis services" })).toHaveAttribute(
    "href",
    "#national-crisis-support-title",
  );
  await expect(
    main.getByRole("link", { name: "View state and territory services" }),
  ).toHaveAttribute("href", "#state-crisis-support-title");
  await expect(main.locator(".crisis-support-page__national-service")).toHaveCount(3);
  await expect(main.locator(".crisis-support-page__state-service")).toHaveCount(8);
  await expect(
    main.getByRole("article", {
      name: "Australian Capital Territory Access Mental Health",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    main.getByRole("article", { name: "Tasmania Access Mental Health", exact: true }),
  ).toBeVisible();
  await expect(main.locator('.crisis-support-page__state-service a[href^="tel:"]')).toHaveCount(9);
  for (const href of nationalContactHrefs) {
    await expect(main.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
  await expect(main.getByRole("link", { name: "Find your local service" })).toHaveAttribute(
    "href",
    "https://vahi.vic.gov.au/mental-health-services",
  );
  await expect(main.locator(".crisis-support-page__information-note time")).toHaveAttribute(
    "datetime",
    lastReviewed,
  );
  await expect(main.locator(".crisis-support-page__information-note")).toContainText(
    "Published by Vive Counselling",
  );
  await expect(main.locator(".crisis-support-page__information-note")).toContainText(
    "checked against the official sources linked on this page",
  );
});

test("keeps keyboard focus visible and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/crisis-support");

  const main = page.getByRole("main");

  await expectVisibleFocusIndicator(main.getByRole("link", { name: "Call 000" }));
  await expectVisibleFocusIndicator(main.getByRole("link", { name: "Lifeline" }));
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("aligns state and territory contact numbers consistently", async ({ page }) => {
  await page.setViewportSize({ width: 602, height: 700 });
  await page.goto("/crisis-support");
  await page.evaluate(() => document.fonts.ready);

  const numberOffsets = await page
    .locator(
      ".crisis-support-page__state-service .crisis-support-page__contact-number",
    )
    .evaluateAll((numbers) =>
      numbers.map((number) => {
        const action = number.closest(".crisis-support-page__contact-action");

        if (!action) {
          throw new Error("State contact number is missing its action link.");
        }

        return number.getBoundingClientRect().left - action.getBoundingClientRect().left;
      }),
    );

  expect(Math.max(...numberOffsets) - Math.min(...numberOffsets)).toBeLessThan(0.5);
});

for (const width of [320, 820, 1060]) {
  test(`keeps enlarged regional phone text inside its action at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/crisis-support");
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#crisis-wa").scrollIntoViewIfNeeded();

    const contacts = await page
      .locator("#crisis-wa .crisis-support-page__contact-action")
      .evaluateAll((links) =>
        links.map((link) => {
          const icon = link.querySelector("svg");
          const number = link.querySelector(".crisis-support-page__contact-number");

          if (!icon || !number) {
            throw new Error("Contact action is missing its icon or phone number.");
          }

          return {
            name: link.textContent ?? "Contact number",
            iconRight: icon.getBoundingClientRect().right,
            numberLeft: number.getBoundingClientRect().left,
            numberRight: number.getBoundingClientRect().right,
            linkRight: link.getBoundingClientRect().right,
          };
        }),
      );

    expect(contacts).toHaveLength(3);
    for (const contact of contacts) {
      expect(contact.numberLeft, contact.name).toBeGreaterThan(contact.iconRight);
      expect(contact.numberRight, contact.name).toBeLessThan(contact.linkRight);
    }
  });
}
