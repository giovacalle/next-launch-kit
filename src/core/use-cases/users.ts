import { sendEmail } from '@/lib/email';

import { applicationName } from '@/core/consts';
import {
  deleteVerifyEmailToken,
  getVerifyEmailToken,
  upsertEmailVerificationToken
} from '@/core/data-source/email-verification-tokens';
import { upsertMagicLink } from '@/core/data-source/magic-links';
import {
  deletePasswordResetToken,
  getPasswordResetToken,
  upsertPasswordResetToken
} from '@/core/data-source/password-reset-tokens';
import { deleteSessionsByUserId } from '@/core/data-source/sessions';
import { createUser, getUserByEmail, getUserById } from '@/core/data-source/users';
import { createUserProfile } from '@/core/data-source/users-profile';
import {
  createUserProviderWithCredentials,
  createUserProviderWithGoogle,
  createUserProviderWithMagicLink,
  getUserProvider,
  updatePassword,
  updateUserProvider,
  verifyPassword
} from '@/core/data-source/users-providers';
import { GoogleUser } from '@/core/types';
import { UserId } from '@/core/types';
import { dbTransaction } from '@/core/utils';
import MagicLinkEmail from '@/emails/magic-link';
import ResetPasswordEmail from '@/emails/reset-password';
import VerifyEmail from '@/emails/verify-email';

export async function getUserByIdUseCase(userId: UserId) {
  return await getUserById(userId);
}

export async function createUserWithCredentialsUseCase(
  email: string,
  password: string,
  name: string,
  surname: string
) {
  let user = await getUserByEmail(email);
  if (!user) user = await createUser(email);

  const provider = await getUserProvider(user.id, 'credentials');
  if (provider) throw new Error('Impossible to create user with these credentials');
  await createUserProviderWithCredentials(user.id, password);

  await createUserProfile(user.id, name, surname);

  const token = await upsertEmailVerificationToken(user.id);
  await sendEmail(email, `Verify your email for ${applicationName}`, VerifyEmail({ token }));

  return { id: user.id };
}

export async function createUserWithMagicLinkUseCase(email: string) {
  let user = await getUserByEmail(email);
  if (!user) user = await createUser(email);

  await createUserProviderWithMagicLink(user.id);

  await createUserProfile(user.id, 'Guest', 'Magic link');

  const token = await upsertMagicLink(user.id);
  await sendEmail(email, `Your magic login link for ${applicationName}`, MagicLinkEmail({ token }));

  return { id: user.id };
}

export async function createUserWithGoogleUseCase(googleUser: GoogleUser) {
  let user = await getUserByEmail(googleUser.email);
  if (!user) user = await createUser(googleUser.email);

  await createUserProviderWithGoogle(user.id, googleUser.sub);

  await createUserProfile(
    user.id,
    googleUser.given_name,
    googleUser.family_name,
    googleUser.picture
  );

  return { id: user.id };
}

export async function verifyEmailUseCase(token: string) {
  const verificationToken = await getVerifyEmailToken(token);

  if (!verificationToken) throw new Error('Invalid token');

  if (verificationToken.expires_at < new Date()) {
    // since token is expired, we need to send a new one (otherwise, the user will not be able to access the app)
    const user = await getUserById(verificationToken.user_id);
    if (!user) throw new Error('Impossible to re-send verification email');

    const newToken = await upsertEmailVerificationToken(user.id);
    await sendEmail(
      user.email,
      `Verify your email for ${applicationName}`,
      VerifyEmail({ token: newToken })
    );

    throw new Error('Token expired');
  }

  await updateUserProvider(verificationToken.user_id, 'credentials', { verified_at: new Date() });
  await deleteVerifyEmailToken(token);

  return verificationToken.user_id;
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) throw new Error('Email/password not valid or not verified (check your email)');

  const provider = await getUserProvider(user.id, 'credentials');
  if (!provider || !provider.verified_at)
    throw new Error('Email/password not valid or not verified (check your email)');

  const isPasswordValid = await verifyPassword(provider.password_hash!, password);

  if (!isPasswordValid)
    throw new Error('Email/password not valid or not verified (check your email)');

  return { id: user.id };
}

export async function resetPasswordUseCase(email: string) {
  const user = await getUserByEmail(email);

  if (!user) return null;

  const token = await upsertPasswordResetToken(user.id);

  await sendEmail(
    email,
    `Reset your password for ${applicationName}`,
    ResetPasswordEmail({ token })
  );
}

export async function changePasswordUseCase(token: string, password: string) {
  const passwordResetToken = await getPasswordResetToken(token);

  if (!passwordResetToken) throw new Error('Invalid token or expired');

  if (passwordResetToken.expires_at < new Date()) throw new Error('Token expired');

  await dbTransaction(async tx => {
    await deletePasswordResetToken(token, tx);
    await updatePassword(passwordResetToken.user_id, password, tx);
    await deleteSessionsByUserId(passwordResetToken.user_id, tx);
  });
}
