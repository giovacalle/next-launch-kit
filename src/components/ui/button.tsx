import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/tailwind';

const buttonVariants = tv(
  {
    base: 'focus-visible:ring-ring inline-flex h-max w-auto items-center justify-center px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        primary: 'bg-primary text-white shadow hover:bg-primary/90',
        secondary: 'bg-secondary text-white shadow-sm hover:bg-secondary/80',
        danger: 'bg-red-500 text-white shadow-sm hover:bg-red-400/90',
        outline:
          'border-input border border-tertiary bg-background text-tertiary shadow-sm hover:bg-tertiary hover:text-white',
        link: 'text-primary underline-offset-4 hover:underline',
        unstyled: 'bg-transparent'
      },
      size: {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl'
      },
      rounded: {
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full p-3'
      }
    },

    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      rounded: 'sm'
    }
  },
  {
    responsiveVariants: true
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, rounded }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
