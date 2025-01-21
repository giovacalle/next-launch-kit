import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { type VariantProps, tv } from 'tailwind-variants';

const inputVariants = tv({
  base: 'flex w-full rounded-md border bg-transparent px-3 py-2 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:!border-red-500 aria-[invalid=true]:!ring-red-400',
  variants: {
    variant: {
      primary: 'bg-primary text-white ring-gray-400 placeholder:text-gray-400',
      secondary: 'bg-secondary text-white ring-gray-400 placeholder:text-gray-400',
      outline: 'placeholder-text-gray-400 border-tertiary text-black ring-gray-400'
    },
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg'
    },
    rounded: {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
    rounded: 'sm'
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
