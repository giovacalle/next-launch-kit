'use client';

import { NestedKeyOf, NestedValueOf } from 'next-intl';
import { ComponentPropsWithRef, createContext, useContext, useId } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext
} from 'react-hook-form';

import { cn } from '@/lib/tailwind';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';

import { Label } from '@/components/ui/label';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) throw new Error('useFormField should be used within <FormField>');

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

function FormItem({ className, ref, ...props }: ComponentPropsWithRef<'div'>) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('w-full space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}
FormItem.displayName = 'FormItem';

function FormLabel({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}
FormLabel.displayName = 'FormLabel';

function FormControl({ ref, ...props }: ComponentPropsWithRef<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}
FormControl.displayName = 'FormControl';

function FormDescription({ className, ref, ...props }: ComponentPropsWithRef<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}
FormDescription.displayName = 'FormDescription';

type FormMessageProps<T extends NestedKeyOf<IntlMessages>> = ComponentPropsWithRef<'p'> & {
  t?: (key: keyof NestedValueOf<IntlMessages, T>) => string;
};
function FormMessage<T extends NestedKeyOf<IntlMessages>>({
  className,
  children,
  ref,
  t,
  ...props
}: FormMessageProps<T>) {
  const { error, formMessageId } = useFormField();
  // @ts-expect-error custom handling error between zod and zsa-react
  const body = error ? (t ? t(String(error.message)) : String(error.message)) : children;

  if (!body) return null;

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-xs font-medium text-destructive', className)}
      {...props}>
      {body}
    </p>
  );
}
FormMessage.displayName = 'FormMessage';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
};
