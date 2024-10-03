import { eq } from 'drizzle-orm';

import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { sessionsTable } from '@/db/schema';

export async function deleteSessionsByUserId(userId: UserId, tx = db) {
  await tx.delete(sessionsTable).where(eq(sessionsTable.userId, userId));
}
