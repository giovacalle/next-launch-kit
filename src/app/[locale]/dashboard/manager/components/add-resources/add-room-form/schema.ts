import { addHoneyPot } from '@/utils/forms';

import { z } from 'zod';

export const roomSchema = addHoneyPot(
  z.object({
    name: z.string().min(3, 'minLength3'),
    capacity: z.number().int().positive('positive').min(1, 'minValue1'),
    location: z.string().nullable()
  })
);

export type RoomSchema = z.infer<typeof roomSchema>;
