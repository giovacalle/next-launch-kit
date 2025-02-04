import { getTranslations } from 'next-intl/server';

import { SubscriptionPlan } from '@/core/types';
import { getUserPlanUseCase } from '@/core/use-cases/subscriptions';

import { getCurrentUser } from '@/lib/auth';

import { PricingContent } from './content';

export default async function PricingPage() {
  const t = await getTranslations('pages.pricing');

  const user = await getCurrentUser();

  let activePlanId: SubscriptionPlan | undefined;
  if (user) activePlanId = await getUserPlanUseCase(user.id);

  return (
    <div className="px-4 py-12 text-center md:px-6 md:py-24 lg:py-32">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
        {t('title')}
      </h1>
      <h2 className="mb-6 text-xl text-muted-foreground md:text-2xl lg:text-4xl">
        {t('subtitle')}
      </h2>
      <PricingContent isLogged={!!user} activePlanId={activePlanId} />
    </div>
  );
}
