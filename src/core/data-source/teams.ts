import { UserId } from '@/core/types';
import { db } from '@/db/config';
import { teamsTable } from '@/db/schema';

import { eq } from 'drizzle-orm';

export async function getTeamByManagerId(managerId: UserId) {
  return await db.query.teamsTable.findFirst({
    where: eq(teamsTable.manager_id, managerId)
  });
}

export async function getTeamUsageByManagerId(managerId: UserId) {
  return await db.query.teamsTable.findFirst({
    where: eq(teamsTable.manager_id, managerId),
    with: {
      assets: true,
      members: true
    }
  });
}

export async function createTeam(managerId: UserId) {
  const [team] = await db
    .insert(teamsTable)
    .values({
      manager_id: managerId
    })
    .onConflictDoNothing()
    .returning();
  return team;
}
