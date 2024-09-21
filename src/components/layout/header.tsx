import Link from 'next/link';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import * as DropdownMenu from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import * as Sheet from '@/components/ui/sheet';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center gap-4 border-b border-gray-400 bg-gray-100 px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#">
          <Icon icon="streamline-emojis:rocket" width={30} height={30} />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          Home
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          Categories
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          Products
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          Orders
        </Link>
        <Link href="#" className="text-foreground hover:text-foreground transition-colors">
          Settings
        </Link>
      </nav>
      <Sheet.Root>
        <Sheet.SheetTrigger asChild>
          <Button variant="outline" className="shrink-0 md:hidden">
            <Icon icon="carbon:menu" className="h-4 w-4" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.SheetTrigger>
        <Sheet.SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Icon icon="streamline-emojis:rocket" width={30} height={30} />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Categories
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Products
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Orders
            </Link>
            <Link href="#" className="hover:text-foreground">
              Settings
            </Link>
          </nav>
        </Sheet.SheetContent>
      </Sheet.Root>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Icon
              icon="mdi:magnify"
              className="text-muted-foreground absolute left-2.5 top-2 h-4 w-4"
            />
            <Input
              variant="outline"
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu.Root>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button variant="secondary" rounded="full" className="p-2">
              <Icon icon="mdi:user" width={25} height={25} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent align="end">
            <DropdownMenu.DropdownMenuLabel>My Account</DropdownMenu.DropdownMenuLabel>
            <DropdownMenu.DropdownMenuSeparator />
            <DropdownMenu.DropdownMenuItem>Settings</DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuItem>Support</DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuSeparator />
            <DropdownMenu.DropdownMenuItem>Logout</DropdownMenu.DropdownMenuItem>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
