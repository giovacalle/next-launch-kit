import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'inline-flex h-max w-auto items-center justify-center gap-1 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground shadow-sm shadow-primary hover:bg-primary/70',
      secondary:
        'bg-secondary text-secondary-foreground shadow-sm shadow-secondary hover:bg-secondary/70',
      destructive:
        'bg-destructive text-destructive-foreground shadow-sm shadow-destructive hover:bg-destructive/70',
      outline:
        'border border-input bg-background shadow-sm shadow-accent hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'rounded-md',
      pill: 'rounded-2xl',
      round: 'h-10 w-10 rounded-full'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
});

type ButtonProps = ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
}
Button.displayName = 'Button';

export { Button, type ButtonProps, buttonVariants };
