import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'focus-visible:ring-ring inline-flex h-max w-auto items-center justify-center gap-1 px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground shadow-primary hover:bg-primary/70 shadow-xs',
      secondary:
        'bg-secondary text-secondary-foreground shadow-secondary hover:bg-secondary/70 shadow-xs',
      destructive:
        'bg-destructive text-destructive-foreground shadow-destructive hover:bg-destructive/70 shadow-xs',
      outline:
        'border-input bg-background shadow-accent hover:bg-accent hover:text-accent-foreground border shadow-xs',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'rounded-md',
      pill: 'rounded-2xl',
      round: 'size-10 rounded-full'
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

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
Button.displayName = 'Button';

export { Button, type ButtonProps, buttonVariants };
