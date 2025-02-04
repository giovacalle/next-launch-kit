'use client';

import { useTranslations } from 'next-intl';
import { use } from 'react';
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

  const { isPending, execute, isSuccess } = useServerAction(resetPasswordAction, {
    onError: ({ err }) => {
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold">{err.title}</span>
          <p>{err.message}</p>
        </div>
      );
    }
  });

  if (!token || token === '') {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('sign-in.forgotPassword')}</CardTitle>
          <CardDescription>{t('sign-in.tokenNotFound')}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-sm">
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
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage<'pages.auth.fields.password'>
                    t={key => t(`fields.password.${key}`)}
                  />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage<'pages.auth.fields.confirmPassword'>
                    t={key => t(`fields.confirmPassword.${key}`)}
                  />
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
