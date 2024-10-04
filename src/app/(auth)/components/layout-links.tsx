'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LayoutLinks() {
  const pathname = usePathname();

  const orWithSocials = (
    <>
      <p className="text-center">or with</p>
      <div className="flex gap-2 max-sm:flex-col">
        <Link
          href="/api/auth/google"
          className="flex-1 rounded-md bg-blue-600 p-2 text-center text-white hover:bg-blue-500">
          Google
        </Link>
        <Link
          href="/sign-in/magic-link"
          className="flex-1 rounded-md bg-orange-300 p-2 text-center text-black hover:bg-orange-200">
          Magic Link
        </Link>
      </div>
    </>
  );

  if (pathname === '/sign-up') {
    return (
      <>
        <hr />
        <Link
          href="/sign-in"
          className="flex-1 rounded-md bg-purple-600 p-2 text-center text-white hover:bg-purple-500">
          I have already an account
        </Link>
        {orWithSocials}
      </>
    );
  }

  if (pathname === '/sign-in') {
    return (
      <>
        <hr />
        <Link
          href="/sign-up"
          className="flex-1 rounded-md bg-purple-600 p-2 text-center text-white hover:bg-purple-500">
          I don&apos;t have an account
        </Link>
        {orWithSocials}
      </>
    );
  }

  if (pathname === '/sign-in/forgot-password') {
    return (
      <>
        <hr />
        <Link
          href="/sign-in"
          className="flex-1 rounded-md bg-purple-600 p-2 text-center text-white hover:bg-purple-500">
          Back to sign in
        </Link>
        {orWithSocials}
      </>
    );
  }

  if (pathname === '/sign-in/magic-link') {
    return (
      <>
        <hr />
        <Link
          href="/sign-in"
          className="flex-1 rounded-md bg-purple-600 p-2 text-center text-white hover:bg-purple-500">
          Back to sign in
        </Link>
        {orWithSocials}
      </>
    );
  }

  return null;
}
