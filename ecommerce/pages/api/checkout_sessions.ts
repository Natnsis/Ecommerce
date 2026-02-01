import type { NextApiRequest, NextApiResponse } from "next";

function getStripeClient() {
  const key = process.env.SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  // require here to avoid top-level import side-effects when env is missing
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require("stripe") as typeof import("stripe");
  return new Stripe(key, { apiVersion: "2025-12-15" as any });
}

type Item = {
  name?: string;
  price?: number;
  quantity: number;
  sum?: number;
  user_id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { items } = req.body as { items: Item[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Try to capture user id from items or body
    const userId = items[0]?.user_id || (req.body.userId as string) || "";

    const line_items = items.map((item: Item) => {
      const qty = item.quantity || 1;
      let unitAmountCents = 0;

      if (typeof item.price === "number") {
        unitAmountCents = Math.round(item.price * 100);
      } else if (typeof item.sum === "number") {
        unitAmountCents = Math.round((item.sum / Math.max(qty, 1)) * 100);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.name || "Product" },
          unit_amount: unitAmountCents,
        },
        quantity: qty,
      };
    });

    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      metadata: userId ? { user_id: userId } : undefined,
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || req.headers.origin
      }/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || req.headers.origin
      }/dashboard/cart`,
    });

    return res.status(200).json({ url: session.url, id: session.id });
  } catch (error: any) {
    console.error("create checkout session error", error);
    return res.status(500).json({ error: error.message || "Internal error" });
  }
}
