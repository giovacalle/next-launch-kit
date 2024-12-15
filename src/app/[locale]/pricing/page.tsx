import { getCurrentUser } from '@/lib/auth';

import { SubscriptionPlan } from '@/core/types';
import { getUserPlanUseCase } from '@/core/use-cases/subscriptions';

import { PricingContent } from './content';
import { Plan } from './types/plan';

const plans: Plan[] = [
  {
    id: 'free',
    priceMonthly: { id: '-', value: 0 },
    priceYearly: { id: '-', value: 0 },
    features: ['Basic Support'],
    href: '/sign-in'
  },
  {
    id: 'basic',
    priceMonthly: { id: process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTHLY!, value: 2.99 },
    priceYearly: { id: process.env.NEXT_PUBLIC_STRIPE_BASIC_YEARLY!, value: 29.99 },
    features: ['Priority Support'],
    href: '/signup/basic',
    highlight: true
  },
  {
    id: 'premium',
    priceMonthly: { id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY!, value: 5.99 },
    priceYearly: { id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY!, value: 59.99 },
    features: ['Advanced Features'],
    href: '/signup/basic'
  }
];

export default async function PricingPage() {
  let activePlan: SubscriptionPlan | undefined;

  const user = await getCurrentUser();

  if (user) activePlan = await getUserPlanUseCase(user.id);

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">Choose the plan that&apos;s right for you</p>
          <PricingContent plans={plans} isLogged={!!user} activePlan={activePlan} />
        </div>
      </div>
    </div>
  );
}
