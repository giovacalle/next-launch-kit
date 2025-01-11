import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckEmail() {
  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription>
            We have sent you an email with a link to confirm your email address. Please check your
            inbox.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
