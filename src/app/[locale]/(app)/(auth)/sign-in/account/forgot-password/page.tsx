'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { forgotPasswordAction } from './actions';
import { ForgotPasswordSchema, forgotPasswordSchema } from './schema';

export default function ForgotPassword() {
  const t = useTranslations('pages.auth');

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const { isPending, execute } = useServerAction(forgotPasswordAction, {
    onError: ({ err }) => {
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold">{err.title}</span>
          <p>{err.message}</p>
        </div>
      );
    },
    onSuccess: () => {
      toast.success(t('sign-in.forgotPasswordEmailSent'));
      form.reset();
    }
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t('sign-in.forgotPassword')}</CardTitle>
        <CardDescription>{t('sign-in.forgotPasswordDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {t('sign-in.resetPassword')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
