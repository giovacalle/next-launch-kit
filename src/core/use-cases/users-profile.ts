import { getUserProfile } from '@/core/data-source/users-profile';
import { UserId, i18nError } from '@/core/types';

export async function getUserProfileUseCase(userId: UserId) {
  const userProfile = await getUserProfile(userId);
  if (!userProfile) throw new i18nError('profileNotFound', 'User profile not found');
  return userProfile;
}
