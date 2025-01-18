import { redirect } from 'next/navigation';

import { getUserProfileUseCase } from '@/core/use-cases/users-profile';

import { enforceAuthenticatedUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await enforceAuthenticatedUser();

  const profile = await getUserProfileUseCase(user.id);

  redirect(`/dashboard/${profile.preferredDashboard}`);
}
