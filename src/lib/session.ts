import { cookies } from 'next/headers';

import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { Session, User, sessionsTable, usersTable } from '@/db/schema';

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

// session cookie management
export const SESSION_COOKIE_NAME = 'session';

function setSessionTokenCookie(token: string, expiresAt: Date): void {
  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/'
  });
}

function getSessionTokenCookie(): string | undefined {
  return cookies().get(SESSION_COOKIE_NAME)?.value;
}

function deleteSessionTokenCookie(): void {
  cookies().set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  });
}

// session management
function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

async function createSession(token: string, userId: UserId): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    user_id: userId,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  };
  await db.insert(sessionsTable).values(session);
  return session;
}

export async function setSession(userId: UserId) {
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  setSessionTokenCookie(token, session.expires_at);
}

export async function getSession(): Promise<SessionValidationResult> {
  const sessionToken = getSessionTokenCookie();
  if (!sessionToken) return { session: null, user: null };
  return validateSessionToken(sessionToken);
}

async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const sessionInDb = await db.query.sessionsTable.findFirst({
    where: eq(sessionsTable.id, sessionId)
  });

  if (!sessionInDb) return { session: null, user: null };

  if (Date.now() >= sessionInDb.expires_at.getTime()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionInDb.id));
    return { session: null, user: null };
  }

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, sessionInDb.user_id)
  });

  if (!user) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionInDb.id));
    return { session: null, user: null };
  }

  if (Date.now() >= sessionInDb.expires_at.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    sessionInDb.expires_at = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await db
      .update(sessionsTable)
      .set({
        expires_at: sessionInDb.expires_at
      })
      .where(eq(sessionsTable.id, sessionInDb.id));
  }

  return { session: sessionInDb, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  deleteSessionTokenCookie();
}
