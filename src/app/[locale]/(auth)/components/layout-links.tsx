'use client';

import NextLink from 'next/link';

import { Link, routing } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';

export function LayoutLinks() {
  const pathname = usePathname();

  const orWithSocials = (
    <>
      <p className="text-center">or with</p>
      <div className="flex gap-2 max-sm:flex-col">
        <NextLink
          href="/api/auth/google"
          locale={routing.defaultLocale}
          className="flex-1 rounded-md bg-blue-600 p-2 text-center text-white hover:bg-blue-500">
          Google
        </NextLink>
        <Link
          href="/sign-in/magic-link"
          className="flex-1 rounded-md bg-orange-300 p-2 text-center text-black hover:bg-orange-200">
          Magic Link
        </Link>
      </div>
    </>
  );

  if (pathname.endsWith('/sign-up')) {
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

  if (pathname.endsWith('/sign-in')) {
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

  if (pathname.includes('/sign-in/forgot-password')) {
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

  if (pathname.includes('/sign-in/magic-link')) {
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
