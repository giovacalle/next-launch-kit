'use client';

import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { Icon } from '@iconify/react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { type VariantProps, tv } from 'tailwind-variants';

const sheetVariants = tv({
  base: 'fixed z-[12345] gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom:
        'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
      right:
        'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm'
    }
  },
  defaultVariants: {
    side: 'right'
  }
});

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

function SheetOverlay({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-[1234] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
      ref={ref}
    />
  );
}
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

type SheetContentProps = ComponentPropsWithRef<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants>;
function SheetContent({ side = 'right', className, children, ref, ...props }: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}>
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <Icon icon="mdi:close" width={20} height={20} />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}
SheetContent.displayName = SheetPrimitive.Content.displayName;

function SheetHeader({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div className={cn('flex flex-col gap-2 text-left', className)} {...props} />;
}
SheetHeader.displayName = 'SheetHeader';

function SheetFooter({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end', className)} {...props} />
  );
}
SheetFooter.displayName = 'SheetFooter';

function SheetTitle({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}
SheetTitle.displayName = SheetPrimitive.Title.displayName;

function SheetDescription({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
};
