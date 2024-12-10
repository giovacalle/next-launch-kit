import { eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { Subscription } from '@/core/types';
import { db } from '@/db/config';
import { subscriptionsTable } from '@/db/schema';

export async function getSubscriptionByUserId(userId: UserId) {
  return await db.query.subscriptionsTable.findFirst({
    where: eq(subscriptionsTable.user_id, userId)
  });
}

export async function createSubscription(subscription: Subscription) {
  await db.insert(subscriptionsTable).values({
    ...subscription
  });
}

export async function updateSubscription(
  subscriptionId: string,
  priceId: string,
  nextBillingAt: Date
) {
  await db
    .update(subscriptionsTable)
    .set({
      stripe_price_id: priceId,
      next_billing_at: nextBillingAt
    })
    .where(eq(subscriptionsTable.stripe_subscription_id, subscriptionId));
}
