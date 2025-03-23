import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

type DivProps = ComponentPropsWithRef<'div'>;

function Card({ className, ...props }: DivProps) {
  return (
    <div className={cn('rounded-xl border bg-card text-card-foreground', className)} {...props} />
  );
}
Card.displayName = 'Card';

function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn('flex flex-col p-6', className)} {...props} />;
}
CardHeader.displayName = 'CardHeader';

function CardTitle({ className, ...props }: DivProps) {
  return <div className={cn('font-semibold leading-none tracking-tight', className)} {...props} />;
}
CardTitle.displayName = 'CardTitle';

function CardDescription({ className, ...props }: DivProps) {
  return <div className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
CardDescription.displayName = 'CardDescription';

function CardContent({ className, ...props }: DivProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
CardContent.displayName = 'CardContent';

function CardFooter({ className, ...props }: DivProps) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
