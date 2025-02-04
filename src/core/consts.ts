import { Plan } from './types';

export const EMAIL_VERIFICATION_TOKEN_LENGTH = 32;
export const EMAIL_VERIFICATION_TOKEN_EXPIRES_IN = 1000 * 60 * 15; // 15 minutes

export const PASSWORD_RESET_TOKEN_LENGTH = 32;
export const PASSWORD_RESET_TOKEN_EXPIRES_IN = 1000 * 60 * 10; // 10 minutes

export const MAGIC_LINK_TOKEN_LENGTH = 32;
export const MAGIC_LINK_TOKEN_EXPIRES_IN = 1000 * 60 * 10; // 10 minutes

export const applicationName = 'NextLaunchKit';

export const plans: Plan[] = [
  {
    id: 'free',
    priceMonthly: { id: '-', value: 0 },
    priceYearly: { id: '-', value: 0 }
  },
  {
    id: 'basic',
    priceMonthly: { id: process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTHLY!, value: 2.99 },
    priceYearly: { id: process.env.NEXT_PUBLIC_STRIPE_BASIC_YEARLY!, value: 29.99 },
    highlight: true
  },
  {
    id: 'premium',
    priceMonthly: { id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY!, value: 5.99 },
    priceYearly: { id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY!, value: 59.99 }
  }
];

export const MODE: 'coming-soon' | 'maintenance' | 'live' = (process.env.MODE ?? 'live') as
  | 'coming-soon'
  | 'maintenance'
  | 'live';
