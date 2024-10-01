import { applicationName } from '@/core/consts';
import {
  createEmailVerificationToken,
  deleteVerifyEmailToken,
  getVerifyEmailToken
} from '@/core/data-source/email-verification-tokens';
import { createUserWithCredentials, getUserByEmail, updateUser } from '@/core/data-source/users';
import { createUserProfile } from '@/core/data-source/users-profile';
import VerifyEmail from '@/emails/verify-email';
import { sendEmail } from '@/lib/email';

export async function createUserWithCredentialsUseCase(
  email: string,
  password: string,
  name: string,
  surname: string
) {
  const user = await getUserByEmail(email);

  if (user) throw new Error('Impossible to create user with credentials');

  const newUser = await createUserWithCredentials(email, password);
  if (!newUser) throw new Error('Something went wrong');

  await createUserProfile(newUser.id, name, surname);

  const token = await createEmailVerificationToken(newUser.id);

  await sendEmail(email, `Verify your email for ${applicationName}`, VerifyEmail({ token }));

  return { id: newUser.id };
}

export async function verifyEmailUseCase(token: string) {
  const verificationToken = await getVerifyEmailToken(token);

  if (!verificationToken) throw new Error('Invalid token');

  if (verificationToken.expires_at < new Date()) throw new Error('Token expired');

  await updateUser(verificationToken.user_id, { verified_at: new Date() });
  await deleteVerifyEmailToken(token);

  return verificationToken.user_id;
}
