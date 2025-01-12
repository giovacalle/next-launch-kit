'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useRouter } from '@/i18n/routing';

export default function SignedOutPage() {
  const t = useTranslations('pages.auth.sign-out');

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
