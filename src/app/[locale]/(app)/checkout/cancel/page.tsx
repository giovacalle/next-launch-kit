import { useTranslations } from 'next-intl';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Cancel() {
  const t = useTranslations('pages.checkout.cancel');

  return (
    <div className="grid place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
