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
      <h1 className="text-4xl leading-none max-sm:w-min">
        <Link href="/">Next.js Base Template</Link>
      </h1>
      <div className="mr-auto md:ml-10">
        <Link href="/pricing">Pricing</Link>
      </div>
      {profile ? (
        <div className="flex flex-col">
          <p>Hi {profile.name}</p>
          <div className="flex gap-1">
            <SignOut />
            <Link href="/profile">Profile</Link>
          </div>
        </div>
      ) : (
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      )}
    </header>
  );
}
