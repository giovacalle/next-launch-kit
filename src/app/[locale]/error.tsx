'use client';

import { useTranslations } from 'next-intl';

import { i18nErrorCode } from '@/core/types';

import { Icon } from '@iconify/react';

export default function Error({ error }: { error: Error; digest?: string }) {
  const t = useTranslations('common.errors');

  const i18nErrorCode = extracti18nCodeFromError(error);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-red-100 to-orange-100">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold text-destructive">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {i18nErrorCode ? t(`codes.${i18nErrorCode}`) : t('unexpected')}
        </p>
        <Icon
          icon="material-symbols:error-outline-rounded"
          width={128}
          height={128}
          className="mx-auto my-8 text-destructive"
        />
      </div>
    </div>
  );
}

function extracti18nCodeFromError(error: Error) {
  // INFO: not all codes are handled here, most of them are handled in server actions
  const i18nErrorCodes: i18nErrorCode[] = ['rateLimit', 'sendingEmail', 'notAuthenticated'];
  return i18nErrorCodes.find(code => error.message.includes(code));
}
