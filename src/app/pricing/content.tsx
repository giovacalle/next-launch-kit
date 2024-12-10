'use client';

import Link from 'next/link';
import { useState } from 'react';

import { SubscriptionPlan } from '@/core/types';

import { CheckoutForm } from './components/checkout-form';
import { PlanPeriodSwitch } from './components/plan-period-switch';
import { Plan } from './types/plan';

type PricingContentProps = {
  plans: Plan[];
  isLogged: boolean;
  activePlan?: SubscriptionPlan;
};

export function PricingContent({ plans, isLogged, activePlan }: PricingContentProps) {
  const [isYearly, setIsYearly] = useState(false);

  const activeIndex = plans.findIndex(plan => plan.id === activePlan);

  return (
    <>
      <PlanPeriodSwitch onChange={setIsYearly} />
      <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`divide-y divide-gray-200 rounded-lg bg-white shadow-sm ${
              plan.highlight ? 'border-2 border-indigo-600 shadow-md' : 'border border-gray-200'
            }`}>
            <div className="relative p-6">
              {plan.highlight && (
                <div className="absolute right-0 top-0 -mt-4 mr-4 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                  Preferred
                </div>
              )}
              <h2 className="text-lg font-medium capitalize leading-6 text-gray-900">{plan.id}</h2>
              <p className="mt-4 text-sm text-gray-500">All the basics for getting started.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  € {isYearly ? plan.priceYearly.value : plan.priceMonthly.value}
                </span>
                <span className="text-base font-medium text-gray-500">
                  {isYearly ? '/year' : '/month'}
                </span>
              </p>
              {!isLogged && (
                <Link
                  href="/sign-up"
                  className="mt-8 block w-full rounded-md bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-50">
                  Sign up
                </Link>
              )}
              {isLogged && index >= activeIndex && (
                <CheckoutForm
                  plan={plan}
                  label={
                    activeIndex === index
                      ? 'Current plan'
                      : isLogged
                        ? 'Upgrade now'
                        : 'Get started'
                  }
                  isYearly={isYearly}
                  isActive={activeIndex === index}
                />
              )}
            </div>
            <div className="px-6 pb-8 pt-6">
              <h3 className="text-xs font-medium uppercase tracking-wide text-gray-900">
                What&apos;s included
              </h3>
              <ul className="mt-6 space-y-4">
                {plan.features.map(feature => (
                  <li key={feature} className="flex space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
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
