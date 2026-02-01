"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { clientSecret: string };
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: searchParams.clientSecret }}
    >
      <CheckoutForm />
    </Elements>
  );
}
