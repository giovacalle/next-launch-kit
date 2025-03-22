'use server';

import { getLocale } from 'next-intl/server';

import { resetPasswordUseCase } from '@/core/use-cases/users';

import { unAuthenticatedAction } from '@/lib/action-procedures';
import { rateLimitByKey } from '@/lib/rate-limit';

import { Locale, routing } from '@/i18n/routing';

import { forgotPasswordSchema } from './schema';

export const forgotPasswordAction = unAuthenticatedAction
  .createServerAction()
  .input(forgotPasswordSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: `${input.email}-forgot-password`, limit: 3, interval: 10000 });

    const locale = ((await getLocale()) ?? routing.defaultLocale) as Locale;

    await resetPasswordUseCase(input.email, locale);
  });
