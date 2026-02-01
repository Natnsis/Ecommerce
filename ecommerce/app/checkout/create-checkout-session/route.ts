import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product?.name || 'Product',
          // optional: images: item.product?.url ? [item.product.url] : undefined,
        },
        unit_amount: Math.round(item.sum * 100), // sum is already total for that line? → adjust if sum = price * qty
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
