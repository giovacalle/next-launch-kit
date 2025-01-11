import { addHoneyPot } from '@/utils/forms';

import { z } from 'zod';

export const signInWithMagicLinkSchema = addHoneyPot(
  z.object({
    email: z.string().email('Email not valid')
  })
);

export type SignInWithMagicLinkSchema = z.infer<typeof signInWithMagicLinkSchema>;
