'use client';

import { ComponentProps } from 'react';

import { cn } from '@/lib/tailwind';

import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps, tv } from 'tailwind-variants';

const labelVariants = tv({
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
});

type LabelProps = ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>;

function Label({ className, ...props }: LabelProps) {
  return <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />;
}
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
