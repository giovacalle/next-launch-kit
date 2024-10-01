'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useServerAction } from 'zsa-react';

import { signInAction } from './actions/sign-in';
import { SignInSchema, signInSchema } from './types/schema';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema)
  });

  const { isPending, execute, error } = useServerAction(signInAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Sign-in</h1>
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
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-end gap-2">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Link href="/forgot-password" className="ml-auto text-center text-sm underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            className="rounded-md bg-slate-200 p-2 text-black"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button
          disabled={isPending}
          className="col-span-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500">
          {isPending ? 'Loading...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
