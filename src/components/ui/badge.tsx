import { HTMLAttributes } from 'react';

import { cn } from '@/lib/tailwind';

import { VariantProps, tv } from 'tailwind-variants';

const badgeVariants = tv({
  base: 'focus:ring-ring inline-flex items-center border px-2.5 py-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    variant: {
      primary: 'border-primary bg-primary/20 text-primary',
      secondary: 'border-secondary bg-secondary/20 text-secondary',
      outline: 'border border-tertiary text-tertiary'
    },
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg'
    },
    rounded: {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
    rounded: 'full'
  }
});

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, rounded, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, rounded }), className)} {...props} />;
}

export { Badge, badgeVariants };
