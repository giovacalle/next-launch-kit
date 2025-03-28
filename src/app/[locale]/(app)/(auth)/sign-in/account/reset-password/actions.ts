'use server';

import { changePasswordUseCase } from '@/core/use-cases/users';

import { unAuthenticatedAction } from '@/lib/action-procedures';
import { rateLimitByIp } from '@/lib/rate-limit';

import { resetPasswordSchema } from './schema';

export const resetPasswordAction = unAuthenticatedAction
  .createServerAction()
  .input(resetPasswordSchema)
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: 'reset-password', limit: 3, interval: 10000 });
    await changePasswordUseCase(input.token, input.password);
  });
