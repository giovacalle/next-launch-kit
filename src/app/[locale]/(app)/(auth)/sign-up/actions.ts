'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

import { createUserWithCredentialsUseCase } from '@/core/use-cases/users';

import { unAuthenticatedAction } from '@/lib/action-procedures';
import { rateLimitByIp } from '@/lib/rate-limit';

import { Locale, routing } from '@/i18n/routing';

import { signUpSchema } from './schema';

export const signUpAction = unAuthenticatedAction
  .createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: 'sign-up', limit: 3, interval: 30000 });

    const locale = ((await getLocale()) ?? routing.defaultLocale) as Locale;

    await createUserWithCredentialsUseCase(
      input.email,
      input.password,
      input.name,
      input.surname,
      locale
    );

    redirect('/sign-up/verify-email');
  });
