import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

type DivProps = ComponentPropsWithRef<'div'>;

function Card({ className, ref, ...rest }: DivProps) {
  return (
    <div
      ref={ref}
      className={cn('rounded-xl border border-black bg-transparent', className)}
      {...rest}
    />
  );
}
Card.displayName = 'Card';

function CardHeader({ className, ref, ...rest }: DivProps) {
  return <div ref={ref} className={cn('flex flex-col p-6', className)} {...rest} />;
}
CardHeader.displayName = 'CardHeader';

function CardTitle({ className, ref, ...rest }: DivProps) {
  return (
    <div
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...rest}
    />
  );
}
CardTitle.displayName = 'CardTitle';

function CardDescription({ className, ref, ...rest }: DivProps) {
  return <div ref={ref} className={cn('text-sm text-gray-500', className)} {...rest} />;
}
CardDescription.displayName = 'CardDescription';

function CardContent({ className, ref, ...rest }: DivProps) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...rest} />;
}
CardContent.displayName = 'CardContent';

function CardFooter({ className, ref, ...rest }: DivProps) {
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...rest} />;
}
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
