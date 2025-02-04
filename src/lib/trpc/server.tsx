import { cache } from 'react';

import { createHydrationHelpers } from '@trpc/react-query/rsc';

import { createCallerFactory, createTRPCContext } from './init';
import { createQueryClient } from './query-client';
import { AppRouter, appRouter } from './router';

const getQueryClient = cache(createQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(caller, getQueryClient);
