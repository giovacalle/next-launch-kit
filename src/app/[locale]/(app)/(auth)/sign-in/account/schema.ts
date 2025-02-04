import { addHoneyPot } from '@/lib/zod';

import { z } from 'zod';

export const signInSchema = addHoneyPot(
  z.object({
    email: z.string().email('notValid'),
    password: z.string().min(6, 'minLength6')
  })
);

export type SignInSchema = z.infer<typeof signInSchema>;
