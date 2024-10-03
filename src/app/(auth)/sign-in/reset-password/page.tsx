'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useServerAction } from 'zsa-react';

import { resetPasswordAction } from './actions/reset-password';
import { ResetPasswordSchema, resetPasswordSchema } from './types/schema';

export default function ResetPassword({ searchParams }: { searchParams: { token: string } }) {
  const token = searchParams.token;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const { isPending, execute, error, isSuccess } = useServerAction(resetPasswordAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  if (!token) {
    return (
      <div>
        <h1 className="mb-2 text-2xl font-bold">Reset password</h1>
        <p className="mb-2 font-bold text-red-700">Token not found</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="mb-2 text-2xl font-bold">Password successfully changed</h1>
        <p>You can now sign in to your account with your new password.</p>
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Reset password</h1>
      {error && <p className="mb-2 font-bold text-red-700">{error.message}</p>}
      <form onSubmit={handleSubmit(data => execute(data))} className="flex flex-col gap-3">
        <input type="hidden" value="" {...register('accept')} />
        <input type="hidden" value={token} {...register('token')} />
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="rounded-md bg-slate-200 p-2 text-black"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="rounded-md bg-slate-200 p-2 text-black"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          disabled={isPending}
          className="col-span-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500">
          {isPending ? 'Loading...' : 'Change password'}
        </button>
      </form>
    </div>
  );
}
