import { getTranslations } from 'next-intl/server';

import { getUserProfileUseCase } from '@/core/use-cases/users-profile';

import { getCurrentUser } from '@/lib/auth';

import { Icon } from '@iconify/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Link } from '@/i18n/routing';

import { LangSelector } from './lang-selector/lang-selector';
import { SignOut } from './sign-out';

export default async function Header() {
  const t = await getTranslations('common.header');

  const user = await getCurrentUser();
  let profile = null;

  if (user) profile = await getUserProfileUseCase(user.id);

  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center gap-4 bg-white px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="inline-flex flex-nowrap items-center gap-1">
          <Icon icon="material-symbols-light:groups-outline-rounded" width={50} height={50} />
          <span className="text-xl font-bold">TeamResources</span>
        </Link>
        <Link href="/pricing" className="hover:underline">
          {t('navbar.pricing')}
        </Link>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 !outline-none">
              {t('navbar.dashboard.label')}
              <Icon icon="carbon:chevron-down" width={20} height={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Link href="/dashboard/manager">{t('navbar.dashboard.manager')}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard/member">{t('navbar.dashboard.member')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="unstyled" className="shrink-0 !p-0 md:hidden">
            <Icon icon="carbon:menu" width={25} height={25} />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="mb-5">Menu</SheetTitle>
          <nav className="grid gap-8 text-lg font-medium">
            <Link href="/">{t('navbar.home')}</Link>
            <Link href="/pricing">{t('navbar.pricing')}</Link>
            {user && (
              <div className="flex flex-col gap-2">
                <span>{t('navbar.dashboard.label')}</span>
                <Link href="/dashboard/manager" className="ml-2">
                  {t('navbar.dashboard.manager')}
                </Link>
                <Link href="/dashboard/member" className="ml-2">
                  {t('navbar.dashboard.member')}
                </Link>
              </div>
            )}
            <LangSelector isMobile />
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mx-auto flex flex-col items-center md:hidden">
        <Icon icon="material-symbols-light:groups-outline-rounded" width={40} height={40} />
        <span className="-mt-2 text-base font-bold">TeamResources</span>
      </Link>
      <LangSelector />
      {!profile ? (
        <Button variant="primary" rounded="full" className="p-2" asChild>
          <Link href="/sign-in">{t('navbar.signIn')}</Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src={profile.avatar ?? ''} alt={profile.name} />
              <AvatarFallback>
                {profile.name.charAt(0) + (profile.surname ? profile.surname.charAt(0) : '')}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('navbar.logged.hi', { name: profile.name })}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">{t('navbar.logged.profile')}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
