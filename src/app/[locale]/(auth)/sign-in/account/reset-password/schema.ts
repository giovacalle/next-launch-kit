import { addHoneyPot } from '@/utils/forms';

import { z } from 'zod';

export const resetPasswordSchema = addHoneyPot(
  z.object({
    token: z.string({ required_error: 'Token is required' }),
    password: z.string().min(6, 'minLength6'),
    confirmPassword: z.string().min(6, 'minLength6')
  })
).refine(data => data.password === data.confirmPassword, {
  message: 'mustMatch',
  path: ['confirmPassword']
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
