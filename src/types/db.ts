import { sessionsTable, usersTable } from '@/db/schema';

export type User = typeof usersTable.$inferSelect;
export type Session = typeof sessionsTable.$inferSelect;
