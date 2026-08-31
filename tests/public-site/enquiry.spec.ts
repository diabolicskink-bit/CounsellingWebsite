import { expect, test } from "playwright/test";

test.describe("progressive enhancement", () => {
  test.use({ javaScriptEnabled: false });

  test("submits a consult through the native form without JavaScript", async ({ page }) => {
    let submittedMethod = "";
    let submittedPayload: URLSearchParams | undefined;

    await page.route("**/api/enquiry", async (route) => {
      submittedMethod = route.request().method();
      submittedPayload = new URLSearchParams(route.request().postData() ?? "");
      await route.fulfill({
        body: "<!doctype html><html><body><h1>Native submission received</h1></body></html>",
        contentType: "text/html",
        status: 200,
      });
    });
    await page.goto("/contact");

    const form = page.getByRole("form", { name: "Your enquiry" });

    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("action", "/api/enquiry");
    await expect(form).toHaveAttribute("method", "post");
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your message").fill("I would like an initial consult.");
    await form.getByLabel("How would you like to start?").selectOption("consult");
    await form.getByLabel("Mobile number (required for a consult)").fill("0412 345 678");
    await form
      .getByLabel("Availability (required for an appointment or consult)")
      .fill("Weekday afternoons");
    await form
      .getByLabel("Timezone (required for an appointment or consult)")
      .selectOption("AWST");
    await form.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.getByRole("heading", { name: "Native submission received" })).toBeVisible();
    expect(submittedMethod).toBe("POST");
    expect(Object.fromEntries(submittedPayload?.entries() ?? [])).toMatchObject({
      availability: "Weekday afternoons",
      contactPath: "consult",
      email: "alex@example.com",
      enquiryType: "",
      message: "I would like an initial consult.",
      mobile: "0412 345 678",
      name: "Alex Person",
      timeZone: "AWST",
      website: "",
    });
  });
});

test.describe("enquiry form", () => {
  test("preserves consult details, prevents duplicate sends, and focuses success", async ({
    page,
  }) => {
    let releaseRequest: (() => void) | undefined;
    let requestCount = 0;
    let submittedMethod = "";
    let submittedPayload: Record<string, string> | undefined;

    await page.clock.setFixedTime("2026-01-15T04:00:00.000Z");
    await page.route("**/api/enquiry", async (route) => {
      requestCount += 1;
      submittedMethod = route.request().method();
      submittedPayload = route.request().postDataJSON() as Record<string, string>;
      await new Promise<void>((resolve) => {
        releaseRequest = resolve;
      });
      await route.fulfill({
        body: JSON.stringify({ ok: true }),
        contentType: "application/json",
        status: 200,
      });
    });
    await page.goto("/contact");

    const form = page.getByRole("form", { name: "Your enquiry" });
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your message").fill("I would like an initial consult.");
    await form.getByLabel("How would you like to start?").selectOption("consult");
    await form.getByLabel("Mobile number").fill("0412 345 678");
    await form.getByLabel("Availability").fill("Weekday afternoons");
    await form.getByLabel("Timezone").selectOption("AEDT");
    await form.getByRole("button", { name: "Request the 15-minute consult" }).click();

    await expect(form).toHaveAttribute("aria-busy", "true");
    await expect(form.getByRole("button", { name: "Sending..." })).toBeDisabled();
    await form.evaluate((element) => (element as HTMLFormElement).requestSubmit());
    await expect.poll(() => requestCount).toBe(1);
    releaseRequest?.();

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
      mobile: "0412 345 678",
      name: "Alex Person",
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

    const form = page.getByRole("form", { name: "Your enquiry" });
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your message").fill("Hello");
    await form.getByLabel("How would you like to start?").selectOption("question");
    await form.getByRole("button", { name: "Send message" }).click();

    const alert = form.getByRole("alert");
    await expect(alert).toContainText("joel@vivecounselling.com.au");
    await expect(alert).not.toContainText("RESEND_API_KEY");
    await expect(alert).not.toContainText("Technical detail");
  });
});
