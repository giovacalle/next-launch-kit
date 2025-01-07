import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { getUserProfileUseCase } from '@/core/use-cases/users-profile';

import { getCurrentUser } from '@/lib/auth';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import * as DropdownMenu from '@/components/ui/dropdown-menu';
import * as Sheet from '@/components/ui/sheet';

import { Link } from '@/i18n/routing';

import { LangSelector } from './lang-selector/lang-selector';
import { SignOut } from './sign-out';

export default async function Header() {
  const t = await getTranslations('common.header');

  const user = await getCurrentUser();
  let profile = null;

  if (user) {
    profile = await getUserProfileUseCase(user.id);
  }

  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center gap-4 bg-white px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="inline-flex flex-nowrap items-center gap-1">
          <Icon icon="material-symbols-light:groups-outline-rounded" width={50} height={50} />
          <span className="text-xl font-bold">TeamResources</span>
        </Link>
        <Link
          href="/pricing"
          className="text-muted-foreground hover:text-foreground transition-colors">
          {t('navbar.pricing')}
        </Link>
      </nav>
      <Sheet.Root>
        <Sheet.SheetTrigger asChild>
          <Button variant="unstyled" className="!mr-auto shrink-0 !p-0 md:hidden">
            <Icon icon="carbon:menu" width={25} height={25} />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.SheetTrigger>
        <Sheet.SheetContent side="left">
          <Sheet.SheetTitle className="mb-5">Menu</Sheet.SheetTitle>
          <nav className="mb-5 grid gap-5 text-lg font-medium">
            <Link href="/">{t('navbar.home')}</Link>
            <Link href="/pricing">{t('navbar.pricing')}</Link>
          </nav>
          <LangSelector isMobile />
        </Sheet.SheetContent>
      </Sheet.Root>
      <LangSelector />
      {!profile ? (
        <Button variant="primary" rounded="full" className="p-2" asChild>
          <Link href="/sign-in">{t('navbar.signIn')}</Link>
        </Button>
      ) : (
        <DropdownMenu.Root>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              rounded="full"
              className="relative h-9 w-9 overflow-hidden p-2">
              {profile.avatar ? (
                <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
              ) : (
                <Icon icon="mdi:user" width={25} height={25} />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent align="end">
            <DropdownMenu.DropdownMenuLabel>
              {t('navbar.logged.hi', { name: profile.name })}
            </DropdownMenu.DropdownMenuLabel>
            <DropdownMenu.DropdownMenuSeparator />
            <DropdownMenu.DropdownMenuItem>
              <Link href="/profile" className="underline">
                {t('navbar.logged.profile')}
              </Link>
            </DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuSeparator />
            <DropdownMenu.DropdownMenuItem>
              <SignOut />
            </DropdownMenu.DropdownMenuItem>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.Root>
      )}
    </header>
  );
}
