import { getTranslations } from 'next-intl/server';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('pages.404');

  return (
    <div className="flex h-full flex-col items-center justify-center bg-linear-to-b from-blue-100 to-purple-100">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold text-purple-600">{t('title')}</h1>
        <h2 className="text-3xl font-semibold text-gray-800">{t('subtitle')}</h2>
        <p className="text-xl text-gray-600">{t('description')}</p>
        <Icon icon="noto:eyes" width={128} height={128} className="mx-auto my-8" />
        <p className="text-lg text-gray-700 italic">&quot;{t('quote')}&quot;</p>
        <Button className="mt-8" asChild>
          <Link href="/">{t('back')}</Link>
        </Button>
      </div>
    </div>
  );
}
