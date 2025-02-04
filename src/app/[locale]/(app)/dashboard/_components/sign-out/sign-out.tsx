'use client';

import { useTranslations } from 'next-intl';

import { Icon } from '@iconify/react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { useRouter } from '@/i18n/routing';

import { signOut } from './actions';

export function SignOut() {
  const t = useTranslations('common.navbar');
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onSelect={async () => {
        await signOut();
        router.replace('/');
      }}>
      <Icon icon="mdi:logout" />
      <span>{t('signOut')}</span>
    </DropdownMenuItem>
  );
}
