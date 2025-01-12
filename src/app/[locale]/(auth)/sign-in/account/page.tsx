'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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

  const { isPending, execute, error } = useServerAction(signInAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      {error && <p className="mb-2 font-bold text-red-700">{error.message}</p>}
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('sign-in.loginWithAccount')}</CardTitle>
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
                      <Input
                        type="email"
                        variant="outline"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        {t('fields.forgotPassword.label')}
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" variant="outline" {...field} />
                    </FormControl>
                    <FormMessage />
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
    </div>
  );
}
