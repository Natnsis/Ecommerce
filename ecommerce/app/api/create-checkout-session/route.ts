import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  sum: number;
  name: string;
};

export async function POST(req: Request) {
  try {
    const { carts }: { carts: CartItem[] } = await req.json();

    if (!carts || carts.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Map cart items to Stripe line items (unit_amount must be integer cents)
    const line_items = carts.map((item) => {
      const qty = Math.max(1, item.quantity || 1);
      // assume `sum` is a dollar amount for the line (e.g. 120.50), convert to cents per unit
      const unitAmountCents = Math.round((item.sum / qty) * 100);

      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: unitAmountCents,
        },
        quantity: qty,
      };
    });

    // validate unit_amount
    for (const li of line_items) {
      if (
        !li.price_data ||
        typeof li.price_data.unit_amount !== "number" ||
        li.price_data.unit_amount <= 0
      ) {
        console.error("Invalid line item unit_amount", li);
        return NextResponse.json(
          { error: "Invalid line item price; ensure sum is provided and > 0" },
          { status: 400 },
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/cart`,
      metadata: {
        cartIds: carts.map((c) => c.id).join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
