import { mergeRouters } from './init';
import { test } from './routers/test';

export const appRouter = mergeRouters(test);
export type AppRouter = typeof appRouter;
