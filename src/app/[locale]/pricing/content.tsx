'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { SubscriptionPlan } from '@/core/types';

import { Icon } from '@iconify/react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/routing';

import { CheckoutForm } from './components/checkout-form';
import { PlanPeriodSwitch } from './components/plan-period-switch';
import { Plan } from './types/plan';

type PricingContentProps = {
  plans: Plan[];
  isLogged: boolean;
  activePlan?: SubscriptionPlan;
};

export function PricingContent({ plans, isLogged, activePlan }: PricingContentProps) {
  const t = useTranslations();

  const [isYearly, setIsYearly] = useState(false);

  const activeIndex = plans.findIndex(plan => plan.id === activePlan);

  return (
    <>
      <PlanPeriodSwitch onChange={setIsYearly} />
      <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={twMerge(
              'divide-y divide-gray-200 rounded-lg bg-white shadow-sm',
              plan.highlight ? 'border-2 border-primary shadow-md' : 'border border-gray-200'
            )}>
            <div className="relative p-6">
              {plan.highlight && (
                <div className="absolute right-0 top-0 -mt-4 mr-4 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-lg">
                  {t('pages.pricing.popular')}
                </div>
              )}
              <h2 className="text-lg font-medium capitalize leading-6 text-gray-900">{plan.id}</h2>
              <p className="mt-4 text-sm text-gray-500">
                {t(`pages.pricing.plans.${plan.id}.description`)}
              </p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  € {isYearly ? plan.priceYearly.value : plan.priceMonthly.value}
                </span>
                <span className="text-base font-medium text-gray-500">
                  /{isYearly ? t('pages.pricing.year') : t('pages.pricing.month')}
                </span>
              </p>
              {!isLogged && (
                <Button rounded="md" className="mt-8 block w-full" asChild>
                  <Link href="/sign-up">{t('pages.pricing.getStarted')}</Link>
                </Button>
              )}
              {isLogged && index >= activeIndex && (
                <CheckoutForm
                  plan={plan}
                  label={
                    activeIndex === index
                      ? t('pages.pricing.currentPlan')
                      : t('pages.pricing.upgrade')
                  }
                  isYearly={isYearly}
                  isActive={activeIndex === index}
                />
              )}
            </div>
            <div className="px-6 pb-8 pt-6">
              <h3 className="text-xs font-medium uppercase tracking-wide text-gray-900">
                {t('pages.pricing.whatsIncluded')}
              </h3>
              <ul className="mt-6 space-y-4">
                {t(`pages.pricing.plans.${plan.id}.features`)
                  .split(',')
                  .map(feature => (
                    <li key={feature} className="flex space-x-3">
                      <Icon
                        icon="material-symbols-light:check"
                        width={20}
                        height={20}
                        className="text-green-500"
                      />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
