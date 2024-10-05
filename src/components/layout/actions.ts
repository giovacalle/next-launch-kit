'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia, validateRequest } from '@/lib/auth';

export async function signOut() {
  const { session } = await validateRequest();

  if (!session) throw new Error('Not authenticated');

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect('/sign-in');
}
