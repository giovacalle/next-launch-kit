import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/routing';

export default async function VerifyEmail(props: {
  searchParams: Promise<{
    verified: string;
  }>;
}) {
  const { verified } = await props.searchParams;

  if (verified) {
    return (
      <div className="flex min-h-screen flex-col gap-6 bg-white">
        <Card className="mx-auto mt-20 w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Email Verified</CardTitle>
            <CardDescription>
              Your email has been verified. You can now sign in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Verify your email</CardTitle>
          <CardDescription>
            We have sent you an email to verify your email address. Please check your inbox and
            click the link to verify your email.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
