import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const providers = pgEnum('auth_providers', ['email', 'google']);

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  provider: providers('provider').notNull(),
  providerId: text('provideId').unique(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash'),
  created_at: timestamp('created_at').defaultNow()
});

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
