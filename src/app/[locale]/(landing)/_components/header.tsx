import { getTranslations } from 'next-intl/server';

import { getCurrentUser } from '@/lib/auth';

import { LangSelector } from '@/components/lang-selector/lang-selector';
import { Logo } from '@/components/logo/logo';
import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/routing';

import { NavbarMobile } from './navbar-mobile';

export default async function Header() {
  const t = await getTranslations('common.navbar');

  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-[1234] h-max w-full bg-background/50 p-5 py-3 backdrop-blur-md md:px-8">
      <nav className="flex items-center justify-between gap-5 text-sm font-medium">
        <Logo />
        <div className="mr-auto max-md:hidden">
          <Button variant="link" asChild>
            <Link href="/pricing">{t('pricing')}</Link>
          </Button>
        </div>
        <div className="flex items-center gap-5">
          <Button size="pill" className="max-md:hidden" asChild>
            {user ? (
              <Link href="/dashboard">{t('dashboard')}</Link>
            ) : (
              <Link href="/sign-in">{t('signIn')}</Link>
            )}
          </Button>
          <LangSelector />
          <NavbarMobile />
        </div>
      </nav>
    </header>
  );
}
