'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Icon } from '@iconify/react/dist/iconify.js';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function ToggleTheme() {
  const t = useTranslations('common.navbar');
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onSelect={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}>
      <Icon icon="mdi:theme-light-dark" />
      <span>{t('toggleTheme')}</span>
    </DropdownMenuItem>
  );
}
