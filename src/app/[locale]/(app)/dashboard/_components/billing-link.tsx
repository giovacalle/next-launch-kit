'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Icon } from '@iconify/react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function BillingLink({ portalLink }: { portalLink: string }) {
  const t = useTranslations('common.navbar');

  return (
    <DropdownMenuItem className="cursor-pointer" asChild>
      <Link href={portalLink} target="_blank" rel="noopener noreferrer">
        <Icon icon="mdi:credit-card" />
        <span>{t('billing')}</span>
      </Link>
    </DropdownMenuItem>
  );
}
