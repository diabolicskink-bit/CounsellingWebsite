// Whole cents must stay exact integers.
export const maxPaidVisitCostCents = Number.MAX_SAFE_INTEGER;

// Dollars with up to two decimal places; accepts in-progress forms such as "3." and ".5".
const costInputPattern = /^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/;

export function parsePaidVisitCostCents(value: string): number | null {
  const amount = value.trim();
  if (!costInputPattern.test(amount)) return null;

  const [dollars, fraction = ""] = amount.split(".");
  // Parse whole cents directly so decimal amounts never round through floating-point dollars.
  const cents = Number(`${dollars}${fraction.padEnd(2, "0")}`);
  return cents <= maxPaidVisitCostCents ? cents : null;
}

export function formatPaidVisitCostInput(cents: number): string {
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

export function adjustPaidVisitCostCents(cents: number, changeInCents: -1 | 1): number {
  return Math.min(maxPaidVisitCostCents, Math.max(0, cents + changeInCents));
}
