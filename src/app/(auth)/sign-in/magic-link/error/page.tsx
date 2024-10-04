import Link from 'next/link';

export default function InvalidMagicLink() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-3xl font-bold">Invalid token</h1>
      <p className="text-center text-lg">
        The token you are using is not valid or has expired. Please try signing in again.
      </p>
      <Link href="/sign-in" className="underline">
        Sign in
      </Link>
    </div>
  );
}
