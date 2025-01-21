'use server';

import { createTeamEquipmentUseCase } from '@/core/use-cases/teams-assets';

import { authenticatedAction } from '@/lib/action-procedures';
import { rateLimitByKey } from '@/lib/rate-limit';

import { equipmentSchema } from './schema';

export const addEquipmentAction = authenticatedAction
  .createServerAction()
  .input(equipmentSchema)
  .handler(async ({ input, ctx }) => {
    await rateLimitByKey({ key: 'add-assets', limit: 3, interval: 10000 });
    await createTeamEquipmentUseCase(ctx.user.id, input.name, {
      model: input.model?.trim() === '' ? null : input.model
    });
  });
