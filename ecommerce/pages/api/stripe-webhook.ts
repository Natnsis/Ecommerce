import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { deleteAllCartByUser } from "@/app/conrollers/cart.controller";

function getStripeClient() {
  const key = process.env.SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require("stripe") as typeof import("stripe");
  return new Stripe(key, { apiVersion: "2025-12-15" as any });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"] as string | undefined;
  if (!sig) return res.status(400).send("Missing stripe-signature header");

  try {
    const buf = await buffer(req as any);
    const raw = buf.toString("utf8");

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return res.status(500).end("Webhook secret not configured");
    }

    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      // user id should be set on session.metadata.user_id when creating the session
      const userId =
        session.metadata?.user_id || session.client_reference_id || null;

      if (userId) {
        try {
          await deleteAllCartByUser(String(userId));
          console.log(`Cleared cart for user: ${userId}`);
        } catch (err) {
          console.error("Failed to clear cart for user", userId, err);
        }
      } else {
        console.warn("No user id found on session metadata; cart not cleared");
      }
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error("Webhook handler error", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
