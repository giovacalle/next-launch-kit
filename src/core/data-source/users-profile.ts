import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { UserProfile, usersProfileTable } from '@/db/schema';

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

export const upsertUserProfile = async (
  userId: UserId,
  profile: Partial<UserProfile> & Required<Pick<UserProfile, 'name'>>
) => {
  await db
    .insert(usersProfileTable)
    .values({
      user_id: userId,
      ...profile
    })
    .onConflictDoUpdate({
      target: usersProfileTable.user_id,
      set: profile
    });
};
