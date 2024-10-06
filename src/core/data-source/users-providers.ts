import { hash, verify } from '@node-rs/argon2';
import { and, eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { Provider, UserProvider, usersProvidersTable } from '@/db/schema';

async function hashPassword(password: string) {
  return await hash(password, {
    // recommended minimum parameters from Lucia docs
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
}

export async function verifyPassword(passwordHash: string, password: string) {
  return await verify(passwordHash, password, {
    // recommended minimum parameters from Lucia docs
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
}

export async function getUserProvider(userId: UserId, provider: Provider) {
  return await db.query.usersProvidersTable.findFirst({
    where: and(eq(usersProvidersTable.user_id, userId), eq(usersProvidersTable.provider, provider))
  });
}

export async function getUserProviderWithGoogleId(googleId: string) {
  return await db.query.usersProvidersTable.findFirst({
    where: and(
      eq(usersProvidersTable.provider_id, googleId),
      eq(usersProvidersTable.provider, 'google')
    )
  });
}

export async function createUserProviderWithCredentials(userId: UserId, password: string) {
  const hashedPassword = await hashPassword(password);
  const [userProvider] = await db
    .insert(usersProvidersTable)
    .values({
      user_id: userId,
      provider: 'credentials',
      password_hash: hashedPassword
    })
    .returning();
  return userProvider;
}

export async function createUserProviderWithMagicLink(userId: UserId) {
  const [userProvider] = await db
    .insert(usersProvidersTable)
    .values({
      user_id: userId,
      provider: 'magic-link'
    })
    .onConflictDoNothing()
    .returning();
  return userProvider;
}

export async function createUserProviderWithGoogle(userId: UserId, googleId: string) {
  const [userProvider] = await db
    .insert(usersProvidersTable)
    .values({
      user_id: userId,
      provider: 'google',
      provider_id: googleId
    })
    .onConflictDoNothing()
    .returning();
  return userProvider;
}

export async function updateUserProvider(
  userId: UserId,
  provider: Provider,
  data: Partial<UserProvider>
) {
  await db
    .update(usersProvidersTable)
    .set(data)
    .where(
      and(eq(usersProvidersTable.user_id, userId), eq(usersProvidersTable.provider, provider))
    );
}

export async function updatePassword(userId: UserId, password: string, tx = db) {
  const hashedPassword = await hashPassword(password);
  await tx
    .update(usersProvidersTable)
    .set({ password_hash: hashedPassword })
    .where(
      and(eq(usersProvidersTable.user_id, userId), eq(usersProvidersTable.provider, 'credentials'))
    );
}
