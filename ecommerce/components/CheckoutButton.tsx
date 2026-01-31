'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { MouseEvent } from 'react';

const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutButtonProps {
  items: Item[];
}

export default function CheckoutButton({ items }: CheckoutButtonProps) {
  const handleCheckout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // 1. Call your API route to create a Stripe checkout session
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data: { url?: string; id?: string } = await response.json();

      // 2. Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // If using session URL
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // If using session ID
      if (data.id) {
        const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
        if (error) console.error(error.message);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Checkout
    </button>
  );
}
