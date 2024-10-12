import Link from 'next/link';

export default async function VerifyEmail({
  searchParams
}: {
  searchParams: {
    verified: string;
  };
}) {
  const { verified } = searchParams;

  if (verified) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="mb-2 text-2xl font-bold">Email Successfully Verified</h1>
        <p>Your email has been verified. You can now sign in to your account.</p>
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Verify your email</h1>
      <p>
        We have sent you an email to verify your email address. Please check your inbox and click
        the link to verify your email.
      </p>
    </div>
  );
}
