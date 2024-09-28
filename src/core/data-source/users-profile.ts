import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { usersProfileTable } from '@/db/schema';

export const createUserProfile = async (
  userId: UserId,
  name: string,
  surname?: string,
  avatar?: string
) => {
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
};
