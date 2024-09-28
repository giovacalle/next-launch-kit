import {
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
  EMAIL_VERIFICATION_TOKEN_LENGTH
} from '@/core/consts';
import { UserId } from '@/core/types';
import { generateRandomToken } from '@/core/utils';
import { db } from '@/db/config';
import { emailVerificationTokens } from '@/db/schema';

export const createEmailVerificationToken = async (userId: UserId) => {
  const token = await generateRandomToken(EMAIL_VERIFICATION_TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_EXPIRES_IN);

  await db
    .insert(emailVerificationTokens)
    .values({
      user_id: userId,
      token,
      expires_at: expiresAt
    })
    .onConflictDoUpdate({
      target: emailVerificationTokens.user_id,
      set: {
        token,
        expires_at: expiresAt
      }
    });

  return token;
};
