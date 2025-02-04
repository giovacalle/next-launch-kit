'use client';

import { cn } from '@/lib/tailwind';

import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';

import { createCheckoutSessionAction } from './actions';

type CheckoutFormProps = {
  label: string;
  priceId: string;
  disabled: boolean;
};

export function CheckoutForm({ label, priceId, disabled }: CheckoutFormProps) {
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

  const isDisabled = disabled || isPending;

  return (
    <form
      className={cn(isDisabled && 'cursor-not-allowed')}
      onSubmit={e => {
        e.preventDefault();
        if (isDisabled) return;
        execute({ priceId });
      }}>
      <Button type="submit" disabled={isDisabled} className="mt-6 w-full">
        {label}
      </Button>
    </form>
  );
}
