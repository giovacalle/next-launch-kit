import { cache } from 'react';

import { AuthenticationError } from '@/core/types';

import { Google } from 'arctic';

import { getSession } from './session';

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.BASE_URL}/api/auth/google/callback`
);

export const getCurrentUser = cache(async () => {
  const { user } = await getSession();
  return user ?? undefined;
});

export async function enforceAuthenticatedUser() {
  const user = await getCurrentUser();
  if (!user) throw new AuthenticationError();
  return user;
}
