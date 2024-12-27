'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Icon } from '@iconify/react';

export default function FullPageLoading() {
  const t = useTranslations('common');

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-full w-full flex-col items-center justify-center bg-black/80">
      <Icon icon="mdi:loading" width={100} height={100} color="white" className="animate-spin" />
      <h2 className="text-2xl font-bold text-white">{t('loading.title')}...</h2>
    </div>
  );
}
