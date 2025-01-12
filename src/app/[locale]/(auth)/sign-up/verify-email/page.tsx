import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/routing';

export default async function VerifyEmail(props: {
  searchParams: Promise<{
    verified: string;
  }>;
}) {
  const t = await getTranslations('pages.auth');

  const { verified } = await props.searchParams;

  if (verified) {
    return (
      <div className="flex min-h-screen flex-col gap-6 bg-white">
        <Card className="mx-auto mt-20 w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{t('sign-up.emailVerified')}</CardTitle>
            <CardDescription>{t('sign-up.emailVerifiedDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/sign-in">{t('sign-in.login')}</Link>
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
          <CardTitle className="text-xl">{t('sign-up.verifyEmail')}</CardTitle>
          <CardDescription>{t('sign-up.verifyEmailDescription')}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
