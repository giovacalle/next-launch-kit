'use server';

import { redirect } from 'next/navigation';

import { authenticatedAction } from '@/lib/action-procedures';
import { stripe } from '@/lib/stripe';

import { z } from 'zod';

const schema = z.object({
  priceId: z.union([
    z.literal(process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTHLY),
    z.literal(process.env.NEXT_PUBLIC_STRIPE_BASIC_YEARLY),
    z.literal(process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY),
    z.literal(process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY)
  ])
});

export const createCheckoutSessionAction = authenticatedAction
  .createServerAction()
  .input(schema)
  .handler(async ({ input: { priceId }, ctx: { user } }) => {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.BASE_URL}/checkout/success`,
      cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
      payment_method_types: ['card'],
      customer_email: user.email,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      metadata: {
        userId: user.id
      }
    });

    redirect(stripeSession.url!);
  });
