export function parsePaidVisitCostCents(value: string): number | null {
  const amount = value.trim();
  if (!/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(amount)) return null;

  const [dollars, fraction = ""] = amount.split(".");
  // Parse whole cents directly so decimal amounts never round through floating-point dollars.
  const cents = Number(`${dollars || "0"}${fraction.padEnd(2, "0")}`);
  return Number.isSafeInteger(cents) ? cents : null;
}

export function formatPaidVisitCostInput(cents: number): string {
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

export function adjustPaidVisitCostCents(cents: number, changeInCents: -1 | 1): number {
  return Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, cents + changeInCents));
}
