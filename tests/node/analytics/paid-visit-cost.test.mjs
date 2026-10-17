import assert from "node:assert/strict";
import { test } from "node:test";
import {
  adjustPaidVisitCostCents,
  formatPaidVisitCostInput,
  maxPaidVisitCostCents,
  parsePaidVisitCostCents,
} from "../../../src/pages/analytics/paidVisitCost.ts";

test("typed paid-visit costs preserve exact cents and normalize decimal input", () => {
  for (const [input, cents, formatted] of [
    ["3.10", 310, "3.10"],
    ["1.13", 113, "1.13"],
    ["12", 1200, "12.00"],
    ["3.", 300, "3.00"],
    [".5", 50, "0.50"],
    [" 003.1 ", 310, "3.10"],
    ["0", 0, "0.00"],
    ["90071992547409.91", maxPaidVisitCostCents, "90071992547409.91"],
  ]) {
    assert.equal(parsePaidVisitCostCents(input), cents, input);
    assert.equal(formatPaidVisitCostInput(cents), formatted, input);
  }
});

test("incomplete or invalid costs cannot overwrite the applied amount", () => {
  for (const input of ["", " ", ".", "-1", "-0.01", "3.101", "3.1.0", "1e2", "NaN", "Infinity", "3abc", "90071992547409.92"]) {
    assert.equal(parsePaidVisitCostCents(input), null, input);
  }
});

test("one-cent adjustments remain exact and stay within safe nonnegative cents", () => {
  assert.equal(adjustPaidVisitCostCents(310, 1), 311);
  assert.equal(adjustPaidVisitCostCents(310, -1), 309);
  assert.equal(adjustPaidVisitCostCents(1, -1), 0);
  assert.equal(adjustPaidVisitCostCents(0, -1), 0);
  assert.equal(adjustPaidVisitCostCents(0, 1), 1);
  assert.equal(adjustPaidVisitCostCents(maxPaidVisitCostCents, 1), maxPaidVisitCostCents);
});
