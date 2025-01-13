'use client';

import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';

import { Plan } from '../plan';
import { createCheckoutSessionAction } from './actions';

type CheckoutFormProps = {
  plan: Plan;
  label: string;
  isYearly: boolean;
  isActive: boolean;
};

export function CheckoutForm({ plan, label, isYearly, isActive }: CheckoutFormProps) {
  const { isPending, execute } = useServerAction(createCheckoutSessionAction, {
    onError: ({ err }) => {
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold">{err.title}</span>
          <p>{err.message}</p>
        </div>
      );
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
        {label}
      </Button>
    </form>
  );
}
