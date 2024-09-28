import { z } from 'zod';

import { addHoneyPot } from '@/utils/forms';

export const signUpSchema = addHoneyPot(
  z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    surname: z.string().min(3, 'Surname must be at least 3 characters'),
    email: z.string().email('Email not valid'),
    password: z.string({}).min(6, 'Password must be at least 6 characters')
  })
);

export type SignUpSchema = z.infer<typeof signUpSchema>;
