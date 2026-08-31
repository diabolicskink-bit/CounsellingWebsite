import { expect, test } from "playwright/test";

test("publishes the privacy policy with client-system and complaint details", async ({ page }) => {
  await page.goto("/privacy-policy");

  const main = page.locator("main.privacy-policy-page");

  await expect(main.getByRole("heading", { level: 1 })).toHaveText("Privacy policy.");
  await expect(main.locator("time")).toHaveAttribute("datetime", "2026-08-31");
  await expect(main.getByRole("navigation", { name: "Privacy policy sections" }).getByRole("link"))
    .toHaveCount(8);
  await expect(main).toContainText("Most client information and counselling records are kept in Zanda");
  await expect(main).toContainText("does not currently record telehealth sessions");
  await expect(main).toContainText("Zoho Mail service data is stored in Australia");
  await expect(main).toContainText("stored visit records are deleted after 12 months");
  await expect(main).toContainText("not your name, email address or message text");
  await expect(main.getByRole("link", { name: "Zanda" }))
    .toHaveAttribute("href", "https://zandahealth.com/privacy-policy/");
  await expect(main.getByRole("link", { name: "Zoom" }))
    .toHaveAttribute("href", "https://www.zoom.com/en/trust/privacy/privacy-statement/");
  await expect(
    main.getByRole("link", {
      name: "lodge a privacy complaint with the Office of the Australian Information Commissioner",
    }),
  ).toHaveAttribute(
    "href",
    "https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us",
  );
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Privacy policy" }))
    .toHaveAttribute("href", "/privacy-policy");
});

test("puts the privacy policy beside the enquiry action", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("General enquiry").check();

  const formActions = page.getByRole("form", { name: "Enquiry" }).locator(
    ".contact-page__form-actions",
  );

  await expect(formActions.getByRole("link", { name: "privacy policy" }))
    .toHaveAttribute("href", "/privacy-policy");
  await expect(formActions.getByRole("button", { name: "Send enquiry" })).toBeVisible();
});
