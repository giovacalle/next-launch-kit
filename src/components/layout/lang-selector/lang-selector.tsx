'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import * as DropdownMenu from '@/components/ui/dropdown-menu';

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
        <span className="w-full shrink-0 text-sm font-medium">{t('title')}</span>
        {routing.locales.map(lng => (
          <Button key={lng} variant="unstyled">
            <Link href={pathname}>
              <FlagIcon code={lng} />
            </Link>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button variant="unstyled" className="ml-auto max-md:hidden">
          <FlagIcon code={locale as Locale} />
        </Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent align="end">
        <DropdownMenu.DropdownMenuLabel>{t('title')}</DropdownMenu.DropdownMenuLabel>
        {routing.locales.map(lng => (
          <DropdownMenu.DropdownMenuItem key={lng}>
            <Button variant="unstyled" asChild>
              <Link href={pathname} locale={lng} className="flex items-center gap-x-1">
                <FlagIcon code={lng} />
                {t(`options.${lng}`)}
              </Link>
            </Button>
          </DropdownMenu.DropdownMenuItem>
        ))}
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.Root>
  );
}
