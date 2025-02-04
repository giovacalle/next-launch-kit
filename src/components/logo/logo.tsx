import { ComponentProps } from 'react';

import { applicationName } from '@/core/consts';

import { cn } from '@/lib/tailwind';

import { Icon } from '@iconify/react';

import { Link } from '@/i18n/routing';

export function Logo({ className }: Partial<ComponentProps<typeof Link>>) {
  return (
    <Link
      href="/"
      className={cn('inline-flex flex-nowrap items-center gap-1 text-lg font-bold', className)}>
      <Icon icon="material-symbols:rocket-launch" width={20} height={20} className="shrink-0" />
      <span>{applicationName}</span>
    </Link>
  );
}
