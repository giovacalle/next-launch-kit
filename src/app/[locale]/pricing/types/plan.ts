import { SubscriptionPlan } from '@/core/types';

export type Plan = {
  id: SubscriptionPlan;
  priceMonthly: { id: string; value: number };
  priceYearly: { id: string; value: number };
  href: string;
  highlight?: boolean;
};
