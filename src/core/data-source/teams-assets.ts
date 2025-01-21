import { EquipmentMetadata, RoomMetadata } from '@/core/types';
import { db } from '@/db/config';
import { teamsAssetsTable } from '@/db/schema';

import { and, eq } from 'drizzle-orm';

export async function getTeamEquipmentByTeamId(teamId: number) {
  return await db.query.teamsAssetsTable.findMany({
    where: and(eq(teamsAssetsTable.team_id, teamId), eq(teamsAssetsTable.type, 'equipment'))
  });
}

export async function getTeamRoomsByTeamId(teamId: number) {
  return await db.query.teamsAssetsTable.findMany({
    where: and(eq(teamsAssetsTable.team_id, teamId), eq(teamsAssetsTable.type, 'room'))
  });
}

export async function createTeamEquipment(
  teamId: number,
  name: string,
  metadata: EquipmentMetadata
) {
  const [equipment] = await db
    .insert(teamsAssetsTable)
    .values({
      team_id: teamId,
      name,
      type: 'equipment',
      metadata
    })
    .returning();
  return equipment;
}

export async function createTeamRoom(teamId: number, name: string, metadata: RoomMetadata) {
  const [room] = await db
    .insert(teamsAssetsTable)
    .values({
      team_id: teamId,
      name,
      type: 'room',
      metadata
    })
    .returning();
  return room;
}
