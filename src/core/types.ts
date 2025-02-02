import { Subscription as SubscriptionDb } from '@/db/schema';

export type UserId = string;

export type GoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};

export type Subscription = Omit<SubscriptionDb, 'created_at'>;
export type SubscriptionPlan = 'free' | 'basic' | 'premium';
