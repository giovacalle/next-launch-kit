'use client';

import { useTranslations } from 'next-intl';
import { use } from 'react';
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

import { resetPasswordAction } from './actions';
import { ResetPasswordSchema, resetPasswordSchema } from './schema';

export default function ResetPassword(props: { searchParams: Promise<{ token: string }> }) {
  const t = useTranslations('pages.auth');

  const { token } = use(props.searchParams);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: '',
      confirmPassword: ''
    }
  });

  const { isPending, execute, error, isSuccess } = useServerAction(resetPasswordAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  if (!token || token === '') {
    return (
      <div className="flex min-h-screen flex-col gap-6 bg-white">
        <Card className="mx-auto mt-20 w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{t('sign-in.forgotPassword')}</CardTitle>
            <CardDescription>{t('sign-in.tokenNotFound')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col gap-6 bg-white">
        <Card className="mx-auto mt-20 w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{t('sign-in.passwordChanged')}</CardTitle>
            <CardDescription>{t('sign-in.passwordChangedDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/sign-in">{t('sign-in.login')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      {error && <p className="mb-2 font-bold text-red-700">{error.message}</p>}
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('sign-in.resetPassword')}</CardTitle>
          <CardDescription>{t('sign-in.resetPasswordDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(data => execute(data))} className="grid gap-6">
              <input type="hidden" value="" {...form.register('accept')} />
              <input type="hidden" value={token} {...form.register('token')} />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fields.password.label')}</FormLabel>
                    <FormControl>
                      <Input type="password" variant="outline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fields.confirmPassword.label')}</FormLabel>
                    <FormControl>
                      <Input type="password" variant="outline" {...field} />
                    </FormControl>
                    <FormMessage />
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
    </div>
  );
}
