import { addHoneyPot } from '@/lib/zod';

import { z } from 'zod';

export const signUpSchema = addHoneyPot(
  z.object({
    name: z.string().min(3, 'minLength3'),
    surname: z.string().min(3, 'minLength3'),
    email: z.string().email('notValid'),
    password: z.string().min(6, 'minLength6')
  })
);

export type SignUpSchema = z.infer<typeof signUpSchema>;
