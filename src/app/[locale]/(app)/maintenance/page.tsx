import { useTranslations } from 'next-intl';

import { Icon } from '@iconify/react';

export default function Maintenance() {
  const t = useTranslations('pages');

  return (
    <div className="flex h-full flex-col items-center justify-center bg-linear-to-b from-blue-100 to-purple-100">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold text-purple-600">{t('maintenance.title')}</h1>
        <h2 className="text-3xl font-semibold text-gray-800">{t('maintenance.subtitle')}</h2>
        <Icon icon="mdi:tools" width={128} height={128} className="mx-auto my-8" />
        <p className="text-lg text-gray-700 italic">&quot;{t('maintenance.quote')}&quot;</p>
      </div>
    </div>
  );
}
