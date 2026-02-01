'use client';

import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const fetchClientSecret = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // items: ... (you'd need to pass cart somehow – see below)
      }),
    });

    const { clientSecret } = await res.json();
    return clientSecret;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
