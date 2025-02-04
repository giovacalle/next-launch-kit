import { addHoneyPot } from '@/lib/zod';

import { z } from 'zod';

export const signInWithMagicLinkSchema = addHoneyPot(
  z.object({
    email: z.string().email('notValid')
  })
);

export type SignInWithMagicLinkSchema = z.infer<typeof signInWithMagicLinkSchema>;
