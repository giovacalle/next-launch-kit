'use server';

import { redirect } from 'next/navigation';

import { signInUseCase } from '@/core/use-cases/users';
import { unAuthenticatedAction } from '@/lib/action-procedurest';
import { rateLimitByKey } from '@/lib/rate-limit';
import { setSession } from '@/lib/session';

import { signInSchema } from '../types/schema';

export const signInAction = unAuthenticatedAction
  .createServerAction()
  .input(signInSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, interval: 10000 });
    const user = await signInUseCase(input.email, input.password);
    await setSession(user.id);
    redirect('/');
  });
