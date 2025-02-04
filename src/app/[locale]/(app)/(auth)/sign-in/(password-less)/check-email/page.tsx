import { useTranslations } from 'next-intl';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckEmail() {
  const t = useTranslations('pages.auth.sign-in');

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t('magicLinkCheckEmail')}</CardTitle>
        <CardDescription>{t('magicLinkCheckEmailDescription')}</CardDescription>
      </CardHeader>
    </Card>
  );
}
