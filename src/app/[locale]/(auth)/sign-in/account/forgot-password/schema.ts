import { addHoneyPot } from '@/utils/forms';

import { z } from 'zod';

export const forgotPasswordSchema = addHoneyPot(
  z.object({
    email: z.string().email('notValid')
  })
);

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
