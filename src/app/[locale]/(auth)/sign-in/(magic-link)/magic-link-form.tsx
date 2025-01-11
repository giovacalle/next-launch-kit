'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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
  const form = useForm<SignInWithMagicLinkSchema>({
    resolver: zodResolver(signInWithMagicLinkSchema),
    defaultValues: {
      email: ''
    }
  });

  const { isPending, execute, error } = useServerAction(signInWithMagicLinkAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => execute(data))} className="grid gap-6">
        {error && <p className="mb-2 font-bold text-red-700">{error.message}</p>}
        <input type="hidden" value="" {...form.register('accept')} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" variant="outline" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Loading...' : 'Send magic link'}
        </Button>
      </form>
    </Form>
  );
}
