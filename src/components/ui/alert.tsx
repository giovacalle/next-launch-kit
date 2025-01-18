import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { type VariantProps, tv } from 'tailwind-variants';

const alertVariants = tv({
  base: '[&>svg]:text-foreground relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7',
  variants: {
    variant: {
      default: 'text-foreground bg-background',
      warning: 'bg-amber-400 text-black [&>svg]:text-black',
      success: 'bg-green-600 text-white [&>svg]:text-white',
      danger: 'bg-red-600 text-white [&>svg]:text-white'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

type AlertProps = ComponentPropsWithRef<'div'> & VariantProps<typeof alertVariants>;
function Alert({ className, variant, ref, ...props }: AlertProps) {
  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  );
}
Alert.displayName = 'Alert';

function AlertTitle({ className, ref, ...props }: ComponentPropsWithRef<'h5'>) {
  return (
    <h5
      ref={ref}
      className={cn('mb-1 font-bold leading-none tracking-tight', className)}
      {...props}
    />
  );
}
AlertTitle.displayName = 'AlertTitle';

function AlertDescription({ className, ref, ...props }: ComponentPropsWithRef<'p'>) {
  return <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />;
}
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
