'use client';

import {
  CSSProperties,
  ComponentPropsWithRef,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { cn } from '@/lib/tailwind';

import useBreakpoint from '@/components/hooks/use-breakpoint';

interface SidebarContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sidebar: { width: string };
  isMobile?: boolean;
}

const SidebarContextDefaultValues: SidebarContextProps = {
  open: false,
  setOpen: () => {},
  sidebar: { width: '240px' },
  isMobile: false
};

const SidebarContext = createContext<SidebarContextProps>(SidebarContextDefaultValues);

type SidebarProviderProps = ComponentPropsWithRef<'div'> & {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sidebarWidth?: string;
};
function SidebarProvider({
  children,
  defaultOpen = false,
  onOpenChange,
  sidebarWidth = SidebarContextDefaultValues.sidebar.width,
  className,
  style,
  ...props
}: SidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const isMobile = useBreakpoint(768);
  const sidebar = useMemo(() => ({ width: sidebarWidth }), [sidebarWidth]);

  useEffect(() => onOpenChange?.(open), [open, onOpenChange]);

  return (
    <SidebarContext data-sidebar="provider" value={{ open, setOpen, sidebar, isMobile }}>
      <div
        className={cn('flex min-h-svh w-full bg-sidebar', className)}
        style={
          {
            '--sidebar-width': sidebarWidth,
            ...style
          } as CSSProperties
        }
        {...props}>
        {children}
      </div>
    </SidebarContext>
  );
}
SidebarProvider.displayName = 'SidebarProvider';

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider');
  return context;
}

export { SidebarProvider, useSidebarContext };
