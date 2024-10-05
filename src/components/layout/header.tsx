import Link from 'next/link';

import { getUserProfileUseCase } from '@/core/use-cases/users-profile';
import { getCurrentUser } from '@/lib/session';

import { SignOut } from './sign-out';

export default async function Header() {
  const user = await getCurrentUser();
  let profile = null;

  if (user) {
    profile = await getUserProfileUseCase(user.id);
  }

  return (
    <header className="flex items-center justify-between bg-slate-700 p-2 text-white">
      <h1 className="text-4xl">Next.js Base Template</h1>
      {profile ? (
        <div className="flex flex-col">
          <p>Hi {profile.name}</p>
          <SignOut />
        </div>
      ) : (
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      )}
    </header>
  );
}
