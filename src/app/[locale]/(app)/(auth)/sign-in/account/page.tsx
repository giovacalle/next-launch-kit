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

import { Link } from '@/i18n/routing';

import { signInAction } from './actions';
import { SignInSchema, signInSchema } from './schema';

export default function Account() {
  const t = useTranslations('pages.auth');

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { isPending, execute } = useServerAction(signInAction, {
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t('sign-in.login')}</CardTitle>
        <CardDescription>{t('sign-in.accountDescription')}</CardDescription>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>{t('fields.password.label')}</FormLabel>
                    <Link href="/sign-in/account/forgot-password" className="text-xs underline">
                      {t('sign-in.forgotPassword')}
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage<'pages.auth.fields.password'>
                    t={key => t(`fields.password.${key}`)}
                  />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {t('sign-in.login')}
            </Button>
            <Link href="/sign-up" className="text-right text-xs underline">
              {t('sign-in.dontHaveAccount')}
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
