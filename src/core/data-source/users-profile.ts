import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { usersProfileTable } from '@/db/schema';

import { eq } from 'drizzle-orm';

export async function getUserProfile(userId: UserId) {
  return await db.query.usersProfileTable.findFirst({
    where: eq(usersProfileTable.user_id, userId)
  });
}

export async function createUserProfile(
  userId: UserId,
  name: string,
  surname?: string,
  avatar?: string
) {
  const [userProfile] = await db
    .insert(usersProfileTable)
    .values({
      user_id: userId,
      name,
      surname,
      avatar
    })
    .onConflictDoNothing()
    .returning();
  return userProfile;
}
