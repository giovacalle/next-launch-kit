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
import { CredentialsError, GoogleUser, TokenError, i18nError } from '@/core/types';
import { UserId } from '@/core/types';
import { dbTransaction } from '@/core/utils';

import { sendEmail } from '@/lib/email';

import MagicLinkEmail from '@/emails/magic-link';
import ResetPasswordEmail from '@/emails/reset-password';
import VerifyEmail from '@/emails/verify-email';
import { Locale } from '@/i18n/routing';

export async function getUserByIdUseCase(userId: UserId) {
  return await getUserById(userId);
}

export async function createUserWithCredentialsUseCase(
  email: string,
  password: string,
  name: string,
  surname: string,
  locale: Locale
) {
  let user = await getUserByEmail(email);
  if (!user) user = await createUser(email);

  const provider = await getUserProvider(user.id, 'credentials');
  if (provider)
    throw new i18nError('badCredentials', 'Impossible to create user with these credentials');
  await createUserProviderWithCredentials(user.id, password);

  await createUserProfile(user.id, name, surname);

  const token = await upsertEmailVerificationToken(user.id);
  await sendEmail(
    email,
    {
      en: `Verify your email for ${applicationName}`,
      it: `Verifica la tua email per ${applicationName}`
    }[locale],
    VerifyEmail({ token, locale })
  );

  return { id: user.id };
}

export async function createUserWithMagicLinkUseCase(email: string, locale: Locale) {
  let user = await getUserByEmail(email);
  if (!user) user = await createUser(email);

  await createUserProviderWithMagicLink(user.id);

  await createUserProfile(user.id, 'Guest', 'Magic link');

  const token = await upsertMagicLink(user.id);
  await sendEmail(
    email,
    {
      en: `Your magic login link for ${applicationName}`,
      it: `Il tuo link magico per accedere a ${applicationName}`
    }[locale],
    MagicLinkEmail({ token, locale })
  );

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

export async function verifyEmailUseCase(token: string, locale: Locale) {
  const verificationToken = await getVerifyEmailToken(token);

  if (!verificationToken) throw new TokenError();

  if (verificationToken.expires_at < new Date()) {
    // since token is expired, we need to send a new one (otherwise, the user will not be able to access the app)
    const user = await getUserById(verificationToken.user_id);
    if (!user) throw new TokenError(); // should never happen

    const newToken = await upsertEmailVerificationToken(user.id);
    await sendEmail(
      user.email,
      {
        en: `Verify your email for ${applicationName}`,
        it: `Verifica la tua email per ${applicationName}`
      }[locale],
      VerifyEmail({ token: newToken, locale })
    );

    throw new TokenError('invalidTokenAndResend');
  }

  await updateUserProvider(verificationToken.user_id, 'credentials', { verified_at: new Date() });
  await deleteVerifyEmailToken(token);

  return verificationToken.user_id;
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) throw new CredentialsError();

  const provider = await getUserProvider(user.id, 'credentials');
  if (!provider || !provider.verified_at) throw new CredentialsError();

  const isPasswordValid = await verifyPassword(provider.password_hash!, password);

  if (!isPasswordValid) throw new CredentialsError();

  return { id: user.id };
}

export async function resetPasswordUseCase(email: string, locale: Locale) {
  const user = await getUserByEmail(email);

  if (!user) return new CredentialsError();

  const token = await upsertPasswordResetToken(user.id);

  await sendEmail(
    email,
    {
      en: `Reset your password for ${applicationName}`,
      it: `Reimposta la tua password per ${applicationName}`
    }[locale],
    ResetPasswordEmail({ token, locale })
  );
}

export async function changePasswordUseCase(token: string, password: string) {
  const passwordResetToken = await getPasswordResetToken(token);

  if (!passwordResetToken) throw new TokenError();

  if (passwordResetToken.expires_at < new Date()) throw new TokenError();

  await dbTransaction(async tx => {
    await deletePasswordResetToken(token, tx);
    await updatePassword(passwordResetToken.user_id, password, tx);
    await deleteSessionsByUserId(passwordResetToken.user_id, tx);
  });
}
