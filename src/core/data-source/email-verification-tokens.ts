import { eq } from 'drizzle-orm';

import {
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
  EMAIL_VERIFICATION_TOKEN_LENGTH
} from '@/core/consts';
import { UserId } from '@/core/types';
import { generateRandomToken } from '@/core/utils';
import { db } from '@/db/config';
import { emailVerificationTokensTable } from '@/db/schema';

export async function createEmailVerificationToken(userId: UserId) {
  const token = await generateRandomToken(EMAIL_VERIFICATION_TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_EXPIRES_IN);

  await db
    .insert(emailVerificationTokensTable)
    .values({
      user_id: userId,
      token,
      expires_at: expiresAt
    })
    .onConflictDoUpdate({
      target: emailVerificationTokensTable.user_id,
      set: {
        token,
        expires_at: expiresAt
      }
    });

  return token;
}

export async function getVerifyEmailToken(token: string) {
  const verificationToken = await db.query.emailVerificationTokensTable.findFirst({
    where: eq(emailVerificationTokensTable.token, token)
  });
  return verificationToken;
}

export async function deleteVerifyEmailToken(token: string) {
  await db
    .delete(emailVerificationTokensTable)
    .where(eq(emailVerificationTokensTable.token, token));
}
