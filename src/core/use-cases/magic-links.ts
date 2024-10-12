import { dbTransaction } from '@/core//utils';
import { deleteMagicLink, getMagicLink, updateUsedAt } from '@/core/data-source/magic-links';

import { updateUserProvider } from '../data-source/users-providers';

export async function signInUseCase(token: string) {
  const magicLink = await getMagicLink(token);

  if (!magicLink) throw new Error('Invalid magic link or expired');

  if (magicLink.expires_at < new Date()) throw new Error('Magic link expired');

  if (magicLink.used_at) throw new Error('Magic link already used');

  await dbTransaction(
    async tx => {
      await updateUsedAt(token, tx);
    },
    {
      isolationLevel: 'serializable'
    }
  );

  await updateUserProvider(magicLink.user_id, 'credentials', { verified_at: new Date() });
  await deleteMagicLink(token);

  return { id: magicLink.user_id };
}
