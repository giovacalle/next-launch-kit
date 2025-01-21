import { SubscriptionPlan } from './types';

export const EMAIL_VERIFICATION_TOKEN_LENGTH = 32;
export const EMAIL_VERIFICATION_TOKEN_EXPIRES_IN = 1000 * 60 * 15; // 15 minutes

export const PASSWORD_RESET_TOKEN_LENGTH = 32;
export const PASSWORD_RESET_TOKEN_EXPIRES_IN = 1000 * 60 * 10; // 10 minutes

export const MAGIC_LINK_TOKEN_LENGTH = 32;
export const MAGIC_LINK_TOKEN_EXPIRES_IN = 1000 * 60 * 10; // 10 minutes

export const applicationName = 'TeamResources';

export const PLAN_LIMITS: Record<
  SubscriptionPlan,
  { rooms: number; equipment: number; members: number }
> = {
  free: {
    rooms: 1,
    equipment: 10,
    members: 5
  },
  basic: {
    rooms: 10,
    equipment: 100,
    members: 40
  },
  premium: {
    rooms: 100,
    equipment: 1000,
    members: 100
  }
};
