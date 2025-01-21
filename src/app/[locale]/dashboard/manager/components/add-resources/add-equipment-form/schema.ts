import { addHoneyPot } from '@/utils/forms';

import { z } from 'zod';

export const equipmentSchema = addHoneyPot(
  z.object({
    name: z.string().min(3, 'minLength3'),
    model: z.string().nullable()
  })
);

export type EquipmentSchema = z.infer<typeof equipmentSchema>;
