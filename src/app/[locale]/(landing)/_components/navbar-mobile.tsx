'use client';

import { useTranslations } from 'next-intl';

import { Icon } from '@iconify/react';

import { LangSelectorMobile } from '@/components/lang-selector/lang-selector';
import { Logo } from '@/components/logo/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Link } from '@/i18n/routing';

export function NavbarMobile() {
  const t = useTranslations('common.navbar');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Icon icon="carbon:menu" width={25} height={25} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-5 grid grid-cols-1 gap-y-5 sm:grid-cols-2">
          <Button className="col-span-full" asChild>
            <Link href="/sign-in">{t('signIn')}</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/pricing">{t('pricing')}</Link>
          </Button>
          <LangSelectorMobile />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
