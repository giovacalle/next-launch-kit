import { mergeRouters } from './init';
import { hello } from './routers/hello';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const appRouter = mergeRouters(hello);
export type AppRouter = typeof appRouter;
