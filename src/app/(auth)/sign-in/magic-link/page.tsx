'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useServerAction } from 'zsa-react';

import { signInWithMagicLinkAction } from './actions/sign-in';
import { SignInWithMagicLinkSchema, signInWithMagicLinkSchema } from './types/schema';

export default function MagicLink() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInWithMagicLinkSchema>({
    resolver: zodResolver(signInWithMagicLinkSchema)
  });

  const { isPending, execute, error } = useServerAction(signInWithMagicLinkAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Magic link</h1>
      {error && <p className="mb-2 font-bold text-red-700">{error.message}</p>}
      <form onSubmit={handleSubmit(data => execute(data))} className="flex flex-col gap-3">
        <input type="hidden" value="" {...register('accept')} />

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="rounded-md bg-slate-200 p-2 text-black"
            {...register('email')}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <button
          disabled={isPending}
          className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500">
          {isPending ? 'Loading...' : 'Send magic link'}
        </button>
      </form>
    </div>
  );
}
