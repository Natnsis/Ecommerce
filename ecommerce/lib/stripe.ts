import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_STRIPE_SECRET_KEY!,
  {
    apiVersion: "2023-10-16" as any,
    typescript: true,
  }
);
