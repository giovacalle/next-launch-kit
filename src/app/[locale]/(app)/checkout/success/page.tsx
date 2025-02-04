import { useTranslations } from 'next-intl';

import { applicationName } from '@/core/consts';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Success() {
  const t = useTranslations('pages.checkout.success');

  return (
    <div className="grid place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <CardDescription>{t('description', { applicationName })}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
