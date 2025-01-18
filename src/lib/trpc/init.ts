import { cache } from 'react';

import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';
import { initTRPC } from '@trpc/server';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return {};
});

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000
      },
      dehydrate: {
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
      }
    }
  });
}

const t = initTRPC.create();

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const procedure = t.procedure;
export const mergeRouters = t.mergeRouters;
