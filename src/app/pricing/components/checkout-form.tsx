'use client';

import { useServerAction } from 'zsa-react';

import { createCheckoutSessionAction } from '../actions/create-checkout-session';
import { Plan } from '../types/plan';

type CheckoutFormProps = {
  plan: Plan;
  label: string;
  isYearly: boolean;
  isActive: boolean;
};

export function CheckoutForm({ plan, label, isYearly, isActive }: CheckoutFormProps) {
  const { isPending, execute } = useServerAction(createCheckoutSessionAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  const disabled = isActive || isPending;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (disabled) return;
        execute({ priceId: isYearly ? plan.priceYearly.id : plan.priceMonthly.id });
      }}>
      <button
        type="submit"
        disabled={disabled}
        className={`mt-8 block w-full rounded-md py-2 text-center text-sm font-semibold text-white disabled:opacity-50 ${
          disabled
            ? 'cursor-not-allowed bg-gray-400 opacity-50'
            : plan.highlight
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : plan.priceMonthly.value < 1
                ? 'border border-blue-600 !text-black hover:bg-blue-900 hover:!text-white'
                : 'bg-gray-800 hover:bg-gray-900'
        }`}>
        {isPending ? 'Loading...' : label}
      </button>
    </form>
  );
}
