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

import { signUpAction } from './actions';
import { SignUpSchema, signUpSchema } from './schema';

export default function Signup() {
  const t = useTranslations('pages.auth');

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: ''
    }
  });

  const { isPending, execute } = useServerAction(signUpAction, {
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
        <CardTitle className="text-xl">{t('sign-up.title')}</CardTitle>
        <CardDescription>{t('sign-up.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => execute(data))}
            className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input type="hidden" value="" {...form.register('accept')} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.name.label')}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage<'pages.auth.fields.name'> t={key => t(`fields.name.${key}`)} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.surname.label')}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage<'pages.auth.fields.surname'> t={key => t(`fields.surname.${key}`)} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-full">
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
                <FormItem className="col-span-full">
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
            <Button type="submit" className="col-span-full" disabled={isPending}>
              {t('sign-up.submit')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
