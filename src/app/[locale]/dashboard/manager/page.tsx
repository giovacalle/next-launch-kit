import { getTranslations } from 'next-intl/server';

import { getUserPlanUsageLimitsUseCase } from '@/core/use-cases/subscriptions';
import { getTeamUsageByManagerIdUseCase } from '@/core/use-cases/teams';

import { enforceAuthenticatedUser } from '@/lib/auth';

import * as DashboardShell from '../components/dashboard-shell';
import * as Kpis from '../components/kpis';
import { AddResources } from './components/add-resources/add-resources';
import { InviteMember } from './components/invite-member';

export default async function Dashboard() {
  const t = await getTranslations('pages');

  const user = await enforceAuthenticatedUser();

  const userPlanLimits = await getUserPlanUsageLimitsUseCase(user.id);
  const teamUsage = await getTeamUsageByManagerIdUseCase(user.id);

  return (
    <DashboardShell.Root>
      <DashboardShell.Header
        title={t('dashboard.title', { role: 'Manager' })}
        subtitle={t('dashboard.manager.subtitle')}>
        <div className="flex gap-2">
          <AddResources
            canAddEquipment={teamUsage.equipment.length < userPlanLimits.equipment}
            canAddRooms={teamUsage.rooms.length < userPlanLimits.rooms}
          />
          <InviteMember />
        </div>
      </DashboardShell.Header>
      <span className="hidden">Manager: {user.email}</span>
      <Kpis.Root>
        <Kpis.Kpi
          title="Rooms"
          value={teamUsage.rooms.length}
          limit={userPlanLimits.rooms}
          icon="mdi:door"
        />
        <Kpis.Kpi
          title="Equipment"
          value={teamUsage.equipment.length}
          limit={userPlanLimits.equipment}
          icon="material-symbols:computer-outline-rounded"
        />
        <Kpis.Kpi
          title="Members"
          value={teamUsage.members.length}
          limit={userPlanLimits.members}
          icon="mdi:account-group"
        />
      </Kpis.Root>
      <Kpis.Root className="md:grid-cols-2 lg:grid-cols-7">
        <Kpis.Preview
          title="Total resources"
          description="Total resources in the system"
          className="lg:col-span-3">
          LIST
        </Kpis.Preview>
        <Kpis.Preview
          title="Total members"
          description="Total members in the system"
          className="lg:col-span-4">
          LIST
        </Kpis.Preview>
      </Kpis.Root>
    </DashboardShell.Root>
  );
}
