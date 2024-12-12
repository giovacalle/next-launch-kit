'use server';

import { redirect } from 'next/navigation';

import { getSession, invalidateSession } from '@/lib/session';

export async function signOut() {
  const { session } = await getSession();

  if (!session) redirect('/sign-in');

  await invalidateSession(session.id);

  redirect('/sign-out');
}
