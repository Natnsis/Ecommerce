import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

interface Item {
  name: string;
  price: number; // in USD
  quantity: number;
}

interface CheckoutRequestBody {
  items: Item[];
}

interface CheckoutResponse {
  url?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutResponse>
) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body as CheckoutRequestBody;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items provided' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // convert dollars to cents
          },
          quantity: item.quantity,
        })),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ url: session.url! });
    } catch (err) {
      console.error('Stripe checkout error:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
