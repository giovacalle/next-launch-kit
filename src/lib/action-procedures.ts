import { getTranslations } from 'next-intl/server';

import { i18nError } from '@/core/types';

import { enforceAuthenticatedUser } from '@/lib/auth';
import { rateLimitByKey } from '@/lib/rate-limit';

import { createServerActionProcedure } from 'zsa';

const withShapedError = createServerActionProcedure().experimental_shapeError(async ({ err }) => {
  const t = await getTranslations('common.errors');

  if (err instanceof i18nError) {
    return {
      code: err.code,
      title: t('title'),
      message: t(`codes.${err.code}`)
    };
  }

  return {
    code: 'unexpected',
    title: t('title'),
    message: err instanceof Error ? err.message : t('unexpected')
  };
});

export const authenticatedAction = withShapedError.handler(async () => {
  const user = await enforceAuthenticatedUser();
  await rateLimitByKey({
    key: `${user.id}-app`,
    limit: 10,
    interval: 10000
  });
  return { user };
});

export const unAuthenticatedAction = withShapedError.handler(async () => {
  await rateLimitByKey({
    key: `unauthenticated-app`,
    limit: 10,
    interval: 10000
  });
});
