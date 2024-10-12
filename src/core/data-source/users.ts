import { eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { User, usersTable } from '@/db/schema';

export async function getUserByEmail(email: string) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email)
  });
}

export async function getUserById(userId: UserId) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId)
  });
}

export async function createUser(email: string) {
  const [user] = await db
    .insert(usersTable)
    .values({
      email
    })
    .returning();
  return user;
}

export async function updateUser(userId: UserId, data: Omit<Partial<User>, 'id'>) {
  await db.update(usersTable).set(data).where(eq(usersTable.id, userId));
}
