import { dbTransaction } from '@/core//utils';
import { deleteMagicLink, getMagicLink, updateUsedAt } from '@/core/data-source/magic-links';
import { updateUser } from '@/core/data-source/users';

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
  await updateUser(magicLink.user_id, { verified_at: new Date() });
  await deleteMagicLink(token);

  return { id: magicLink.user_id };
}
