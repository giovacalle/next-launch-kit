'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { plans } from '@/core/consts';
import { SubscriptionPlan } from '@/core/types';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/routing';

import { CheckoutForm } from './_components/checkout-form';
import { PlanPeriodSwitch } from './_components/plan-period-switch';

type PricingContentProps = {
  isLogged: boolean;
  activePlanId?: SubscriptionPlan;
};

export function PricingContent({ isLogged, activePlanId }: PricingContentProps) {
  const t = useTranslations('pages.pricing');

  const [isYearly, setIsYearly] = useState(true);

  const activePlanIndex = plans.findIndex(plan => plan.id === activePlanId);

  return (
    <div className="flex flex-col gap-12">
      <PlanPeriodSwitch onChange={setIsYearly} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={plan.id}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl capitalize">{plan.id}</CardTitle>
              <CardDescription>{t(`plans.${plan.id}.description`)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <span className="text-4xl font-bold">
                  € {isYearly ? plan.priceYearly.value : plan.priceMonthly.value}
                </span>
                <span className="text-base font-medium text-muted-foreground">
                  /{isYearly ? t('year') : t('month')}
                </span>
              </p>
              {!isLogged && (
                <Button className="mt-6 w-full" asChild>
                  <Link href="/sign-in">{t('getStarted')}</Link>
                </Button>
              )}
              {isLogged && (
                <CheckoutForm
                  label={
                    index === activePlanIndex
                      ? t('currentPlan')
                      : index < activePlanIndex
                        ? t('included')
                        : t('upgrade')
                  }
                  priceId={isYearly ? plan.priceYearly.id : plan.priceMonthly.id}
                  disabled={index <= activePlanIndex}
                />
              )}
              <div className="relative my-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  {t('whatsIncluded')}
                </span>
              </div>
              <ul className="space-y-4 text-sm">
                {t(`plans.${plan.id}.features`)
                  .split(',')
                  .map((feature, index) => (
                    <li key={`${feature}-${index}`} className="flex items-center gap-2">
                      <Icon
                        icon="material-symbols-light:check"
                        width={20}
                        height={20}
                        className="text-green-500"
                      />
                      {feature}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
