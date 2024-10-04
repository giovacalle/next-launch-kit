'use server';

import { redirect } from 'next/navigation';

import { createUserWithMagicLinkUseCase } from '@/core/use-cases/users';
import { unAuthenticatedAction } from '@/lib/action-procedurest';
import { rateLimitByKey } from '@/lib/rate-limit';

import { signInWithMagicLinkSchema } from '../types/schema';

export const signInWithMagicLinkAction = unAuthenticatedAction
  .createServerAction()
  .input(signInWithMagicLinkSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, interval: 10000 });
    await createUserWithMagicLinkUseCase(input.email);
    redirect('/sign-in/magic-link/check-email');
  });
