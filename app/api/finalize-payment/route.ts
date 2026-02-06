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

    // Determine carts either by userId or by cartIds from session metadata
    let carts: any[] = [];

    if (userId) {
      carts = await getCartById(String(userId));
    } else if (Array.isArray(cartIds) && cartIds.length > 0) {
      // fetch cart rows by ids when user id is not provided
      // convert ids to numbers if they are strings
      const ids = cartIds
        .map((id: any) => (typeof id === "string" ? Number(id) : id))
        .filter(Boolean);
      try {
        const { data: fetched, error } = await (
          await import("@/lib/supabase/client")
        )
          .createClient()
          .from("cart")
          .select("*")
          .in("id", ids);
        if (error) {
          console.error("Failed to fetch carts by ids", error);
        } else {
          carts = fetched || [];
        }
      } catch (err) {
        console.error("Error fetching carts by ids", err);
      }
    }

    console.log(
      "Finalize: userId=",
      userId,
      "cartIds=",
      cartIds,
      "fetched carts count=",
      carts?.length,
    );
    if (Array.isArray(carts) && carts.length > 0)
      console.log("Sample cart row:", carts[0]);
    // reduce stock from cart items
    if (Array.isArray(carts) && carts.length > 0) {
      const itemsToReduce = carts.map((c: any) => ({
        product_id: Number(c.product_id),
        quantity: Number(c.quantity),
      }));
      try {
        await reduceQuantityOfProduct(itemsToReduce);
      } catch (err) {
        console.error("Failed to reduce product quantities", err);
      }
    }

    // record transaction(s) using product_id from cart rows
    try {
      if (Array.isArray(carts) && carts.length > 0) {
        for (const c of carts) {
          const amount =
            typeof c.sum === "number" ? c.sum : c.sum ? Number(c.sum) : null;
          const pid =
            c.product_id !== undefined && c.product_id !== null
              ? Number(c.product_id)
              : null;
          console.log(
            "Recording transaction for product_id=",
            pid,
            "amount=",
            amount,
          );
          await addTransaction(userId ? String(userId) : null, amount, pid);
        }
      } else if (totalAmount !== null) {
        await addTransaction(userId ? String(userId) : null, totalAmount, null);
      }
    } catch (err) {
      console.error("Failed to record transaction(s)", err);
    }

    // delete cart rows: prefer deleting by user if available, otherwise by ids
    try {
      let deleteResult: any = null;
      if (userId) {
        await deleteAllCartByUser(String(userId));
        deleteResult = { by: "user", userId };
      } else if (Array.isArray(cartIds) && cartIds.length > 0) {
        const ids = cartIds
          .map((id: any) => (typeof id === "string" ? Number(id) : id))
          .filter(Boolean);
        try {
          const clientModule = await import("@/lib/supabase/client");
          const client = clientModule.createClient();
          const { data: deleted, error } = await client
            .from("cart")
            .delete()
            .in("id", ids);
          if (error) {
            console.error("Failed to delete carts by ids", error);
            deleteResult = { by: "ids", ids, error };
          } else {
            deleteResult = {
              by: "ids",
              ids,
              deletedCount: (deleted || []).length,
            };
          }
        } catch (err) {
          console.error("Error deleting carts by ids", err);
          deleteResult = { by: "ids", ids: cartIds, error: String(err) };
        }
      }
      console.log("Finalize delete result:", deleteResult);
    } catch (err) {
      console.error("Failed to clear cart for user or ids", userId, err);
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
