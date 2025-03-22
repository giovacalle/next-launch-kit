import { Messages, NestedKeyOf } from 'next-intl';

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
export type Plan = {
  id: SubscriptionPlan;
  priceMonthly: { id: string; value: number };
  priceYearly: { id: string; value: number };
  highlight?: boolean;
};

export type i18nErrorCode = NestedKeyOf<Messages['common']['errors']['codes']>;
export class i18nError extends Error {
  code: i18nErrorCode;

  constructor(code: i18nErrorCode, message: string) {
    super(`${code}: ${message}`); // this is useful for debugging (error.tsx app router)
    this.code = code;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class RateLimitError extends i18nError {
  constructor(message = 'Rate limit exceeded') {
    super('rateLimit', message);
  }
}

export class SendingEmailError extends i18nError {
  constructor(message = 'Error sending email') {
    super('sendingEmail', message);
  }
}

export class AuthenticationError extends i18nError {
  constructor(message = 'Not authenticated') {
    super('notAuthenticated', message);
  }
}

export class TokenError extends i18nError {
  constructor(
    code: 'invalidToken' | 'invalidTokenAndResend' = 'invalidToken',
    message = 'Invalid token'
  ) {
    super(code, message);
  }
}

export class CredentialsError extends i18nError {
  constructor(message = 'Invalid credentials') {
    super('invalidCredentials', message);
  }
}

export class ExceededPlanLimitError extends i18nError {
  constructor(message = 'Exceeded plan limit') {
    super('exceededPlanLimit', message);
  }
}
