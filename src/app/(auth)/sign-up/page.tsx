'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useServerAction } from 'zsa-react';

import { signUpAction } from './actions/sign-up';
import { SignUpSchema, signUpSchema } from './types/schema';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema)
  });

  const { isPending, execute, error } = useServerAction(signUpAction, {
    onError: ({ err }) => {
      alert(`Error: ${err.message}`);
    }
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Sign-up</h1>
      {error && <p className="mb-2 font-bold text-red-700">{error.message}</p>}
      <form
        onSubmit={handleSubmit(data => execute(data))}
        className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <input type="hidden" value="" {...register('accept')} />
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md bg-slate-200 p-2 text-black"
            {...register('name')}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="surname" className="text-sm">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            className="rounded-md bg-slate-200 p-2 text-black"
            {...register('surname')}
          />
          {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}
        </div>
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
        <button
          disabled={isPending}
          className="col-span-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500">
          {isPending ? 'Loading...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
