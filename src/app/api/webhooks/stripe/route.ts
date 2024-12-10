import { NextRequest, NextResponse } from 'next/server';

import type Stripe from 'stripe';

import { stripe } from '@/lib/stripe';

import {
  createSubscriptionUseCase,
  updateSubscriptionUseCase
} from '@/core/use-cases/subscriptions';

export const POST = async (req: NextRequest) => {
  const sig = req.headers.get('Stripe-Signature') || '';
  let event: Stripe.Event;

  try {
    const buf = await req.arrayBuffer();
    const body = Buffer.from(buf);
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'generic';
    return NextResponse.json(
      { error: `Stripe - Webhook signature verification failed (${message})` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await createSubscriptionUseCase({
          stripe_subscription_id: subscription.id,
          user_id: session.metadata!.userId,
          stripe_customer_id: subscription.customer as string,
          stripe_price_id: subscription.items.data[0]?.price.id,
          next_billing_at: new Date(subscription.current_period_end * 1000)
        });
        break;
      case 'customer.subscription.updated':
        const subscriptionUpdated = event.data.object as Stripe.Subscription;

        await updateSubscriptionUseCase({
          stripe_subscription_id: subscriptionUpdated.id,
          stripe_price_id: subscriptionUpdated.items.data[0]?.price.id,
          next_billing_at: new Date(subscriptionUpdated.current_period_end * 1000)
        });

        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'generic';
    return NextResponse.json(
      { error: `Stripe - Webhook handler failed ${message}` },
      { status: 500 }
    );
  }
};
