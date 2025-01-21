import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';

// Tables
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

export const dashboardEnums = pgEnum('user_preferred_dashboard', ['member', 'manager']);
export const usersProfileTable = pgTable('users_profile', {
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade'
    })
    .primaryKey(),
  name: text('name').notNull(),
  surname: text('surname'),
  avatar: text('avatar'),
  preferredDashboard: dashboardEnums('preferred_dashboard').notNull().default('member')
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
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade'
    }),
  expires_at: timestamp('expires_at').notNull()
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

export const subscriptionsTable = pgTable(
  'subscriptions',
  {
    stripe_subscription_id: text('stripe_subscription_id').notNull().primaryKey(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    stripe_customer_id: text('stripe_customer_id').notNull(),
    stripe_price_id: text('stripe_price_id').notNull(),
    next_billing_at: timestamp('next_billing_at', { mode: 'date' }).notNull(),
    created_at: timestamp('created_at').defaultNow()
  },
  table => ({
    stripeSubscriptionIdx: index('subscriptions_stripe_subscription_id_idx').on(
      table.stripe_subscription_id
    )
  })
);

export const teamsTable = pgTable(
  'teams',
  {
    id: serial('id').primaryKey(),
    manager_id: uuid('manager_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .unique(),
    createdAt: timestamp('created_at').defaultNow().notNull()
  },
  table => ({
    managerIdIdx: index('teams_manager_id_idx').on(table.manager_id)
  })
);

export const teamsMembersTable = pgTable('teams_members', {
  team_id: serial('team_id')
    .notNull()
    .references(() => teamsTable.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').defaultNow()
});

export const assetsTypeEnum = pgEnum('team_asset_type', ['room', 'equipment']);
export const teamsAssetsTable = pgTable('teams_assets', {
  id: serial('id').primaryKey(),
  team_id: serial('team_id')
    .notNull()
    .references(() => teamsTable.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: assetsTypeEnum('type').notNull(),
  metadata: jsonb('metadata'),
  created_at: timestamp('created_at').defaultNow()
});

// Relationships
export const teamsRelationships = relations(teamsTable, ({ many }) => ({
  members: many(teamsMembersTable),
  assets: many(teamsAssetsTable)
}));

export const teamsAssetsRelationships = relations(teamsAssetsTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [teamsAssetsTable.team_id],
    references: [teamsTable.id]
  })
}));

export const teamsMembersRelationships = relations(teamsMembersTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [teamsMembersTable.team_id],
    references: [teamsTable.id]
  })
}));

// DB Schema
export type User = typeof usersTable.$inferSelect;
export type Provider = (typeof providersEnum.enumValues)[number];
export type UserProvider = typeof usersProvidersTable.$inferSelect;
export type UserProfile = typeof usersProfileTable.$inferSelect;
export type EmailVerificationToken = typeof emailVerificationTokensTable.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokensTable.$inferSelect;
export type Session = typeof sessionsTable.$inferSelect;
export type MagicLink = typeof magicLinksTable.$inferSelect;
export type Subscription = typeof subscriptionsTable.$inferSelect;
export type Team = typeof teamsTable.$inferSelect;
export type TeamMember = typeof teamsMembersTable.$inferSelect;
export type AssetType = (typeof assetsTypeEnum.enumValues)[number];
export type TeamAsset = typeof teamsAssetsTable.$inferSelect;
