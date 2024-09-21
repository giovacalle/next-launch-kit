import * as React from 'react';

import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/tailwind';

const inputVariants = tv({
  base: 'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex w-max rounded-md border bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
      outline: 'border-input border-tertiary'
    },
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg'
    }
  },
  defaultVariants: {
    size: 'sm',
    variant: 'primary'
  }
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
