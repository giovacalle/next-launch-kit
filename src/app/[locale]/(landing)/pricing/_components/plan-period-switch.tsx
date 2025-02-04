'use client';

import { useTranslations } from 'next-intl';
import { memo } from 'react';

import { Switch } from '@/components/ui/switch';

type PlanPeriodSwitchProps = {
  onChange: (isYearly: boolean) => void;
};

function Component({ onChange }: PlanPeriodSwitchProps) {
  const t = useTranslations('pages.pricing');

  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium">
      <span>{t('monthly')}</span>
      <Switch onCheckedChange={onChange} defaultChecked />
      <span>{t('yearly')}</span>
    </div>
  );
}

export const PlanPeriodSwitch = memo(Component);
