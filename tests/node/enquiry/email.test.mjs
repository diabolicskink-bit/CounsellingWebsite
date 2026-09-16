import assert from "node:assert/strict";
import { test } from "node:test";
import { buildEnquiryEmail } from "../../../src/server/enquiry/email.ts";
import { validateEnquiryPayload } from "../../../src/server/enquiry/validation.ts";

function buildEmail(payload) {
  const result = validateEnquiryPayload({
    email: "alex@example.com",
    enquiryType: "general",
    message: "I would like to enquire.",
    name: "Alex Person",
    ...payload,
  });

  assert.equal(result.type, "valid");

  return buildEnquiryEmail(result.enquiry, {
    from: "no-reply@vivecounselling.com.au",
    to: "inbox@example.com",
  });
}

test("preserves message line breaks while escaping visitor markup", () => {
  const message = 'First & second\r\n<script>\n"Quoted"\rLast line';
  const email = buildEmail({ message });

  assert.ok(email.text.endsWith(`Message:\n${message}`));
  assert.ok(email.html.includes(
    "First &amp; second<br />&lt;script&gt;<br />&quot;Quoted&quot;<br />Last line",
  ));
  assert.doesNotMatch(email.html, /<script>/);
});

test("preserves availability line breaks while escaping visitor markup", () => {
  const availability = 'Monday & Tuesday\r\n<br>Wednesday\n"Thursday"\rFriday';
  const email = buildEmail({
    availability,
    bookingType: "appointment",
    enquiryType: "booking",
    timeZone: "AWST",
  });

  assert.ok(email.text.includes(`Availability: ${availability}\n`));
  assert.ok(email.html.includes(
    "Monday &amp; Tuesday<br />&lt;br&gt;Wednesday<br />&quot;Thursday&quot;<br />Friday",
  ));
  assert.doesNotMatch(email.html, /<br>Wednesday/);
});
