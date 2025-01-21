import { ComponentProps } from 'react';

import { cn } from '@/lib/tailwind';

function DashboardShell({ children, className, ...rest }: ComponentProps<'div'>) {
  return (
    <div className={cn('min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8', className)} {...rest}>
      <div className="container mx-auto flex flex-col gap-6">{children}</div>
    </div>
  );
}

type HeaderProps = ComponentProps<'header'> & {
  title: string;
  subtitle: string;
};
function Header({ children, className, title, subtitle, ...rest }: HeaderProps) {
  return (
    <header
      className={cn('flex items-center justify-between gap-2 max-sm:flex-col', className)}
      {...rest}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-black md:text-3xl">{title}</h1>
        <h2 className="text-lg text-gray-400 md:text-xl">{subtitle}</h2>
      </div>
      {children}
    </header>
  );
}

export { DashboardShell as Root, Header };
