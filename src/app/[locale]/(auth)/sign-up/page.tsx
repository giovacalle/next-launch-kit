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

  const { isPending, execute, error } = useServerAction(signUpAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      {error && <p className="mb-2 font-bold text-red-700">{error.message}</p>}
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader className="text-center">
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
                      <Input type="text" variant="outline" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input type="text" variant="outline" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
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
                  <FormItem className="col-span-full">
                    <FormLabel>{t('fields.password.label')}</FormLabel>
                    <FormControl>
                      <Input type="password" variant="outline" {...field} />
                    </FormControl>
                    <FormMessage />
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
    </div>
  );
}
