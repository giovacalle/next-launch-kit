import { index, pgEnum, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull()
});

export const providersEnum = pgEnum('user_provider', ['credentials', 'google', 'magic-link']);
export const usersProvidersTable = pgTable(
  'users_providers',
  {
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, {
        onDelete: 'cascade'
      }),
    provider: providersEnum('provider').notNull(),
    provider_id: text('provider_id').unique(),
    password_hash: text('password_hash'),
    verified_at: timestamp('verified_at'),
    created_at: timestamp('created_at').defaultNow()
  },
  table => ({
    pk: primaryKey({ columns: [table.user_id, table.provider] }),
    userIdProviderIdx: index('users_provider_id_provider_idx').on(table.user_id, table.provider)
  })
);

export const usersProfileTable = pgTable('users_profile', {
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade'
    })
    .primaryKey(),
  name: text('name').notNull(),
  surname: text('surname'),
  avatar: text('avatar')
});

export const emailVerificationTokensTable = pgTable(
  'email_verification_tokens',
  {
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .primaryKey(),
    token: text('token').notNull(),
    expires_at: timestamp('expires_at').notNull()
  },
  table => ({
    emailVerificationTokenIdx: index('email_verification_tokens_token_idx').on(table.token)
  })
);

export const passwordResetTokensTable = pgTable(
  'password_reset_tokens',
  {
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .primaryKey(),
    token: text('token').notNull(),
    expires_at: timestamp('expires_at').notNull()
  },
  table => ({
    passwordResetTokenIdx: index('password_reset_tokens_token_idx').on(table.token)
  })
);

export const sessionsTable = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade'
    }), // camelCased because it is required by the Lucia package
  expiresAt: timestamp('expires_at').notNull(), // camelCased because it is required by the Lucia package
  created_at: timestamp('created_at').defaultNow()
});

export const magicLinksTable = pgTable(
  'magic_links',
  {
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .primaryKey(),
    token: text('token').notNull(),
    expires_at: timestamp('expires_at').notNull(),
    used_at: timestamp('used_at')
  },
  table => ({
    magicLinkTokenIdx: index('magic_links_token_idx').on(table.token)
  })
);

export type User = typeof usersTable.$inferSelect;
export type Provider = (typeof providersEnum.enumValues)[number];
export type UserProvider = typeof usersProvidersTable.$inferSelect;
export type UserProfile = typeof usersProfileTable.$inferSelect;
export type EmailVerificationToken = typeof emailVerificationTokensTable.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokensTable.$inferSelect;
export type Session = typeof sessionsTable.$inferSelect;
export type MagicLink = typeof magicLinksTable.$inferSelect;
