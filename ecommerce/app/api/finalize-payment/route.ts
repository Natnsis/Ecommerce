import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const totalAmount = session.amount_total! / 100;
    const cartIds = session.metadata?.cartIds?.split(",") ?? [];
    const userId = session.metadata?.user_id;
    /*
        if (await transactionExists(session.id)) {
          return NextResponse.json({ ok: true });
        }
    
        await createTransaction({
          userId,
          amount: totalAmount,
          stripeSessionId: session.id,
        });
    
        await deleteUserCarts(userId, cartIds);
        await updateStockFromLineItems(session.line_items!.data);
    */

    return NextResponse.json({
      ok: true,
      debug: {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        line_items: session.line_items?.data.map(li => ({
          description: li.description,
          quantity: li.quantity,
          unit_amount: li.price?.unit_amount,
          total: li.amount_total,
        })),
        metadata: session.metadata,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Finalize failed" }, { status: 500 });
  }
}
