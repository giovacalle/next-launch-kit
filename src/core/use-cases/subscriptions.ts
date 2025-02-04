import {
  createSubscription,
  getSubscriptionByUserId,
  updateSubscription
} from '@/core/data-source/subscriptions';
import { Subscription, SubscriptionPlan, UserId } from '@/core/types';

export async function getUserPlanUseCase(userId: UserId): Promise<SubscriptionPlan> {
  const subscription = await getSubscriptionByUserId(userId);
  return getSubscriptionPlan(subscription);
}

export async function createSubscriptionUseCase(subscription: Subscription) {
  await createSubscription(subscription);
}

export async function updateSubscriptionUseCase(
  subscription: Pick<Subscription, 'stripe_subscription_id' | 'stripe_price_id' | 'next_billing_at'>
) {
  await updateSubscription(
    subscription.stripe_subscription_id,
    subscription.stripe_price_id,
    subscription.next_billing_at
  );
}

function getSubscriptionPlan(subscription?: Subscription): SubscriptionPlan {
  if (!subscription) return 'free';

  switch (subscription.stripe_price_id) {
    case process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTHLY:
    case process.env.NEXT_PUBLIC_STRIPE_BASIC_YEARLY:
      return 'basic';
    case process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY:
    case process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY:
      return 'premium';
  }

  return 'free';
}
