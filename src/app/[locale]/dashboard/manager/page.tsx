import { enforceAuthenticatedUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await enforceAuthenticatedUser();

  return (
    <div>
      <span>Manager: {user.email}</span>
    </div>
  );
}
