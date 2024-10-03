import { z } from 'zod';

import { addHoneyPot } from '@/utils/forms';

export const resetPasswordSchema = addHoneyPot(
  z.object({
    token: z.string({ required_error: 'Token is required' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
  })
).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
