'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { addEquipmentAction } from './actions';
import { EquipmentSchema, equipmentSchema } from './schema';

export function AddEquipmentForm({ onSubmit }: { onSubmit: () => void }) {
  const t = useTranslations('pages.dashboard.manager.addResource');

  const form = useForm<EquipmentSchema>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: '',
      model: null
    }
  });

  const { isPending, execute } = useServerAction(addEquipmentAction, {
    onSuccess: () => {
      onSubmit();
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-bold">{t('success.title')}</span>
          <p>{t('success.description')}</p>
        </div>
      );
    },
    onError: ({ err }) => {
      onSubmit();
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold">{err.title}</span>
          <p>{err.message}</p>
        </div>
      );
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => execute(data))} className="grid gap-6">
        <input type="hidden" value="" {...form.register('accept')} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.name.label')}</FormLabel>
              <FormControl>
                <Input variant="outline" placeholder="MacBook Pro" {...field} />
              </FormControl>
              <FormMessage<'pages.dashboard.manager.addResource.fields.name'>
                t={key => t(`fields.name.${key}`)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('fields.model.label')} ({t('fields.optional')})
              </FormLabel>
              <FormControl>
                <Input variant="outline" placeholder="A1234" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage<'pages.dashboard.manager.addResource.fields.model'>
                t={key => t(`fields.model.${key}`)}
              />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
}
