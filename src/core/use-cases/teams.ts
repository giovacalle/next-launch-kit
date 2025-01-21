import { createTeam, getTeamUsageByManagerId } from '@/core/data-source/teams';
import { UserId } from '@/core/types';

export async function getTeamUsageByManagerIdUseCase(managerId: UserId) {
  const teamUsage = await getTeamUsageByManagerId(managerId);
  if (!teamUsage) return { rooms: [], equipment: [], members: [] };

  return {
    rooms: teamUsage.assets.filter(asset => asset.type === 'room'),
    equipment: teamUsage.assets.filter(asset => asset.type === 'equipment'),
    members: teamUsage.members
  };
}

export async function createTeamUseCase(managerId: UserId) {
  const team = await createTeam(managerId);
  return { id: team.id };
}
