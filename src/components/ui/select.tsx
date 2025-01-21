'use client';

import { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/tailwind';

import { Icon } from '@iconify/react/dist/iconify.js';
import * as SelectPrimitive from '@radix-ui/react-select';
import { VariantProps, tv } from 'tailwind-variants';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectVariants = tv(
  {
    slots: {
      trigger:
        'focus:ring-ring flex h-max w-full items-center justify-between rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      content:
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      label: 'py-1.5 pl-8 pr-2 text-sm font-semibold',
      item: 'flex w-full cursor-pointer select-none items-center px-3 py-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      separator: 'mx-1 my-1 h-px'
    },
    variants: {
      variant: {
        default: {
          trigger: 'bg-white text-black ring-gray-400',
          content: 'bg-white text-black',
          item: 'text-black hover:bg-gray-200 data-[state=checked]:bg-gray-300',
          separator: 'bg-gray-200'
        },
        dark: {
          trigger: 'bg-gray-800 text-white ring-gray-400',
          content: 'bg-gray-800 text-white',
          item: 'hover:bg-gray-700 data-[state=checked]:bg-gray-700',
          separator: 'bg-gray-700'
        },
        outline: {
          trigger: 'border border-tertiary bg-white text-black',
          content: 'border border-tertiary bg-white text-black',
          item: 'text-black hover:bg-gray-200 data-[state=checked]:bg-gray-300',
          separator: 'bg-gray-200'
        },
        primary: {
          trigger: 'bg-primary text-white ring-primary',
          content: 'bg-primary text-white',
          item: 'text-white hover:bg-primary data-[state=checked]:bg-primary',
          separator: 'bg-primary'
        }
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  },
  {
    responsiveVariants: true
  }
);

type Variants = VariantProps<typeof selectVariants>;

const { trigger, content, label, item, separator } = selectVariants();

function SelectTrigger({
  className,
  children,
  ref,
  variant,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Trigger> & Variants) {
  return (
    <SelectPrimitive.Trigger ref={ref} className={cn(trigger({ variant }), className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon icon="mdi:chevron-down" width={16} height={16} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

function SelectScrollUpButton({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn('flex cursor-pointer items-center justify-center py-1', className)}
      {...props}>
      <Icon icon="mdi:chevron-up" width={16} height={16} />
    </SelectPrimitive.ScrollUpButton>
  );
}
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

function SelectScrollDownButton({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn('flex cursor-pointer items-center justify-center py-1', className)}
      {...props}>
      <Icon icon="mdi:chevron-down" width={16} height={16} />
    </SelectPrimitive.ScrollDownButton>
  );
}
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

function SelectContent({
  className,
  children,
  position = 'popper',
  ref,
  variant,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Content> & Variants) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          content({ variant }),
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
SelectContent.displayName = SelectPrimitive.Content.displayName;

function SelectLabel({
  className,
  ref,
  variant,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Label> & Variants) {
  return (
    <SelectPrimitive.Label ref={ref} className={cn(label({ variant }), className)} {...props} />
  );
}
SelectLabel.displayName = SelectPrimitive.Label.displayName;

function SelectItem({
  className,
  children,
  ref,
  variant,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Item> & Variants) {
  return (
    <SelectPrimitive.Item ref={ref} className={cn(item({ variant }), className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
SelectItem.displayName = SelectPrimitive.Item.displayName;

function SelectSeparator({
  className,
  ref,
  variant,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Separator> & Variants) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn(separator({ variant }), className)}
      {...props}
    />
  );
}
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
};
