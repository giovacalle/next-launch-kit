'use server';

import { redirect } from 'next/navigation';

import { createUserWithCredentialsUseCase } from '@/core/use-cases/users';
import { unAuthenticatedAction } from '@/lib/action-procedurest';
import { rateLimitByIp } from '@/lib/rate-limit';

import { signUpSchema } from '../types/schema';

export const signUpAction = unAuthenticatedAction
  .createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: 'sign-up', limit: 3, interval: 30000 });
    await createUserWithCredentialsUseCase(input.email, input.password, input.name, input.surname);
    return redirect('/sign-up/verify-email');
  });
