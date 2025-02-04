import { addHoneyPot } from '@/lib/zod';

import { z } from 'zod';

export const forgotPasswordSchema = addHoneyPot(
  z.object({
    email: z.string().email('notValid')
  })
);

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
