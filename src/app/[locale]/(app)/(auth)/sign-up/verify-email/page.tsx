import { getTranslations } from 'next-intl/server';

import { i18nErrorCode } from '@/core/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/routing';

export default async function VerifyEmail(props: {
  searchParams: Promise<{
    verified: string;
    code: i18nErrorCode;
  }>;
}) {
  const t = await getTranslations();

  const { verified, code } = await props.searchParams;

  if (verified) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('pages.auth.sign-up.emailVerified')}</CardTitle>
          <CardDescription>{t('pages.auth.sign-up.emailVerifiedDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link href="/sign-in">{t('pages.auth.sign-in.login')}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (code) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('pages.auth.sign-up.verifyEmail')}</CardTitle>
          <CardDescription>{t(`common.errors.codes.${code}`)}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t('pages.auth.sign-up.verifyEmail')}</CardTitle>
        <CardDescription>{t('pages.auth.sign-up.verifyEmailDescription')}</CardDescription>
      </CardHeader>
    </Card>
  );
}
