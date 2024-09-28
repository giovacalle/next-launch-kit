import { hash } from '@node-rs/argon2';

import { db } from '@/db/config';
import { usersTable } from '@/db/schema';

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
    where: (users, { eq }) => eq(users.email, email)
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
