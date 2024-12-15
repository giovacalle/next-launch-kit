import { z } from 'zod';

import { addHoneyPot } from '@/utils/forms';

export const signInSchema = addHoneyPot(
  z.object({
    email: z.string().email('Email not valid'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
);

export type SignInSchema = z.infer<typeof signInSchema>;
