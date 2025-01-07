import { getTranslations } from 'next-intl/server';

import { SubscriptionPlan } from '@/core/types';
import { getUserPlanUseCase } from '@/core/use-cases/subscriptions';

import { getCurrentUser } from '@/lib/auth';

import { PricingContent } from './content';
import { Plan } from './types/plan';

const plans: Plan[] = [
  {
    id: 'free',
    priceMonthly: { id: '-', value: 0 },
    priceYearly: { id: '-', value: 0 },
    href: '/sign-in'
  },
  {
    id: 'basic',
    priceMonthly: { id: process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTHLY!, value: 2.99 },
    priceYearly: { id: process.env.NEXT_PUBLIC_STRIPE_BASIC_YEARLY!, value: 29.99 },
    href: '/signup/basic',
    highlight: true
  },
  {
    id: 'premium',
    priceMonthly: { id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY!, value: 5.99 },
    priceYearly: { id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY!, value: 59.99 },
    href: '/signup/basic'
  }
];

export default async function PricingPage() {
  const t = await getTranslations('pages.pricing');

  let activePlan: SubscriptionPlan | undefined;

  const user = await getCurrentUser();

  if (user) activePlan = await getUserPlanUseCase(user.id);

  return (
    <section className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-xl text-gray-600">{t('subtitle')}</p>
          <PricingContent plans={plans} isLogged={!!user} activePlan={activePlan} />
        </div>
      </div>
    </section>
  );
}
