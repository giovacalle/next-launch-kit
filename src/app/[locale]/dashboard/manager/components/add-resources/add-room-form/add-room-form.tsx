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

import { addRoomAction } from './actions';
import { RoomSchema, roomSchema } from './schema';

export function AddRoomForm({ onSubmit }: { onSubmit: () => void }) {
  const t = useTranslations('pages.dashboard.manager.addResource');

  const form = useForm<RoomSchema>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      capacity: 1,
      location: null
    }
  });

  const { isPending, execute } = useServerAction(addRoomAction, {
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
                <Input variant="outline" placeholder="Room 1" {...field} />
              </FormControl>
              <FormMessage<'pages.dashboard.manager.addResource.fields.name'>
                t={key => t(`fields.name.${key}`)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.capacity.label')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  variant="outline"
                  placeholder="1"
                  {...field}
                  onChange={e => {
                    const value = parseInt(e.target.value, 10);
                    if (isNaN(value)) return;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage<'pages.dashboard.manager.addResource.fields.capacity'>
                t={key => t(`fields.capacity.${key}`)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('fields.location.label')} ({t('fields.optional')})
              </FormLabel>
              <FormControl>
                <Input
                  variant="outline"
                  placeholder="2nd Floor (London Office)"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage<'pages.dashboard.manager.addResource.fields.location'>
                t={key => t(`fields.location.${key}`)}
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
