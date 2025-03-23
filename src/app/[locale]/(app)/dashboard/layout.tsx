import { Suspense } from 'react';

import { getUserProfileUseCase } from '@/core/use-cases/users-profile';

import { enforceAuthenticatedUser } from '@/lib/auth';

import { Icon } from '@iconify/react';
import { Collapsible } from '@radix-ui/react-collapsible';

import { LangSelector } from '@/components/lang-selector/lang-selector';
import { Logo } from '@/components/logo/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsbile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

import { BillingLink } from './_components/billing-link';
import { SignOut } from './_components/sign-out/sign-out';
import { ToggleTheme } from './_components/toggle-theme';

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarBody>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Icon icon="bi:grid-fill" />
                      <span>Dashboard</span>
                      <Icon
                        icon="bi:chevron-down"
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu variant="sub">
                      <SidebarMenuItem>
                        <SidebarMenuButton variant="sub" isActive>
                          <span>Overview</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton variant="sub">Analytics</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton variant="sub">Reports</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon icon="bi:calendar" />
                  Calendar
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon icon="bi:people" />
                  Team
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon icon="bi:gear" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarBody>
        <SidebarFooter>
          <SidebarMenu>
            <Suspense fallback={<Skeleton className="h-12" />}>
              <NavUser />
            </Suspense>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger />
          <span className="mr-auto">Page title</span>
          <LangSelector />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

async function NavUser() {
  const user = await enforceAuthenticatedUser();
  const profile = await getUserProfileUseCase(user.id);
  const billing = `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!}?prefilled_email=${encodeURIComponent(user.email)}`;

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={profile.avatar ?? ''} alt={profile.name} />
              <AvatarFallback className="rounded-lg">
                {profile.name.charAt(0) + (profile.surname ? profile.surname.charAt(0) : '')}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{`${profile.name} ${profile.surname}`}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <Icon icon="mdi:dots-vertical" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          alignOffset={-4}>
          <ToggleTheme />
          <DropdownMenuSeparator />
          <BillingLink portalLink={billing} />
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
