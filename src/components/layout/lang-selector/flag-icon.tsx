import { Icon } from '@iconify/react';

import { Locale } from '@/i18n/routing';

export function FlagIcon({ code }: { code: Locale }) {
  return <Icon icon={`circle-flags:${code}`} width={30} height={30} className="shrink-0" />;
}
