import { hash } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { User, usersTable } from '@/db/schema';

async function hashPassword(password: string) {
  return await hash(password, {
    // recommended minimum parameters from Lucia docs
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
}

export async function getUserByEmail(email: string) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email)
  });
}

export async function createUserWithCredentials(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  const [user] = await db
    .insert(usersTable)
    .values({
      provider: 'credentials',
      email,
      password_hash: hashedPassword
    })
    .returning();
  return user;
}

export async function updateUser(userId: UserId, data: Omit<Partial<User>, 'id'>) {
  await db.update(usersTable).set(data).where(eq(usersTable.id, userId));
}

export async function verifyPassword(password: string, passwordHash: string) {
  return (await hashPassword(password)) === passwordHash;
}
