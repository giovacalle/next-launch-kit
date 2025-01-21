import { mergeRouters } from './init';
import { manager } from './routers/manager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const appRouter = mergeRouters(manager);
export type AppRouter = typeof appRouter;
