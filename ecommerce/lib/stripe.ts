import Stripe from 'stripe';

if (!process.env.SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in .env.local');
}

export const stripe = new Stripe(process.env.SECRET_KEY, {
  apiVersion: '2025-12-15.clover' as any,
});
