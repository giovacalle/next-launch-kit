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

import { signInWithMagicLinkAction } from './actions';
import { SignInWithMagicLinkSchema, signInWithMagicLinkSchema } from './schema';

export function MagicLinkForm() {
  const t = useTranslations('pages.auth');

  const form = useForm<SignInWithMagicLinkSchema>({
    resolver: zodResolver(signInWithMagicLinkSchema),
    defaultValues: {
      email: ''
    }
  });

  const { isPending, execute } = useServerAction(signInWithMagicLinkAction, {
    onError: ({ err }) => {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.email.label')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage<'pages.auth.fields.email'> t={key => t(`fields.email.${key}`)} />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {t('sign-in.sendMagicLink')}
        </Button>
      </form>
    </Form>
  );
}
