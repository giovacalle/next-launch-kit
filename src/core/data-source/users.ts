import { hash } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { User, usersTable } from '@/db/schema';

const hashPassword = async (password: string) => {
  return await hash(password, {
    // recommended minimum parameters from Lucia docs
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email)
  });
};

export const createUserWithCredentials = async (email: string, password: string) => {
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
};

export const updateUser = async (userId: UserId, data: Omit<Partial<User>, 'id'>) => {
  await db.update(usersTable).set(data).where(eq(usersTable.id, userId));
};
