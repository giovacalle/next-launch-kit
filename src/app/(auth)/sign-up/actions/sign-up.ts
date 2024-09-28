'use server';

import { redirect } from 'next/navigation';

import { createServerAction } from 'zsa';

import { createUserWithCredentialsUseCase } from '@/core/use-cases/users';

import { signUpSchema } from '../types/schema';

export const signUpAction = createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    await createUserWithCredentialsUseCase(input.email, input.password, input.name, input.surname);
    return redirect('/sign-up/verify-email');
  });
