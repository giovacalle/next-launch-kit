import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/routing';

export default function InvalidMagicLink() {
  const t = useTranslations('pages.auth.sign-in');

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t('magicLinkError')}</CardTitle>
        <CardDescription>{t('magicLinkErrorDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          <Link href="/sign-in">{t('login')}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
