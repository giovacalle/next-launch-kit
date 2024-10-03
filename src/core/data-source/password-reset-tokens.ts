import { eq } from 'drizzle-orm';

import { PASSWORD_RESET_TOKEN_EXPIRES_IN, PASSWORD_RESET_TOKEN_LENGTH } from '@/core/consts';
import { UserId } from '@/core/types';
import { generateRandomToken } from '@/core/utils';
import { db } from '@/db/config';
import { passwordResetTokensTable } from '@/db/schema';

export async function createPasswordResetToken(userId: UserId) {
  const token = await generateRandomToken(PASSWORD_RESET_TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_EXPIRES_IN);

  await db
    .insert(passwordResetTokensTable)
    .values({
      user_id: userId,
      token,
      expires_at: expiresAt
    })
    .onConflictDoUpdate({
      target: passwordResetTokensTable.user_id,
      set: {
        token,
        expires_at: expiresAt
      }
    });

  return token;
}

export async function getPasswordResetToken(token: string) {
  const verificationToken = await db.query.passwordResetTokensTable.findFirst({
    where: eq(passwordResetTokensTable.token, token)
  });
  return verificationToken;
}

export async function deletePasswordResetToken(token: string, tx = db) {
  await tx.delete(passwordResetTokensTable).where(eq(passwordResetTokensTable.token, token));
}
