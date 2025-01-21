import { getCurrentUser } from '@/lib/auth';

import { initTRPC } from '@trpc/server';

export const createTRPCContext = async () => {
  const user = await getCurrentUser();
  return { user };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const procedure = t.procedure;
export const mergeRouters = t.mergeRouters;
