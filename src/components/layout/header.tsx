import Image from 'next/image';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import * as DropdownMenu from '@/components/ui/dropdown-menu';
import * as Sheet from '@/components/ui/sheet';

import { getCurrentUser } from '@/lib/auth';

import { getUserProfileUseCase } from '@/core/use-cases/users-profile';
import { Link } from '@/i18n/routing';

import { LangSelector } from './lang-selector/lang-selector';
import { SignOut } from './sign-out';

export default async function Header() {
  const user = await getCurrentUser();
  let profile = null;

  if (user) {
    profile = await getUserProfileUseCase(user.id);
  }

  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center gap-4 border-b border-gray-400 bg-gray-100 px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/">
          <Icon icon="streamline-emojis:rocket" width={30} height={30} />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          Home
        </Link>
        <Link
          href="/pricing"
          className="text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
      </nav>
      <Sheet.Root>
        <Sheet.SheetTrigger asChild>
          <Button variant="unstyled" className="shrink-0 !p-0 md:hidden">
            <Icon icon="carbon:menu" width={25} height={25} />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.SheetTrigger>
        <Sheet.SheetContent side="left">
          <Sheet.SheetTitle>Menu</Sheet.SheetTitle>
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Icon icon="streamline-emojis:rocket" width={30} height={30} />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <LangSelector isMobile />
          </nav>
        </Sheet.SheetContent>
      </Sheet.Root>
      <LangSelector />
      {!profile ? (
        <Button variant="primary" rounded="full" className="p-2" asChild>
          <Link href="/sign-in">Sign in</Link>
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
              Hi {profile.name}, {profile.surname}
            </DropdownMenu.DropdownMenuLabel>
            <DropdownMenu.DropdownMenuSeparator />
            <DropdownMenu.DropdownMenuItem>
              <Link href="/profile" className="underline">
                Profile
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
