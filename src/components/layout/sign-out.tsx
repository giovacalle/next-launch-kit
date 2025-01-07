'use client';

import { useTranslations } from 'next-intl';

import { signOut } from './actions';

export function SignOut() {
  const t = useTranslations('common.header.navbar.logged');

  return (
    <button className="underline" onClick={() => signOut()}>
      {t('signOut')}
    </button>
  );
}
