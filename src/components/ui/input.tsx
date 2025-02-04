import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { type VariantProps, tv } from 'tailwind-variants';

const inputVariants = tv({
  base: 'flex w-full rounded-md border px-3 py-2 transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:!border-destructive aria-[invalid=true]:!ring-destructive',
  variants: {
    variant: {
      transparent: 'border-input bg-transparent ring-ring'
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

function Input({ className, variant, size, type, ref, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
}
Input.displayName = 'Input';

export { Input };
