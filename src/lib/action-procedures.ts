import { createServerActionProcedure } from 'zsa';

import { rateLimitByKey } from '@/lib/rate-limit';
import { getAuthenticatedUser } from '@/lib/session';

export const authenticatedAction = createServerActionProcedure().handler(async () => {
  const user = await getAuthenticatedUser();
  await rateLimitByKey({
    key: `${user.id}-app`,
    limit: 10,
    interval: 10000
  });
  return { user };
});

export const unAuthenticatedAction = createServerActionProcedure().handler(async () => {
  await rateLimitByKey({
    key: `unauthenticated-app`,
    limit: 10,
    interval: 10000
  });
});
