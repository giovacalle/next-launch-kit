import { useTranslations } from 'next-intl';

import { Icon } from '@iconify/react';

import BaseLayout from '@/components/layout/layouts/base-layout';
import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <Content />
    </BaseLayout>
  );
}

function Content() {
  const t = useTranslations('pages');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold text-purple-600">{t('404.title')}</h1>
        <h2 className="text-3xl font-semibold text-gray-800">{t('404.subtitle')}</h2>
        <p className="text-xl text-gray-600">{t('404.description')}</p>
        <Icon icon="noto:eyes" width={128} height={128} className="mx-auto my-8" />
        <p className="text-lg italic text-gray-700">&quot;{t('404.quote')}&quot;</p>
        <Button asChild className="mt-8">
          <Link href="/">{t('404.back')}</Link>
        </Button>
      </div>
    </div>
  );
}
