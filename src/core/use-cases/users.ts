import { applicationName } from '@/core/consts';
import { createEmailVerificationToken } from '@/core/data-source/email-verification-tokens';
import { createUserWithCredentials, getUserByEmail } from '@/core/data-source/users';
import { createUserProfile } from '@/core/data-source/users-profile';
import VerifyEmail from '@/emails/verify-email';
import { sendEmail } from '@/lib/email';

export const createUserWithCredentialsUseCase = async (
  email: string,
  password: string,
  name: string,
  surname: string
) => {
  const user = await getUserByEmail(email);

  if (user) throw new Error('Impossible to create user with credentials');

  const newUser = await createUserWithCredentials(email, password);
  if (!newUser) throw new Error('Something went wrong');

  await createUserProfile(newUser.id, name, surname);

  const token = await createEmailVerificationToken(newUser.id);

  await sendEmail(email, `Verify your email for ${applicationName}`, VerifyEmail({ token }));

  return { id: newUser.id };
};
