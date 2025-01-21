import { createTeam, getTeamByManagerId } from '@/core/data-source/teams';
import {
  createTeamEquipment,
  createTeamRoom,
  getTeamEquipmentByTeamId,
  getTeamRoomsByTeamId
} from '@/core/data-source/teams-assets';
import { EquipmentMetadata, ExceededPlanLimitError, RoomMetadata, UserId } from '@/core/types';
import { getUserPlanUsageLimitsUseCase } from '@/core/use-cases/subscriptions';
import { Team } from '@/db/schema';

export async function createTeamEquipmentUseCase(
  managerId: UserId,
  name: string,
  metadata: EquipmentMetadata
) {
  let team = await getTeamByManagerId(managerId);
  await enforceTeamEquipmentAvailabilityUseCase(team);

  if (!team) team = await createTeam(managerId);
  return await createTeamEquipment(team.id, name, metadata);
}

export async function createTeamRoomUseCase(
  managerId: UserId,
  name: string,
  metadata: RoomMetadata
) {
  let team = await getTeamByManagerId(managerId);
  await enforceTeamRoomsAvailabilityUseCase(team);

  if (!team) team = await createTeam(managerId);
  return await createTeamRoom(team.id, name, metadata);
}

export async function enforceTeamEquipmentAvailabilityUseCase(team: Team | undefined) {
  if (!team) return;

  const planLimits = await getUserPlanUsageLimitsUseCase(team.manager_id);
  const equipment = await getTeamEquipmentByTeamId(team.id);

  if (equipment.length >= planLimits.equipment) throw new ExceededPlanLimitError();
}

export async function enforceTeamRoomsAvailabilityUseCase(team: Team | undefined) {
  if (!team) return;

  const planLimits = await getUserPlanUsageLimitsUseCase(team.manager_id);
  const rooms = await getTeamRoomsByTeamId(team.id);

  if (rooms.length >= planLimits.rooms) throw new ExceededPlanLimitError();
}
