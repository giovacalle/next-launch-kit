import { useTranslations } from 'next-intl';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckEmail() {
  const t = useTranslations('pages.auth.sign-in');

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('magicLinkCheckEmail')}</CardTitle>
          <CardDescription>{t('magicLinkCheckEmailDescription')}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
