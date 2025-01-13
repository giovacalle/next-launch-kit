'use client';

import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { Icon } from '@iconify/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> {
  inset?: boolean;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...rest
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        inset && 'pl-8',
        className
      )}
      {...rest}>
      {children}
      <Icon icon="mdi:chevron-down" className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

function DropdownMenuSubContent({
  className,
  ref,
  ...rest
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'text-black-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...rest}
    />
  );
}
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ref,
  ...rest
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'text-black-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border bg-gray-100 p-1 shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

interface DropdownMenuItemProps extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean;
}

function DropdownMenuItem({ className, inset, ref, ...rest }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'focus:bg-accent focus:text-neutral-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...rest}
    />
  );
}
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...rest
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'focus:bg-accent focus:text-neutral-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...rest}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon icon="mdi:check" className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...rest
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'focus:bg-accent focus:text-neutral-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...rest}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon icon="mdi:dot" className="h-4 w-4 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

interface DropdownMenuLabelProps extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> {
  inset?: boolean;
}

function DropdownMenuLabel({ className, inset, ref, ...rest }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
      {...rest}
    />
  );
}
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

function DropdownMenuSeparator({
  className,
  ref,
  ...rest
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('bg-muted -mx-1 my-1 h-px', className)}
      {...rest}
    />
  );
}
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

function DropdownMenuShortcut({ className, ...rest }: ComponentPropsWithRef<'span'>) {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...rest} />;
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu as Root,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
};
