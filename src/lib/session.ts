import { cookies } from 'next/headers';
import { cache } from 'react';

import { lucia, validateRequest } from '@/auth';
import { UserId } from '@/core/types';

export async function setSession(userId: UserId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) return undefined;
  return session.user;
});
