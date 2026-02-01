import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  sum: number;
};

export async function POST(req: Request) {
  try {
    const { carts }: { carts: CartItem[] } = await req.json();

    if (!carts || carts.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const amount = carts.reduce((total, item) => {
      return total + item.sum;
    }, 0);

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        cartIds: carts.map(c => c.id).join(","),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Stripe error" },
      { status: 500 }
    );
  }
}
