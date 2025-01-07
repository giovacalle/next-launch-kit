'use client';

import { useTranslations } from 'next-intl';
import { memo, useState } from 'react';

type PlanPeriodSwitchProps = {
  onChange: (isYearly: boolean) => void;
};

function Component({ onChange }: PlanPeriodSwitchProps) {
  const t = useTranslations('pages.pricing');

  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="mt-12 flex justify-center">
      <div className="relative flex items-center">
        <span className="mr-3 text-sm font-medium text-gray-900">{t('monthly')}</span>
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isYearly ? 'bg-primary' : 'bg-gray-200'
          }`}
          onClick={() => {
            setIsYearly(!isYearly);
            onChange(!isYearly);
          }}>
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isYearly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span className="ml-3 text-sm font-medium text-gray-900">{t('yearly')}</span>
      </div>
    </div>
  );
}

export const PlanPeriodSwitch = memo(Component);
