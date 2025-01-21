import { useTranslations } from 'next-intl';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';

export function InviteMember() {
  const t = useTranslations('pages.dashboard.manager');

  return (
    <Button>
      <Icon icon="mdi:invite" width={20} height={20} className="shrink-0" />
      {t('inviteMember')}
    </Button>
  );
}
