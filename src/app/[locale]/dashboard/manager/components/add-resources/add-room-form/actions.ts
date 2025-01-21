'use server';

import { createTeamRoomUseCase } from '@/core/use-cases/teams-assets';

import { authenticatedAction } from '@/lib/action-procedures';
import { rateLimitByKey } from '@/lib/rate-limit';

import { roomSchema } from './schema';

export const addRoomAction = authenticatedAction
  .createServerAction()
  .input(roomSchema)
  .handler(async ({ input, ctx }) => {
    await rateLimitByKey({ key: 'add-assets', limit: 3, interval: 10000 });
    await createTeamRoomUseCase(ctx.user.id, input.name, {
      capacity: input.capacity,
      location: input.location?.trim() === '' ? null : input.location
    });
  });
