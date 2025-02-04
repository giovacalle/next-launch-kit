'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Link } from '@/i18n/routing';
import { routing, usePathname } from '@/i18n/routing';

export function LangSelector() {
  const t = useTranslations('common.langSelector');

  const locale = useLocale();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="round" className="max-md:hidden">
          <Icon icon={`circle-flags:${locale}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map(lng => (
          <DropdownMenuItem key={lng}>
            <Icon icon={`circle-flags:${lng}`} />
            <Link href={pathname} locale={lng}>
              {t(`options.${lng}`)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LangSelectorMobile() {
  const pathname = usePathname();

  return (
    <div className="col-span-full mt-10 flex items-center justify-evenly gap-2">
      {routing.locales.map(lng => (
        <Button key={lng} variant="ghost" size="round" asChild>
          <Link href={pathname} locale={lng}>
            <Icon icon={`circle-flags:${lng}`} />
          </Link>
        </Button>
      ))}
    </div>
  );
}
