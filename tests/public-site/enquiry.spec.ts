import { expect, test } from "playwright/test";

test.describe("progressive enhancement", () => {
  test.use({ javaScriptEnabled: false });

  test("exposes a usable native enquiry form without JavaScript", async ({ page }) => {
    await page.goto("/contact");

    const form = page.getByRole("form", { name: "Enquiry" });

    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("action", "/api/enquiry");
    await expect(form).toHaveAttribute("method", "post");
  });
});

test.describe("enquiry form", () => {
  test("preserves conditional payload values and success focus", async ({ page }) => {
    let submittedMethod = "";
    let submittedPayload: Record<string, string> | undefined;

    await page.clock.setFixedTime("2026-01-15T04:00:00.000Z");
    await page.route("**/api/enquiry", async (route) => {
      submittedMethod = route.request().method();
      submittedPayload = route.request().postDataJSON() as Record<string, string>;
      await route.fulfill({ body: JSON.stringify({ ok: true }), contentType: "application/json", status: 200 });
    });
    await page.goto("/contact");

    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("Request a consult").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your message").fill("I would like an initial consult.");
    await form.getByLabel("Availability").fill("Weekday afternoons");
    await form.getByLabel("Timezone").selectOption("AEDT");
    await form.getByRole("button", { name: "Request the 15-minute consult" }).click();

    const success = page.getByRole("status");
    await expect(success).toBeVisible();
    await expect(success).toBeFocused();
    expect(submittedMethod).toBe("POST");
    expect(submittedPayload).toEqual({
      analyticsPageViewId: "",
      analyticsVisitId: "",
      availability: "Weekday afternoons",
      bookingType: "consult",
      email: "alex@example.com",
      enquiryType: "booking",
      message: "I would like an initial consult.",
      name: "Alex Person",
      state: "",
      timing: "",
      timeZone: "AEDT",
      website: "",
    });
  });

  test("shows a safe public error without technical details", async ({ page }) => {
    await page.route("**/api/enquiry", async (route) => {
      await route.fulfill({
        body: JSON.stringify({
          details: "Missing Vercel env vars: RESEND_API_KEY.",
          error: "Email delivery is not configured yet.",
        }),
        contentType: "application/json",
        status: 502,
      });
    });
    await page.goto("/contact");

    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await form.getByRole("button", { name: "Send enquiry" }).click();

    const alert = form.getByRole("alert");
    await expect(alert).toContainText("joel@vivecounselling.com.au");
    await expect(alert).not.toContainText("RESEND_API_KEY");
    await expect(alert).not.toContainText("Technical detail");
  });
});
