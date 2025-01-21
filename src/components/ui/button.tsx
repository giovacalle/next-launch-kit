import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonVariants = tv(
  {
    base: 'focus-visible:ring-ring inline-flex h-max w-auto items-center justify-center gap-1 px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    variants: {
      variant: {
        primary: 'bg-primary text-white shadow-sm shadow-primary/80 hover:bg-primary/90',
        secondary: 'bg-secondary text-white shadow-sm shadow-secondary/80 hover:bg-secondary/80',
        danger: 'bg-red-500 text-white shadow-sm shadow-red-400 hover:bg-red-400/90',
        outline:
          'border border-tertiary text-tertiary shadow-sm shadow-tertiary hover:bg-tertiary hover:text-white',
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

interface ButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, rounded, asChild = false, ref, ...rest }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className, rounded }))}
      ref={ref}
      {...rest}
    />
  );
}
Button.displayName = 'Button';

export { Button, buttonVariants };
