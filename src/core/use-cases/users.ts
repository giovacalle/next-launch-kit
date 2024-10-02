import { applicationName } from '@/core/consts';
import {
  createEmailVerificationToken,
  deleteVerifyEmailToken,
  getVerifyEmailToken
} from '@/core/data-source/email-verification-tokens';
import {
  createUserWithCredentials,
  getUserByEmail,
  getUserById,
  updateUser,
  verifyPassword
} from '@/core/data-source/users';
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

  if (verificationToken.expires_at < new Date()) {
    // since token is expired, we need to send a new one (otherwise, the user will not be able to access the app)
    const user = await getUserById(verificationToken.user_id);
    if (!user) throw new Error('Impossible to re-send verification email');
    if (user.verified_at) throw new Error('User already verified');

    const token = await createEmailVerificationToken(user.id);
    await sendEmail(user.email, `Verify your email for ${applicationName}`, VerifyEmail({ token }));

    throw new Error('Token expired');
  }

  await updateUser(verificationToken.user_id, { verified_at: new Date() });
  await deleteVerifyEmailToken(token);

  return verificationToken.user_id;
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) throw new Error('Email/password not valid or not verified (check your email)');

  if (!user.verified_at)
    throw new Error('Email/password not valid or not verified (check your email)');

  const isPasswordValid = await verifyPassword(password, user.password_hash!);

  if (!isPasswordValid)
    throw new Error('Email/password not valid or not verified (check your email)');

  return { id: user.id };
}
