import { UserId as LuciaUserId } from 'lucia';

export type UserId = LuciaUserId;

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
