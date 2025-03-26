'use client';

import { CSSProperties, ComponentPropsWithRef, ReactNode, useEffect } from 'react';

import { cn } from '@/lib/tailwind';

import { Icon } from '@iconify/react';
import { Slot } from '@radix-ui/react-slot';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { VariantProps, tv } from 'tailwind-variants';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

import { SidebarProvider, useSidebarContext } from './sidebar-context';

function Sidebar({ children }: { children: ReactNode }) {
  const { open, setOpen, sidebar, isMobile } = useSidebarContext();

  // reset open state if switch to mobile
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile, setOpen]);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={state => setOpen(state)}>
        <SheetContent
          data-sidebar="sidebar"
          side="left"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden!"
          style={{ '--sidebar-width': sidebar.width } as CSSProperties}>
          <VisuallyHidden>
            <SheetTitle>Sidebar</SheetTitle>
          </VisuallyHidden>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="group peer hidden md:block" data-offscreen={open ? 'false' : 'true'}>
      {/* this create the gap between the sidebar and the content */}
      <div
        className={cn(
          'relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[offscreen=true]:w-0'
        )}
      />
      {/* actual sidebar */}
      <div
        data-sidebar="sidebar"
        className={cn(
          'bg-sidebar fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) flex-col transition-[left,right,width] duration-200 ease-linear md:flex',
          'left-0 group-data-[offscreen=true]:left-[calc(var(--sidebar-width)*-1)]'
        )}>
        {children}
      </div>
    </aside>
  );
}
Sidebar.displayName = 'Sidebar';

type SidebarTriggerProps = ComponentPropsWithRef<typeof Button>;
function SidebarTrigger({ onClick, ...props }: SidebarTriggerProps) {
  const { open, setOpen } = useSidebarContext();

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="round"
      onClick={e => {
        onClick?.(e);
        setOpen(!open);
      }}
      {...props}>
      <Icon icon={open ? 'lucide:sidebar-close' : 'lucide:sidebar-open'} />
    </Button>
  );
}
SidebarTrigger.displayName = 'SidebarTrigger';

function SidebarHeader({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div data-sidebar="header" className={cn('flex flex-col gap-2 p-5', className)} {...props}>
      {children}
    </div>
  );
}

function SidebarBody({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      data-sidebar="body"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto overflow-x-hidden px-3',
        className
      )}
      {...props}>
      {children}
    </div>
  );
}

function SidebarGroup({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col', className)}
      {...props}>
      {children}
    </div>
  );
}
SidebarGroup.displayName = 'SidebarGroup';

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: ComponentPropsWithRef<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-sidebar="group-label"
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex shrink-0 items-center rounded-md p-2 text-xs font-medium outline-hidden transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
      {...props}
    />
  );
}
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const sidebarMenuVariants = tv({
  base: 'flex w-full min-w-0 flex-col gap-1',
  variants: {
    variant: {
      default: '',
      sub: 'border-sidebar-border ml-3.5 translate-x-px border-l px-2.5 py-0.5'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

function SidebarMenu({
  children,
  className,
  variant = 'default',
  ...props
}: ComponentPropsWithRef<'ul'> & VariantProps<typeof sidebarMenuVariants>) {
  const dataSidebar = variant === 'sub' ? 'sub-menu' : 'menu';

  return (
    <ul
      data-sidebar={dataSidebar}
      className={cn(sidebarMenuVariants({ variant }), className)}
      {...props}>
      {children}
    </ul>
  );
}
SidebarMenu.displayName = 'SidebarMenu';

function SidebarMenuItem({
  children,
  className,
  sub = false,
  ...props
}: ComponentPropsWithRef<'li'> & { sub?: boolean }) {
  const dataSidebar = sub ? 'sub-menu-item' : 'menu-item';

  return (
    <li data-sidebar={dataSidebar} className={cn('relative', className)} {...props}>
      {children}
    </li>
  );
}
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = tv({
  base: 'ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  variants: {
    variant: {
      default: '',
      sub: 'text-sidebar-foreground translate-x-px py-1'
    },
    size: {
      default: 'text-sm',
      small: 'text-xs'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

function SidebarMenuButton({
  children,
  className,
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  ...props
}: ComponentPropsWithRef<'button'> & { asChild?: boolean; isActive?: boolean } & VariantProps<
    typeof sidebarMenuButtonVariants
  >) {
  const Comp = asChild ? Slot : 'button';
  const dataSidebar = variant === 'sub' ? 'sub-menu-button' : 'menu-button';

  return (
    <Comp
      data-sidebar={dataSidebar}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}>
      {children}
    </Comp>
  );
}
SidebarMenuButton.displayName = 'SideBarMenuButton';

function SidebarFooter({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 px-3 pb-5', className)}
      {...props}>
      {children}
    </div>
  );
}

type SidebarInsetProps = ComponentPropsWithRef<'div'>;
function SidebarInset({ children, ...props }: SidebarInsetProps) {
  return (
    <div
      data-sidebar="inset"
      className="bg-background relative flex min-h-svh flex-1 flex-col"
      {...props}>
      {children}
    </div>
  );
}
SidebarInset.displayName = 'SidebarInset';

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset
};
