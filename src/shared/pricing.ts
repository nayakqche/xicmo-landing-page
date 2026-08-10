/**
 * Single source of truth for Max plan pricing and credit allowance.
 *
 * Razorpay plans are immutable: changing the amount here does NOT reprice
 * existing subscribers. Run `npm run razorpay:create-plan` to mint a new
 * plan id and point RAZORPAY_PLAN_MAX_MONTHLY at it — old subscriptions
 * keep billing against the old plan (grandfathered).
 */
export const MAX_PLAN_PRICE_USD = 60;
export const MAX_PLAN_AMOUNT_CENTS = MAX_PLAN_PRICE_USD * 100;
export const MAX_PLAN_PRICE_LABEL = `$${MAX_PLAN_PRICE_USD}`;
export const MAX_PLAN_MONTHLY_CREDITS = 2000;
export const MAX_PLAN_CREDITS_LABEL = MAX_PLAN_MONTHLY_CREDITS.toLocaleString("en-US");

/** One-time credit grant on signup (Free plan) — enough to evaluate the product. */
export const FREE_SIGNUP_CREDITS = 50;
export const FREE_SIGNUP_CREDITS_LABEL = FREE_SIGNUP_CREDITS.toLocaleString("en-US");

/* ------------------------------------------------------------------ */
/* Credit top-up packs (one-time Razorpay orders, Max subscribers only) */
/* ------------------------------------------------------------------ */

export type CreditPack = {
  /** Stable key stored in Razorpay order notes — never rename existing keys. */
  key: string;
  label: string;
  /** Display credits granted (1 credit = $0.01 of model cost ≈ 500 tokens). */
  credits: number;
  amountUsdCents: number;
  bonusLabel?: string;
};

/**
 * Priced at 2x underlying cost (1 credit = $0.01 of real model spend), so a
 * $10 pack of 500 credits costs $5 to serve. The earlier 1,000/2,000/6,000
 * sizing sold credits at cost — and the top tier below it, losing $10 on every
 * $50 sale. Packs stay cheaper per credit than the $60/2,000 plan, which is
 * fine: buying one requires an active Max subscription anyway.
 */
export const CREDIT_PACKS: CreditPack[] = [
  { key: "cp10", label: "500 credits", credits: 500, amountUsdCents: 1000 },
  { key: "cp20", label: "1,000 credits", credits: 1000, amountUsdCents: 2000 },
  {
    key: "cp50",
    label: "3,000 credits",
    credits: 3000,
    amountUsdCents: 5000,
    bonusLabel: "+20% bonus",
  },
];

export function getCreditPack(key: string): CreditPack | undefined {
  return CREDIT_PACKS.find((p) => p.key === key);
}
