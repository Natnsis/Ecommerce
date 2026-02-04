import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  getCartById,
  deleteAllCartByUser,
} from "@/app/conrollers/cart.controller";
import { reduceQuantityOfProduct } from "@/app/conrollers/product.controller";
import { addTransaction } from "@/app/conrollers/transaction.controller";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId)
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 },
      );

    const session = (await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    })) as any;

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 },
      );
    }

    const totalAmount =
      typeof session.amount_total === "number"
        ? session.amount_total / 100
        : null;
    const cartIds = session.metadata?.cartIds?.split(",") ?? [];
    const userId = session.metadata?.user_id ?? null;

    if (!userId) {
      return NextResponse.json(
        { error: "No user id in session metadata" },
        { status: 400 },
      );
    }

    const carts = await getCartById(String(userId));

    if (Array.isArray(carts) && carts.length > 0) {
      const itemsToReduce = carts.map((c: any) => ({
        product_id: c.product_id,
        quantity: c.quantity,
      }));
      try {
        await reduceQuantityOfProduct(itemsToReduce);
      } catch (err) {
        console.error("Failed to reduce product quantities", err);
      }
    }

    try {
      if (Array.isArray(carts) && carts.length > 0) {
        for (const c of carts) {
          const amount =
            typeof c.sum === "number" ? c.sum : c.sum ? Number(c.sum) : null;
          await addTransaction(String(userId), amount, c.product_id);
        }
      } else if (totalAmount !== null) {
        await addTransaction(String(userId), totalAmount, null);
      }
    } catch (err) {
      console.error("Failed to record transaction(s)", err);
    }

    try {
      await deleteAllCartByUser(String(userId));
    } catch (err) {
      console.error("Failed to clear cart for user", userId, err);
    }

    return NextResponse.json({
      ok: true,
      debug: {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        line_items: session.line_items?.data.map((li: any) => ({
          description: li.description,
          quantity: li.quantity,
          unit_amount: li.price?.unit_amount,
          total: li.amount_total,
        })),
        metadata: session.metadata,
      },
    });
  } catch (err: any) {
    console.error("Finalize-payment error", err);
    return NextResponse.json({ error: "Finalize failed" }, { status: 500 });
  }
}
