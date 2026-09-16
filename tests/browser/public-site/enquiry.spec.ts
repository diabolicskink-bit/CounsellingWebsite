import { expect, test, type Locator } from "playwright/test";

async function completeQuestionEnquiry(form: Locator) {
  await form.locator('[name="name"]').fill("Alex Person");
  await form.locator('[name="email"]').fill("alex@example.com");
  await form.locator('[name="message"]').fill("Hello");
  await form.locator('[name="contactPath"]').selectOption("question");
}

test.describe("progressive enhancement", () => {
  test.use({ javaScriptEnabled: false });

  test("submits a consult through the native form without JavaScript", async ({ page }) => {
    let submittedMethod = "";
    await page.route("**/api/enquiry", async (route) => {
      submittedMethod = route.request().method();
      await route.fulfill({
        body: "<!doctype html><html><body><h1>Native submission received</h1></body></html>",
        contentType: "text/html",
        status: 200,
      });
    });
    await page.goto("/contact");

    const form = page.getByRole("form");
    await form.locator('[name="name"]').fill("Alex Person");
    await form.locator('[name="email"]').fill("alex@example.com");
    await form.locator('[name="message"]').fill("I would like an initial consult.");
    await form.locator('[name="contactPath"]').selectOption("consult");
    await form.locator('[name="availability"]').fill("Weekday afternoons");
    await form.locator('[name="mobile"]').fill("0412 345 678");
    await form.locator('[name="timeZone"]').selectOption("AWST");
    await form.locator('button[type="submit"]').click();

    await expect(page.getByRole("heading", { name: "Native submission received" })).toBeVisible();
    expect(submittedMethod).toBe("POST");
  });
});

test.describe("enquiry form", () => {
  test("prevents duplicate sends and focuses a successful response", async ({ page }) => {
    let releaseRequest: (() => void) | undefined;
    let requestCount = 0;
    await page.route("**/api/enquiry", async (route) => {
      requestCount += 1;
      await new Promise<void>((resolve) => { releaseRequest = resolve; });
      await route.fulfill({ body: JSON.stringify({ ok: true }), contentType: "application/json", status: 200 });
    });
    await page.goto("/contact");

    const form = page.getByRole("form");
    await completeQuestionEnquiry(form);
    await form.locator('button[type="submit"]').click();
    await form.evaluate((element) => (element as HTMLFormElement).requestSubmit());
    await expect.poll(() => requestCount).toBe(1);
    releaseRequest?.();

    const success = page.getByRole("status");
    await expect(success).toBeVisible();
    await expect(success).toBeFocused();
  });

  test("shows a safe public error without technical details", async ({ page }) => {
    await page.route("**/api/enquiry", async (route) => route.fulfill({
      body: JSON.stringify({ details: "Missing Vercel env vars: RESEND_API_KEY.", error: "Email delivery is not configured yet." }),
      contentType: "application/json",
      status: 502,
    }));
    await page.goto("/contact");

    const form = page.getByRole("form");
    await completeQuestionEnquiry(form);
    await form.locator('button[type="submit"]').click();

    const alert = form.getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).not.toContainText("RESEND_API_KEY");
  });
});
