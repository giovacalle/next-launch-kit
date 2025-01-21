'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Link } from '@/i18n/routing';
import { Locale, routing, usePathname } from '@/i18n/routing';

import { FlagIcon } from './flag-icon';

export function LangSelector({ isMobile = false }: { isMobile?: boolean }) {
  const t = useTranslations('common.langSelector');
  const locale = useLocale();
  const pathname = usePathname();

  if (isMobile) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-5">
        <span className="mb-3 w-full shrink-0 text-sm font-medium">{t('title')}</span>
        {routing.locales.map(lng => (
          <Link key={lng} href={pathname}>
            <FlagIcon code={lng} />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="unstyled" className="ml-auto max-md:hidden">
          <FlagIcon code={locale as Locale} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('title')}</DropdownMenuLabel>
        {routing.locales.map(lng => (
          <DropdownMenuItem key={lng} className="mb-2">
            <Link href={pathname} locale={lng} className="flex items-center gap-x-1 p-0">
              <FlagIcon code={lng} />
              {t(`options.${lng}`)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
