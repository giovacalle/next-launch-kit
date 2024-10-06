'use client';

import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  const isAuthenticationError = error.message.includes('Not authenticated');

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {isAuthenticationError ? (
        <>
          <h1 className="text-4xl font-bold">Not authorized</h1>
          <p className="text-lg">To access this page, please sign in first.</p>
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
          <p className="text-lg">{error.message}</p>
        </>
      )}
    </div>
  );
}
