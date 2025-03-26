import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { type VariantProps, tv } from 'tailwind-variants';

const inputVariants = tv({
  base: 'file:text-foreground placeholder:text-muted-foreground aria-invalid:border-destructive! aria-invalid:ring-destructive! flex w-full rounded-md border px-3 py-2 transition-colors file:border-0 file:bg-transparent file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      transparent: 'border-input ring-ring bg-transparent'
    },
    size: {
      default: 'text-sm'
    }
  },
  defaultVariants: {
    variant: 'transparent',
    size: 'default'
  }
});

type InputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & VariantProps<typeof inputVariants>;

function Input({ className, variant, size, type, ...props }: InputProps) {
  return (
    <input type={type} className={cn(inputVariants({ variant, size }), className)} {...props} />
  );
}
Input.displayName = 'Input';

export { Input };
