import { cookies } from 'next/headers';

import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Google } from 'arctic';
import { Lucia } from 'lucia';
import { User } from 'lucia';
import { Session } from 'lucia';

import { db } from '@/db/config';
import { sessionsTable, usersTable } from '@/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.BASE_URL}/api/auth/google/callback`
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'auth-session',
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
});

export async function validateRequest(): Promise<
  { user: User; session: Session } | { user: null; session: null }
> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null
    };
  }

  const result = await lucia.validateSession(sessionId);

  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}
  return result;
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
  }
}
