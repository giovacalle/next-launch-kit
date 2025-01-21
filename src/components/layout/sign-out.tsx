'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { signOut } from './actions';

export function SignOut() {
  const t = useTranslations('common.header.navbar.logged');

  return (
    <Button variant="unstyled" className="p-0" onClick={() => signOut()}>
      {t('signOut')}
    </Button>
  );
}
