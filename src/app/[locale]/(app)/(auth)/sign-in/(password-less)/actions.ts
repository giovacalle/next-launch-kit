'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

import { createUserWithMagicLinkUseCase } from '@/core/use-cases/users';

import { unAuthenticatedAction } from '@/lib/action-procedures';
import { rateLimitByKey } from '@/lib/rate-limit';

import { Locale } from '@/i18n/routing';

import { signInWithMagicLinkSchema } from './schema';

export const signInWithMagicLinkAction = unAuthenticatedAction
  .createServerAction()
  .input(signInWithMagicLinkSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, interval: 10000 });

    const locale = ((await getLocale()) ?? 'en') as Locale;

    await createUserWithMagicLinkUseCase(input.email, locale);

    redirect('/sign-in/check-email');
  });
