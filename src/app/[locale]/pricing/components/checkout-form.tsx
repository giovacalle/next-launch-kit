'use client';

import { useTranslations } from 'next-intl';

import { twMerge } from 'tailwind-merge';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';

import { createCheckoutSessionAction } from '../actions/create-checkout-session';
import { Plan } from '../types/plan';

type CheckoutFormProps = {
  plan: Plan;
  label: string;
  isYearly: boolean;
  isActive: boolean;
};

export function CheckoutForm({ plan, label, isYearly, isActive }: CheckoutFormProps) {
  const t = useTranslations('common');

  const { isPending, execute } = useServerAction(createCheckoutSessionAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  const disabled = isActive || isPending;

  return (
    <form
      className={twMerge(disabled && 'cursor-not-allowed')}
      onSubmit={e => {
        e.preventDefault();
        if (disabled) return;
        execute({ priceId: isYearly ? plan.priceYearly.id : plan.priceMonthly.id });
      }}>
      <Button
        rounded="md"
        type="submit"
        disabled={disabled}
        className={twMerge('mt-8 w-full', disabled && 'bg-tertiary')}>
        {isPending ? t('loading.title') : label}
      </Button>
    </form>
  );
}
