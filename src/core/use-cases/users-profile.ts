import { getUserProfile } from '@/core/data-source/users-profile';
import { UserId } from '@/core/types';

export async function getUserProfileUseCase(userId: UserId) {
  const userProfile = await getUserProfile(userId);
  if (!userProfile) throw new Error('User profile not found');
  return userProfile;
}
