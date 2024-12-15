'use client';

import { useEffect } from 'react';

import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';

export default function SignedOutPage() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-bold">Sign Out</h1>
      <p className="text-lg">
        You have been successfully signed out. You can now sign in to your account.
      </p>
      <Link href="/sign-in" className="underline">
        Sign In
      </Link>
    </div>
  );
}
