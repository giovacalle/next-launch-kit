import { enforceAuthenticatedUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await enforceAuthenticatedUser();

  return (
    <div>
      <span>Member: {user.email}</span>
    </div>
  );
}
