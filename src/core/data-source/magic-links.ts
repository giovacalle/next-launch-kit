import { eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { generateRandomToken } from '@/core/utils';
import { db } from '@/db/config';
import { magicLinksTable } from '@/db/schema';

import { MAGIC_LINK_TOKEN_EXPIRES_IN, MAGIC_LINK_TOKEN_LENGTH } from '../consts';

export async function createMagicLink(userId: UserId) {
  const token = await generateRandomToken(MAGIC_LINK_TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + MAGIC_LINK_TOKEN_EXPIRES_IN);

  await db
    .insert(magicLinksTable)
    .values({
      user_id: userId,
      token,
      expires_at: expiresAt
    })
    .onConflictDoUpdate({
      target: magicLinksTable.user_id,
      set: {
        token,
        expires_at: expiresAt
      }
    });

  return token;
}

export async function getMagicLink(token: string) {
  const magicLink = await db.query.magicLinksTable.findFirst({
    where: eq(magicLinksTable.token, token)
  });
  return magicLink;
}

export async function deleteMagicLink(token: string) {
  await db.delete(magicLinksTable).where(eq(magicLinksTable.token, token));
}

export async function updateUsedAt(token: string, tx = db) {
  await tx
    .update(magicLinksTable)
    .set({ used_at: new Date() })
    .where(eq(magicLinksTable.token, token));
}
